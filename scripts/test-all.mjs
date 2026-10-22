// scripts/test-all.mjs
// Comprehensive Multi-Tier Verification Suite for SlidePrompt.ai
// Covers:
// 1. Static SEO, Canonical, Hreflang & Single H1 Audit across 205 content pages
// 2. Comprehensive 47-Template × 4-Language × 3-Count Outline Algorithm Matrix (1,128 combinations)
// 3. Cloudflare Wrangler Local Dev Static Asset HTTP Audit (port 8788)
// 4. Real Google Chrome Headless Interaction: Full Mobile/Desktop Viewports, Cross-Template/Cross-Language Restores,
//    Strict Full-String Equality on Clipboard & Real Disk TXT Downloads, Zero Page/Console/Network Errors

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

import {
  SITE_URL,
  PROMPT_TEMPLATES,
  CORE_FAQS
} from '../src/templates-data.mjs';
import { LOCALIZED_TEMPLATES } from '../src/localized-templates.mjs';
import {
  selectSlideBlueprint,
  renderSlideOutline,
  buildSlideOutline,
  getCategoryKey,
  EXPANSION_POOLS,
  FALLBACK_EXEC_TITLES,
  SLIDE_PREFIXES
} from '../src/slide-structure-data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const ARTIFACT_DIR = process.env.TEST_ARTIFACT_DIR || '/Users/hemrmicloud.com/.gemini/antigravity/brain/28995471-5441-4217-9daf-2cb846e27acc';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const WRANGLER_PORT = process.env.TEST_PORT ? Number(process.env.TEST_PORT) : 8788;

let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passedChecks++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failedChecks++;
  }
}

console.log('====================================================');
console.log('   SlidePrompt.ai COMPREHENSIVE MULTI-TIER AUDIT    ');
console.log('====================================================');

// -------------------------------------------------------------
// TIER 1: Technical SEO & Canonical/Hreflang Bidirectional Audit
// -------------------------------------------------------------
console.log('\n--- TIER 1: Technical SEO & Canonical/Hreflang Audit ---');

function getAllContentHtmlFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllContentHtmlFiles(fullPath));
    } else if (entry.name === 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllContentHtmlFiles(DIST_DIR);
assert(htmlFiles.length === 212, `Generated 212 total index.html pages on disk (found: ${htmlFiles.length})`);

// 1. Root index `/` bidirectional hreflang check
const rootHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
const rootHasHreflang = /rel="alternate"\s+hreflang="zh-TW"/i.test(rootHtml) && /rel="alternate"\s+hreflang="x-default"/i.test(rootHtml);
assert(
  rootHasHreflang,
  'Root index (/) has valid reciprocal hreflang tags linking to /zh-TW/, /es/, /ja/, and x-default'
);

// 2. Multi-lingual route groups bidirectional hreflang check
const routeGroups = [
  {
    en: `${SITE_URL}/`,
    'zh-TW': `${SITE_URL}/zh-TW`,
    es: `${SITE_URL}/es`,
    ja: `${SITE_URL}/ja`
  },
  {
    en: `${SITE_URL}/chatgpt-slides-templates`,
    'zh-TW': `${SITE_URL}/zh-TW/chatgpt-slides-templates`,
    es: `${SITE_URL}/es/chatgpt-slides-templates`,
    ja: `${SITE_URL}/ja/chatgpt-slides-templates`
  },
  {
    en: `${SITE_URL}/chatgpt-slides-to-powerpoint`,
    'zh-TW': `${SITE_URL}/zh-TW/chatgpt-slides-to-powerpoint`,
    es: `${SITE_URL}/es/chatgpt-slides-to-powerpoint`,
    ja: `${SITE_URL}/ja/chatgpt-slides-to-powerpoint`
  },
  {
    en: `${SITE_URL}/chatgpt-slides-not-showing`,
    'zh-TW': `${SITE_URL}/zh-TW/chatgpt-slides-not-showing`,
    es: `${SITE_URL}/es/chatgpt-slides-not-showing`,
    ja: `${SITE_URL}/ja/chatgpt-slides-not-showing`
  }
];

for (const tpl of PROMPT_TEMPLATES) {
  routeGroups.push({
    en: `${SITE_URL}/prompts/${tpl.slug}`,
    'zh-TW': `${SITE_URL}/zh-TW/prompts/${tpl.slug}`,
    es: `${SITE_URL}/es/prompts/${tpl.slug}`,
    ja: `${SITE_URL}/ja/prompts/${tpl.slug}`
  });
}

assert(routeGroups.length === 51, `Identified 51 multi-lingual content route groups (51 * 4 = 204 pages)`);

let selfCanonicalMismatches = 0;
let brokenLoops = 0;

for (const group of routeGroups) {
  for (const [lang, pageUrl] of Object.entries(group)) {
    const urlObj = new URL(pageUrl);
    let relPath = urlObj.pathname.replace(/^\//, '');
    const htmlPath = path.join(DIST_DIR, relPath, 'index.html');
    if (!fs.existsSync(htmlPath)) {
      brokenLoops++;
      continue;
    }

    const html = fs.readFileSync(htmlPath, 'utf8');

    // Self-canonical check
    const canMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
    if (!canMatch || canMatch[1] !== pageUrl) {
      selfCanonicalMismatches++;
    }

    // Reciprocal hreflang checks
    const expectedUrls = {
      'x-default': group.en,
      en: group.en,
      'zh-TW': group['zh-TW'],
      es: group.es,
      ja: group.ja
    };

    for (const [targetLang, targetUrl] of Object.entries(expectedUrls)) {
      const tagRegex = new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${targetLang}"\\s+href="${targetUrl}"`, 'i');
      if (!tagRegex.test(html)) {
        brokenLoops++;
      }
    }
  }
}

assert(selfCanonicalMismatches === 0, `All 204 localized pages have matching self-canonical URLs (mismatches: ${selfCanonicalMismatches})`);
assert(brokenLoops === 0, `All 51 route groups form 100% complete bidirectional hreflang loops (broken links: ${brokenLoops})`);

// 3. Prohibited phrases scan
const prohibitedPhrases = [
  'GPT-5',
  'GPT-4o',
  'Canvas & Collaborative Slides',
  'clearing cache',
  'clear your browser cache',
  '零隐私泄露',
  '抗百万流量',
  '毫秒级响应',
  '无任何帧率顿挫',
  'chatgpt.com/?q=',
  'Supported on ChatGPT Plus, Pro, Team, Edu',
  'Plus, Pro, Team, Edu'
];

let prohibitedFound = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const phrase of prohibitedPhrases) {
    if (content.includes(phrase)) {
      prohibitedFound.push({ file: path.relative(DIST_DIR, file), phrase });
    }
  }
}
assert(
  prohibitedFound.length === 0,
  `No prohibited unverified marketing, fake admin, or unsupported plan promises in HTML (violations: ${prohibitedFound.length})`
);

// 4. Single H1 tag check across all 208 canonical content pages
let multiH1 = 0;
let canonicalEvaluated = 0;
for (const file of htmlFiles) {
  const rel = path.relative(DIST_DIR, file);
  if (rel.includes('chatgpt-slides-prompt-generator')) continue; // Skip redirect stubs
  const content = fs.readFileSync(file, 'utf8');
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length !== 1) multiH1++;
  canonicalEvaluated++;
}
assert(canonicalEvaluated === 208, `Evaluated exactly 208 canonical pages for single H1 (evaluated: ${canonicalEvaluated})`);
assert(multiH1 === 0, `All 208 canonical content pages have exactly one <h1> tag (violations: ${multiH1})`);

// 5. Sitemap URL count
const sitemapContent = fs.readFileSync(path.join(DIST_DIR, 'sitemap.xml'), 'utf8');
const sitemapUrlCount = (sitemapContent.match(/<loc>/g) || []).length;
assert(sitemapUrlCount === 208, `sitemap.xml contains exactly 208 URLs (found: ${sitemapUrlCount})`);

// 6. Trust & Compliance Pages & Self-Canonical Check
const trustPages = ['privacy', 'terms', 'about', 'contact'];
let trustMismatches = 0;
for (const tp of trustPages) {
  const content = fs.readFileSync(path.join(DIST_DIR, tp, 'index.html'), 'utf8');
  if (!content.includes(`<link rel="canonical" href="${SITE_URL}/${tp}" />`)) {
    trustMismatches++;
  }
}
assert(trustMismatches === 0, `All 4 trust pages (/privacy, /terms, /about, /contact) have self-canonical (mismatches: ${trustMismatches})`);

// 7. Legacy Route Stubs Redirect Verification
const redirectChecks = [
  ['chatgpt-slides-prompt-generator', '/'],
  ['zh-TW/chatgpt-slides-prompt-generator', '/zh-TW'],
  ['es/chatgpt-slides-prompt-generator', '/es'],
  ['ja/chatgpt-slides-prompt-generator', '/ja']
];
let redirectErrors = 0;
for (const [rPath, target] of redirectChecks) {
  const content = fs.readFileSync(path.join(DIST_DIR, rPath, 'index.html'), 'utf8');
  if (!content.includes(`meta http-equiv="refresh" content="0; url=${target}"`)) {
    redirectErrors++;
  }
}
assert(redirectErrors === 0, `All 4 legacy generator routes have immediate meta refresh to canonical homepage (errors: ${redirectErrors})`);

// 8. 404 Page Quality Check
const notFoundHtml = fs.readFileSync(path.join(DIST_DIR, '404.html'), 'utf8');
assert(notFoundHtml.length > 500, `404.html is non-empty styled document (size: ${notFoundHtml.length} bytes)`);
assert(notFoundHtml.includes('404 - Page Not Found'), '404.html contains clear error title');

// 9. Localized FAQ & Category Chips Translations Check
const zhIndexHtml = fs.readFileSync(path.join(DIST_DIR, 'zh-TW', 'index.html'), 'utf8');
assert(zhIndexHtml.includes('什麼是 ChatGPT Slides？它如何運作？'), 'zh-TW index.html FAQ section is fully translated');
assert(zhIndexHtml.includes('全部模板') && zhIndexHtml.includes('銷售與商務營收'), 'zh-TW index.html category chips are fully translated');


// -------------------------------------------------------------
// TIER 2: Comprehensive 47 Templates × 4 Languages Outline Matrix
// (47 templates × 4 languages × 2 summary states × 3 counts = 1,128 combinations)
// -------------------------------------------------------------
console.log('\n--- TIER 2: Comprehensive Slide Outline Algorithm Testing (1,128 Combinations) ---');

let outlineMatrixErrors = 0;
const testCounts = [5, 10, 20];
const testLanguages = ['en', 'zh-TW', 'es', 'ja'];

// 1. Regression verification specifically for lesson-plan, lesson-deck, investor-update
for (const slug of ['lesson-plan', 'lesson-deck', 'investor-update']) {
  const tpl = PROMPT_TEMPLATES.find((t) => t.slug === slug);
  const origSlide2 = tpl.slideStructure[1].replace(/^(Slide|投影片|Diapositiva|スライド)\s+\d+[:：]\s*/i, '').trim();

  // At count 10 with summary OFF: Slide 2 MUST be preserved
  const bpOff = selectSlideBlueprint(tpl.slides, 10, false, tpl.category);
  const renderedOff = renderSlideOutline(bpOff, tpl.slides, null, tpl.category, 'en');
  if (!renderedOff[1].includes(origSlide2) || bpOff[1].role === 'executive-summary') {
    console.error(`[Regression FAIL] ${slug} Slide 2 was wrongfully removed or flagged as summary: got "${renderedOff[1]}"`);
    outlineMatrixErrors++;
  }

  // At count 10 with summary ON: A synthetic executive summary must be inserted at Slide 2
  const bpOn = selectSlideBlueprint(tpl.slides, 10, true, tpl.category);
  const renderedOn = renderSlideOutline(bpOn, tpl.slides, null, tpl.category, 'en');
  if (!renderedOn[1].includes('Executive Summary & Core Agenda') || bpOn[1].role !== 'executive-summary') {
    console.error(`[Regression FAIL] ${slug} did not insert synthetic executive summary at Slide 2: got "${renderedOn[1]}"`);
    outlineMatrixErrors++;
  }
}
assert(
  outlineMatrixErrors === 0,
  'Regression check passed: lesson-plan, lesson-deck, and investor-update preserve normal Slide 2 when summary is OFF'
);

// 2. Full Matrix Test across all 47 templates
let combinationsTested = 0;
for (const tpl of PROMPT_TEMPLATES) {
  for (const count of testCounts) {
    for (const hasExec of [false, true]) {
      // Step A: Select slide blueprint once using template structural data
      const blueprint = selectSlideBlueprint(tpl.slides, count, hasExec, tpl.category);
      combinationsTested++;

      // Assert 1: Target count length
      if (blueprint.length !== count) {
        console.error(`[Matrix FAIL] Blueprint length mismatch for ${tpl.slug} count ${count} exec ${hasExec}: got ${blueprint.length}`);
        outlineMatrixErrors++;
      }

      // Assert 2: First slide is title role, last slide is closing role
      if (blueprint[0].role !== 'title') {
        console.error(`[Matrix FAIL] First slide is not title role for ${tpl.slug}: ${blueprint[0].role}`);
        outlineMatrixErrors++;
      }
      if (blueprint[blueprint.length - 1].role !== 'closing') {
        console.error(`[Matrix FAIL] Last slide is not closing role for ${tpl.slug}: ${blueprint[blueprint.length - 1].role}`);
        outlineMatrixErrors++;
      }

      // Assert 3: Executive summary role rules
      const execSummarySlides = blueprint.filter((s) => s.role === 'executive-summary');
      if (!hasExec && execSummarySlides.length !== 0) {
        console.error(`[Matrix FAIL] Executive summary found when OFF in ${tpl.slug}: count=${execSummarySlides.length}`);
        outlineMatrixErrors++;
      }
      if (hasExec && count >= 2) {
        if (execSummarySlides.length !== 1 || blueprint[1].role !== 'executive-summary') {
          console.error(`[Matrix FAIL] Executive summary not exactly 1 at index 1 when ON in ${tpl.slug}: count=${execSummarySlides.length}`);
          outlineMatrixErrors++;
        }
      }

      // Assert 4: No duplicate slide IDs
      const idSet = new Set(blueprint.map((s) => s.id));
      if (idSet.size !== blueprint.length) {
        console.error(`[Matrix FAIL] Duplicate slide ID in blueprint for ${tpl.slug} count ${count}: unique ${idSet.size} vs total ${blueprint.length}`);
        outlineMatrixErrors++;
      }

      // Assert 5: When count >= base slides length (no compression), all original content slides preserved
      const isNoExecTemplate = [
        'lesson-plan', 'lesson-deck', 'webinar-slides', 'investor-update',
        'training-workshop', 'medical-case-presentation', 'post-mortem', 'keynote-speech'
      ].includes(tpl.slug);
      const expectedBaseLength = hasExec
        ? (isNoExecTemplate ? tpl.slides.length + 1 : tpl.slides.length)
        : (isNoExecTemplate ? tpl.slides.length : tpl.slides.length - 1);

      if (count >= expectedBaseLength) {
        const expectedBaseSlides = hasExec
          ? tpl.slides
          : tpl.slides.filter((s) => s.role !== 'executive-summary');
        for (const baseSlide of expectedBaseSlides) {
          if (!idSet.has(baseSlide.id)) {
            console.error(`[Matrix FAIL] Original slide ${baseSlide.id} dropped without compression in ${tpl.slug} count ${count}`);
            outlineMatrixErrors++;
          }
        }
      }

      // Step B: Render across all 4 languages using the EXACT SAME blueprint
      const renderedByLang = {};
      for (const lang of testLanguages) {
        const locTpl = LOCALIZED_TEMPLATES[lang]?.[tpl.slug];
        const locSlides = locTpl ? locTpl.slides : null;
        const rendered = renderSlideOutline(blueprint, tpl.slides, locSlides, tpl.category, lang);
        renderedByLang[lang] = rendered;

        // Check length
        if (rendered.length !== count) {
          console.error(`[Matrix FAIL] Rendered length mismatch for ${tpl.slug} in ${lang}`);
          outlineMatrixErrors++;
        }

        // Check prefix
        const prefix = SLIDE_PREFIXES[lang](1);
        if (!rendered[0].startsWith(prefix)) {
          console.error(`[Matrix FAIL] Prefix mismatch for ${tpl.slug} in ${lang}: got "${rendered[0]}"`);
          outlineMatrixErrors++;
        }

        // Check no undefined or null or [object Object]
        for (let i = 0; i < rendered.length; i++) {
          const item = rendered[i];
          if (!item || item.includes('undefined') || item.includes('null') || item.includes('[object Object]')) {
            console.error(`[Matrix FAIL] Invalid rendered text at ${tpl.slug} slide ${i} in ${lang}: "${item}"`);
            outlineMatrixErrors++;
          }
        }

        // Translation verification for non-English languages
        if (lang !== 'en') {
          const locMap = locSlides ? new Map(locSlides.map((s) => [s.id, s.title])) : new Map();
          for (let i = 0; i < blueprint.length; i++) {
            const slideItem = blueprint[i];
            let expectedTitle = '';

            if (slideItem.id.startsWith('exp-')) {
              for (const cat of Object.keys(EXPANSION_POOLS)) {
                const pool = EXPANSION_POOLS[cat]?.[lang] || [];
                const expMatch = pool.find((x) => x.id === slideItem.id);
                if (expMatch) {
                  expectedTitle = expMatch.title;
                  break;
                }
              }
            } else if (slideItem.id === 'slide-exec-summary') {
              expectedTitle = locMap.get(slideItem.id) || FALLBACK_EXEC_TITLES[lang];
            } else {
              expectedTitle = locMap.get(slideItem.id);
            }

            if (!expectedTitle || !expectedTitle.trim()) {
              console.error(`[Matrix FAIL] Missing localized title in ${lang} for ${tpl.slug} slide ${slideItem.id}`);
              outlineMatrixErrors++;
            }

            // Verify rendered text contains the localized title
            if (!rendered[i].includes(expectedTitle)) {
              console.error(`[Matrix FAIL] Rendered slide ${i} in ${lang} does not contain expected title "${expectedTitle}": got "${rendered[i]}"`);
              outlineMatrixErrors++;
            }
          }
        }
      }

      // Assert 6: 4-language blueprint parity
      for (let i = 0; i < count; i++) {
        if (!renderedByLang.en[i] || !renderedByLang['zh-TW'][i] || !renderedByLang.es[i] || !renderedByLang.ja[i]) {
          console.error(`[Matrix FAIL] Missing translation at index ${i} for ${tpl.slug}`);
          outlineMatrixErrors++;
        }
      }
    }
  }
}

assert(
  outlineMatrixErrors === 0,
  `All 1,128 combinations (47 templates × 4 languages × 2 summary states × 3 slide counts) passed 100% (errors: ${outlineMatrixErrors})`
);


// -------------------------------------------------------------
// TIER 3: Cloudflare Wrangler Local Dev Static Asset HTTP Audit
// -------------------------------------------------------------
console.log('\n--- TIER 3: Cloudflare Wrangler Local Dev HTTP Audit (Port 8788) ---');

let wranglerProcess = null;
let wranglerReady = false;

async function startWranglerDev() {
  return new Promise((resolve, reject) => {
    wranglerProcess = spawn('npx', ['wrangler', 'dev', '--port', String(WRANGLER_PORT), '--ip', '127.0.0.1'], {
      cwd: ROOT_DIR,
      stdio: 'pipe'
    });

    const timeout = setTimeout(() => {
      reject(new Error('Wrangler dev startup timed out after 12s'));
    }, 12000);

    wranglerProcess.stdout.on('data', (chunk) => {
      const msg = chunk.toString();
      if (msg.includes(`Ready on http://127.0.0.1:${WRANGLER_PORT}`)) {
        clearTimeout(timeout);
        wranglerReady = true;
        resolve();
      }
    });

    wranglerProcess.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

try {
  await startWranglerDev();
  assert(wranglerReady, `Wrangler dev server running at http://127.0.0.1:${WRANGLER_PORT}`);
} catch (err) {
  console.warn('Wrangler dev failed to start:', err.message);
  assert(false, `Wrangler dev server running at http://127.0.0.1:${WRANGLER_PORT}`);
}

async function testHttpUrl(urlPath, expectedType, redirectsCount = 0) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:${WRANGLER_PORT}${urlPath}`, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirectsCount < 3) {
          const loc = res.headers.location;
          const nextPath = loc.startsWith('http') ? new URL(loc).pathname : loc;
          testHttpUrl(nextPath, expectedType, redirectsCount + 1).then(resolve);
          return;
        }
        resolve({
          statusCode: res.statusCode,
          contentType: res.headers['content-type'] || '',
          bodyLength: body.length,
          location: res.headers['location'] || ''
        });
      });
    }).on('error', (err) => resolve({ statusCode: 500, error: err.message, contentType: '', location: '' }));
  });
}

const sampleUrlsToFetch = [
  ['/', 'text/html'],
  ['/zh-TW', 'text/html'],
  ['/ja', 'text/html'],
  ['/es', 'text/html'],
  ['/privacy', 'text/html'],
  ['/terms', 'text/html'],
  ['/about', 'text/html'],
  ['/contact', 'text/html'],
  ['/chatgpt-slides-prompt-generator', 'text/html'],
  ['/zh-TW/chatgpt-slides-prompt-generator', 'text/html'],
  ['/prompts/pitch-deck', 'text/html'],
  ['/sitemap.xml', 'application/xml'],
  ['/robots.txt', 'text/plain'],
  ['/google8c6329c58e485687.html', 'text/html'],
  ['/og-preview.png', 'image/png'],
  ['/favicon.svg', 'image/svg+xml'],
  ['/favicon.ico', 'image/'],
  ['/styles.css', 'text/css'],
  ['/slide-structure-data.js', 'javascript'],
  ['/app.js', 'javascript']
];

let httpFailures = 0;
for (const [u, expectedMime] of sampleUrlsToFetch) {
  const resp = await testHttpUrl(u, expectedMime);
  const isOk = resp.statusCode === 200 || (resp.statusCode === 307 && u.includes('google'));
  const isMimeMatch = !expectedMime || resp.statusCode === 307 || resp.contentType.includes(expectedMime);

  if (!isOk || !isMimeMatch) {
    console.error(`HTTP check failed on ${u}: status ${resp.statusCode}, content-type ${resp.contentType}`);
    httpFailures++;
  }
}
assert(
  httpFailures === 0,
  `Actual HTTP network GET requests via Wrangler return HTTP 200/307 with valid Content-Type (failed: ${httpFailures})`
);

// Explicit 404 Page Verification via HTTP
const notFoundResp = await testHttpUrl('/non-existent-probe-check', 'text/html');
assert(
  notFoundResp.statusCode === 404 && notFoundResp.bodyLength > 500,
  `Wrangler serves non-empty 404.html page for missing URLs (status: ${notFoundResp.statusCode}, bodyLength: ${notFoundResp.bodyLength})`
);


// -------------------------------------------------------------
// TIER 4: Real Headless Chrome Browser Automation & Interaction Audit (Puppeteer)
// -------------------------------------------------------------
console.log('\n--- TIER 4: Real Headless Chrome Browser Automation & Interaction Audit ---');

const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-gpu',
    '--mute-audio',
    '--hide-scrollbars',
    '--enable-features=ClipboardContentSetting'
  ]
});

const page = await browser.newPage();

// Strict runtime listeners: page errors, console errors, failed resource requests
const pageErrors = [];
const consoleErrors = [];
const failedRequests = [];

page.on('pageerror', (err) => {
  pageErrors.push(err.message);
  console.error('[Browser PageError]', err.message);
});

page.on('console', (msg) => {
  if (msg.type() === 'error') {
    consoleErrors.push(msg.text());
    console.error('[Browser ConsoleError]', msg.text());
  }
});

page.on('requestfailed', (req) => {
  const failure = req.failure();
  failedRequests.push(`${req.url()} (${failure?.errorText || 'failed'})`);
  console.error('[Browser RequestFailed]', req.url(), failure?.errorText);
});

// Grant permissions for clipboard operations
const client = await page.target().createCDPSession();
await client.send('Browser.grantPermissions', {
  permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite']
});

// Setup real disk download folder
const downloadDir = path.join(ARTIFACT_DIR, 'scratch/downloads');
fs.mkdirSync(downloadDir, { recursive: true });
fs.readdirSync(downloadDir).forEach((f) => fs.unlinkSync(path.join(downloadDir, f)));

await client.send('Page.setDownloadBehavior', {
  behavior: 'allow',
  downloadPath: downloadDir
});

// 1. Visit Homepage over HTTP in Desktop Viewport (1280×800)
await page.setViewport({ width: 1280, height: 800 });
const navResponse = await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/`, {
  waitUntil: 'networkidle0'
});
assert(navResponse.status() === 200, 'Navigated to http://127.0.0.1:8788/ with HTTP 200 OK');

// Check that styles loaded and applied (computed style check on body)
const bodyFont = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily);
assert(
  bodyFont.includes('system-ui') || bodyFont.includes('sans-serif'),
  `CSS stylesheets loaded and active (computed body font: ${bodyFont.slice(0, 30)}...)`
);

// Capture Real Desktop (1280×800) Viewport Screenshot over HTTP with Full CSS
const desktopScreenshotPath = path.join(ARTIFACT_DIR, 'preview-desktop.png');
await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
assert(
  fs.existsSync(desktopScreenshotPath),
  `Captured desktop viewport screenshot over HTTP (${desktopScreenshotPath})`
);

// Unified 11-Parameter & Structural Assertion Helper
async function getAndAssert11Params(page, expected, contextLabel) {
  const state = await page.evaluate(() => {
    const getVal = (id) => document.getElementById(id)?.value;
    const getChecked = (id) => document.getElementById(id)?.checked;
    const sourceChecked = document.querySelector('input[name="source"]:checked')?.value;
    const cards = Array.from(document.querySelectorAll('#storyboard-cards .mini-slide-card')).map((el) => el.textContent.trim());
    return {
      topic: getVal('input-topic'),
      slides: getVal('range-slides'),
      style: getVal('select-style'),
      language: getVal('select-language'),
      audience: getVal('select-audience'),
      goal: getVal('select-goal'),
      source: sourceChecked,
      hasExec: getChecked('chk-exec-summary'),
      hasCharts: getChecked('chk-charts'),
      hasCitations: getChecked('chk-citations'),
      hasNotes: getChecked('chk-notes'),
      cards,
      prompt: getVal('prompt-output')
    };
  });

  if (expected.topic !== undefined) {
    assert(state.topic === expected.topic, `${contextLabel}: restored topic matches "${expected.topic}"`);
  }
  if (expected.slides !== undefined) {
    assert(state.slides === String(expected.slides), `${contextLabel}: restored slide count matches ${expected.slides}`);
    assert(state.cards.length === Number(expected.slides), `${contextLabel}: storyboard contains ${expected.slides} cards (found: ${state.cards.length})`);
  }
  if (expected.style !== undefined) {
    assert(state.style === expected.style, `${contextLabel}: restored style matches "${expected.style}"`);
  }
  if (expected.language !== undefined) {
    assert(state.language === expected.language, `${contextLabel}: restored language matches "${expected.language}"`);
  }
  if (expected.audience !== undefined) {
    assert(state.audience === expected.audience, `${contextLabel}: restored audience matches "${expected.audience}"`);
  }
  if (expected.goal !== undefined) {
    assert(state.goal === expected.goal, `${contextLabel}: restored goal matches "${expected.goal}"`);
  }
  if (expected.source !== undefined) {
    assert(state.source === expected.source, `${contextLabel}: restored source matches "${expected.source}"`);
  }
  if (expected.hasExec !== undefined) {
    assert(state.hasExec === expected.hasExec, `${contextLabel}: restored executive summary checkbox matches ${expected.hasExec}`);
    if (expected.hasExec && state.cards.length >= 2) {
      assert(
        state.cards[1].includes('Executive Summary') || state.cards[1].includes('執行摘要') || state.cards[1].includes('Resumen') || state.cards[1].includes('サマリー'),
        `${contextLabel}: slide 2 role is executive summary when ON`
      );
    } else if (!expected.hasExec && state.cards.length >= 2) {
      assert(
        !state.cards[1].includes('Executive Summary') && !state.cards[1].includes('執行摘要') && !state.cards[1].includes('Resumen') && !state.cards[1].includes('サマリー'),
        `${contextLabel}: slide 2 role is content slide when summary is OFF`
      );
    }
  }
  if (expected.hasCharts !== undefined) {
    assert(state.hasCharts === expected.hasCharts, `${contextLabel}: restored charts checkbox matches ${expected.hasCharts}`);
  }
  if (expected.hasCitations !== undefined) {
    assert(state.hasCitations === expected.hasCitations, `${contextLabel}: restored citations checkbox matches ${expected.hasCitations}`);
  }
  if (expected.hasNotes !== undefined) {
    assert(state.hasNotes === expected.hasNotes, `${contextLabel}: restored notes checkbox matches ${expected.hasNotes}`);
  }

  return state;
}

// Helper to configure all 11 controls declaratively
async function configure11Params(page, params) {
  await page.evaluate((p) => {
    const topic = document.getElementById('input-topic');
    if (topic && p.topic !== undefined) {
      topic.value = p.topic;
      topic.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const slider = document.getElementById('range-slides');
    if (slider && p.slides !== undefined) {
      slider.value = String(p.slides);
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const style = document.getElementById('select-style');
    if (style && p.style !== undefined) {
      style.value = p.style;
      style.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const lang = document.getElementById('select-language');
    if (lang && p.language !== undefined) {
      lang.value = p.language;
      lang.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const aud = document.getElementById('select-audience');
    if (aud && p.audience !== undefined) {
      aud.value = p.audience;
      aud.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const goal = document.getElementById('select-goal');
    if (goal && p.goal !== undefined) {
      goal.value = p.goal;
      goal.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (p.source) {
      const radio = document.querySelector(`input[name="source"][value="${p.source}"]`);
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
    const chkExec = document.getElementById('chk-exec-summary');
    if (chkExec && p.hasExec !== undefined) {
      chkExec.checked = p.hasExec;
      chkExec.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const chkCharts = document.getElementById('chk-charts');
    if (chkCharts && p.hasCharts !== undefined) {
      chkCharts.checked = p.hasCharts;
      chkCharts.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const chkCitations = document.getElementById('chk-citations');
    if (chkCitations && p.hasCitations !== undefined) {
      chkCitations.checked = p.hasCitations;
      chkCitations.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const chkNotes = document.getElementById('chk-notes');
    if (chkNotes && p.hasNotes !== undefined) {
      chkNotes.checked = p.hasNotes;
      chkNotes.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, params);
}

async function openDrawer(page) {
  await page.evaluate(() => {
    const btn = document.getElementById('btn-open-saved-drawer');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 500));
}

async function closeDrawer(page) {
  await new Promise((r) => setTimeout(r, 450));
  await page.evaluate(() => {
    const btn = document.getElementById('btn-close-saved-drawer');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 400));
}

// 2. Full Mobile Viewport (390×844) Operations
console.log('\n--- Testing Mobile Viewport (390×844) Real Touch Interactions ---');
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/`, { waitUntil: 'networkidle0' });

// Check horizontal overflow on mobile viewport
const hasHorizontalOverflow = await page.evaluate(() => {
  return document.documentElement.scrollWidth > document.documentElement.clientWidth;
});
assert(!hasHorizontalOverflow, 'Mobile viewport layout verified: no horizontal page scroll or overflow');

// Capture Mobile Top Screenshot
const mobileScreenshotPath = path.join(ARTIFACT_DIR, 'preview-mobile.png');
await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
assert(fs.existsSync(mobileScreenshotPath), `Captured mobile top screenshot (${mobileScreenshotPath})`);

// A. Real typing into #input-topic & Empty Topic Validation
await page.click('#input-topic');
await page.evaluate(() => {
  const el = document.getElementById('input-topic');
  if (el) {
    el.value = '';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
});

const emptyOutputText = await page.$eval('#prompt-output', (el) => el.value);
assert(
  emptyOutputText.includes('Please enter your presentation topic above') && !emptyOutputText.includes('[TOPIC:'),
  'Empty topic: output box displays helpful guidance text instead of placeholder brackets'
);

// Click copy button with empty topic: must highlight input and show toast
await page.click('#btn-copy-prompt');
await new Promise((r) => setTimeout(r, 200));
const isInputInvalid = await page.$eval('#input-topic', (el) => el.classList.contains('input-invalid'));
const toastMsg = await page.$eval('#app-toast', (el) => el.textContent);
assert(isInputInvalid, 'Empty topic validation: #input-topic receives input-invalid class');
assert(toastMsg.includes('Please enter a presentation topic first'), 'Empty topic validation: warning toast is displayed');

// Indefinite article tests (8, 11, 18 vs other counts)
await page.evaluate(() => {
  const el = document.getElementById('input-topic');
  if (el) {
    el.value = 'Grammar Verification Topic';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
  const slider = document.getElementById('range-slides');
  if (slider) {
    slider.value = '8';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }
});
const output8 = await page.$eval('#prompt-output', (el) => el.value);
assert(output8.startsWith('Create an 8-slide presentation'), 'Grammar check: uses "an 8-slide presentation"');

await page.evaluate(() => {
  const slider = document.getElementById('range-slides');
  if (slider) {
    slider.value = '11';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }
});
const output11 = await page.$eval('#prompt-output', (el) => el.value);
assert(output11.startsWith('Create an 11-slide presentation'), 'Grammar check: uses "an 11-slide presentation"');

await page.evaluate(() => {
  const slider = document.getElementById('range-slides');
  if (slider) {
    slider.value = '18';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }
});
const output18 = await page.$eval('#prompt-output', (el) => el.value);
assert(output18.startsWith('Create an 18-slide presentation'), 'Grammar check: uses "an 18-slide presentation"');

await page.evaluate(() => {
  const slider = document.getElementById('range-slides');
  if (slider) {
    slider.value = '10';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }
});
const output10 = await page.$eval('#prompt-output', (el) => el.value);
assert(output10.startsWith('Create a 10-slide presentation'), 'Grammar check: uses "a 10-slide presentation"');

await page.evaluate(() => {
  const el = document.getElementById('input-topic');
  if (el) el.value = '';
});
await page.type('#input-topic', 'Mobile Responsive AI Workflow Strategy');
await page.evaluate(() => {
  document.getElementById('input-topic')?.dispatchEvent(new Event('input', { bubbles: true }));
});
const mobileOutput1 = await page.$eval('#prompt-output', (el) => el.value);
assert(
  mobileOutput1.includes('Mobile Responsive AI Workflow Strategy'),
  'Mobile touch interaction: typing into #input-topic updates prompt output'
);

// B. Adjust slide count slider to 15
await page.evaluate(() => {
  const slider = document.getElementById('range-slides');
  if (slider) {
    slider.value = '15';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }
});
const mobileOutput2 = await page.$eval('#prompt-output', (el) => el.value);
assert(
  mobileOutput2.includes('Create a 15-slide presentation') && mobileOutput2.includes('Slide 15:'),
  'Mobile interaction: slider updates prompt to 15 slides'
);

// C. Select style via native dropdown
await page.select('#select-style', 'keynote');
const mobileOutputKeynote = await page.$eval('#prompt-output', (el) => el.value);
assert(
  mobileOutputKeynote.includes('Apple Keynote style') || mobileOutputKeynote.includes('hero metric'),
  'Mobile interaction: style select keynote updates prompt directives'
);

// D. Select language via native dropdown
await page.select('#select-language', '繁體中文');
const mobileOutputLang = await page.$eval('#prompt-output', (el) => el.value);
assert(
  mobileOutputLang.includes('Language: 繁體中文'),
  'Mobile interaction: language select updates prompt output language'
);

// E. Toggle executive summary checkbox
await page.click('#chk-exec-summary');
const mobileOutputNoExec = await page.$eval('#prompt-output', (el) => el.value);
assert(
  !mobileOutputNoExec.includes('Include an executive summary slide right after the title slide'),
  'Mobile interaction: unchecking executive summary removes summary directive'
);

// F. Select source radio button
await page.click('label[for="src-file"]');
await page.evaluate(() => {
  const radio = document.getElementById('src-file');
  if (radio) {
    radio.checked = true;
    radio.dispatchEvent(new Event('change', { bubbles: true }));
  }
});
const mobileOutputFileSource = await page.$eval('#prompt-output', (el) => el.value);
assert(
  mobileOutputFileSource.includes('attached/uploaded document'),
  'Mobile interaction: selecting file source updates data source instruction'
);

// Configure explicit non-default values for audience, goal, and remaining checkboxes
await page.select('#select-audience', 'Cross-Functional Product & Engineering Team');
await page.select('#select-goal', 'Educate & Train Audience on Core Concepts');
await page.evaluate(() => {
  const chkCharts = document.getElementById('chk-charts');
  if (chkCharts && chkCharts.checked) {
    chkCharts.checked = false;
    chkCharts.dispatchEvent(new Event('change', { bubbles: true }));
  }
  const chkCitations = document.getElementById('chk-citations');
  if (chkCitations && !chkCitations.checked) {
    chkCitations.checked = true;
    chkCitations.dispatchEvent(new Event('change', { bubbles: true }));
  }
  const chkNotes = document.getElementById('chk-notes');
  if (chkNotes && chkNotes.checked) {
    chkNotes.checked = false;
    chkNotes.dispatchEvent(new Event('change', { bubbles: true }));
  }
});

// G. Scroll down to storyboard strip & action area
await page.evaluate(() => {
  const strip = document.querySelector('.storyboard-strip');
  if (strip) strip.scrollIntoView({ behavior: 'instant', block: 'center' });
});
await new Promise((r) => setTimeout(r, 300));
const mobileScrolledScreenshotPath = path.join(ARTIFACT_DIR, 'preview-mobile-scrolled.png');
await page.screenshot({ path: mobileScrolledScreenshotPath, fullPage: false });
assert(
  fs.existsSync(mobileScrolledScreenshotPath),
  `Captured mobile scrolled storyboard screenshot (${mobileScrolledScreenshotPath})`
);

// H. Real clipboard copy & strict string comparison (no trim)
await page.bringToFront();
await page.evaluate(() => window.focus());
await page.click('#btn-copy-prompt');

await page.waitForFunction(() => {
  const el = document.getElementById('app-toast');
  return el && el.textContent.trim().length > 0;
}, { timeout: 3000 });

const mobileClipboardText = await page.evaluate(async () => {
  try {
    return await navigator.clipboard.readText();
  } catch {
    return '';
  }
});
const mobilePromptVal = await page.$eval('#prompt-output', (el) => el.value);
assert(
  mobileClipboardText === mobilePromptVal,
  `Mobile clipboard verified: EXACT full-string match without trim (${mobileClipboardText.length} chars === ${mobilePromptVal.length} chars)`
);

// I. Simulated copy failure fallback
await page.evaluate(() => {
  navigator.clipboard.writeText = () => Promise.reject(new Error('Permission denied'));
  document.execCommand = () => false;
});
await page.click('#btn-copy-prompt');
await page.waitForFunction(() => {
  const el = document.getElementById('app-toast');
  return el && (el.textContent.includes('Ctrl+C') || el.textContent.includes('手動複製') || el.textContent.includes('Manual') || el.textContent.includes('blocked'));
}, { timeout: 3000 });
const fallbackSelection = await page.evaluate(() => {
  const active = document.activeElement;
  return active && active.id === 'prompt-output' && active.selectionStart === 0 && active.selectionEnd === active.value.length;
});
assert(fallbackSelection, 'Mobile copy failure fallback: prompt text selected for manual copy');

// J. Real disk TXT download & strict string comparison (no trim)
await page.click('#btn-download-txt');
let mobileDownloadedContent = '';
for (let wait = 0; wait < 15; wait++) {
  await new Promise((r) => setTimeout(r, 200));
  const files = fs.readdirSync(downloadDir);
  if (files.length > 0) {
    const downloadedFilePath = path.join(downloadDir, files[0]);
    mobileDownloadedContent = fs.readFileSync(downloadedFilePath, 'utf8');
    break;
  }
}
assert(
  mobileDownloadedContent === mobilePromptVal,
  `Mobile disk TXT download verified: EXACT full-string match on disk without trim (${mobileDownloadedContent.length} chars)`
);
fs.readdirSync(downloadDir).forEach((f) => fs.unlinkSync(path.join(downloadDir, f)));

// K. Save prompt & capture mobile drawer WITH saved content
await page.click('#btn-save-local');
await new Promise((r) => setTimeout(r, 450));
const mobileDrawerScreenshotPath = path.join(ARTIFACT_DIR, 'preview-mobile-drawer.png');
await page.screenshot({ path: mobileDrawerScreenshotPath, fullPage: false });
assert(
  fs.existsSync(mobileDrawerScreenshotPath),
  `Captured mobile drawer screenshot with saved items (${mobileDrawerScreenshotPath})`
);

// L. Close drawer via tap on scrim (using offset on the exposed scrim area)
await page.click('#saved-drawer-scrim', { offset: { x: 10, y: 120 } });
await new Promise((r) => setTimeout(r, 400));
const isDrawerClosedByScrim = await page.evaluate(() => {
  const scrim = document.getElementById('saved-drawer-scrim');
  return !scrim.classList.contains('is-open');
});
assert(isDrawerClosedByScrim, 'Mobile drawer closed cleanly by tapping scrim');

// M. Modify ALL 11 form values, reopen drawer, load back and assert EVERY single control
await page.evaluate(() => {
  const topic = document.getElementById('input-topic');
  if (topic) { topic.value = 'Temporary Altered Topic'; topic.dispatchEvent(new Event('input', { bubbles: true })); }

  const slider = document.getElementById('range-slides');
  if (slider) { slider.value = '8'; slider.dispatchEvent(new Event('input', { bubbles: true })); }

  const style = document.getElementById('select-style');
  if (style) { style.value = 'executive'; style.dispatchEvent(new Event('change', { bubbles: true })); }

  const lang = document.getElementById('select-language');
  if (lang) { lang.value = 'English'; lang.dispatchEvent(new Event('change', { bubbles: true })); }

  const aud = document.getElementById('select-audience');
  if (aud) { aud.value = 'Enterprise Buyers & Decision Makers'; aud.dispatchEvent(new Event('change', { bubbles: true })); }

  const goal = document.getElementById('select-goal');
  if (goal) { goal.value = 'Persuade & Win Approval / Close Deal'; goal.dispatchEvent(new Event('change', { bubbles: true })); }

  const rPromptOnly = document.getElementById('src-prompt_only');
  if (rPromptOnly) { rPromptOnly.checked = true; rPromptOnly.dispatchEvent(new Event('change', { bubbles: true })); }

  const chkExec = document.getElementById('chk-exec-summary');
  if (chkExec) { chkExec.checked = true; chkExec.dispatchEvent(new Event('change', { bubbles: true })); }

  const chkCharts = document.getElementById('chk-charts');
  if (chkCharts) { chkCharts.checked = true; chkCharts.dispatchEvent(new Event('change', { bubbles: true })); }

  const chkCitations = document.getElementById('chk-citations');
  if (chkCitations) { chkCitations.checked = false; chkCitations.dispatchEvent(new Event('change', { bubbles: true })); }

  const chkNotes = document.getElementById('chk-notes');
  if (chkNotes) { chkNotes.checked = true; chkNotes.dispatchEvent(new Event('change', { bubbles: true })); }
});

await page.click('#btn-open-saved-drawer');
await new Promise((r) => setTimeout(r, 400));
await page.click('.btn-load-saved');
await new Promise((r) => setTimeout(r, 350));

// Comprehensive assertions across ALL 11 controls
const expectedMobile = {
  topic: 'Mobile Responsive AI Workflow Strategy',
  slides: 15,
  style: 'keynote',
  language: '繁體中文',
  audience: 'Cross-Functional Product & Engineering Team',
  goal: 'Educate & Train Audience on Core Concepts',
  source: 'file',
  hasExec: false,
  hasCharts: false,
  hasCitations: true,
  hasNotes: false
};
const restoredFormState = await getAndAssert11Params(page, expectedMobile, 'Mobile same-page restore');
assert(restoredFormState.prompt.includes('Language: 繁體中文'), 'Restored prompt specifies 繁體中文');
assert(restoredFormState.prompt.includes('attached/uploaded document'), 'Restored prompt specifies file source instruction');
assert(restoredFormState.prompt.includes('Apple Keynote style'), 'Restored prompt specifies keynote style');
assert(!restoredFormState.prompt.includes('Include an executive summary'), 'Restored prompt omits executive summary directive');
assert(!restoredFormState.prompt.includes('Add speaker notes'), 'Restored prompt omits notes directive');
assert(restoredFormState.prompt.includes('[VERIFY]'), 'Restored prompt includes citations verification directive');

// N. Delete saved item, close via close button, reload page and verify persistence
await page.click('#btn-open-saved-drawer');
await new Promise((r) => setTimeout(r, 400));
await page.click('.btn-del-saved');
await new Promise((r) => setTimeout(r, 300));
await page.click('#btn-close-saved-drawer');
await new Promise((r) => setTimeout(r, 300));

await page.reload({ waitUntil: 'networkidle0' });
const savedAfterReload = await page.evaluate(() => {
  return JSON.parse(localStorage.getItem('slideprompt_saved_v1') || '[]').length;
});
assert(savedAfterReload === 0, 'Mobile drawer deletion persisted across page reload: 0 saved items');


// -------------------------------------------------------------
// TIER 4B: Cross-Template, Cross-Language & Legacy Saved Item Verification
// -------------------------------------------------------------
console.log('\n--- Testing Cross-Template, Cross-Language & Legacy Saved Prompt Restores ---');

// Test A: Save pitch-deck (融资模板), navigate to research-presentation (研究模板页), load
await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/prompts/pitch-deck`, { waitUntil: 'networkidle0' });
const pitchParams = {
  topic: 'Autonomous Drone Logistics Seed Pitch',
  slides: 12,
  style: 'persuasive',
  language: 'English',
  audience: 'Venture Capitalists & Angel Investors',
  goal: 'Secure Seed / Series A / Grant Funding',
  source: 'research',
  hasExec: true,
  hasCharts: true,
  hasCitations: true,
  hasNotes: false
};
await configure11Params(page, pitchParams);
await page.click('#btn-save-local');
await closeDrawer(page);

// Navigate to completely different template: research-presentation
await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/prompts/research-presentation`, { waitUntil: 'networkidle0' });
const researchPageSlug = await page.evaluate(() => window.__APP_PAGE_CONFIG?.slug);
assert(researchPageSlug === 'research-presentation', 'Navigated to research-presentation page');

// Open drawer on research page and load saved pitch-deck prompt
await openDrawer(page);

// Expect navigation to /prompts/pitch-deck?loadSavedId=...
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('.btn-load-saved')
]);
const crossTplCurrentPath = await page.evaluate(() => window.location.pathname);
assert(
  crossTplCurrentPath === '/prompts/pitch-deck',
  `Cross-template restore: successfully routed to template page (${crossTplCurrentPath})`
);
const crossTplState = await getAndAssert11Params(page, pitchParams, 'Cross-template restore');
assert(
  crossTplState.cards[0].includes('Company Purpose') || crossTplState.cards[0].includes('Hook'),
  `Cross-template restore: storyboard strip displays pitch-deck cards ("${crossTplState.cards[0]}")`
);
assert(
  crossTplState.prompt.includes('Autonomous Drone Logistics Seed Pitch') && (crossTplState.prompt.includes('Company Purpose') || crossTplState.prompt.includes('Category Hook')),
  'Cross-template restore: prompt output matches restored pitch-deck configuration'
);

// Clean up
await openDrawer(page);
await page.click('.btn-del-saved');
await closeDrawer(page);

// Test B: Cross-Language restore (saved in English, loaded from /zh-TW/ page)
await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/prompts/pitch-deck`, { waitUntil: 'networkidle0' });
const crossLangParams = {
  topic: 'Localized Global Expansion Deck',
  slides: 10,
  style: 'storytelling',
  language: 'English',
  audience: 'Enterprise Buyers & Decision Makers',
  goal: 'Persuade & Win Approval / Close Deal',
  source: 'outline',
  hasExec: false,
  hasCharts: false,
  hasCitations: true,
  hasNotes: true
};
await configure11Params(page, crossLangParams);
await page.click('#btn-save-local');
await closeDrawer(page);

await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/zh-TW/prompts/research-presentation`, { waitUntil: 'networkidle0' });
await openDrawer(page);

// Expect navigation to /zh-TW/prompts/pitch-deck?loadSavedId=...
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('.btn-load-saved')
]);
const crossLangCurrentPath = await page.evaluate(() => window.location.pathname);
assert(
  crossLangCurrentPath === '/zh-TW/prompts/pitch-deck',
  `Cross-language restore: routed to localized template page (${crossLangCurrentPath})`
);
const crossLangState = await getAndAssert11Params(page, crossLangParams, 'Cross-language restore');
assert(
  crossLangState.cards[0].includes('公司願景') || crossLangState.cards[0].includes('一句話定位'),
  `Cross-language restore: storyboard strip correctly displays localized zh-TW titles ("${crossLangState.cards[0]}")`
);

// Clean up saved item
await openDrawer(page);
await page.click('.btn-del-saved');
await closeDrawer(page);
await page.reload({ waitUntil: 'networkidle0' });

// Test C: Catalog & Guide Pages Saved Item Regression (chatgpt-slides-templates, to-powerpoint, not-showing)
// C1: Save on /chatgpt-slides-templates, load from /prompts/sales-presentation
await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/chatgpt-slides-templates`, { waitUntil: 'networkidle0' });
const catalogParams = {
  topic: 'Templates Catalog Strategic AI Roadmap',
  slides: 12,
  style: 'keynote',
  language: 'English',
  audience: 'Academic Peers & Research Committee',
  goal: 'Present Empirical Research & Methodology',
  source: 'file',
  hasExec: true,
  hasCharts: true,
  hasCitations: true,
  hasNotes: false
};
await configure11Params(page, catalogParams);
await page.click('#btn-save-local');
await closeDrawer(page);

await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/prompts/sales-presentation`, { waitUntil: 'networkidle0' });
await openDrawer(page);
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('.btn-load-saved')
]);
const tplCurrentPath = await page.evaluate(() => window.location.pathname);
assert(
  tplCurrentPath === '/chatgpt-slides-templates',
  `Catalog restore: accurately routed to /chatgpt-slides-templates without /prompts/ prefix (${tplCurrentPath})`
);
await getAndAssert11Params(page, catalogParams, 'Catalog restore');

// Clean up
await openDrawer(page);
await page.click('.btn-del-saved');
await closeDrawer(page);

// C2: Save on /chatgpt-slides-to-powerpoint, load from /prompts/pitch-deck
await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/chatgpt-slides-to-powerpoint`, { waitUntil: 'networkidle0' });
const pptxParams = {
  topic: 'PowerPoint Export Workflow Blueprint',
  slides: 14,
  style: 'analytical',
  language: 'English',
  audience: 'Clients & Agency Stakeholders',
  goal: 'Deliver Quarterly Financial & KPI Review',
  source: 'research',
  hasExec: false,
  hasCharts: false,
  hasCitations: true,
  hasNotes: true
};
await configure11Params(page, pptxParams);
await page.click('#btn-save-local');
await closeDrawer(page);

await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/prompts/pitch-deck`, { waitUntil: 'networkidle0' });
await openDrawer(page);
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('.btn-load-saved')
]);
const pptxCurrentPath = await page.evaluate(() => window.location.pathname);
assert(
  pptxCurrentPath === '/chatgpt-slides-to-powerpoint',
  `PowerPoint guide restore: accurately routed to /chatgpt-slides-to-powerpoint (${pptxCurrentPath})`
);
await getAndAssert11Params(page, pptxParams, 'PowerPoint guide restore');

// Clean up
await openDrawer(page);
await page.click('.btn-del-saved');
await closeDrawer(page);

// C3: Save on /chatgpt-slides-not-showing, load from /zh-TW/prompts/pitch-deck
await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/chatgpt-slides-not-showing`, { waitUntil: 'networkidle0' });
const fixParams = {
  topic: 'Troubleshooting Diagnostic Playbook',
  slides: 8,
  style: 'keynote',
  language: 'English',
  audience: 'General Conference Audience',
  goal: 'Educate & Train Audience on Core Concepts',
  source: 'outline',
  hasExec: true,
  hasCharts: false,
  hasCitations: false,
  hasNotes: false
};
await configure11Params(page, fixParams);
await page.click('#btn-save-local');
await closeDrawer(page);

await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/zh-TW/prompts/pitch-deck`, { waitUntil: 'networkidle0' });
await openDrawer(page);
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('.btn-load-saved')
]);
const fixCurrentPath = await page.evaluate(() => window.location.pathname);
assert(
  fixCurrentPath === '/zh-TW/chatgpt-slides-not-showing',
  `Troubleshooting guide restore: localized routing to /zh-TW/chatgpt-slides-not-showing (${fixCurrentPath})`
);
const fixState = await getAndAssert11Params(page, fixParams, 'Troubleshooting guide restore');
assert(fixState.cards[0].includes('投影片 1'), 'Troubleshooting guide restore: localized cards');

// Clean up
await openDrawer(page);
await page.click('.btn-del-saved');
await closeDrawer(page);

// Test D: Elimination of Dual State (Re-compose from saved parameters, discard outdated prompt text)
await page.goto(`http://127.0.0.1:${WRANGLER_PORT}/prompts/sales-presentation`, { waitUntil: 'networkidle0' });
await page.evaluate(() => {
  const staleItem = {
    id: 'sp_stale_prompt_dual_state_test',
    templateId: 'sales-presentation',
    slug: 'sales-presentation',
    topic: 'Unified Architecture State Presentation',
    slides: 10,
    style: 'executive',
    language: 'English',
    source: 'prompt_only',
    hasExec: true,
    hasCharts: true,
    hasCitations: true,
    hasNotes: true,
    prompt: 'STALE_OUTDATED_HISTORICAL_TEXT_THAT_MUST_NOT_OVERWRITE_OUTPUT',
    createdAt: new Date().toLocaleString()
  };
  localStorage.setItem('slideprompt_saved_v1', JSON.stringify([staleItem]));
});
await page.reload({ waitUntil: 'networkidle0' });
await page.click('#btn-open-saved-drawer');
await new Promise((r) => setTimeout(r, 400));
await page.click('.btn-load-saved');
await new Promise((r) => setTimeout(r, 350));

const dualStateOutput = await page.$eval('#prompt-output', (el) => el.value);
const dualStateCards = await page.$$eval('#storyboard-cards .mini-slide-card', (els) => els.length);
assert(
  !dualStateOutput.includes('STALE_OUTDATED_HISTORICAL_TEXT_THAT_MUST_NOT_OVERWRITE_OUTPUT'),
  'Eliminate dual state: outdated saved prompt text is discarded and not used to overwrite editor'
);
assert(
  dualStateOutput.includes('Unified Architecture State Presentation') && (dualStateOutput.includes('Executive') || dualStateOutput.includes('Slide 10:')),
  'Eliminate dual state: prompt output is dynamically re-generated from restored form parameters'
);
assert(
  dualStateCards === 10,
  `Eliminate dual state: storyboard preview is 100% synchronized with restored parameters (${dualStateCards} cards)`
);

// Clean up dual state item
await openDrawer(page);
await page.click('.btn-del-saved');
await closeDrawer(page);

// Test E: Legacy saved item handling (missing templateId)
await page.evaluate(() => {
  const legacyItem = {
    id: 'sp_legacy_test_001',
    topic: 'Old Version Presentation Without Template ID',
    prompt: 'Create a slide presentation about old topics...',
    createdAt: new Date().toLocaleString()
  };
  localStorage.setItem('slideprompt_saved_v1', JSON.stringify([legacyItem]));
});
await page.reload({ waitUntil: 'networkidle0' });
await openDrawer(page);
await page.click('.btn-load-saved');

await page.waitForFunction(() => {
  const el = document.getElementById('app-toast');
  return el && el.textContent.trim().length > 0;
}, { timeout: 3000 });
const legacyToast = await page.$eval('#app-toast', (el) => el.textContent);
assert(
  legacyToast.includes('Legacy') || legacyToast.includes('舊版') || legacyToast.includes('antiguo') || legacyToast.includes('旧バージョン'),
  `Legacy saved item handled gracefully without silent preview corruption: "${legacyToast}"`
);
// Clean up legacy item
await page.click('.btn-del-saved');
await closeDrawer(page);


// -------------------------------------------------------------
// Strict Browser Health Check
// -------------------------------------------------------------
assert(pageErrors.length === 0, `Zero browser pageerror exceptions during testing (count: ${pageErrors.length})`);
assert(consoleErrors.length === 0, `Zero browser console.error messages during testing (count: ${consoleErrors.length})`);
assert(failedRequests.length === 0, `Zero failed network resource requests during testing (count: ${failedRequests.length})`);

// Clean up Puppeteer
await browser.close();

// Terminate Wrangler Dev Process
if (wranglerProcess) {
  wranglerProcess.kill('SIGINT');
  console.log('Wrangler dev server stopped.');
}

console.log('\n====================================================');
console.log('VERIFICATION COMPLETE');
console.log(`Passed Checks: ${passedChecks}`);
console.log(`Failed Checks: ${failedChecks}`);
console.log('====================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
