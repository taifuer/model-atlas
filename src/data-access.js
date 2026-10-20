/* Access is maintained per release, never inferred from its organization or tags.
 * Snapshot: 2026-10-03. This describes the referenced model/tool, not the license
 * of its dependencies. Later weight releases do not change timeline dates.
 */
(() => {
  'use strict';
  const checkedAt = '2026-10-03';
  const models = {};
  const agents = {};
  const add = (target, status, ids) => ids.trim().split(/\s+/).forEach(id => {
    if (target[id]) throw new Error(`Duplicate access classification: ${id}`);
    target[id] = { status };
  });
  add(models, 'open', 'transformer llama-1 grok-1 qwen-3-8-flash qwen-3-8-max bloom stanford-alpaca llava');
  add(models, 'open', `
    gpt-1 gpt-2 bert t5 phi-3 phi-4
    llama-2 qwen-7b mistral-7b mixtral-8x7b gemma-1 llama-3 deepseek-v2 qwen-2 gemma-2
    llama-3-1 mistral-large-2 qwen-2-5 llama-3-2 llama-3-3 deepseek-v3 deepseek-r1 gemma-3
    llama-4 qwen-3 deepseek-r1-0528 minimax-m1 kimi-k2 qwen-3-coder glm-4-5 gpt-oss
    deepseek-v3-1 qwen-3-next glm-4-6 minimax-m2 kimi-k2-thinking deepseek-v3-2 mistral-3
    nemotron-3-nano mimo-v2-flash glm-4-7 minimax-m2-1 glm-4-7-flash kimi-k2-5
    step-3-5-flash glm-5 minimax-m2-5 qwen-3-5 nemotron-3-super mistral-small-4 minimax-m2-7
    gemma-4 glm-5-1 mimo-v2-5 deepseek-v4 mistral-medium-3-5 step-3-7-flash minimax-m3
    kimi-k2-7-code glm-5-2 hunyuan-hy3 kimi-k3 qwen-3-8 deepseek-v4-pro-0813 glm-5-3
    glm-5-3-flash hunyuan-hy4-preview deepseek-v4-1-flash mimo-v2-6 step-5-preview
  `);
  add(models, 'closed', `
    gpt-3 codex instructgpt palm chatgpt claude-1 gpt-4 claude-2 gpt-4-turbo gemini-1
    gemini-1-5 claude-3 gpt-4o claude-3-5 gpt-4o-mini o1-preview amazon-nova o1 gemini-2
    o3-mini grok-3 claude-3-7 gpt-4-5 hunyuan-t1 gemini-2-5 gpt-4-1 o3-o4-mini
    mistral-medium-3 claude-4 grok-4 claude-opus-4-1 gpt-5 claude-sonnet-4-5 claude-haiku-4-5
    gpt-5-1 gemini-3 claude-opus-4-5 nova-2-lite gpt-5-2 gemini-3-flash
    claude-opus-4-6 gpt-5-3-codex gpt-5-3-codex-spark seed-2 claude-sonnet-4-6 gemini-3-1
    gpt-5-4 mimo-v2-pro muse-spark claude-opus-4-7 qwen-3-6-max-preview gpt-5-5
    gemini-3-5-flash qwen-3-7-max claude-opus-4-8 claude-fable-5 claude-sonnet-5
    gpt-5-6 muse-spark-1-1 grok-4-5 gemini-3-6-flash claude-opus-5
    grok-4-6 gemini-3-7-flash claude-fable-5-1 gemini-3-8-flash muse-spark-1-3 qwen-3-8-max-0902
    gpt-6-astra kimi-k2-8-preview qwen-3-8-omni-flash grok-4-7 claude-opus-5-5
    gpt-6-sol-luna claude-sonnet-5-5
  `);

  add(models, 'closed', 'gpt-6-1-sol gemini-4-argon muse-wonder');
  Object.assign(models['muse-wonder'], { checkedAt: '2026-10-15', source: 'https://dev.meta.ai/models/muse-wonder', note: '两款模型均未开放权重；Wonder 提供 API 预览，Full 限 Muse Code 指定订阅方案。', noteEn: 'Neither model has public weights. Wonder has an API preview; Full requires eligible Muse Code subscription plans.' });
  models['gemini-4-argon'].checkedAt = '2026-10-15';
  add(models, 'closed', 'claude-haiku-5-5 mistral-large-4-preview gpt-6-sol-luna-chatgpt-october');
  ['claude-haiku-5-5', 'mistral-large-4-preview', 'gpt-6-sol-luna-chatgpt-october'].forEach(id => { models[id].checkedAt = '2026-10-08'; });

  const modelSources = {
    'llava': 'https://huggingface.co/liuhaotian/LLaVA-13b-delta-v0',
    'stanford-alpaca': 'https://huggingface.co/tatsu-lab/alpaca-7b-wdiff',
    'bloom': 'https://huggingface.co/bigscience/bloom',
    'step-5-preview': 'https://huggingface.co/stepfun-ai/Step-5-Preview-NVFP4',
    'step-3-5-flash': 'https://huggingface.co/stepfun-ai/Step-3.5-Flash',
    'hunyuan-t1': 'https://cloud.tencent.com/document/product/1729/131925',
    'palm': 'https://developers.googleblog.com/en/palm-api-makersuite-an-approachable-way-to-start-prototyping-and-building-generative-ai-applications/',
    'gpt-3': 'https://openai.com/index/openai-api/',
    transformer: 'https://github.com/tensorflow/tensor2tensor',
    'grok-1': 'https://x.ai/news/grok-os',
    'qwen-3-8-flash': 'https://www.qwencloud.com/models/qwen3.8-flash',
    'qwen-3-8-max': 'https://www.qwencloud.com/models/qwen3.8-max',
    'qwen-3-8-max-0902': 'https://docs.qwencloud.com/changelog/model-updates/qwen3.8-max-upgrade',
    'gpt-1': 'https://github.com/openai/finetune-transformer-lm',
    'gpt-2': 'https://github.com/openai/gpt-2',
    bert: 'https://github.com/google-research/bert',
    t5: 'https://github.com/google-research/text-to-text-transfer-transformer',
    'phi-3': 'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct',
    'phi-4': 'https://huggingface.co/microsoft/phi-4',
    'deepseek-r1-0528': 'https://huggingface.co/deepseek-ai/DeepSeek-R1-0528',
    'deepseek-v3-1': 'https://huggingface.co/deepseek-ai/DeepSeek-V3.1',
    'deepseek-v3-2': 'https://huggingface.co/deepseek-ai/DeepSeek-V3.2',
    'deepseek-v4-pro-0813': 'https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813',
    'deepseek-v4-1-flash': 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash',
    'qwen-3-next': 'https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct',
    'minimax-m1': 'https://huggingface.co/MiniMaxAI/MiniMax-M1-80k',
    'minimax-m2-1': 'https://huggingface.co/MiniMaxAI/MiniMax-M2.1',
    'minimax-m2-5': 'https://huggingface.co/MiniMaxAI/MiniMax-M2.5',
    'minimax-m2-7': 'https://huggingface.co/MiniMaxAI/MiniMax-M2.7',
    'step-3-7-flash': 'https://huggingface.co/stepfun-ai/Step-3.7-Flash',
    'kimi-k2-7-code': 'https://huggingface.co/moonshotai/Kimi-K2.7-Code',
    'kimi-k3': 'https://huggingface.co/moonshotai/Kimi-K3',
    'mimo-v2-5': 'https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro',
    'mimo-v2-6': 'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL',
    'hunyuan-hy3': 'https://huggingface.co/tencent/Hy3',
    'glm-4-6': 'https://huggingface.co/zai-org/GLM-4.6',
    'glm-4-7': 'https://huggingface.co/zai-org/GLM-4.7',
    'glm-4-7-flash': 'https://huggingface.co/zai-org/GLM-4.7-Flash',
    'glm-5-1': 'https://huggingface.co/zai-org/GLM-5.1',
    'glm-5-2': 'https://huggingface.co/zai-org/GLM-5.2',
    'glm-5-3': 'https://huggingface.co/zai-org/GLM-5.3',
    'glm-5-3-flash': 'https://huggingface.co/zai-org/GLM-5.3-Flash',
  };
  Object.entries(modelSources).forEach(([id, source]) => { models[id].source = source; });
  const note = (target, id, zh, en) => Object.assign(target[id], { note: zh, noteEn: en });
  note(models, 'transformer', '此节点记录架构论文；开源指 Tensor2Tensor 参考实现，不表示论文公开当天已开放模型权重。', 'This entry records the architecture paper. Open source refers to the Tensor2Tensor reference implementation, not weight availability on the paper publication date.');
  note(models, 'llama-1', '初代采用申请式研究访问与非商业研究许可。', 'The original release required research access approval and a non-commercial research license.');
  note(models, 'grok-1', '开源指 2024 年 3 月开放的 Grok-1 基础模型；托管产品另行提供。时间线保留首次预览日期。', 'Open source refers to the Grok-1 base weights released in March 2024. The hosted product is separate; the timeline retains the original preview date.');
  note(models, 'phi-4', '当前已开放权重；时间线仍采用原始首发日期。', 'Weights are now available; the timeline retains the original announcement date.');
  note(models, 'mimo-v2-5', '首发后已开放 V2.5 与 Pro 权重，发布日期保持不变。', 'V2.5 and Pro weights became available after the launch; the launch date is unchanged.');
  note(models, 'mimo-v2-6', '官方提供 Pro 与 Flash 的 RL / MOPD 检查点；托管服务配置可能不同。', 'Official Pro and Flash RL / MOPD checkpoints are available; hosted configurations may differ.');
  note(models, 'minimax-m2-7', '首发后已开放权重，发布日期保持不变。', 'Weights became available after launch; the launch date is unchanged.');
  note(models, 'kimi-k3', '首发后已开放权重，发布日期保持不变。', 'Weights became available after launch; the launch date is unchanged.');
  note(models, 'mistral-large-4-preview', '截至 2026 年 10 月 8 日提供公开 API 预览，权重仍在发布计划中。', 'As of October 8, 2026, the public API preview is available, but the weight release is still planned.');
  note(models, 'qwen-3-8-flash', '开源标签指官方明确对应的 Flash-Next 基础权重；Flash 托管版的上下文、工具和服务配置另计。', 'The open-source label refers to the officially linked Flash-Next base weights. Hosted Flash has separate context, tool, and service configurations.');
  note(models, 'qwen-3-8-max', '开源标签指官方明确对应的 Qwen3.8-2.4T-A95B 基础权重；其为文本模型，Max 托管版另有视觉、工具和服务配置。', 'The open-source label refers to the officially linked Qwen3.8-2.4T-A95B base weights. That checkpoint is text-only; hosted Max adds vision, tools, and service configurations.');
  note(models, 'qwen-3-8-max-0902', '此节点记录 0902 托管服务更新；已公开的初始基础版本单独收录。', 'This entry covers the 0902 hosted update. The initially released base checkpoint is recorded separately.');

  note(models, 'bloom', '权重采用 BigScience RAIL 许可，附使用范围限制。', 'Weights are available under the BigScience RAIL license, with use restrictions.');
  note(models, 'stanford-alpaca', '首发公开训练数据与配方，权重差分随后开放；恢复模型需原始 LLaMA 权重，差分适用 CC BY-NC 4.0，仅限非商业研究。', 'Training data and the recipe were released first; weight differences followed. Reconstruction requires the original LLaMA weights. The differences use CC BY-NC 4.0 and are restricted to non-commercial research.');
  note(models, 'llava', '首代以权重差分方式发布，需配合原始 LLaMA 权重使用；基础模型与训练数据的许可仍适用。', 'The original release provides weight differences to apply to LLaMA weights. The base model and training data retain their respective license terms.');
  note(models, 'palm', '此节点记录原始 PaLM 研究；公开论文不等于开放模型权重，后续 PaLM API 为托管服务。', 'This entry records the original PaLM research. Publication of the paper does not make its weights open; the later PaLM API was a hosted service.');
  note(models, 'hunyuan-t1', 'T1 为托管模型，官方公布的旧版 API 下线日期为 2026 年 6 月 22 日；后续 Hy3 的开放方式另计。', 'T1 was provided as a hosted model. Its announced legacy API retirement date was June 22, 2026; later Hy3 releases have separate access terms.');
  add(agents, 'open', `
    autogpt-0-2 aider autogen langgraph swe-agent openhands cline-2 mcp a2a smolagents
    goose openai-agents-sdk google-adk codex-cli warp-2 strands-agents gemini-cli qwen-code deep-agents
    claude-agent-sdk crewai-1 opencode-1 pi-agent kimi-cli-1 openclaw hermes-agent deepseek-harness agent-skills
  `);
  add(agents, 'closed', `
    devin replit-agent windsurf cursor-agent operator deep-research claude-code codex-cloud
    copilot-coding-agent jules kiro chatgpt-agent trae-solo qoder manus-1-5 kiro-cli
    google-antigravity kiro-autonomous cowork codex-app workbuddy cowork-unified
  `);
  const agentSources = {
    a2a: 'https://github.com/a2aproject/A2A',
    'warp-2': 'https://github.com/warpdotdev/warp',
    'autogpt-0-2': 'https://github.com/Significant-Gravitas/AutoGPT/tree/v0.2.0',
    aider: 'https://github.com/Aider-AI/aider',
    autogen: 'https://github.com/microsoft/autogen',
    langgraph: 'https://github.com/langchain-ai/langgraph',
    'swe-agent': 'https://github.com/SWE-agent/SWE-agent',
    openhands: 'https://github.com/OpenHands/OpenHands',
    'cline-2': 'https://github.com/cline/cline/tree/v2.0.0',
    mcp: 'https://github.com/modelcontextprotocol/specification',
    smolagents: 'https://github.com/huggingface/smolagents',
    goose: 'https://github.com/block/goose',
    'openai-agents-sdk': 'https://github.com/openai/openai-agents-python',
    'google-adk': 'https://github.com/google/adk-python',
    'codex-cli': 'https://github.com/openai/codex',
    'strands-agents': 'https://github.com/strands-agents/sdk-python',
    'gemini-cli': 'https://github.com/google-gemini/gemini-cli',
    'qwen-code': 'https://github.com/QwenLM/qwen-code',
    'deep-agents': 'https://github.com/langchain-ai/deepagents',
    'claude-agent-sdk': 'https://github.com/anthropics/claude-agent-sdk-python/blob/main/LICENSE',
    'crewai-1': 'https://github.com/crewAIInc/crewAI',
    'opencode-1': 'https://github.com/anomalyco/opencode',
    'pi-agent': 'https://github.com/badlogic/pi-mono',
    'kimi-cli-1': 'https://github.com/MoonshotAI/kimi-cli',
    openclaw: 'https://github.com/openclaw/openclaw',
    'hermes-agent': 'https://github.com/NousResearch/hermes-agent',
    'deepseek-harness': 'https://github.com/deepseek-ai/deepseek-harness',
    'agent-skills': 'https://github.com/anthropics/skills',
  };
  Object.entries(agentSources).forEach(([id, source]) => { agents[id].source = source; });
  note(agents, 'claude-agent-sdk', 'SDK 代码采用 MIT 许可；底层 Claude Code 运行时与模型不因此变为开源。', 'The SDK is MIT licensed; this does not make the underlying Claude Code runtime or model open source.');
  note(agents, 'agent-skills', '规范与官方示例公开；示例和文档技能分别适用其仓库内的许可。', 'The specification and official examples are public. Examples and document skills retain their individual repository licenses.');
  note(agents, 'codex-cli', '开源的是 CLI 工具，不代表其连接的模型或云端服务开源。', 'The CLI is open source; connected models and hosted services have separate access terms.');
  note(agents, 'warp-2', 'Warp 客户端于 2026 年 4 月开放源代码；云端服务与连接的模型另计。此处仍记录 Warp 2 首发。', 'Warp opened its client source code in April 2026; cloud services and connected models have separate terms. This entry retains the Warp 2 launch date.');
  add(agents, 'closed', 'openai-dots meta-muse');
  Object.assign(agents['openai-dots'], { checkedAt: '2026-10-08', source: 'https://openai.com/index/introducing-dots/' });
  Object.assign(agents['meta-muse'], { checkedAt: '2026-10-08', source: 'https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/' });
  Object.assign(models, {
  "gpt-j-6b": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://huggingface.co/EleutherAI/gpt-j-6b"
  },
  "chatglm-6b": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://github.com/zai-org/ChatGLM-6B",
    "note": "代码采用 Apache 2.0；模型权重采用独立许可，学术研究开放，免费商用需登记。",
    "noteEn": "Code uses Apache 2.0. Model weights have a separate license: academic research is open, and free commercial use requires registration."
  },
  "starcoder": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://huggingface.co/blog/starcoder",
    "note": "权重采用 BigCode OpenRAIL-M 许可，附使用限制；训练代码另按 Apache 2.0 提供。",
    "noteEn": "Weights use BigCode OpenRAIL-M with use restrictions; training code separately uses Apache 2.0."
  },
  "olmo": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://huggingface.co/allenai/OLMo-7B"
  },
  "mellum-2-1-thinking": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://huggingface.co/JetBrains/Mellum2.1-12B-A2.5B-Thinking"
  }
});
  Object.assign(agents, {
  "roo-code-3-2": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://github.com/RooCodeInc/Roo-Code"
  },
  "junie": {
    "status": "closed",
    "checkedAt": "2026-10-11",
    "source": "https://blog.jetbrains.com/junie/2025/01/meet-junie-your-coding-agent-by-jetbrains/"
  },
  "kilo-code": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://github.com/Kilo-Org/kilocode"
  },
  "augment-agent": {
    "status": "closed",
    "checkedAt": "2026-10-11",
    "source": "https://www.augmentcode.com/blog/meet-augment-agent"
  },
  "zed-agent": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://github.com/zed-industries/zed",
    "note": "Zed 编辑器代码采用 GPL 3.0；连接的模型与托管服务适用各自条款。",
    "noteEn": "The Zed editor code uses GPL 3.0; connected models and hosted services retain their own terms."
  },
  "amp": {
    "status": "closed",
    "checkedAt": "2026-10-11",
    "source": "https://ampcode.com/notes/how-i-use-amp"
  },
  "factory-droids": {
    "status": "closed",
    "checkedAt": "2026-10-11",
    "source": "https://factory.com/news/factory-is-ga"
  },
  "codebuddy-code": {
    "status": "closed",
    "checkedAt": "2026-10-11",
    "source": "https://developer.cloud.tencent.com/article/2566993"
  },
  "zcode-open-source": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://github.com/zai-org/ZCode",
    "note": "此节点记录 Apache 2.0 源码开放；连接的模型和云端服务另计。",
    "noteEn": "This entry records the Apache 2.0 source release; connected models and cloud services have separate terms."
  },
  "pi-1-0": {
    "status": "open",
    "checkedAt": "2026-10-11",
    "source": "https://github.com/badlogic/pi-mono"
  }
});
  Object.assign(models, {
  "ling-3-1-flash": {
    "status": "closed",
    "checkedAt": "2026-10-11",
    "source": "https://artificialanalysis.ai/models/ling-3-1-flash",
    "note": "当前版本提供 API 服务，未开放模型权重；不沿用前代开放模型的许可。",
    "noteEn": "The current version is API-only, without public weights; earlier open models’ licenses do not apply."
  }
});
  // License scope is recorded for the named release, not inherited by a family.
  const license = (object, objectEn, name, source) => ({ object, objectEn, name, source });
  const reviewedLicense = (target, id, licenses, zh, en) => Object.assign(target[id], {
    checkedAt: '2026-10-12', licenses, note: zh, noteEn: en,
  });
  reviewedLicense(models, 'chatglm-6b', [
    license('模型权重', 'Model weights', 'ChatGLM-6B Model License', 'https://github.com/zai-org/ChatGLM-6B/blob/main/MODEL_LICENSE'),
    license('代码', 'Code', 'Apache 2.0', 'https://github.com/zai-org/ChatGLM-6B/blob/main/LICENSE'),
  ], '权重向学术研究开放，免费商用需登记；模型许可附使用限制。', 'Weights are available for academic research; free commercial use requires registration. The model license includes use restrictions.');
  reviewedLicense(models, 'starcoder', [
    license('模型权重', 'Model weights', 'BigCode OpenRAIL-M v1', 'https://huggingface.co/spaces/bigcode/bigcode-model-license-agreement'),
    license('训练代码', 'Training code', 'Apache 2.0 / MIT / BSD / NVIDIA', 'https://github.com/bigcode-project/Megatron-LM/blob/main/LICENSE'),
  ], '权重附使用限制；训练仓库内不同组件分别适用其许可。', 'Weights have use restrictions; components in the training repository retain their individual licenses.');
  reviewedLicense(models, 'llama-2', [
    license('权重与模型代码', 'Weights and model code', 'Llama 2 Community License', 'https://github.com/meta-llama/llama/blob/llama_v2/LICENSE'),
  ], '适用可接受使用政策；不得用于改进 Llama 2 及其衍生模型以外的大模型。发布时符合许可约定的超过 7 亿月活用户条件，需另向 Meta 申请许可。', 'The acceptable-use policy applies; use to improve LLMs other than Llama 2 or its derivatives is prohibited. Organizations above the license’s 700-million-monthly-user threshold at release must obtain a separate license from Meta.');
  for (const id of ['gemma-1', 'gemma-2', 'gemma-3']) {
    reviewedLicense(models, id, [
      license('模型权重', 'Model weights', 'Gemma Terms of Use', 'https://ai.google.dev/gemma/terms'),
    ], '适用 Gemma 禁止用途政策；再分发须保留条款、使用限制与相关声明。', 'The Gemma prohibited-use policy applies. Redistribution must retain the terms, use restrictions and required notices.');
  }
  reviewedLicense(models, 'gemma-4', [
    license('模型权重', 'Model weights', 'Apache 2.0', 'https://ai.google.dev/gemma/apache_2'),
  ], '', '');
  reviewedLicense(models, 'stanford-alpaca', [
    license('权重差分', 'Weight differences', 'CC BY-NC 4.0', 'https://huggingface.co/tatsu-lab/alpaca-7b-wdiff'),
  ], '权重差分在首发后开放，恢复模型需原始 LLaMA 权重。模型研究与差分仅限非商业用途。', 'Weight differences were released after the initial announcement. Reconstructing the model requires the original LLaMA weights; the research model and differences are limited to non-commercial use.');
  reviewedLicense(agents, 'zcode-open-source', [
    license('工具代码', 'Tool code', 'Apache 2.0', 'https://github.com/zai-org/ZCode/blob/main/LICENSE'),
  ], '连接的模型和云端服务适用各自条款。', 'Connected models and cloud services retain their own terms.');
  reviewedLicense(agents, 'claude-agent-sdk', [
    license('SDK 代码', 'SDK code', 'MIT', 'https://github.com/anthropics/claude-agent-sdk-python/blob/main/LICENSE'),
  ], '开放范围为 SDK 代码；底层 Claude Code 运行时与模型不因此变为开源。', 'Only the SDK code is covered; the underlying Claude Code runtime and model are not made open source by this license.');
  // Reviewed video-model access.
  Object.assign(models, {
    "seedance-1-0": {
      "status": "closed",
      "source": "https://seed.bytedance.com/en/blog/tech-report-of-seedance-1-0-is-now-publicly-available",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或托管服务提供，未发布可下载模型权重。",
      "noteEn": "Offered through official products or hosted services; downloadable model weights have not been released."
    },
    "seedance-1-5-pro": {
      "status": "closed",
      "source": "https://seed.bytedance.com/en/blog/sound-and-vision-all-in-one-take-the-official-release-of-seedance-1-5-pro",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或托管服务提供，未发布可下载模型权重。",
      "noteEn": "Offered through official products or hosted services; downloadable model weights have not been released."
    },
    "seedance-2-0": {
      "status": "closed",
      "source": "https://seed.bytedance.com/en/blog/seedance-2-0-official-launch",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或托管服务提供，未发布可下载模型权重。",
      "noteEn": "Offered through official products or hosted services; downloadable model weights have not been released."
    },
    "seedance-2-5": {
      "status": "closed",
      "source": "https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或托管服务提供，未发布可下载模型权重。",
      "noteEn": "Offered through official products or hosted services; downloadable model weights have not been released."
    },
    "wan-2-1": {
      "status": "open",
      "source": "https://github.com/Wan-Video/Wan2.1/blob/main/LICENSE.txt",
      "checkedAt": "2026-10-15",
      "note": "模型权重与推理代码按 Apache 2.0 许可公开；不表示训练数据全部公开。",
      "noteEn": "Model weights and inference code are released under Apache 2.0; this does not imply release of all training data.",
      "licenses": [
        {
          "object": "模型权重",
          "objectEn": "Model weights",
          "name": "Apache 2.0",
          "source": "https://github.com/Wan-Video/Wan2.1/blob/main/LICENSE.txt"
        }
      ]
    },
    "wan-2-2": {
      "status": "open",
      "source": "https://github.com/Wan-Video/Wan2.2/blob/main/LICENSE.txt",
      "checkedAt": "2026-10-15",
      "note": "模型权重与推理代码按 Apache 2.0 许可公开；不表示训练数据全部公开。",
      "noteEn": "Model weights and inference code are released under Apache 2.0; this does not imply release of all training data.",
      "licenses": [
        {
          "object": "模型权重",
          "objectEn": "Model weights",
          "name": "Apache 2.0",
          "source": "https://github.com/Wan-Video/Wan2.2/blob/main/LICENSE.txt"
        }
      ]
    },
    "wan-2-5-preview": {
      "status": "closed",
      "source": "https://www.alibabacloud.com/en/press-room/alibabacloudunveilsstrategicroadmaps",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或托管服务提供，未发布可下载模型权重。",
      "noteEn": "Offered through official products or hosted services; downloadable model weights have not been released."
    },
    "wan-2-6": {
      "status": "closed",
      "source": "https://www.alibabacloud.com/en/press-room/alibaba-unveils-wan2-6-series-enabling-everyone",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或托管服务提供，未发布可下载模型权重。",
      "noteEn": "Offered through official products or hosted services; downloadable model weights have not been released."
    },
    "wan-2-7-video": {
      "status": "closed",
      "source": "https://www.alibabacloud.com/help/en/model-studio/newly-released-models",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或托管服务提供，未发布可下载模型权重。",
      "noteEn": "Offered through official products or hosted services; downloadable model weights have not been released."
    },
    "wan-3-0-video": {
      "status": "closed",
      "source": "https://www.alibabacloud.com/help/en/model-studio/newly-released-models",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或托管服务提供，未发布可下载模型权重。",
      "noteEn": "Offered through official products or hosted services; downloadable model weights have not been released."
    },
    "hunyuan-video": {
      "status": "open",
      "source": "https://github.com/Tencent-Hunyuan/HunyuanVideo/blob/main/LICENSE.txt",
      "checkedAt": "2026-10-15",
      "note": "权重与推理代码公开，采用腾讯混元社区许可；许可含地域、用途和大规模商用限制，并非 Apache/MIT 许可。",
      "noteEn": "Weights and inference code are public under the Tencent Hunyuan Community License, which imposes territorial, use and large-scale commercial restrictions; it is not an Apache/MIT license.",
      "licenses": [
        {
          "object": "模型权重",
          "objectEn": "Model weights",
          "name": "Tencent Hunyuan Community License",
          "source": "https://github.com/Tencent-Hunyuan/HunyuanVideo/blob/main/LICENSE.txt"
        }
      ]
    },
    "hunyuan-video-1-5": {
      "status": "open",
      "source": "https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5/blob/main/LICENSE",
      "checkedAt": "2026-10-15",
      "note": "权重与推理代码公开，采用腾讯混元社区许可；许可含地域、用途和大规模商用限制，并非 Apache/MIT 许可。",
      "noteEn": "Weights and inference code are public under the Tencent Hunyuan Community License, which imposes territorial, use and large-scale commercial restrictions; it is not an Apache/MIT license.",
      "licenses": [
        {
          "object": "模型权重",
          "objectEn": "Model weights",
          "name": "Tencent Hunyuan Community License",
          "source": "https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5/blob/main/LICENSE"
        }
      ]
    },
    "sora": {
      "status": "closed",
      "source": "https://openai.com/index/video-generation-models-as-world-simulators/",
      "checkedAt": "2026-10-15",
      "note": "未公开模型权重；初次发布为受限研究预览。",
      "noteEn": "Model weights were not released; the initial announcement was a restricted research preview."
    },
    "veo": {
      "status": "closed",
      "source": "https://blog.google/innovation-and-ai/products/google-generative-ai-veo-imagen-3/",
      "checkedAt": "2026-10-15",
      "note": "通过 Google 托管产品提供，未公开模型权重；首发为创作者私有预览。",
      "noteEn": "Provided through Google's hosted products without released model weights; initially a private creator preview."
    },
    "sora-turbo": {
      "status": "closed",
      "source": "https://openai.com/index/sora-is-here/",
      "checkedAt": "2026-10-15",
      "note": "托管闭源模型，未公开权重；Sora 网页与 App 已于 2026-04-26 停服。",
      "noteEn": "A hosted model without released weights; the Sora web and app service ended on April 26, 2026."
    },
    "veo-2": {
      "status": "closed",
      "source": "https://blog.google/innovation-and-ai/models-and-research/google-labs/video-image-generation-update-december-2024/",
      "checkedAt": "2026-10-15",
      "note": "通过 Google 托管产品提供，未公开模型权重；首发仍为逐步开放的试用。",
      "noteEn": "Provided through Google's hosted products without released model weights; initial availability was a gradual preview rollout."
    },
    "veo-3": {
      "status": "closed",
      "source": "https://blog.google/innovation-and-ai/products/generative-media-models-io-2025/",
      "checkedAt": "2026-10-15",
      "note": "通过 Google 托管服务提供，未公开模型权重；Veo 3.0 API 已在官方文档中标为弃用。",
      "noteEn": "Provided through Google's hosted services without released weights; the official documentation now marks the Veo 3.0 API deprecated."
    },
    "sora-2": {
      "status": "closed",
      "source": "https://openai.com/index/sora-2/",
      "checkedAt": "2026-10-15",
      "note": "未公开模型权重；网页与 App 于 2026-04-26 停服，Sora 2 / Pro 与 Videos API 于 2026-09-24 下线。",
      "noteEn": "Model weights were not released. Web and app access ended April 26, 2026; Sora 2, Pro and the Videos API shut down September 24, 2026."
    },
    "veo-3-1": {
      "status": "closed",
      "source": "https://blog.google/innovation-and-ai/products/veo-updates-flow/",
      "checkedAt": "2026-10-15",
      "note": "通过 Google 托管服务提供，未公开模型权重；Gemini API 型号仍以 preview 命名。",
      "noteEn": "Provided through Google's hosted services without released weights; the Gemini API variant retains its preview model name."
    },
    "gemini-omni-flash": {
      "status": "closed",
      "source": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/",
      "checkedAt": "2026-10-15",
      "note": "通过 Google 托管产品提供，未公开模型权重。",
      "noteEn": "Provided through Google's hosted products without released model weights."
    },
    "gemini-omni-1-1-flash": {
      "status": "closed",
      "source": "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/",
      "checkedAt": "2026-10-15",
      "note": "通过 Google 托管服务与 API 提供，未公开模型权重。",
      "noteEn": "Provided through Google's hosted services and APIs without released model weights."
    },
    "kling-1": {
      "status": "closed",
      "source": "https://ir.kuaishou.com/news-releases/news-release-details/kuaishou-unveils-proprietary-video-generation-model-kling",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "kling-2": {
      "status": "closed",
      "source": "https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-advances-20-era-empowering-everyone-tell-great-stories",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "kling-o1": {
      "status": "closed",
      "source": "https://ir.kuaishou.com/news-releases/news-release-details/kling-o1-launches-worlds-first-unified-multimodal-video-model-0/",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "kling-3": {
      "status": "closed",
      "source": "https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-launches-30-model-ushering-era-where-everyone-can-be",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "runway-gen-1": {
      "status": "closed",
      "source": "https://runway.com/research/gen-1",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "runway-gen-2": {
      "status": "closed",
      "source": "https://runway.com/research/gen-2",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "runway-gen-3-alpha": {
      "status": "closed",
      "source": "https://runway.com/research/introducing-gen-3-alpha",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "runway-gen-4": {
      "status": "closed",
      "source": "https://runway.com/research/introducing-runway-gen-4",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "runway-gen-4-5": {
      "status": "closed",
      "source": "https://runway.com/research/introducing-runway-gen-4.5",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "hailuo-01": {
      "status": "closed",
      "source": "https://www.minimax.io/news/Video-01",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "hailuo-02": {
      "status": "closed",
      "source": "https://www.minimax.io/news/minimax-hailuo-02",
      "checkedAt": "2026-10-15",
      "note": "通过官方产品或服务提供，未发布模型权重。",
      "noteEn": "Provided through official products or services; model weights have not been released."
    },
    "minimax-h3": {
      "status": "open",
      "source": "https://huggingface.co/MiniMaxAI/MiniMax-H3/raw/main/LICENSE",
      "checkedAt": "2026-10-15",
      "note": "开放基础模型权重，采用带地域与商业使用限制的社区许可证；2K 完整工作流还依赖官方 API。",
      "noteEn": "Base weights are available under a community license with territorial and commercial-use restrictions; the full 2K workflow also relies on official APIs.",
      "licenses": [
        {
          "object": "模型权重",
          "objectEn": "Model weights",
          "name": "MiniMax H3 Community License",
          "source": "https://huggingface.co/MiniMaxAI/MiniMax-H3/raw/main/LICENSE"
        }
      ]
    }
  });
  // End video-model access.
  // Model releases and weight availability reviewed on 2026-10-17.
  Object.assign(models, {
  "muse-spark-open": {
    "status": "open",
    "source": "https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B",
    "checkedAt": "2026-10-17",
    "note": "已开放该型号权重，适用附商业使用条件的 Muse Model License；其他 Muse 型号的开放状态独立记录。",
    "noteEn": "Weights for this model are available under the Muse Model License, which includes commercial-use conditions. Other Muse models have separate access status.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "Muse Model License",
        "source": "https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B/blob/main/LICENSE.md"
      }
    ]
  },
  "nemotron-3-5-vl-bolt": {
    "status": "open",
    "source": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4",
    "checkedAt": "2026-10-17",
    "note": "Super VL 与 Bolt 74B-A9B 权重均已公开，适用 OpenMDW 1.1；不包含尚未发布的 Bolt E4B。",
    "noteEn": "Super VL and Bolt 74B-A9B weights are available under OpenMDW 1.1. This does not include the unreleased Bolt E4B.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "OpenMDW 1.1",
        "source": "https://github.com/OpenMDW/OpenMDW/blob/main/1.1/LICENSE.OpenMDW-1.1"
      }
    ]
  },
  "reflection-beam-1": {
    "status": "open",
    "source": "https://huggingface.co/reflection/Beam-1.0-501B-A23B",
    "checkedAt": "2026-10-17",
    "note": "10 月 16 日开放权重，采用 Apache 2.0；保留 10 月 5 日首次公告日期。",
    "noteEn": "Weights were released on October 16 under Apache 2.0; the timeline retains the October 5 announcement date.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "Apache 2.0",
        "source": "https://huggingface.co/reflection/Beam-1.0-501B-A23B/blob/main/LICENSE"
      }
    ]
  },
  "kling-4": {
    "status": "closed",
    "source": "https://kling.ai/blog/kling40-kling-visual-realism-creative-control-introducing-storytelling",
    "checkedAt": "2026-10-17",
    "note": "通过官方产品提供，未发布模型权重；企业 API 在后续公告中仍为计划。",
    "noteEn": "Available through official products without public model weights; enterprise API access remains planned in the later announcement."
  },
  "step-5-preview": {
    "status": "open",
    "source": "https://huggingface.co/stepfun-ai/Step-5-Preview-NVFP4",
    "checkedAt": "2026-10-17",
    "note": "BF16、FP8 与 NVFP4 权重已公开，适用 StepFun Model License 1.0，附商业使用条件。",
    "noteEn": "BF16, FP8 and NVFP4 weights are available under StepFun Model License 1.0, which includes commercial-use conditions.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "StepFun Model License 1.0",
        "source": "https://huggingface.co/stepfun-ai/Step-5-Preview/blob/main/LICENSE.txt"
      }
    ]
  },
  "deepseek-v4-1-flash": {
    "status": "open",
    "source": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017",
    "checkedAt": "2026-10-17",
    "note": "原版与 1017 更新快照均开放权重；1017 快照采用 MIT 许可。",
    "noteEn": "Weights are available for the original model and the 1017 update; the 1017 checkpoint uses MIT.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "MIT",
        "source": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017/blob/main/LICENSE"
      }
    ]
  }
});
  Object.assign(models, {
  "flux-3-image-klein": {
    "status": "open",
    "source": "https://huggingface.co/black-forest-labs/flux-3-image-klein",
    "checkedAt": "2026-10-19",
    "note": "开放权重；许可允许非商业用途，并为年收入低于 500 万美元的合格用户规定商业输出生成例外，具体用途受许可条款约束。",
    "noteEn": "Open weights. The license allows non-commercial use and a commercial-output exception for qualifying users with annual revenue below US$5M, subject to its terms.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "FLUX Kommunity License v.1.0",
        "source": "https://huggingface.co/black-forest-labs/flux-3-image-klein/blob/main/LICENSE.md"
      }
    ]
  },
  "lfm-2-5-24b-a2b": {
    "status": "open",
    "source": "https://huggingface.co/LiquidAI/LFM2.5-24B-A2B",
    "checkedAt": "2026-10-19",
    "note": "开放权重，采用 LFM Open License v1.0；商业使用受年收入门槛条款约束，不能等同于 Apache 2.0 等无收入门槛许可。",
    "noteEn": "Open weights under the LFM Open License v1.0. Commercial use is subject to revenue-threshold terms; it is not equivalent to an unrestricted Apache 2.0 license.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "LFM Open License v1.0",
        "source": "https://huggingface.co/LiquidAI/LFM2.5-24B-A2B/blob/main/LICENSE"
      }
    ]
  }
});
  Object.assign(agents, {
  "manus-2": {
    "status": "closed",
    "checkedAt": "2026-10-19",
    "source": "https://manus.im/blog/introducing-manus-2-0",
    "note": "托管商业产品；公告未开放执行架构或客户端源码。",
    "noteEn": "A hosted commercial product; the announcement does not release the agent harness or client source."
  },
  "opencode-2": {
    "status": "open",
    "checkedAt": "2026-10-19",
    "source": "https://github.com/anomalyco/opencode/blob/v2.0.0/LICENSE",
    "note": "v2.0.0 源码与官方包采用 MIT 许可。",
    "noteEn": "The v2.0.0 source and official package use the MIT license."
  }
});
  Object.assign(models, {
  "dall-e": {
    "checkedAt": "2026-10-19",
    "status": "closed",
    "source": "https://github.com/openai/DALL-E",
    "note": "仅离散 VAE 开放；文生图 Transformer 及完整生成模型未开放，不将组件许可视为完整模型许可。",
    "noteEn": "Only the discrete VAE was released. The text-to-image Transformer and complete generator were not; the component license does not apply to the full model."
  },
  "dall-e-2": {
    "checkedAt": "2026-10-19",
    "status": "closed",
    "source": "https://github.com/openai/dalle-2-preview/blob/main/system-card.md",
    "note": "通过受限预览及后续托管服务提供，未开放生成模型权重。",
    "noteEn": "Provided through a limited preview and later hosted services; generator weights were not released."
  },
  "dall-e-3": {
    "checkedAt": "2026-10-19",
    "status": "closed",
    "source": "https://openai.com/index/dall-e-3-is-now-available-in-chatgpt-plus-and-enterprise/",
    "note": "通过 ChatGPT 及后续 API 提供，未开放模型权重。",
    "noteEn": "Provided through ChatGPT and the later API; model weights were not released."
  },
  "gpt-4o-image": {
    "checkedAt": "2026-10-19",
    "status": "closed",
    "source": "https://openai.com/index/image-generation-api/",
    "note": "通过 ChatGPT 与 API 提供，未开放图像生成模型权重。",
    "noteEn": "Provided through ChatGPT and the API; image-generator weights were not released."
  },
  "imagen": {
    "checkedAt": "2026-10-19",
    "status": "closed",
    "source": "https://imagen.research.google/",
    "note": "论文与示例公开，完整代码及生成模型权重未开放。",
    "noteEn": "The paper and examples are public; full code and generator weights were not released."
  },
  "imagen-3": {
    "checkedAt": "2026-10-19",
    "status": "closed",
    "source": "https://blog.google/innovation-and-ai/products/google-generative-ai-veo-imagen-3/",
    "note": "通过 ImageFX 和后续 Google 服务提供，完整生成模型权重未开放。",
    "noteEn": "Provided through ImageFX and later Google services; complete generator weights were not released."
  },
  "imagen-4": {
    "checkedAt": "2026-10-19",
    "status": "closed",
    "source": "https://cloud.google.com/blog/products/ai-machine-learning/announcing-veo-3-imagen-4-and-lyria-2-on-vertex-ai",
    "note": "以托管产品和 API 提供，未开放生成模型权重。",
    "noteEn": "Provided through hosted products and APIs; generator weights were not released."
  },
  "stable-diffusion-1": {
    "checkedAt": "2026-10-19",
    "status": "open",
    "source": "https://huggingface.co/CompVis/stable-diffusion-v1-4",
    "note": "权重与实现公开。CreativeML OpenRAIL-M 允许商用，但附使用范围与再分发要求。",
    "noteEn": "Weights and implementation are public. CreativeML OpenRAIL-M permits commercial use with use-based and redistribution conditions.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "CreativeML OpenRAIL-M",
        "source": "https://huggingface.co/spaces/CompVis/stable-diffusion-license/blob/main/license.txt"
      }
    ]
  },
  "sdxl-1": {
    "checkedAt": "2026-10-19",
    "status": "open",
    "source": "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0",
    "note": "基础与精修模型权重公开，CreativeML OpenRAIL++-M 允许商用并附使用范围限制。",
    "noteEn": "Base and refiner weights are public under CreativeML OpenRAIL++-M, permitting commercial use with use-based restrictions.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "CreativeML OpenRAIL++-M",
        "source": "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/LICENSE.md"
      }
    ]
  },
  "flux-1-open": {
    "checkedAt": "2026-10-19",
    "status": "open",
    "source": "https://bfl.ai/blog/24-08-01-bfl",
    "note": "仅记录开放的 dev / schnell 权重。dev 的模型使用受非商业许可约束，生成结果另有授权；schnell 采用 Apache 2.0。同系列 pro 为 API 闭源服务。",
    "noteEn": "Covers the public dev / schnell weights only. Dev model use is subject to a non-commercial license, with separate output permissions; schnell uses Apache 2.0. The pro variant is a closed API service.",
    "licenses": [
      {
        "object": "dev 模型权重",
        "objectEn": "dev model weights",
        "name": "FLUX.1 [dev] Non-Commercial License",
        "source": "https://huggingface.co/black-forest-labs/FLUX.1-dev/blob/main/LICENSE.md"
      },
      {
        "object": "schnell 模型权重",
        "objectEn": "schnell model weights",
        "name": "Apache 2.0",
        "source": "https://github.com/black-forest-labs/flux/blob/main/model_licenses/LICENSE-FLUX1-schnell"
      }
    ]
  },
  "flux-1-kontext-dev": {
    "checkedAt": "2026-10-19",
    "status": "open",
    "source": "https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev",
    "note": "dev 权重公开，模型使用受 FLUX.1 非商业许可约束，生成结果另有授权；pro / max API 不在此开放范围内。",
    "noteEn": "Dev weights are public under the FLUX.1 non-commercial license, with separate output permissions. The pro / max APIs are outside this open-weight scope.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "FLUX.1 [dev] Non-Commercial License",
        "source": "https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev/blob/main/LICENSE.md"
      }
    ]
  },
  "midjourney-v6": {
    "checkedAt": "2026-10-19",
    "status": "closed",
    "source": "https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service",
    "note": "通过托管服务提供，模型权重未公开。",
    "noteEn": "Available through a hosted service; model weights are not public."
  },
  "qwen-image": {
    "checkedAt": "2026-10-19",
    "status": "open",
    "source": "https://huggingface.co/Qwen/Qwen-Image",
    "note": "模型权重采用 Apache 2.0 许可。",
    "noteEn": "Model weights use the Apache 2.0 license.",
    "licenses": [
      {
        "object": "模型权重",
        "objectEn": "Model weights",
        "name": "Apache 2.0",
        "source": "https://huggingface.co/Qwen/Qwen-Image/blob/main/LICENSE"
      }
    ]
  },
  "seedream-4": {
    "checkedAt": "2026-10-19",
    "status": "closed",
    "source": "https://seed.bytedance.com/en/blog/seedream-4-0-officially-released-beyond-drawing-into-imagination",
    "note": "通过产品与 API 提供，模型权重未公开。",
    "noteEn": "Available through products and APIs; model weights are not public."
  }
});
  Object.assign(models, {
  "minimax-m3-1-flash": {
    "checkedAt": "2026-10-20",
    "status": "closed",
    "source": "https://www.minimax.io/blog/minimax-m31f",
    "note": "通过 API、M Plan 和 MiniMax Code 提供；官方称权重将稍后发布，截至 2026 年 10 月 20 日未确认公开权重。",
    "noteEn": "Available through the API, M Plan and MiniMax Code. The announcement says weights will follow; no public weights were confirmed as of October 20, 2026."
  },
  "mercury-3": {
    "checkedAt": "2026-10-20",
    "status": "closed",
    "source": "https://docs.inceptionlabs.ai/get-started/models",
    "note": "通过托管 API 提供，未发布可下载权重。",
    "noteEn": "Available through hosted APIs; downloadable weights have not been released."
  }
});
  Object.assign(agents, {
  "grok-build": {
    "status": "open",
    "checkedAt": "2026-10-20",
    "source": "https://github.com/xai-org/grok-build/blob/main/LICENSE",
    "note": "工具源码于 2026 年 7 月 15 日开放，采用 Apache-2.0；连接的模型和托管服务适用各自条款。",
    "noteEn": "The tool source was opened on July 15, 2026 under Apache-2.0. Connected models and hosted services retain their own terms.",
    "licenses": [
      {
        "object": "工具代码",
        "objectEn": "Tool code",
        "name": "Apache 2.0",
        "source": "https://github.com/xai-org/grok-build/blob/main/LICENSE"
      }
    ]
  },
  "replit-agent-4": {
    "status": "closed",
    "checkedAt": "2026-10-20",
    "source": "https://replit.com/blog/introducing-agent-4-built-for-creativity",
    "note": "Replit 托管商业产品；可访问生成的项目代码不代表 Agent 平台源码开放。",
    "noteEn": "A hosted Replit product. Access to generated project code does not make the agent platform open source."
  }
});
  const apply = (dataset, metadata) => Object.freeze({
    ...dataset, opennessCheckedAt: checkedAt, updatedAt: [dataset.updatedAt || dataset.asOf, checkedAt].sort().at(-1),
    releases: dataset.releases.map(release => {
      if (!['open', 'closed'].includes(metadata[release.id]?.status)) throw new Error(`Missing access classification: ${release.id}`);
      return { ...release, openness: { source: release.sources[0].url, checkedAt, ...metadata[release.id] } };
    }),
  });
  window.MODEL_ATLAS = apply(window.MODEL_ATLAS, models);
  window.AGENT_ATLAS = apply(window.AGENT_ATLAS, agents);
  window.ATLAS_ACCESS = { checkedAt, models, agents };
})();
