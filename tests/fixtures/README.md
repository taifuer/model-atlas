# Test fixtures

The score snapshots in `scores/2026-10-01/` were manually reviewed against
[Artificial Analysis](https://artificialanalysis.ai/leaderboards/models) and
[Arena](https://arena.ai/leaderboard/text) on October 1, 2026. The Arena snapshot
was published on September 30, 2026. Each file records its source URL, retrieval
date, source checksum, metric, model configuration, and selected results; no
original source pages are included.

These fixtures provide an independent reference for `src/data-scores.js`. Maintain
them by checking the external sources and reviewing model mappings. Do not
generate or refresh them from the `src/data-scores.js` file under test. Preserve dated
snapshots and add a new date directory when updating the published score snapshot.
