import assert from 'node:assert/strict';
import worker from '../src/worker.js';
import fs from 'node:fs';
import { resolveCanonicalPath } from '../src/slide-structure-data.js';
import { SCENARIO_SLUGS } from '../src/round1-data.mjs';
const writes = [];
const env = { ASSETS: { fetch: () => new Response('asset') }, USAGE: { prepare: sql => ({ bind: (...args) => ({ run: async () => { writes.push({ sql, args }); } }) }) } };
const origin = 'https://example.com';
const data = { event: 'copy', template: 'pitch-deck', lang: 'en' };
const request = (body = data, headers = {}, method = 'POST') => new Request(origin + '/api/events', { method, headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, ...(method === 'POST' ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}) });
assert.equal((await worker.fetch(request(), env)).status, 204);
assert.deepEqual(writes[0].args.slice(1), ['copy','pitch-deck','en']);
assert.match(writes[0].args[0], /^\d{4}-\d{2}-\d{2}$/);
assert.ok(writes[0].sql.includes('ON CONFLICT'));
for (const body of [{...data, notes:'secret'}, {...data, event:'secret text'}, {...data, template:'unknown'}, {...data, lang:'unknown'}, null, [], '{']) assert.equal((await worker.fetch(request(body),env)).status,400);
assert.equal((await worker.fetch(request(data,{Origin:'https://elsewhere.com'}),env)).status,403);
assert.equal((await worker.fetch(request('x'.repeat(513)),env)).status,413);
assert.equal((await worker.fetch(request(data,{},'GET'),env)).status,405);
assert.equal((await worker.fetch(request(data,{'Content-Type':'text/plain'}),env)).status,415);
assert.equal((await worker.fetch(request(data),{ASSETS:env.ASSETS})).status,503);
const before = writes.length;
assert.equal((await worker.fetch(request(data,{'DNT':'1'}),env)).status,204);
assert.equal((await worker.fetch(request(data,{'Sec-GPC':'1'}),env)).status,204);
assert.equal(writes.length,before);
assert.equal(await (await worker.fetch(new Request(origin+'/missing'),env)).text(),'asset');

// Verify server-side HTTP 301 redirect for /chatgpt-slides-prompt-generator
const resRedir1 = await worker.fetch(new Request(origin + '/chatgpt-slides-prompt-generator'), env);
assert.equal(resRedir1.status, 301);
assert.equal(resRedir1.headers.get('Location'), '/');

const resRedir2 = await worker.fetch(new Request(origin + '/chatgpt-slides-prompt-generator/'), env);
assert.equal(resRedir2.status, 301);
assert.equal(resRedir2.headers.get('Location'), '/');

const resRedir3 = await worker.fetch(new Request(origin + '/chatgpt-slides-prompt-generator?utm_source=twitter&campaign=launch'), env);
assert.equal(resRedir3.status, 301);
assert.equal(resRedir3.headers.get('Location'), '/?utm_source=twitter&campaign=launch');

const resRedir4 = await worker.fetch(new Request(origin + '/chatgpt-slides-prompt-generator/?utm_source=twitter&campaign=launch'), env);
assert.equal(resRedir4.status, 301);
assert.equal(resRedir4.headers.get('Location'), '/?utm_source=twitter&campaign=launch');
for (const lang of ['en','es','ja','zh-TW']) for (const slug of SCENARIO_SLUGS) {
 const prefix=lang==='en'?'':lang+'/'; const html=fs.readFileSync(`dist/${prefix}prompts/${slug}/index.html`,'utf8');
 assert.ok(html.includes('data-load-worked-example'));
 assert.ok(html.includes('input-notes'));
 assert.ok(html.includes('id="worked-example"'));
 assert.ok(!html.includes('undefined'));
}
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,208);
console.log('Round 1: API content/privacy validation, opt-out signals, 12 localized examples and unchanged 208 canonical routes passed.');

for(const lang of ['es','ja','zh-TW']) assert.equal(resolveCanonicalPath('home',lang),'/'+lang);
