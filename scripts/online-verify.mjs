// scripts/online-verify.mjs
// Production Browser Automation Verification for SlidePrompt.ai

import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'https://chatgpt-slides-prompt-generator.overjoyed-week-dcb.workers.dev';
const ARTIFACT_DIR = '/Users/hemrmicloud.com/.gemini/antigravity/brain/28995471-5441-4217-9daf-2cb846e27acc';

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
console.log('   SlidePrompt.ai PRODUCTION LIVE VERIFICATION     ');
console.log(`   Target: ${BASE_URL}`);
console.log('====================================================\n');

// 0. HTTP probes for 404, localized roots, trust pages, and redirects
console.log('--- 0. HTTP Endpoints & Canonical Probes ---');

// Probe 404
const res404 = await fetch(`${BASE_URL}/non-existent-probe-404-check`);
assert(res404.status === 404, `404 probe returned HTTP 404 (${res404.status})`);
const html404 = await res404.text();
assert(
  html404.length > 500 && html404.includes('Page Not Found') && html404.includes('Back to Homepage'),
  `404 page contains styled non-empty HTML (${html404.length} bytes)`
);

// Probe localized homepages
for (const lang of ['zh-TW', 'ja', 'es']) {
  const resLang = await fetch(`${BASE_URL}/${lang}/`);
  assert(resLang.status === 200, `Localized homepage /${lang}/ returned HTTP 200`);
  const htmlLang = await resLang.text();
  assert(
    htmlLang.includes(`hreflang="${lang}"`) && htmlLang.includes(`hreflang="x-default"`),
    `Localized homepage /${lang}/ contains bidirectional hreflang loop`
  );
}

// Probe trust pages
for (const p of ['/privacy', '/terms', '/about', '/contact']) {
  const resP = await fetch(`${BASE_URL}${p}`);
  assert(resP.status === 200, `Trust page ${p} returned HTTP 200`);
  const htmlP = await resP.text();
  assert(htmlP.includes('support@slideprompt.ai'), `Trust page ${p} contains support email`);
}

// Probe legacy generator URL redirect / canonical
const resLegacy = await fetch(`${BASE_URL}/chatgpt-slides-prompt-generator`, { redirect: 'manual' });
const legacyHtml = await resLegacy.text();
assert(
  legacyHtml.includes('rel="canonical" href="https://slideprompt.ai/"') ||
  legacyHtml.includes('http-equiv="refresh" content="0; url=/"'),
  `Legacy route /chatgpt-slides-prompt-generator canonicalizes or redirects to root /`
);

// Launch Puppeteer for browser checks
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

const pageErrors = [];
const consoleErrors = [];
const failedRequests = [];

page.on('pageerror', (err) => {
  pageErrors.push(err.message);
  console.error('[Production Browser PageError]', err.message);
});

page.on('console', (msg) => {
  if (msg.type() === 'error') {
    consoleErrors.push(msg.text());
    console.error('[Production Browser ConsoleError]', msg.text());
  }
});

page.on('requestfailed', (req) => {
  const failure = req.failure();
  failedRequests.push(`${req.url()} (${failure?.errorText || 'failed'})`);
  console.error('[Production Browser RequestFailed]', req.url(), failure?.errorText);
});

// Grant clipboard permissions
const client = await page.target().createCDPSession();
await client.send('Browser.grantPermissions', {
  permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite']
});

// Setup disk download directory
const downloadDir = path.join(ARTIFACT_DIR, 'scratch/online_downloads');
fs.mkdirSync(downloadDir, { recursive: true });
fs.readdirSync(downloadDir).forEach((f) => fs.unlinkSync(path.join(downloadDir, f)));

await client.send('Page.setDownloadBehavior', {
  behavior: 'allow',
  downloadPath: downloadDir
});

// 1. Desktop Viewport (1280×800)
console.log('\n--- 1. Desktop Viewport (1280×800) Production Verification ---');
await page.setViewport({ width: 1280, height: 800 });
const navResp = await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
assert(navResp.status() === 200, `Production homepage HTTP 200 OK (${navResp.status()})`);

const bodyFont = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily);
assert(
  bodyFont.includes('system-ui') || bodyFont.includes('sans-serif'),
  `Production stylesheets loaded and computed body font active: ${bodyFont.slice(0, 30)}...`
);

const desktopScreenshotPath = path.join(ARTIFACT_DIR, 'online-desktop.png');
await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
assert(fs.existsSync(desktopScreenshotPath), `Captured production desktop screenshot (${desktopScreenshotPath})`);

// Check empty topic validation on desktop
console.log('\n--- Empty Topic Validation Online Check ---');
await page.evaluate(() => {
  const el = document.getElementById('input-topic');
  el.value = '';
  el.dispatchEvent(new Event('input', { bubbles: true }));
});
const emptyOutput = await page.evaluate(() => document.getElementById('prompt-output').value);
assert(!emptyOutput.includes('[TOPIC:'), 'Output does not leak [TOPIC: ...] placeholder when topic is empty');

await page.click('#btn-copy-prompt');
const hasInvalidClass = await page.evaluate(() => {
  return document.getElementById('input-topic').classList.contains('input-invalid');
});
assert(hasInvalidClass, 'Clicking copy with empty topic triggers .input-invalid highlight');

// 2. Mobile Viewport (390×844) Interactions
console.log('\n--- 2. Mobile Viewport (390×844) Production Interactions ---');
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

const hasOverflow = await page.evaluate(() => {
  return document.documentElement.scrollWidth > document.documentElement.clientWidth;
});
assert(!hasOverflow, 'Mobile layout verified: zero horizontal page overflow');

const mobileScreenshotPath = path.join(ARTIFACT_DIR, 'online-mobile.png');
await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
assert(fs.existsSync(mobileScreenshotPath), `Captured production mobile top screenshot (${mobileScreenshotPath})`);

// Modify Topic
const testTopic = 'Production Multi-Tier Verified Strategy Deck';
await page.evaluate((val) => {
  const el = document.getElementById('input-topic');
  el.value = val;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}, testTopic);

const promptAfterTopic = await page.evaluate(() => document.getElementById('prompt-output').value);
assert(promptAfterTopic.includes(testTopic), 'Production interaction: topic update reflected in prompt');

// Modify Slider to 15
await page.evaluate(() => {
  const s = document.getElementById('range-slides');
  s.value = '15';
  s.dispatchEvent(new Event('input', { bubbles: true }));
});
const promptAfterSlider = await page.evaluate(() => document.getElementById('prompt-output').value);
assert(
  promptAfterSlider.includes('15-slide presentation') && promptAfterSlider.includes('Slide 15:'),
  'Production interaction: slider 15 updates prompt output (15-slide presentation & Slide 15:)'
);

// Indefinite article check: slider 8 should use "an 8-slide"
await page.evaluate(() => {
  const s = document.getElementById('range-slides');
  s.value = '8';
  s.dispatchEvent(new Event('input', { bubbles: true }));
});
const promptAfterSlider8 = await page.evaluate(() => document.getElementById('prompt-output').value);
assert(promptAfterSlider8.includes('an 8-slide presentation'), 'Production grammar check: uses "an 8-slide presentation"');

// Modify Style to Keynote
await page.select('#select-style', 'keynote');
const promptAfterStyle = await page.evaluate(() => document.getElementById('prompt-output').value);
assert(promptAfterStyle.includes('Apple Keynote style'), 'Production interaction: style keynote updates prompt');

// Modify Language to 繁體中文
await page.select('#select-language', '繁體中文');
const promptAfterLang = await page.evaluate(() => document.getElementById('prompt-output').value);
assert(promptAfterLang.includes('Language: 繁體中文'), 'Production interaction: language select updates prompt output');

// Turn off Executive Summary
await page.evaluate(() => {
  const chk = document.getElementById('chk-exec-summary');
  chk.checked = false;
  chk.dispatchEvent(new Event('change', { bubbles: true }));
});
const promptAfterSummary = await page.evaluate(() => document.getElementById('prompt-output').value);
assert(!promptAfterSummary.includes('Include an executive summary'), 'Production interaction: unchecking summary removes directive');

// Select File Source
await page.evaluate(() => {
  const radio = document.querySelector('input[name="source"][value="file"]');
  if (radio) {
    radio.checked = true;
    radio.dispatchEvent(new Event('change', { bubbles: true }));
  }
});
const promptAfterSource = await page.evaluate(() => document.getElementById('prompt-output').value);
assert(promptAfterSource.includes('attached/uploaded document'), 'Production interaction: file source updates instruction');

// Storyboard scrolled screenshot
await page.evaluate(() => {
  const strip = document.getElementById('storyboard-strip');
  if (strip) strip.scrollIntoView({ behavior: 'instant', block: 'center' });
});
await new Promise((r) => setTimeout(r, 400));
const mobileScrolledScreenshotPath = path.join(ARTIFACT_DIR, 'online-mobile-scrolled.png');
await page.screenshot({ path: mobileScrolledScreenshotPath, fullPage: false });
assert(fs.existsSync(mobileScrolledScreenshotPath), `Captured production mobile scrolled storyboard (${mobileScrolledScreenshotPath})`);

// Real Clipboard Copy Verification
const currentPromptText = await page.evaluate(() => document.getElementById('prompt-output').value);
await page.click('#btn-copy-prompt');
await new Promise((r) => setTimeout(r, 400));
const clipboardText = await page.evaluate(async () => {
  return await navigator.clipboard.readText();
});
assert(clipboardText === currentPromptText, `Production clipboard copy: EXACT string equality match (${clipboardText.length} chars === ${currentPromptText.length} chars)`);

// Real Disk TXT Download Verification
await page.click('#btn-download-txt');
let downloadedFilename = null;
const deadline = Date.now() + 6000;
while (Date.now() < deadline) {
  const files = fs.readdirSync(downloadDir);
  if (files.length > 0 && files.some((f) => f.endsWith('.txt'))) {
    downloadedFilename = files.find((f) => f.endsWith('.txt'));
    break;
  }
  await new Promise((r) => setTimeout(r, 150));
}
assert(Boolean(downloadedFilename), `Production disk TXT download captured on disk (${downloadedFilename})`);
const downloadedContent = fs.readFileSync(path.join(downloadDir, downloadedFilename), 'utf8');
assert(downloadedContent === currentPromptText, `Production disk download: EXACT string match (${downloadedContent.length} chars === ${currentPromptText.length} chars)`);

// Save Prompt to Drawer
await page.click('#btn-save-local');
await new Promise((r) => setTimeout(r, 500));
const mobileDrawerScreenshotPath = path.join(ARTIFACT_DIR, 'online-mobile-drawer.png');
await page.screenshot({ path: mobileDrawerScreenshotPath, fullPage: false });
assert(fs.existsSync(mobileDrawerScreenshotPath), `Captured production mobile drawer screenshot (${mobileDrawerScreenshotPath})`);

// Close Drawer
await page.click('#btn-close-saved-drawer');
await new Promise((r) => setTimeout(r, 300));

// 3. Localized zh-TW Verification: FAQ & Category Chips
console.log('\n--- 3. Localized zh-TW Verification (FAQ & Category Chips) ---');
await page.goto(`${BASE_URL}/zh-TW/`, { waitUntil: 'networkidle0' });

const logoHref = await page.evaluate(() => document.querySelector('.brand-link')?.getAttribute('href'));
assert(logoHref === '/zh-TW/' || logoHref === '/zh-TW', `zh-TW brand link points to localized root (${logoHref})`);

const faqText = await page.evaluate(() => document.querySelector('#faq')?.textContent || '');
assert(
  faqText.includes('常見問題') || faqText.includes('ChatGPT') || faqText.includes('簡報'),
  'zh-TW FAQ section rendered with localized header and text'
);
assert(!faqText.includes('Frequently Asked Questions'), 'zh-TW FAQ section does NOT contain untranslated English title');

const chipTexts = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.filter-pills-bar [data-category-filter]')).map((c) => c.textContent.trim());
});
assert(chipTexts.some((c) => c.includes('全部') || c.includes('銷售') || c.includes('新創')), `zh-TW category chips translated: ${JSON.stringify(chipTexts.slice(0, 5))}`);

// 4. Cross-Template, Cross-Language Restoration
console.log('\n--- 4. Production Cross-Template & Cross-Language Restoration ---');

// Test A: Save on /prompts/pitch-deck, load on /prompts/research-presentation
await page.goto(`${BASE_URL}/prompts/pitch-deck`, { waitUntil: 'networkidle0' });
await page.evaluate(() => {
  const topic = document.getElementById('input-topic');
  topic.value = 'Autonomous AI Seed Pitch Production Test';
  topic.dispatchEvent(new Event('input', { bubbles: true }));
  const slides = document.getElementById('range-slides');
  slides.value = '12';
  slides.dispatchEvent(new Event('input', { bubbles: true }));
  const style = document.getElementById('select-style');
  style.value = 'persuasive';
  style.dispatchEvent(new Event('change', { bubbles: true }));
});
await page.click('#btn-save-local');
await new Promise((r) => setTimeout(r, 400));
await page.click('#btn-close-saved-drawer');
await new Promise((r) => setTimeout(r, 300));

// Navigate to /prompts/research-presentation and restore
await page.goto(`${BASE_URL}/prompts/research-presentation`, { waitUntil: 'networkidle0' });
await page.click('#btn-open-saved-drawer');
await new Promise((r) => setTimeout(r, 400));
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('.btn-load-saved')
]);

const curPathA = await page.evaluate(() => window.location.pathname);
assert(curPathA === '/prompts/pitch-deck', `Production cross-template load: successfully routed to /prompts/pitch-deck (${curPathA})`);
const restoredTopicA = await page.evaluate(() => document.getElementById('input-topic').value);
assert(restoredTopicA === 'Autonomous AI Seed Pitch Production Test', `Production restored topic matches: "${restoredTopicA}"`);
const restoredSlidesA = await page.evaluate(() => document.getElementById('range-slides').value);
assert(restoredSlidesA === '12', `Production restored slide count matches: ${restoredSlidesA}`);

// Clean up drawer on production
await page.click('#btn-open-saved-drawer');
await new Promise((r) => setTimeout(r, 400));
await page.click('.btn-del-saved');
await new Promise((r) => setTimeout(r, 300));
await page.click('#btn-close-saved-drawer');

// Test B: Cross-Language restore (saved in English, loaded on /zh-TW/ page)
await page.goto(`${BASE_URL}/prompts/pitch-deck`, { waitUntil: 'networkidle0' });
await page.evaluate(() => {
  const topic = document.getElementById('input-topic');
  topic.value = 'Localized Cross-Lang Production Test';
  topic.dispatchEvent(new Event('input', { bubbles: true }));
  const slides = document.getElementById('range-slides');
  slides.value = '10';
  slides.dispatchEvent(new Event('input', { bubbles: true }));
});
await page.click('#btn-save-local');
await new Promise((r) => setTimeout(r, 400));
await page.click('#btn-close-saved-drawer');

await page.goto(`${BASE_URL}/zh-TW/prompts/research-presentation`, { waitUntil: 'networkidle0' });
await page.click('#btn-open-saved-drawer');
await new Promise((r) => setTimeout(r, 400));
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('.btn-load-saved')
]);

const curPathB = await page.evaluate(() => window.location.pathname);
assert(curPathB === '/zh-TW/prompts/pitch-deck', `Production cross-language load: routed to /zh-TW/prompts/pitch-deck (${curPathB})`);
const cardTitleB = await page.evaluate(() => document.querySelector('#storyboard-cards .mini-slide-card')?.textContent.trim() || '');
assert(cardTitleB.includes('投影片 1'), `Production storyboard displays localized zh-TW cards: "${cardTitleB.slice(0, 30)}"`);

// Final clean-up of test items in localStorage
await page.evaluate(() => {
  localStorage.removeItem('slideprompt_saved_v1');
});
await page.reload({ waitUntil: 'networkidle0' });
const savedCount = await page.evaluate(() => {
  return JSON.parse(localStorage.getItem('slideprompt_saved_v1') || '[]').length;
});
assert(savedCount === 0, `Production test items completely cleaned up from localStorage (${savedCount} items)`);

// 5. Runtime Error Inspection
console.log('\n--- 5. Production Runtime Health Check ---');
assert(pageErrors.length === 0, `Production browser pageerror exceptions count: ${pageErrors.length}`);
assert(consoleErrors.length === 0, `Production browser console.error count: ${consoleErrors.length}`);
assert(failedRequests.length === 0, `Production failed resource requests count: ${failedRequests.length}`);

await browser.close();

console.log('\n====================================================');
console.log('PRODUCTION LIVE VERIFICATION COMPLETE');
console.log(`Passed Checks: ${passedChecks}`);
console.log(`Failed Checks: ${failedChecks}`);
console.log('====================================================\n');

if (failedChecks > 0) process.exit(1);
