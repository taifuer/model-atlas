/* English editorial copy. Original dates and sources remain in data.js. */
window.MODEL_ATLAS_EN = {
  "mistral-large-4-preview": {
    "summary": "A public preview of Mistral’s new multimodal flagship combines instruction following, hybrid reasoning, and agent tasks.",
    "details": "The initial public preview is available through the Mistral Studio API, with image understanding and a one-million-token context. Weights are planned for the end of October but are not yet available at the review date; access is currently classified as closed.",
    "dateNote": "Uses October 6 from the official announcement and changelog. This entry records the API public preview; the planned weight release is not treated as completed."
  },
  "claude-haiku-5-5": {
    "summary": "The first Haiku model with adjustable effort targets high-volume tasks, coding, and subagent calls.",
    "details": "Supports a one-million-token context and up to 128K output tokens. Standard API input and output rates vary by prompt length. Effort settings are grouped into this model release rather than counted as separate models.",
    "dateNote": "Uses October 7 from the official Anthropic announcement."
  },
  "gpt-6-sol-luna-chatgpt-october": {
    "name": "GPT-6 Sol / Luna (ChatGPT)",
    "summary": "October versions of GPT-6 Sol and Luna arrive in ChatGPT for free and paid users.",
    "details": "These versions replace GPT-5.6 Sol and Luna in ChatGPT and include updated safety training. OpenAI distinguishes them from the September versions then used in Codex and ChatGPT Work. The October rollout is for ChatGPT.",
    "dateNote": "Uses October 7 from the official system card for the ChatGPT October release. The original September launch remains a separate entry."
  },
  "transformer": {
    "summary": "Google researchers introduce the Transformer, an attention-based sequence model, in Attention Is All You Need.",
    "details": "The paper presents an encoder–decoder architecture using multi-head attention and positional encoding, evaluated on machine translation. It provided the architectural foundation for later pretrained models including GPT and BERT.",
    "dateNote": "Uses the first arXiv submission on June 12, 2017. This entry records the architecture paper, not a chat product or a later language-model release."
  },
  "gpt-1": {
    "summary": "Unsupervised language pretraining and task-specific fine-tuning support transfer across tasks.",
    "details": "The original GPT combined a Transformer with unsupervised language pretraining and supervised adaptation.",
    "dateNote": "The date records the original research publication, not a chat product launch."
  },
  "bert": {
    "summary": "Bidirectional context advances language understanding and reading comprehension.",
    "details": "BERT masks some input words and trains a Transformer encoder to predict them using context on both sides. Fine-tuning then adapts it to question answering and classification with few task-specific architecture changes. In 2019, Google applied BERT to search ranking and featured snippets to interpret relationships between words in queries.",
    "dateNote": "Uses the first arXiv submission date, not a later revision or code release."
  },
  "gpt-2": {
    "summary": "Scaling improves coherent text generation and zero-shot task performance.",
    "details": "The initial release included smaller models; full 1.5B weights followed on November 5, 2019.",
    "dateNote": "Records the first announcement and staged release, not the release of the full weights."
  },
  "t5": {
    "summary": "A text-to-text formulation unifies language tasks within one framework.",
    "details": "Classification, translation, summarization, and question answering become text inputs and outputs.",
    "dateNote": "Uses the first arXiv submission date."
  },
  "gpt-3": {
    "summary": "A 175B-parameter model demonstrates broad few-shot learning.",
    "details": "The paper compares zero-shot, one-shot, and few-shot settings: task descriptions and examples go into the prompt, allowing translation and question answering without task-specific parameter updates. Scaling improves this in-context learning, while the study also identifies difficult tasks and overlap between training data and evaluation sets.",
    "dateNote": "Records the paper debut. The API beta followed in June 2020."
  },
  "codex": {
    "summary": "Natural-language instructions become executable code.",
    "details": "This GPT-3-derived code model launched through a private API beta.",
    "dateNote": "This is the 2021 code model; the coding-agent product of the same name launched in 2025."
  },
  "instructgpt": {
    "summary": "Reinforcement learning from human feedback improves instruction following and alignment with user intent.",
    "details": "Demonstrations, preference comparisons, and reinforcement learning support instruction alignment.",
    "dateNote": "Records the research announcement and switch of the default API models; InstructGPT had already been available in the API beta."
  },
  "palm": {
    "summary": "Google explores reasoning and language capabilities at larger scale.",
    "details": "The 540B-parameter Pathways Language Model was a research announcement, not a public product launch.",
    "dateNote": ""
  },
  "chatgpt": {
    "summary": "A GPT-3.5-based research preview supports multi-turn conversation.",
    "details": "This is a product launch: multi-turn dialogue, follow-up questions, and iterative editing.",
    "dateNote": ""
  },
  "llama-1": {
    "summary": "Meta introduces a family of foundation models for research access.",
    "details": "Multiple model sizes broaden access to language-model research under a restricted research license.",
    "dateNote": "Initial access required an application and used a noncommercial research license."
  },
  "claude-1": {
    "summary": "Anthropic introduces Claude and Claude Instant.",
    "details": "The initial models emphasize helpful conversation, alignment, and different speed and capability trade-offs.",
    "dateNote": ""
  },
  "gpt-4": {
    "summary": "Stronger language capabilities are joined by demonstrated image understanding.",
    "details": "Text and image inputs were introduced with staged access; image input was not immediately available to everyone.",
    "dateNote": ""
  },
  "claude-2": {
    "summary": "Improved coding, reasoning, and long-document processing arrive with a public chat beta.",
    "details": "Claude 2 and claude.ai expand access to long-context conversational workflows.",
    "dateNote": ""
  },
  "llama-2": {
    "summary": "Pretrained and chat-tuned weights become available for research and commercial use.",
    "details": "Use remains subject to the custom Llama 2 license.",
    "dateNote": "Open weights remain subject to the Llama 2 license."
  },
  "qwen-7b": {
    "summary": "Qwen releases 7B base and chat model weights.",
    "details": "The official repository includes inference and fine-tuning examples for developers.",
    "dateNote": "Records Qwen-7B weight availability, not the first appearance of the Qwen brand."
  },
  "mistral-7b": {
    "summary": "An efficient 7B model is released under Apache 2.0.",
    "details": "Grouped-query and sliding-window attention support efficient inference.",
    "dateNote": ""
  },
  "grok-1": {
    "summary": "xAI announces Grok with early access and information from X.",
    "details": "This announcement predates the later release of Grok-1 base-model weights.",
    "dateNote": "Uses November 3 as labeled by the official announcement."
  },
  "gpt-4-turbo": {
    "summary": "A developer preview expands context to 128K and advances vision and tool use.",
    "details": "The entry records the first DevDay preview, not later general availability.",
    "dateNote": ""
  },
  "gemini-1": {
    "summary": "Google introduces the multimodal Gemini family: Ultra, Pro, and Nano.",
    "details": "Individual models and capabilities followed different availability schedules.",
    "dateNote": ""
  },
  "mixtral-8x7b": {
    "summary": "A sparse mixture-of-experts model expands efficient open-weight inference.",
    "details": "Uses Mistral’s December 11 technical announcement. Only a subset of expert parameters is active per token; weights are provided under Apache 2.0.",
    "dateNote": ""
  },
  "gemini-1-5": {
    "summary": "Gemini 1.5 Pro demonstrates million-token context processing.",
    "details": "The limited preview explores long documents, code, audio, and video.",
    "dateNote": "This is a preview announcement, not general availability."
  },
  "gemma-1": {
    "summary": "Google introduces lightweight open-weight models for local development and research.",
    "details": "The first release includes 2B and 7B models under the Gemma license.",
    "dateNote": ""
  },
  "claude-3": {
    "summary": "Opus, Sonnet, and Haiku form a new vision-capable model family.",
    "details": "Opus and Sonnet were available first; Haiku followed later.",
    "dateNote": ""
  },
  "llama-3": {
    "summary": "8B and 70B weights improve general-purpose open-model capabilities.",
    "details": "The first models focus on text and include pretrained and instruction-tuned variants.",
    "dateNote": ""
  },
  "phi-3": {
    "summary": "Microsoft introduces small language models suited to local deployment.",
    "details": "Phi-3 Mini leads the family, emphasizing training-data quality and efficiency.",
    "dateNote": ""
  },
  "deepseek-v2": {
    "summary": "Mixture-of-experts and latent attention improve training and inference efficiency.",
    "details": "Sparse activation and multi-head latent attention reduce compute and cache requirements.",
    "dateNote": "Uses May 6, 2024 from the official repository news."
  },
  "gpt-4o": {
    "summary": "Text, vision, and audio move toward a unified, more natural interface.",
    "details": "Voice and vision features rolled out in stages across products.",
    "dateNote": ""
  },
  "qwen-2": {
    "summary": "A range of model sizes improves multilingual, coding, math, and long-context performance.",
    "details": "Dense and mixture-of-experts variants support different deployment budgets.",
    "dateNote": ""
  },
  "claude-3-5": {
    "summary": "Sonnet improves coding and visual understanding alongside the introduction of Artifacts.",
    "details": "The update focuses on practical code editing and chart interpretation.",
    "dateNote": "Uses June 20 from the API release log. The current official blog displays June 21."
  },
  "gemma-2": {
    "summary": "A redesigned architecture introduces efficient 9B and 27B open-weight models.",
    "details": "The date records developer availability rather than the earlier conference announcement.",
    "dateNote": ""
  },
  "gpt-4o-mini": {
    "summary": "A lower-cost text and vision model expands lightweight applications.",
    "details": "This is a separate model from GPT-4o, not a reasoning-effort setting.",
    "dateNote": ""
  },
  "llama-3-1": {
    "summary": "A 405B model extends the family with longer context, multilingual support, and tool use.",
    "details": "8B, 70B, and 405B weights are provided under the Llama license.",
    "dateNote": ""
  },
  "mistral-large-2": {
    "summary": "A 123B model expands coding, multilingual, and long-context capabilities.",
    "details": "Research access to weights and commercial use have different licensing conditions.",
    "dateNote": ""
  },
  "o1-preview": {
    "summary": "Reasoning-time computation becomes a new route to stronger task performance.",
    "details": "o1-preview and o1-mini introduce extended reasoning for science, math, and programming.",
    "dateNote": "Records the preview release, not the full model released in December."
  },
  "qwen-2-5": {
    "summary": "General, coding, and math models improve instruction following and structured output.",
    "details": "Model sizes and specialized variants may have different licenses.",
    "dateNote": ""
  },
  "llama-3-2": {
    "summary": "Vision models and small on-device text models join the Llama family.",
    "details": "1B and 3B text models launch alongside 11B and 90B vision models.",
    "dateNote": ""
  },
  "amazon-nova": {
    "summary": "Amazon introduces text and multimodal models across several cost tiers.",
    "details": "Micro, Lite, and Pro are grouped into one family launch; image-only and video-only generators are outside this timeline.",
    "dateNote": ""
  },
  "o1": {
    "summary": "The full o1 model launches with ChatGPT Pro and adds image understanding.",
    "details": "This records availability in ChatGPT; API availability follows a separate schedule.",
    "dateNote": ""
  },
  "llama-3-3": {
    "summary": "A revised 70B instruction model improves multilingual dialogue and deployment efficiency.",
    "details": "The official model card supplies the date. This is a text-only model.",
    "dateNote": ""
  },
  "gemini-2": {
    "summary": "An experimental Flash model combines multimodality with native tool use.",
    "details": "Image generation and speech output initially had restricted test access.",
    "dateNote": ""
  },
  "phi-4": {
    "summary": "Synthetic data and training improvements strengthen small-model reasoning.",
    "details": "Phi-4 is a 14B-parameter model. This entry records its Azure AI Foundry debut; the official Hugging Face release under MIT followed on January 8, 2025.",
    "dateNote": ""
  },
  "deepseek-v3": {
    "summary": "Open weights expand large-scale mixture-of-experts modeling.",
    "details": "The 671B model activates about 37B parameters per token.",
    "dateNote": ""
  },
  "deepseek-r1": {
    "summary": "DeepSeek releases a reasoning model and distilled variants with downloadable weights.",
    "details": "R1 uses reinforcement learning for reasoning. Distilled models retain relevant base-model license conditions.",
    "dateNote": ""
  },
  "o3-mini": {
    "summary": "Efficient reasoning targets mathematics, science, and programming.",
    "details": "Low, medium, and high reasoning effort are configurations of one model.",
    "dateNote": ""
  },
  "grok-3": {
    "summary": "xAI describes reasoning capabilities and the DeepSearch experience.",
    "details": "The entry follows the official technical article rather than the live launch event.",
    "dateNote": "Uses February 19 from the technical article, not the livestream launch date."
  },
  "claude-3-7": {
    "summary": "One model combines fast responses with extended thinking.",
    "details": "Developers can control the thinking budget; Claude Code is a separate tool introduced alongside it.",
    "dateNote": ""
  },
  "gpt-4-5": {
    "summary": "A research preview explores further gains from scaling pretraining.",
    "details": "The focus is knowledge, natural conversation, and creative tasks.",
    "dateNote": ""
  },
  "gemma-3": {
    "summary": "The open-weight family expands image understanding and long-context processing.",
    "details": "Capabilities and deployment requirements vary by model size.",
    "dateNote": ""
  },
  "hunyuan-t1": {
    "summary": "Tencent introduces a deep-reasoning model trained with reinforcement learning.",
    "details": "T1 builds on the hybrid Transformer-Mamba architecture of Turbo S.",
    "dateNote": "",
    "name": "Hunyuan T1"
  },
  "gemini-2-5": {
    "summary": "Thinking becomes central to complex reasoning, coding, and multimodal tasks.",
    "details": "The first entry is Gemini 2.5 Pro Experimental.",
    "dateNote": "Records the first public experimental version."
  },
  "llama-4": {
    "summary": "Scout and Maverick introduce multimodal mixture-of-experts models.",
    "details": "The larger Behemoth was previewed but was not released with these two models.",
    "dateNote": "The larger Behemoth model was not released on this date."
  },
  "gpt-4-1": {
    "summary": "An API model family improves coding, instructions, and long-context processing.",
    "details": "GPT-4.1, mini, and nano target different capability, latency, and cost needs.",
    "dateNote": "Records the initial API release."
  },
  "o3-o4-mini": {
    "summary": "Reasoning models learn to combine search, code, and visual tools.",
    "details": "This records their release for use, not the earlier o3 announcement.",
    "dateNote": "Records availability, not the earlier o3 announcement."
  },
  "qwen-3": {
    "summary": "Thinking and non-thinking modes share one model family.",
    "details": "Dense and mixture-of-experts models balance complex reasoning with everyday responsiveness.",
    "dateNote": "Uses April 29 as labeled by the official Qwen blog."
  },
  "mistral-medium-3": {
    "summary": "An enterprise model balances multimodal capability, coding, and deployment cost.",
    "details": "The entry records the model launch separately from related product updates.",
    "dateNote": ""
  },
  "claude-4": {
    "summary": "Opus 4 and Sonnet 4 advance coding and longer-running work.",
    "details": "The family focuses on sustained reasoning and practical tool use.",
    "dateNote": ""
  },
  "deepseek-r1-0528": {
    "summary": "A major R1 update improves reasoning, coding, structured output, and tool calls.",
    "details": "It is recorded separately because it has an independent official release announcement.",
    "dateNote": ""
  },
  "minimax-m1": {
    "summary": "Hybrid attention explores efficient reasoning and long-context work.",
    "details": "MiniMax-M1 combines mixture-of-experts modeling with Lightning Attention to reduce computation in long-context reasoning.",
    "dateNote": "Uses the original paper’s first submission date. The separately announced MiniMax Agent is a product release."
  },
  "grok-4": {
    "summary": "xAI advances reasoning and tool-assisted problem solving.",
    "details": "Different product access tiers are kept within one model-family entry.",
    "dateNote": ""
  },
  "kimi-k2": {
    "summary": "Kimi introduces open weights focused on coding and agentic tool use.",
    "details": "The mixture-of-experts model is available through downloadable weights and an API for coding, tool use, and multi-step tasks.",
    "dateNote": ""
  },
  "qwen-3-coder": {
    "summary": "An open mixture-of-experts model targets agentic coding and long tasks.",
    "details": "The initial flagship is 480B-A35B-Instruct. Qwen Code is a separate developer tool.",
    "dateNote": ""
  },
  "glm-4-5": {
    "summary": "GLM combines reasoning, coding, and agentic workflows.",
    "details": "The family supports both thinking and direct-response use cases.",
    "dateNote": ""
  },
  "claude-opus-4-1": {
    "summary": "Opus improves coding, practical reasoning, and agent performance.",
    "details": "A distinct update between Opus 4 and Opus 4.5.",
    "dateNote": ""
  },
  "gpt-oss": {
    "summary": "OpenAI releases two open-weight reasoning models.",
    "details": "120b and 20b launch together under Apache 2.0 for local deployment and tool use.",
    "dateNote": ""
  },
  "gpt-5": {
    "summary": "A new GPT generation advances reasoning, coding, and everyday work.",
    "details": "The launch combines different modes and capability tiers in a wider product rollout.",
    "dateNote": ""
  },
  "deepseek-v3-1": {
    "summary": "Thinking and non-thinking modes are unified with stronger agent capabilities.",
    "details": "Post-training improves coding, search, and tool use.",
    "dateNote": ""
  },
  "qwen-3-next": {
    "summary": "Hybrid attention and highly sparse activation target efficient long-context processing.",
    "details": "Qwen3-Next combines Gated DeltaNet, gated attention, and highly sparse mixture-of-experts modeling, with multi-token prediction for inference efficiency.",
    "dateNote": "Uses the official blog timestamp of September 10, 2025 at 20:00 UTC, equivalent to September 11 at 04:00 in Beijing. The page date follows the browser’s time zone."
  },
  "claude-sonnet-4-5": {
    "summary": "Sonnet advances coding, computer use, and sustained agentic tasks.",
    "details": "The update focuses on more reliable execution across complex workflows.",
    "dateNote": ""
  },
  "glm-4-6": {
    "summary": "GLM improves code, reasoning, and tool calls.",
    "details": "The date follows the official Z.ai platform release log.",
    "dateNote": ""
  },
  "claude-haiku-4-5": {
    "summary": "A smaller Claude model improves coding and computer use at lower latency.",
    "details": "Haiku is a separate model tier rather than a Sonnet reasoning configuration.",
    "dateNote": ""
  },
  "minimax-m2": {
    "summary": "MiniMax opens a model designed around coding and agent workflows.",
    "details": "The entry records the model announcement and weights alongside Agent product updates.",
    "dateNote": ""
  },
  "kimi-k2-thinking": {
    "summary": "Kimi extends the K2 family with deeper reasoning and tool-assisted work.",
    "details": "This is a distinct thinking-model release.",
    "dateNote": ""
  },
  "gpt-5-1": {
    "summary": "Instant and Thinking improve instructions, style, and adaptive reasoning.",
    "details": "ChatGPT launched on November 12; the developer API announcement followed the next day.",
    "dateNote": ""
  },
  "gemini-3": {
    "summary": "Google introduces a new generation of multimodal reasoning models.",
    "details": "The initial entry is the Pro preview, with other capabilities following separate access schedules.",
    "dateNote": "Records the Pro preview. Deep Think follows a different rollout schedule."
  },
  "claude-opus-4-5": {
    "summary": "Opus improves coding, computer use, and long-running work.",
    "details": "The public launch date differs from the checkpoint date embedded in its model identifier.",
    "dateNote": "Public release: November 24, 2025. The 20251101 model suffix is a checkpoint date."
  },
  "deepseek-v3-2": {
    "summary": "DeepSeek advances efficient attention, reasoning, and agentic tool use.",
    "details": "This is the full V3.2 release, following the earlier experimental version.",
    "dateNote": "The full V3.2 release is separate from September's V3.2-Exp."
  },
  "mistral-3": {
    "summary": "Mistral expands its open-weight multimodal model family.",
    "details": "Several sizes cover different deployment and capability requirements.",
    "dateNote": ""
  },
  "nova-2-lite": {
    "summary": "Configurable extended thinking supports reasoning, coding, and agent workflows.",
    "details": "The model is delivered through Amazon Bedrock.",
    "dateNote": ""
  },
  "gpt-5-2": {
    "summary": "GPT advances professional knowledge work, coding, and long-context tasks.",
    "details": "Different model tiers are grouped under the same family release.",
    "dateNote": ""
  },
  "nemotron-3-nano": {
    "summary": "NVIDIA announces Nemotron 3 and releases Nano first.",
    "details": "Super and Ultra were part of the roadmap, not simultaneously available weights.",
    "dateNote": ""
  },
  "mimo-v2-flash": {
    "summary": "Xiaomi opens an efficient model for reasoning, coding, and agent tasks.",
    "details": "The model log and official blog record the December 16 release.",
    "dateNote": ""
  },
  "gemini-3-flash": {
    "summary": "Gemini 3 reasoning reaches a faster, more efficient Flash tier.",
    "details": "Flash is a distinct model, not a third-party hosting configuration.",
    "dateNote": ""
  },
  "glm-4-7": {
    "summary": "GLM improves coding and long-context task execution.",
    "details": "The lightweight Flash model is recorded separately.",
    "dateNote": ""
  },
  "minimax-m2-1": {
    "summary": "MiniMax improves programming across languages and practical office tasks.",
    "details": "Records MiniMax’s December 23 model announcement.",
    "dateNote": ""
  },
  "glm-4-7-flash": {
    "summary": "A lightweight model extends the GLM-4.7 family.",
    "details": "The entry follows the official platform release log.",
    "dateNote": ""
  },
  "kimi-k2-5": {
    "summary": "Kimi combines visual understanding, coding, and agent collaboration.",
    "details": "The model extends the K2 family toward multimodal work.",
    "dateNote": ""
  },
  "step-3-5-flash": {
    "summary": "Sparse mixture-of-experts modeling balances speed with agent capabilities.",
    "details": "The model targets reasoning and agent tasks, with downloadable weights.",
    "dateNote": "Uses the February 2 release entry in the official repository’s News section."
  },
  "claude-opus-4-6": {
    "summary": "Opus expands complex codebase analysis and long-running agent tasks.",
    "details": "Adaptive thinking and a million-token context beta target coding and research.",
    "dateNote": ""
  },
  "gpt-5-3-codex": {
    "summary": "Coding and general reasoning combine in longer engineering workflows.",
    "details": "This records a new Codex model, not the original Codex product.",
    "dateNote": ""
  },
  "glm-5": {
    "summary": "GLM moves from individual coding tasks toward broader software engineering.",
    "details": "The official technical announcement also describes open weights.",
    "dateNote": "Uses February 12 from the official technical blog, not earlier access on other channels."
  },
  "gpt-5-3-codex-spark": {
    "summary": "A smaller model previews rapid, interactive coding.",
    "details": "The initial research preview is limited in scope and is not a general API launch.",
    "dateNote": ""
  },
  "minimax-m2-5": {
    "summary": "Reinforcement learning targets practical coding, search, office work, and tools.",
    "details": "The update emphasizes multi-step execution in real environments.",
    "dateNote": ""
  },
  "seed-2": {
    "summary": "ByteDance introduces multimodal models for real-world agent tasks.",
    "details": "Pro, Lite, and Mini are grouped by their common family release date.",
    "dateNote": ""
  },
  "qwen-3-5": {
    "summary": "Native multimodality and agent capabilities come together in a large expert model.",
    "details": "The first announcement introduces Qwen3.5-397B-A17B.",
    "dateNote": "Uses the official blog timestamp of February 15, 2026 at 20:00 UTC, equivalent to February 16 at 04:00 in Beijing. The page date follows the browser’s time zone."
  },
  "claude-sonnet-4-6": {
    "summary": "Sonnet improves coding, visual interaction, planning, and knowledge work.",
    "details": "A million-token context is initially available in beta.",
    "dateNote": ""
  },
  "gemini-3-1": {
    "summary": "Gemini strengthens reasoning for scientific, engineering, and complex tasks.",
    "details": "The model is provided through developer platforms and Gemini products.",
    "dateNote": ""
  },
  "gpt-5-4": {
    "summary": "Reasoning, coding, and native computer use target professional work.",
    "details": "GPT-5.4 launches in ChatGPT, the API, and Codex. GPT-5.4 Pro launches the same day in ChatGPT and the API.",
    "dateNote": ""
  },
  "nemotron-3-super": {
    "summary": "Hybrid experts and long context support multi-agent work.",
    "details": "Super has 120B total parameters and approximately 12B active parameters.",
    "dateNote": ""
  },
  "mistral-small-4": {
    "summary": "One model combines reasoning, vision, and coding with adjustable thinking.",
    "details": "Weights use Apache 2.0; effort settings remain one release.",
    "dateNote": ""
  },
  "mimo-v2-pro": {
    "summary": "MiMo expands flagship reasoning and multimodal understanding.",
    "details": "Same-day Pro and Omni releases are grouped; speech-only synthesis is excluded.",
    "dateNote": ""
  },
  "minimax-m2-7": {
    "summary": "Software engineering and professional work gain stronger agent collaboration.",
    "details": "The date records the model debut rather than later service updates.",
    "dateNote": ""
  },
  "gemma-4": {
    "summary": "Gemma advances open-model reasoning and agent capabilities.",
    "details": "The family launches under Apache 2.0; later sizes are not all separate entries.",
    "dateNote": ""
  },
  "glm-5-1": {
    "summary": "GLM improves long-running engineering, planning, and execution.",
    "details": "The date follows the official Z.ai platform log.",
    "dateNote": ""
  },
  "muse-spark": {
    "summary": "Meta introduces a new family combining multimodality, reasoning, and tools.",
    "details": "Muse Spark first appears in Meta AI products, separately from Llama.",
    "dateNote": ""
  },
  "claude-opus-4-7": {
    "summary": "Opus improves difficult engineering and visual understanding.",
    "details": "Long tasks gain stronger self-checking; this is a released model update.",
    "dateNote": ""
  },
  "qwen-3-6-max-preview": {
    "summary": "A flagship preview strengthens coding and complex task execution.",
    "details": "The Preview label is retained rather than implying a stable release.",
    "dateNote": ""
  },
  "gpt-5-5": {
    "summary": "GPT improves tasks spanning multiple tools and applications.",
    "details": "ChatGPT and Codex launch first, with API access following the next day.",
    "dateNote": "ChatGPT and Codex: April 23. API availability: April 24."
  },
  "mimo-v2-5": {
    "summary": "MiMo upgrades complex tasks, multimodal work, and inference efficiency.",
    "details": "The official model log records the same-day V2.5 and Pro releases. From October 14, 2026 at 18:00 (UTC+8), V2.5 and Pro API requests automatically route to V2.6 Flash and Pro respectively, at the replacement models’ rates. The old identifiers stop working on October 21 at 10:00 (UTC+8). This API retirement does not affect the released model weights.",
    "dateNote": ""
  },
  "deepseek-v4": {
    "summary": "Pro and Flash previews introduce million-token context and open weights.",
    "details": "The entry records the preview generation, before Pro general availability.",
    "dateNote": "This is the preview; the full V4-Pro release followed in August."
  },
  "gemini-3-5-flash": {
    "summary": "Google I/O introduces a Flash update focused on speed and agent tasks.",
    "details": "Introduced with the Gemini app updates at Google I/O, with a focus on fast responses and task execution. Since October 8, 2026, the deprecated gemini-3.5-flash API identifier automatically routes requests to Gemini 3.6 Flash.",
    "dateNote": ""
  },
  "qwen-3-7-max": {
    "summary": "Qwen improves agentic coding, office work, and long-running execution.",
    "details": "Qwen3.7-Max targets coding, office documents, and extended tool tasks, with multi-agent orchestration.",
    "dateNote": "Uses May 20 from the current official article. Embedded legacy content also contains May 16; the original publication time remains unconfirmed."
  },
  "mistral-medium-3-5": {
    "summary": "A public preview targets sustained coding and remote agent tasks.",
    "details": "The 128B model is introduced alongside Vibe remote agents.",
    "dateNote": ""
  },
  "claude-opus-4-8": {
    "summary": "Opus improves tool use, complex judgments, and collaboration.",
    "details": "It extends Opus 4.7 alongside longer-running Claude Code workflows.",
    "dateNote": ""
  },
  "step-3-7-flash": {
    "summary": "Step improves efficient reasoning and practical agent execution.",
    "details": "The date follows the official model article, not later hosting availability.",
    "dateNote": ""
  },
  "minimax-m3": {
    "summary": "Sparse attention adds native image and video understanding.",
    "details": "Long-context engineering and knowledge work are central use cases.",
    "dateNote": ""
  },
  "claude-fable-5": {
    "summary": "Fable and Mythos target demanding coding and knowledge work.",
    "details": "Fable has broader access; Mythos has restricted availability.",
    "dateNote": "Later access was paused in June and resumed on July 1. The original release date is retained."
  },
  "kimi-k2-7-code": {
    "summary": "Kimi improves long-running coding, tool calls, and efficient thinking.",
    "details": "The date comes from the official Kimi Code model log.",
    "dateNote": ""
  },
  "glm-5-2": {
    "summary": "GLM-5.2 becomes available to Coding Plan subscribers, extending long-running coding and project-level work.",
    "details": "All Coding Plan subscription tiers received access on June 13, followed by API, chat and open-weight availability. The model targets long-running coding, complex engineering and project-context handling. Service access and weight publication are distinct stages.",
    "dateNote": "Records initial public Coding Plan availability on June 13. The official platform log’s June 16 entry covers the later API and chat release, rather than the earliest availability."
  },
  "claude-sonnet-5": {
    "summary": "Sonnet expands planning, browser use, terminal work, and sustained execution.",
    "details": "Reasoning-effort settings are grouped within the same release.",
    "dateNote": ""
  },
  "hunyuan-hy3": {
    "summary": "Tencent improves long-running agents and product integration.",
    "details": "This is the official Hy3 release, distinct from its earlier preview.",
    "dateNote": "",
    "name": "Hunyuan Hy3"
  },
  "gpt-5-6": {
    "summary": "Sol, Terra, and Luna address different knowledge-work and coding needs.",
    "details": "The family balances capability and efficiency across ChatGPT, Codex, and APIs.",
    "dateNote": "Records the official release rather than the earlier Sol preview."
  },
  "muse-spark-1-1": {
    "summary": "Muse improves coding, computer use, and multimodal understanding.",
    "details": "The model announcement accompanies a public preview of the Meta Model API.",
    "dateNote": "Uses July 9, as dated in the Meta AI model announcement."
  },
  "grok-4-5": {
    "summary": "Grok advances coding, agent tasks, and professional knowledge work.",
    "details": "The entry follows the date on the official technical announcement.",
    "dateNote": "Uses July 16 on the official article rather than reports or earlier availability."
  },
  "kimi-k3": {
    "summary": "Kimi combines native vision, long context, and complex coding.",
    "details": "At launch, Kimi K3 is available through Kimi, Kimi Work, Kimi Code, and the Kimi API; full weights are announced as a later release.",
    "dateNote": ""
  },
  "gemini-3-6-flash": {
    "summary": "Flash improves reasoning efficiency alongside a lighter Flash-Lite model.",
    "details": "The same-day family announcement also introduces a restricted Cyber variant.",
    "dateNote": ""
  },
  "claude-opus-5": {
    "summary": "Opus upgrades engineering, knowledge work, and computer use.",
    "details": "This first release is distinct from Fable 5 and the later Opus 5.5.",
    "dateNote": ""
  },
  "qwen-3-8-max": {
    "summary": "A native vision-language flagship supports a one-million-token context.",
    "details": "The date records first availability in the QwenCloud model log.",
    "dateNote": ""
  },
  "grok-4-6": {
    "summary": "Grok improves sustained work across agents, interactive apps, and vision.",
    "details": "Records the Grok 4.6 technical announcement and API release.",
    "dateNote": "Both the official article and API release log date Grok 4.6 to August 12."
  },
  "qwen-3-8": {
    "summary": "Qwen opens 2.4T-A95B weights, followed by a 27B model.",
    "details": "The first family entry uses the earlier large-model weight release.",
    "dateNote": "2.4T-A95B weights: August 12. 27B weights: August 14.",
    "name": "Qwen3.8 open-weight family"
  },
  "deepseek-v4-pro-0813": {
    "summary": "V4 Pro reaches general availability with stronger agents and Responses API support.",
    "details": "The August 13 model snapshot is separate from the April preview.",
    "dateNote": "",
    "name": "DeepSeek-V4-Pro (GA)"
  },
  "gemini-3-7-flash": {
    "summary": "Flash improves multi-step coding, knowledge work, and web development.",
    "details": "Developer, enterprise, and consumer channels have separate rollout paths. Since October 8, 2026, the deprecated gemini-3.7-flash API identifier automatically routes requests to Gemini 3.8 Flash.",
    "dateNote": ""
  },
  "glm-5-3": {
    "summary": "GLM strengthens complex coding and extended task execution.",
    "details": "The model targets complex coding and extended engineering tasks.",
    "dateNote": "Uses the August 18 release entry in the official Z.ai platform log."
  },
  "glm-5-3-flash": {
    "summary": "Native vision and hybrid linear/sparse attention support coding, browser, and GUI tasks.",
    "details": "The model can read interfaces, rendered results, and interaction feedback, with tool use for office documents and financial research.",
    "dateNote": ""
  },
  "qwen-3-8-flash": {
    "summary": "An efficient multimodal model supports coding and high-volume agent use.",
    "details": "The official QwenCloud log records the August 26 release.",
    "dateNote": ""
  },
  "hunyuan-hy4-preview": {
    "summary": "Tencent opens a flagship preview for long-context and complex work.",
    "details": "Weights and API access are offered while the Preview label is retained.",
    "dateNote": "",
    "name": "Hunyuan Hy4 Preview"
  },
  "claude-fable-5-1": {
    "summary": "Fable and Mythos improve coding, knowledge work, and research.",
    "details": "Fable has general access while Mythos remains primarily partner-restricted.",
    "dateNote": ""
  },
  "gemini-3-8-flash": {
    "summary": "Flash improves sustained coding and professional reasoning.",
    "details": "A separate Cyber variant remains available only through approved programs.",
    "dateNote": ""
  },
  "muse-spark-1-3": {
    "summary": "Muse improves long-running agents, coding, and continued collaboration.",
    "details": "Muse Code and the Meta Model API provide access; effort tiers are merged.",
    "dateNote": ""
  },
  "qwen-3-8-max-0902": {
    "summary": "Improves engineering projects, multi-tool orchestration, chart reasoning, and document parsing.",
    "details": "The snapshot focuses on long-running autonomous development and end-to-end task delivery, retaining the one-million-token context and thinking mode.",
    "dateNote": "Snapshot available September 2; default endpoint switched September 5."
  },
  "gpt-6-astra": {
    "summary": "GPT combines reasoning, computer use, and multi-step professional work.",
    "details": "The official announcement focuses on browser tasks and software engineering.",
    "dateNote": "Cross-checked with the September 3 official safety overview; rollout was staged."
  },
  "deepseek-v4-1-flash": {
    "summary": "A new architecture adds native vision and more efficient agent reasoning.",
    "details": "An asymmetric encoder-decoder design underlies this smaller family model. The October 17 snapshot, V4.1-Flash-1017, improves coding and agent tasks and replaces the model in the web app, mobile app and API. Its weights are available under MIT.",
    "dateNote": "Retains the September 10 model release. The October 17 checkpoint is described by DeepSeek as a minor update and is recorded here as a subsequent development."
  },
  "kimi-k2-8-preview": {
    "summary": "Kimi Code gains a stronger coding and agent preview.",
    "details": "Product availability does not imply standalone weights have been released.",
    "dateNote": ""
  },
  "qwen-3-8-omni-flash": {
    "summary": "Text, images, audio, and video share one multimodal model.",
    "details": "The later Realtime interface is an additional service release.",
    "dateNote": ""
  },
  "step-5-preview": {
    "summary": "A flagship preview targets long-running engineering, knowledge work and financial research.",
    "details": "The preview now has public BF16, FP8 and NVFP4 weights under StepFun Model License 1.0. It has 600B total and 27B active parameters and supports multimodal understanding and up to one million tokens of context.",
    "dateNote": "Retains the September 20 preview date, cross-checked with launch reporting. Public weights and the license were verified on October 17; repository preparation dates are not used as the public release date."
  },
  "grok-4-7": {
    "summary": "Grok improves coding, self-verification, and context management.",
    "details": "Reasoning tiers and accelerated hosting are grouped within the model release.",
    "dateNote": ""
  },
  "claude-opus-5-5": {
    "summary": "Opus targets complex knowledge work, coding, and judgment-intensive tasks.",
    "details": "The first Claude 5.5 model focuses on task completion and runtime efficiency.",
    "dateNote": ""
  },
  "gpt-6-sol-luna": {
    "summary": "Two GPT-6 models address different speed and cost requirements.",
    "details": "Sol and Luna build on Astra across products and APIs.",
    "dateNote": "Cross-checked with the September 22 update to the official GPT-6 Astra page."
  },
  "mimo-v2-6": {
    "summary": "MiMo combines multimodal understanding with large-scale reinforcement learning.",
    "details": "Pro and Flash share the official September 22 release; accelerated hosting is not a separate model.",
    "dateNote": ""
  },
  "claude-sonnet-5-5": {
    "summary": "The second Claude 5.5 model supports coding, document processing, and office tasks.",
    "details": "The second Claude 5.5 model complements Opus for everyday use.",
    "dateNote": ""
  },
  "gpt-6-1-sol": {
    "summary": "Improves coding, computer use, and professional work, with task delegation available within a request.",
    "details": "GPT-6.1 Sol retains Sol’s standard uncached input and output rates, supports image input and a 1,050,000-token context, and improves extended tool workflows. Multi-agent is a beta feature; reasoning settings and product integrations are grouped into this release.",
    "dateNote": "Uses the September 29 API changelog. Staged availability in ChatGPT Work and Codex is not counted as a separate model launch."
  },
  "gemini-4-argon": {
    "summary": "A new multimodal generation for complex coding, knowledge work, and cyber defense, with sustained reasoning and tool use.",
    "details": "Initially offered to invited cyber-defense teams through Fairwind on September 30, Argon became generally available through the Gemini API on October 13. Developers can use the paid API; Google AI Ultra provides access in AI Studio and Antigravity, while the Gemini app offers access to Pro and Ultra subscribers.",
    "dateNote": "Keeps the September 30 announcement date. General API availability and the Gemini app rollout on October 13 are recorded as later developments."
  },
  "bloom": {
    "summary": "BigScience releases a 176B multilingual model with weights and training artifacts.",
    "details": "BLOOM generates text in 46 natural languages and 13 programming languages. Developed through a cross-institution research collaboration, it is available for download under the BigScience RAIL license.",
    "dateNote": "Uses the public release announcement, distinct from training completion and the later BLOOMZ release."
  },
  "stanford-alpaca": {
    "summary": "Synthetic instruction data adapts LLaMA into a small instruction-following model.",
    "details": "Alpaca 7B fine-tunes LLaMA 7B on 52,000 instruction examples generated by text-davinci-003. The initial release includes data, generation and training code, and a research demo; model weights are not released at the same time.",
    "dateNote": "Uses the Stanford CRFM research announcement. The work is subject to noncommercial research restrictions."
  },
  "llava": {
    "summary": "Visual instruction tuning connects an image encoder and a language model for multimodal conversation.",
    "details": "Visual Instruction Tuning uses GPT-4-generated image-language instruction data to connect a vision encoder with a language model for image understanding and multimodal dialogue.",
    "dateNote": "Uses the first arXiv submission; later LLaVA 1.5 and 1.6 releases are separate versions."
  },
  "gpt-j-6b": {
    "summary": "An openly available six-billion-parameter language model provides an early foundation for locally run general-purpose LLMs.",
    "details": "Ben Wang and Aran Komatsuzaki trained GPT-J with Mesh Transformer JAX, with weights distributed through EleutherAI. Trained on The Pile with rotary position embeddings, it is a base text-generation model rather than an instruction-tuned chat model.",
    "dateNote": "Uses the author’s June 4, 2021 announcement, rather than inferring a day from month-only repository citation metadata."
  },
  "chatglm-6b": {
    "summary": "Tsinghua KEG and Zhipu release a bilingual Chinese–English dialogue model that can run locally on consumer GPUs after quantization.",
    "details": "The 6.2-billion-parameter ChatGLM-6B combines GLM pretraining with instruction tuning and represents an early open Chinese chat model.",
    "dateNote": "Uses March 14, 2023 from the official historical announcement. This records ChatGLM-6B weight availability, distinct from the concurrent larger ChatGLM closed test."
  },
  "starcoder": {
    "summary": "BigCode releases code-generation models, training resources and evaluation tools covering more than 80 programming languages.",
    "details": "Led jointly by Hugging Face and ServiceNow, BigCode released the roughly 15-billion-parameter StarCoder family trained on The Stack, with code completion and fill-in-the-middle support.",
    "dateNote": "Uses the official May 4, 2023 announcement. The same-day StarCoderBase and StarCoder releases are grouped together."
  },
  "olmo": {
    "summary": "Ai2 releases weights, training code, data and checkpoints to support reproducible research into language-model training and evaluation.",
    "details": "The first OLMo release provides 1B and 7B base models alongside the Dolma dataset, training materials and evaluation tools. Its release extends beyond weights to the resources needed to study training, representing transparent, reproducible LLM research. Models and code use Apache 2.0.",
    "dateNote": "Uses Ai2’s initial February 1, 2024 announcement, separate from later checkpoints and OLMo 2."
  },
  "mellum-2-1-thinking": {
    "summary": "JetBrains releases a reasoning model for coding agents that handles repository tasks with a relatively small active parameter count.",
    "details": "Mellum2.1-12B-A2.5B-Thinking is a mixture-of-experts model with 12B total parameters, about 2.5B active per token and a 131,072-token context. Reinforcement learning uses real repositories and sandbox tools. Apache 2.0 weights support local coding tools and subagents.",
    "dateNote": "Uses October 8, 2026 from the JetBrains announcement. This records the Thinking weight release; later quantized formats and multi-token prediction heads are not treated as simultaneously available."
  },
  "ling-3-1-flash": {
    "summary": "InclusionAI releases a hybrid reasoning model for coding, tool use, and multi-step agent tasks.",
    "details": "Combines hybrid linear attention with MoE, with about 560B total and 25B active parameters per token for extended office, coding and tool-use tasks. Original model weights are public on Hugging Face under the declared MIT license. The model supports up to 1M context, while the current official API exposes 256K.",
    "dateNote": "Uses September 30 from Ant Ling’s official news feed. Dates of third-party catalog integrations are not treated as the original release date."
  },
  "muse-wonder": {
    "summary": "Meta’s new multimodal models target sustained coding, computer use, and professional tasks, with cross-session memory and sub-agent delegation.",
    "details": "Wonder is available in preview through Meta Model API and in Muse Code. Full is limited to Muse Code Power Usage and Maximum Usage subscribers. Both accept text, images, audio, and video and generate text; public API rates apply only to Wonder. A later rollout in the Muse app remains planned.",
    "dateNote": "Uses October 12 from both Meta’s announcement and model card. The two models share one family entry, with their distinct access scopes retained."
  },
  "seedance-1-0": {
    "summary": "Text- and image-to-video generation with multiple shots in one sequence and 1080p output.",
    "details": "The first Seedance generation supports text and image conditioning. Its release report demonstrates multiple shots within a 10-second clip. Native audio generation belongs to later releases.",
    "dateNote": "Dated to the official release announcement; the technical report was submitted to arXiv on June 10, 2025."
  },
  "seedance-1-5-pro": {
    "summary": "Introduces native joint audio-video generation with synchronized dialogue, music and sound effects.",
    "details": "A unified audio-video architecture supports text-driven and image-conditioned generation, including multilingual and dialect lip synchronization. It is the Seedance release that adds native audio to video generation.",
    "dateNote": "Officially launched and made available for use on this date; the technical report was submitted the previous day."
  },
  "seedance-2-0": {
    "summary": "Uses text, image, video and audio references for video generation and editing.",
    "details": "Seedance 2.0 uses a unified audio-video generation architecture and supports 15-second multi-shot output. The announcement specifies up to nine image, three video and three audio references; these limits do not describe version 2.5.",
    "dateNote": "Dated to the February 12 official announcement. Testing in China preceded it; this date does not mark general worldwide API availability."
  },
  "seedance-2-5": {
    "summary": "Extends single-pass generation to 30 seconds with richer references, continuation and targeted editing.",
    "details": "Supports up to 30 images, 10 video clips and 10 audio clips as references, with timestamp-based audio-video editing. The single-pass limit is 30 seconds; longer videos require successive extensions.",
    "dateNote": "Rollout began in Jimeng AI, Doubao Pro and other products on this date. BytePlus ModelArk API access was described as coming soon at launch."
  },
  "wan-2-1": {
    "summary": "Releases video model weights and inference code, with 1.3B and 14B models for text- and image-to-video generation.",
    "details": "The initial release includes T2V-1.3B, T2V-14B and I2V-14B models. The 14B models support 480p and 720p configurations, while 480p is recommended for 1.3B. First/last-frame and VACE editing models were released later.",
    "dateNote": "Dated to the official repository's inference-code and weight release. The technical report followed in March."
  },
  "wan-2-2": {
    "summary": "Introduces mixture-of-experts video generation and releases a 5B text/image-to-video model for consumer GPUs.",
    "details": "The initial models are T2V-A14B, I2V-A14B and TI2V-5B. The 5B model unifies text- and image-to-video generation at 720p and 24 fps. Speech-driven S2V and Animate models followed in separate releases.",
    "dateNote": "Dated to the official repository's code and weight release."
  },
  "wan-2-5-preview": {
    "summary": "Adds native synchronized audio-video generation and extends Wan clips to 10 seconds.",
    "details": "The Apsara Conference preview introduced updated text- and image-to-video models trained for synchronized sound and visuals. This node covers video models only, excluding the image generation and editing models presented alongside them.",
    "dateNote": "Dated to the official Apsara Conference preview, not later regional commercial API launch dates."
  },
  "wan-2-6": {
    "summary": "Adds reference-to-video generation that preserves a subject's appearance and voice across scenes.",
    "details": "The family includes text-, image- and reference-to-video models, with multi-shot narratives and audio-video output up to 15 seconds. Reference videos can provide both appearance and voice. Image models in the same family are outside this node.",
    "dateNote": "Officially announced on this date with access through Model Studio and wan.video."
  },
  "wan-2-7-video": {
    "summary": "Combines video generation, references and natural-language editing with multimodal inputs and shot consistency.",
    "details": "The official video series includes T2V, I2V, R2V and VideoEdit models for generation, continuation, references and editing. Its launch description specifies 2–15-second output at 720p and 1080p. It is distinct from Wan 2.7 Image, released on April 1.",
    "dateNote": "Dated to the April 3 release in the official model changelog; the English announcement was published on April 7."
  },
  "wan-3-0-video": {
    "summary": "Unifies video generation and editing, with clips up to 30 seconds and references from documents and web pages.",
    "details": "The model supports text, image, audio and video inputs, with document and web references, for text-, image-, first/last-frame and reference-to-video generation. Standard output supports 480p, 720p and 1080p. Prime is a speed-optimized version of the same generation and is not a separate node.",
    "dateNote": "Entered testing on August 6; the August 7 announcement required users to apply for access. General launch followed on August 24. The timeline retains the initial testing date."
  },
  "hunyuan-video": {
    "summary": "Tencent releases video model weights and inference code for text-conditioned video generation.",
    "details": "The initial release is a text-to-video model, with official 540p and 720p inference configurations. The image-to-video branch followed in March 2025 and is not part of the December 2024 release's input capabilities.",
    "dateNote": "Dated to the weight and inference-code release consistently recorded by the official repository and license."
  },
  "hunyuan-video-1-5": {
    "summary": "Provides text- and image-to-video generation with 8.3B parameters and lower local hardware requirements.",
    "details": "Unifies text- and image-to-video generation with native 480p and 720p models, plus a separate super-resolution network for 1080p output. 1080p is upscaled output, not a native base-model resolution. Training code followed in December.",
    "dateNote": "Dated to the November 20 code and weight release recorded by this model's repository and model card; the license and parent repository announcement state November 21."
  },
  "sora": {
    "name": "Sora",
    "summary": "OpenAI introduced the Sora research model for generating video from text, images or existing footage.",
    "details": "Its diffusion transformer operates on spacetime patches and demonstrated videos up to about a minute long. The initial release was a research preview with invited evaluation. The later Sora consumer service closed on April 26, 2026.",
    "dateNote": "The date marks the research announcement and technical report, not a public product launch."
  },
  "veo": {
    "name": "Veo",
    "summary": "Google DeepMind introduced Veo with 1080p video demonstrations and a private VideoFX preview for selected creators.",
    "details": "The launch emphasized text-directed scenes and camera work, demonstrating clips longer than a minute. A December 2024 Vertex AI preview explicitly supported both text and image prompts for the same generation.",
    "dateNote": "The date marks the Google I/O announcement and creator preview, not the later Vertex AI launch."
  },
  "sora-turbo": {
    "name": "Sora Turbo",
    "summary": "The faster Sora Turbo model launched through Sora.com for ChatGPT Plus and Pro subscribers.",
    "details": "It supported text, image and video inputs with storyboard, remix and extension tools. Product limits reached 1080p and 20 seconds, depending on the plan. The Sora web and app service closed on April 26, 2026.",
    "dateNote": "The date marks the distinct Sora Turbo model and Sora.com launch, separate from the February research preview."
  },
  "veo-2": {
    "name": "Veo 2",
    "summary": "Veo 2 updated motion, physical realism and camera controls, with expanded access through VideoFX.",
    "details": "It later powered video generation in Gemini and Whisk: Gemini produced eight-second 720p clips from text, while Whisk animated images into eight-second clips. Launch demonstrations and later product limits are kept separate.",
    "dateNote": "The date marks the Veo 2 announcement and expanded VideoFX preview. Gemini and Whisk integration followed in April 2025."
  },
  "veo-3": {
    "name": "Veo 3",
    "summary": "Veo 3 introduced native dialogue, sound effects and ambient audio alongside video generation in Gemini, Flow and Vertex AI.",
    "details": "Text and image prompts control a generation process that produces both sound and video. Initial access targeted U.S. Google AI Ultra users and enterprise channels. Later API and regional releases had separate schedules; the Veo 3.0 API documentation now marks the model deprecated.",
    "dateNote": "The date marks the Google I/O model launch and initial access, not simultaneous general availability in every region or API variant."
  },
  "sora-2": {
    "name": "Sora 2",
    "summary": "Sora 2 added synchronized dialogue and sound effects, with updated motion, physical consistency and shot control.",
    "details": "Initial access used invitations in the U.S. and Canada through the Sora app and web, alongside the higher-quality Sora 2 Pro variant. The web and app closed on April 26, 2026; Sora 2, Pro and the Videos API shut down on September 24.",
    "dateNote": "The date marks the model and invitation-based product launch. API access was still planned for a later release."
  },
  "veo-3-1": {
    "name": "Veo 3.1",
    "summary": "Veo 3.1 updated audiovisual generation and prompt following, with stronger reference-image, frame and extension controls.",
    "details": "The model arrived through Flow, Gemini and developer services, with individual editing features rolling out by channel. A January 2026 update added portrait reference-image generation and enhanced 1080p/4K output. Fast and Lite are speed and cost tiers of the same generation.",
    "dateNote": "The date marks the initial Veo 3.1 announcement and preview. Features added in 2026 are not presented as launch specifications."
  },
  "gemini-omni-flash": {
    "name": "Gemini Omni Flash",
    "summary": "The first Gemini Omni model combined multimodal inputs with video generation and conversational editing.",
    "details": "It arrived in Gemini, Google Flow and YouTube creation tools, combining text, images, video and restricted voice references to produce video with audio. Audio references were initially limited to voice identity; standalone image and audio outputs remained planned.",
    "dateNote": "The date marks the Google I/O announcement and start of consumer rollout. Developer APIs were announced for a later release."
  },
  "gemini-omni-1-1-flash": {
    "name": "Gemini Omni 1.1 Flash",
    "summary": "Omni 1.1 Flash added scene extension, first-and-last-frame control, 360p drafts and upscaled output up to 4K.",
    "details": "Extensions add ten-second segments up to 40 seconds in total, using up to ten seconds of prior context; this is not a 40-second single-generation limit. It launched through Gemini and enterprise APIs and Flow, with integrations documented for Adobe Firefly, Figma Weave and Runway.",
    "dateNote": "The date marks the 1.1 model and added controls, not a duplicate entry for the original Omni API rollout."
  },
  "kling-1": {
    "name": "Kling",
    "summary": "Kuaishou opened testing for Kling, a DiT video model designed to model motion across space and time.",
    "details": "The original Kling combined a proprietary 3D VAE with spatiotemporal attention for text-to-video, later adding image-to-video and video extension.",
    "dateNote": "Uses June 6, when testing applications opened, as confirmed by Kuaishou's retrospective. The English announcement followed on June 10 and global beta access on July 25."
  },
  "kling-2": {
    "name": "Kling 2.0",
    "summary": "Kling's second generation introduced multimodal visual language for generation and editing with text, reference images and video clips.",
    "details": "The 2.0 Master edition improved motion and instruction following, with text- and image-guided insertion, removal and replacement within video clips.",
    "dateNote": "Uses the date of Kuaishou's global Kling 2.0 launch."
  },
  "kling-o1": {
    "name": "Kling O1",
    "summary": "Kling O1 unified video generation and editing in a multimodal model guided by reference material and natural language.",
    "details": "It accepts text, image, video and subject references for generation, local editing, style transfer and shot extension.",
    "dateNote": "The December 2 announcement explicitly states that the model launched on December 1."
  },
  "kling-3": {
    "name": "Kling 3.0 / 3.0 Omni",
    "summary": "Kling 3.0 brought native audiovisual generation, multi-shot storytelling and subject consistency into one video-model generation.",
    "details": "Video generation extends to 15 seconds. Omni adds character and voice references from video alongside shot-by-shot storyboard control.",
    "dateNote": "Uses the official announcement date; initial early access was limited to Ultra subscribers."
  },
  "runway-gen-1": {
    "name": "Runway Gen-1",
    "summary": "Runway Gen-1 used an input video's structure while changing its appearance through text or image references.",
    "details": "The diffusion model separated structure and content control for video stylization, storyboard visualization and localized transformations.",
    "dateNote": "Uses the associated paper's first arXiv submission date; the official product research page only specifies February 2023."
  },
  "runway-gen-2": {
    "name": "Runway Gen-2",
    "summary": "Runway Gen-2 added text-to-video generation alongside image- and video-guided control.",
    "details": "Unlike Gen-1's reliance on existing video structure, Gen-2 could generate new video from text, with additional image-reference, stylization and storyboard modes.",
    "dateNote": "Uses the March 20 date of Runway's official announcement video; the public web product followed later. The research page's current month field conflicts with that announcement record."
  },
  "runway-gen-3-alpha": {
    "name": "Runway Gen-3 Alpha",
    "summary": "Runway Gen-3 Alpha introduced a new training infrastructure for stronger motion, detail and temporal control.",
    "details": "Joint image-video training and dense temporal captions describe actions within a clip, improving complex scenes and human motion.",
    "dateNote": "Uses the official model announcement date; public availability expanded afterward."
  },
  "runway-gen-4": {
    "name": "Runway Gen-4",
    "summary": "Runway Gen-4 used reference images to maintain consistent characters, objects and scenes across shots.",
    "details": "The video model combines an input image with a text prompt, emphasizing visual continuity across changes in viewpoint and setting.",
    "dateNote": "Uses the March 31 release date recorded in Runway's official research index."
  },
  "runway-gen-4-5": {
    "name": "Runway Gen-4.5",
    "summary": "Runway Gen-4.5 improves complex motion, physical consistency and prompt adherence.",
    "details": "It launched with text-to-video and later added image-to-video, with pretraining and post-training improvements to motion and temporal stability.",
    "dateNote": "Uses December 1 from the model announcement. The research index lists November 1, which conflicts with the article and its November 30 evaluation date."
  },
  "hailuo-01": {
    "name": "Hailuo-01 (Video-01)",
    "summary": "MiniMax released Video-01, the first generation of its Hailuo video-model line.",
    "details": "It generated short clips from text, with image references supported in the first-generation family. Official specifications list 720p, 25fps and up to six seconds.",
    "dateNote": "Uses August 31 from MiniMax's original Video-01 announcement. Later Hailuo-01 naming and image-to-video support are grouped in this generation."
  },
  "hailuo-02": {
    "name": "Hailuo 02",
    "summary": "Hailuo 02 introduced noise-aware compute redistribution to improve physical motion, instruction following and video detail.",
    "details": "It supports text-to-video and image-to-video with native 1080p output, while clip duration depends on resolution.",
    "dateNote": "Uses the official MiniMax Hailuo 02 release date."
  },
  "minimax-h3": {
    "name": "MiniMax H3",
    "summary": "MiniMax H3 unified multimodal references with native audiovisual generation and subsequently released its model weights.",
    "details": "The 33B single-stream Transformer accepts text, image, video and audio references. Open base checkpoints generate 768p audiovisual clips; the full hosted workflow supports 2K.",
    "dateNote": "The model launched on July 31; MiniMax announced open weights on August 3. The license's August 2 date is not treated as the original release."
  },
  "reflection-beam-1": {
    "summary": "Reflection’s first model targets coding, reasoning and sustained agent tasks, with weights subsequently released under Apache 2.0.",
    "details": "The sparse MoE has 501B total and 23B active parameters, a one-million-token context, and text input and output. BF16, FP8 and NVFP4 weights support established inference frameworks and coding tools.",
    "dateNote": "First announced on October 5 with early-access applications; weights and public services launched on October 16. Precision formats and the speculative decoder are grouped here."
  },
  "muse-spark-open": {
    "summary": "Meta releases a distinct open-weight Muse Spark model for multimodal understanding, coding and sustained tool use.",
    "details": "The model has 816B total and 42B active parameters and a one-million-token context. It accepts text, images, audio and video and generates text. The open version has additional safety post-training and uses the Muse Model License, with local deployment and third-party inference support.",
    "dateNote": "Uses October 15, confirmed by the announcement and model card. This is a distinct open-weight model; other Muse models retain their own access status."
  },
  "nemotron-3-5-vl-bolt": {
    "summary": "NVIDIA releases multimodal agent models for server and local deployment, with weights, training resources and inference support.",
    "details": "Super VL 120B-A12B combines MoE and a hybrid Mamba-Transformer architecture with text, image and video input. Bolt 74B-A9B 24GB targets low-memory deployment. On October 23, Bolt E4B added BF16 and 4GB quantized releases post-trained from Gemma 4 E4B for local conversation and tool use. E4B accepts and returns text only.",
    "dateNote": "Uses the October 15 release of Super VL and Bolt 74B-A9B. Bolt E4B became available on October 23 and is recorded as a later update to the family."
  },
  "kling-4": {
    "summary": "Kling 4.0 extends single-pass video generation to 30 seconds and improves reference control, keyframes and audiovisual consistency.",
    "details": "Supports up to 15 reference assets and 10 keyframes, including images, video and subject voice references. General availability began on October 15. Two-minute extensions and enterprise API access remain planned in the later announcement; announced 4K and HDR specifications are not treated as broadly available.",
    "dateNote": "Uses the main model’s September 30 preview announcement. Flash had early access for Ultra annual subscribers on September 28. Kuaishou confirms the October 15 general launch; the article publication date is not substituted for it."
  },
  "flux-3-image-klein": {
    "summary": "An open-weight image generation and editing model with multiple image references, bounding-box layout control and local deployment.",
    "details": "Its image generator has 5.6B parameters, with a separate Qwen3-VL text encoder. Base and distilled checkpoints were released together, supporting up to ten reference images and 4K output, with Diffusers and ComfyUI integration. Weights use the FLUX Kommunity License v.1.0 with conditions on commercial use.",
    "dateNote": "Uses October 15, 2026, confirmed by the official announcement and API release notes. Base, distilled and quantized variants are grouped into one release."
  },
  "lfm-2-5-24b-a2b": {
    "summary": "An open-weight reasoning model for on-device agents, using a hybrid sparse-expert architecture for local tool use.",
    "details": "It has 24.0B total and approximately 2.45B active parameters, combining short convolutions with grouped-query attention and a 131,072-token context. Base and post-trained checkpoints support runtimes including llama.cpp, MLX and vLLM. Input and output are text only. Weights use the LFM Open License v1.0, which includes a commercial revenue threshold.",
    "dateNote": "Uses the official Liquid AI announcement dated October 13, 2026. Base and post-trained checkpoints are grouped together; GGUF, MLX and quantized formats are not separate releases."
  },
  "dall-e": {
    "summary": "A 12B-parameter autoregressive model that generates images from natural language and demonstrates concept composition and image completion.",
    "details": "Encodes text and images in one token sequence and uses a Transformer to generate images autoregressively. The research was first disclosed in January 2021, ahead of the paper in February. The full generator was not released; the later public repository contains only the discrete VAE.",
    "dateNote": "Uses the first research announcement on January 5, 2021; the paper was submitted to arXiv on February 24. This is not an API launch or a release of the complete model weights."
  },
  "dall-e-2": {
    "summary": "Combines CLIP image representations with diffusion generation for text-to-image creation, inpainting and image variations.",
    "details": "A prior predicts CLIP image representations, which a diffusion decoder converts into images. It began as a limited research preview before expanding into a public service. By September 2022, OpenAI reported over 1.5 million users creating more than two million images daily. Model weights were not released.",
    "dateNote": "Uses the April 6, 2022 research preview recorded in the official system card. The April 13 paper submission, September waitlist removal and later API access are not treated as separate initial releases."
  },
  "dall-e-3": {
    "summary": "Improves prompt adherence with richer training captions and brings image creation into ChatGPT conversations.",
    "details": "Improves generation from detailed prompts, including object details and text within images, while ChatGPT helps refine descriptions. Announced as a research preview in September 2023, it reached ChatGPT Plus and Enterprise in October. The model itself takes text and produces images; weights were not released.",
    "dateNote": "Uses the September 20, 2023 research-preview announcement. The wider ChatGPT release on October 19 is a later access event and does not replace the first public date."
  },
  "gpt-4o-image": {
    "name": "GPT-4o Image Generation",
    "summary": "Brings native image generation to ChatGPT, with text rendering, conversational revisions and reference-image editing.",
    "details": "Generates and edits images from text and image inputs across multiple conversation turns. Rollout in ChatGPT began in March 2025, followed by API access as gpt-image-1 on April 23. OpenAI reported over 130 million users generating more than 700 million images in the first week. This records the image-generation launch separately from the original GPT-4o release in 2024.",
    "dateNote": "Uses the March 25, 2025 announcement of native image generation in ChatGPT. API access through gpt-image-1 on April 23 is recorded here rather than duplicated as another model launch."
  },
  "imagen": {
    "summary": "Combines a frozen large text encoder with cascaded diffusion to study the role of language understanding in image generation.",
    "details": "Uses T5-XXL text embeddings and cascaded diffusion to generate 1024×1024 images. The paper studies how scaling the text encoder improves prompt alignment and introduces DrawBench. The initial disclosure consisted of research and examples, without a public demo, code or model weights.",
    "dateNote": "Uses the paper's first arXiv submission on May 23, 2022. This is a research disclosure; dates for later commercial Imagen services are not substituted for this model's debut."
  },
  "imagen-3": {
    "summary": "Improves image detail, long-prompt adherence and text rendering, with an early creator preview in ImageFX.",
    "details": "Announced at Google I/O 2024, this text-to-image model initially offered a private ImageFX preview to selected creators with a waitlist. It later reached Google's image-creation and cloud services. Complete model weights were not released.",
    "dateNote": "Uses the first announcement and private preview on May 14, 2024. The August paper, wider ImageFX access and later Vertex AI availability do not replace this date."
  },
  "imagen-4": {
    "summary": "Improves visual detail and typography, with up to 2K output and integration into Gemini and creative tools.",
    "details": "Uses latent diffusion, with improvements to material detail, spelling and layout. It launched in Gemini and creative workflows including Flow, while Vertex AI announced preview endpoints the same day. Public generation endpoints take text and do not support image editing.",
    "dateNote": "Uses the Google I/O announcement and product integration on May 20, 2025. Later API general availability and Fast or Ultra variants are grouped into this family release."
  },
  "stable-diffusion-1": {
    "summary": "Public weights and inference code bring latent text-to-image diffusion to local deployment and customization.",
    "details": "Developed through a collaboration between CompVis, Stability AI and Runway, with v1.4 the recommended public checkpoint. A CLIP text encoder conditions latent denoising, with text-to-image and text-guided image-to-image workflows at a 512 × 512 training resolution. Weights use CreativeML OpenRAIL-M, permitting commercial use subject to use restrictions.",
    "dateNote": "Dated to the public weight release on August 22, 2022, rather than earlier researcher access or the latent-diffusion paper."
  },
  "sdxl-1": {
    "summary": "Releases base and refiner models for 1024-pixel image generation, with multiple aspect ratios and customization support.",
    "details": "Adds a second text encoder and a larger denoising network to latent diffusion. The base model can generate images on its own, with an optional refiner for the final denoising steps. Weights, inference code and hosted access were released together under CreativeML OpenRAIL++-M for the weights.",
    "dateNote": "Dated to the SDXL 1.0 weight release on July 26, 2023, not the earlier 0.9 research release or the July 4 technical report."
  },
  "flux-1-open": {
    "summary": "Releases 12B text-to-image weights in quality-oriented dev and few-step schnell variants.",
    "details": "Uses a rectified-flow transformer: dev applies guidance distillation, while schnell generates images in 1–4 steps, with ComfyUI and Diffusers support. Dev weights use a non-commercial license; schnell uses Apache 2.0. The API-only pro variant launched on the same day is outside this open-weight entry.",
    "dateNote": "Dated to Black Forest Labs' August 1, 2024 announcement; the simultaneous dev and schnell weight releases are grouped together."
  },
  "flux-1-kontext-dev": {
    "summary": "Releases open weights for instruction-based image editing, supporting iterative changes and subject consistency.",
    "details": "A 12B rectified-flow transformer takes an image and editing instructions to alter local content or an entire scene. The dev checkpoint focuses on image editing and works with the existing FLUX inference code, ComfyUI and Diffusers under the FLUX.1 non-commercial license.",
    "dateNote": "Dated to the June 26, 2025 public dev-weight release. The May 29 launch covered pro / max APIs while dev remained in private beta."
  },
  "midjourney-v6": {
    "summary": "Improves long-prompt understanding, visual coherence and image prompting, expanding control over Midjourney image creation.",
    "details": "V6 initially opened to users as an alpha, generating images from text and reference images. The official version history records February 14, 2024 as its switch to the default model, not its initial release. It is offered through Midjourney's hosted service; model weights are not public.",
    "dateNote": "Uses December 20, 2023 from Midjourney's official version history. Some coverage uses December 21; February 14, 2024 was the default-version change."
  },
  "qwen-image": {
    "summary": "Releases a 20B image-generation model for Chinese and English text rendering, complex layouts and varied visual styles.",
    "details": "Uses a multimodal diffusion Transformer (MMDiT) architecture. The initial open weights perform text-to-image generation and are licensed under Apache 2.0. Diffusers deployment is supported, with native ComfyUI support arriving the next day. Qwen-Image-Edit weights followed separately on August 18.",
    "dateNote": "Uses the August 4, 2025 weight release confirmed by the announcement, model card and repository log. The later editing model is not treated as part of the initial weights."
  },
  "seedream-4": {
    "summary": "Unifies image generation and editing, with multi-image references, batch creation and output up to 4K.",
    "details": "Accepts text, images or combined inputs for text-to-image generation, single- and multi-image editing, and image composition. It launched through Jimeng, Doubao and Volcano Engine, with third-party inference integrations also available. The model is offered as a hosted service without public weights.",
    "dateNote": "Uses September 9, 2025 from the official Seed announcement, rather than the September 24 technical report or third-party integration dates."
  },
  "minimax-m3-1-flash": {
    "summary": "A multimodal reasoning model for coding, computer use and multistep tasks, with a million-token context and adjustable reasoning effort.",
    "details": "Accepts text, images and video and returns text through the MiniMax API, M Plan and MiniMax Code, with five reasoning-effort levels. Complete weights were subsequently made public for local deployment. The MiniMax Community License includes attribution, notification and additional authorization requirements for commercial use above a specified revenue threshold.",
    "dateNote": "Uses the October 19 production-release date. The subsequent weight release is recorded within this entry."
  },
  "mercury-3": {
    "summary": "A diffusion language model with a million-token context, reasoning, tool calling and structured outputs.",
    "details": "Generates text through iterative parallel denoising for low-latency chat, coding and agent tasks. Its OpenAI-compatible API supports four reasoning-effort levels and up to 131,072 output tokens. It launched through Inception, OpenRouter, Baseten and Vercel. This model accepts and returns text only.",
    "dateNote": "Uses the official Inception announcement dated October 19, 2026, when the API became available. This is distinct from the earlier Mercury, Mercury 2 and 2.5 releases."
  },
  "kimi-k3-1-pro": {
    "summary": "A million-token model improves coding, spatial reasoning and long-running tasks, with standard and high-speed serving options.",
    "details": "Accepts text, images and video and returns text through Kimi Code and the API. Reasoning remains enabled with low, high and max effort settings. Highspeed offers the same stated capabilities through faster serving. Full weights are planned by November 4; public weights were not confirmed at this review.",
    "dateNote": "Uses October 23, the availability date recorded in the Kimi Code release notes. Research-page update timestamps are not treated as first release dates, and planned weight release is not treated as completed."
  },
  "canva-craft": {
    "summary": "A two-stage model plans composition before rendering images, emphasizing text, layout and visual hierarchy for design.",
    "details": "Available through Canva Dream Lab and its public API, with output up to 2K across more than 30 aspect ratios. Magic Layers can turn generated images into editable elements. Reference-image input, advanced editing and fast or ultrafast variants remain future plans.",
    "dateNote": "Uses the October 22 date of Canva’s announcement. This entry covers the available text-to-image model, not planned capabilities."
  },
  "flux-3-max": {
    "summary": "A post-trained FLUX 3 variant combines inference optimization with text-, image- and keyframe-driven video generation.",
    "details": "Developed by fal Research with Black Forest Labs through reinforcement learning and inference optimization for iterative video workflows. The fal API supports 5–20 second clips, native 720p output, 1080p upscaling and optional generated audio. This is a post-trained model variant.",
    "dateNote": "Uses October 19, the availability date explicitly stated in fal’s release. The post-trained variant is recorded separately from the original FLUX 3 model."
  }
};
window.ATLAS_TAGS_EN = {
  "对话产品": "Chat product",
  "模型架构": "Architecture",
  "注意力机制": "Attention",
  "预训练": "Pretraining",
  "文本": "Text",
  "双向编码": "Bidirectional encoding",
  "语言理解": "Language understanding",
  "文本生成": "Text generation",
  "零样本": "Zero-shot",
  "迁移学习": "Transfer learning",
  "规模化": "Scaling",
  "少样本学习": "Few-shot learning",
  "代码生成": "Code generation",
  "自然语言编程": "Natural-language coding",
  "指令遵循": "Instruction following",
  "推理": "Reasoning",
  "对话": "Conversation",
  "基础模型": "Foundation model",
  "研究访问": "Research access",
  "安全对齐": "Alignment",
  "多模态": "Multimodal",
  "复杂推理": "Complex reasoning",
  "长上下文": "Long context",
  "开放权重": "Open weights",
  "对话模型": "Chat model",
  "中英双语": "Bilingual",
  "高效模型": "Efficient model",
  "实时信息": "Live information",
  "原生多模态": "Native multimodality",
  "模型家族": "Model family",
  "混合专家": "Mixture of experts",
  "轻量模型": "Small model",
  "视觉理解": "Vision",
  "端侧部署": "On-device",
  "高效推理": "Efficient inference",
  "实时交互": "Real-time interaction",
  "多语言": "Multilingual",
  "编程": "Coding",
  "推理模型": "Reasoning model",
  "数学与代码": "Math & code",
  "代码与数学": "Code & math",
  "云端模型": "Cloud model",
  "工具使用": "Tool use",
  "搜索": "Search",
  "混合推理": "Hybrid reasoning",
  "自然对话": "Natural conversation",
  "混合架构": "Hybrid architecture",
  "企业应用": "Enterprise",
  "长任务": "Long tasks",
  "混合注意力": "Hybrid attention",
  "智能体": "Agents",
  "知识工作": "Knowledge work",
  "智能体协作": "Agent collaboration",
  "智能体工程": "Agent engineering",
  "低延迟": "Low latency",
  "计算机操作": "Computer use",
  "软件工程": "Software engineering",
  "预览模型": "Preview",
  "协作": "Collaboration",
  "复杂任务": "Complex tasks",
  "研究": "Research",
  "计算机使用": "Computer use",
  "专业工作": "Professional work",
  "全模态": "Omnimodal",
  "终端": "Terminal",
  "工作流": "Workflows",
  "执行环境": "Runtime",
  "多智能体": "Multi-agent",
  "协议": "Protocol",
  "网页操作": "Browser use",
  "开源工具": "Open source",
  "任务规划": "Planning",
  "会话管理": "Sessions",
  "数据连接": "Data connections",
  "自主编程": "Autonomous coding",
  "视频生成": "Video generation",
  "音视频生成": "Audio-video generation",
  "扩散 Transformer": "Diffusion transformer",
  "VideoFX": "VideoFX",
  "分镜": "Storyboards",
  "镜头控制": "Camera control",
  "原生音频": "Native audio",
  "参考图": "Reference images",
  "对话编辑": "Conversational editing",
  "DiT": "DiT",
  "视频编辑": "Video editing",
  "统一多模态": "Unified multimodal",
  "文生视频": "Text-to-video",
  "时间控制": "Temporal control",
  "主体一致性": "Visual consistency",
  "运动建模": "Motion modeling",
  "NCR": "NCR",
  "图像生成": "Image generation",
  "图像编辑": "Image editing",
  "端侧模型": "On-device model",
  "潜空间扩散": "Latent diffusion",
  "自回归": "Autoregressive",
  "扩散模型": "Diffusion",
  "流匹配": "Flow matching",
  "图像参考": "Image prompting",
  "多图参考": "Multi-image references",
  "文字渲染": "Text rendering",
  "提示词遵循": "Prompt adherence"
};
window.MODEL_THEMES_EN = {
  "2017": "The Transformer architecture",
  "2018": "Pretraining research",
  "2019": "Scale and transfer learning",
  "2020": "Few-shot learning",
  "2021": "Code and image generation",
  "2022": "Chat products and diffusion models",
  "2023": "Major model families",
  "2024": "Multimodality and reasoning",
  "2025": "Reasoning models and tool use",
  "2026": "Multimodality and agents"
};
