/* Shared event identities for cross-timeline browsing. */
(() => {
  'use strict';
  const definitions = [
    ['models', '大模型', 'LLM', 'index.html', window.MODEL_ATLAS],
    ['agents', '智能体', 'Agent', 'agents.html', window.AGENT_ATLAS],
    ['hardware', '算力', 'Hardware', 'hardware.html', window.HARDWARE_ATLAS],
    ['technology', '技术', 'Technology', 'technology.html', window.TECHNOLOGY_ATLAS],
  ];
  const sections = Object.fromEntries(definitions.map(([id, zh, en, file, data]) => [id, { id, zh, en, file, data }]));
  const entries = definitions.flatMap(([section, , , , raw]) => (raw?.releases || []).map(release => ({ key: `${section}:${release.id}`, section, sections: [section], release, raw, company: raw.companies.find(company => company.id === release.company) })));
  const byKey = new Map(entries.map(entry => [entry.key, entry]));
  // Transformer is explicitly shared by the source datasets; do not infer other relationships.
  const events = entries.filter(entry => entry.key !== 'models:transformer').map(entry => entry.key === 'technology:transformer' && byKey.has('models:transformer') ? { ...entry, sections: ['models', 'technology'] } : entry);
  const language = value => value === 'en' ? 'en' : 'zh';
  const text = (entry, lang) => lang === 'en' ? { ...entry.release, ...(entry.release.en || window.MODEL_ATLAS_EN?.[entry.release.id]) } : entry.release;
  const searchIndexes = new Map();
  function search(query, lang = 'zh') {
    const { normalize } = window.ATLAS_FILTERS;
    const terms = String(query || '').trim().split(/\s+/).filter(Boolean).map(normalize).filter(Boolean);
    if (!terms.length) return [];
    const locale = language(lang);
    if (!searchIndexes.has(locale)) {
      searchIndexes.set(locale, [...events].sort((a, b) => b.release.date.localeCompare(a.release.date)).map(entry => {
        const translated = text(entry, locale), en = text(entry, 'en');
        const fields = [entry.release.name, translated.name, en.name, entry.release.summary, translated.summary, en.summary, entry.release.details, en.details, entry.company.name, entry.company.nameEn, entry.company.aliases, entry.release.date, ...entry.release.tags];
        return { entry, haystack: normalize(fields.join(' ')) };
      }));
    }
    return searchIndexes.get(locale).filter(({ haystack }) => terms.every(term => haystack.includes(term))).map(({ entry }) => entry);
  }
  window.ATLAS_CATALOG = Object.freeze({
    entries, events, sections,
    get: key => byKey.get(key),
    text, search,
    timelineUrl: (entry, lang) => `${language(lang) === 'en' ? 'en/' : ''}${sections[entry.section].file}?lang=${language(lang)}#release-${entry.release.id}`,
  });
})();
