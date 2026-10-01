const { test } = require('node:test');
const assert = require('node:assert/strict');
const { create } = require('../src/filters.js');

const data = {
  asOf: '2026-10-01',
  companies: [{ id: 'alpha' }, { id: 'beta' }, { id: 'gamma' }],
  releases: [
    { id: 'a', company: 'alpha', date: '2025-01-01' },
    { id: 'b', company: 'beta', date: '2026-02-01' },
    { id: 'c', company: 'gamma', date: '2026-03-01' },
  ],
};
const filters = create(data, new Map());
const selected = state => [...state.companies];

test('single selection replaces the organization and clicking it again keeps it selected', () => {
  const initial = filters.read('');
  assert.equal(initial.multiSelect, false);
  const alpha = filters.chooseCompany(initial, 'alpha');
  const beta = filters.chooseCompany(alpha, 'beta');
  const betaAgain = filters.chooseCompany(beta, 'beta');
  assert.deepEqual(selected(initial), []);
  assert.deepEqual(selected(alpha), ['alpha']);
  assert.deepEqual(selected(beta), ['beta']);
  assert.deepEqual(selected(betaAgain), ['beta']);
  assert.notEqual(betaAgain, beta);
  assert.notEqual(betaAgain.companies, beta.companies);
  assert.deepEqual(filters.select(beta).map(entry => entry.id), ['b']);
});

test('multi selection toggles organizations and preserves selection order without mutating prior states', () => {
  const single = filters.chooseCompany(filters.read(''), 'gamma');
  const multi = filters.setMultiSelect(single, true);
  const withAlpha = filters.chooseCompany(multi, 'alpha');
  const withBeta = filters.chooseCompany(withAlpha, 'beta');
  const withoutAlpha = filters.chooseCompany(withBeta, 'alpha');
  const alphaAgain = filters.chooseCompany(withoutAlpha, 'alpha');
  assert.deepEqual(selected(single), ['gamma']);
  assert.equal(single.multiSelect, false);
  assert.equal(multi.multiSelect, true);
  assert.notEqual(single.companies, multi.companies);
  assert.deepEqual(selected(withAlpha), ['gamma', 'alpha']);
  assert.deepEqual(selected(withBeta), ['gamma', 'alpha', 'beta']);
  assert.deepEqual(selected(withoutAlpha), ['gamma', 'beta']);
  assert.deepEqual(selected(alphaAgain), ['gamma', 'beta', 'alpha']);
});

test('disabling multi selection retains the last organization still selected', () => {
  const multi = filters.read('?companies=gamma,alpha,beta');
  const withoutLatest = filters.chooseCompany(multi, 'beta');
  const single = filters.setMultiSelect(withoutLatest, false);
  assert.equal(single.multiSelect, false);
  assert.deepEqual(selected(single), ['alpha']);
  assert.deepEqual(selected(withoutLatest), ['gamma', 'alpha']);
  assert.equal(withoutLatest.multiSelect, true);
  const empty = filters.setMultiSelect(filters.read('?multi=1'), false);
  assert.deepEqual(selected(empty), []);
  assert.equal(empty.multiSelect, false);
  assert.deepEqual(selected(filters.setMultiSelect(filters.read('?companies=gamma&multi=1'), false)), ['gamma']);
});

test('All clears organizations while preserving the current mode and other conditions', () => {
  for (const multiSelect of [false, true]) {
    const initial = filters.read('?year=2026&month=02&sort=asc&view=compact&q=model');
    const chosen = filters.chooseCompany(filters.setMultiSelect(initial, multiSelect), 'beta');
    const cleared = filters.chooseCompany(chosen, 'all');
    assert.deepEqual(selected(cleared), []);
    assert.deepEqual(selected(chosen), ['beta']);
    assert.equal(cleared.multiSelect, multiSelect);
    for (const key of ['year', 'month', 'sort', 'view', 'query']) assert.equal(cleared[key], initial[key]);
    assert.notEqual(cleared.companies, chosen.companies);
  }
});

test('old multi-organization links enable multi selection and ignore invalid or duplicate IDs', () => {
  const state = filters.read('?companies=gamma,unknown,beta,gamma,,%20alpha%20&companies=beta');
  assert.deepEqual(selected(state), ['gamma', 'beta', 'alpha']);
  assert.equal(state.multiSelect, true);
  assert.equal(filters.read('?companies=alpha,alpha,unknown').multiSelect, false);
  assert.deepEqual(selected(filters.read('?companies=unknown,,all')), []);
  assert.equal(filters.read('?companies=gamma,beta&multi=0').multiSelect, true);
  assert.equal(filters.read('?multi=true').multiSelect, false);
});

test('serialized URLs preserve selection order and multi mode even with zero or one selection', () => {
  for (const query of ['', '?multi=1', '?companies=gamma&multi=1', '?companies=gamma,beta,alpha&year=2026&sort=asc&view=compact']) {
    const state = filters.read(query);
    const url = filters.serialize(state, 'en');
    const params = new URLSearchParams(url);
    assert.equal(params.get('lang'), 'en');
    assert.equal(params.get('multi'), state.multiSelect ? '1' : null);
    assert.equal(params.get('companies'), state.companies.size ? selected(state).join(',') : null);
    assert.deepEqual(filters.read(url), state);
  }
  const restored = filters.read(filters.serialize(filters.read('?companies=gamma,beta,alpha'), 'zh'));
  assert.deepEqual(selected(filters.setMultiSelect(restored, false)), ['alpha']);
});

test('invalid choices do not change selection, and mode alone is not an active filter', () => {
  const initial = filters.read('?companies=beta');
  const invalid = filters.chooseCompany(initial, 'unknown');
  assert.deepEqual(invalid, initial);
  assert.notEqual(invalid, initial);
  assert.notEqual(invalid.companies, initial.companies);
  assert.equal(filters.hasFilters(filters.read('?multi=1')), false);
  assert.equal(filters.hasFilters(initial), true);
  const multi = filters.read('?companies=beta&multi=1');
  const cleared = filters.chooseCompany(multi, 'beta');
  assert.deepEqual(selected(cleared), []);
  assert.equal(cleared.multiSelect, true);
  assert.equal(filters.hasFilters(cleared), false);
});
