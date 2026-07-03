# LiveVoiceTranslate — Vencord plugin

Live translation for **voice chat**. It transcribes *your microphone* in real
time with [Deepgram](https://deepgram.com), translates what you said into a
target language, and posts it as a caption in the current text channel — so
people in the voice call who don't speak your language can read along.

> **Scope note:** This translates *your own* speech (outgoing). It does **not**
> transcribe other people in the call — Discord's voice audio runs through native
> WebRTC modules that a Vencord plugin can't cleanly tap per-speaker from the
> renderer. Everyone who wants to be understood runs the plugin for themselves.

## How it works

1. You click the microphone button in the chat bar to start.
2. The plugin captures your mic and streams 16 kHz PCM to Deepgram's realtime
   WebSocket API (auth via the `token` subprotocol — no key ever leaves your
   client except to Deepgram).
3. Finalized transcripts are translated (Google Translate endpoint, same as the
   text plugin) and posted to the current channel.
4. Click the button again to stop. Only your own audio is ever captured.

## Setup

1. Create a free Deepgram account at <https://deepgram.com> — new accounts get
   **$200 of credit** (~430 hours of streaming), no card required. Copy an API
   key from the dashboard.
2. Install the plugin (see the repo root README for the Vencord userplugin
   install steps), enable **LiveVoiceTranslate**, and open its settings.
3. Paste your **Deepgram API key**, set the language you **speak**, and the
   language to **translate into**.
4. Join a voice channel, open the text chat, and click the mic button in the
   chat bar.

## Settings

| Setting | Description | Default |
| --- | --- | --- |
| Deepgram API key | Your key from the Deepgram dashboard | *(empty)* |
| Spoken language | The language you talk in (or auto-detect) | English |
| Target language | The language to translate your speech into | English |
| Post to chat | Post translated captions to the current channel | On |
| Include original | Also append your original words under the translation | Off |

## Costs

Deepgram streaming (Nova-3) is about **$0.0077/min (~$0.46/hr)** pay-as-you-go,
but the **$200 signup credit** covers roughly 430 hours before you pay anything.
You're only billed while the mic button is active. Translation uses Google's
free keyless endpoint.

## Notes & limitations

- Requires a **source install of Vencord** (userplugins aren't in the normal
  build). See the repo root README.
- The Deepgram key is stored in your Vencord settings like any other plugin
  setting. Treat it as a secret.
- Relies on Deepgram (paid after credit) and Google's unofficial translate
  endpoint (free, may rate-limit).
- Captions are posted as normal messages, so they're visible to everyone in the
  channel and count as chat history.

## License

GPL-3.0-or-later, matching Vencord.
