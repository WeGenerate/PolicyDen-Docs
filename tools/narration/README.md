# Narrated documentation tutorials

Use actual recordings from the isolated fictional PolicyDen demo. Each tutorial JSON contains its target page, source revision, raw recording path and scenes with measured `start`, `end` and exact `narration` text.

`generate.cjs` uses OpenAI Realtime audio, currently `gpt-realtime-2.1-mini` with Marin. It reads `OPENAI_API_KEY` or a private key-file argument, never logs the key, caches completed scenes and stops if the returned transcript differs from the script. `WS_PATH` can point to an installed `ws` module; `NARRATION_MODEL` and `NARRATION_VOICE` override defaults.

```bash
node tools/narration/generate.cjs path/to/tutorial.json tools/narration/output/tutorial-id
python3 tools/narration/compose.py path/to/tutorial.json tools/narration/output/tutorial-id/narration.json videos/tutorials/tutorial-id.mp4
```

Inspect narration and sampled final frames before embedding. The composer keeps the original action speed, extends the last frame when narration needs more time, preserves audio, and writes English WebVTT captions and a poster. Captions use scene-level narration timing with short word groups; review their synchronization during playback.

Place completed tutorials after the page introduction with controls, captions, a transcript and a visible “AI narration” label. Do not autoplay or loop narrated videos. Keep raw recordings, speech intermediates and private credentials out of Git. Never publish a tutorial showing a sign-in redirect, error, loading screen, an unperformed save, or real customer data.

Mintlify currently removes native `track` tags and does not serve VTT files directly. `embed.py` keeps each page's caption cues in its video data attribute. The root `narrated-tutorials.js` creates the browser's native English caption track after hydration and on `mintlify:navigate`. Captions remain with their own page instead of a global transcript bundle. Other videos and playback settings are untouched. Verify loaded caption cues in a browser after changing the player.

Official OpenAI references: [Realtime conversations](https://developers.openai.com/api/docs/guides/realtime-conversations) and [WebSocket connections](https://developers.openai.com/api/docs/guides/voice-websockets).
