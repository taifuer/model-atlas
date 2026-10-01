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
  window.ATLAS_CATALOG = Object.freeze({
    entries, events, sections,
    get: key => byKey.get(key),
    text: (entry, lang) => lang === 'en' ? { ...entry.release, ...(entry.release.en || window.MODEL_ATLAS_EN?.[entry.release.id]) } : entry.release,
    timelineUrl: (entry, lang) => `${language(lang) === 'en' ? 'en/' : ''}${sections[entry.section].file}?lang=${language(lang)}#release-${entry.release.id}`,
  });
})();
