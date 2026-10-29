// Re-record existing demonstrations with settled screens and readable pauses.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/Users/mac/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const { prepare, actions, specs, origin } = require('./capture.cjs');
const { settle, corrected } = require('./stabilize.cjs');
const root = path.resolve(__dirname, '../..');
const reports = path.join(__dirname, 'reports');

async function run() {
  const clips = JSON.parse(fs.readFileSync(path.join(reports, 'clips.json')));
  const browser = await chromium.launch();
  const sessions = new Map();
  const results = [];
  try {
    for (const clip of clips.filter(clip => !process.env.REVIEW_CLIP_IDS || process.env.REVIEW_CLIP_IDS.split(',').includes(clip.id))) {
      if (clip.id === 'pipeline/drag-deal') continue; // Already verified against a saved local PATCH.
      const source = specs.find(spec => spec.id === clip.id);
      const spec = corrected(source);
      let context;
      const result = { ...clip, caption: spec.alt };
      try {
        if (!sessions.has(spec.persona)) {
          const session = await prepare(browser, spec.persona);
          sessions.set(spec.persona, await session.c.storageState());
        }
        context = await browser.newContext({
          ignoreHTTPSErrors: true,
          storageState: sessions.get(spec.persona),
          viewport: { width: 1440, height: 1000 },
          recordVideo: { dir: path.join(__dirname, 'recordings'), size: { width: 1440, height: 1000 } },
        });
        await context.route('**/*', route => {
          const request = route.request();
          const url = new URL(request.url());
          return url.origin === origin && !url.pathname.startsWith('/herd-studio') && ['GET', 'HEAD'].includes(request.method()) ? route.continue() : route.abort();
        });
        const page = await context.newPage();
        page.setDefaultTimeout(8000);
        const response = await page.goto(origin + spec.url);
        if (response.status() >= 400) throw Error('HTTP ' + response.status());
        await settle(page);
        const started = Date.now();
        await page.waitForTimeout(1200);
        for (const action of [...(spec.before || []), ...(spec.capture.steps || [])]) {
          if (action.waitFor?.text) {
            await page.getByText(action.waitFor.text, { exact: false }).filter({ visible: true }).first().waitFor();
          } else {
            await actions(page, { before: [action] });
          }
          await settle(page);
        }
        await page.waitForTimeout(2200);
        const duration = (Date.now() - started) / 1000;
        if (clip.output.startsWith('videos/')) await page.screenshot({ path: path.join(root, clip.output), animations: 'disabled' });
        const recording = await page.video().path();
        await context.close();
        context = null;
        const destination = path.join(root, clip.video);
        const temporary = destination.replace(/\.mp4$/, '.review.mp4');
        execFileSync('ffmpeg', ['-y', '-sseof', '-' + duration, '-i', recording, '-an', '-vf', 'fps=24,scale=1440:-2', '-c:v', 'libx264', '-crf', '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', temporary], { stdio: 'ignore' });
        fs.renameSync(temporary, destination);
        result.status = 'completed';
        result.duration = duration;
      } catch (error) {
        result.status = 'blocked';
        result.blocker = error.message.split('\n')[0];
      } finally {
        if (context) await context.close();
      }
      results.push(result);
      fs.writeFileSync(path.join(reports, 'parent-clips.json'), JSON.stringify(results, null, 2));
      console.log(result.status, result.id, result.blocker || '');
    }
  } finally {
    await browser.close();
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
