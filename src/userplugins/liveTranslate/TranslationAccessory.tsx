/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";
import { React, Text, UserStore } from "@webpack/common";
import type { Message } from "discord-types/general";

import { languages } from "./languages";
import { settings } from "./settings";
import { translate, TranslationValue } from "./translator";

const logger = new Logger("LiveTranslate");

export function TranslationAccessory({ message }: { message: Message; }) {
    const {
        autoTranslate,
        targetLanguage,
        hideIfSameLanguage,
        showOriginalLanguage,
        translateOwnMessages
    } = settings.use([
        "autoTranslate",
        "targetLanguage",
        "hideIfSameLanguage",
        "showOriginalLanguage",
        "translateOwnMessages"
    ]);

    const [translation, setTranslation] = React.useState<TranslationValue | null>(null);

    const content = message.content;
    const isOwn = message.author?.id === UserStore.getCurrentUser()?.id;
    const shouldTranslate = autoTranslate && !!content?.trim() && (translateOwnMessages || !isOwn);

    React.useEffect(() => {
        if (!shouldTranslate) {
            setTranslation(null);
            return;
        }

        let cancelled = false;
        translate(content, targetLanguage)
            .then(result => {
                if (!cancelled) setTranslation(result);
            })
            .catch(err => {
                if (!cancelled) {
                    logger.error("Failed to translate message", err);
                    setTranslation(null);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [shouldTranslate, content, targetLanguage]);

    if (!translation) return null;

    // Skip the translation if the source is already the target language, or if the
    // translated text is identical to the original (nothing meaningful changed).
    if (hideIfSameLanguage && translation.sourceLanguage === targetLanguage) return null;
    if (translation.text.trim() === content.trim()) return null;

    const sourceName = languages[translation.sourceLanguage] ?? translation.sourceLanguage;

    return (
        <span className="vc-live-translate-accessory">
            <span className="vc-live-translate-icon" aria-hidden="true">🌐</span>
            {showOriginalLanguage && (
                <Text variant="text-xs/semibold" className="vc-live-translate-source" tag="span">
                    {sourceName}
                </Text>
            )}
            <Text variant="text-sm/normal" tag="span">
                {translation.text}
            </Text>
        </span>
    );
}
