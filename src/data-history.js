/* Group related releases after their per-version metadata has been attached. */
(() => {
  'use strict';

  const families = {
    MODEL_ATLAS: {
      'imagen-4': ['imagen-3'],
      'o1-preview': ['o1'],
      'llama-3-1': ['llama-3-3'],
      'veo-3': ['veo-2', 'veo-3-1'],
      'mistral-medium-3-5': ['mistral-medium-3'],
      'deepseek-r1': ['deepseek-r1-0528'],
      'hailuo-01': ['hailuo-02'],
      'claude-4': ['claude-opus-4-1'],
      'glm-4-5': ['glm-4-6'],
      'gpt-5': ['gpt-5-1'],
      'hunyuan-video': ['hunyuan-video-1-5'],
      'amazon-nova': ['nova-2-lite'],
      'wan-2-5-preview': ['wan-2-6'],
      'minimax-m2': ['minimax-m2-1'],
      'glm-4-7': ['glm-4-7-flash'],
      'gpt-5-3-codex': ['gpt-5-3-codex-spark'],
      'nemotron-3-nano': ['nemotron-3-super'],
      'minimax-m2-5': ['minimax-m2-7'],
      'wan-3-0-video': ['wan-2-7-video'],
      'glm-5': ['glm-5-1', 'glm-5-2'],
      'claude-opus-4-6': ['claude-opus-4-7', 'claude-opus-4-8'],
      'mimo-v2-pro': ['mimo-v2-5'],
      'qwen-3-8-max': ['qwen-3-7-max', 'qwen-3-8-flash', 'qwen-3-8-max-0902'],
      'step-3-5-flash': ['step-3-7-flash'],
      'muse-spark': ['muse-spark-1-1', 'muse-spark-1-3'],
      'grok-4': ['grok-4-5'],
      'gemini-3-5-flash': ['gemini-3-6-flash'],
      'grok-4-7': ['grok-4-6'],
      'deepseek-v4': ['deepseek-v4-pro-0813'],
      'gemini-3-8-flash': ['gemini-3-7-flash'],
      'gemini-omni-1-2-flash': ['gemini-omni-1-1-flash'],
      'hunyuan-hy4': ['hunyuan-hy4-preview', 'hunyuan-hy4-flash'],
      'claude-fable-5': ['claude-fable-5-1'],
      'kimi-k2-7-code': ['kimi-k2-8-preview'],
      'gpt-6-sol-luna': ['gpt-6-sol-luna-chatgpt-october'],
      'lfm-3': ['lfm-2-5-24b-a2b'],
      'minimax-m3': ['minimax-m3-1-flash'],
      'gpt-6-1-sol': ['gpt-6-1-terra'],
      'muse-wonder': ['muse-ember'],
      'qwen-4-max': ['qwen-4-max-preview'],
      'gpt-6-2-astra': ['gpt-6-2-sol'],
      'ling-3-1-flash': ['ling-3-2-air'],
      'inkling-2-small': ['inkling-2-mini'],
    },
    AGENT_ATLAS: {
      'roo-code-3-2': ['kilo-code'],
      'kiro': ['kiro-cli', 'kiro-autonomous'],
      'codex-cli': ['codex-app'],
      'replit-agent': ['replit-agent-4'],
      'opencode-1': ['opencode-2'],
      'cowork': ['cowork-unified'],
      'manus-1-5': ['manus-2'],
      'pi-agent': ['pi-1-0'],
    },
    HARDWARE_ATLAS: {
      'tpu-v2': ['tpu-v3'],
      'ascend-910': ['ascend-310-910'],
      'rtx-4090': ['rtx-3090', 'rtx-5090'],
      'instinct-mi250x': ['instinct-mi100'],
      'cerebras-wse1': ['cerebras-wse2'],
      'graphcore-gc200': ['graphcore-bow'],
      'habana-gaudi': ['intel-gaudi2', 'intel-gaudi3'],
      'aws-trainium2': ['aws-trainium', 'aws-trainium3'],
      'nvidia-t4': ['nvidia-l4'],
      'aws-inferentia': ['aws-inferentia2'],
      'tpu-v5p': ['tpu-v5e', 'tpu-trillium'],
      'nvidia-h100': ['nvidia-h200'],
      'microsoft-maia-200': ['microsoft-maia-100'],
      'instinct-mi300x': ['instinct-mi325x', 'instinct-mi350'],
      'nvidia-blackwell': ['blackwell-ultra'],
      'nvidia-rubin': ['nvidia-groq-3-lpx'],
      'atlas-950-superpod': ['ascend-950pr'],
      'dgx-spark': ['nvidia-rtx-spark'],
      'apple-m3-ultra': ['apple-m5-ultra'],
    },
    TECHNOLOGY_ATLAS: {
      'kata-containers': ['cloud-hypervisor'],
      'flashattention': ['flashattention-2', 'flashattention-3', 'flashattention-4'],
      'vllm': ['vllm-v1'],
      'mla': ['flashmla'],
      'pytorch': ['torchtpu', 'torchneuron'],
    },
  };

  for (const [section, groups] of Object.entries(families)) {
    const data = window[section];
    const byId = new Map(data.releases.map(release => [release.id, release]));
    const members = new Set(Object.values(groups).flat());
    const releases = data.releases.filter(release => !members.has(release.id)).map(release => {
      const ids = groups[release.id];
      if (!ids) return release;
      const history = ids.map(id => byId.get(id)).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
      return { ...release, history };
    });
    const represented = new Set(releases.map(release => release.company));
    window[section] = Object.freeze({
      ...data, releases, allCompanies: data.companies,
      companies: data.companies.filter(company => represented.has(company.id)),
    });
  }
})();
