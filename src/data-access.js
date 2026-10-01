/* Access is maintained per release, never inferred from its organization or tags.
 * Snapshot: 2026-09-30. This describes the referenced model/tool, not the license
 * of its dependencies. Later weight releases do not change timeline dates.
 */
(() => {
  'use strict';
  const checkedAt = '2026-09-30';
  const models = {};
  const agents = {};
  const add = (target, status, ids) => ids.trim().split(/\s+/).forEach(id => {
    if (target[id]) throw new Error(`Duplicate access classification: ${id}`);
    target[id] = { status };
  });
  add(models, 'open', 'transformer llama-1 grok-1 qwen-3-8-flash qwen-3-8-max');
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
    glm-5-3-flash hunyuan-hy4-preview deepseek-v4-1-flash mimo-v2-6
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
    gpt-6-astra kimi-k2-8-preview qwen-3-8-omni-flash step-5-preview grok-4-7 claude-opus-5-5
    gpt-6-sol-luna claude-sonnet-5-5
  `);

  add(models, 'closed', 'gpt-6-1-sol gemini-4-argon');
  for (const id of ['gpt-6-1-sol', 'gemini-4-argon']) models[id].checkedAt = '2026-10-01';

  const modelSources = {
    transformer: 'https://github.com/tensorflow/tensor2tensor',
    'grok-1': 'https://x.ai/news/grok-os',
    'qwen-3-8-flash': 'https://huggingface.co/Qwen/Qwen3.8-Flash-Next',
    'qwen-3-8-max': 'https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B',
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
  note(models, 'step-5-preview', '截至核对日仅有预览服务；计划开放不视为已经开放。', 'Only the preview service is available at the review date; a planned weight release is not a completed release.');
  note(models, 'qwen-3-8-flash', '官方确认 Flash 基于开放权重 Flash-Next；托管服务另有上下文和工具配置。', 'The official model card identifies Flash as based on the open Flash-Next checkpoint. Hosted context and tool configurations differ.');
  note(models, 'qwen-3-8-max', '开源指官方公开的 Qwen3.8-2.4T-A95B 基础版本；Max 托管服务另有多模态和工具配置。', 'Open source refers to the official Qwen3.8-2.4T-A95B checkpoint underlying Max. Hosted multimodal and tool configurations differ.');
  note(models, 'qwen-3-8-max-0902', '此节点记录 0902 托管服务更新；已公开的初始基础版本单独收录。', 'This entry covers the 0902 hosted update. The initially released base checkpoint is recorded separately.');

  add(agents, 'open', `
    autogpt-0-2 aider autogen langgraph swe-agent openhands cline-2 mcp roo-code-3 smolagents
    goose openai-agents-sdk google-adk codex-cli strands-agents gemini-cli qwen-code deep-agents
    claude-agent-sdk crewai-1 opencode-1 pi-agent kimi-cli-1 openclaw hermes-agent deepseek-harness agent-skills
  `);
  add(agents, 'closed', `
    devin replit-agent windsurf cursor-agent operator deep-research claude-code codex-cloud
    copilot-coding-agent jules warp-2 kiro chatgpt-agent trae-solo qoder manus-1-5 kiro-cli
    google-antigravity kiro-autonomous cowork codex-app workbuddy cowork-unified
  `);
  const agentSources = {
    'autogpt-0-2': 'https://github.com/Significant-Gravitas/AutoGPT/tree/v0.2.0',
    aider: 'https://github.com/Aider-AI/aider',
    autogen: 'https://github.com/microsoft/autogen',
    langgraph: 'https://github.com/langchain-ai/langgraph',
    'swe-agent': 'https://github.com/SWE-agent/SWE-agent',
    openhands: 'https://github.com/OpenHands/OpenHands',
    'cline-2': 'https://github.com/cline/cline/tree/v2.0.0',
    mcp: 'https://github.com/modelcontextprotocol/specification',
    'roo-code-3': 'https://github.com/RooCodeInc/Roo-Code/tree/v3.0.0',
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
