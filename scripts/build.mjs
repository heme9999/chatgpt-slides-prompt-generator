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
import { UI_STRINGS, LOCALIZED_HUB_PAGES } from '../src/i18n-data.mjs';

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

// Helper to normalize base route and build localized route paths
function getBaseRoute(routePath) {
  if (!routePath || routePath === '/') return '/chatgpt-slides-prompt-generator';
  const stripped = routePath.replace(/^\/(es|ja|zh-TW)(?=\/|$)/, '');
  return stripped || '/chatgpt-slides-prompt-generator';
}

function getLocalizedRoute(routePath, targetLang = 'en') {
  const base = getBaseRoute(routePath);
  if (!targetLang || targetLang === 'en') return base;
  return `/${targetLang}${base}`;
}

// Render the Core Interactive Tool Section (Always Above the Fold!)
function renderCoreToolWidget(config, lang = 'en') {
  const t = UI_STRINGS[lang] || UI_STRINGS.en;

  const defaultTopic = config.defaultTopic || t.defaultTopic;
  const defaultAudience = config.defaultAudience || AUDIENCE_OPTIONS[0];
  const defaultGoal = config.defaultGoal || GOAL_OPTIONS[0];
  const defaultSlides = config.defaultSlides || 10;
  const defaultStyle = config.defaultStyle || 'executive';
  const defaultSource = config.defaultSource || 'chat';
  const defaultLang = config.defaultLang || t.defaultOutputLang || 'English';
  const sampleTopics = config.sampleTopics || t.sampleTopics;
  const proTipText = config.proTip || t.defaultProTip;

  const localizedStyles = STYLE_PRESETS.map((s) => ({
    ...s,
    label: t.styleLabels?.[s.id]?.label || s.label,
    shortLabel: t.styleLabels?.[s.id]?.shortLabel || s.shortLabel
  }));

  const activeStyleObj = localizedStyles.find((s) => s.id === defaultStyle) || localizedStyles[0];

  const clientConfigJson = JSON.stringify({
    slug: config.slug || 'chatgpt-slides-prompt-generator',
    uiLang: lang,
    slidesSuffix: t.slidesSuffix || 'Slides',
    stylePrefix: t.stylePrefix || 'Style',
    styles: localizedStyles,
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
                ${(t.audienceOptions || AUDIENCE_OPTIONS.map((a) => ({ value: a, label: a }))).map(
                  (aud) =>
                    `<option value="${escapeHtml(aud.value)}"${aud.value === defaultAudience ? ' selected' : ''}>${escapeHtml(aud.label)}</option>`
                ).join('')}
              </select>
            </div>
            <div>
              <label for="select-goal" class="field-label">${escapeHtml(t.goalLabel)}</label>
              <select id="select-goal" name="goal" class="form-select">
                ${(t.goalOptions || GOAL_OPTIONS.map((g) => ({ value: g, label: g }))).map(
                  (goal) =>
                    `<option value="${escapeHtml(goal.value)}"${goal.value === defaultGoal ? ' selected' : ''}>${escapeHtml(goal.label)}</option>`
                ).join('')}
              </select>
            </div>
          </div>

          <!-- Slide Count Range + Quick Pills -->
          <div class="form-group">
            <div class="slider-header">
              <label for="range-slides" class="field-label" style="margin:0;">${escapeHtml(t.slidesLabel)}</label>
              <span id="slides-count-display" class="slide-count-badge">${defaultSlides} ${escapeHtml(t.slidesSuffix || 'Slides')}</span>
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
                    `<button type="button" class="chip" data-quick-slides="${n}">${n} ${escapeHtml(t.slidesSuffix || 'Slides')}</button>`
                )
                .join('')}
            </div>
          </div>

          <!-- Style & Language Row -->
          <div class="form-group form-row-2">
            <div>
              <label for="select-style" class="field-label">${escapeHtml(t.styleLabel)}</label>
              <select id="select-style" name="style" class="form-select">
                ${localizedStyles
                  .map(
                    (s) =>
                      `<option value="${escapeHtml(s.id)}"${s.id === defaultStyle ? ' selected' : ''}>${escapeHtml(s.label)}</option>`
                  )
                  .join('')}
              </select>
            </div>
            <div>
              <label for="select-language" class="field-label">${escapeHtml(t.langLabel)}</label>
              <select id="select-language" name="language" class="form-select">
                ${LANGUAGE_OPTIONS.map(
                  (l) =>
                    `<option value="${escapeHtml(l.code)}"${l.code === defaultLang ? ' selected' : ''}>${escapeHtml(l.label)}</option>`
                ).join('')}
              </select>
            </div>
          </div>

          <!-- Data Source Context (<=5 options -> visible radio buttons per modern-web-guidance forms) -->
          <div class="form-group">
            <span class="field-label">${escapeHtml(t.sourceLabel)}</span>
            <div class="radio-pills-grid" role="radiogroup" aria-label="${escapeHtml(t.sourceLabel)}">
              ${SOURCE_OPTIONS.map((src) => {
                const locSrc = t.sourceLabels?.[src.id] || src;
                return `
                <label class="radio-pill-label" for="src-${escapeHtml(src.id)}">
                  <input
                    type="radio"
                    id="src-${escapeHtml(src.id)}"
                    name="source"
                    value="${escapeHtml(src.id)}"
                    ${src.id === defaultSource ? 'checked' : ''}
                  />
                  <span class="radio-pill-text">
                    <strong>${escapeHtml(locSrc.label)}</strong>
                    <span>${escapeHtml(locSrc.desc)}</span>
                  </span>
                </label>`;
              }).join('')}
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
        <span id="active-style-pill" class="style-pill-indicator">${escapeHtml(t.stylePrefix || 'Style')}: ${escapeHtml(activeStyleObj.shortLabel)}</span>
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
        proTipText
          ? `<p class="caption-text" style="margin-block: 0.75rem 0; padding: 0.6rem 0.75rem; background: var(--bg-subtle); border-radius: 8px;">💡 <strong>${escapeHtml(t.proTipLabel || 'Pro Tip:')}</strong> ${escapeHtml(proTipText)}</p>`
          : ''
      }

      <!-- Live Storyboard Outline Strip -->
      <div class="storyboard-strip">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="caption-text" style="font-weight:600; color:var(--text-primary);">${escapeHtml(t.storyboardTitle)}</span>
          <span class="caption-text">${escapeHtml(t.storyboardExportNote || 'Exports to .PPTX · PDF · Google Slides')}</span>
        </div>
        <div id="storyboard-cards" class="storyboard-cards"></div>
      </div>
    </div>

    <script type="application/json" id="page-template-config">${clientConfigJson}</script>
  </section>`;
}

// Render Internal Links Matrix (47 Prompt Templates + Hub Pages)
function renderInternalLinksSection(activeSlug = '', includeCategoryFilter = false, lang = 'en') {
  const t = UI_STRINGS[lang] || UI_STRINGS.en;
  const templatesHref = getLocalizedRoute('/chatgpt-slides-templates', lang);

  return `
  <section class="below-fold-section" id="templates-directory">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:1rem; margin-block-end:1rem;">
      <div>
        <h2>${escapeHtml(t.dirTitle)}</h2>
        <p style="margin:0;">${escapeHtml(t.dirDesc)}</p>
      </div>
      <a href="${escapeHtml(templatesHref)}" class="btn btn-secondary" style="min-height:40px; padding:0.45rem 0.9rem; font-size:0.85rem;">${escapeHtml(t.dirBtn)}</a>
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
          href="${escapeHtml(getLocalizedRoute(`/prompts/${tpl.slug}`, lang))}"
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
            <span>${tpl.defaultSlides}${escapeHtml(t.blueprintSuffix || '-Slide Blueprint →')}</span>
            <span class="badge-tag" data-template-usage-slug="${escapeHtml(tpl.slug)}" hidden></span>
          </div>
        </a>`
      ).join('')}
    </div>
  </section>`;
}

// Render Standard GeFei SEO Content Sections (How It Works, Features, Use Cases, Comparison Table, FAQ)
function renderStandardSeoSections(keywordLabel = 'ChatGPT Slides Prompt Generator', customFaqs = null, lang = 'en') {
  const t = UI_STRINGS[lang] || UI_STRINGS.en;
  const faqs = customFaqs || CORE_FAQS;
  const howHeading =
    lang === 'ja' ? `${t.howTitlePrefix}${keywordLabel}` : `${t.howTitlePrefix} ${keywordLabel}`;

  return `
  <!-- 4. How It Works / Step-by-Step Guide -->
  <section class="below-fold-section" id="how-to-use">
    <h2>${escapeHtml(howHeading)}</h2>
    <p>${escapeHtml(t.howDesc)}</p>
    <div class="grid-4">
      ${t.howSteps
        .map(
          (step, idx) => `
      <article class="info-card">
        <span class="step-badge">${idx + 1}</span>
        <h3>${escapeHtml(step.title)}</h3>
        <p class="caption-text">${escapeHtml(step.desc)}</p>
      </article>`
        )
        .join('')}
    </div>
  </section>

  <!-- 5. Key Features / Why Choose Our Tool -->
  <section class="below-fold-section" id="features">
    <h2>${escapeHtml(t.featTitle)}</h2>
    <p>${escapeHtml(t.featDesc)}</p>
    <div class="grid-3">
      ${t.features
        .map(
          (feat) => `
      <article class="info-card">
        <h3>${escapeHtml(feat.title)}</h3>
        <p class="caption-text">${escapeHtml(feat.desc)}</p>
      </article>`
        )
        .join('')}
    </div>
  </section>

  <!-- 6. Information Gain Comparison Table & Use Cases -->
  <section class="below-fold-section" id="comparison">
    <h2>${escapeHtml(t.compTitle)}</h2>
    <p>${escapeHtml(t.compDesc)}</p>
    <div class="table-scroll">
      <table class="seo-table">
        <thead>
          <tr>
            ${t.compHeaders.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${t.compRows
            .map(
              (row) => `
          <tr>
            <td><strong>${escapeHtml(row[0])}</strong></td>
            <td>${escapeHtml(row[1])}</td>
            <td>${escapeHtml(row[2])}</td>
          </tr>`
            )
            .join('')}
        </tbody>
      </table>
    </div>
  </section>

  <!-- 7. Frequently Asked Questions (Aligned with PAA & GEO AI Overview) -->
  <section class="below-fold-section" id="faq">
    <h2>${escapeHtml(t.faqTitle)}</h2>
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
  includeHreflang = true
}) {
  const t = UI_STRINGS[lang] || UI_STRINGS.en;
  const fullCanonical = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;
  const baseRoute = getBaseRoute(canonicalPath);

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
        '47+ specialized presentation slide structures',
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
  <link rel="alternate" hreflang="en" href="${SITE_URL}${escapeHtml(getLocalizedRoute(baseRoute, 'en'))}" />
  <link rel="alternate" hreflang="es" href="${SITE_URL}${escapeHtml(getLocalizedRoute(baseRoute, 'es'))}" />
  <link rel="alternate" hreflang="ja" href="${SITE_URL}${escapeHtml(getLocalizedRoute(baseRoute, 'ja'))}" />
  <link rel="alternate" hreflang="zh-TW" href="${SITE_URL}${escapeHtml(getLocalizedRoute(baseRoute, 'zh-TW'))}" />
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}${escapeHtml(getLocalizedRoute(baseRoute, 'en'))}" />`
    : '';

  const gscMetaTag = GSC_VERIFICATION_CODE
    ? `\n  <meta name="google-site-verification" content="${escapeHtml(GSC_VERIFICATION_CODE)}" />`
    : '';

  const homeHref = lang === 'en' ? '/' : getLocalizedRoute('/chatgpt-slides-prompt-generator', lang);

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
      <a href="${escapeHtml(homeHref)}" class="brand-link" aria-label="${escapeHtml(BRAND_NAME)} Home">
        <span class="brand-mark">S</span>
        <span>${escapeHtml(BRAND_NAME)}</span>
      </a>

      <nav class="nav-links" aria-label="Primary Navigation">
        <a href="${escapeHtml(getLocalizedRoute('/chatgpt-slides-prompt-generator', lang))}" class="nav-link ${activeNav === 'generator' ? 'is-active' : ''}">${escapeHtml(t.navGenerator)}</a>
        <a href="${escapeHtml(getLocalizedRoute('/chatgpt-slides-templates', lang))}" class="nav-link ${activeNav === 'templates' ? 'is-active' : ''}">${escapeHtml(t.navTemplates)}</a>
        <a href="${escapeHtml(getLocalizedRoute('/prompts/pitch-deck', lang))}" class="nav-link ${activeNav === 'pitch-deck' ? 'is-active' : ''}">${escapeHtml(t.navPitch)}</a>
        <a href="${escapeHtml(getLocalizedRoute('/prompts/sales-presentation', lang))}" class="nav-link ${activeNav === 'sales-presentation' ? 'is-active' : ''}">${escapeHtml(t.navSales)}</a>
        <a href="${escapeHtml(getLocalizedRoute('/chatgpt-slides-to-powerpoint', lang))}" class="nav-link ${activeNav === 'powerpoint' ? 'is-active' : ''}">${escapeHtml(t.navPowerpoint)}</a>
        <a href="${escapeHtml(getLocalizedRoute('/chatgpt-slides-not-showing', lang))}" class="nav-link ${activeNav === 'troubleshooting' ? 'is-active' : ''}">${escapeHtml(t.navTroubleshooting)}</a>
      </nav>

      <div class="header-actions">
        <button type="button" id="btn-open-saved-drawer" class="chip" style="font-weight:600;">
          🔖 ${escapeHtml(t.savedLabel)} (<span id="saved-count-badge">0</span>)
        </button>
        <div class="lang-switcher" aria-label="Language Switcher">
          <a href="${escapeHtml(getLocalizedRoute(baseRoute, 'en'))}" class="lang-link ${lang === 'en' ? 'is-current' : ''}">EN</a>
          <a href="${escapeHtml(getLocalizedRoute(baseRoute, 'es'))}" class="lang-link ${lang === 'es' ? 'is-current' : ''}">ES</a>
          <a href="${escapeHtml(getLocalizedRoute(baseRoute, 'ja'))}" class="lang-link ${lang === 'ja' ? 'is-current' : ''}">JA</a>
          <a href="${escapeHtml(getLocalizedRoute(baseRoute, 'zh-TW'))}" class="lang-link ${lang === 'zh-TW' ? 'is-current' : ''}">繁中</a>
        </div>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- Compact Hero & Single H1 -->
    <section class="hero-compact">
      <div class="release-pill">
        <span class="release-dot"></span>
        <span>${escapeHtml(t.releasePill || RELEASE_DATE_NOTE)}</span>
      </div>
      <h1>${escapeHtml(h1)}</h1>
      <p class="hero-subtitle">${escapeHtml(subtitle)}</p>
    </section>

    ${bodyHtml}
  </main>

  <!-- Saved Prompts Drawer (Interruptible Spring Physics + 1:1 Pointer Drag) -->
  <div id="saved-drawer-scrim" class="drawer-scrim" aria-hidden="true"></div>
  <aside id="saved-prompts-drawer" class="saved-drawer" aria-label="Saved Prompts Library" aria-hidden="true" data-empty-msg="${escapeHtml(t.drawerEmpty)}" data-load-label="${escapeHtml(t.drawerLoad)}" data-delete-label="${escapeHtml(t.drawerDelete)}">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-block-end:0.75rem;">
      <strong style="font-size:1.05rem;">${escapeHtml(t.drawerTitle)}</strong>
      <button type="button" id="btn-close-saved-drawer" class="chip">${escapeHtml(t.drawerClose)}</button>
    </div>
    <p class="caption-text" style="margin-block-end:0.75rem;">${escapeHtml(t.drawerHint)}</p>
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
          <p class="caption-text">${escapeHtml(t.footerDesc)}</p>
        </div>
        <div>
          <strong style="color:var(--text-primary); display:block; margin-block-end:0.5rem;">${escapeHtml(t.footerCol1)}</strong>
          <ul style="list-style:none; padding:0; margin:0; display:grid; gap:0.35rem;">
            <li><a href="${escapeHtml(getLocalizedRoute('/chatgpt-slides-prompt-generator', lang))}" style="color:var(--text-secondary); text-decoration:none;">${escapeHtml(t.navGenerator)}</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/chatgpt-slides-templates', lang))}" style="color:var(--text-secondary); text-decoration:none;">${escapeHtml(t.navTemplates)}</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/chatgpt-slides-to-powerpoint', lang))}" style="color:var(--text-secondary); text-decoration:none;">${escapeHtml(t.navPowerpoint)}</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/chatgpt-slides-not-showing', lang))}" style="color:var(--text-secondary); text-decoration:none;">${escapeHtml(t.navTroubleshooting)}</a></li>
          </ul>
        </div>
        <div>
          <strong style="color:var(--text-primary); display:block; margin-block-end:0.5rem;">${escapeHtml(t.footerCol2)}</strong>
          <ul style="list-style:none; padding:0; margin:0; display:grid; gap:0.35rem;">
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/sales-presentation', lang))}" style="color:var(--text-secondary); text-decoration:none;">Sales Presentation Prompt</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/pitch-deck', lang))}" style="color:var(--text-secondary); text-decoration:none;">Startup Pitch Deck Prompt</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/project-update', lang))}" style="color:var(--text-secondary); text-decoration:none;">Project Update Status Prompt</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/business-proposal', lang))}" style="color:var(--text-secondary); text-decoration:none;">Business Proposal Prompt</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/financial-report', lang))}" style="color:var(--text-secondary); text-decoration:none;">CFO Financial Report Prompt</a></li>
          </ul>
        </div>
        <div>
          <strong style="color:var(--text-primary); display:block; margin-block-end:0.5rem;">${escapeHtml(t.footerCol3)}</strong>
          <ul style="list-style:none; padding:0; margin:0; display:grid; gap:0.35rem;">
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/research-presentation', lang))}" style="color:var(--text-secondary); text-decoration:none;">Research Presentation Prompt</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/lesson-plan', lang))}" style="color:var(--text-secondary); text-decoration:none;">Classroom Lesson Plan Prompt</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/lesson-deck', lang))}" style="color:var(--text-secondary); text-decoration:none;">Course Lesson Deck Prompt</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/conference-presentation', lang))}" style="color:var(--text-secondary); text-decoration:none;">Conference Keynote Prompt</a></li>
            <li><a href="${escapeHtml(getLocalizedRoute('/prompts/real-estate-presentation', lang))}" style="color:var(--text-secondary); text-decoration:none;">Real Estate Pitch Prompt</a></li>
          </ul>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.75rem; padding-block-start:1rem; border-top:1px solid var(--border-hairline);">
        <span>© 2026 ${escapeHtml(BRAND_NAME)}. ${escapeHtml(t.footerCopy)}</span>
        <span>${escapeHtml(t.footerRefLabel)} <a href="https://help.openai.com/en/articles/20001605-creating-and-collaborating-on-slides-in-chatgpt" rel="nofollow noopener noreferrer" target="_blank" style="color:var(--brand-color);">Creating and Collaborating on Slides in ChatGPT (OpenAI Help)</a></span>
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
  const i18nLangs = ['es', 'ja', 'zh-TW'];

  for (const lang of i18nLangs) {
    const t = UI_STRINGS[lang];
    const hub = LOCALIZED_HUB_PAGES[lang];

    // 6a. Localized Main Generator: /${lang}/chatgpt-slides-prompt-generator
    const locGenRoute = `/${lang}/chatgpt-slides-prompt-generator`;
    const locGenBody =
      renderCoreToolWidget(
        {
          ...mainGeneratorConfig,
          canonicalPath: locGenRoute,
          defaultTopic: t.defaultTopic,
          defaultLang: t.defaultOutputLang,
          proTip: t.defaultProTip
        },
        lang
      ) +
      renderInternalLinksSection('', true, lang) +
      renderStandardSeoSections(hub.generator.h1, CORE_FAQS, lang);

    writeRouteHtml(
      locGenRoute,
      renderDocument({
        lang,
        canonicalPath: locGenRoute,
        metaTitle: hub.generator.metaTitle,
        metaDesc: hub.generator.metaDesc,
        h1: hub.generator.h1,
        subtitle: hub.generator.subtitle,
        activeNav: 'generator',
        bodyHtml: locGenBody,
        includeHreflang: true
      })
    );
    allUrls.push(`${SITE_URL}${locGenRoute}`);

    // 6b. Localized Templates Hub: /${lang}/chatgpt-slides-templates
    const locTplRoute = `/${lang}/chatgpt-slides-templates`;
    const locTplBody =
      renderInternalLinksSection('', true, lang) +
      renderCoreToolWidget(
        {
          ...mainGeneratorConfig,
          slug: 'chatgpt-slides-templates',
          canonicalPath: locTplRoute,
          defaultTopic: t.defaultTopic,
          defaultLang: t.defaultOutputLang,
          proTip: t.defaultProTip
        },
        lang
      ) +
      renderStandardSeoSections(hub.templates.h1, CORE_FAQS, lang);

    writeRouteHtml(
      locTplRoute,
      renderDocument({
        lang,
        canonicalPath: locTplRoute,
        metaTitle: hub.templates.metaTitle,
        metaDesc: hub.templates.metaDesc,
        h1: hub.templates.h1,
        subtitle: hub.templates.subtitle,
        activeNav: 'templates',
        bodyHtml: locTplBody,
        includeHreflang: true
      })
    );
    allUrls.push(`${SITE_URL}${locTplRoute}`);

    // 6c. Localized PowerPoint Export Guide: /${lang}/chatgpt-slides-to-powerpoint
    const locPptxRoute = `/${lang}/chatgpt-slides-to-powerpoint`;
    const locPptxBody =
      renderCoreToolWidget(
        {
          ...mainGeneratorConfig,
          slug: 'chatgpt-slides-to-powerpoint',
          canonicalPath: locPptxRoute,
          defaultTopic: hub.powerpoint.defaultTopic || t.defaultTopic,
          defaultLang: t.defaultOutputLang,
          proTip: t.defaultProTip
        },
        lang
      ) +
      renderStandardSeoSections(hub.powerpoint.h1, pptxFaqs, lang) +
      renderInternalLinksSection('', false, lang);

    writeRouteHtml(
      locPptxRoute,
      renderDocument({
        lang,
        canonicalPath: locPptxRoute,
        metaTitle: hub.powerpoint.metaTitle,
        metaDesc: hub.powerpoint.metaDesc,
        h1: hub.powerpoint.h1,
        subtitle: hub.powerpoint.subtitle,
        activeNav: 'powerpoint',
        bodyHtml: locPptxBody,
        faqs: pptxFaqs,
        includeHreflang: true
      })
    );
    allUrls.push(`${SITE_URL}${locPptxRoute}`);

    // 6d. Localized Troubleshooting Guide: /${lang}/chatgpt-slides-not-showing
    const locFixRoute = `/${lang}/chatgpt-slides-not-showing`;
    const locFixBody =
      renderCoreToolWidget(
        {
          ...mainGeneratorConfig,
          slug: 'chatgpt-slides-not-showing',
          canonicalPath: locFixRoute,
          defaultTopic: hub.troubleshooting.defaultTopic || t.defaultTopic,
          defaultLang: t.defaultOutputLang,
          proTip: t.defaultProTip
        },
        lang
      ) +
      renderStandardSeoSections(hub.troubleshooting.h1, troubleshootingFaqs, lang) +
      renderInternalLinksSection('', false, lang);

    writeRouteHtml(
      locFixRoute,
      renderDocument({
        lang,
        canonicalPath: locFixRoute,
        metaTitle: hub.troubleshooting.metaTitle,
        metaDesc: hub.troubleshooting.metaDesc,
        h1: hub.troubleshooting.h1,
        subtitle: hub.troubleshooting.subtitle,
        activeNav: 'troubleshooting',
        bodyHtml: locFixBody,
        faqs: troubleshootingFaqs,
        includeHreflang: true
      })
    );
    allUrls.push(`${SITE_URL}${locFixRoute}`);

    // 6e. Localized Prompt Template Pages: /${lang}/prompts/[slug]
    for (const tpl of PROMPT_TEMPLATES) {
      const locPromptRoute = `/${lang}/prompts/${tpl.slug}`;
      const isPitch = tpl.slug === 'pitch-deck';
      const isSales = tpl.slug === 'sales-presentation';
      const hubOverride = isPitch ? hub.pitchDeck : isSales ? hub.salesDeck : null;

      const locMetaTitle = hubOverride ? hubOverride.metaTitle : `${tpl.shortName} - ${hub.generator.h1}`;
      const locMetaDesc = hubOverride ? hubOverride.metaDesc : `${tpl.subtitle} (${hub.generator.metaDesc})`;
      const locH1 = hubOverride ? hubOverride.h1 : `${tpl.h1} (${t.defaultOutputLang})`;
      const locSubtitle = hubOverride ? hubOverride.subtitle : tpl.subtitle;
      const locDefaultTopic = hubOverride?.defaultTopic || tpl.defaultTopic;

      const locPromptBody =
        renderCoreToolWidget(
          {
            ...tpl,
            canonicalPath: locPromptRoute,
            defaultTopic: locDefaultTopic,
            defaultLang: t.defaultOutputLang,
            proTip: t.defaultProTip
          },
          lang
        ) +
        renderStandardSeoSections(locH1, CORE_FAQS, lang) +
        renderInternalLinksSection(tpl.slug, false, lang);

      writeRouteHtml(
        locPromptRoute,
        renderDocument({
          lang,
          canonicalPath: locPromptRoute,
          metaTitle: locMetaTitle,
          metaDesc: locMetaDesc,
          h1: locH1,
          subtitle: locSubtitle,
          activeNav: isPitch || isSales ? tpl.slug : 'templates',
          bodyHtml: locPromptBody,
          faqs: CORE_FAQS,
          includeHreflang: true
        })
      );

      if (isPitch || isSales) {
        allUrls.push(`${SITE_URL}${locPromptRoute}`);
      }
    }
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
