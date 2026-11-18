const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

async function loadDetails(language) {
  const { loadCatalog } = await import('../scripts/prerender.mjs');
  const window = await loadCatalog();
  const L = (zh, en) => language === 'en' ? en : zh;
  window.ATLAS_UI = {
    language, L, escape,
    formattedDate: date => date.replaceAll('-', '.'),
    companyName: company => L(company.name, company.nameEn || company.name),
    releaseText: release => window.ATLAS_CATALOG.text({ release }, language),
  };
  const context = vm.createContext({ window, URL });
  for (const file of ['data-specs.js', 'data-prices.js', 'data-scores.js', 'details.js']) {
    vm.runInContext(readFileSync(path.join(__dirname, '..', 'src', file), 'utf8'), context, { filename: file });
  }
  return window;
}

test('grouping represents every original release exactly once and keeps its date', async () => {
  const original = {};
  const context = vm.createContext({ window: original, URL });
  for (const file of ['data.js', 'data-agents.js', 'data-hardware.js', 'data-technology.js']) {
    vm.runInContext(readFileSync(path.join(__dirname, '..', 'src', file), 'utf8'), context, { filename: file });
  }
  const { loadCatalog } = await import('../scripts/prerender.mjs');
  const { ATLAS_CATALOG: catalog } = await loadCatalog();
  const sections = { models: 'MODEL_ATLAS', agents: 'AGENT_ATLAS', hardware: 'HARDWARE_ATLAS', technology: 'TECHNOLOGY_ATLAS' };
  for (const [section, name] of Object.entries(sections)) {
    const originals = new Map(original[name].releases.map(record => [record.id, record.date]));
    const published = catalog.sections[section].data.releases.flatMap(parent => [parent, ...(parent.history || [])]);
    assert.equal(published.length, originals.size, section);
    for (const record of published) {
      assert.equal(record.date, originals.get(record.id), record.id);
      originals.delete(record.id);
    }
    assert.equal(originals.size, 0, section);
  }
});

function expand(window, section, id) {
  const content = { innerHTML: '' };
  const disclosure = {
    open: false,
    dataset: { historyId: id },
    closest: selector => selector === '[data-history-section]' && { dataset: { historySection: section } },
    querySelector: selector => selector === '.history-content' && content,
  };
  window.ATLAS_DETAILS.expandHistory(disclosure);
  assert.equal(disclosure.open, true);
  return content.innerHTML;
}

for (const language of ['zh', 'en']) {
  test(`every ${language} release history preserves individual identities, evidence and scoped facts`, async () => {
    const window = await loadDetails(language);
    const { ATLAS_CATALOG: catalog, ATLAS_UI: ui } = window;
    const parents = catalog.entries.filter(entry => entry.release.history?.length);
    assert.ok(parents.length > 0);
    for (const parent of parents) {
      const { section, raw, release } = parent;
      const html = window.ATLAS_DETAILS.render(section, raw, release.id, language);
      const parts = [html];
      assert.ok(html.includes(`<h2 id="dialog-title">${escape(ui.releaseText(release).name)}</h2>`), parent.key);
      assert.ok(html.includes(`id="history-title" tabindex="-1">${ui.L('相关发布', 'Release history')}`), parent.key);
      assert.equal((html.match(/<details\b/g) || []).length, release.history.length, parent.key);
      for (const child of release.history) {
        const { id } = child;
        const key = `${section}:${id}`;
        const summary = new RegExp(`id="history-${id}"[^>]*>\\s*<summary>([\\s\\S]*?)</summary>`).exec(html)?.[1];
        assert.ok(summary?.includes(escape(ui.releaseText(child).name)), key);
        assert.ok(summary.includes(ui.formattedDate(child.date)), key);
        const body = expand(window, section, id);
        parts.push(body);
        assert.ok(body.includes(escape(ui.companyName(catalog.get(key).company))), key);
        for (const field of ['summary', 'details', 'dateNote']) {
          const value = ui.releaseText(child)[field];
          if (value) assert.ok(body.includes(escape(value)), `${key} ${field}`);
        }
        for (const source of child.sources) assert.ok(body.includes(`href="${escape(source.url)}"`), key);
        assert.ok(body.includes(`data-copy="${id}"`), key);
        const correction = /class="detail-correction"><a href="([^"]+)"/.exec(body)[1];
        const issueBody = new URL(correction.replaceAll('&amp;', '&')).searchParams.get('body');
        assert.ok(issueBody.includes(key) && issueBody.includes(`#release-${id}`), key);

        const model = section === 'models';
        const specs = model ? window.MODEL_ATLAS_SPECS.entries[id] : child.hardware;
        const prices = model && window.MODEL_ATLAS_PRICES.entries[id];
        const scores = model && window.MODEL_ATLAS_SCORES.entries[id];
        for (const [name, data] of Object.entries({ specs, pricing: prices, scores })) {
          assert.equal(body.includes(`id="history-${id}-${name}-title"`), Boolean(data), `${key} ${name}`);
        }
        for (const variant of [...(specs?.variants || []), ...(prices?.variants || [])]) {
          assert.ok(body.includes(escape(variant.name)), key);
          for (const url of variant.sources) assert.ok(body.includes(`href="${escape(url)}"`), key);
        }
        for (const variant of specs?.variants || []) {
          for (const field of ['contextTokens', 'extendedContextTokens', 'outputTokens', 'parameters', 'activeParameters']) {
            const value = variant[field];
            if (value) assert.ok(body.includes(escape(typeof value === 'number' ? value.toLocaleString('en-US') : value)), `${key} ${field}`);
          }
        }
        for (const variant of prices?.variants || []) {
          const symbol = { USD: '$', CNY: '¥' }[variant.currency] || `${variant.currency} `;
          for (const tier of variant.tiers) {
            for (const rate of [tier.input, tier.output]) {
              assert.ok(body.includes(`<dd>${symbol}${rate.toLocaleString('en-US', { maximumFractionDigits: 6 })}</dd>`), key);
            }
          }
        }
        for (const fact of child.hardware?.facts || []) {
          assert.ok(body.includes(`<dt>${escape(ui.L(fact.label, fact.labelEn))}</dt><dd>${escape(ui.L(fact.value, fact.valueEn || fact.value))}</dd>`), key);
        }
        for (const score of Object.values(scores || {})) {
          assert.ok(body.includes(`<p class="benchmark-model">${escape(score.model)}</p></div><strong>${score.score}`), key);
          assert.ok(body.includes(`href="${escape(score.source)}"`), key);
        }
        for (const license of child.openness?.licenses || []) {
          assert.ok(body.includes(escape(license.name)) && body.includes(`href="${escape(license.source)}"`), key);
        }
      }
      const expanded = parts.join('');
      const ids = Array.from(expanded.matchAll(/\sid="([^"]+)"/g), match => match[1]);
      assert.equal(new Set(ids).size, ids.length, `${parent.key} unique IDs`);
      for (const [, target] of expanded.matchAll(/\saria-labelledby="([^"]+)"/g)) {
        assert.ok(ids.includes(target), `${parent.key} heading ${target}`);
      }
    }
  });
}
