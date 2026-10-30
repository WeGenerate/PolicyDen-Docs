// Read-only layout checks plus a temporary design grid, injected only by this audit.
const fs = require("node:fs"),
  path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const root = path.resolve(__dirname, "../..");
const config = JSON.parse(fs.readFileSync(path.join(root, "docs.json")));
const routes = new Set();
function walk(x) {
  if (Array.isArray(x)) return x.forEach(walk);
  if (x && typeof x === "object") {
    if (Array.isArray(x.pages))
      for (const p of x.pages)
        if (typeof p === "string" && !p.startsWith("http")) routes.add(p);
    Object.values(x).forEach(walk);
  }
}
walk(config.navigation);
const phase = process.env.PHASE || "before";
const out = path.join(__dirname, "output", phase);
fs.mkdirSync(out, { recursive: true });
const widths = (process.env.WIDTHS || "390,768,1440").split(",").map(Number);
const queue = [...routes].filter(
  (p) => !process.env.ONLY || process.env.ONLY.split(",").includes(p),
);
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
function inspect() {
  const content = document.querySelector("#content"),
    header = document.querySelector("#header");
  const visible = (e) =>
    e instanceof HTMLElement &&
    e.getClientRects().length &&
    getComputedStyle(e).visibility !== "hidden" &&
    getComputedStyle(e).display !== "none" &&
    e.getBoundingClientRect().height > 0;
  const box = (e) => {
    const b = e.getBoundingClientRect(),
      s = getComputedStyle(e);
    return {
      tag: e.tagName,
      hook: e.getAttribute("data-component-part") || e.classList[0] || "",
      text: e.innerText?.replace(/\s+/g, " ").slice(0, 100),
      x: +b.x.toFixed(2),
      y: +(b.y + scrollY).toFixed(2),
      w: +b.width.toFixed(2),
      h: +b.height.toFixed(2),
      mt: parseFloat(s.marginTop),
      mb: parseFloat(s.marginBottom),
      line: s.lineHeight,
      display: s.display,
    };
  };
  if (!content || !header) return { error: "Missing content or header" };
  const r = content.getBoundingClientRect(),
    els = [...content.querySelectorAll("*")].filter(visible),
    top = [...content.children].filter(visible),
    h = header.getBoundingClientRect();
  const issues = [];
  if (document.documentElement.scrollWidth > innerWidth + 1)
    issues.push({
      type: "page-overflow",
      pixels: document.documentElement.scrollWidth - innerWidth,
    });
  if (Math.abs(r.x - h.x) > 1 || Math.abs(r.width - h.width) > 1)
    issues.push({
      type: "header-content-alignment",
      header: box(header),
      content: box(content),
    });
  if (top[0]) {
    const offset = top[0].getBoundingClientRect().y - r.y;
    if (Math.abs(offset) > 1)
      issues.push({
        type: "leading-component-offset",
        offset: +offset.toFixed(2),
        first: box(top[0]),
      });
  }
  const horizontalScroll = (e) => {
    for (let a = e; a && a !== content.parentElement; a = a.parentElement)
      if (
        /auto|scroll/.test(getComputedStyle(a).overflowX) &&
        a.scrollWidth > a.clientWidth + 1
      )
        return true;
    return false;
  };
  for (const e of els) {
    const b = e.getBoundingClientRect(),
      s = getComputedStyle(e);
    if (
      b.width < 1 ||
      /absolute|fixed/.test(s.position) ||
      e.closest('[data-ramka-trigger],.mermaid svg,a[class*="-ml-"]') ||
      horizontalScroll(e)
    )
      continue;
    // Native scroll wrappers have a deliberate 20px padded outset; tab panes
    // have a 16px left outset. Their text, children and page overflow still count.
    const nativeScroll =
      e.matches('[data-component-part^="scroll-area"]') ||
      e.classList.contains("px-(--page-padding)");
    if (
      nativeScroll &&
      b.x >= Math.max(-1, r.x - 20.1) &&
      b.right <= Math.min(innerWidth + 1, r.right + 20.1)
    )
      continue;
    if (
      e.matches('[data-component-part="tab-content"],.tab-content') &&
      Math.abs(b.x - (r.x - 16)) < 1 &&
      b.right <= r.right + 1
    )
      continue;
    if ((b.x < r.x - 1 || b.right > r.right + 1) && !e.closest("table,pre"))
      issues.push({
        type: "content-overflow",
        box: box(e),
        pixels: +Math.max(r.x - b.x, b.right - r.right).toFixed(2),
      });
  }
  for (let i = 1; i < top.length; i++) {
    const a = top[i - 1].getBoundingClientRect(),
      b = top[i].getBoundingClientRect();
    if (b.y < a.bottom - 1)
      issues.push({
        type: "block-overlap",
        previous: box(top[i - 1]),
        current: box(top[i]),
        pixels: +(a.bottom - b.y).toFixed(2),
      });
  }
  for (const img of content.querySelectorAll("img"))
    if (visible(img) && img.complete && !img.naturalWidth)
      issues.push({ type: "broken-image", src: img.getAttribute("src") });
  for (const group of content.querySelectorAll(".columns,.card-group")) {
    const cards = [...group.querySelectorAll(".card")].filter(
      (e) => e.closest(".columns,.card-group") === group && visible(e),
    );
    const rows = new Map();
    for (const e of cards) {
      const b = e.getBoundingClientRect(),
        key = Math.round(b.y);
      if (!rows.has(key)) rows.set(key, []);
      rows.get(key).push(e);
    }
    for (const row of rows.values())
      if (row.length > 1) {
        const heights = row.map((e) => e.getBoundingClientRect().height);
        if (Math.max(...heights) - Math.min(...heights) > 1)
          issues.push({ type: "unequal-card-row", cards: row.map(box) });
      }
  }
  const components = {};
  for (const name of [
    "frame",
    "steps",
    "step",
    "callout",
    "card",
    "columns",
    "card-group",
    "accordion",
    "accordion-group",
  ])
    components[name] = content.querySelectorAll("." + name).length;
  return {
    url: location.pathname,
    title: document.querySelector("#page-title")?.innerText,
    width: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    content: box(content),
    header: box(header),
    elementsChecked: els.length,
    components,
    topLevelBlocks: top.map(box),
    issues,
  };
}
async function addGrid(p) {
  await p.evaluate(() => {
    const content = document.querySelector("#content"),
      head = document.querySelector("#header");
    if (!content || !head) return;
    const r = content.getBoundingClientRect(),
      h = head.getBoundingClientRect(),
      cols = innerWidth < 640 ? 4 : innerWidth < 1024 ? 8 : 12,
      gutter = innerWidth < 640 ? 12 : 16;
    const grid = document.createElement("div");
    grid.id = "policyden-audit-grid";
    grid.setAttribute("aria-hidden", "true");
    Object.assign(grid.style, {
      position: "absolute",
      pointerEvents: "none",
      zIndex: "99999",
      left: r.x + "px",
      top: h.y + scrollY + "px",
      width: r.width + "px",
      height: r.bottom - h.y + "px",
      display: "grid",
      gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`,
      gap: gutter + "px",
      backgroundImage:
        "repeating-linear-gradient(to bottom,rgba(224,54,80,.15) 0,rgba(224,54,80,.15) 1px,transparent 1px,transparent 8px)",
    });
    for (let i = 0; i < cols; i++) {
      const c = document.createElement("div");
      Object.assign(c.style, {
        borderInline: "1px solid rgba(70,82,185,.24)",
        background: "rgba(70,82,185,.025)",
      });
      grid.append(c);
    }
    document.body.append(grid);
  });
}
(async () => {
  const browser = await chromium.launch();
  const results = [];
  await Promise.all(
    widths.map(async (width) => {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        deviceScaleFactor: 1,
      });
      let index = 0;
      for (const route of queue) {
        const p = await context.newPage();
        p.setDefaultTimeout(15000);
        const item = { route, width };
        try {
          const response = await p.goto("http://localhost:3333/" + route, {
            waitUntil: "domcontentloaded",
          });
          item.status = response.status();
          if (item.status >= 400) throw Error("HTTP " + item.status);
          await p.waitForSelector("#content");
          await p.evaluate(() => document.fonts.ready);
          await pause(120);
          await p.evaluate(async () => {
            for (const v of document.querySelectorAll("video")) v.pause();
            await Promise.all(
              [...document.querySelectorAll("#content img")]
                .filter((i) => i.complete)
                .map((i) => i.decode().catch(() => {})),
            );
          });
          // Load off-screen media before measuring the entire document.
          const height = await p.evaluate(
            () => document.documentElement.scrollHeight,
          );
          for (let y = 0; y < height; y += 850) {
            await p.evaluate((y) => scrollTo(0, y), y);
            await pause(25);
          }
          await p.evaluate(() => scrollTo(0, 0));
          await pause(60);
          Object.assign(item, await p.evaluate(inspect));
          item.expanded = [];
          await p.evaluate(() => {
            for (const e of document.querySelectorAll("#content details"))
              e.open = true;
          });
          await pause(40);
          const opened = await p.evaluate(inspect);
          item.expanded.push({
            state: "accordions-open",
            elementsChecked: opened.elementsChecked,
            issues: opened.issues,
          });
          const tabs = p.locator("#content [role=tab]");
          for (let n = 0; n < (await tabs.count()); n++) {
            const t = tabs.nth(n);
            if (await t.isVisible()) {
              await t.click();
              await pause(40);
              const state = await p.evaluate(inspect);
              item.expanded.push({
                state: "tab:" + (await t.innerText()),
                elementsChecked: state.elementsChecked,
                issues: state.issues,
              });
            }
          }
          await p.evaluate(() => {
            for (const e of document.querySelectorAll("#content details"))
              e.open = false;
            scrollTo(0, 0);
          });
          await addGrid(p);
          const dest = path.join(
            out,
            `${width}-${route.replaceAll("/", "-")}.png`,
          );
          await p.screenshot({
            path: dest,
            fullPage: true,
            animations: "disabled",
          });
          item.screenshot = dest;
        } catch (e) {
          item.error = e.message.split("\n")[0];
        }
        await p.close();
        results.push(item);
        index++;
        if (index % 20 === 0)
          console.log(`${phase}: ${width}px ${index}/${queue.length}`);
        fs.writeFileSync(
          path.join(out, "results.json"),
          JSON.stringify(results, null, 2),
        );
      }
      await context.close();
    }),
  );
  await browser.close();
  const issues = results.flatMap((r) =>
    (r.issues || []).map((i) => ({ route: r.route, width: r.width, ...i })),
  );
  const expanded = results.flatMap((r) =>
    (r.expanded || []).flatMap((s) =>
      (s.issues || []).map((i) => ({
        route: r.route,
        width: r.width,
        state: s.state,
        ...i,
      })),
    ),
  );
  const grouped = {};
  for (const i of issues) grouped[i.type] = (grouped[i.type] || 0) + 1;
  const summary = {
    phase,
    pages: queue.length,
    viewports: widths,
    checks: results.length,
    elementsChecked: results.reduce(
      (n, x) =>
        n +
        (x.elementsChecked || 0) +
        (x.expanded || []).reduce((m, s) => m + s.elementsChecked, 0),
      0,
    ),
    errors: results.filter((r) => r.error),
    issuesByType: grouped,
    issues,
    expandedIssues: expanded,
  };
  fs.writeFileSync(
    path.join(out, "summary.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        ...summary,
        issues: issues.slice(0, 8),
        expandedIssues: expanded.slice(0, 8),
      },
      null,
      2,
    ),
  );
  if (summary.errors.length || issues.length || expanded.length)
    process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
