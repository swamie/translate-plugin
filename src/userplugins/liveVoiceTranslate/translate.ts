/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { PluginNative } from "@utils/types";

export interface TranslationValue {
    sourceLanguage: string;
    text: string;
}

const Native = VencordNative.pluginHelpers?.LiveVoiceTranslate as
    | PluginNative<typeof import("./native")>
    | undefined;

function parse(data: any): TranslationValue {
    return {
        sourceLanguage: data.src,
        text: (data.sentences as any[])
            .map(s => s.trans)
            .filter(Boolean)
            .join("")
    };
}

/**
 * Translate `text` into `targetLang`. `sourceLang` defaults to "auto" so the
 * spoken language is detected automatically.
 */
export async function translate(text: string, targetLang: string, sourceLang = "auto"): Promise<TranslationValue> {
    if (Native)
        return parse(await Native.makeTranslateRequest(sourceLang, targetLang, text));

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
        throw new Error(`Failed to translate "${text}": ${res.status} ${res.statusText}`);

    return parse(await res.json());
}
