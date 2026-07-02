/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

import { languages } from "./languages";
import { clearTranslationCache } from "./translator";

// Build the target-language dropdown, excluding "auto" (only valid as a source),
// and default it to English.
const targetLanguageOptions = Object.entries(languages)
    .filter(([code]) => code !== "auto")
    .map(([value, label]) => ({ value, label, default: value === "en" }));

export const settings = definePluginSettings({
    autoTranslate: {
        type: OptionType.BOOLEAN,
        description: "Automatically translate incoming messages as they arrive",
        default: true
    },
    targetLanguage: {
        type: OptionType.SELECT,
        description: "Translate incoming messages into this language",
        options: targetLanguageOptions,
        onChange: clearTranslationCache
    },
    hideIfSameLanguage: {
        type: OptionType.BOOLEAN,
        description: "Don't show a translation when the message is already in your target language",
        default: true
    },
    showOriginalLanguage: {
        type: OptionType.BOOLEAN,
        description: "Show the detected source language next to the translation",
        default: true
    },
    translateOwnMessages: {
        type: OptionType.BOOLEAN,
        description: "Also translate messages you send yourself",
        default: false
    }
});
