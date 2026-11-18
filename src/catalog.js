/* Shared event identities for cross-timeline browsing. */
(() => {
  'use strict';
  const definitions = [
    ['models', '大模型', 'Models', 'index.html', window.MODEL_ATLAS],
    ['agents', '智能体', 'Agent', 'agents.html', window.AGENT_ATLAS],
    ['hardware', '算力', 'Hardware', 'hardware.html', window.HARDWARE_ATLAS],
    ['technology', '技术', 'Technology', 'technology.html', window.TECHNOLOGY_ATLAS],
  ];
  const sections = Object.fromEntries(definitions.map(([id, zh, en, file, data]) => [id, { id, zh, en, file, data }]));
  const entries = [];
  const byKey = new Map();
  for (const [section, , , , raw] of definitions) {
    if (!raw) continue;
    const companies = new Map((raw.allCompanies || raw.companies).map(company => [company.id, company]));
    function register(release, parentKey) {
      const key = `${section}:${release.id}`;
      const record = { key, parentKey: parentKey || key, section, sections: [section], release, raw, company: companies.get(release.company) };
      byKey.set(key, record);
      return record;
    }
    for (const release of raw.releases) {
      const primary = register(release);
      entries.push(primary);
      for (const child of release.history || []) register(child, primary.key);
    }
  }
  const get = key => byKey.get(key === 'models:transformer' ? 'technology:transformer' : key);
  const language = value => value === 'en' ? 'en' : 'zh';
  const text = (entry, lang) => lang === 'en' ? { ...entry.release, ...(entry.release.en || window.MODEL_ATLAS_EN?.[entry.release.id]) } : entry.release;
  function title(entry, lang) {
    const family = entry.key === entry.parentKey && (lang === 'en' ? entry.release.familyNameEn : entry.release.familyName);
    return family || text(entry, lang).name;
  }
  const normalize = value => window.ATLAS_FILTERS.normalize(value);
  // Legacy company.aliases mixes organization names with all of their products.
  // Keep organization synonyms here; a product name only indexes its own entries.
  const organizationAliases = {
    google: ['DeepMind', '谷歌'], meta: ['Facebook'], deepseek: ['深度求索', '深求'],
    qwen: ['Alibaba', '阿里云'], mistral: ['Mistral AI'], xai: ['SpaceXAI'],
    moonshot: ['Moonshot AI'], zhipu: ['Zhipu', '智谱华章'], minimax: ['稀宇科技'],
    xiaomi: ['Xiaomi'], stepfun: ['StepFun'], microsoft: ['微软'],
    amazon: ['Amazon', 'AWS', '亚马逊'], nvidia: ['英伟达'], tencent: ['Tencent', '腾讯云'],
    stanford: ['Stanford', 'CRFM', '斯坦福'], bytedance: ['ByteDance'],
    inclusionai: ['Ant Group', 'AntLing', '蚂蚁集团'], allenai: ['Allen Institute for AI', 'AllenAI'],
    bigcode: ['Hugging Face', 'ServiceNow'], bigscience: ['Hugging Face'],
    amd: ['超威'], intel: ['英特尔', 'Habana'], apple: ['苹果'],
    github: ['Microsoft', '微软'], windsurf: ['Codeium', 'Cognition'],
    openhands: ['All Hands'], swe: ['Princeton', '普林斯顿'],
    pi: ['badlogic', 'Mario Zechner'], openclaw: ['Peter Steinberger'],
    aider: ['Paul Gauthier'], cline: ['Saoud Rizwan'], opencode: ['SST'],
    manus: ['Butterfly Effect', 'Monica', '蝴蝶效应'], crewai: ['Joao Moura'],
    warp: ['Zach Lloyd'], autogpt: ['Toran Bruce Richards'],
    roo: ['Roo Veterinary', 'Matt Rubens'], kilo: ['Anaconda'], amp: ['Sourcegraph'],
    ggml: ['Georgi Gerganov'], flashattention: ['Dao-AILab', 'Tri Dao'],
    toronto: ['University of Toronto'], montreal: ['University of Montreal', 'University of Montréal'],
    washington: ['University of Washington'], amsterdam: ['University of Amsterdam'],
    edinburgh: ['University of Edinburgh'], freiburg: ['University of Freiburg'],
    compvis: ['LMU', 'Heidelberg'], ista: ['Institute of Science and Technology Austria'],
    mit: ['Massachusetts Institute of Technology'], kata: ['OpenInfra'],
    'cloud-hypervisor': ['Linux Foundation'],
  };
  const familyAliases = [
    ['qwen', '通义千问', '千问', '通义'], ['claude', '克劳德'], ['hunyuan', '混元'],
    ['ascend', '昇腾'], ['hermes', '赫尔墨斯'], ['doubao', '豆包'],
    ['wan', '万相', '通义万相'], ['hunyuanvideo', '混元', '混元视频'],
    ['kling', '可灵'], ['hailuo', '海螺'],
  ];
  const organizationNames = new Map();
  for (const [, , , , raw] of definitions) for (const company of raw?.allCompanies || raw?.companies || []) {
    const names = organizationNames.get(company.id) || new Set(organizationAliases[company.id] || []);
    for (const name of [company.name, company.nameEn]) if (name) names.add(name);
    organizationNames.set(company.id, names);
  }
  const normalizedFields = values => [...new Set(values.filter(Boolean).map(normalize))];
  let searchRecords;
  function records() {
    if (searchRecords) return searchRecords;
    searchRecords = Array.from(byKey.values(), entry => {
      const { release, raw, section } = entry, en = text(entry, 'en');
      const titles = normalizedFields([release.name, en.name, release.familyName, release.familyNameEn]);
      const variants = section === 'models' ? [
        ...(window.MODEL_ATLAS_SPECS?.entries[release.id]?.variants || []),
        ...(window.MODEL_ATLAS_PRICES?.entries[release.id]?.variants || []),
      ].map(variant => variant.name) : [release.hardware?.variant, release.hardware?.variantEn];
      const aliases = [release.id, ...(release.searchAliases || []), ...variants];
      for (const [family, ...synonyms] of familyAliases) {
        const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])${family}(?=$|[^\\p{L}]|[0-9])`, 'iu');
        if ([release.name, en.name, release.id].some(name => pattern.test(name || ''))) aliases.push(...synonyms);
      }
      const names = normalizedFields(aliases);
      const organization = normalizedFields([...(organizationNames.get(release.company) || [])]);
      const body = normalizedFields([
        release.summary, en.summary, release.details, en.details, release.date,
        raw.categories?.[release.category], raw.categoriesEn?.[release.category],
        ...(release.tasks || []).flatMap(task => [raw.tasks?.[task], raw.tasksEn?.[task]]),
        ...(release.tags || []), ...(release.tags || []).map(tag => raw.tagsEn?.[tag] || window.ATLAS_TAGS_EN?.[tag]),
      ]);
      return { entry, titles, names, identity: [...titles, ...names].join('\0'), organization: organization.join('\0'), haystack: [...titles, ...names, ...organization, ...body].join('\0') };
    });
    return searchRecords;
  }
  function search(query) {
    const exactKey = get(String(query || '').trim().toLowerCase());
    if (exactKey) return [exactKey];
    const terms = String(query || '').trim().split(/\s+/).map(normalize).filter(Boolean);
    if (!terms.length) return [];
    const phrase = normalize(query);
    const all = field => terms.every(term => field.includes(term));
    function relevance(record) {
      if (record.titles.includes(phrase)) return 6;
      if (record.names.includes(phrase)) return 5;
      if (all(record.titles.join('\0'))) return 4;
      if (all(record.identity)) return 3;
      if (all(record.identity + '\0' + record.organization)) return 2;
      return 1;
    }
    return records()
      .filter(record => all(record.haystack))
      .sort((a, b) => relevance(b) - relevance(a) || b.entry.release.date.localeCompare(a.entry.release.date) || a.entry.key.localeCompare(b.entry.key))
      .map(({ entry }) => entry);
  }
  function searchIndex(section) {
    return new Map(records().filter(({ entry }) => entry.section === section).map(({ entry, haystack }) => [entry.release.id, haystack]));
  }
  window.ATLAS_CATALOG = Object.freeze({
    entries, events: entries, sections, get,
    text, title, search, searchIndex,
    timelineUrl: (entry, lang) => `${language(lang) === 'en' ? 'en/' : ''}${sections[entry.section].file}?lang=${language(lang)}#release-${entry.release.id}`,
  });
})();
