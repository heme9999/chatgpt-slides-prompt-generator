// Explicit opt-in; no identity, content, URL, referrer or automatic page-view events.
const KEY = 'slideprompt_usage_consent_v1';
const EVENTS = new Set(['generate', 'copy', 'download', 'save', 'open_chatgpt', 'template_select', 'example_load']);
const privacySignal = () => navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
let last = new Map();
export function recordUsage(event, template) {
  try {
    if (privacySignal() || localStorage.getItem(KEY) !== 'yes' || !EVENTS.has(event)) return;
    const lang = document.documentElement.lang;
    const key = `${event}:${template}`;
    if (Date.now() - (last.get(key) || 0) < 3000) return;
    last.set(key, Date.now());
    void fetch('/api/events', {
      method: 'POST', credentials: 'omit', mode: 'same-origin', referrerPolicy: 'no-referrer', keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, template, lang })
    }).catch(() => {});
  } catch { /* Storage or network failure must never block the tool. */ }
}
export function initUsageChoice() {
  const checkbox = document.getElementById('usage-consent');
  if (!checkbox) return;
  try { checkbox.checked = !privacySignal() && localStorage.getItem(KEY) === 'yes'; } catch { checkbox.checked = false; }
  checkbox.disabled = privacySignal();
  checkbox.addEventListener('change', () => {
    try { localStorage.setItem(KEY, checkbox.checked ? 'yes' : 'no'); } catch { checkbox.checked = false; }
    last.clear();
  });
}
