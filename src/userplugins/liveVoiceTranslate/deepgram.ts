/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";

const logger = new Logger("LiveVoiceTranslate");

const TARGET_SAMPLE_RATE = 16000;

/** Average-decimate a Float32 PCM buffer down to the target sample rate. */
function downsample(buffer: Float32Array, inRate: number, outRate: number): Float32Array {
    if (outRate >= inRate) return buffer;

    const ratio = inRate / outRate;
    const newLength = Math.round(buffer.length / ratio);
    const result = new Float32Array(newLength);

    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < newLength) {
        const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
        let accum = 0;
        let count = 0;
        for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }
        result[offsetResult] = count ? accum / count : 0;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return result;
}

/** Convert Float32 PCM (-1..1) to little-endian 16-bit PCM. */
function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
    const view = new DataView(new ArrayBuffer(input.length * 2));
    for (let i = 0; i < input.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return view.buffer;
}

export interface VoiceCaptureOptions {
    apiKey: string;
    /** Language you speak, fed to Deepgram. "multi" enables multilingual detection. */
    language: string;
    /** Called with each finalized transcript segment. */
    onTranscript: (text: string) => void;
    /** Called if the session fails so the UI can reset. */
    onError: (err: unknown) => void;
}

/**
 * Captures the local microphone and streams it to Deepgram's realtime API,
 * emitting finalized transcripts. Only your own audio is captured.
 */
export class VoiceCaptureSession {
    private ws?: WebSocket;
    private ctx?: AudioContext;
    private stream?: MediaStream;
    private source?: MediaStreamAudioSourceNode;
    private processor?: ScriptProcessorNode;
    private mute?: GainNode;
    private stopped = false;

    constructor(private readonly opts: VoiceCaptureOptions) {}

    async start() {
        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true }
        });

        this.ctx = new AudioContext();
        const inputSampleRate = this.ctx.sampleRate;

        const params = new URLSearchParams({
            model: "nova-3",
            encoding: "linear16",
            sample_rate: String(TARGET_SAMPLE_RATE),
            channels: "1",
            interim_results: "false",
            punctuate: "true",
            smart_format: "true",
            language: this.opts.language || "multi"
        });

        // Browser WebSockets can't set headers, so Deepgram auth is passed via
        // the "token" subprotocol.
        this.ws = new WebSocket(`wss://api.deepgram.com/v1/listen?${params}`, ["token", this.opts.apiKey]);
        this.ws.binaryType = "arraybuffer";

        this.ws.onopen = () => {
            if (this.stopped) return;
            logger.info("Deepgram connection open");
            this.startAudioPipeline(inputSampleRate);
        };

        this.ws.onmessage = ev => {
            try {
                const data = JSON.parse(ev.data);
                const transcript: string | undefined = data.channel?.alternatives?.[0]?.transcript;
                if (data.is_final && transcript?.trim())
                    this.opts.onTranscript(transcript.trim());
            } catch (err) {
                logger.error("Failed to parse Deepgram message", err);
            }
        };

        this.ws.onerror = ev => {
            logger.error("Deepgram socket error", ev);
            if (!this.stopped) this.opts.onError(new Error("Deepgram connection error (check your API key)"));
        };

        this.ws.onclose = () => logger.info("Deepgram connection closed");
    }

    private startAudioPipeline(inputSampleRate: number) {
        if (!this.ctx || !this.stream) return;

        this.source = this.ctx.createMediaStreamSource(this.stream);
        this.processor = this.ctx.createScriptProcessor(4096, 1, 1);

        this.processor.onaudioprocess = e => {
            if (this.ws?.readyState !== WebSocket.OPEN) return;
            const input = e.inputBuffer.getChannelData(0);
            const down = downsample(input, inputSampleRate, TARGET_SAMPLE_RATE);
            this.ws.send(floatTo16BitPCM(down));
        };

        // ScriptProcessor only runs while connected to the graph, but we don't
        // want to hear our own mic — route it through a muted gain node.
        this.mute = this.ctx.createGain();
        this.mute.gain.value = 0;
        this.source.connect(this.processor);
        this.processor.connect(this.mute);
        this.mute.connect(this.ctx.destination);
    }

    stop() {
        this.stopped = true;

        try {
            if (this.ws?.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({ type: "CloseStream" }));
                this.ws.close();
            }
        } catch { /* ignore */ }

        this.processor?.disconnect();
        this.source?.disconnect();
        this.mute?.disconnect();
        this.stream?.getTracks().forEach(t => t.stop());
        this.ctx?.close().catch(() => {});

        this.ws = undefined;
        this.processor = undefined;
        this.source = undefined;
        this.mute = undefined;
        this.stream = undefined;
        this.ctx = undefined;
    }
}
