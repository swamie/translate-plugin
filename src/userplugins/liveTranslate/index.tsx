/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./styles.css";

import { addAccessory, removeAccessory } from "@api/MessageAccessories";
import definePlugin from "@utils/types";

import { settings } from "./settings";
import { TranslationAccessory } from "./TranslationAccessory";
import { clearTranslationCache } from "./translator";

const ACCESSORY_ID = "vc-live-translate";

export default definePlugin({
    name: "LiveTranslate",
    description: "Automatically translates incoming messages into your language and shows the translation beneath each message.",
    authors: [{ name: "voidkay", id: 0n }],

    settings,

    start() {
        addAccessory(ACCESSORY_ID, props => (
            <TranslationAccessory message={props.message} />
        ));
    },

    stop() {
        removeAccessory(ACCESSORY_ID);
        clearTranslationCache();
    }
});
