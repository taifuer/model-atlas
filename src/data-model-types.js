// Input-modality classifications are reviewed per release, not inferred from company or family names.
(() => {
  const data = {
  "checkedAt": "2026-10-03",
  "entries": {
    "mistral-large-4-preview": {
      "checkedAt": "2026-10-08",
      "category": "multimodal",
      "sources": [
        "https://mistral.ai/news/mistral-large-4/",
        "https://docs.mistral.ai/models/mistral-large-4-0"
      ]
    },
    "claude-haiku-5-5": {
      "checkedAt": "2026-10-08",
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/overview"
      ]
    },
    "gpt-6-sol-luna-chatgpt-october": {
      "checkedAt": "2026-10-08",
      "category": "multimodal",
      "sources": [
        "https://deploymentsafety.openai.com/gpt-6-october"
      ]
    },
    "transformer": {
      "category": "text",
      "sources": [
        "https://arxiv.org/abs/1706.03762"
      ],
      "note": "按论文中的文本翻译配置分类；Transformer 架构本身也可用于其他模态。",
      "noteEn": "Classified by the paper’s text-translation configuration. The architecture can also support other modalities."
    },
    "gpt-1": {
      "category": "text",
      "sources": [
        "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf"
      ]
    },
    "bert": {
      "category": "text",
      "sources": [
        "https://github.com/google-research/bert"
      ]
    },
    "gpt-2": {
      "category": "text",
      "sources": [
        "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
      ]
    },
    "t5": {
      "category": "text",
      "sources": [
        "https://arxiv.org/abs/1910.10683"
      ]
    },
    "gpt-3": {
      "category": "text",
      "sources": [
        "https://arxiv.org/abs/2005.14165"
      ]
    },
    "codex": {
      "category": "text",
      "sources": [
        "https://openai.com/index/openai-codex/"
      ]
    },
    "instructgpt": {
      "category": "text",
      "sources": [
        "https://openai.com/index/instruction-following/"
      ]
    },
    "palm": {
      "category": "text",
      "sources": [
        "https://research.google/blog/pathways-language-model-palm-scaling-to-540-billion-parameters-for-breakthrough-performance/"
      ]
    },
    "chatgpt": {
      "category": "text",
      "sources": [
        "https://openai.com/index/chatgpt/"
      ],
      "note": "对应 2022 年基于 GPT-3.5 的文本对话首发，后续 ChatGPT 产品能力另计。",
      "noteEn": "Refers to the original 2022 GPT-3.5 text-chat launch, rather than later ChatGPT product capabilities."
    },
    "llama-1": {
      "category": "text",
      "sources": [
        "https://ai.meta.com/blog/large-language-model-llama-meta-ai/"
      ]
    },
    "claude-1": {
      "category": "text",
      "sources": [
        "https://www.anthropic.com/news/introducing-claude"
      ]
    },
    "gpt-4": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-4",
        "https://openai.com/index/gpt-4-research/"
      ],
      "note": "按首发研究公布的文本与图像能力分类；最初开放的文本 API 与视觉研究预览范围不同。",
      "noteEn": "Classified by the text and image capabilities announced in the research release. Initial text API access and the vision research preview had different scopes."
    },
    "claude-2": {
      "category": "text",
      "sources": [
        "https://www.anthropic.com/news/claude-2"
      ]
    },
    "llama-2": {
      "category": "text",
      "sources": [
        "https://huggingface.co/meta-llama/Llama-2-7b-hf"
      ]
    },
    "qwen-7b": {
      "category": "text",
      "sources": [
        "https://github.com/QwenLM/Qwen"
      ]
    },
    "mistral-7b": {
      "category": "text",
      "sources": [
        "https://huggingface.co/mistralai/Mistral-7B-v0.1",
        "https://mistral.ai/news/announcing-mistral-7b/"
      ]
    },
    "grok-1": {
      "category": "text",
      "sources": [
        "https://x.ai/news/grok"
      ]
    },
    "gpt-4-turbo": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-4-turbo"
      ]
    },
    "gemini-1": {
      "category": "multimodal",
      "sources": [
        "https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/"
      ]
    },
    "mixtral-8x7b": {
      "category": "text",
      "sources": [
        "https://mistral.ai/news/mixtral-of-experts/"
      ]
    },
    "gemini-1-5": {
      "category": "multimodal",
      "sources": [
        "https://blog.google/innovation-and-ai/products/google-gemini-next-generation-model-february-2024/"
      ]
    },
    "gemma-1": {
      "category": "text",
      "sources": [
        "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-open-models/"
      ]
    },
    "claude-3": {
      "category": "multimodal",
      "sources": [
        "https://www.anthropic.com/news/claude-3-family"
      ]
    },
    "llama-3": {
      "category": "text",
      "sources": [
        "https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct"
      ]
    },
    "phi-3": {
      "category": "text",
      "sources": [
        "https://huggingface.co/microsoft/Phi-3-mini-128k-instruct"
      ],
      "note": "对应 2024 年 4 月首发的文本型号，不包含后来发布的 Phi-3-Vision。",
      "noteEn": "Covers the text models launched in April 2024, excluding the later Phi-3-Vision."
    },
    "deepseek-v2": {
      "category": "text",
      "sources": [
        "https://huggingface.co/deepseek-ai/DeepSeek-V2"
      ]
    },
    "gpt-4o": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-4o"
      ]
    },
    "qwen-2": {
      "category": "text",
      "sources": [
        "https://qwenlm.github.io/blog/qwen2/"
      ],
      "note": "对应 Qwen2 文本系列首发，不包含之后独立发布的 Qwen2-VL / Audio。",
      "noteEn": "Covers the Qwen2 text-model launch, excluding the separately released Qwen2-VL and Audio."
    },
    "claude-3-5": {
      "category": "multimodal",
      "sources": [
        "https://www.anthropic.com/news/claude-3-5-sonnet"
      ]
    },
    "gemma-2": {
      "category": "text",
      "sources": [
        "https://blog.google/innovation-and-ai/technology/developers-tools/google-gemma-2/"
      ]
    },
    "gpt-4o-mini": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-4o-mini"
      ]
    },
    "llama-3-1": {
      "category": "text",
      "sources": [
        "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct"
      ]
    },
    "mistral-large-2": {
      "category": "text",
      "sources": [
        "https://mistral.ai/news/mistral-large-2407/"
      ]
    },
    "o1-preview": {
      "category": "text",
      "sources": [
        "https://developers.openai.com/api/docs/models/o1-preview"
      ]
    },
    "qwen-2-5": {
      "category": "text",
      "sources": [
        "https://qwenlm.github.io/blog/qwen2.5/"
      ],
      "note": "对应 Qwen2.5 文本系列；Qwen2.5-VL 为另行发布的视觉系列。",
      "noteEn": "Covers Qwen2.5 text models; Qwen2.5-VL is a separately released vision series."
    },
    "llama-3-2": {
      "category": "multimodal",
      "sources": [
        "https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/"
      ],
      "note": "家族节点包含 11B / 90B 视觉型号；1B / 3B 仍为文本模型。",
      "noteEn": "The family includes 11B and 90B vision models; the 1B and 3B models are text-only."
    },
    "amazon-nova": {
      "category": "multimodal",
      "sources": [
        "https://aws.amazon.com/about-aws/whats-new/2024/12/amazon-nova-foundation-models-bedrock/"
      ],
      "note": "家族中的 Lite / Pro 支持图像与视频输入，Micro 为文本模型。",
      "noteEn": "Lite and Pro support image and video input; Micro is text-only."
    },
    "o1": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/o1"
      ]
    },
    "llama-3-3": {
      "category": "text",
      "sources": [
        "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct"
      ]
    },
    "gemini-2": {
      "category": "multimodal",
      "sources": [
        "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/google-gemini-ai-update-december-2024/"
      ]
    },
    "phi-4": {
      "category": "text",
      "sources": [
        "https://huggingface.co/microsoft/phi-4"
      ]
    },
    "deepseek-v3": {
      "category": "text",
      "sources": [
        "https://huggingface.co/deepseek-ai/DeepSeek-V3"
      ]
    },
    "deepseek-r1": {
      "category": "text",
      "sources": [
        "https://huggingface.co/deepseek-ai/DeepSeek-R1"
      ]
    },
    "o3-mini": {
      "category": "text",
      "sources": [
        "https://developers.openai.com/api/docs/models/o3-mini"
      ]
    },
    "grok-3": {
      "category": "multimodal",
      "sources": [
        "https://x.ai/news/grok-3"
      ],
      "note": "按首发文章展示的多模态能力分类；Grok 3 API 的输入范围另以具体端点文档为准。",
      "noteEn": "Classified by the multimodal capabilities shown at launch. Input support for a Grok 3 API endpoint is specified separately in its documentation."
    },
    "claude-3-7": {
      "category": "multimodal",
      "sources": [
        "https://www.anthropic.com/news/claude-3-7-sonnet"
      ]
    },
    "gpt-4-5": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-4.5-preview"
      ]
    },
    "gemma-3": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/google/gemma-3-27b-it"
      ],
      "note": "家族中 4B、12B、27B 支持图像输入，1B 为文本模型。",
      "noteEn": "The 4B, 12B, and 27B models accept images; 1B is text-only."
    },
    "hunyuan-t1": {
      "category": "text",
      "sources": [
        "https://cloud.tencent.com/product/events/detail/6702"
      ]
    },
    "gemini-2-5": {
      "category": "multimodal",
      "sources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-2.5-pro"
      ]
    },
    "llama-4": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct"
      ]
    },
    "gpt-4-1": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-4.1"
      ]
    },
    "o3-o4-mini": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/o4-mini",
        "https://developers.openai.com/api/docs/models/o3"
      ]
    },
    "qwen-3": {
      "category": "text",
      "sources": [
        "https://huggingface.co/Qwen/Qwen3-235B-A22B"
      ]
    },
    "mistral-medium-3": {
      "category": "multimodal",
      "sources": [
        "https://mistral.ai/news/mistral-medium-3/"
      ]
    },
    "claude-4": {
      "category": "multimodal",
      "sources": [
        "https://www.anthropic.com/news/claude-4",
        "https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-sonnet-4.html"
      ]
    },
    "deepseek-r1-0528": {
      "category": "text",
      "sources": [
        "https://api-docs.deepseek.com/news/news250528/"
      ]
    },
    "minimax-m1": {
      "category": "text",
      "sources": [
        "https://huggingface.co/MiniMaxAI/MiniMax-M1-80k"
      ]
    },
    "grok-4": {
      "category": "multimodal",
      "sources": [
        "https://x.ai/news/grok-4"
      ]
    },
    "kimi-k2": {
      "category": "text",
      "sources": [
        "https://huggingface.co/moonshotai/Kimi-K2-Instruct",
        "https://platform.kimi.ai/blog/posts/changelog"
      ]
    },
    "qwen-3-coder": {
      "category": "text",
      "sources": [
        "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct"
      ]
    },
    "glm-4-5": {
      "category": "text",
      "sources": [
        "https://docs.z.ai/guides/llm/glm-4.5"
      ]
    },
    "claude-opus-4-1": {
      "category": "multimodal",
      "sources": [
        "https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-opus-4-1.html"
      ]
    },
    "gpt-oss": {
      "category": "text",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-oss-120b",
        "https://developers.openai.com/api/docs/models/gpt-oss-20b"
      ]
    },
    "gpt-5": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-5"
      ]
    },
    "deepseek-v3-1": {
      "category": "text",
      "sources": [
        "https://huggingface.co/deepseek-ai/DeepSeek-V3.1"
      ]
    },
    "qwen-3-next": {
      "category": "text",
      "sources": [
        "https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct"
      ]
    },
    "claude-sonnet-4-5": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/sonnet-4-5/overview"
      ]
    },
    "glm-4-6": {
      "category": "text",
      "sources": [
        "https://docs.z.ai/guides/llm/glm-4.6"
      ]
    },
    "claude-haiku-4-5": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/haiku-4-5/overview"
      ]
    },
    "minimax-m2": {
      "category": "text",
      "sources": [
        "https://platform.minimax.io/docs/guides/models-intro"
      ]
    },
    "kimi-k2-thinking": {
      "category": "text",
      "sources": [
        "https://huggingface.co/moonshotai/Kimi-K2-Thinking",
        "https://www.kimi.com/en/blog/kimi-k2-thinking"
      ]
    },
    "gpt-5-1": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-5.1"
      ]
    },
    "gemini-3": {
      "category": "multimodal",
      "sources": [
        "https://blog.google/products-and-platforms/products/gemini/gemini-3/"
      ]
    },
    "claude-opus-4-5": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/opus-4-5/overview"
      ]
    },
    "deepseek-v3-2": {
      "category": "text",
      "sources": [
        "https://api-docs.deepseek.com/updates/#date-2025-12-01"
      ]
    },
    "mistral-3": {
      "category": "multimodal",
      "sources": [
        "https://mistral.ai/news/mistral-3/"
      ]
    },
    "nova-2-lite": {
      "category": "multimodal",
      "sources": [
        "https://aws.amazon.com/blogs/aws/introducing-amazon-nova-2-lite-a-fast-cost-effective-reasoning-model/"
      ]
    },
    "gpt-5-2": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-5.2"
      ]
    },
    "nemotron-3-nano": {
      "category": "text",
      "sources": [
        "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16"
      ]
    },
    "mimo-v2-flash": {
      "category": "text",
      "sources": [
        "https://huggingface.co/XiaomiMiMo/MiMo-V2-Flash",
        "https://mimo.xiaomi.com/blog"
      ]
    },
    "gemini-3-flash": {
      "category": "multimodal",
      "sources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-3-flash-preview"
      ]
    },
    "glm-4-7": {
      "category": "text",
      "sources": [
        "https://docs.z.ai/guides/llm/glm-4.7"
      ]
    },
    "minimax-m2-1": {
      "category": "text",
      "sources": [
        "https://platform.minimax.io/docs/guides/models-intro"
      ]
    },
    "glm-4-7-flash": {
      "category": "text",
      "sources": [
        "https://docs.z.ai/guides/llm/glm-4.7"
      ]
    },
    "kimi-k2-5": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/moonshotai/Kimi-K2.5",
        "https://www.kimi.com/en/blog/kimi-k2-5"
      ]
    },
    "step-3-5-flash": {
      "category": "text",
      "sources": [
        "https://huggingface.co/stepfun-ai/Step-3.5-Flash"
      ]
    },
    "claude-opus-4-6": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/opus-4-6/overview"
      ]
    },
    "gpt-5-3-codex": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-5.3-codex"
      ]
    },
    "glm-5": {
      "category": "text",
      "sources": [
        "https://docs.z.ai/guides/llm/glm-5"
      ]
    },
    "gpt-5-3-codex-spark": {
      "category": "text",
      "sources": [
        "https://openai.com/index/introducing-gpt-5-3-codex-spark/"
      ]
    },
    "minimax-m2-5": {
      "category": "text",
      "sources": [
        "https://platform.minimax.io/docs/guides/models-intro"
      ]
    },
    "seed-2": {
      "category": "multimodal",
      "sources": [
        "https://seed.bytedance.com/en/blog/seed-2-0-official-launch"
      ]
    },
    "qwen-3-5": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/Qwen/Qwen3.5-397B-A17B"
      ]
    },
    "claude-sonnet-4-6": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/sonnet-4-6/overview"
      ]
    },
    "gemini-3-1": {
      "category": "multimodal",
      "sources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview"
      ]
    },
    "gpt-5-4": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-5.4"
      ]
    },
    "nemotron-3-super": {
      "category": "text",
      "sources": [
        "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16"
      ]
    },
    "mistral-small-4": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/mistralai/Mistral-Small-4-119B-2603"
      ]
    },
    "mimo-v2-pro": {
      "category": "multimodal",
      "sources": [
        "https://mimo.mi.com/docs/en-US/updates/model"
      ],
      "note": "该家族节点合并 Pro 与 Omni；多模态能力来自同日公布的 Omni 型号。",
      "noteEn": "This family entry groups Pro and Omni. Multimodal support comes from the Omni model announced the same day."
    },
    "minimax-m2-7": {
      "category": "text",
      "sources": [
        "https://platform.minimax.io/docs/guides/models-intro"
      ]
    },
    "gemma-4": {
      "category": "multimodal",
      "sources": [
        "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/"
      ]
    },
    "glm-5-1": {
      "category": "text",
      "sources": [
        "https://docs.z.ai/guides/llm/glm-5.1"
      ]
    },
    "muse-spark": {
      "category": "multimodal",
      "sources": [
        "https://ai.meta.com/blog/introducing-muse-spark-msl/"
      ]
    },
    "claude-opus-4-7": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/opus-4-7/overview"
      ]
    },
    "qwen-3-6-max-preview": {
      "category": "text",
      "sources": [
        "https://www.qwencloud.com/models/qwen3.6-max-preview"
      ]
    },
    "gpt-5-5": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-5.5"
      ]
    },
    "mimo-v2-5": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/XiaomiMiMo/MiMo-V2.5",
        "https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro"
      ],
      "note": "家族中的 MiMo-V2.5 支持图像、视频和音频输入；Pro 为文本模型。",
      "noteEn": "Within this family, MiMo-V2.5 accepts images, video, and audio; Pro is a text model."
    },
    "deepseek-v4": {
      "category": "text",
      "sources": [
        "https://api-docs.deepseek.com/news/news260424/"
      ]
    },
    "gemini-3-5-flash": {
      "category": "multimodal",
      "sources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash"
      ]
    },
    "qwen-3-7-max": {
      "category": "text",
      "sources": [
        "https://docs.qwencloud.com/changelog/models"
      ],
      "note": "对应 5 月首发的文本快照；6 月 8 日快照后来新增视觉能力。",
      "noteEn": "Covers the original May text snapshot. The June 8 snapshot later adds vision."
    },
    "mistral-medium-3-5": {
      "category": "multimodal",
      "sources": [
        "https://mistral.ai/news/vibe-remote-agents-mistral-medium-3-5/"
      ]
    },
    "claude-opus-4-8": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/opus-4-8/overview"
      ]
    },
    "step-3-7-flash": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/stepfun-ai/Step-3.7-Flash"
      ]
    },
    "minimax-m3": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/MiniMaxAI/MiniMax-M3"
      ]
    },
    "claude-fable-5": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/fable-5/overview"
      ]
    },
    "kimi-k2-7-code": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/moonshotai/Kimi-K2.7-Code",
        "https://www.kimi.com/code/docs/en/kimi-code/whats-new.html"
      ]
    },
    "glm-5-2": {
      "category": "text",
      "sources": [
        "https://docs.z.ai/guides/llm/glm-5.2"
      ]
    },
    "claude-sonnet-5": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/sonnet-5/overview"
      ]
    },
    "hunyuan-hy3": {
      "category": "text",
      "sources": [
        "https://huggingface.co/tencent/Hy3"
      ]
    },
    "gpt-5-6": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-5.6"
      ]
    },
    "muse-spark-1-1": {
      "category": "multimodal",
      "sources": [
        "https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/"
      ]
    },
    "grok-4-5": {
      "category": "multimodal",
      "sources": [
        "https://docs.x.ai/developers/models/grok-4.5"
      ]
    },
    "kimi-k3": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/moonshotai/Kimi-K3"
      ]
    },
    "gemini-3-6-flash": {
      "category": "multimodal",
      "sources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash"
      ]
    },
    "claude-opus-5": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/opus-5/overview"
      ]
    },
    "qwen-3-8-max": {
      "category": "multimodal",
      "sources": [
        "https://www.qwencloud.com/models/qwen3.8-max"
      ]
    },
    "grok-4-6": {
      "category": "multimodal",
      "sources": [
        "https://docs.x.ai/developers/models/grok-4.6"
      ]
    },
    "qwen-3-8": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B",
        "https://huggingface.co/Qwen/Qwen3.8-27B"
      ],
      "note": "多模态标签对应 8 月 14 日加入的 27B 视觉语言型号；8 月 12 日首发的 2.4T-A95B 为文本模型。",
      "noteEn": "The multimodal label refers to the 27B vision-language model added on August 14. The 2.4T-A95B model released on August 12 is text-only."
    },
    "deepseek-v4-pro-0813": {
      "category": "text",
      "sources": [
        "https://api-docs.deepseek.com/quick_start/pricing"
      ]
    },
    "gemini-3-7-flash": {
      "category": "multimodal",
      "sources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash"
      ]
    },
    "glm-5-3": {
      "category": "text",
      "sources": [
        "https://docs.z.ai/guides/llm/glm-5.3"
      ]
    },
    "glm-5-3-flash": {
      "category": "multimodal",
      "sources": [
        "https://docs.z.ai/release-notes/new-released"
      ]
    },
    "qwen-3-8-flash": {
      "category": "multimodal",
      "sources": [
        "https://www.qwencloud.com/models/qwen3.8-flash"
      ]
    },
    "hunyuan-hy4-preview": {
      "category": "text",
      "sources": [
        "https://huggingface.co/tencent/Hy4-preview"
      ]
    },
    "claude-fable-5-1": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/fable-5-1/overview"
      ]
    },
    "gemini-3-8-flash": {
      "category": "multimodal",
      "sources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash"
      ]
    },
    "muse-spark-1-3": {
      "category": "multimodal",
      "sources": [
        "https://dev.meta.ai/docs/models"
      ]
    },
    "qwen-3-8-max-0902": {
      "category": "multimodal",
      "sources": [
        "https://docs.qwencloud.com/changelog/model-updates/qwen3.8-max-upgrade"
      ]
    },
    "gpt-6-astra": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-6-astra"
      ]
    },
    "deepseek-v4-1-flash": {
      "checkedAt": "2026-10-17",
      "category": "multimodal",
      "sources": [
        "https://api-docs.deepseek.com/quick_start/pricing/",
        "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017"
      ]
    },
    "kimi-k2-8-preview": {
      "category": "multimodal",
      "sources": [
        "https://www.kimi.com/code/docs/en/kimi-code/models.html"
      ]
    },
    "qwen-3-8-omni-flash": {
      "category": "multimodal",
      "sources": [
        "https://docs.qwencloud.com/changelog/models"
      ]
    },
    "step-5-preview": {
      "checkedAt": "2026-10-17",
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/stepfun-ai/Step-5-Preview-NVFP4"
      ]
    },
    "grok-4-7": {
      "category": "multimodal",
      "sources": [
        "https://docs.x.ai/developers/models/grok-4.7"
      ]
    },
    "claude-opus-5-5": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/opus-5-5/overview"
      ]
    },
    "gpt-6-sol-luna": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-6-sol",
        "https://developers.openai.com/api/docs/models/gpt-6-luna"
      ]
    },
    "mimo-v2-6": {
      "category": "multimodal",
      "sources": [
        "https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL"
      ]
    },
    "claude-sonnet-5-5": {
      "category": "multimodal",
      "sources": [
        "https://platform.claude.com/docs/en/models/sonnet-5-5/overview"
      ]
    },
    "gpt-6-1-sol": {
      "category": "multimodal",
      "sources": [
        "https://developers.openai.com/api/docs/models/gpt-6.1-sol"
      ],
      "checkedAt": "2026-10-03"
    },
    "gemini-4-argon": {
      "category": "multimodal",
      "sources": [
        "https://ai.google.dev/gemini-api/docs/models/gemini-4-argon"
      ],
      "checkedAt": "2026-10-15"
    },
    "bloom": {
      "category": "text",
      "sources": [
        "https://huggingface.co/bigscience/bloom"
      ]
    },
    "stanford-alpaca": {
      "category": "text",
      "sources": [
        "https://crfm.stanford.edu/2023/03/13/alpaca.html"
      ]
    },
    "llava": {
      "category": "multimodal",
      "sources": [
        "https://arxiv.org/abs/2304.08485",
        "https://huggingface.co/liuhaotian/LLaVA-13b-delta-v0"
      ],
      "note": "按首版论文的图像与文本输入、文本输出分类。",
      "noteEn": "Classified by the original paper’s image and text inputs and text output."
    },
    "gpt-j-6b": {
      "checkedAt": "2026-10-11",
      "category": "text",
      "sources": [
        "https://huggingface.co/EleutherAI/gpt-j-6b"
      ]
    },
    "chatglm-6b": {
      "checkedAt": "2026-10-11",
      "category": "text",
      "sources": [
        "https://github.com/zai-org/ChatGLM-6B"
      ]
    },
    "starcoder": {
      "checkedAt": "2026-10-11",
      "category": "text",
      "sources": [
        "https://huggingface.co/blog/starcoder"
      ]
    },
    "olmo": {
      "checkedAt": "2026-10-11",
      "category": "text",
      "sources": [
        "https://huggingface.co/allenai/OLMo-7B"
      ]
    },
    "mellum-2-1-thinking": {
      "checkedAt": "2026-10-11",
      "category": "text",
      "sources": [
        "https://huggingface.co/JetBrains/Mellum2.1-12B-A2.5B-Thinking"
      ]
    },
    "ling-3-1-flash": {
      "checkedAt": "2026-10-11",
      "category": "text",
      "sources": [
        "https://developer.ant-ling.com/zh-CN/docs/models/ling/"
      ]
    },
    "muse-wonder": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "sources": [
        "https://research.meta.ai/static/muse-wonder-model-card"
      ]
    },
    "seedance-1-0": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://seed.bytedance.com/en/blog/tech-report-of-seedance-1-0-is-now-publicly-available"
      ]
    },
    "seedance-1-5-pro": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://seed.bytedance.com/en/blog/sound-and-vision-all-in-one-take-the-official-release-of-seedance-1-5-pro"
      ]
    },
    "seedance-2-0": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://seed.bytedance.com/en/blog/seedance-2-0-official-launch"
      ]
    },
    "seedance-2-5": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5"
      ]
    },
    "wan-2-1": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://github.com/Wan-Video/Wan2.1"
      ]
    },
    "wan-2-2": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://github.com/Wan-Video/Wan2.2"
      ]
    },
    "wan-2-5-preview": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://www.alibabacloud.com/en/press-room/alibabacloudunveilsstrategicroadmaps"
      ]
    },
    "wan-2-6": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://www.alibabacloud.com/en/press-room/alibaba-unveils-wan2-6-series-enabling-everyone"
      ]
    },
    "wan-2-7-video": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://www.alibabacloud.com/help/en/model-studio/newly-released-models"
      ]
    },
    "wan-3-0-video": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://www.alibabacloud.com/help/en/model-studio/newly-released-models"
      ]
    },
    "hunyuan-video": {
      "checkedAt": "2026-10-15",
      "category": "text",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://github.com/Tencent-Hunyuan/HunyuanVideo"
      ]
    },
    "hunyuan-video-1-5": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5"
      ]
    },
    "sora": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://openai.com/index/video-generation-models-as-world-simulators/"
      ],
      "note": "图像动画、视频延展和编辑在原始技术报告中直接演示；视频输入用于生成控制，不代表通用视频理解。",
      "noteEn": "The original report demonstrates image animation, video extension and editing. Video input controls generation; it does not imply general video understanding."
    },
    "veo": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://blog.google/innovation-and-ai/products/google-generative-ai-veo-imagen-3/",
        "https://cloud.google.com/blog/products/ai-machine-learning/introducing-veo-and-imagen-3-on-vertex-ai"
      ],
      "note": "文本输入在首发确认；同代模型的图像输入由 2024-12-03 Vertex AI 公告确认，不倒填为所有首发用户功能。",
      "noteEn": "Text input is confirmed at launch; image input is confirmed for the same generation by the December 3, 2024 Vertex AI announcement, not assumed available to every initial user."
    },
    "sora-turbo": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://openai.com/index/sora-is-here/"
      ]
    },
    "veo-2": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://blog.google/products-and-platforms/products/gemini/video-generation/"
      ],
      "note": "文本输入对应 Gemini，图像输入对应 Whisk；不把两种界面的入口能力混写。",
      "noteEn": "Text input is confirmed for Gemini and image input for Whisk; their interface capabilities are not treated as identical."
    },
    "veo-3": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://blog.google/innovation-and-ai/products/generative-media-models-io-2025/",
        "https://ai.google.dev/gemini-api/docs/veo?hl=en"
      ],
      "note": "原生音频为输出；不能据此添加音频输入能力。",
      "noteEn": "Native audio is an output capability and does not establish audio input support."
    },
    "sora-2": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://developers.openai.com/api/docs/models/sora-2",
        "https://developers.openai.com/api/docs/models/sora-2-pro"
      ],
      "note": "按 API 型号文档确认文本、图像输入和音画输出；不将原生音频输出误记为音频输入。",
      "noteEn": "The API model pages confirm text/image input and audiovisual output. Audio output is not evidence of audio input."
    },
    "veo-3-1": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://ai.google.dev/gemini-api/docs/veo?hl=en"
      ],
      "note": "视频输入限于延展由 Veo 生成的视频；不表示任意视频理解。参考图、首尾帧与延展在不同服务上的支持范围不同。",
      "noteEn": "Video input is scoped to extension of Veo-generated footage, not arbitrary video understanding. Reference-image, frame and extension support varies by service."
    },
    "gemini-omni-flash": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/",
        "https://deepmind.google/models/model-cards/gemini-omni-flash/"
      ],
      "note": "首发声音参考仅限声音身份，语音编辑尚未开放；模型层输入模态不能直接等同每个 API 的能力。",
      "noteEn": "Initial voice references were limited to voice identity and speech editing was not available. Model-level modalities do not imply support in every API."
    },
    "gemini-omni-1-1-flash": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://deepmind.google/models/model-cards/gemini-omni-flash/",
        "https://ai.google.dev/gemini-api/docs/omni"
      ],
      "note": "模型卡确认四种输入；当前 Gemini API 不支持上传音频参考，也不支持语音编辑。API 视频参考最多 3 段、每段 3 秒，不能用模型能力概述覆盖这些限制。",
      "noteEn": "The model card lists four input modalities. The current Gemini API does not support uploading audio references or voice editing. Video references are limited to three clips of up to three seconds each; these service limits remain distinct from model-level capabilities."
    },
    "kling-1": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://ir.kuaishou.com/news-releases/news-release-details/kuaishou-unveils-proprietary-video-generation-model-kling",
        "https://ir.kuaishou.com/news-releases/news-release-details/kuaishou-launches-full-beta-testing-kling-ai-global-users-0"
      ],
      "note": "首发为文生视频；图生视频是初代后续能力。",
      "noteEn": "Text-to-video at launch; image-to-video was added during the first generation."
    },
    "kling-2": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-advances-20-era-empowering-everyone-tell-great-stories"
      ]
    },
    "kling-o1": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://ir.kuaishou.com/news-releases/news-release-details/kling-o1-launches-worlds-first-unified-multimodal-video-model-0/"
      ]
    },
    "kling-3": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-launches-30-model-ushering-era-where-everyone-can-be"
      ],
      "note": "能力覆盖 3.0 与 3.0 Omni；不同模式的参考输入有所不同。",
      "noteEn": "Capabilities span 3.0 and 3.0 Omni; reference inputs differ by mode."
    },
    "runway-gen-1": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://runway.com/research/gen-1",
        "https://arxiv.org/abs/2302.03011"
      ]
    },
    "runway-gen-2": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://runway.com/research/gen-2"
      ]
    },
    "runway-gen-3-alpha": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://runway.com/research/introducing-gen-3-alpha"
      ],
      "note": "系列支持文生视频与图生视频，具体模式按产品推出阶段开放。",
      "noteEn": "The family supports text-to-video and image-to-video, with modes introduced in stages."
    },
    "runway-gen-4": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://help.runwayml.com/hc/en-us/articles/37327109429011-Creating-with-Gen-4-Video"
      ],
      "note": "Gen-4 视频生成需要输入图像与文字；不将同系列图像模型能力套用到视频。",
      "noteEn": "Gen-4 video generation requires an input image and text; image-model capabilities are not attributed to the video model."
    },
    "runway-gen-4-5": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://runway.com/research/introducing-runway-gen-4.5",
        "https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5"
      ],
      "note": "图生视频是后续支持的能力，不记为首发当日已开放。",
      "noteEn": "Image-to-video was added later and is not presented as available on launch day."
    },
    "hailuo-01": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://www.minimax.io/news/Video-01"
      ],
      "note": "首发文生视频；当前原始公告也描述图生视频，不能据此断言该模式在首发当日已开放。",
      "noteEn": "Text-to-video at launch; the current original announcement also describes image-to-video, which does not establish day-one availability."
    },
    "hailuo-02": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://www.minimax.io/news/minimax-hailuo-02"
      ]
    },
    "minimax-h3": {
      "checkedAt": "2026-10-15",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://www.minimax.io/blog/minimax-h3",
        "https://huggingface.co/MiniMaxAI/MiniMax-H3"
      ],
      "note": "输入方式依任务及检查点而定。",
      "noteEn": "Supported reference inputs depend on the task and checkpoint."
    },
    "reflection-beam-1": {
      "checkedAt": "2026-10-17",
      "category": "text",
      "tasks": [
        "language"
      ],
      "sources": [
        "https://reflection.ai/blog/introducing-beam",
        "https://reflection.ai/blog/beam-is-available",
        "https://huggingface.co/reflection/Beam-1.0-501B-A23B"
      ]
    },
    "muse-spark-open": {
      "checkedAt": "2026-10-17",
      "category": "multimodal",
      "tasks": [
        "language"
      ],
      "sources": [
        "https://research.meta.ai/blog/muse-spark-open",
        "https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B"
      ]
    },
    "nemotron-3-5-vl-bolt": {
      "checkedAt": "2026-10-17",
      "category": "multimodal",
      "tasks": [
        "language"
      ],
      "sources": [
        "https://blogs.nvidia.com/blog/nemotron-3-5-super-vl/",
        "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4",
        "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-24GB"
      ]
    },
    "kling-4": {
      "checkedAt": "2026-10-17",
      "category": "multimodal",
      "tasks": [
        "video-generation"
      ],
      "sources": [
        "https://kling.ai/blog/kling40-kling-visual-realism-creative-control-introducing-storytelling",
        "https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-officially-launches-next-generation-kling-40-raising"
      ]
    }
  }
};
  window.MODEL_ATLAS_TYPES = data;
  window.MODEL_ATLAS = Object.freeze({
    ...window.MODEL_ATLAS,
    categories: { text: '文本', multimodal: '多模态' },
    categoriesEn: { text: 'Text', multimodal: 'Multimodal' },
    tasks: { language: '语言', 'video-generation': '视频生成' },
    tasksEn: { language: 'Language', 'video-generation': 'Video generation' },
    releases: window.MODEL_ATLAS.releases.map(entry => ({ ...entry, category: data.entries[entry.id]?.category, tasks: data.entries[entry.id]?.tasks || ['language'] })),
  });
})();
