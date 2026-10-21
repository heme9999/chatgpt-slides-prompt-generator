import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL,
  BRAND_NAME,
  GSC_VERIFICATION_CODE,
  GSC_HTML_FILENAME,
  RELEASE_DATE_NOTE,
  STYLE_PRESETS,
  AUDIENCE_OPTIONS,
  GOAL_OPTIONS,
  SOURCE_OPTIONS,
  LANGUAGE_OPTIONS,
  PROMPT_TEMPLATES,
  CATEGORIES,
  CORE_FAQS
} from '../src/templates-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function writeRouteHtml(routePath, htmlContent) {
  const cleanRoute = routePath.replace(/^\/+|\/+$/g, '');
  if (!cleanRoute) {
    ensureDir(DIST_DIR);
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), htmlContent, 'utf8');
    return;
  }
  const outDir = path.join(DIST_DIR, cleanRoute);
  ensureDir(outDir);
  fs.writeFileSync(path.join(outDir, 'index.html'), htmlContent, 'utf8');
}

// Render the Core Interactive Tool Section (Always Above the Fold!)
function renderCoreToolWidget(config, i18n = null) {
  const t = i18n || {
    formLegend: '1. Configure Your ChatGPT Slides Presentation',
    noApiBadge: '100% Free · No API Key · Instant Copy',
    topicLabel: 'Presentation Topic (演示主题)',
    topicRequired: 'Required',
    topicPlaceholder: 'e.g., Q4 Enterprise AI Workflow Automation Strategy & ROI...',
    trySample: 'Try a sample:',
    audienceLabel: 'Target Audience (目标受众)',
    goalLabel: 'Presentation Goal (演示目的)',
    slidesLabel: 'Slide Count (页数)',
    styleLabel: 'Presentation Style & Tone (风格)',
    langLabel: 'Output Language (语言)',
    sourceLabel: 'Data Source Context (数据来源)',
    optionsLabel: 'Slide Requirements (图表 / 引用 / 演讲者备注)',
    optExec: 'Executive Summary Slide',
    optCharts: 'Suggest Appropriate Charts (需要图表)',
    optCitations: 'Flag Claims for Verification (引用来源)',
    optNotes: 'Add Speaker Notes (演讲者备注)',
    outputTitle: '2. Ready-to-Copy ChatGPT Slides Prompt',
    copyBtn: 'Copy Prompt',
    openBtn: 'Open ChatGPT ↗',
    switchStyleBtn: 'Switch Style (换一种风格)',
    downloadBtn: 'Download .TXT',
    saveLocalBtn: 'Save Locally (保存到本地)',
    storyboardTitle: 'Live Slide-by-Slide Structure Preview'
  };

  const defaultTopic = config.defaultTopic || 'Enterprise AI Adoption Roadmap & Productivity ROI';
  const defaultAudience = config.defaultAudience || AUDIENCE_OPTIONS[0];
  const defaultGoal = config.defaultGoal || GOAL_OPTIONS[0];
  const defaultSlides = config.defaultSlides || 10;
  const defaultStyle = config.defaultStyle || 'executive';
  const defaultSource = config.defaultSource || 'chat';
  const defaultLang = config.defaultLang || 'English';
  const sampleTopics = config.sampleTopics || [
    'Series A Startup Pitch Deck for AI SaaS',
    'Q4 Enterprise Sales Executive Proposal',
    'Quarterly Business Review (QBR) & KPI Deck',
    'Clinical Research Methodology & Findings'
  ];

  const clientConfigJson = JSON.stringify({
    slug: config.slug || 'chatgpt-slides-prompt-generator',
    styles: STYLE_PRESETS,
    slideStructure: config.slideStructure || PROMPT_TEMPLATES[0].slideStructure
  });

  return `
  <section aria-label="ChatGPT Slides Prompt Generator Workspace" class="workspace-grid">
    <!-- Left Column: Interactive Form -->
    <div class="surface-card">
      <form id="slides-prompt-form" action="${escapeHtml(config.canonicalPath || '/chatgpt-slides-prompt-generator')}" method="GET" novalidate>
        <fieldset>
          <legend>
            <span>${escapeHtml(t.formLegend)}</span>
            <span class="caption-text">${escapeHtml(t.noApiBadge)}</span>
          </legend>

          <!-- Topic Input -->
          <div class="form-group">
            <label for="input-topic" class="field-label">
              <span>${escapeHtml(t.topicLabel)}</span>
              <span class="required-badge">${escapeHtml(t.topicRequired)}</span>
            </label>
            <input
              type="text"
              id="input-topic"
              name="topic"
              class="form-input"
              value="${escapeHtml(defaultTopic)}"
              placeholder="${escapeHtml(t.topicPlaceholder)}"
              aria-describedby="topic-samples topic-error"
              enterkeyhint="done"
              required
              maxlength="240"
            />
            <div id="topic-error" class="field-error" aria-live="polite"></div>
            <div id="topic-samples" class="sample-chips-bar">
              <span class="caption-text">${escapeHtml(t.trySample)}</span>
              ${sampleTopics
                .map(
                  (sample) =>
                    `<button type="button" class="chip" data-sample-topic="${escapeHtml(sample)}">${escapeHtml(
                      sample.length > 38 ? sample.slice(0, 36) + '…' : sample
                    )}</button>`
                )
                .join('')}
            </div>
          </div>

          <!-- Audience & Goal Row -->
          <div class="form-group form-row-2">
            <div>
              <label for="select-audience" class="field-label">${escapeHtml(t.audienceLabel)}</label>
              <select id="select-audience" name="audience" class="form-select">
                ${AUDIENCE_OPTIONS.map(
                  (aud) =>
                    `<option value="${escapeHtml(aud)}"${aud === defaultAudience ? ' selected' : ''}>${escapeHtml(aud)}</option>`
                ).join('')}
              </select>
            </div>
            <div>
              <label for="select-goal" class="field-label">${escapeHtml(t.goalLabel)}</label>
              <select id="select-goal" name="goal" class="form-select">
                ${GOAL_OPTIONS.map(
                  (goal) =>
                    `<option value="${escapeHtml(goal)}"${goal === defaultGoal ? ' selected' : ''}>${escapeHtml(goal)}</option>`
                ).join('')}
              </select>
            </div>
          </div>

          <!-- Slide Count Range + Quick Pills -->
          <div class="form-group">
            <div class="slider-header">
              <label for="range-slides" class="field-label" style="margin:0;">${escapeHtml(t.slidesLabel)}</label>
              <span id="slides-count-display" class="slide-count-badge">${defaultSlides} Slides</span>
            </div>
            <input
              type="range"
              id="range-slides"
              name="slides"
              class="range-slider"
              min="5"
              max="20"
              step="1"
              value="${defaultSlides}"
            />
            <div class="quick-count-pills">
              ${[5, 8, 10, 12, 15, 20]
                .map(
                  (n) =>
                    `<button type="button" class="chip" data-quick-slides="${n}">${n} Slides</button>`
                )
                .join('')}
            </div>
          </div>

          <!-- Style & Language Row -->
          <div class="form-group form-row-2">
            <div>
              <label for="select-style" class="field-label">${escapeHtml(t.styleLabel)}</label>
              <select id="select-style" name="style" class="form-select">
                ${STYLE_PRESETS.map(
                  (s) =>
                    `<option value="${escapeHtml(s.id)}"${s.id === defaultStyle ? ' selected' : ''}>${escapeHtml(s.label)}</option>`
                ).join('')}
              </select>
            </div>
            <div>
              <label for="select-language" class="field-label">${escapeHtml(t.langLabel)}</label>
              <select id="select-language" name="language" class="form-select">
                ${LANGUAGE_OPTIONS.map(
                  (lang) =>
                    `<option value="${escapeHtml(lang.code)}"${lang.code === defaultLang ? ' selected' : ''}>${escapeHtml(lang.label)}</option>`
                ).join('')}
              </select>
            </div>
          </div>

          <!-- Data Source Context (<=5 options -> visible radio buttons per modern-web-guidance forms) -->
          <div class="form-group">
            <span class="field-label">${escapeHtml(t.sourceLabel)}</span>
            <div class="radio-pills-grid" role="radiogroup" aria-label="${escapeHtml(t.sourceLabel)}">
              ${SOURCE_OPTIONS.map(
                (src) => `
                <label class="radio-pill-label" for="src-${escapeHtml(src.id)}">
                  <input
                    type="radio"
                    id="src-${escapeHtml(src.id)}"
                    name="source"
                    value="${escapeHtml(src.id)}"
                    ${src.id === defaultSource ? 'checked' : ''}
                  />
                  <span class="radio-pill-text">
                    <strong>${escapeHtml(src.label)}</strong>
                    <span>${escapeHtml(src.desc)}</span>
                  </span>
                </label>`
              ).join('')}
            </div>
          </div>

          <!-- Checkboxes for Charts, Citations, Speaker Notes -->
          <div class="form-group" style="margin-block-end: 0;">
            <span class="field-label">${escapeHtml(t.optionsLabel)}</span>
            <div class="checkbox-grid">
              <label class="checkbox-card-label" for="chk-exec-summary">
                <input type="checkbox" id="chk-exec-summary" name="exec_summary" class="visually-hidden" checked />
                <span>${escapeHtml(t.optExec)}</span>
              </label>
              <label class="checkbox-card-label" for="chk-charts">
                <input type="checkbox" id="chk-charts" name="charts" class="visually-hidden" ${config.defaultCharts !== false ? 'checked' : ''} />
                <span>${escapeHtml(t.optCharts)}</span>
              </label>
              <label class="checkbox-card-label" for="chk-citations">
                <input type="checkbox" id="chk-citations" name="citations" class="visually-hidden" ${config.defaultCitations !== false ? 'checked' : ''} />
                <span>${escapeHtml(t.optCitations)}</span>
              </label>
              <label class="checkbox-card-label" for="chk-notes">
                <input type="checkbox" id="chk-notes" name="notes" class="visually-hidden" ${config.defaultNotes !== false ? 'checked' : ''} />
                <span>${escapeHtml(t.optNotes)}</span>
              </label>
            </div>
          </div>
        </fieldset>
      </form>
    </div>

    <!-- Right Column: Live Output & 5 Instant Actions -->
    <div id="output-surface-card" class="surface-card output-panel">
      <div class="output-header">
        <label for="prompt-output" style="font-weight:700; font-size:0.95rem;">${escapeHtml(t.outputTitle)}</label>
        <span id="active-style-pill" class="style-pill-indicator">Style: Executive</span>
      </div>

      <textarea
        id="prompt-output"
        class="prompt-textarea"
        aria-label="Generated ChatGPT Slides Prompt"
        spellcheck="false"
      ></textarea>

      <!-- Primary Actions -->
      <div class="action-buttons-grid">
        <button type="submit" form="slides-prompt-form" id="btn-copy-prompt" class="btn btn-primary">
          <span>📋 ${escapeHtml(t.copyBtn)}</span>
        </button>
        <button type="button" id="btn-open-chatgpt" class="btn btn-emerald">
          <span>🚀 ${escapeHtml(t.openBtn)}</span>
        </button>
      </div>

      <!-- Secondary Actions -->
      <div class="secondary-actions-grid">
        <button type="button" id="btn-switch-style" class="btn btn-secondary">
          <span>✨ ${escapeHtml(t.switchStyleBtn)}</span>
        </button>
        <button type="button" id="btn-download-txt" class="btn btn-secondary">
          <span>⬇️ ${escapeHtml(t.downloadBtn)}</span>
        </button>
        <button type="button" id="btn-save-local" class="btn btn-secondary">
          <span>🔖 ${escapeHtml(t.saveLocalBtn)}</span>
        </button>
      </div>

      ${
        config.proTip
          ? `<p class="caption-text" style="margin-block: 0.75rem 0; padding: 0.6rem 0.75rem; background: var(--bg-subtle); border-radius: 8px;">💡 <strong>Pro Tip:</strong> ${escapeHtml(config.proTip)}</p>`
          : ''
      }

      <!-- Live Storyboard Outline Strip -->
      <div class="storyboard-strip">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="caption-text" style="font-weight:600; color:var(--text-primary);">${escapeHtml(t.storyboardTitle)}</span>
          <span class="caption-text">Exports to .PPTX · PDF · Google Slides</span>
        </div>
        <div id="storyboard-cards" class="storyboard-cards"></div>
      </div>
    </div>

    <script type="application/json" id="page-template-config">${clientConfigJson}</script>
  </section>`;
}

// Render Internal Links Matrix (36 Prompt Templates + Hub Pages)
function renderInternalLinksSection(activeSlug = '', includeCategoryFilter = false) {
  return `
  <section class="below-fold-section" id="templates-directory">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:1rem; margin-block-end:1rem;">
      <div>
        <h2>47 Specialized ChatGPT Slides Prompt Templates</h2>
        <p style="margin:0;">Choose a role-specific presentation blueprint below. Every template pre-loads proven slide structures, chart suggestions, and speaker note rules.</p>
      </div>
      <a href="/chatgpt-slides-templates" class="btn btn-secondary" style="min-height:40px; padding:0.45rem 0.9rem; font-size:0.85rem;">View All 47 Templates →</a>
    </div>

    ${
      includeCategoryFilter
        ? `<div class="filter-pills-bar" role="toolbar" aria-label="Filter templates by category">
            ${CATEGORIES.map(
              (cat, i) =>
                `<button type="button" class="chip ${i === 0 ? 'is-active' : ''}" data-category-filter="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
            ).join('')}
          </div>`
        : ''
    }

    <div class="grid-3">
      ${PROMPT_TEMPLATES.map(
        (tpl) => `
        <a
          href="/prompts/${escapeHtml(tpl.slug)}"
          class="template-card-link"
          data-template-category="${escapeHtml(tpl.category)}"
          ${tpl.slug === activeSlug ? 'aria-current="page" style="border-color:var(--brand-color);"' : ''}
        >
          <div>
            <div class="template-meta-row">
              <span class="category-tag">${escapeHtml(tpl.category)}</span>
              <span class="badge-tag">${escapeHtml(tpl.badge)}</span>
            </div>
            <h3>${escapeHtml(tpl.shortName)}</h3>
            <p class="caption-text" style="margin-block-end:0.75rem;">${escapeHtml(tpl.subtitle)}</p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; font-weight:600; color:var(--brand-color);">
            <span>${tpl.defaultSlides}-Slide Blueprint →</span>
            <span class="badge-tag" data-template-usage-slug="${escapeHtml(tpl.slug)}" hidden></span>
          </div>
        </a>`
      ).join('')}
    </div>
  </section>`;
}

// Render Standard GeFei SEO Content Sections (How It Works, Features, Use Cases, Comparison Table, FAQ)
function renderStandardSeoSections(keywordLabel = 'ChatGPT Slides Prompt Generator', customFaqs = null) {
  const faqs = customFaqs || CORE_FAQS;
  return `
  <!-- 4. How It Works / Step-by-Step Guide -->
  <section class="below-fold-section" id="how-to-use">
    <h2>How to Use ${escapeHtml(keywordLabel)}</h2>
    <p>Generate a structured, collaborative presentation in ChatGPT Slides (launched October 16, 2026) and export to PowerPoint, PDF, or Google Slides in four steps:</p>
    <div class="grid-4">
      <article class="info-card">
        <span class="step-badge">1</span>
        <h3>Enter Topic & Audience</h3>
        <p class="caption-text">Specify your presentation subject, target decision-makers (C-Suite, VCs, Clients, or Students), and primary persuasion or educational goal.</p>
      </article>
      <article class="info-card">
        <span class="step-badge">2</span>
        <h3>Select Slide Count & Style</h3>
        <p class="caption-text">Slide the counter between 5 and 20 slides and pick a narrative tone—such as McKinsey Action Titles, Apple Keynote Minimalist, or Data-Driven Analytical.</p>
      </article>
      <article class="info-card">
        <span class="step-badge">3</span>
        <h3>Enable Charts & Speaker Notes</h3>
        <p class="caption-text">Toggle automatic chart recommendations, speaker pacing scripts, and verification flags so ChatGPT marks any unverified claims with <code>[VERIFY]</code>.</p>
      </article>
      <article class="info-card">
        <span class="step-badge">4</span>
        <h3>Copy to ChatGPT & Export</h3>
        <p class="caption-text">Click <strong>Copy Prompt</strong> or <strong>Open ChatGPT</strong>, refine slides in the collaborative canvas, and export directly to <code>.pptx</code>, PDF, or Google Slides.</p>
      </article>
    </div>
  </section>

  <!-- 5. Key Features / Why Choose Our Tool -->
  <section class="below-fold-section" id="features">
    <h2>Key Features of Our ChatGPT Slides Prompt Builder</h2>
    <p>Built specifically for OpenAI’s October 2026 ChatGPT Slides canvas workflow—combining zero-latency Apple-grade interaction with presentation consulting best practices.</p>
    <div class="grid-3">
      <article class="info-card">
        <h3>🎯 One Clear Message Per Slide</h3>
        <p class="caption-text">Prevents ChatGPT from dumping walls of text onto slides. Enforces crisp action titles and scannable 3-bullet visual hierarchy.</p>
      </article>
      <article class="info-card">
        <h3>📊 Smart Chart & Diagram Prompts</h3>
        <p class="caption-text">Automatically instructs ChatGPT Slides to recommend waterfall bridges, 2x2 positioning matrices, TAM/SAM/SOM visuals, and cohort charts.</p>
      </article>
      <article class="info-card">
        <h3>🎙️ Presenter View Speaker Notes</h3>
        <p class="caption-text">Generates word-for-word spoken transitions, pacing cues, and objection-handling answers that carry over when exported to PowerPoint or Google Slides.</p>
      </article>
      <article class="info-card">
        <h3>🛡️ Hallucination & Citation Guardrails</h3>
        <p class="caption-text">Includes explicit verification rules requiring ChatGPT to flag uncertain statistics and cite uploaded PDFs or web research sources.</p>
      </article>
      <article class="info-card">
        <h3>🔒 100% Client-Side & Privacy Safe</h3>
        <p class="caption-text">Zero backend servers, zero OpenAI API keys required, and no sign-up walls. All prompt assembly and saved templates stay in your local browser.</p>
      </article>
      <article class="info-card">
        <h3>📤 PowerPoint, PDF & Google Slides Ready</h3>
        <p class="caption-text">Optimized for OpenAI’s native export pipeline (<a href="https://help.openai.com/en/articles/20001605-creating-and-collaborating-on-slides-in-chatgpt" rel="nofollow noopener noreferrer" target="_blank">OpenAI Help Article 20001605</a>).</p>
      </article>
    </div>
  </section>

  <!-- 6. Information Gain Comparison Table & Use Cases -->
  <section class="below-fold-section" id="comparison">
    <h2>Why Structured Prompts Outperform Generic ChatGPT Slide Requests</h2>
    <p>Asking ChatGPT <em>"Make me a 10-slide presentation about X"</em> produces generic, repetitive bullet lists. Compare how our structured prompt architecture transforms output quality:</p>
    <div class="table-scroll">
      <table class="seo-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Generic Prompt ("Make slides about X")</th>
            <th>SlidePrompt.ai Structured Blueprint</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Slide Headlines</strong></td>
            <td>Vague topic labels ("Market Overview", "Financials")</td>
            <td>Insight-led action titles ("Enterprise Automation Cuts OpEx by 38% Within 60 Days")</td>
          </tr>
          <tr>
            <td><strong>Visual Density</strong></td>
            <td>Overcrowded 8-bullet paragraphs that overflow <code>.pptx</code> boxes</td>
            <td>Strict "One clear message per slide" + 3 concise proof points</td>
          </tr>
          <tr>
            <td><strong>Data & Charts</strong></td>
            <td>Plain text numbers buried in sentences</td>
            <td>Explicit chart specs (Waterfall, 2x2 Matrix, Cohort Bar) with axis labels</td>
          </tr>
          <tr>
            <td><strong>Fact Accuracy</strong></td>
            <td>Blends confident hallucinations with real facts</td>
            <td>Flags any claim requiring verification with <code>[VERIFY]</code> & source attribution</td>
          </tr>
          <tr>
            <td><strong>Export Readiness</strong></td>
            <td>Missing speaker notes; requires hours of manual reformatting</td>
            <td>Complete Presenter View speaker notes ready for PowerPoint & Google Slides</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- 7. Frequently Asked Questions (Aligned with PAA & GEO AI Overview) -->
  <section class="below-fold-section" id="faq">
    <h2>Frequently Asked Questions</h2>
    <div class="faq-list">
      ${faqs
        .map(
          (item) => `
        <article class="faq-item">
          <h3>${escapeHtml(item.q)}</h3>
          <p style="margin:0;">${escapeHtml(item.a)}</p>
        </article>`
        )
        .join('')}
    </div>
  </section>`;
}

// Master HTML Document Wrapper with Full Technical SEO, JSON-LD, Open Graph & Hreflang
function renderDocument({
  lang = 'en',
  canonicalPath,
  metaTitle,
  metaDesc,
  h1,
  subtitle,
  activeNav = 'generator',
  bodyHtml,
  faqs = CORE_FAQS,
  includeHreflang = false
}) {
  const fullCanonical = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;

  const schemaGraph = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: metaTitle,
      url: fullCanonical,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Works in Chrome, Safari, Edge, Firefox.',
      description: metaDesc,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      featureList: [
        'Instant ChatGPT Slides prompt generation',
        '36+ specialized presentation slide structures',
        'One-click Copy, TXT Download, and Open in ChatGPT',
        'PowerPoint (.pptx), PDF, and Google Slides export optimization'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a
        }
      }))
    }
  ];

  const hreflangTags = includeHreflang
    ? `
  <link rel="alternate" hreflang="en" href="${SITE_URL}/chatgpt-slides-prompt-generator" />
  <link rel="alternate" hreflang="es" href="${SITE_URL}/es/chatgpt-slides-prompt-generator" />
  <link rel="alternate" hreflang="ja" href="${SITE_URL}/ja/chatgpt-slides-prompt-generator" />
  <link rel="alternate" hreflang="zh-TW" href="${SITE_URL}/zh-TW/chatgpt-slides-prompt-generator" />
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/chatgpt-slides-prompt-generator" />`
    : '';

  const gscMetaTag = GSC_VERIFICATION_CODE
    ? `\n  <meta name="google-site-verification" content="${escapeHtml(GSC_VERIFICATION_CODE)}" />`
    : '';

  return `<!DOCTYPE html>
<html lang="${escapeHtml(lang)}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(metaTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}" />
  <link rel="canonical" href="${escapeHtml(fullCanonical)}" />${gscMetaTag}${hreflangTags}

  <!-- Open Graph / Social Preview -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(metaTitle)}" />
  <meta property="og:description" content="${escapeHtml(metaDesc)}" />
  <meta property="og:url" content="${escapeHtml(fullCanonical)}" />
  <meta property="og:site_name" content="${escapeHtml(BRAND_NAME)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(metaTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />

  <link rel="stylesheet" href="/styles.css" />
  <script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
</head>
<body>
  <!-- Sticky Translucent Apple-Style Header -->
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="brand-link" aria-label="${escapeHtml(BRAND_NAME)} Home">
        <span class="brand-mark">S</span>
        <span>${escapeHtml(BRAND_NAME)}</span>
      </a>

      <nav class="nav-links" aria-label="Primary Navigation">
        <a href="/chatgpt-slides-prompt-generator" class="nav-link ${activeNav === 'generator' ? 'is-active' : ''}">Prompt Generator</a>
        <a href="/chatgpt-slides-templates" class="nav-link ${activeNav === 'templates' ? 'is-active' : ''}">36+ Templates</a>
        <a href="/prompts/pitch-deck" class="nav-link ${activeNav === 'pitch-deck' ? 'is-active' : ''}">Pitch Deck</a>
        <a href="/prompts/sales-presentation" class="nav-link ${activeNav === 'sales-presentation' ? 'is-active' : ''}">Sales Deck</a>
        <a href="/chatgpt-slides-to-powerpoint" class="nav-link ${activeNav === 'powerpoint' ? 'is-active' : ''}">Export to PPTX</a>
        <a href="/chatgpt-slides-not-showing" class="nav-link ${activeNav === 'troubleshooting' ? 'is-active' : ''}">Not Showing Fix</a>
      </nav>

      <div class="header-actions">
        <button type="button" id="btn-open-saved-drawer" class="chip" style="font-weight:600;">
          🔖 Saved (<span id="saved-count-badge">0</span>)
        </button>
        <div class="lang-switcher" aria-label="Language Switcher">
          <a href="/chatgpt-slides-prompt-generator" class="lang-link ${lang === 'en' ? 'is-current' : ''}">EN</a>
          <a href="/es/chatgpt-slides-prompt-generator" class="lang-link ${lang === 'es' ? 'is-current' : ''}">ES</a>
          <a href="/ja/chatgpt-slides-prompt-generator" class="lang-link ${lang === 'ja' ? 'is-current' : ''}">JA</a>
          <a href="/zh-TW/chatgpt-slides-prompt-generator" class="lang-link ${lang === 'zh-TW' ? 'is-current' : ''}">繁中</a>
        </div>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- Compact Hero & Single H1 -->
    <section class="hero-compact">
      <div class="release-pill">
        <span class="release-dot"></span>
        <span>${escapeHtml(RELEASE_DATE_NOTE)}</span>
      </div>
      <h1>${escapeHtml(h1)}</h1>
      <p class="hero-subtitle">${escapeHtml(subtitle)}</p>
    </section>

    ${bodyHtml}
  </main>

  <!-- Saved Prompts Drawer (Interruptible Spring Physics + 1:1 Pointer Drag) -->
  <div id="saved-drawer-scrim" class="drawer-scrim" aria-hidden="true"></div>
  <aside id="saved-prompts-drawer" class="saved-drawer" aria-label="Saved Prompts Library" aria-hidden="true">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-block-end:0.75rem;">
      <strong style="font-size:1.05rem;">🔖 Saved Prompts Library</strong>
      <button type="button" id="btn-close-saved-drawer" class="chip">Close ✕</button>
    </div>
    <p class="caption-text" style="margin-block-end:0.75rem;">Drag right to dismiss · Stored locally in your browser.</p>
    <div id="saved-prompts-list" style="overflow-y:auto; flex:1;"></div>
  </aside>

  <!-- Toast Feedback Pill -->
  <div id="app-toast" class="toast-pill" role="status" aria-live="polite"></div>

  <!-- Footer with Internal Links & Official Reference -->
  <footer class="site-footer">
    <div class="container">
      <div class="grid-4" style="margin-block-end:1.5rem;">
        <div>
          <strong style="color:var(--text-primary); display:block; margin-block-end:0.5rem;">${escapeHtml(BRAND_NAME)}</strong>
          <p class="caption-text">Free client-side prompt engineering studio for OpenAI’s ChatGPT Slides (launched Oct 16, 2026). No API key, no sign-up, instant PowerPoint & Google Slides structure.</p>
        </div>
        <div>
          <strong style="color:var(--text-primary); display:block; margin-block-end:0.5rem;">Core Tools & Guides</strong>
          <ul style="list-style:none; padding:0; margin:0; display:grid; gap:0.35rem;">
            <li><a href="/chatgpt-slides-prompt-generator" style="color:var(--text-secondary); text-decoration:none;">ChatGPT Slides Prompt Generator</a></li>
            <li><a href="/chatgpt-slides-templates" style="color:var(--text-secondary); text-decoration:none;">All 36+ Slide Prompt Templates</a></li>
            <li><a href="/chatgpt-slides-to-powerpoint" style="color:var(--text-secondary); text-decoration:none;">Export ChatGPT Slides to PowerPoint</a></li>
            <li><a href="/chatgpt-slides-not-showing" style="color:var(--text-secondary); text-decoration:none;">ChatGPT Slides Not Showing Fix</a></li>
          </ul>
        </div>
        <div>
          <strong style="color:var(--text-primary); display:block; margin-block-end:0.5rem;">Popular Business Prompts</strong>
          <ul style="list-style:none; padding:0; margin:0; display:grid; gap:0.35rem;">
            <li><a href="/prompts/sales-presentation" style="color:var(--text-secondary); text-decoration:none;">Sales Presentation Prompt</a></li>
            <li><a href="/prompts/pitch-deck" style="color:var(--text-secondary); text-decoration:none;">Startup Pitch Deck Prompt</a></li>
            <li><a href="/prompts/project-update" style="color:var(--text-secondary); text-decoration:none;">Project Update Status Prompt</a></li>
            <li><a href="/prompts/business-proposal" style="color:var(--text-secondary); text-decoration:none;">Business Proposal Prompt</a></li>
            <li><a href="/prompts/financial-report" style="color:var(--text-secondary); text-decoration:none;">CFO Financial Report Prompt</a></li>
          </ul>
        </div>
        <div>
          <strong style="color:var(--text-primary); display:block; margin-block-end:0.5rem;">Academic, Tech & Niche</strong>
          <ul style="list-style:none; padding:0; margin:0; display:grid; gap:0.35rem;">
            <li><a href="/prompts/research-presentation" style="color:var(--text-secondary); text-decoration:none;">Research Presentation Prompt</a></li>
            <li><a href="/prompts/lesson-plan" style="color:var(--text-secondary); text-decoration:none;">Classroom Lesson Plan Prompt</a></li>
            <li><a href="/prompts/lesson-deck" style="color:var(--text-secondary); text-decoration:none;">Course Lesson Deck Prompt</a></li>
            <li><a href="/prompts/conference-presentation" style="color:var(--text-secondary); text-decoration:none;">Conference Keynote Prompt</a></li>
            <li><a href="/prompts/real-estate-presentation" style="color:var(--text-secondary); text-decoration:none;">Real Estate Pitch Prompt</a></li>
          </ul>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.75rem; padding-block-start:1rem; border-top:1px solid var(--border-hairline);">
        <span>© 2026 ${escapeHtml(BRAND_NAME)}. Independent prompt builder; not affiliated with OpenAI.</span>
        <span>Reference: <a href="https://help.openai.com/en/articles/20001605-creating-and-collaborating-on-slides-in-chatgpt" rel="nofollow noopener noreferrer" target="_blank" style="color:var(--brand-color);">Creating and Collaborating on Slides in ChatGPT (OpenAI Help)</a></span>
      </div>
    </div>
  </footer>

  <script src="/app.js" defer></script>
</body>
</html>`;
}

// Build All Static Pages
function buildSite() {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  ensureDir(DIST_DIR);

  // Copy static CSS and JS
  fs.copyFileSync(path.join(ROOT_DIR, 'src/styles.css'), path.join(DIST_DIR, 'styles.css'));
  fs.copyFileSync(path.join(ROOT_DIR, 'src/app.js'), path.join(DIST_DIR, 'app.js'));

  const allUrls = [];

  // 1. Root Index (/) & /chatgpt-slides-prompt-generator
  const mainGeneratorConfig = {
    slug: 'chatgpt-slides-prompt-generator',
    canonicalPath: '/chatgpt-slides-prompt-generator',
    defaultTopic: 'Q4 Enterprise AI Workflow Automation Strategy & Quantified ROI',
    defaultAudience: AUDIENCE_OPTIONS[0],
    defaultGoal: GOAL_OPTIONS[0],
    defaultSlides: 10,
    defaultStyle: 'executive',
    defaultSource: 'chat',
    slideStructure: PROMPT_TEMPLATES[0].slideStructure,
    proTip:
      'After clicking "Copy Prompt" or "Open ChatGPT", attach any source PDF/Excel file in ChatGPT so the new ChatGPT Slides canvas populates real numbers and speaker notes.'
  };

  const mainBodyHtml =
    renderCoreToolWidget(mainGeneratorConfig) +
    renderInternalLinksSection('', true) +
    renderStandardSeoSections('ChatGPT Slides Prompt Generator');

  // Write `/`
  writeRouteHtml(
    '/',
    renderDocument({
      lang: 'en',
      canonicalPath: '/',
      metaTitle: 'ChatGPT Slides Prompt Generator - Free Presentation Builder',
      metaDesc:
        'Generate structured prompts for ChatGPT Slides (Oct 2026 release). Customize audience, slide count, charts & speaker notes. Free online tool, no login!',
      h1: 'ChatGPT Slides Prompt Generator',
      subtitle:
        'Build executive-ready presentation prompts for OpenAI’s ChatGPT Slides canvas in seconds. Customize audience, slide structure, chart recommendations, and speaker notes—ready for PowerPoint (.pptx), PDF, and Google Slides export.',
      activeNav: 'generator',
      bodyHtml: mainBodyHtml,
      includeHreflang: true
    })
  );
  allUrls.push(`${SITE_URL}/`);

  // Write `/chatgpt-slides-prompt-generator`
  writeRouteHtml(
    '/chatgpt-slides-prompt-generator',
    renderDocument({
      lang: 'en',
      canonicalPath: '/chatgpt-slides-prompt-generator',
      metaTitle: 'ChatGPT Slides Prompt Generator - 36+ Deck Templates | Free',
      metaDesc:
        'Create ready-to-copy prompts for ChatGPT Slides. Set topic, audience, slide count, tone, charts & speaker notes for instant PowerPoint & Google Slides decks!',
      h1: 'ChatGPT Slides Prompt Generator (Free Online Builder)',
      subtitle:
        'Turn any topic, document, or outline into a high-impact presentation prompt for ChatGPT Slides. Zero API fees, no sign-up required—just configure, copy, and generate.',
      activeNav: 'generator',
      bodyHtml: mainBodyHtml,
      includeHreflang: true
    })
  );
  allUrls.push(`${SITE_URL}/chatgpt-slides-prompt-generator`);

  // 2. Write `/chatgpt-slides-templates`
  const templatesHubBody =
    renderInternalLinksSection('', true) +
    renderCoreToolWidget({
      ...mainGeneratorConfig,
      slug: 'chatgpt-slides-templates',
      canonicalPath: '/chatgpt-slides-templates'
    }) +
    renderStandardSeoSections('ChatGPT Slides Prompt Templates');

  writeRouteHtml(
    '/chatgpt-slides-templates',
    renderDocument({
      lang: 'en',
      canonicalPath: '/chatgpt-slides-templates',
      metaTitle: '36+ ChatGPT Slides Prompt Templates (Sales, Pitch, Research)',
      metaDesc:
        'Browse 36+ free ChatGPT Slides prompt templates for sales decks, startup pitch decks, QBRs, research presentations & lesson plans. Copy in one click!',
      h1: 'ChatGPT Slides Prompt Templates Library (36+ Blueprints)',
      subtitle:
        'Explore 36 battle-tested presentation structures tailored for OpenAI’s ChatGPT Slides canvas. Click any template to customize slide count, tone, charts, and speaker notes.',
      activeNav: 'templates',
      bodyHtml: templatesHubBody
    })
  );
  allUrls.push(`${SITE_URL}/chatgpt-slides-templates`);

  // 3. Write `/chatgpt-slides-to-powerpoint`
  const pptxFaqs = [
    {
      q: 'How do I export ChatGPT Slides to PowerPoint (.pptx)?',
      a: 'First, generate your presentation inside the ChatGPT Slides canvas using our export-optimized prompt. Once the slides appear in the right-hand canvas panel, click the Export / Download icon in the top-right toolbar and choose "Download as PowerPoint (.pptx)". All slide titles, bullet hierarchies, and speaker notes transfer natively.'
    },
    {
      q: 'Can I open ChatGPT Slides in Google Slides or export as PDF?',
      a: 'Yes. ChatGPT Slides supports three native export formats out of the box: Microsoft PowerPoint (.pptx), print-ready PDF, and direct export to Google Slides. You can also upload the downloaded .pptx file into Google Drive or Apple Keynote.'
    },
    {
      q: 'Why do my exported PowerPoint slides have overflowing text?',
      a: 'Text overflow happens when a prompt does not restrict word count per slide. Our ChatGPT Slides to PowerPoint prompt generator automatically injects strict layout rules ("One clear message per slide", max 3–4 concise bullets, move long explanations into Speaker Notes) so every exported .pptx slide looks clean.'
    },
    ...CORE_FAQS.slice(0, 3)
  ];

  const pptxBody =
    renderCoreToolWidget({
      ...mainGeneratorConfig,
      slug: 'chatgpt-slides-to-powerpoint',
      canonicalPath: '/chatgpt-slides-to-powerpoint',
      defaultTopic: 'Executive Strategy Presentation Optimized for Clean PowerPoint (.pptx) Export',
      proTip:
        'To avoid text overflowing in PowerPoint, keep "Add Speaker Notes" checked—this instructs ChatGPT Slides to keep slide canvas bullets short and place detailed scripts into PowerPoint Presenter View.'
    }) +
    `
    <section class="below-fold-section">
      <h2>Step-by-Step: Exporting ChatGPT Slides to PowerPoint, PDF & Google Slides</h2>
      <div class="grid-3">
        <article class="info-card">
          <h3>1. Trigger the Native Slides Canvas</h3>
          <p class="caption-text">Paste the generated prompt above into ChatGPT. Starting with <em>"Create a [N]-slide presentation..."</em> triggers the dedicated collaborative Slides canvas introduced on October 16, 2026 rather than plain chat markdown.</p>
        </article>
        <article class="info-card">
          <h3>2. Collaborate & Edit Inline</h3>
          <p class="caption-text">Highlight any slide card in the ChatGPT Slides workspace to shorten headlines, swap chart types, or ask ChatGPT to adjust tone before exporting.</p>
        </article>
        <article class="info-card">
          <h3>3. Export to .PPTX, PDF, or Google Slides</h3>
          <p class="caption-text">Click the Export button in the ChatGPT Slides header to download a native <code>.pptx</code> file (compatible with PowerPoint Master Slides), PDF handout, or Google Slides deck.</p>
        </article>
      </div>
    </section>` +
    renderStandardSeoSections('ChatGPT Slides to PowerPoint Generator', pptxFaqs) +
    renderInternalLinksSection('');

  writeRouteHtml(
    '/chatgpt-slides-to-powerpoint',
    renderDocument({
      lang: 'en',
      canonicalPath: '/chatgpt-slides-to-powerpoint',
      metaTitle: 'ChatGPT Slides to PowerPoint (.PPTX), PDF & Google Slides',
      metaDesc:
        'Generate ChatGPT Slides prompts optimized for clean PowerPoint (.pptx), PDF, and Google Slides export. Prevent text overflow & preserve speaker notes!',
      h1: 'ChatGPT Slides to PowerPoint (.PPTX) Prompt Generator & Export Guide',
      subtitle:
        'Eliminate messy formatting and overflowing text boxes when exporting from ChatGPT Slides to Microsoft PowerPoint, PDF, or Google Slides.',
      activeNav: 'powerpoint',
      bodyHtml: pptxBody,
      faqs: pptxFaqs
    })
  );
  allUrls.push(`${SITE_URL}/chatgpt-slides-to-powerpoint`);

  // 4. Write `/chatgpt-slides-not-showing`
  const troubleshootingFaqs = [
    {
      q: 'Why is ChatGPT Slides not showing in my ChatGPT interface?',
      a: 'The most common reasons ChatGPT Slides is not showing are: (1) Using a legacy or non-Canvas model instead of the default GPT-5 / GPT-4o workspace model, (2) Phrasing the prompt as an outline request instead of explicitly asking to "Create a [N]-slide presentation", (3) Workspace/Enterprise admin toggles having Collaborative Canvas disabled, or (4) Stale browser session cache after the October 16, 2026 rollout.'
    },
    {
      q: 'What exact prompt forces ChatGPT to open the Slides canvas?',
      a: 'Start your prompt with the exact imperative: "Create a 10-slide presentation about [TOPIC]" and include the requirement "Format cleanly in ChatGPT Slides canvas so it exports seamlessly to PowerPoint (.pptx), PDF, and Google Slides." Use our generator on this page to copy the exact trigger syntax.'
    },
    {
      q: 'Does ChatGPT Slides work on mobile apps or only desktop web?',
      a: 'While you can view generated presentations on mobile, full collaborative slide editing and direct PowerPoint/Google Slides export work best on desktop web browsers (Chrome, Safari, Edge, Firefox) at chatgpt.com.'
    },
    ...CORE_FAQS.slice(0, 3)
  ];

  const troubleshootingBody =
    `
    <section aria-label="ChatGPT Slides Troubleshooting Checklist" class="surface-card" style="margin-block-end: 1.5rem;">
      <h2 style="margin-block-end:0.5rem;">Quick Diagnostic: 5 Fixes When ChatGPT Slides Is Not Showing</h2>
      <p class="caption-text" style="margin-block-end:1rem;">OpenAI rolled out ChatGPT Slides on October 16, 2026 (<a href="https://help.openai.com/en/articles/20001605-creating-and-collaborating-on-slides-in-chatgpt" rel="nofollow noopener noreferrer" target="_blank">Article 20001605</a>). If the interactive slide canvas does not trigger, verify these 5 checkpoints:</p>
      <div class="grid-3">
        <div class="info-card">
          <h3>✅ Fix 1: Use Explicit Trigger Syntax</h3>
          <p class="caption-text">Asking for "slide ideas" or "an outline" keeps ChatGPT in regular text chat. Begin your prompt with <code>Create a 10-slide presentation about...</code> using the generator below.</p>
        </div>
        <div class="info-card">
          <h3>✅ Fix 2: Check Model & Canvas Toggle</h3>
          <p class="caption-text">Ensure you are in a flagship model supporting Canvas/Tools and not a restricted reasoning-only or legacy model without workspace canvas rendering.</p>
        </div>
        <div class="info-card">
          <h3>✅ Fix 3: Team / Enterprise Admin Policy</h3>
          <p class="caption-text">On ChatGPT Team, Edu, or Enterprise plans, ask your workspace administrator to enable <strong>Canvas & Collaborative Slides</strong> and third-party Google Drive export in Admin Settings.</p>
        </div>
      </div>
    </section>` +
    renderCoreToolWidget({
      ...mainGeneratorConfig,
      slug: 'chatgpt-slides-not-showing',
      canonicalPath: '/chatgpt-slides-not-showing',
      defaultTopic: 'Executive Business Review (Canvas-Triggering Slides Prompt)',
      proTip:
        'This generator starts every prompt with the exact "Create a [N]-slide presentation about..." command that reliably triggers the ChatGPT Slides UI.'
    }) +
    renderStandardSeoSections('ChatGPT Slides Troubleshooting & Prompt Trigger', troubleshootingFaqs) +
    renderInternalLinksSection('');

  writeRouteHtml(
    '/chatgpt-slides-not-showing',
    renderDocument({
      lang: 'en',
      canonicalPath: '/chatgpt-slides-not-showing',
      metaTitle: 'ChatGPT Slides Not Showing? 5 Instant Fixes & Trigger Prompt',
      metaDesc:
        'Fix ChatGPT Slides not showing up in your account. Check workspace settings, browser cache & copy the exact trigger prompt that opens the Slides canvas!',
      h1: 'ChatGPT Slides Not Showing? Troubleshooting Guide & Canvas Trigger Prompt',
      subtitle:
        'Can’t see the new October 2026 ChatGPT Slides canvas or PowerPoint export button? Follow our 60-second diagnostic checklist and use the canvas-trigger prompt below.',
      activeNav: 'troubleshooting',
      bodyHtml: troubleshootingBody,
      faqs: troubleshootingFaqs
    })
  );
  allUrls.push(`${SITE_URL}/chatgpt-slides-not-showing`);

  // 5. Write all 36 Programmatic SEO Niche Pages `/prompts/[slug]`
  for (const tpl of PROMPT_TEMPLATES) {
    const route = `/prompts/${tpl.slug}`;
    const customFaqs = [
      {
        q: `How do I generate a ${tpl.shortName.replace(/ Prompt$/i, '')} in ChatGPT Slides?`,
        a: `Enter your specific topic at the top of our ${tpl.shortName} generator, select "${tpl.defaultAudience}" as your audience, keep the ${tpl.defaultSlides}-slide blueprint enabled, and click "Copy Prompt" or "Open ChatGPT". ChatGPT Slides will generate a complete collaborative deck ready for PowerPoint (.pptx), PDF, or Google Slides export.`
      },
      {
        q: `What is the best slide structure for a ${tpl.shortName.replace(/ Prompt$/i, '')}?`,
        a: `Our recommended ${tpl.defaultSlides}-slide structure covers: ${tpl.slideStructure.slice(0, 5).join('; ')} — continuing through ${tpl.slideStructure[tpl.slideStructure.length - 1]}. You can adjust the slider from 5 to 20 slides to expand or condense this blueprint.`
      },
      ...CORE_FAQS.slice(0, 4)
    ];

    const pageBody =
      renderCoreToolWidget({
        ...tpl,
        canonicalPath: route
      }) +
      `
      <section class="below-fold-section">
        <h2>Recommended ${tpl.defaultSlides}-Slide Blueprint for ${escapeHtml(tpl.shortName.replace(/ Prompt$/i, ''))}</h2>
        <p>Every prompt generated on this page instructs ChatGPT Slides to follow this proven presentation flow (customizable from 5 to 20 slides):</p>
        <div class="grid-3">
          ${tpl.slideStructure
            .map((s, idx) => {
              const cleanTitle = s.replace(/^Slide\s+\d+:\s*/i, '');
              return `
              <article class="info-card">
                <span class="step-badge">${idx + 1}</span>
                <h3>${escapeHtml(cleanTitle)}</h3>
                <p class="caption-text">Includes 1 clear action takeaway, suggested visual/chart layout, and Presenter View speaker notes.</p>
              </article>`;
            })
            .join('')}
        </div>
      </section>` +
      renderStandardSeoSections(tpl.shortName, customFaqs) +
      renderInternalLinksSection(tpl.slug, false);

    writeRouteHtml(
      route,
      renderDocument({
        lang: 'en',
        canonicalPath: route,
        metaTitle: tpl.metaTitle,
        metaDesc: tpl.metaDesc,
        h1: tpl.h1,
        subtitle: tpl.subtitle,
        activeNav: tpl.slug === 'pitch-deck' || tpl.slug === 'sales-presentation' ? tpl.slug : 'templates',
        bodyHtml: pageBody,
        faqs: customFaqs
      })
    );
    allUrls.push(`${SITE_URL}${route}`);
  }

  // 6. Subdirectory i18n Pages (/es/, /ja/, /zh-TW/) per GeFei Workflow 6
  const i18nPages = [
    {
      lang: 'es',
      route: '/es/chatgpt-slides-prompt-generator',
      metaTitle: 'Generador de Prompts para ChatGPT Slides (Gratis y Online)',
      metaDesc:
        'Crea prompts profesionales para ChatGPT Slides gratis. Define tema, audiencia, número de diapositivas, gráficos y notas del orador para PowerPoint.',
      h1: 'Generador de Prompts para ChatGPT Slides',
      subtitle:
        'Genera presentaciones colaborativas en ChatGPT Slides (lanzado el 16 de octubre de 2026) listas para exportar a PowerPoint (.pptx), PDF y Google Slides sin API ni registro.',
      defaultLang: 'Español',
      ui: {
        formLegend: '1. Configura tu Presentación de ChatGPT Slides',
        noApiBadge: '100% Gratis · Sin API Key · Copia Instantánea',
        topicLabel: 'Tema de la Presentación',
        topicRequired: 'Obligatorio',
        topicPlaceholder: 'Ej. Estrategia de Automatización IA B2B para el Q4...',
        trySample: 'Ejemplos rápidos:',
        audienceLabel: 'Audiencia Objetivo',
        goalLabel: 'Objetivo de la Presentación',
        slidesLabel: 'Número de Diapositivas',
        styleLabel: 'Estilo y Tono',
        langLabel: 'Idioma de Salida',
        sourceLabel: 'Fuente de Datos',
        optionsLabel: 'Requisitos de las Diapositivas',
        optExec: 'Resumen Ejecutivo',
        optCharts: 'Sugerir Gráficos Adecuados',
        optCitations: 'Identificar Datos por Verificar',
        optNotes: 'Añadir Notas del Orador',
        outputTitle: '2. Prompt Listo para Copiar en ChatGPT Slides',
        copyBtn: 'Copiar Prompt',
        openBtn: 'Abrir ChatGPT ↗',
        switchStyleBtn: 'Cambiar Estilo',
        downloadBtn: 'Descargar .TXT',
        saveLocalBtn: 'Guardar Localmente',
        storyboardTitle: 'Vista Previa de la Estructura de Diapositivas'
      }
    },
    {
      lang: 'ja',
      route: '/ja/chatgpt-slides-prompt-generator',
      metaTitle: 'ChatGPT Slides プロンプト作成ツール（無料・登録不要・PPTX対応）',
      metaDesc:
        '2026年10月公開のChatGPT Slides専用プロンプト生成ツール。テーマ・対象読者・スライド枚数・図表・スピーカーノートを指定してPowerPointやGoogleスライドへ出力！',
      h1: 'ChatGPT Slides 専用プロンプト生成ツール（無料）',
      subtitle:
        'OpenAIのChatGPT Slides（2026年10月16日リリース）向けに最適化されたプレゼン構成プロンプトをワンクリック生成。PowerPoint (.pptx)・PDF・Googleスライド出力に完全対応。',
      defaultLang: '日本語',
      ui: {
        formLegend: '1. プレゼンテーション条件を入力',
        noApiBadge: '完全無料 · APIキー不要 · 登録不要',
        topicLabel: 'プレゼンのテーマ (演示主题)',
        topicRequired: '必須',
        topicPlaceholder: '例：法人向けAI業務自動化プラットフォームの導入提案...',
        trySample: 'サンプルを試す:',
        audienceLabel: '対象オーディエンス (対象読者)',
        goalLabel: 'プレゼンの目的',
        slidesLabel: 'スライド枚数',
        styleLabel: 'トーン＆スタイル',
        langLabel: '出力言語',
        sourceLabel: 'データソース・参照元',
        optionsLabel: '追加オプション（図表・出典・ノート）',
        optExec: 'エグゼクティブサマリーを含める',
        optCharts: '適切なグラフ・図表を提案',
        optCitations: '要検証の主張・出典を明示',
        optNotes: 'スピーカーノートを追加',
        outputTitle: '2. 生成された ChatGPT Slides プロンプト',
        copyBtn: 'プロンプトをコピー',
        openBtn: 'ChatGPTを開く ↗',
        switchStyleBtn: 'スタイル切替',
        downloadBtn: 'TXT保存',
        saveLocalBtn: 'ブラウザに保存',
        storyboardTitle: 'スライド構成プレビュー'
      }
    },
    {
      lang: 'zh-TW',
      route: '/zh-TW/chatgpt-slides-prompt-generator',
      metaTitle: 'ChatGPT Slides 提示詞產生器 - 免費簡報指令模板工具 (支援 PPTX)',
      metaDesc:
        '專為 2026 年 10 月推出的 ChatGPT Slides 打造的免費簡報提示詞產生器。一鍵設定簡報主題、受眾、頁數、圖表建議與講者備忘稿，輕鬆匯出 PowerPoint 與 Google 簡報！',
      h1: 'ChatGPT Slides 簡報提示詞產生器',
      subtitle:
        '專為 OpenAI 最新發布的 ChatGPT Slides 協作簡報功能設計。無需 API Key、免註冊，輸入主題與受眾即可生成結構化簡報指令，完美匯出 PowerPoint (.pptx)、PDF 與 Google Slides。',
      defaultLang: '繁體中文',
      ui: {
        formLegend: '1. 設定您的 ChatGPT Slides 簡報參數',
        noApiBadge: '100% 免費 · 免 API Key · 即時生成',
        topicLabel: '演示主題 (Presentation Topic)',
        topicRequired: '必填',
        topicPlaceholder: '例如：2027 企業 AI 自動化工作流導入與 ROI 評估報告...',
        trySample: '試試熱門範例:',
        audienceLabel: '目標受眾 (Target Audience)',
        goalLabel: '演示目的 (Goal)',
        slidesLabel: '簡報頁數 (Slide Count)',
        styleLabel: '簡報風格 (Tone & Style)',
        langLabel: '輸出語言 (Language)',
        sourceLabel: '資料來源 (Data Source)',
        optionsLabel: '進階要求（圖表 / 引用來源 / 演講者備註）',
        optExec: '包含執行摘要頁 (Executive Summary)',
        optCharts: '建議合適的圖表 (Suggest Charts)',
        optCitations: '標註需查核的數據與來源 (Citations)',
        optNotes: '加入演講者備註 (Speaker Notes)',
        outputTitle: '2. 可直接複製到 ChatGPT Slides 的完整提示詞',
        copyBtn: '複製提示詞 (Copy)',
        openBtn: '打開 ChatGPT ↗',
        switchStyleBtn: '換一種風格',
        downloadBtn: '下載 .TXT',
        saveLocalBtn: '保存到本地',
        storyboardTitle: '即時簡報大綱結構預覽'
      }
    }
  ];

  for (const loc of i18nPages) {
    const locBody =
      renderCoreToolWidget(
        {
          ...mainGeneratorConfig,
          canonicalPath: loc.route,
          defaultLang: loc.defaultLang
        },
        loc.ui
      ) +
      renderInternalLinksSection('', false) +
      renderStandardSeoSections(loc.h1);

    writeRouteHtml(
      loc.route,
      renderDocument({
        lang: loc.lang,
        canonicalPath: loc.route,
        metaTitle: loc.metaTitle,
        metaDesc: loc.metaDesc,
        h1: loc.h1,
        subtitle: loc.subtitle,
        activeNav: 'generator',
        bodyHtml: locBody,
        includeHreflang: true
      })
    );
    allUrls.push(`${SITE_URL}${loc.route}`);
  }

  // 7. Generate sitemap.xml
  const today = '2026-10-21';
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${escapeHtml(u)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.endsWith('/chatgpt-slides-prompt-generator') || u === `${SITE_URL}/` ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');

  // 8. Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');

  // 9. Generate Cloudflare Pages _headers for security & caching
  const cfHeaders = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
`;
  fs.writeFileSync(path.join(DIST_DIR, '_headers'), cfHeaders, 'utf8');

  // 10. Google Search Console HTML file verification (both account token files)
  const gscHtmlFiles = [
    GSC_HTML_FILENAME,
    GSC_VERIFICATION_CODE ? `google${GSC_VERIFICATION_CODE}.html` : ''
  ].filter((f) => f && f.startsWith('google'));

  for (const rawFile of gscHtmlFiles) {
    const cleanFile = rawFile.endsWith('.html') ? rawFile : `${rawFile}.html`;
    fs.writeFileSync(
      path.join(DIST_DIR, cleanFile),
      `google-site-verification: ${cleanFile}`,
      'utf8'
    );
  }

  console.log(`Built ${allUrls.length} static SEO pages into ${DIST_DIR}`);
}

buildSite();
