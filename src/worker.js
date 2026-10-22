import { KNOWN_HUB_SLUGS, TEMPLATE_SLUGS } from './slide-structure-data.js';
const events = new Set(['generate', 'copy', 'download', 'save', 'open_chatgpt', 'template_select', 'example_load']);
const templates = new Set([...Object.keys(KNOWN_HUB_SLUGS), ...TEMPLATE_SLUGS]);
const langs = new Set(['en', 'es', 'ja', 'zh-TW']);
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
const reply = status => new Response(null, { status, headers });
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/events') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return new Response(null, { status: 405, headers: { ...headers, Allow: 'POST' } });
    if (request.headers.get('Origin') !== url.origin) return reply(403);
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply(415);
    if (request.headers.get('DNT') === '1' || request.headers.get('Sec-GPC') === '1') return reply(204);
    // Bound reads even if Content-Length is absent or untrusted.
    const reader = request.body?.getReader();
    if (!reader) return reply(400);
    let size = 0, chunks = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 512) { await reader.cancel(); return reply(413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    let data;
    try { data = JSON.parse(new TextDecoder().decode(bytes)); } catch { return reply(400); }
    if (!data || Array.isArray(data) || Object.keys(data).length !== 3 ||
      !events.has(data.event) || !templates.has(data.template) || !langs.has(data.lang)) return reply(400);
    if (!env.USAGE) return reply(503);
    try {
      await env.USAGE.prepare('INSERT INTO usage_counts (day, event, template, lang, count) VALUES (?1, ?2, ?3, ?4, 1) ON CONFLICT(day, event, template, lang) DO UPDATE SET count = count + 1').bind(new Date().toISOString().slice(0, 10), data.event, data.template, data.lang).run();
    } catch { return reply(503); }
    return reply(204);
  }
};
