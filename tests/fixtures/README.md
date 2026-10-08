# Test fixtures

The score snapshots in the dated `scores/` directories were manually reviewed against
[Artificial Analysis](https://artificialanalysis.ai/leaderboards/models) and
[Arena](https://arena.ai/leaderboard/text) on their recorded retrieval dates. The October 1 fixtures use Arena’s September 30 publication;
the October 8 fixtures use its October 2 publication from the official Hugging Face dataset.
The newer AA fixtures include the current leaderboard and a separately checked deprecated model page.
Each file records its source URL, retrieval
date, source checksum, metric, model configuration, and selected results; no
original source pages are included.

These fixtures provide an independent reference for `src/data-scores.js`. Maintain
them by checking the external sources and reviewing model mappings. Do not
generate or refresh them from the `src/data-scores.js` file under test. Preserve dated
snapshots and add a new date directory when updating the published score snapshot.
