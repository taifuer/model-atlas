/* Shared page metadata for browser navigation and static language editions. */
(() => {
  'use strict';
  const seo = {
    models: {
      zh: {
        title: '大模型发布时间线 · Model Atlas',
        description: '查阅主流语言模型与多模态模型的代表性发布，涵盖 GPT、Claude、Gemini、Llama 等系列。按机构、年份和类型筛选，查看公开来源，以及已核实的上下文长度、API 价格与评测分数。',
        keywords: ['大模型时间线', '语言模型', '多模态模型', '模型发布', '上下文长度', 'API 价格'],
      },
      en: {
        title: 'AI Model Release Timeline · Model Atlas',
        description: 'Browse major language and multimodal model releases, with source links and verified context limits, API prices and benchmark scores for documented versions.',
        keywords: ['AI model timeline', 'language models', 'multimodal models', 'model releases', 'context window', 'API pricing'],
      },
    },
    agents: {
      zh: {
        title: '智能体工具时间线 · Model Atlas',
        description: '回顾编程智能体、通用助手与智能体开发工具的代表性发布，涵盖 IDE、命令行、云端任务与执行框架。按机构、年份和类型筛选，查阅事件日期、开放状态和公开来源。',
        keywords: ['智能体时间线', '编程智能体', 'Claude Code', 'Codex', 'Cursor', '智能体框架'],
      },
      en: {
        title: 'AI Agent Tools Timeline · Model Atlas',
        description: 'Follow key releases of coding agents, general assistants and agent frameworks across IDEs, terminals and cloud services, with event dates and public sources.',
        keywords: ['AI agent timeline', 'coding agents', 'Claude Code', 'Codex', 'Cursor', 'agent frameworks'],
      },
    },
    hardware: {
      zh: {
        title: 'AI 算力硬件时间线 · Model Atlas',
        description: '浏览数据中心 GPU、专用加速器、算力系统及本地与边缘设备的代表性节点。区分产品公布、公开展示、正式供应与商用记录，并查阅已核实的硬件规格、配置和来源。',
        keywords: ['AI 硬件时间线', 'GPU', 'TPU', '昇腾', 'AI 加速器', '算力系统'],
      },
      en: {
        title: 'AI Hardware Timeline · Model Atlas',
        description: 'Browse GPUs, AI accelerators, compute systems and edge devices. Distinguish announcements from availability and deployment, with documented hardware specifications.',
        keywords: ['AI hardware timeline', 'GPU releases', 'TPU', 'Ascend', 'AI accelerators', 'compute systems'],
      },
    },
    technology: {
      zh: {
        title: 'AI 技术发展时间线 · Model Atlas',
        description: '梳理 AI 基础方法、训练框架、推理部署与智能体基础设施的代表性进展，涵盖 Transformer、CUDA、PyTorch 等论文与项目。按时间查阅技术摘要、日期说明和原始资料。',
        keywords: ['AI 技术时间线', 'Transformer', '深度学习', '训练框架', '推理部署', '智能体基础设施'],
      },
      en: {
        title: 'AI Technology Timeline · Model Atlas',
        description: 'Trace notable AI methods, training frameworks, inference systems and agent infrastructure through papers and project releases, with dates and original sources.',
        keywords: ['AI technology timeline', 'Transformer', 'deep learning', 'training frameworks', 'inference deployment', 'agent infrastructure'],
      },
    },
    explore: {
      zh: {
        title: '探索 AI 发布与技术进展 · Model Atlas',
        description: '按时间从旧到新浏览大模型、智能体、算力硬件与关键技术的完整事件流。自动逐条高亮摘要，随时暂停、调整速度或跳转年份；搜索定位匹配事件，全部记录始终可见。',
        keywords: ['AI 时间线探索', 'AI 历史', '自动播放时间线', '大模型', '智能体', '算力硬件', 'AI 技术'],
      },
      en: {
        title: 'Explore AI Releases and Milestones · Model Atlas',
        description: 'Follow every model, agent, hardware and AI technology event from oldest to newest. Autoplay highlights each summary; pause, change speed or jump to a year. Search locates matches while all events stay visible.',
        keywords: ['AI timeline explorer', 'AI history', 'timeline autoplay', 'language models', 'AI agents', 'AI hardware', 'AI technology'],
      },
    },
    about: {
      zh: {
        title: '关于与收录标准 · Model Atlas',
        description: '了解 Model Atlas 的收录标准、日期约定和资料核验方法，以及开放状态、模型规格、API 价格与评测分数的记录口径。查阅参考榜单、数据维护方式与项目说明。',
        keywords: ['Model Atlas', '收录标准', '数据来源', '评测口径', '数据维护'],
      },
      en: {
        title: 'About and Selection Criteria · Model Atlas',
        description: 'Read the selection criteria, date conventions and source-review methods behind Model Atlas, including how model access, specifications, prices and scores are recorded.',
        keywords: ['Model Atlas', 'selection criteria', 'data sources', 'benchmark methodology', 'data maintenance'],
      },
    },
  };
  if (typeof window !== 'undefined') window.ATLAS_SEO = seo;
  if (typeof module !== 'undefined' && module.exports) module.exports = seo;
})();
