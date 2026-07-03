/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

import { languages } from "./languages";

// Target language: what your speech gets translated INTO (excludes "auto").
const targetLanguageOptions = Object.entries(languages)
    .filter(([code]) => code !== "auto")
    .map(([value, label]) => ({ value, label, default: value === "en" }));

// Spoken language: what Deepgram listens for. "multi" lets it auto-detect.
const spokenLanguageOptions = [
    { value: "multi", label: "Auto-detect (multilingual)" },
    ...Object.entries(languages)
        .filter(([code]) => code !== "auto")
        .map(([value, label]) => ({ value, label, default: value === "en" }))
];

export const settings = definePluginSettings({
    deepgramApiKey: {
        type: OptionType.STRING,
        description: "Your Deepgram API key (get one free at deepgram.com — includes $200 of credit)",
        default: "",
        placeholder: "Deepgram API key"
    },
    spokenLanguage: {
        type: OptionType.SELECT,
        description: "The language you speak (fed to Deepgram)",
        options: spokenLanguageOptions
    },
    targetLanguage: {
        type: OptionType.SELECT,
        description: "Translate your speech into this language before posting",
        options: targetLanguageOptions
    },
    postToChat: {
        type: OptionType.BOOLEAN,
        description: "Post the translated captions as messages in the current text channel",
        default: true
    },
    includeOriginal: {
        type: OptionType.BOOLEAN,
        description: "Also include your original (untranslated) words in the posted message",
        default: false
    }
});
