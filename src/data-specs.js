// First-party specifications. Per-entry checkedAt overrides the baseline date.
// Omitted fields are unverified.
// Each variant names its API snapshot, checkpoint, or paper configuration.
// Numeric limits are exact; K/M strings retain the source convention.
window.MODEL_ATLAS_SPECS = Object.freeze({
  "checkedAt": "2026-10-03",
  "entries": {
    "claude-haiku-5-5": {
      "checkedAt": "2026-10-08",
      "variants": [
        {
          "name": "claude-haiku-5-5",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/overview"
          ]
        }
      ]
    },
    "mistral-large-4-preview": {
      "checkedAt": "2026-10-08",
      "variants": [
        {
          "name": "mistral-large-4",
          "basis": "api",
          "contextTokens": "1M",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://docs.mistral.ai/models/mistral-large-4-0",
            "https://docs.mistral.ai/resources/changelogs"
          ]
        }
      ],
      "note": "采用当前官方 API 文档的 1M 上下文，区别于榜单中受测配置的窗口。",
      "noteEn": "Uses the 1M context in the current official API documentation; the benchmarked configuration may use a different window."
    },
    "gpt-6-astra": {
      "variants": [
        {
          "name": "gpt-6-astra",
          "basis": "api",
          "contextTokens": 1050000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-6-astra"
          ]
        }
      ]
    },
    "gpt-6-sol-luna": {
      "variants": [
        {
          "name": "gpt-6-sol",
          "basis": "api",
          "contextTokens": 1050000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-6-sol"
          ]
        },
        {
          "name": "gpt-6-luna",
          "basis": "api",
          "contextTokens": 1050000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-6-luna"
          ]
        }
      ]
    },
    "gpt-5-6": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "gpt-5.6-sol",
          "basis": "api",
          "contextTokens": 1050000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.6"
          ]
        }
      ],
      "note": "此处列出 GPT-5.6 Sol 的规格。",
      "noteEn": "These specifications cover GPT-5.6 Sol."
    },
    "gpt-5-5": {
      "variants": [
        {
          "name": "gpt-5.5-2026-04-23",
          "basis": "api",
          "contextTokens": 1050000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.5"
          ]
        }
      ]
    },
    "gpt-5-4": {
      "variants": [
        {
          "name": "gpt-5.4-2026-03-05",
          "basis": "api",
          "contextTokens": 1050000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.4"
          ]
        }
      ]
    },
    "gpt-5-3-codex": {
      "variants": [
        {
          "name": "gpt-5.3-codex",
          "basis": "api",
          "contextTokens": 400000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.3-codex"
          ]
        }
      ]
    },
    "gpt-5-2": {
      "variants": [
        {
          "name": "gpt-5.2-2025-12-11",
          "basis": "api",
          "contextTokens": 400000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.2"
          ]
        }
      ]
    },
    "gpt-5-1": {
      "cardScope": "snapshot",
      "variants": [
        {
          "name": "gpt-5.1-2025-11-13",
          "basis": "api",
          "contextTokens": 400000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.1"
          ]
        }
      ]
    },
    "gpt-5": {
      "variants": [
        {
          "name": "gpt-5-2025-08-07",
          "basis": "api",
          "contextTokens": 400000,
          "inputTokens": 272000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5"
          ]
        }
      ]
    },
    "gpt-4-1": {
      "variants": [
        {
          "name": "gpt-4.1-2025-04-14",
          "basis": "api",
          "contextTokens": 1047576,
          "outputTokens": 32768,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4.1"
          ]
        }
      ]
    },
    "gpt-4-5": {
      "variants": [
        {
          "name": "gpt-4.5-preview-2025-02-27",
          "basis": "api",
          "contextTokens": 128000,
          "outputTokens": 16384,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4.5-preview"
          ]
        }
      ]
    },
    "gpt-4o": {
      "cardScope": "snapshot",
      "variants": [
        {
          "name": "gpt-4o-2024-08-06",
          "basis": "api",
          "contextTokens": 128000,
          "outputTokens": 16384,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4o"
          ]
        }
      ],
      "note": "规格对应上述 API 快照，可能晚于时间线中的首发日期。",
      "noteEn": "Specifications apply to the API snapshot above, which may postdate the original release."
    },
    "gpt-4o-mini": {
      "variants": [
        {
          "name": "gpt-4o-mini-2024-07-18",
          "basis": "api",
          "contextTokens": 128000,
          "outputTokens": 16384,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4o-mini"
          ]
        }
      ]
    },
    "gpt-4-turbo": {
      "cardScope": "snapshot",
      "variants": [
        {
          "name": "gpt-4-turbo-2024-04-09",
          "basis": "api",
          "contextTokens": 128000,
          "outputTokens": 4096,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4-turbo"
          ]
        }
      ],
      "note": "规格对应上述 API 快照，可能晚于时间线中的首发日期。",
      "noteEn": "Specifications apply to the API snapshot above, which may postdate the original release."
    },
    "gpt-4": {
      "cardScope": "snapshot",
      "variants": [
        {
          "name": "gpt-4-0613",
          "basis": "api",
          "contextTokens": 8192,
          "outputTokens": 8192,
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4"
          ]
        }
      ],
      "note": "规格对应上述 API 快照，可能晚于时间线中的首发日期。",
      "noteEn": "Specifications apply to the API snapshot above, which may postdate the original release."
    },
    "o3-o4-mini": {
      "variants": [
        {
          "name": "o4-mini-2025-04-16",
          "basis": "api",
          "contextTokens": 200000,
          "outputTokens": 100000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o4-mini"
          ]
        },
        {
          "name": "o3-2025-04-16",
          "basis": "api",
          "contextTokens": 200000,
          "outputTokens": 100000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o3"
          ]
        }
      ]
    },
    "o3-mini": {
      "variants": [
        {
          "name": "o3-mini-2025-01-31",
          "basis": "api",
          "contextTokens": 200000,
          "outputTokens": 100000,
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o3-mini"
          ]
        }
      ]
    },
    "o1": {
      "cardScope": "snapshot",
      "variants": [
        {
          "name": "o1-2024-12-17",
          "basis": "api",
          "contextTokens": 200000,
          "outputTokens": 100000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o1"
          ]
        }
      ],
      "note": "规格对应上述 API 快照，可能晚于时间线中的首发日期。",
      "noteEn": "Specifications apply to the API snapshot above, which may postdate the original release."
    },
    "o1-preview": {
      "variants": [
        {
          "name": "o1-preview-2024-09-12",
          "basis": "api",
          "contextTokens": 128000,
          "outputTokens": 32768,
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o1-preview"
          ]
        }
      ]
    },
    "gpt-oss": {
      "variants": [
        {
          "name": "gpt-oss-120b",
          "basis": "weights",
          "contextTokens": 131072,
          "outputTokens": 131072,
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-oss-120b"
          ]
        },
        {
          "name": "gpt-oss-20b",
          "basis": "weights",
          "contextTokens": 131072,
          "outputTokens": 131072,
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-oss-20b"
          ]
        }
      ]
    },
    "claude-fable-5-1": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "Claude Fable 5.1",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/fable-5-1/overview"
          ]
        }
      ],
      "note": "此处列出 Fable 的同步 Messages API 规格，不适用于同节点的 Mythos。",
      "noteEn": "These are Fable specifications for the synchronous Messages API; they do not describe Mythos."
    },
    "claude-fable-5": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "Claude Fable 5",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/fable-5/overview"
          ]
        }
      ],
      "note": "此处列出 Fable 的同步 Messages API 规格，不适用于同节点的 Mythos。",
      "noteEn": "These are Fable specifications for the synchronous Messages API; they do not describe Mythos."
    },
    "claude-opus-5-5": {
      "variants": [
        {
          "name": "Claude Opus 5.5",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-5-5/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-opus-5": {
      "variants": [
        {
          "name": "Claude Opus 5",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-5/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-sonnet-5-5": {
      "variants": [
        {
          "name": "Claude Sonnet 5.5",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/sonnet-5-5/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-sonnet-5": {
      "variants": [
        {
          "name": "Claude Sonnet 5",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/sonnet-5/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-haiku-4-5": {
      "variants": [
        {
          "name": "Claude Haiku 4.5",
          "basis": "api",
          "contextTokens": "200K",
          "outputTokens": "64K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/haiku-4-5/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-opus-4-8": {
      "variants": [
        {
          "name": "Claude Opus 4.8",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-4-8/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-opus-4-7": {
      "variants": [
        {
          "name": "Claude Opus 4.7",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-4-7/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-opus-4-6": {
      "variants": [
        {
          "name": "Claude Opus 4.6",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-4-6/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-opus-4-5": {
      "variants": [
        {
          "name": "Claude Opus 4.5",
          "basis": "api",
          "contextTokens": "200K",
          "outputTokens": "64K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-4-5/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-sonnet-4-6": {
      "variants": [
        {
          "name": "Claude Sonnet 4.6",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/sonnet-4-6/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "claude-sonnet-4-5": {
      "variants": [
        {
          "name": "Claude Sonnet 4.5",
          "basis": "api",
          "contextTokens": "200K",
          "outputTokens": "64K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/sonnet-4-5/overview"
          ]
        }
      ],
      "note": "输出上限为同步 Messages API 的标准限制。",
      "noteEn": "Output limit is for the synchronous Messages API."
    },
    "gemini-3-8-flash": {
      "variants": [
        {
          "name": "Gemini 3.8 Flash",
          "basis": "api",
          "inputTokens": 1048576,
          "outputTokens": 65536,
          "input": [
            "text",
            "image",
            "audio",
            "video",
            "pdf"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash"
          ]
        }
      ],
      "note": "输入与输出上限按 Gemini API 文档分别列出。",
      "noteEn": "Input and output limits are listed separately in the Gemini API documentation."
    },
    "gemini-3-7-flash": {
      "variants": [
        {
          "name": "Gemini 3.7 Flash",
          "basis": "api",
          "inputTokens": 1048576,
          "outputTokens": 65536,
          "input": [
            "text",
            "image",
            "audio",
            "video",
            "pdf"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash"
          ]
        }
      ],
      "note": "输入与输出上限按 Gemini API 文档分别列出。",
      "noteEn": "Input and output limits are listed separately in the Gemini API documentation."
    },
    "gemini-3-6-flash": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "Gemini 3.6 Flash",
          "basis": "api",
          "inputTokens": 1048576,
          "outputTokens": 65536,
          "input": [
            "text",
            "image",
            "audio",
            "video",
            "pdf"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash"
          ]
        }
      ],
      "note": "输入与输出上限按 Gemini API 文档分别列出。",
      "noteEn": "Input and output limits are listed separately in the Gemini API documentation."
    },
    "gemini-3-5-flash": {
      "variants": [
        {
          "name": "Gemini 3.5 Flash",
          "basis": "api",
          "inputTokens": 1048576,
          "outputTokens": 65536,
          "input": [
            "text",
            "image",
            "audio",
            "video",
            "pdf"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash"
          ]
        }
      ],
      "note": "输入与输出上限按 Gemini API 文档分别列出。",
      "noteEn": "Input and output limits are listed separately in the Gemini API documentation."
    },
    "gemini-3-1": {
      "variants": [
        {
          "name": "Gemini 3.1 Pro Preview",
          "basis": "api",
          "inputTokens": 1048576,
          "outputTokens": 65536,
          "input": [
            "text",
            "image",
            "audio",
            "video",
            "pdf"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview"
          ]
        }
      ],
      "note": "输入与输出上限按 Gemini API 文档分别列出。",
      "noteEn": "Input and output limits are listed separately in the Gemini API documentation."
    },
    "gemini-3-flash": {
      "variants": [
        {
          "name": "Gemini 3 Flash Preview",
          "basis": "api",
          "inputTokens": 1048576,
          "outputTokens": 65536,
          "input": [
            "text",
            "image",
            "audio",
            "video",
            "pdf"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/models/gemini-3-flash-preview"
          ]
        }
      ],
      "note": "输入与输出上限按 Gemini API 文档分别列出。",
      "noteEn": "Input and output limits are listed separately in the Gemini API documentation."
    },
    "gemini-2-5": {
      "variants": [
        {
          "name": "Gemini 2.5 Pro",
          "basis": "api",
          "inputTokens": 1048576,
          "outputTokens": 65536,
          "input": [
            "text",
            "image",
            "audio",
            "video",
            "pdf"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/models/gemini-2.5-pro"
          ]
        }
      ],
      "note": "输入与输出上限按 Gemini API 文档分别列出。",
      "noteEn": "Input and output limits are listed separately in the Gemini API documentation."
    },
    "deepseek-v4-1-flash": {
      "variants": [
        {
          "name": "DeepSeek-V4.1-Flash",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "384K",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://api-docs.deepseek.com/quick_start/pricing"
          ]
        }
      ]
    },
    "deepseek-v4-pro-0813": {
      "variants": [
        {
          "name": "DeepSeek-V4-Pro-0813",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "384K",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://api-docs.deepseek.com/quick_start/pricing"
          ]
        }
      ]
    },
    "grok-4-7": {
      "variants": [
        {
          "name": "grok-4.7",
          "basis": "api",
          "contextTokens": 500000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://docs.x.ai/developers/models/grok-4.7"
          ]
        }
      ]
    },
    "glm-5-3": {
      "variants": [
        {
          "name": "GLM-5.3",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "128K",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://docs.z.ai/guides/llm/glm-5.3"
          ]
        }
      ]
    },
    "qwen-3-8-max-0902": {
      "variants": [
        {
          "name": "qwen3.8-max-0902",
          "basis": "api",
          "contextTokens": "1M",
          "sources": [
            "https://docs.qwencloud.com/changelog/model-updates/qwen3.8-max-upgrade"
          ]
        }
      ]
    },
    "deepseek-v2": {
      "variants": [
        {
          "name": "DeepSeek-V2",
          "basis": "weights",
          "contextTokens": "128K",
          "parameters": "236B",
          "activeParameters": "21B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/deepseek-ai/DeepSeek-V2"
          ]
        }
      ]
    },
    "deepseek-v3": {
      "variants": [
        {
          "name": "DeepSeek-V3",
          "basis": "weights",
          "contextTokens": "128K",
          "parameters": "671B",
          "activeParameters": "37B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/deepseek-ai/DeepSeek-V3"
          ]
        }
      ]
    },
    "deepseek-r1": {
      "variants": [
        {
          "name": "DeepSeek-R1",
          "basis": "weights",
          "contextTokens": "128K",
          "parameters": "671B",
          "activeParameters": "37B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/deepseek-ai/DeepSeek-R1"
          ]
        }
      ],
      "note": "此处为完整 R1 模型，蒸馏版本的参数量和窗口另有规格。",
      "noteEn": "These specifications cover the full R1 model; distilled versions have different sizes and limits."
    },
    "deepseek-v3-1": {
      "variants": [
        {
          "name": "DeepSeek-V3.1",
          "basis": "weights",
          "contextTokens": "128K",
          "parameters": "671B",
          "activeParameters": "37B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/deepseek-ai/DeepSeek-V3.1"
          ]
        }
      ]
    },
    "qwen-3": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "Qwen3-235B-A22B",
          "basis": "weights",
          "contextTokens": 32768,
          "extendedContextTokens": 131072,
          "parameters": "235B",
          "activeParameters": "22B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/Qwen/Qwen3-235B-A22B"
          ]
        }
      ],
      "note": "扩展至 131,072 tokens 需要按模型卡配置 YaRN。此处仅列 235B-A22B 型号。",
      "noteEn": "Extending to 131,072 tokens requires the YaRN configuration in the model card. This entry covers the 235B-A22B variant."
    },
    "qwen-3-coder": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "Qwen3-Coder-480B-A35B-Instruct",
          "basis": "weights",
          "contextTokens": 262144,
          "parameters": "480B",
          "activeParameters": "35B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct"
          ]
        }
      ]
    },
    "qwen-3-next": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "Qwen3-Next-80B-A3B-Instruct",
          "basis": "weights",
          "contextTokens": 262144,
          "extendedContextTokens": 1010000,
          "parameters": "80B",
          "activeParameters": "3B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct"
          ]
        }
      ],
      "note": "扩展窗口需要按模型卡配置推理框架；以上为所列开放权重版本的规格。",
      "noteEn": "Extended context requires the inference configuration in each model card. Specifications apply to the listed open-weight checkpoints."
    },
    "qwen-3-5": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "Qwen3.5-397B-A17B",
          "basis": "weights",
          "contextTokens": 262144,
          "extendedContextTokens": 1010000,
          "parameters": "397B",
          "activeParameters": "17B",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/Qwen/Qwen3.5-397B-A17B"
          ]
        }
      ],
      "note": "扩展窗口需要按模型卡配置推理框架；以上为所列开放权重版本的规格。",
      "noteEn": "Extended context requires the inference configuration in each model card. Specifications apply to the listed open-weight checkpoints."
    },
    "qwen-3-8": {
      "variants": [
        {
          "name": "Qwen3.8-2.4T-A95B",
          "basis": "weights",
          "contextTokens": 262144,
          "extendedContextTokens": 1010000,
          "parameters": "2.4T",
          "activeParameters": "95B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
          ]
        },
        {
          "name": "Qwen3.8-27B",
          "basis": "weights",
          "contextTokens": 262144,
          "extendedContextTokens": 1000000,
          "parameters": "27B",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/Qwen/Qwen3.8-27B"
          ]
        }
      ],
      "note": "扩展窗口需要按模型卡配置推理框架；以上为所列开放权重版本的规格。",
      "noteEn": "Extended context requires the inference configuration in each model card. Specifications apply to the listed open-weight checkpoints."
    },
    "glm-4-5": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "GLM-4.5",
          "basis": "weights",
          "parameters": "355B",
          "activeParameters": "32B",
          "sources": [
            "https://huggingface.co/zai-org/GLM-4.5"
          ]
        },
        {
          "name": "GLM-4.5-Air",
          "basis": "weights",
          "parameters": "106B",
          "activeParameters": "12B",
          "sources": [
            "https://huggingface.co/zai-org/GLM-4.5"
          ]
        }
      ]
    },
    "glm-5": {
      "variants": [
        {
          "name": "GLM-5",
          "basis": "weights",
          "parameters": "744B",
          "activeParameters": "40B",
          "sources": [
            "https://huggingface.co/zai-org/GLM-5"
          ]
        }
      ]
    },
    "minimax-m1": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "MiniMax-M1-80k",
          "basis": "weights",
          "contextTokens": 1000000,
          "parameters": "456B",
          "activeParameters": "45.9B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/MiniMaxAI/MiniMax-M1-80k"
          ]
        }
      ],
      "note": "型号中的 80K 表示思考预算，不是上下文窗口。",
      "noteEn": "The 80K suffix denotes a thinking budget, not the context window."
    },
    "minimax-m2": {
      "variants": [
        {
          "name": "MiniMax-M2",
          "basis": "weights",
          "parameters": "230B",
          "activeParameters": "10B",
          "sources": [
            "https://huggingface.co/MiniMaxAI/MiniMax-M2"
          ]
        }
      ]
    },
    "minimax-m3": {
      "variants": [
        {
          "name": "MiniMax-M3",
          "basis": "weights",
          "contextTokens": "1M",
          "parameters": "≈428B",
          "activeParameters": "≈23B",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/MiniMaxAI/MiniMax-M3"
          ]
        }
      ]
    },
    "kimi-k2": {
      "variants": [
        {
          "name": "Kimi-K2-Instruct",
          "basis": "weights",
          "contextTokens": "128K",
          "parameters": "1T",
          "activeParameters": "32B",
          "sources": [
            "https://huggingface.co/moonshotai/Kimi-K2-Instruct"
          ]
        }
      ]
    },
    "kimi-k2-thinking": {
      "variants": [
        {
          "name": "Kimi-K2-Thinking",
          "basis": "weights",
          "contextTokens": "256K",
          "parameters": "1T",
          "activeParameters": "32B",
          "sources": [
            "https://huggingface.co/moonshotai/Kimi-K2-Thinking"
          ]
        }
      ]
    },
    "kimi-k2-5": {
      "variants": [
        {
          "name": "Kimi-K2.5",
          "basis": "weights",
          "contextTokens": "256K",
          "parameters": "1T",
          "activeParameters": "32B",
          "sources": [
            "https://huggingface.co/moonshotai/Kimi-K2.5"
          ]
        }
      ]
    },
    "kimi-k2-7-code": {
      "variants": [
        {
          "name": "Kimi-K2.7-Code",
          "basis": "weights",
          "contextTokens": "256K",
          "parameters": "1T",
          "activeParameters": "32B",
          "sources": [
            "https://huggingface.co/moonshotai/Kimi-K2.7-Code"
          ]
        }
      ]
    },
    "kimi-k3": {
      "variants": [
        {
          "name": "Kimi-K3",
          "basis": "weights",
          "contextTokens": 1048576,
          "parameters": "2.8T",
          "activeParameters": "104B",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/moonshotai/Kimi-K3"
          ]
        }
      ]
    },
    "mimo-v2-flash": {
      "variants": [
        {
          "name": "MiMo-V2-Flash",
          "basis": "weights",
          "contextTokens": "256K",
          "parameters": "309B",
          "activeParameters": "15B",
          "sources": [
            "https://huggingface.co/XiaomiMiMo/MiMo-V2-Flash"
          ]
        }
      ]
    },
    "mimo-v2-5": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "MiMo-V2.5-Pro",
          "basis": "weights",
          "contextTokens": "1M",
          "parameters": "1.02T",
          "activeParameters": "42B",
          "sources": [
            "https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro"
          ]
        }
      ]
    },
    "mimo-v2-6": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "MiMo-V2.6-Pro-RL",
          "basis": "weights",
          "contextTokens": "1M",
          "parameters": "1.02T",
          "activeParameters": "42B",
          "input": [
            "text",
            "image",
            "audio",
            "video"
          ],
          "sources": [
            "https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL"
          ]
        }
      ],
      "note": "此处列出 Pro-RL 权重版本，Flash 等其他版本单独定义规格。",
      "noteEn": "These specifications cover the Pro-RL checkpoint. Flash and other variants have their own specifications."
    },
    "phi-3": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "Phi-3-mini-128k-instruct",
          "basis": "weights",
          "contextTokens": "128K",
          "parameters": "3.8B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/microsoft/Phi-3-mini-128k-instruct"
          ]
        }
      ]
    },
    "phi-4": {
      "variants": [
        {
          "name": "phi-4",
          "basis": "weights",
          "contextTokens": "16K",
          "parameters": "14B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/microsoft/phi-4"
          ]
        }
      ]
    },
    "nemotron-3-nano": {
      "variants": [
        {
          "name": "NVIDIA-Nemotron-3-Nano-30B-A3B-BF16",
          "basis": "weights",
          "contextTokens": "1M",
          "parameters": "30B",
          "activeParameters": "3.5B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16"
          ]
        }
      ],
      "note": "窗口上限为 1M；模型卡中的部署示例使用 256K，需要调整配置才能使用完整窗口。",
      "noteEn": "The maximum window is 1M; deployment examples use 256K and require configuration changes for the full window."
    },
    "nemotron-3-super": {
      "variants": [
        {
          "name": "NVIDIA-Nemotron-3-Super-120B-A12B-BF16",
          "basis": "weights",
          "contextTokens": "1M",
          "parameters": "120B",
          "activeParameters": "12B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16"
          ]
        }
      ],
      "note": "窗口上限为 1M；模型卡中的部署示例使用 256K，需要调整配置才能使用完整窗口。",
      "noteEn": "The maximum window is 1M; deployment examples use 256K and require configuration changes for the full window."
    },
    "step-3-5-flash": {
      "variants": [
        {
          "name": "Step-3.5-Flash",
          "basis": "weights",
          "contextTokens": "256K",
          "parameters": "196B",
          "activeParameters": "11B",
          "sources": [
            "https://huggingface.co/stepfun-ai/Step-3.5-Flash"
          ]
        }
      ]
    },
    "step-3-7-flash": {
      "variants": [
        {
          "name": "Step-3.7-Flash",
          "basis": "weights",
          "contextTokens": "256K",
          "parameters": "198B",
          "activeParameters": "≈11B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/stepfun-ai/Step-3.7-Flash"
          ]
        }
      ],
      "note": "总参数为官方约数，包含语言骨干与视觉编码器。",
      "noteEn": "The nominal total includes the language backbone and vision encoder."
    },
    "hunyuan-hy3": {
      "variants": [
        {
          "name": "Hy3",
          "basis": "weights",
          "contextTokens": "256K",
          "parameters": "295B",
          "activeParameters": "21B",
          "sources": [
            "https://huggingface.co/tencent/Hy3"
          ]
        }
      ]
    },
    "mistral-7b": {
      "variants": [
        {
          "name": "Mistral-7B-v0.1",
          "basis": "weights",
          "parameters": "7B",
          "sources": [
            "https://huggingface.co/mistralai/Mistral-7B-v0.1"
          ]
        }
      ]
    },
    "mistral-small-4": {
      "variants": [
        {
          "name": "Mistral-Small-4-119B-2603",
          "basis": "weights",
          "contextTokens": "256K",
          "parameters": "119B",
          "activeParameters": "6.5B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/mistralai/Mistral-Small-4-119B-2603"
          ]
        }
      ]
    },
    "llama-2": {
      "variants": [
        {
          "name": "Llama 2 7B",
          "basis": "weights",
          "contextTokens": "4K",
          "parameters": "7B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Llama-2-7b-hf"
          ]
        },
        {
          "name": "Llama 2 13B",
          "basis": "weights",
          "contextTokens": "4K",
          "parameters": "13B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Llama-2-7b-hf"
          ]
        },
        {
          "name": "Llama 2 70B",
          "basis": "weights",
          "contextTokens": "4K",
          "parameters": "70B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Llama-2-7b-hf"
          ]
        }
      ]
    },
    "llama-3": {
      "variants": [
        {
          "name": "Llama 3 8B",
          "basis": "weights",
          "contextTokens": "8K",
          "parameters": "8B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct"
          ]
        },
        {
          "name": "Llama 3 70B",
          "basis": "weights",
          "contextTokens": "8K",
          "parameters": "70B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct"
          ]
        }
      ]
    },
    "llama-3-1": {
      "variants": [
        {
          "name": "Llama 3.1 8B",
          "basis": "weights",
          "contextTokens": "128K",
          "parameters": "8B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct"
          ]
        },
        {
          "name": "Llama 3.1 70B",
          "basis": "weights",
          "contextTokens": "128K",
          "parameters": "70B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct"
          ]
        },
        {
          "name": "Llama 3.1 405B",
          "basis": "weights",
          "contextTokens": "128K",
          "parameters": "405B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct"
          ]
        }
      ]
    },
    "llama-4": {
      "variants": [
        {
          "name": "Llama 4 Scout",
          "basis": "weights",
          "contextTokens": "10M",
          "parameters": "109B",
          "activeParameters": "17B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct"
          ]
        },
        {
          "name": "Llama 4 Maverick",
          "basis": "weights",
          "contextTokens": "1M",
          "parameters": "400B",
          "activeParameters": "17B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct"
          ]
        }
      ]
    },
    "gemma-3": {
      "variants": [
        {
          "name": "Gemma 3 4B",
          "basis": "weights",
          "inputTokens": "128K",
          "outputTokens": 8192,
          "parameters": "4B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/google/gemma-3-27b-it"
          ]
        },
        {
          "name": "Gemma 3 12B",
          "basis": "weights",
          "inputTokens": "128K",
          "outputTokens": 8192,
          "parameters": "12B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/google/gemma-3-27b-it"
          ]
        },
        {
          "name": "Gemma 3 27B",
          "basis": "weights",
          "inputTokens": "128K",
          "outputTokens": 8192,
          "parameters": "27B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/google/gemma-3-27b-it"
          ]
        }
      ]
    },
    "nova-2-lite": {
      "variants": [
        {
          "name": "Amazon Nova 2 Lite",
          "basis": "api",
          "contextTokens": 1000000,
          "input": [
            "text",
            "image",
            "video",
            "document"
          ],
          "sources": [
            "https://aws.amazon.com/blogs/aws/introducing-amazon-nova-2-lite-a-fast-cost-effective-reasoning-model/"
          ]
        }
      ]
    },
    "transformer": {
      "variants": [
        {
          "name": "Transformer Base",
          "basis": "paper",
          "parameters": "65M",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://arxiv.org/abs/1706.03762"
          ]
        },
        {
          "name": "Transformer Big",
          "basis": "paper",
          "parameters": "213M",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://arxiv.org/abs/1706.03762"
          ]
        }
      ],
      "note": "参数量来自论文表 3 的英德翻译配置。Transformer 是架构，本身没有统一的上下文窗口。",
      "noteEn": "Parameter counts describe the English–German translation configurations in Table 3. The Transformer architecture itself has no universal context limit."
    },
    "gpt-1": {
      "variants": [
        {
          "name": "GPT-1",
          "basis": "paper",
          "trainingTokens": 512,
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf"
          ]
        }
      ],
      "note": "512 tokens 是论文中的预训练序列长度。",
      "noteEn": "512 tokens is the pretraining sequence length reported in the paper."
    },
    "gpt-2": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "GPT-2 (1.5B)",
          "basis": "paper",
          "contextTokens": 1024,
          "parameters": "1.542B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
          ]
        }
      ],
      "note": "参数量沿用原论文表 2 中最大模型的统计。",
      "noteEn": "Parameter count follows the largest model in Table 2 of the original paper."
    },
    "gpt-3": {
      "cardScope": "variant",
      "variants": [
        {
          "name": "GPT-3 175B",
          "basis": "paper",
          "contextTokens": 2048,
          "parameters": "175B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://arxiv.org/abs/2005.14165"
          ]
        }
      ]
    },
    "bert": {
      "variants": [
        {
          "name": "BERT-Base",
          "basis": "paper",
          "inputTokens": 512,
          "parameters": "110M",
          "input": [
            "text"
          ],
          "sources": [
            "https://github.com/google-research/bert"
          ]
        },
        {
          "name": "BERT-Large",
          "basis": "paper",
          "inputTokens": 512,
          "parameters": "340M",
          "input": [
            "text"
          ],
          "sources": [
            "https://github.com/google-research/bert"
          ]
        }
      ],
      "note": "BERT 是编码器模型；这里列出输入序列上限，不提供生成式输出上限。",
      "noteEn": "BERT is an encoder model. The input sequence limit is listed; no generative output limit applies."
    },
    "qwen-3-8-flash": {
      "variants": [
        {
          "name": "qwen3.8-flash",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": "131K",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://www.qwencloud.com/models/qwen3.8-flash"
          ]
        }
      ],
      "note": "QwenCloud 托管版本；输入上限随思考模式配置变化，Flash-Next 开放权重的规格另行定义。",
      "noteEn": "The QwenCloud hosted version. Input limits vary by thinking configuration; the open Flash-Next checkpoint has separate specifications."
    },
    "gpt-6-1-sol": {
      "checkedAt": "2026-10-03",
      "variants": [
        {
          "name": "gpt-6.1-sol",
          "basis": "api",
          "contextTokens": 1050000,
          "outputTokens": 128000,
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-6.1-sol"
          ]
        }
      ]
    },
    "gemini-4-argon": {
      "cardScope": "configuration",
      "checkedAt": "2026-10-03",
      "variants": [
        {
          "name": "Gemini 4 Argon (high)",
          "basis": "benchmark",
          "contextTokens": "1M",
          "sources": [
            "https://artificialanalysis.ai/models/gemini-4-argon"
          ]
        }
      ],
      "note": "上下文采用 AA 公布的评测配置；有限开放期间，不据此推定公开 API 的输入或输出上限。",
      "noteEn": "Context is the configuration recorded by AA. During limited access, it does not establish public API input or output limits."
    }
  }
});
