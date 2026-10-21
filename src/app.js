// Apple WWDC Fluid Spring Physics Engine & Pure Client-Side Prompt Composer
(function () {
  'use strict';

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Apple WWDC 2018 exponential decay projection: (v / 1000) * d / (1 - d)
  function project(initialVelocity, decelerationRate = 0.998) {
    return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
  }

  // Apple rubber-banding at boundaries
  function rubberband(overshoot, dimension, constant = 0.55) {
    if (dimension <= 0) return 0;
    return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
  }

  // Interruptible Spring Animator (starts from live presentation value, preserves velocity)
  const activeSprings = new WeakMap();

  function animateSpring(el, targetX, options = {}) {
    if (!el) return;
    const dampingRatio = options.damping ?? 1.0; // 1.0 critically damped, 0.8 momentum bounce
    const response = options.response ?? 0.34;
    const initialVelocity = options.velocity ?? 0; // px/s
    const onUpdate = options.onUpdate;
    const onComplete = options.onComplete;

    const existing = activeSprings.get(el);
    let currentX = existing ? existing.currentX : (options.from ?? 0);
    let velocity = existing ? existing.velocity + initialVelocity * 0.5 : initialVelocity;

    if (existing && existing.rafId) {
      cancelAnimationFrame(existing.rafId);
    }

    if (prefersReducedMotion()) {
      el.style.transform = `translate3d(${targetX}px, 0, 0)`;
      activeSprings.set(el, { currentX: targetX, velocity: 0, rafId: null });
      if (onUpdate) onUpdate(targetX);
      if (onComplete) onComplete();
      return;
    }

    const omega = (2 * Math.PI) / response; // natural frequency
    let lastTime = performance.now();

    const state = { currentX, velocity, rafId: null };
    activeSprings.set(el, state);

    function tick(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.032);
      lastTime = now;

      const displacement = state.currentX - targetX;
      const springForce = -omega * omega * displacement;
      const dampingForce = -2 * dampingRatio * omega * state.velocity;
      const acceleration = springForce + dampingForce;

      state.velocity += acceleration * dt;
      state.currentX += state.velocity * dt;

      el.style.transform = `translate3d(${state.currentX.toFixed(2)}px, 0, 0)`;
      if (onUpdate) onUpdate(state.currentX);

      if (Math.abs(displacement) < 0.4 && Math.abs(state.velocity) < 3) {
        state.currentX = targetX;
        state.velocity = 0;
        state.rafId = null;
        el.style.transform = `translate3d(${targetX}px, 0, 0)`;
        if (onComplete) onComplete();
        return;
      }

      state.rafId = requestAnimationFrame(tick);
    }

    state.rafId = requestAnimationFrame(tick);
  }

  // Toast Notification with Spring Motion
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = message;
    if (toastTimer) clearTimeout(toastTimer);

    if (prefersReducedMotion()) {
      toast.style.transform = 'translate3d(-50%, 0px, 0)';
    } else {
      toast.style.transition = 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)';
      toast.style.transform = 'translate3d(-50%, 0px, 0)';
    }

    toastTimer = setTimeout(() => {
      toast.style.transform = 'translate3d(-50%, 120px, 0)';
    }, 2400);
  }

  // LocalStorage Telemetry & Saved Prompts
  const SAVED_KEY = 'slideprompt_saved_v1';
  const USAGE_KEY = 'slideprompt_usage_counts_v1';

  function getSavedPrompts() {
    try {
      return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function savePromptItem(item) {
    const list = getSavedPrompts();
    list.unshift(item);
    localStorage.setItem(SAVED_KEY, JSON.stringify(list.slice(0, 30)));
    updateSavedCountBadge();
    renderSavedDrawerList();
  }

  function deleteSavedPrompt(id) {
    const list = getSavedPrompts().filter((x) => x.id !== id);
    localStorage.setItem(SAVED_KEY, JSON.stringify(list));
    updateSavedCountBadge();
    renderSavedDrawerList();
  }

  function trackTemplateUsage(slug, actionType) {
    try {
      const counts = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}');
      const key = slug || 'general';
      counts[key] = (counts[key] || 0) + 1;
      counts[`_total_${actionType}`] = (counts[`_total_${actionType}`] || 0) + 1;
      localStorage.setItem(USAGE_KEY, JSON.stringify(counts));
      renderUsageBadges();
    } catch {
      // ignore storage errors in private mode
    }
  }

  function renderUsageBadges() {
    try {
      const counts = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}');
      document.querySelectorAll('[data-template-usage-slug]').forEach((el) => {
        const slug = el.getAttribute('data-template-usage-slug');
        const c = counts[slug] || 0;
        if (c > 0) {
          el.textContent = `Used ${c}× by you`;
          el.hidden = false;
        }
      });
    } catch {
      // ignore
    }
  }

  function updateSavedCountBadge() {
    const badge = document.getElementById('saved-count-badge');
    if (!badge) return;
    const count = getSavedPrompts().length;
    badge.textContent = String(count);
  }

  // Dynamic Slide Structure Builder for Any Slide Count (5 to 20)
  function buildSlideOutline(baseSlides, targetCount, topic) {
    const cleanBase = Array.isArray(baseSlides) && baseSlides.length > 0
      ? baseSlides.map((s) => s.replace(/^Slide\s+\d+:\s*/i, ''))
      : [
          'Title & Executive Hook',
          'Executive Summary — Core Takeaway in 60 Seconds',
          'Current Context & Problem Statement',
          'Key Data Insights & Market Evidence',
          'Proposed Strategy / Solution Architecture',
          'Deep Dive Pillar 1 — Core Execution',
          'Deep Dive Pillar 2 — Quantified Impact & Charts',
          'Risk Mitigation & Governance Trade-offs',
          'Implementation Roadmap & Milestones',
          'Summary Recommendations & Next Steps'
        ];

    const extraPool = [
      `Benchmark Comparison & Industry Context for ${topic || 'Topic'}`,
      'Detailed Methodology & Data Lineage Verification',
      'Customer / Stakeholder Impact Matrix by Segment',
      'Sensitivity Analysis: Base, Upside & Downside Scenarios',
      'Resource Allocation, Budget & Tooling Requirements',
      'Change Management & Cross-Functional Dependencies',
      'Common Objections & Executive FAQ Preparation',
      '90-Day Action Plan & Immediate Week-1 Owners',
      'Appendix: Supporting Metrics & Reference Citations',
      'Appendix: Deep-Dive Architecture & Technical Specs'
    ];

    const selected = [];
    if (targetCount <= cleanBase.length) {
      if (targetCount <= 2) {
        for (let i = 0; i < targetCount; i++) selected.push(cleanBase[i]);
      } else {
        // Keep first 2 (Title + Exec Summary) and last 1 (Next Steps), sample middle evenly
        selected.push(cleanBase[0]);
        selected.push(cleanBase[1]);
        const middleCount = targetCount - 3;
        const sourceMiddle = cleanBase.slice(2, cleanBase.length - 1);
        for (let i = 0; i < middleCount; i++) {
          const idx = Math.min(
            sourceMiddle.length - 1,
            Math.floor((i * sourceMiddle.length) / Math.max(1, middleCount))
          );
          selected.push(sourceMiddle[idx]);
        }
        selected.push(cleanBase[cleanBase.length - 1]);
      }
    } else {
      // Include all base slides except the final closing slide, insert from extraPool, then add closing slide
      const closing = cleanBase[cleanBase.length - 1];
      const body = cleanBase.slice(0, cleanBase.length - 1);
      selected.push(...body);
      let extraIdx = 0;
      while (selected.length < targetCount - 1) {
        selected.push(extraPool[extraIdx % extraPool.length]);
        extraIdx++;
      }
      selected.push(closing);
    }

    return selected.map((title, i) => `Slide ${i + 1}: ${title}`);
  }

  // Main Prompt Generator Initialization
  function initPromptGenerator() {
    const form = document.getElementById('slides-prompt-form');
    if (!form) return;

    const configEl = document.getElementById('page-template-config');
    let pageConfig = {
      slug: 'chatgpt-slides-prompt-generator',
      styles: [],
      slideStructure: []
    };
    if (configEl) {
      try {
        pageConfig = JSON.parse(configEl.textContent);
      } catch {
        // fallback
      }
    }

    const topicInput = document.getElementById('input-topic');
    const topicError = document.getElementById('topic-error');
    const audienceSelect = document.getElementById('select-audience');
    const goalSelect = document.getElementById('select-goal');
    const slidesRange = document.getElementById('range-slides');
    const slidesBadge = document.getElementById('slides-count-display');
    const styleSelect = document.getElementById('select-style');
    const languageSelect = document.getElementById('select-language');
    const chkExecSummary = document.getElementById('chk-exec-summary');
    const chkCharts = document.getElementById('chk-charts');
    const chkCitations = document.getElementById('chk-citations');
    const chkNotes = document.getElementById('chk-notes');
    const outputArea = document.getElementById('prompt-output');
    const storyboardContainer = document.getElementById('storyboard-cards');
    const styleIndicator = document.getElementById('active-style-pill');

    function getSelectedSource() {
      const checked = form.querySelector('input[name="source"]:checked');
      return checked ? checked.value : 'chat';
    }

    function getSourceInstruction(sourceId) {
      switch (sourceId) {
        case 'file':
          return 'Extract key facts, tables, and metrics directly from the attached/uploaded document(s). Do not invent figures not supported by the file.';
        case 'outline':
          return 'Expand the raw outline/notes I provide below into complete, polished slides while preserving every factual point.';
        case 'research':
          return 'Use ChatGPT web search / deep research to ground claims in recent, verifiable 2025–2026 industry benchmarks and cite primary sources.';
        case 'chat':
        default:
          return 'Synthesize the key insights and decisions from our current conversation context into a cohesive narrative.';
      }
    }

    function updateRangeProgressFallback() {
      if (!slidesRange) return;
      const min = Number(slidesRange.min || 5);
      const max = Number(slidesRange.max || 20);
      const val = Number(slidesRange.value || 10);
      const pct = ((val - min) / (max - min)) * 100;
      slidesRange.style.setProperty('--progress', `${pct.toFixed(1)}%`);
    }

    function composePrompt() {
      const rawTopic = (topicInput?.value || '').trim();
      const topic = rawTopic || '[TOPIC: e.g., Q4 Enterprise AI Rollout & ROI Strategy]';
      const audience = audienceSelect?.value || 'C-Suite & Executive Board';
      const goal = goalSelect?.value || 'Persuade & Win Approval';
      const slideCount = Number(slidesRange?.value || 10);
      const styleId = styleSelect?.value || 'executive';
      const language = languageSelect?.value || 'English';
      const sourceId = getSelectedSource();

      const styleObj =
        (pageConfig.styles || []).find((s) => s.id === styleId) || {
          id: 'executive',
          shortLabel: 'Executive',
          tone: 'Executive, concise, insight-led (McKinsey action-title style)',
          bulletRule: 'Use complete action titles at the top of each slide stating the core takeaway.'
        };

      if (slidesBadge) {
        const suffix = pageConfig.slidesSuffix || 'Slides';
        slidesBadge.textContent = pageConfig.uiLang === 'ja' ? `${slideCount}${suffix}` : `${slideCount} ${suffix}`;
      }
      if (styleIndicator) {
        const prefix = pageConfig.stylePrefix || 'Style';
        const sep = pageConfig.uiLang === 'zh-TW' || pageConfig.uiLang === 'ja' ? '：' : ': ';
        styleIndicator.textContent = `${prefix}${sep}${styleObj.shortLabel}`;
      }
      updateRangeProgressFallback();

      const outline = buildSlideOutline(pageConfig.slideStructure, slideCount, rawTopic);

      const requirements = [
        '- One clear message per slide (avoid cluttered text walls; keep slide canvas scannable)',
        `- ${styleObj.bulletRule}`
      ];

      if (chkExecSummary?.checked) {
        requirements.push('- Include an executive summary slide right after the title slide with the top 3 takeaways');
      }
      if (chkCharts?.checked) {
        requirements.push('- Suggest appropriate charts or visual diagrams on data-heavy slides (specify chart type, X/Y axes, and takeaway label)');
      }
      if (chkNotes?.checked) {
        requirements.push('- Add speaker notes for every slide (natural spoken delivery, transition cues, and anticipated Q&A points)');
      }
      if (chkCitations?.checked) {
        requirements.push('- Identify any claims requiring verification and flag placeholder metrics with [VERIFY] plus recommended source citations');
      }

      requirements.push(
        '- Format cleanly in ChatGPT Slides canvas so it exports seamlessly to PowerPoint (.pptx), PDF, and Google Slides'
      );
      requirements.push(`- Follow this ${slideCount}-slide structure:\n  ${outline.join('\n  ')}`);

      const promptText = `Create a ${slideCount}-slide presentation about ${topic}.

Audience: ${audience}
Goal: ${goal}
Tone: ${styleObj.tone}
Language: ${language}
Data Source Instruction: ${getSourceInstruction(sourceId)}

Requirements:
${requirements.join('\n')}`;

      if (outputArea) {
        outputArea.value = promptText;
      }

      if (storyboardContainer) {
        storyboardContainer.innerHTML = outline
          .map((line) => {
            const parts = line.split(':');
            const num = parts[0] || 'Slide';
            const rest = parts.slice(1).join(':').trim();
            return `<div class="mini-slide-card"><span class="mini-slide-num">${escapeHtml(num)}</span><span>${escapeHtml(rest)}</span></div>`;
          })
          .join('');
      }

      return promptText;
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // Validation Timing Matrix (modern-web-guidance: forms):
    // Validate on blur, clear existing errors on input
    if (topicInput) {
      topicInput.addEventListener('blur', () => {
        if (!topicInput.value.trim()) {
          topicInput.setCustomValidity('Please enter a presentation topic or pick a sample chip above.');
          if (topicError) {
            topicError.textContent = 'Tip: Enter a presentation topic (or click a sample chip) for a tailored prompt.';
          }
        } else {
          topicInput.setCustomValidity('');
          if (topicError) topicError.textContent = '';
        }
      });

      topicInput.addEventListener('input', () => {
        topicInput.setCustomValidity('');
        if (topicError) topicError.textContent = '';
        composePrompt();
      });

      // IME-safe Enter key check
      topicInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.isComposing) {
          e.preventDefault();
          composePrompt();
          showToast('Prompt updated for your topic');
        }
      });
    }

    // Attach instant 1:1 listeners to all form controls
    form.querySelectorAll('select, input[type="range"], input[type="checkbox"], input[type="radio"]').forEach((ctrl) => {
      ctrl.addEventListener('input', composePrompt);
      ctrl.addEventListener('change', composePrompt);
    });

    // Sample Topic Chips
    document.querySelectorAll('[data-sample-topic]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const sample = chip.getAttribute('data-sample-topic');
        if (topicInput && sample) {
          topicInput.value = sample;
          topicInput.setCustomValidity('');
          if (topicError) topicError.textContent = '';
          composePrompt();
          showToast('Loaded sample topic');
        }
      });
    });

    // Quick Slide Count Pills
    document.querySelectorAll('[data-quick-slides]').forEach((pill) => {
      pill.addEventListener('click', () => {
        const count = pill.getAttribute('data-quick-slides');
        if (slidesRange && count) {
          slidesRange.value = count;
          composePrompt();
        }
      });
    });

    // Prevent default form navigation and copy prompt on submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleCopyPrompt();
    });

    // Action 1: Copy Prompt
    async function handleCopyPrompt() {
      const text = outputArea ? outputArea.value : composePrompt();
      try {
        await navigator.clipboard.writeText(text);
        showToast('✓ Copied prompt to clipboard! Paste into ChatGPT Slides.');
      } catch {
        if (outputArea) {
          outputArea.select();
          document.execCommand('copy');
          showToast('✓ Copied prompt to clipboard!');
        }
      }
      trackTemplateUsage(pageConfig.slug, 'copy');
    }

    const btnCopy = document.getElementById('btn-copy-prompt');
    if (btnCopy) {
      btnCopy.addEventListener('click', handleCopyPrompt);
    }

    // Action 2: Download as TXT
    const btnDownload = document.getElementById('btn-download-txt');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        const text = outputArea ? outputArea.value : composePrompt();
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${pageConfig.slug || 'chatgpt-slides'}-prompt.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        trackTemplateUsage(pageConfig.slug, 'download');
        showToast('Downloaded prompt as .TXT');
      });
    }

    // Action 3: Open ChatGPT
    const btnOpenChatGPT = document.getElementById('btn-open-chatgpt');
    if (btnOpenChatGPT) {
      btnOpenChatGPT.addEventListener('click', async () => {
        const text = outputArea ? outputArea.value : composePrompt();
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          // ignore clipboard permission fallback
        }
        trackTemplateUsage(pageConfig.slug, 'open_chatgpt');
        showToast('Prompt copied! Opening ChatGPT...');
        const encoded = encodeURIComponent(text);
        window.open(`https://chatgpt.com/?q=${encoded}`, '_blank', 'noopener,noreferrer');
      });
    }

    // Action 4: Switch Style (换一种风格)
    const btnSwitchStyle = document.getElementById('btn-switch-style');
    if (btnSwitchStyle && styleSelect) {
      btnSwitchStyle.addEventListener('click', () => {
        const opts = Array.from(styleSelect.options);
        const nextIdx = (styleSelect.selectedIndex + 1) % opts.length;
        styleSelect.selectedIndex = nextIdx;
        composePrompt();
        const card = document.getElementById('output-surface-card');
        if (card && !prefersReducedMotion()) {
          card.style.transform = 'scale(0.985)';
          setTimeout(() => {
            card.style.transition = 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.transform = 'scale(1)';
          }, 20);
        }
        showToast(`Switched style to: ${opts[nextIdx].text}`);
      });
    }

    // Action 5: Save Locally (保存到本地)
    const btnSaveLocal = document.getElementById('btn-save-local');
    if (btnSaveLocal) {
      btnSaveLocal.addEventListener('click', () => {
        const text = outputArea ? outputArea.value : composePrompt();
        const item = {
          id: 'sp_' + Date.now(),
          slug: pageConfig.slug,
          topic: (topicInput?.value || 'Untitled Presentation').trim(),
          slides: Number(slidesRange?.value || 10),
          style: styleSelect?.value || 'executive',
          prompt: text,
          createdAt: new Date().toLocaleString()
        };
        savePromptItem(item);
        trackTemplateUsage(pageConfig.slug, 'save');
        showToast('Saved prompt to your browser library');
        openSavedDrawer();
      });
    }

    // Expose loader for saved prompts
    window.__loadSavedPromptIntoForm = function (item) {
      if (!item) return;
      if (topicInput && item.topic) topicInput.value = item.topic;
      if (slidesRange && item.slides) slidesRange.value = String(item.slides);
      if (styleSelect && item.style) styleSelect.value = item.style;
      composePrompt();
      if (outputArea && item.prompt) outputArea.value = item.prompt;
      closeSavedDrawer();
      showToast('Loaded saved prompt into editor');
    };

    composePrompt();
  }

  // Saved Prompts Drawer with 1:1 Pointer Tracking, Velocity Handoff & Momentum Projection
  let drawerOpen = false;
  function getDrawerWidth() {
    const drawer = document.getElementById('saved-prompts-drawer');
    return drawer ? drawer.getBoundingClientRect().width || 420 : 420;
  }

  function openSavedDrawer(initialVelocity = 0) {
    const drawer = document.getElementById('saved-prompts-drawer');
    const scrim = document.getElementById('saved-drawer-scrim');
    if (!drawer || !scrim) return;
    drawerOpen = true;
    scrim.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    renderSavedDrawerList();
    animateSpring(drawer, 0, {
      damping: initialVelocity !== 0 ? 0.82 : 1.0,
      response: 0.34,
      velocity: initialVelocity
    });
  }

  function closeSavedDrawer(initialVelocity = 0) {
    const drawer = document.getElementById('saved-prompts-drawer');
    const scrim = document.getElementById('saved-drawer-scrim');
    if (!drawer || !scrim) return;
    drawerOpen = false;
    scrim.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    const w = getDrawerWidth() + 24;
    animateSpring(drawer, w, {
      damping: 1.0,
      response: 0.32,
      velocity: initialVelocity
    });
  }

  function renderSavedDrawerList() {
    const container = document.getElementById('saved-prompts-list');
    const drawer = document.getElementById('saved-prompts-drawer');
    if (!container) return;
    const emptyMsg =
      drawer?.getAttribute('data-empty-msg') ||
      'No saved prompts yet. Click "Save Locally" on any generator to store your favorite prompt configurations right in your browser (no login required).';
    const loadLabel = drawer?.getAttribute('data-load-label') || 'Load into Editor';
    const deleteLabel = drawer?.getAttribute('data-delete-label') || 'Delete';

    const list = getSavedPrompts();
    if (list.length === 0) {
      container.innerHTML = `<p class="caption-text" style="padding: 1rem 0;">${emptyMsg}</p>`;
      return;
    }

    container.innerHTML = list
      .map(
        (item) => `
      <div class="info-card" style="margin-block-end: 0.75rem; padding: 0.9rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <strong style="font-size:0.88rem;">${item.topic.replace(/</g, '&lt;')}</strong>
          <span class="badge-tag">${item.slides} slides</span>
        </div>
        <div class="caption-text" style="margin-block: 0.25rem 0.6rem;">${item.createdAt} · ${item.style}</div>
        <div style="display:flex; gap:0.4rem;">
          <button type="button" class="chip" data-load-id="${item.id}">${loadLabel}</button>
          <button type="button" class="chip" data-delete-id="${item.id}">${deleteLabel}</button>
        </div>
      </div>
    `
      )
      .join('');

    container.querySelectorAll('[data-load-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-load-id');
        const found = getSavedPrompts().find((x) => x.id === id);
        if (found && window.__loadSavedPromptIntoForm) {
          window.__loadSavedPromptIntoForm(found);
        }
      });
    });

    container.querySelectorAll('[data-delete-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-id');
        if (id) deleteSavedPrompt(id);
      });
    });
  }

  function initDrawerGestures() {
    const drawer = document.getElementById('saved-prompts-drawer');
    const scrim = document.getElementById('saved-drawer-scrim');
    const btnOpen = document.getElementById('btn-open-saved-drawer');
    const btnClose = document.getElementById('btn-close-saved-drawer');
    if (!drawer) return;

    // Initialize offscreen position
    drawer.style.transform = `translate3d(460px, 0, 0)`;
    activeSprings.set(drawer, { currentX: 460, velocity: 0, rafId: null });

    if (btnOpen) btnOpen.addEventListener('click', () => openSavedDrawer(0));
    if (btnClose) btnClose.addEventListener('click', () => closeSavedDrawer(0));
    if (scrim) scrim.addEventListener('click', () => closeSavedDrawer(0));

    // 1:1 Pointer Drag with grab offset, velocity history, and Apple momentum projection
    let dragging = false;
    let startPointerX = 0;
    let startDrawerX = 0;
    let history = [];

    drawer.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a, input, textarea')) return;
      dragging = true;
      drawer.setPointerCapture(e.pointerId);
      const currentState = activeSprings.get(drawer);
      if (currentState && currentState.rafId) {
        cancelAnimationFrame(currentState.rafId);
        currentState.rafId = null;
      }
      startPointerX = e.clientX;
      startDrawerX = currentState ? currentState.currentX : 0;
      history = [{ x: e.clientX, t: performance.now() }];
    });

    drawer.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startPointerX;
      const rawX = startDrawerX + dx;
      const width = getDrawerWidth();
      // Rubber-band if pulled left past 0
      const nextX = rawX < 0 ? -rubberband(Math.abs(rawX), width, 0.55) : rawX;
      drawer.style.transform = `translate3d(${nextX.toFixed(2)}px, 0, 0)`;
      activeSprings.set(drawer, { currentX: nextX, velocity: 0, rafId: null });

      const now = performance.now();
      history.push({ x: e.clientX, t: now });
      if (history.length > 6) history.shift();
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      try {
        drawer.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      let velocity = 0; // px/s
      if (history.length >= 2) {
        const first = history[0];
        const last = history[history.length - 1];
        const dt = (last.t - first.t) / 1000;
        if (dt > 0.004) {
          velocity = (last.x - first.x) / dt;
        }
      }

      const currentX = activeSprings.get(drawer)?.currentX || 0;
      const projectedX = currentX + project(velocity, 0.998);
      const width = getDrawerWidth();

      if (projectedX > width * 0.35 || velocity > 420) {
        closeSavedDrawer(velocity);
      } else {
        openSavedDrawer(velocity);
      }
    }

    drawer.addEventListener('pointerup', endDrag);
    drawer.addEventListener('pointercancel', endDrag);
  }

  // Category Filter on /chatgpt-slides-templates and Hub sections
  function initCategoryFilter() {
    const filterBtns = document.querySelectorAll('[data-category-filter]');
    const cards = document.querySelectorAll('[data-template-category]');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category-filter');
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-template-category');
          const match = cat === 'All' || cardCat === cat;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateSavedCountBadge();
    initPromptGenerator();
    initDrawerGestures();
    initCategoryFilter();
    renderUsageBadges();
  });
})();
