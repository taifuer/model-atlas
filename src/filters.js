/* Shared filtering rules. No DOM dependencies, so chart and list counts agree. */
(() => {
  'use strict';
  const normalize = value => String(value).normalize('NFKC').toLowerCase().replace(/[\s\-‐‑–—_.·/]+/g, '');
  function create(raw, searchIndex) {
    const releases = raw.releases;
    const firstYear = Math.min(...releases.map(release => Number(release.date.slice(0, 4))));
    const lastYear = Number(raw.asOf.slice(0, 4));
    const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => String(lastYear - index));
    const companyIds = new Set(raw.companies.map(company => company.id));
    const accessTypes = new Set(['all', 'open', 'closed']);
    function read(search, savedView = 'detail') {
      const params = new URLSearchParams(search);
      const companies = new Set(params.getAll('companies').flatMap(value => value.split(',')).map(id => id.trim()).filter(id => companyIds.has(id)));
      const year = years.includes(params.get('year')) ? params.get('year') : 'all';
      const requestedMonth = params.get('month') || '';
      const month = year !== 'all' && /^(0[1-9]|1[0-2])$/.test(requestedMonth) && `${year}-${requestedMonth}` <= raw.asOf.slice(0, 7) ? requestedMonth : 'all';
      return {
        companies,
        multiSelect: params.get('multi') === '1' || companies.size > 1,
        year, month,
        category: Object.hasOwn(raw.categories || {}, params.get('category')) ? params.get('category') : 'all',
        openness: raw.accessFilter !== false && accessTypes.has(params.get('openness')) ? params.get('openness') : 'all',
        query: (params.get('q') || '').slice(0, 300),
        milestones: params.get('milestones') === '1',
        sort: params.get('sort') === 'asc' ? 'asc' : 'desc',
        view: ['detail', 'compact'].includes(params.get('view')) ? params.get('view') : savedView === 'compact' ? 'compact' : 'detail',
      };
    }
    function chooseCompany(state, id) {
      const companies = new Set(state.companies);
      if (id === 'all') companies.clear();
      else if (companyIds.has(id)) {
        if (!state.multiSelect) {
          companies.clear();
          companies.add(id);
        } else if (companies.has(id)) companies.delete(id);
        else companies.add(id);
      }
      return { ...state, companies };
    }
    function setMultiSelect(state, enabled) {
      const multiSelect = Boolean(enabled);
      const companies = new Set(state.companies);
      if (!multiSelect && companies.size > 1) {
        const lastSelected = [...companies].at(-1);
        companies.clear();
        companies.add(lastSelected);
      }
      return { ...state, companies, multiSelect };
    }
    function matches(release, state, omitted = []) {
      const ignore = key => omitted.includes(key);
      const terms = state.query.trim().split(/\s+/).filter(Boolean).map(normalize);
      const openness = release.openness?.status;
      return (ignore('companies') || !state.companies.size || state.companies.has(release.company)) &&
        (ignore('year') || state.year === 'all' || release.date.startsWith(state.year)) &&
        (ignore('month') || state.month === 'all' || release.date.slice(5, 7) === state.month) &&
        (ignore('category') || state.category === 'all' || release.category === state.category) &&
        (ignore('openness') || state.openness === 'all' || state.openness === openness) &&
        (ignore('milestones') || !state.milestones || release.milestone) &&
        (ignore('query') || terms.every(term => (searchIndex.get(release.id) || '').includes(term)));
    }
    function select(state, omitted = []) {
      return releases.filter(release => matches(release, state, omitted));
    }
    function annualCounts(state) {
      const counts = Object.fromEntries([...years].reverse().map(year => [year, 0]));
      select(state, ['year', 'month']).forEach(release => counts[release.date.slice(0, 4)]++);
      return Object.entries(counts).map(([year, count]) => ({ year, count }));
    }
    function monthlyCounts(state) {
      const counts = Array(12).fill(0);
      select(state, ['month']).forEach(release => {
        if (release.date.length >= 7) counts[Number(release.date.slice(5, 7)) - 1]++;
      });
      return counts.map((count, index) => {
        const month = String(index + 1).padStart(2, '0');
        return { month, count, future: `${state.year}-${month}` > raw.asOf.slice(0, 7) };
      });
    }
    function companyCounts(state) {
      const counts = Object.fromEntries([...companyIds].map(id => [id, 0]));
      select(state, ['companies']).forEach(release => counts[release.company]++);
      return counts;
    }
    function serialize(state, language) {
      const params = new URLSearchParams({ lang: language });
      if (state.companies.size) params.set('companies', [...state.companies].join(','));
      if (state.multiSelect) params.set('multi', '1');
      if (state.year !== 'all') params.set('year', state.year);
      if (state.year !== 'all' && state.month !== 'all') params.set('month', state.month);
      if (state.category !== 'all') params.set('category', state.category);
      if (state.openness !== 'all') params.set('openness', state.openness);
      if (state.query) params.set('q', state.query);
      if (state.milestones) params.set('milestones', '1');
      if (state.sort === 'asc') params.set('sort', 'asc');
      params.set('view', state.view);
      return params.toString();
    }
    function hasFilters(state) {
      return Boolean(state.companies.size || state.year !== 'all' || state.category !== 'all' || state.openness !== 'all' || state.query || state.milestones);
    }
    return { years, read, chooseCompany, setMultiSelect, select, matches, annualCounts, monthlyCounts, companyCounts, serialize, hasFilters };
  }
  const api = { create, normalize };
  if (typeof window !== 'undefined') window.ATLAS_FILTERS = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
