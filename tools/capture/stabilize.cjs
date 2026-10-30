// Parent review pass: capture settled screens, rather than loading skeletons.
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/Users/mac/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const { prepare, actions, loc, specs, origin } = require('./capture.cjs');
const root = path.resolve(__dirname, '../..');
const reports = path.join(__dirname, 'reports');
const delegatedPages = new Set([
  'getting-started/sign-in', 'getting-started/notifications-and-alerts',
  'reports/persistency', 'marketplace/joining-queues', 'meetings/overview',
  'policies/creating-policies', 'policies/policy-profile', 'policies/status-history',
  'policies/attaching-plans', 'calls/setting-your-status', 'calls/making-calls',
  'workflows/run-a-dialer-shift', 'pipeline/managing-deals', 'settings/billing',
  'workflows/set-up-your-agency',
]);

async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 15000 });
  await page.waitForFunction(() => document.body?.innerText.trim().length > 80, null, { timeout: 15000 });
  await page.waitForFunction(() => {
    const visible = element => element.getClientRects().length > 0;
    return ![...document.querySelectorAll('[data-slot="skeleton"], .animate-pulse')].some(visible);
  }, null, { timeout: 15000 });
  await page.waitForTimeout(400);
  const text = await page.locator('body').innerText();
  if (/Something went wrong|Failed to load|couldn['’]t load/i.test(text)) throw new Error('Page shows a data-loading error');
}

function corrected(spec) {
  const copy = JSON.parse(JSON.stringify(spec));
  for (const action of copy.before || []) {
    const css = action.click?.css;
    if (css && css.includes('a[href*=') && css.includes('/contacts/') && !css.includes('/edit')) {
      action.click.css = 'tbody tr:first-child a[href*="/contacts/"][href$="/edit"]';
    }
  }
  if (copy.id === 'calls/details') {
    copy.before = [{ click: { css: 'tbody tr:first-child a[href*="/dialer/call-log/"]' } }];
  }
  if (copy.id === 'settings/import-users') {
    copy.before = [{ click: { role: 'button', name: 'Import Users' } }, { waitFor: { role: 'dialog' } }];
  }
  if (copy.id === 'settings/user-profiles' || copy.id === 'settings/user-access-and-security') {
    copy.before[0] = { click: { css: 'tbody tr:first-child td:first-child' } };
  }
  if (copy.id === 'meetings/schedule-form') {
    copy.url = '/contacts';
    copy.before = [
      { click: { css: 'tbody tr:first-child a[href*="/contacts/"][href$="/edit"]' } },
      { click: { role: 'button', name: 'Add Meeting' } },
      { waitFor: { role: 'dialog' } },
    ];
  }
  if (copy.id === 'tasks/manage-details') {
    copy.before = copy.before.filter(action => action.waitFor?.text !== 'Task Details');
  }
  return copy;
}

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(reports, 'manifest.json')));
  const requested = process.env.REVIEW_IDS?.split(',');
  const existing = fs.existsSync(path.join(reports, 'parent-captures.json')) ? JSON.parse(fs.readFileSync(path.join(reports, 'parent-captures.json'))) : [];
  const results = process.env.RESUME ? existing.filter(row => row.status === 'completed') : requested ? existing.filter(row => !requested.includes(row.id)) : [];
  const selected = specs.filter(spec => (requested ? requested.includes(spec.id) :
    !delegatedPages.has(spec.page) && manifest.some(row => row.id === spec.id && row.status === 'completed') && spec.capture.type !== 'loop') && !results.some(row => row.id === spec.id));
  const browser = await chromium.launch();
  try {
    for (const original of selected) {
      const spec = corrected(original);
      const result = { id: spec.id, page: spec.page, output: spec.output, caption: spec.alt, before: spec.before };
      let page;
      try {
        if (spec.todo) throw new Error(spec.todo);
        const session = await prepare(browser, spec.persona);
        page = await session.c.newPage();
        page.setDefaultTimeout(8000);
        const response = await page.goto(origin + spec.url);
        if (response.status() >= 400) throw new Error('HTTP ' + response.status());
        await settle(page);
        if (spec.persona !== 'public' && new URL(page.url()).pathname === '/login') throw new Error('Session redirected to login');
        for (const action of spec.before || []) {
          if (action.waitFor?.text) {
            await page.getByText(action.waitFor.text, { exact: false }).filter({ visible: true }).first().waitFor();
          } else {
            await actions(page, { before: [action] });
          }
          await settle(page);
        }
        if (spec.persona !== 'public' && new URL(page.url()).pathname === '/login') throw new Error('Session redirected to login');
        const text = await page.locator('body').innerText();
        if (/MyCareClub|WeGenerate|Magnolia|Internal Server Error|Server Error/.test(text)) throw new Error('Unexpected company or server-error text');
        if (/\bLoading\.{3}/.test(text)) throw new Error('Screen is still loading');
        let highlighted = 0;
        for (const selector of spec.capture.highlight || []) {
          const target = loc(page, selector);
          if (!await target.isVisible()) continue;
          await target.evaluate(element => { element.style.outline = '3px solid #2563eb'; element.style.outlineOffset = '3px'; });
          highlighted++;
        }
        const dialogs = page.locator('[role="dialog"]:visible');
        const target = spec.capture.crop ? loc(page, spec.capture.crop) : await dialogs.count() ? dialogs.last() : page;
        const output = path.join(root, spec.output);
        fs.mkdirSync(path.dirname(output), { recursive: true });
        await target.screenshot({ path: output, animations: 'disabled' });
        result.status = 'completed';
        result.url = page.url();
        result.bytes = fs.statSync(output).size;
        result.highlighted = highlighted;
      } catch (error) {
        result.status = 'blocked';
        result.blocker = error.message.split('\n')[0];
        result.details = error.message;
        result.url = page?.url();
      } finally {
        if (page) await page.close();
      }
      results.push(result);
      fs.writeFileSync(path.join(reports, 'parent-captures.json'), JSON.stringify(results, null, 2));
      console.log(result.status, result.id, result.blocker || '');
    }
  } finally {
    await browser.close();
  }
}

if (require.main === module) run().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { settle, corrected };
