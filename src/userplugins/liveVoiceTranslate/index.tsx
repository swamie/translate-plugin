/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./styles.css";

import { addChatBarButton, ChatBarButton, ChatBarButtonFactory, removeChatBarButton } from "@api/ChatBar";
import { Logger } from "@utils/Logger";
import { useForceUpdater } from "@utils/react";
import definePlugin from "@utils/types";
import { getCurrentChannel, sendMessage } from "@utils/discord";
import { React, Toasts } from "@webpack/common";

import { VoiceCaptureSession } from "./deepgram";
import { settings } from "./settings";
import { translate } from "./translate";

const logger = new Logger("LiveVoiceTranslate");

// Module-level session state with a tiny subscription so the chat-bar button
// can reflect whether we're currently listening.
let session: VoiceCaptureSession | null = null;
const listeners = new Set<() => void>();

function isListening() {
    return session !== null;
}

function notify() {
    listeners.forEach(l => l());
}

function toast(message: string, type: number = Toasts.Type.MESSAGE) {
    Toasts.show({ id: Toasts.genId(), message, type });
}

async function handleTranscript(text: string) {
    const { targetLanguage, spokenLanguage, postToChat, includeOriginal } = settings.store;

    let translated: string;
    try {
        const source = spokenLanguage === "multi" ? "auto" : spokenLanguage;
        translated = (await translate(text, targetLanguage, source)).text;
    } catch (err) {
        logger.error("Translation failed", err);
        return;
    }

    if (!postToChat) return;

    const channel = getCurrentChannel();
    if (!channel) return;

    const content = includeOriginal ? `${translated}\n-# 🎙️ ${text}` : translated;
    sendMessage(channel.id, { content });
}

function startListening() {
    const { deepgramApiKey, spokenLanguage } = settings.store;
    if (!deepgramApiKey) {
        toast("Set your Deepgram API key in the LiveVoiceTranslate settings first.", Toasts.Type.FAILURE);
        return;
    }

    session = new VoiceCaptureSession({
        apiKey: deepgramApiKey,
        language: spokenLanguage,
        onTranscript: handleTranscript,
        onError: err => {
            logger.error(err);
            toast("Voice translation stopped (connection error).", Toasts.Type.FAILURE);
            stopListening();
        }
    });

    session.start().catch(err => {
        logger.error("Failed to start voice capture", err);
        toast("Couldn't start voice capture (microphone permission?).", Toasts.Type.FAILURE);
        stopListening();
    });

    notify();
    toast("Live voice translation on — speak away.", Toasts.Type.SUCCESS);
}

function stopListening() {
    session?.stop();
    session = null;
    notify();
}

function toggleListening() {
    if (isListening()) {
        stopListening();
        toast("Live voice translation off.");
    } else {
        startListening();
    }
}

const VoiceTranslateButton: ChatBarButtonFactory = ({ isMainChat }) => {
    const update = useForceUpdater();
    React.useEffect(() => {
        listeners.add(update);
        return () => void listeners.delete(update);
    }, []);

    if (!isMainChat) return null;

    const active = isListening();

    return (
        <ChatBarButton
            tooltip={active ? "Stop live voice translation" : "Start live voice translation"}
            onClick={toggleListening}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={active ? "vc-lvt-active" : ""}>
                <path
                    fill="currentColor"
                    d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a1 1 0 1 1 2 0 7 7 0 0 1-6 6.93V21a1 1 0 1 1-2 0v-3.07A7 7 0 0 1 5 11a1 1 0 1 1 2 0 5 5 0 0 0 10 0Z"
                />
            </svg>
        </ChatBarButton>
    );
};

export default definePlugin({
    name: "LiveVoiceTranslate",
    description: "Transcribes your microphone with Deepgram and posts a live translation of what you say into the current channel, so people who don't speak your language can follow along in voice chat.",
    authors: [{ name: "voidkay", id: 0n }],

    settings,

    start() {
        addChatBarButton("vc-live-voice-translate", VoiceTranslateButton);
    },

    stop() {
        stopListening();
        removeChatBarButton("vc-live-voice-translate");
    }
});
