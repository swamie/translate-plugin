# LiveTranslate — Vencord plugin

A [Vencord](https://vencord.dev) userplugin that **automatically translates
incoming messages** into your language and renders the translation directly
beneath each message. No clicking, no context menus — messages get translated
live as they arrive.

It uses the free Google Translate endpoint (the same one the built-in Translate
plugin uses), with auto source-language detection and in-memory caching so the
same text is never fetched twice.

## Features

- 🌐 Auto-translates every incoming message in real time
- 🔎 Automatic source-language detection
- ⚙️ Configurable target language (100+ languages)
- 🙈 Optionally hides the translation when a message is already in your language
- 🏷️ Optionally shows the detected source language
- 💬 Optionally translates your own messages too
- ⚡ In-memory caching to avoid redundant requests

## Installation

Userplugins require a [source install of Vencord](https://docs.vencord.dev/installing/).
Once you have that set up:

1. Clone or copy the plugin folder into your Vencord `src/userplugins` directory:

   ```sh
   # from the root of your Vencord checkout
   mkdir -p src/userplugins
   cp -r /path/to/this/repo/src/userplugins/liveTranslate src/userplugins/
   ```

   (If `src/userplugins` doesn't exist yet, creating it is fine.)

2. Rebuild and reinject Vencord:

   ```sh
   pnpm build
   pnpm inject
   ```

3. Restart Discord, open **Settings → Vencord → Plugins**, and enable
   **LiveTranslate**.

## Settings

| Setting | Description | Default |
| --- | --- | --- |
| Auto translate | Automatically translate incoming messages as they arrive | On |
| Target language | Which language to translate messages into | English |
| Hide if same language | Skip the translation when a message is already in your target language | On |
| Show original language | Show the detected source language next to the translation | On |
| Translate own messages | Also translate messages you send yourself | Off |

## How it works

The plugin registers a [message accessory](https://docs.vencord.dev) that renders
under each message. When a message arrives, the accessory translates its content
(source language auto-detected) into your target language and displays the result.

Translation requests are made from Electron's main process (`native.ts`) to avoid
renderer CORS restrictions; on the web build it falls back to a direct `fetch`.

## Notes

- This relies on Google's unofficial translate endpoint. It's free and requires
  no API key, but Google may rate-limit or change it at any time.
- Translations are cached only in memory and cleared when the plugin stops or the
  target language changes.

## License

GPL-3.0-or-later, matching Vencord.
