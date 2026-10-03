(() => {
  'use strict';
  // Files are bundled locally. A product without a separate mark uses its organization.
  const companies = {
    openai: 'openai', google: 'google-color', anthropic: 'anthropic', meta: 'meta-color',
    deepseek: 'deepseek-color', qwen: 'alibaba-color', mistral: 'mistral-color', xai: 'xai',
    moonshot: 'moonshot', zhipu: 'zai', minimax: 'minimax-color', xiaomi: 'xiaomi',
    stepfun: 'stepfun-color', microsoft: 'microsoft-color', amazon: 'aws-color',
    nvidia: 'nvidia-color', tencent: 'tencent-color', bytedance: 'bytedance-color',
    cursor: 'cursor', langchain: 'langchain-color', cognition: 'cognition', github: 'github',
    windsurf: 'windsurf', replit: 'replit-color', openhands: 'openhands-color',
    swe: 'swe-agent', pi: 'pi-agent', openclaw: 'openclaw-color',
    nous: 'nousresearch', aider: 'aider.png', cline: 'cline', roo: 'roocode', block: 'block.jpg',
    opencode: 'opencode', manus: 'manus', huggingface: 'huggingface-color',
    bigscience: 'bigscience.png', llava: 'arxiv',
    crewai: 'crewai-color', warp: 'warp', autogpt: 'autogpt.png',
    amd: 'amd', intel: 'intel', apple: 'apple', huawei: 'huawei', cerebras: 'cerebras-color',
    pytorch: 'pytorch', vllm: 'vllm.png', ggml: 'ggml.jpg', sglang: 'sglang.png',
    flashattention: 'flashattention.png', 'state-spaces': 'state-spaces.png',
    toronto: 'university-toronto', montreal: 'university-montreal', berkeley: 'university-berkeley',
    stanford: 'university-stanford', washington: 'university-washington',
    graphcore: 'graphcore', docker: 'docker', kata: 'kata.png', 'cloud-hypervisor': 'cloud-hypervisor.png',
    amsterdam: 'university-amsterdam', edinburgh: 'university-edinburgh',
    ista: 'university-ista', mit: 'university-mit', compvis: 'compvis.png', zhuiyi: 'zhuiyi.png', e2b: 'e2b.png'
  };
  const products = {
    langgraph: 'langgraph-color', devin: 'devin-color', mcp: 'mcp',
    'claude-code': 'claudecode-color', 'codex-cli': 'codex', 'codex-cloud': 'codex',
    'codex-app': 'codex', 'copilot-coding-agent': 'githubcopilot',
    'agent-skills': 'claude-color', cowork: 'claude-color', 'cowork-unified': 'claude-color',
    'hermes-agent': 'hermesagent', workbuddy: 'workbuddy', goose: 'goose',
    kiro: 'kiro-color', 'kiro-cli': 'kiro-color', 'kiro-autonomous': 'kiro-color',
    qoder: 'qoder-color', 'trae-solo': 'trae-color', 'google-antigravity': 'antigravity-color',
    tensorflow: 'tensorflow', onnx: 'onnx'
  };
  const families = [
    [/^claude-/, 'claude-color'], [/^gemini-/, 'gemini-color'], [/^gemma-/, 'gemma-color'],
    [/^qwen-/, 'qwen-color'], [/^grok-/, 'grok'], [/^kimi-/, 'kimi'],
    [/^hunyuan-/, 'hunyuan-color'], [/^(amazon-nova|nova-)/, 'nova-color']
  ];
  const path = name => name ? `assets/icons/${name.includes('.') ? name : name + '.svg'}` : '';
  const paperPlatforms = {
    'arxiv.org': 'arxiv',
    'papers.nips.cc': 'neurips.ico',
    'papers.neurips.cc': 'neurips.ico',
    'proceedings.neurips.cc': 'neurips.ico'
  };
  function paperSources(entry) {
    if (entry.kind !== 'paper') return [];
    return (entry.sources || []).map(source => paperPlatforms[new URL(source.url).hostname]).filter(Boolean);
  }
  function paperMark(entry) {
    if (entry.kind !== 'paper') return '';
    const organization = companies[entry.company];
    if (organization && !organization.startsWith('university-')) return '';
    const marks = paperSources(entry);
    return marks.includes('arxiv') ? 'arxiv' : marks[0] || '';
  }
  window.ATLAS_ICONS = Object.freeze({
    company: id => path(companies[id]),
    // Paper sources are a fallback when no product or real organization mark is available.
    release: entry => path(products[entry.id] || families.find(([pattern]) => pattern.test(entry.id))?.[1] || paperMark(entry) || companies[entry.company])
  });
})();
