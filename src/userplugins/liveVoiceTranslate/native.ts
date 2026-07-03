/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { IpcMainInvokeEvent } from "electron";

/**
 * Runs in the Electron main process so translation requests aren't blocked by
 * the renderer's CORS policy. (Deepgram is reached over a WebSocket directly
 * from the renderer, so only the text-translation step needs this.)
 */
export async function makeTranslateRequest(_: IpcMainInvokeEvent, sourceLang: string, targetLang: string, text: string) {
    const url = "https://translate.googleapis.com/translate_a/single?" + new URLSearchParams({
        client: "gtx",
        sl: sourceLang,
        tl: targetLang,
        dt: "t",
        dj: "1",
        source: "input",
        q: text
    });

    const res = await fetch(url);
    if (!res.ok)
        throw new Error(`Failed to translate "${text}" (${sourceLang} -> ${targetLang}): ${res.status} ${res.statusText}`);

    return await res.json();
}
