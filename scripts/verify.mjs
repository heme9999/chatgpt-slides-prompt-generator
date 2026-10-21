import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL } from '../src/templates-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

console.log('=== RUNNING RIGOROUS AUDIT VERIFICATION ===\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failedTests++;
  } else {
    console.log(`✅ PASS: ${message}`);
    passedTests++;
  }
}

// 1. Check prohibited strings across all HTML files
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
  'chatgpt.com/?q='
];

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html') && !file.startsWith('google')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
assert(htmlFiles.length === 205, `Generated exactly 205 content HTML files (found ${htmlFiles.length})`);

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
  `No prohibited/unverified marketing or admin phrases found in HTML (violations: ${JSON.stringify(prohibitedFound)})`
);

// 2. Check Single H1 on every single content page
let multiH1 = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length !== 1) {
    multiH1.push({ file: path.relative(DIST_DIR, file), count: h1Matches.length });
  }
}
assert(multiH1.length === 0, `Every content page has exactly ONE <h1> tag (violations: ${multiH1.length})`);

// 3. Check for fake parenthetical language titles e.g. "(繁體中文)", "(Español)", "(日本語)" in H1
let fakeParensH1 = [];
for (const file of htmlFiles) {
  const rel = path.relative(DIST_DIR, file);
  if (rel.startsWith('zh-TW/') || rel.startsWith('es/') || rel.startsWith('ja/')) {
    const content = fs.readFileSync(file, 'utf8');
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match && /\((繁體中文|Español|日本語|English)\)/i.test(h1Match[1])) {
      fakeParensH1.push({ file: rel, h1: h1Match[1] });
    }
  }
}
assert(
  fakeParensH1.length === 0,
  `No fake parenthetical language indicators in H1 for localized pages (violations: ${fakeParensH1.length})`
);

// 4. Verify Sitemap URLs vs disk files
const sitemapContent = fs.readFileSync(path.join(DIST_DIR, 'sitemap.xml'), 'utf8');
const locMatches = (sitemapContent.match(/<loc>(.*?)<\/loc>/g) || []).map((m) =>
  m.replace(/<\/?loc>/g, '')
);

assert(locMatches.length === 205, `Sitemap contains exactly 205 URLs (found ${locMatches.length})`);

let missingSitemapFiles = [];
for (const url of locMatches) {
  const pathname = new URL(url).pathname;
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  const expectedPath = clean ? path.join(DIST_DIR, clean, 'index.html') : path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(expectedPath)) {
    missingSitemapFiles.push({ url, expectedPath });
  }
}
assert(
  missingSitemapFiles.length === 0,
  `All 205 sitemap URLs correspond to an existing HTML file on disk (missing: ${missingSitemapFiles.length})`
);

// 5. Verify Canonical and Hreflang Alignment on `/` and `/chatgpt-slides-prompt-generator`
const rootContent = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
const rootCanonicalMatch = rootContent.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
const rootEnHreflangMatch = rootContent.match(/<link\s+rel="alternate"\s+hreflang="en"\s+href="([^"]+)"/);
const rootXDefaultMatch = rootContent.match(/<link\s+rel="alternate"\s+hreflang="x-default"\s+href="([^"]+)"/);

assert(
  rootCanonicalMatch && rootCanonicalMatch[1] === `${SITE_URL}/`,
  `Root index canonical is ${SITE_URL}/ (actual: ${rootCanonicalMatch?.[1]})`
);
assert(
  rootEnHreflangMatch && rootEnHreflangMatch[1] === `${SITE_URL}/`,
  `Root index hreflang="en" matches canonical ${SITE_URL}/ (actual: ${rootEnHreflangMatch?.[1]})`
);
assert(
  rootXDefaultMatch && rootXDefaultMatch[1] === `${SITE_URL}/`,
  `Root index hreflang="x-default" is ${SITE_URL}/ (actual: ${rootXDefaultMatch?.[1]})`
);

const genContent = fs.readFileSync(path.join(DIST_DIR, 'chatgpt-slides-prompt-generator/index.html'), 'utf8');
const genCanonicalMatch = genContent.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
const genEnHreflangMatch = genContent.match(/<link\s+rel="alternate"\s+hreflang="en"\s+href="([^"]+)"/);

assert(
  genCanonicalMatch && genCanonicalMatch[1] === `${SITE_URL}/chatgpt-slides-prompt-generator`,
  `Generator canonical is ${SITE_URL}/chatgpt-slides-prompt-generator (actual: ${genCanonicalMatch?.[1]})`
);
assert(
  genEnHreflangMatch && genEnHreflangMatch[1] === `${SITE_URL}/chatgpt-slides-prompt-generator`,
  `Generator hreflang="en" matches canonical (actual: ${genEnHreflangMatch?.[1]})`
);

// 6. Verify Asset presence: Favicon, OG image, GSC token
assert(fs.existsSync(path.join(DIST_DIR, 'og-preview.png')), 'og-preview.png exists in dist/');
assert(fs.existsSync(path.join(DIST_DIR, 'favicon.svg')), 'favicon.svg exists in dist/');
assert(fs.existsSync(path.join(DIST_DIR, 'google8c6329c58e485687.html')), 'GSC verification HTML exists in dist/');

// 7. Verify JSON-LD Schema on all pages
let schemaErrors = 0;
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const schemaMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!schemaMatch) {
    schemaErrors++;
  } else {
    try {
      JSON.parse(schemaMatch[1]);
    } catch {
      schemaErrors++;
    }
  }
}
assert(schemaErrors === 0, `All 205 pages have valid JSON-LD structured data (errors: ${schemaErrors})`);

// 8. Test Dynamic Outline Logic directly (Executive Summary toggle, Slide count limits 5-20, Categories)
console.log('\n--- Testing Dynamic Slide Outline Logic in app.js ---');

// Extract buildSlideOutline from app.js
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'src/app.js'), 'utf8');
const fnMatch = appJs.match(/function buildSlideOutline[\s\S]*?\n  \}/);
if (!fnMatch) {
  console.error('❌ Could not extract buildSlideOutline function from app.js');
  failedTests++;
} else {
  const fnStr = fnMatch[0];
  const testBuildSlideOutline = new Function(
    'baseSlides',
    'targetCount',
    'topic',
    'hasExecSummary',
    'category',
    `${fnStr}; return buildSlideOutline(baseSlides, targetCount, topic, hasExecSummary, category);`
  );

  const baseSample = [
    'Slide 1: Title & Executive Hook',
    'Slide 2: Executive Summary — Core Takeaway in 60 Seconds',
    'Slide 3: Current Context & Problem Statement',
    'Slide 4: Key Data Insights & Market Evidence',
    'Slide 5: Proposed Strategy / Solution Architecture',
    'Slide 6: Deep Dive Pillar 1 — Core Execution',
    'Slide 7: Deep Dive Pillar 2 — Quantified Impact & Charts',
    'Slide 8: Risk Mitigation & Governance Trade-offs',
    'Slide 9: Implementation Roadmap & Milestones',
    'Slide 10: Summary Recommendations & Next Steps'
  ];

  // Test counts: 5, 8, 10, 15, 20
  for (const count of [5, 8, 10, 15, 20]) {
    // When hasExecSummary = false
    const resNoExec = testBuildSlideOutline(baseSample, count, 'Test Topic', false, 'general');
    assert(
      resNoExec.length === count,
      `When Executive Summary is disabled, outline count ${count} returns exactly ${count} slides (actual: ${resNoExec.length})`
    );
    const hasExecInOutput = resNoExec.some((s) => /executive summary/i.test(s));
    assert(
      !hasExecInOutput,
      `When Executive Summary is disabled, NO executive summary slide appears at count ${count}`
    );

    // When hasExecSummary = true
    const resWithExec = testBuildSlideOutline(baseSample, count, 'Test Topic', true, 'general');
    assert(
      resWithExec.length === count,
      `When Executive Summary is enabled, outline count ${count} returns exactly ${count} slides (actual: ${resWithExec.length})`
    );
    const hasExecSlide2 = /executive summary/i.test(resWithExec[1]);
    assert(
      hasExecSlide2,
      `When Executive Summary is enabled, Slide 2 is Executive Summary at count ${count} (actual: "${resWithExec[1]}")`
    );
  }

  // Test Category pools (pitch vs research vs general)
  const pitchExpanded = testBuildSlideOutline(baseSample, 15, 'SaaS', true, 'pitch');
  const pitchHasTAM = pitchExpanded.some((s) => /TAM|CAC|Moat/i.test(s));
  assert(pitchHasTAM, 'Pitch deck expansion includes TAM/SAM/SOM or CAC unit economics');

  const researchExpanded = testBuildSlideOutline(baseSample, 15, 'Clinical Trial', true, 'research');
  const researchHasLineage = researchExpanded.some((s) => /Literature Review|Ablation|Reproducibility/i.test(s));
  assert(researchHasLineage, 'Academic/research deck expansion includes literature review/reproducibility instead of LBO/financials');
}

console.log(`\n========================================`);
console.log(`VERIFICATION SUMMARY:`);
console.log(`Passed Checks: ${passedTests}`);
console.log(`Failed Checks: ${failedTests}`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
