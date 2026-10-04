/* Present a fact's documented scope without inferring it from its release title. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.ATLAS_FACTS = api;
})(typeof window === 'object' ? window : null, function () {
  'use strict';

  const scopes = new Set(['variant', 'snapshot', 'configuration']);

  // Pass only the variants represented by the chip, e.g. a price's first model.
  // A family with several documented variants always retains a visible scope.
  function scopeLabel(entry, variants = entry?.variants || [], language = 'zh') {
    if (!entry || !variants.length || (!scopes.has(entry.cardScope) && !(entry.variants?.length > 1))) return '';
    return variants.length === 1 ? variants[0].name : language === 'en' ? 'Variants' : '各型号';
  }

  function scoreLabel(score, cardScope = '') {
    return score && scopes.has(cardScope) ? score.model : '';
  }

  // Promotional status is independent of a fixed expiry. Never invent an end date.
  // Keep "from" when the displayed pair is only the first model or context tier.
  function pricingQualifier(entry, language = 'zh') {
    const variant = entry?.variants?.[0];
    if (!variant?.tiers?.length) return '';
    const english = language === 'en';
    const status = variant.announced ? (english ? 'Announced' : '公布价')
      : variant.archived ? (english ? 'Archived' : '历史价')
      : variant.promotional ? (english ? 'Promo' : '优惠') : '';
    const starting = entry.variants.length > 1 || variant.tiers.length > 1;
    return [status, starting ? (english ? 'from' : '起') : ''].filter(Boolean).join(' · ');
  }

  return Object.freeze({ scopeLabel, scoreLabel, pricingQualifier });
});
