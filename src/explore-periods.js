/* Group the complete catalog newest first while preserving each date's precision. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.ATLAS_PERIODS = api;
})(typeof window === 'object' ? window : null, function () {
  'use strict';

  const sections = ['models', 'agents', 'hardware', 'technology'];
  const counts = () => Object.fromEntries(sections.map(section => [section, 0]));
  const compare = (left, right) => left < right ? -1 : left > right ? 1 : 0;

  function readDate(entry) {
    const date = entry?.release?.date;
    if (typeof date !== 'string' || !/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(date)) {
      throw new TypeError(`Invalid release date for ${entry?.key || 'entry'}: expected YYYY, YYYY-MM or YYYY-MM-DD`);
    }
    const year = date.slice(0, 4);
    const month = date.length === 4 ? null : date.slice(5, 7);
    if (month !== null) {
      if (Number(month) < 1 || Number(month) > 12) {
        throw new TypeError(`Invalid release date for ${entry.key}: ${date}`);
      }
    }
    if (date.length === 10) {
      const number = Number(year);
      const leap = number % 4 === 0 && (number % 100 !== 0 || number % 400 === 0);
      const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const day = Number(date.slice(8, 10));
      if (day < 1 || day > days[Number(month) - 1]) {
        throw new TypeError(`Invalid release date for ${entry.key}: ${date}`);
      }
    }
    return { entry, date, year, month };
  }

  function build(entries) {
    if (!Array.isArray(entries)) throw new TypeError('Explore entries must be an array');
    const identities = new Set();
    const ordered = entries.map(entry => {
      if (typeof entry?.key !== 'string' || !entry.key || !sections.includes(entry.section)) {
        throw new TypeError('Explore entries require a key and a recognized primary section');
      }
      if (identities.has(entry.key)) throw new TypeError(`Duplicate Explore entry key: ${entry.key}`);
      identities.add(entry.key);
      return readDate(entry);
    }).sort((left, right) => compare(right.year, left.year)
      || compare(right.month || '00', left.month || '00')
      || compare(right.date, left.date)
      || compare(left.entry.key, right.entry.key));

    const periods = [];
    const years = [];
    const periodByEntry = new Map();
    let year;
    let period;
    let day;
    for (const item of ordered) {
      if (year?.year !== item.year) {
        year = { year: item.year, entries: [], periods: [], counts: counts() };
        years.push(year);
      }
      const key = `${item.year}-${item.month || 'unknown'}`;
      if (period?.key !== key) {
        period = { key, year: item.year, month: item.month, entries: [], days: [], counts: counts() };
        periods.push(period);
        year.periods.push(period);
        day = null;
      }
      if (day?.key !== item.date) {
        day = { key: item.date, date: item.date, entries: [] };
        period.days.push(day);
      }
      day.entries.push(item.entry);
      period.entries.push(item.entry);
      year.entries.push(item.entry);
      period.counts[item.entry.section]++;
      year.counts[item.entry.section]++;
      periodByEntry.set(item.entry.key, periods.length - 1);
    }
    return { periods, years, periodByEntry };
  }

  return { build };
});
