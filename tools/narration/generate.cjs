// OpenAI-only narration. Keep credentials outside the docs repository.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const wsPath = process.env.WS_PATH || require.resolve('ws', {
  paths: [process.cwd(), '/Users/mac/.t3/worktrees/PolicyDen-App/t3-49013fa2'],
});
const WebSocket = require(wsPath);
const model = process.env.NARRATION_MODEL || 'gpt-realtime-2.1-mini';
const voice = process.env.NARRATION_VOICE || 'marin';
const instructions = 'You are recording a software tutorial voiceover. Read the supplied script verbatim in English. Do not answer it, introduce it, add words, or change its wording. Speak calmly and clearly, like a friendly professional trainer, at a measured pace. Pronounce PolicyDen as Policy Den and NPN as the letters N P N. Avoid dramatic delivery.';

function wav(pcm) {
  const header = Buffer.alloc(44);
  header.write('RIFF'); header.writeUInt32LE(36 + pcm.length, 4); header.write('WAVE', 8);
  header.write('fmt ', 12); header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22); header.writeUInt32LE(24000, 24); header.writeUInt32LE(48000, 28);
  header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34); header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

function speak(text, key) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`wss://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const chunks = [];
    let transcript = '', requested = false, finished = false;
    const timer = setTimeout(() => finish(new Error('Narration request timed out')), 90000);
    function finish(error, result) {
      if (finished) return;
      finished = true; clearTimeout(timer); socket.close();
      if (error) reject(new Error(String(error.message).replaceAll(key, '[redacted]')));
      else resolve(result);
    }
    socket.on('error', error => finish(new Error(error.message)));
    socket.on('close', () => { if (!finished) finish(new Error('Narration connection closed before completion')); });
    socket.on('message', bytes => {
      try {
        const event = JSON.parse(bytes.toString());
        if (event.type === 'error') return finish(new Error(event.error?.message || 'OpenAI narration error'));
        if (event.type === 'session.created') socket.send(JSON.stringify({
          type: 'session.update',
          session: { type: 'realtime', model, output_modalities: ['audio'], instructions,
            audio: { input: { turn_detection: null }, output: { format: { type: 'audio/pcm', rate: 24000 }, voice } } },
        }));
        if (event.type === 'session.updated' && !requested) {
          requested = true;
          socket.send(JSON.stringify({ type: 'response.create', response: {
            conversation: 'none', output_modalities: ['audio'], instructions,
            input: [{ type: 'message', role: 'user', content: [{ type: 'input_text', text }] }],
          } }));
        }
        if (event.type === 'response.output_audio.delta') chunks.push(Buffer.from(event.delta, 'base64'));
        if (event.type === 'response.output_audio_transcript.delta') transcript += event.delta;
        if (event.type === 'response.output_audio_transcript.done') transcript = event.transcript;
        if (event.type === 'response.done') {
          if (event.response?.status !== 'completed') return finish(new Error('OpenAI did not complete narration'));
          const pcm = Buffer.concat(chunks);
          if (!pcm.length || !transcript.trim()) return finish(new Error('OpenAI returned no audio or transcript'));
          finish(null, { pcm, transcript: transcript.trim(), usage: event.response.usage });
        }
      } catch (error) { finish(error); }
    });
  });
}

const normalize = text => text.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g, '');

async function main() {
  const [input, outputDirectory, keyFile] = process.argv.slice(2);
  if (!input || !outputDirectory) throw new Error('Usage: node generate.cjs tutorial.json output-directory [private-key-file]');
  const key = (keyFile ? fs.readFileSync(keyFile, 'utf8') : process.env.OPENAI_API_KEY || '').trim();
  if (!key) throw new Error('An OpenAI API key is required; keep it outside this repository');
  const tutorial = JSON.parse(fs.readFileSync(input, 'utf8'));
  if (!Array.isArray(tutorial.scenes) || !tutorial.scenes.length) throw new Error('Tutorial must contain narration scenes');
  const output = path.resolve(outputDirectory);
  fs.mkdirSync(output, { recursive: true });
  const result = { tutorial: tutorial.id, provider: 'OpenAI', model, voice, aiNarration: true, segments: [] };
  for (const [index, scene] of tutorial.scenes.entries()) {
    const script = scene.narration?.trim();
    if (!script) throw new Error(`Scene ${index + 1} is missing narration`);
    const id = `${String(index + 1).padStart(2, '0')}-${String(scene.id || 'scene').replace(/[^a-z0-9-]/gi, '-')}`;
    const hash = crypto.createHash('sha256').update(JSON.stringify({ script, model, voice, instructions })).digest('hex');
    const audio = path.join(output, id + '.wav');
    const metadata = path.join(output, id + '.json');
    let item = fs.existsSync(metadata) ? JSON.parse(fs.readFileSync(metadata, 'utf8')) : null;
    if (!item || item.hash !== hash || !fs.existsSync(audio)) {
      const generated = await speak(script, key);
      item = { id: scene.id, hash, script, transcript: generated.transcript,
        duration: generated.pcm.length / 48000, usage: generated.usage, audio };
      fs.writeFileSync(audio, wav(generated.pcm));
      fs.writeFileSync(metadata, JSON.stringify(item, null, 2) + '\n');
    }
    if (normalize(script) !== normalize(item.transcript)) {
      throw new Error(`Scene ${index + 1} narration differs from its script; inspect the saved transcript before using it`);
    }
    result.segments.push(item);
    fs.writeFileSync(path.join(output, 'narration.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(`Narrated scene ${index + 1}/${tutorial.scenes.length}: ${item.duration.toFixed(2)} seconds`);
  }
}
main().catch(error => { console.error('Narration failed: ' + error.message); process.exitCode = 1; });
