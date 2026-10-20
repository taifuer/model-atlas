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
          "name": "DeepSeek-V4.1-Flash-1017 (deepseek-flash)",
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
            "https://api-docs.deepseek.com/quick_start/pricing/"
          ]
        }
      ],
      "checkedAt": "2026-10-17",
      "cardScope": "snapshot",
      "note": "这里记录 10 月 17 日当前 API 所用的 1017 快照规格；时间线仍保留 9 月 10 日首次发布。",
      "noteEn": "These specifications describe the 1017 checkpoint served by the API on October 17; the timeline retains the original September 10 release."
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
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "gemini-4-argon",
          "basis": "api",
          "contextTokens": 1048576,
          "outputTokens": 65536,
          "input": [
            "text",
            "image",
            "video",
            "audio",
            "pdf"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/models/gemini-4-argon",
            "https://ai.google.dev/gemini-api/docs/latest-model"
          ]
        }
      ],
      "note": "输入、思考与输出共用 1,048,576 tokens 窗口；65,536 为默认同步输出上限。超过该值需后台执行并提高 max_output_tokens，或使用客户端续写；思考与输出合计仍受扣除输入后的剩余窗口限制，不能把 1M 当作额外输出空间。",
      "noteEn": "Input, thinking, and output share a 1,048,576-token window. The default synchronous output limit is 65,536. Longer generation requires background execution with a higher max_output_tokens setting, or client-side continuation; thinking and output together must still fit the window remaining after input."
    },
    "gpt-j-6b": {
      "checkedAt": "2026-10-11",
      "variants": [
        {
          "name": "GPT-J-6B",
          "contextTokens": 2048,
          "parameters": "6B",
          "basis": "weights",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/EleutherAI/gpt-j-6b"
          ]
        }
      ]
    },
    "chatglm-6b": {
      "checkedAt": "2026-10-11",
      "variants": [
        {
          "name": "ChatGLM-6B",
          "contextTokens": 2048,
          "parameters": "6.2B",
          "basis": "weights",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://github.com/zai-org/ChatGLM-6B"
          ]
        }
      ],
      "note": "2,048 tokens 为官方注明的训练长度；超过这一长度性能会下降，不将相对位置编码视为无限上下文保证。",
      "noteEn": "The documented training length is 2,048 tokens; performance degrades beyond it. Relative position encoding is not treated as an unlimited-context guarantee."
    },
    "starcoder": {
      "checkedAt": "2026-10-11",
      "variants": [
        {
          "name": "StarCoder",
          "contextTokens": "8K",
          "parameters": "15B",
          "basis": "weights",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/blog/starcoder"
          ]
        }
      ]
    },
    "olmo": {
      "checkedAt": "2026-10-11",
      "variants": [
        {
          "name": "OLMo-7B",
          "contextTokens": 2048,
          "parameters": "7B",
          "basis": "weights",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/allenai/OLMo-7B"
          ]
        }
      ]
    },
    "mellum-2-1-thinking": {
      "checkedAt": "2026-10-11",
      "variants": [
        {
          "name": "Mellum2.1-12B-A2.5B-Thinking",
          "contextTokens": 131072,
          "parameters": "12B",
          "activeParameters": "2.5B",
          "basis": "weights",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/JetBrains/Mellum2.1-12B-A2.5B-Thinking"
          ]
        }
      ]
    },
    "ling-3-1-flash": {
      "checkedAt": "2026-10-11",
      "variants": [
        {
          "name": "Ling-3.1-flash",
          "basis": "api",
          "contextTokens": "256K",
          "parameters": "560B",
          "activeParameters": "25B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://developer.ant-ling.com/zh-CN/docs/models/ling/"
          ]
        }
      ],
      "note": "官方当前 API 上下文为 256K，模型公布的上限为 1M。第三方服务的上下文与输出限制可能不同。",
      "noteEn": "The current official API exposes 256K context; the announced model ceiling is 1M. Third-party providers may use different context and output limits."
    },
    "muse-wonder": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Muse Wonder (muse-wonder-1.0)",
          "basis": "api",
          "contextTokens": 1048576,
          "input": [
            "text",
            "image",
            "audio",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://dev.meta.ai/docs/overview",
            "https://research.meta.ai/static/muse-wonder-model-card"
          ]
        },
        {
          "name": "Muse Wonder Full",
          "basis": "paper",
          "contextTokens": "1M",
          "input": [
            "text",
            "image",
            "audio",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://research.meta.ai/static/muse-wonder-model-card"
          ]
        }
      ],
      "note": "Wonder 上下文采用 API 文档的精确值；Full 采用官方模型卡的 1M 标注，仅通过 Muse Code 订阅提供，不据此推定独立 API 上限。两款均未公布参数量或单独的输出上限。",
      "noteEn": "Wonder uses the exact API context limit; Full retains the model card’s 1M specification. Full is offered only through Muse Code subscriptions, so this does not imply a standalone API limit. Parameter counts and separate output limits are not documented."
    },
    "seedance-1-0": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Seedance 1.0",
          "basis": "release",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video"
          ],
          "video": {
            "resolutions": [
              "1080p"
            ],
            "audio": "silent"
          },
          "sources": [
            "https://seed.bytedance.com/en/blog/tech-report-of-seedance-1-0-is-now-publicly-available"
          ],
          "note": "首发说明支持 1080p，并展示 10 秒多镜头生成；未将示例时长宣称为硬性上限。",
          "noteEn": "The launch report specifies 1080p and demonstrates 10-second multi-shot generation; the example duration is not asserted as a hard limit."
        }
      ]
    },
    "seedance-1-5-pro": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Seedance 1.5 Pro",
          "basis": "release",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video",
            "audio"
          ],
          "video": {
            "audio": "native"
          },
          "sources": [
            "https://seed.bytedance.com/en/blog/sound-and-vision-all-in-one-take-the-official-release-of-seedance-1-5-pro"
          ]
        }
      ]
    },
    "seedance-2-0": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Seedance 2.0",
          "basis": "release",
          "input": [
            "text",
            "image",
            "video",
            "audio"
          ],
          "output": [
            "video",
            "audio"
          ],
          "video": {
            "maxDurationSeconds": 15,
            "audio": "native"
          },
          "sources": [
            "https://seed.bytedance.com/en/blog/seedance-2-0-official-launch"
          ]
        }
      ]
    },
    "seedance-2-5": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Seedance 2.5",
          "basis": "release",
          "input": [
            "text",
            "image",
            "video",
            "audio"
          ],
          "output": [
            "video",
            "audio"
          ],
          "video": {
            "maxDurationSeconds": 30,
            "audio": "native"
          },
          "sources": [
            "https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5"
          ]
        }
      ]
    },
    "wan-2-1": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Wan2.1-T2V-14B",
          "basis": "weights",
          "input": [
            "text"
          ],
          "output": [
            "video"
          ],
          "video": {
            "resolutions": [
              "480p",
              "720p"
            ]
          },
          "sources": [
            "https://github.com/Wan-Video/Wan2.1"
          ]
        },
        {
          "name": "Wan2.1-I2V-14B",
          "basis": "weights",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video"
          ],
          "video": {
            "resolutions": [
              "480p",
              "720p"
            ]
          },
          "sources": [
            "https://github.com/Wan-Video/Wan2.1"
          ]
        },
        {
          "name": "Wan2.1-T2V-1.3B",
          "basis": "weights",
          "input": [
            "text"
          ],
          "output": [
            "video"
          ],
          "video": {
            "resolutions": [
              "480p"
            ]
          },
          "note": "官方推荐 480p；720p 的训练较少，未列作推荐规格。",
          "noteEn": "480p is officially recommended; 720p received less training and is not listed as a recommended configuration.",
          "sources": [
            "https://github.com/Wan-Video/Wan2.1"
          ]
        }
      ]
    },
    "wan-2-2": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Wan2.2-TI2V-5B",
          "basis": "weights",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video"
          ],
          "video": {
            "resolutions": [
              "720p"
            ],
            "frameRates": [
              24
            ]
          },
          "note": "此规格仅适用于 TI2V-5B，不能直接套用到 A14B 或后来的 S2V/Animate。",
          "noteEn": "These specifications apply only to TI2V-5B, not to A14B or later S2V/Animate models.",
          "sources": [
            "https://github.com/Wan-Video/Wan2.2"
          ]
        }
      ],
      "cardScope": "configuration"
    },
    "wan-2-5-preview": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Wan 2.5 Preview",
          "basis": "release",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video",
            "audio"
          ],
          "video": {
            "maxDurationSeconds": 10,
            "audio": "native"
          },
          "sources": [
            "https://www.alibabacloud.com/en/press-room/alibabacloudunveilsstrategicroadmaps"
          ]
        }
      ]
    },
    "wan-2-6": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Wan 2.6",
          "basis": "release",
          "input": [
            "text",
            "image",
            "video",
            "audio"
          ],
          "output": [
            "video",
            "audio"
          ],
          "video": {
            "maxDurationSeconds": 15,
            "audio": "native"
          },
          "sources": [
            "https://www.alibabacloud.com/en/press-room/alibaba-unveils-wan2-6-series-enabling-everyone"
          ]
        }
      ]
    },
    "wan-2-7-video": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Wan 2.7 Video",
          "basis": "release",
          "input": [
            "text",
            "image",
            "video",
            "audio"
          ],
          "output": [
            "video",
            "audio"
          ],
          "video": {
            "maxDurationSeconds": 15,
            "resolutions": [
              "720p",
              "1080p"
            ],
            "audio": "native"
          },
          "sources": [
            "https://www.alibabacloud.com/blog/alibaba-unveils-wan2-7-video-to-elevate-creators-from-executors-to-directors_603009"
          ]
        }
      ]
    },
    "wan-3-0-video": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "wan3.0-video",
          "basis": "api",
          "input": [
            "text",
            "image",
            "audio",
            "video"
          ],
          "output": [
            "video",
            "audio"
          ],
          "video": {
            "maxDurationSeconds": 30,
            "resolutions": [
              "480p",
              "720p",
              "1080p"
            ],
            "audio": "native"
          },
          "sources": [
            "https://www.alibabacloud.com/help/en/model-studio/wan3-0-video",
            "https://www.alibabacloud.com/help/en/model-studio/video-generate-edit-model"
          ]
        }
      ],
      "cardScope": "configuration"
    },
    "hunyuan-video": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "HunyuanVideo",
          "basis": "weights",
          "input": [
            "text"
          ],
          "output": [
            "video"
          ],
          "video": {
            "resolutions": [
              "540p",
              "720p"
            ]
          },
          "sources": [
            "https://github.com/Tencent-Hunyuan/HunyuanVideo"
          ]
        }
      ]
    },
    "hunyuan-video-1-5": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "HunyuanVideo 1.5",
          "basis": "weights",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video"
          ],
          "video": {
            "resolutions": [
              "480p",
              "720p"
            ]
          },
          "sources": [
            "https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5"
          ],
          "note": "基础模型原生 480p/720p；独立超分模型可提升至 1080p。不将超分辨率写作原生规格。",
          "noteEn": "Base models generate native 480p/720p; a separate super-resolution model upscales to 1080p."
        }
      ]
    },
    "sora": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Sora research model",
          "video": {
            "maxDurationSeconds": 60,
            "resolutions": [
              "1080p"
            ]
          },
          "note": "2024 年 2 月研究展示：最长约 60 秒，含 1920×1080 与 1080×1920 示例；非后来 Sora Turbo 产品额度。",
          "noteEn": "February 2024 research demonstrations: up to about 60 seconds, including 1920×1080 and 1080×1920 examples; these are not Sora Turbo product limits.",
          "sources": [
            "https://openai.com/index/video-generation-models-as-world-simulators/"
          ],
          "basis": "paper",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "cardScope": "configuration"
    },
    "veo": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Veo research preview",
          "video": {
            "resolutions": [
              "1080p"
            ]
          },
          "note": "首发展示可生成超过一分钟的 1080p 视频；官方未在该公告给出统一产品时长上限，因此不填写最大秒数。",
          "noteEn": "The launch demonstrated 1080p videos longer than a minute. No universal product duration ceiling is given, so no numeric maximum is assigned.",
          "sources": [
            "https://blog.google/innovation-and-ai/products/google-generative-ai-veo-imagen-3/"
          ],
          "basis": "release",
          "input": [
            "text"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "cardScope": "configuration"
    },
    "sora-turbo": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Sora Turbo · Pro plan",
          "video": {
            "maxDurationSeconds": 20,
            "resolutions": [
              "1080p"
            ]
          },
          "note": "2024-12-09 产品发布规格；1080p 与 20 秒为高档方案可达上限，不代表所有订阅。现已停服。",
          "noteEn": "December 9, 2024 product specifications; 1080p and 20 seconds are upper-tier limits, not allowances for every subscription. The service has closed.",
          "sources": [
            "https://openai.com/index/sora-is-here/"
          ],
          "basis": "release",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "cardScope": "configuration"
    },
    "veo-2": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Veo 2 · Gemini (2025-04)",
          "video": {
            "maxDurationSeconds": 8,
            "resolutions": [
              "720p"
            ]
          },
          "note": "采用 2025-04-15 Gemini 产品的明确规格：文本生成 8 秒、720p、16:9 视频；不将模型演示的 4K / 分钟级能力当作产品上限。",
          "noteEn": "Specifications for the April 15, 2025 Gemini product: eight-second 720p, 16:9 clips from text. The model's 4K and minute-scale demonstrations are not treated as product limits.",
          "sources": [
            "https://blog.google/products-and-platforms/products/gemini/video-generation/"
          ],
          "basis": "service",
          "input": [
            "text"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "cardScope": "configuration"
    },
    "veo-3": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "veo-3.0-generate-001",
          "video": {
            "maxDurationSeconds": 8,
            "resolutions": [
              "720p",
              "1080p"
            ],
            "frameRates": [
              24
            ],
            "audio": "native"
          },
          "note": "采用后续 Vertex AI 型号的 4 / 6 / 8 秒、720p / 1080p、24 FPS 规格，不倒填为全部首发产品限制；文档列该端点于 2026-06-30 退役。",
          "noteEn": "Specifications for the later Vertex AI model: 4/6/8 seconds, 720p/1080p and 24 FPS, not universal launch limits. Its documentation lists June 30, 2026 as the endpoint retirement date.",
          "sources": [
            "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-0-generate"
          ],
          "basis": "api",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video",
            "audio"
          ]
        }
      ],
      "cardScope": "configuration"
    },
    "sora-2": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Sora 2 · archived API",
          "video": {
            "maxDurationSeconds": 20,
            "resolutions": [
              "720p"
            ],
            "audio": "native"
          },
          "sources": [
            "https://developers.openai.com/api/docs/models/sora-2",
            "https://developers.openai.com/api/docs/guides/video-generation"
          ],
          "note": "停服后保留的 API 文档：最长 20 秒；Sora 2 的输出分辨率为 1280×720 或 720×1280。不是 2025 年 9 月首发 App 的统一限制。",
          "noteEn": "Retained API documentation after retirement: up to 20 seconds, with Sora 2 output at 1280×720 or 720×1280. These are not universal September 2025 app launch limits.",
          "basis": "api",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video",
            "audio"
          ]
        },
        {
          "name": "Sora 2 Pro · archived API",
          "video": {
            "maxDurationSeconds": 20,
            "resolutions": [
              "720p",
              "1080p"
            ],
            "audio": "native"
          },
          "sources": [
            "https://developers.openai.com/api/docs/models/sora-2-pro",
            "https://developers.openai.com/api/docs/guides/video-generation"
          ],
          "note": "保留的 Pro API 文档还列出 1792×1024 / 1024×1792 和 1920×1080 / 1080×1920；全部为已下线服务的历史规格。",
          "noteEn": "The retained Pro API page also lists 1792×1024 / 1024×1792 and 1920×1080 / 1080×1920 outputs. These are historical specifications of a retired service.",
          "basis": "api",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video",
            "audio"
          ]
        }
      ]
    },
    "veo-3-1": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "veo-3.1-generate-preview · Gemini API",
          "video": {
            "maxDurationSeconds": 8,
            "resolutions": [
              "720p",
              "1080p"
            ],
            "frameRates": [
              24
            ],
            "audio": "native",
            "upscaledResolutions": [
              "4K"
            ]
          },
          "note": "2026-10-15 核对的 Gemini API：单次 4 / 6 / 8 秒；1080p、4K 和参考图生成要求 8 秒，延展仅 720p。4K 在 2026 年 1 月以增强分辨率功能公布，不称为原生 4K；延展总时长不等于单次生成上限。",
          "noteEn": "Gemini API checked October 15, 2026: 4/6/8-second clips; 1080p, 4K and reference-image generation require 8 seconds, with extension limited to 720p. The January 2026 announcement describes enhanced/upscaled 4K, not native 4K. Extended total duration is not a single-generation limit.",
          "sources": [
            "https://ai.google.dev/gemini-api/docs/veo?hl=en"
          ],
          "basis": "api",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "video",
            "audio"
          ]
        }
      ],
      "cardScope": "configuration"
    },
    "gemini-omni-flash": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "Gemini Omni Flash",
          "video": {
            "audio": "native"
          },
          "note": "模型卡确认原生音视频输出。",
          "noteEn": "The model card confirms native audiovisual output.",
          "sources": [
            "https://deepmind.google/models/model-cards/gemini-omni-flash/"
          ],
          "basis": "release",
          "input": [
            "text",
            "image",
            "video",
            "audio"
          ],
          "output": [
            "video",
            "audio"
          ]
        }
      ]
    },
    "gemini-omni-1-1-flash": {
      "checkedAt": "2026-10-15",
      "variants": [
        {
          "name": "gemini-omni-1.1-flash · Gemini API",
          "video": {
            "resolutions": [
              "360p",
              "720p"
            ],
            "audio": "native",
            "upscaledResolutions": [
              "1080p",
              "4K"
            ]
          },
          "sources": [
            "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/",
            "https://ai.google.dev/gemini-api/docs/omni"
          ],
          "note": "360p 草稿、720p 标准输出，1080p 与 4K 为升采样；每次延展增加 10 秒，累计上限 40 秒，因此不将 40 秒写入单次生成最大时长。",
          "noteEn": "360p drafts and standard 720p output, with upscaling to 1080p and 4K. Extensions add ten seconds up to 40 seconds total, so 40 seconds is not recorded as the maximum single-generation duration.",
          "basis": "api",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "video",
            "audio"
          ]
        }
      ],
      "cardScope": "configuration"
    },
    "kling-1": {
      "variants": [
        {
          "name": "Kling",
          "basis": "release",
          "sources": [
            "https://ir.kuaishou.com/news-releases/news-release-details/kuaishou-unveils-proprietary-video-generation-model-kling",
            "https://ir.kuaishou.com/news-releases/news-release-details/kuaishou-launches-full-beta-testing-kling-ai-global-users-0"
          ],
          "input": [
            "text"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "checkedAt": "2026-10-15"
    },
    "kling-2": {
      "variants": [
        {
          "name": "Kling 2.0",
          "basis": "release",
          "sources": [
            "https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-advances-20-era-empowering-everyone-tell-great-stories"
          ],
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "checkedAt": "2026-10-15"
    },
    "kling-o1": {
      "variants": [
        {
          "name": "Kling O1",
          "video": {
            "maxDurationSeconds": 10
          },
          "note": "公告给出 3–10 秒生成长度；首尾帧模式在发布时仍计划后续支持此范围。",
          "noteEn": "The announcement gives a 3–10-second generation range; support for this range in first/last-frame mode was still forthcoming.",
          "sources": [
            "https://ir.kuaishou.com/news-releases/news-release-details/kling-o1-launches-worlds-first-unified-multimodal-video-model-0/"
          ],
          "basis": "release",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "checkedAt": "2026-10-15"
    },
    "kling-3": {
      "variants": [
        {
          "name": "Kling Video 3.0 / 3.0 Omni",
          "video": {
            "maxDurationSeconds": 15,
            "audio": "native"
          },
          "note": "视频模型的 15 秒上限；公告的 2K/4K 描述属于 Image 3.0，不作为视频规格。",
          "noteEn": "The 15-second limit applies to video. The announcement's 2K/4K claims concern Image 3.0, not video.",
          "sources": [
            "https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-launches-30-model-ushering-era-where-everyone-can-be"
          ],
          "basis": "release",
          "input": [
            "text",
            "image",
            "video",
            "audio"
          ],
          "output": [
            "video",
            "audio"
          ]
        }
      ],
      "checkedAt": "2026-10-15",
      "cardScope": "configuration"
    },
    "runway-gen-1": {
      "variants": [
        {
          "name": "Runway Gen-1",
          "basis": "paper",
          "sources": [
            "https://runway.com/research/gen-1",
            "https://arxiv.org/abs/2302.03011"
          ],
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "checkedAt": "2026-10-15"
    },
    "runway-gen-2": {
      "variants": [
        {
          "name": "Runway Gen-2",
          "basis": "release",
          "sources": [
            "https://runway.com/research/gen-2"
          ],
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "checkedAt": "2026-10-15"
    },
    "runway-gen-3-alpha": {
      "variants": [
        {
          "name": "Runway Gen-3 Alpha",
          "basis": "release",
          "sources": [
            "https://runway.com/research/introducing-gen-3-alpha"
          ],
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video"
          ],
          "note": "公告描述文本与图像条件生成，功能按产品阶段开放；不表示公告当天所有用户均可使用。",
          "noteEn": "The announcement describes text- and image-conditioned generation, with features rolled out in stages; this does not imply universal availability on the announcement date."
        }
      ],
      "checkedAt": "2026-10-15"
    },
    "runway-gen-4": {
      "variants": [
        {
          "name": "Gen-4 Video",
          "video": {
            "maxDurationSeconds": 10,
            "resolutions": [
              "720p"
            ],
            "frameRates": [
              24
            ]
          },
          "note": "官方视频使用说明：5 秒或 10 秒、24fps；16:9 为 1280×720，其他比例采用对应像素尺寸。",
          "noteEn": "Official video documentation: 5 or 10 seconds at 24fps; 16:9 is 1280×720, with corresponding dimensions for other aspect ratios.",
          "sources": [
            "https://help.runwayml.com/hc/en-us/articles/37327109429011-Creating-with-Gen-4-Video"
          ],
          "basis": "service",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "checkedAt": "2026-10-15",
      "cardScope": "configuration"
    },
    "runway-gen-4-5": {
      "variants": [
        {
          "name": "Gen-4.5 · hosted service",
          "video": {
            "maxDurationSeconds": 10,
            "frameRates": [
              24,
              25
            ],
            "resolutions": [
              "720p"
            ]
          },
          "note": "当前使用说明：720p、2–10 秒、24 或 25fps；与首发功能范围区分。",
          "noteEn": "Current documentation: 720p, 2–10 seconds at 24 or 25fps; distinct from the initial launch feature set.",
          "sources": [
            "https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5"
          ],
          "basis": "service",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "checkedAt": "2026-10-15",
      "cardScope": "configuration"
    },
    "hailuo-01": {
      "variants": [
        {
          "name": "Video-01",
          "video": {
            "maxDurationSeconds": 6,
            "resolutions": [
              "720p"
            ],
            "frameRates": [
              25
            ]
          },
          "note": "使用 Video-01 官方公告规格；不套用后续版本的 10 秒参数。",
          "noteEn": "Uses the official Video-01 specifications, without applying later versions' 10-second limit.",
          "sources": [
            "https://www.minimax.io/news/Video-01"
          ],
          "basis": "release",
          "input": [
            "text"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "checkedAt": "2026-10-15",
      "cardScope": "configuration"
    },
    "hailuo-02": {
      "variants": [
        {
          "name": "Hailuo 02 · 768p",
          "video": {
            "maxDurationSeconds": 10,
            "resolutions": [
              "768p"
            ]
          },
          "note": "768p 支持 6 秒或 10 秒。",
          "noteEn": "768p supports 6- or 10-second clips.",
          "sources": [
            "https://www.minimax.io/news/minimax-hailuo-02"
          ],
          "basis": "release",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video"
          ]
        },
        {
          "name": "Hailuo 02 · 1080p",
          "video": {
            "maxDurationSeconds": 6,
            "resolutions": [
              "1080p"
            ]
          },
          "note": "1080p 支持 6 秒；不合并成 1080p / 10 秒。",
          "noteEn": "1080p supports 6 seconds; this does not imply 1080p at 10 seconds.",
          "sources": [
            "https://www.minimax.io/news/minimax-hailuo-02"
          ],
          "basis": "release",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "video"
          ]
        }
      ],
      "checkedAt": "2026-10-15"
    },
    "minimax-h3": {
      "variants": [
        {
          "name": "H3 Base · local weights",
          "video": {
            "maxDurationSeconds": 15,
            "resolutions": [
              "768p"
            ],
            "frameRates": [
              24
            ],
            "audio": "native"
          },
          "note": "本地基础模型默认短边 768px、4–15 秒、24fps，原生立体声音频；2K 需要额外官方工作流。 音频参考须同时提供图像或视频，具体输入组合依检查点而定。",
          "noteEn": "Local base defaults to a 768px short edge, 4–15 seconds and 24fps with native stereo audio; 2K requires the additional official workflow. Audio references require an accompanying image or video; supported input combinations depend on the checkpoint.",
          "sources": [
            "https://huggingface.co/MiniMaxAI/MiniMax-H3"
          ],
          "basis": "weights",
          "input": [
            "text",
            "image",
            "video",
            "audio"
          ],
          "output": [
            "video",
            "audio"
          ]
        },
        {
          "name": "H3 · hosted workflow",
          "video": {
            "maxDurationSeconds": 15,
            "resolutions": [
              "2K"
            ],
            "audio": "native"
          },
          "note": "完整 2K 流程结合 H3 Base 与官方 Context-IR、Regenerate-2K API，不是完全本地开放权重能力。 音频参考须同时提供图像或视频，具体输入组合依检查点而定。",
          "noteEn": "The full 2K pipeline combines H3 Base with official Context-IR and Regenerate-2K APIs; it is not a fully local open-weight capability. Audio references require an accompanying image or video; supported input combinations depend on the checkpoint.",
          "sources": [
            "https://huggingface.co/MiniMaxAI/MiniMax-H3"
          ],
          "basis": "api",
          "input": [
            "text",
            "image",
            "video",
            "audio"
          ],
          "output": [
            "video",
            "audio"
          ]
        }
      ],
      "checkedAt": "2026-10-15"
    },
    "muse-spark-open": {
      "checkedAt": "2026-10-17",
      "variants": [
        {
          "name": "Muse Spark Open 816B-A42B",
          "basis": "weights",
          "contextTokens": "1M",
          "parameters": "816B",
          "activeParameters": "42B",
          "input": [
            "text",
            "image",
            "audio",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B"
          ]
        }
      ]
    },
    "reflection-beam-1": {
      "checkedAt": "2026-10-17",
      "variants": [
        {
          "name": "Beam-1.0-501B-A23B",
          "basis": "api",
          "contextTokens": "1M",
          "parameters": "501.3B",
          "activeParameters": "23.4B",
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/reflection/Beam-1.0-501B-A23B",
            "https://developers.reflection.ai/models"
          ],
          "outputTokens": "128K"
        }
      ],
      "cardScope": "configuration",
      "note": "上下文与输出上限采用官方 API 文档；参数量采用权重模型卡，保留来源各自标注。",
      "noteEn": "Context and output limits follow the official API documentation; parameter counts follow the weight model card, retaining each source’s notation."
    },
    "nemotron-3-5-vl-bolt": {
      "checkedAt": "2026-10-17",
      "cardScope": "variant",
      "variants": [
        {
          "name": "Nemotron 3.5 Super VL 120B-A12B",
          "basis": "weights",
          "contextTokens": "1M",
          "parameters": "120B",
          "activeParameters": "12B",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4"
          ]
        },
        {
          "name": "Nemotron 3.5 Bolt 74B-A9B 24GB",
          "basis": "weights",
          "contextTokens": "256K",
          "parameters": "74B",
          "activeParameters": "9B",
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-24GB"
          ],
          "note": "24GB 是特定低比特部署目标；架构搜索采用单请求、128K 上下文预算，不代表所有 256K 部署都能在 24GB 内运行。",
          "noteEn": "24GB is a target for a specific low-bit deployment. Architecture search used a single-request, 128K-context memory budget; it does not guarantee every 256K deployment fits in 24GB."
        }
      ],
      "note": "上下文上限分别属于两款模型，包含输入、视觉内容与输出。实际配置取决于硬件、精度和并发量。",
      "noteEn": "Each context limit belongs to its named model and covers input, visual content and output. Practical settings depend on hardware, precision and concurrency."
    },
    "kling-4": {
      "checkedAt": "2026-10-17",
      "cardScope": "configuration",
      "variants": [
        {
          "name": "Kling 4.0",
          "basis": "release",
          "input": [
            "text",
            "image",
            "video",
            "audio"
          ],
          "output": [
            "video",
            "audio"
          ],
          "video": {
            "maxDurationSeconds": 30,
            "audio": "native"
          },
          "sources": [
            "https://kling.ai/blog/kling40-kling-visual-realism-creative-control-introducing-storytelling",
            "https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-officially-launches-next-generation-kling-40-raising"
          ],
          "note": "30 秒为单次生成上限，不是续写总时长。未将仍在计划中的两分钟续写，以及尚未确认全面开放的 4K/HDR 记为可用规格。",
          "noteEn": "30 seconds is the single-generation limit, not an extension total. Planned two-minute extensions and 4K/HDR features without confirmed broad availability are not recorded as available specifications."
        }
      ]
    },
    "step-5-preview": {
      "checkedAt": "2026-10-17",
      "cardScope": "configuration",
      "variants": [
        {
          "name": "Step 5 Preview · open weights",
          "basis": "weights",
          "contextTokens": "1M",
          "parameters": "600B",
          "activeParameters": "27B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/stepfun-ai/Step-5-Preview-NVFP4"
          ]
        }
      ],
      "note": "规格表明确列出文本与图像输入。模型卡正文另提视频，但未在输入规格中统一说明；此处采用规格表明确列出的配置。上下文由输入与输出共同使用，实际部署受显存和并发量限制。",
      "noteEn": "The specification table explicitly lists text and image inputs. The introduction also mentions video, but the input specification is not consistent, so this entry retains the explicitly documented configuration. Input and output share the context window; practical deployments depend on memory and concurrency."
    },
    "flux-3-image-klein": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "FLUX 3 Image Klein",
          "basis": "weights",
          "parameters": "5.6B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://huggingface.co/black-forest-labs/flux-3-image-klein",
            "https://docs.bfl.ai/release-notes"
          ],
          "note": "5.6B 指图像生成部分，不含独立的 Qwen3-VL 文本编码器；支持最多 10 张参考图和最高 4K 输出。",
          "noteEn": "5.6B describes the image generator, excluding its separate Qwen3-VL text encoder. Supports up to ten reference images and 4K output."
        }
      ]
    },
    "lfm-2-5-24b-a2b": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "LFM2.5-24B-A2B",
          "basis": "weights",
          "parameters": "24.0B",
          "activeParameters": "2.45B",
          "contextTokens": 131072,
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://huggingface.co/LiquidAI/LFM2.5-24B-A2B",
            "https://docs.liquid.ai/lfm/models/lfm25-24b-a2b"
          ]
        }
      ]
    },
    "dall-e": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "DALL·E (2021 research model)",
          "basis": "paper",
          "parameters": "12B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://openai.com/index/dall-e/",
            "https://arxiv.org/abs/2102.12092"
          ],
          "note": "研究配置生成 256 × 256 图像；以文本及部分图像为条件完成图像补全。",
          "noteEn": "The research configuration generates 256 × 256 images and supports completion conditioned on text and a partial image."
        }
      ]
    },
    "dall-e-2": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "DALL·E 2 research preview",
          "basis": "paper",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://arxiv.org/abs/2204.06125",
            "https://github.com/openai/dalle-2-preview/blob/main/system-card.md"
          ],
          "note": "图像输入用于局部重绘与变体生成；规格对应 2022 年研究预览。",
          "noteEn": "Image inputs support inpainting and variations. Specifications refer to the 2022 research preview."
        }
      ]
    },
    "dall-e-3": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "DALL·E 3",
          "basis": "paper",
          "input": [
            "text"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://openai.com/index/dall-e-3-system-card/",
            "https://developers.openai.com/api/docs/models/dall-e-3"
          ]
        }
      ]
    },
    "gpt-4o-image": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "gpt-image-1",
          "basis": "api",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-image-1",
            "https://openai.com/index/image-generation-api/"
          ],
          "note": "后续 gpt-image-1 API 配置，支持文本和图像输入；该 API 型号现已标记弃用。",
          "noteEn": "The later gpt-image-1 API configuration supports text and image inputs. This API model is now marked deprecated."
        }
      ]
    },
    "imagen": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "Imagen (2022 research model)",
          "basis": "paper",
          "input": [
            "text"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://imagen.research.google/",
            "https://arxiv.org/abs/2205.11487"
          ],
          "note": "级联配置由 64×64 逐级超分至 256×256、1024×1024。T5-XXL 为独立文本编码器。",
          "noteEn": "The cascade upsamples 64×64 images to 256×256 and then 1024×1024. T5-XXL is a separate text encoder."
        }
      ]
    },
    "imagen-3": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "Imagen 3 (initial text-to-image model)",
          "basis": "paper",
          "input": [
            "text"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://arxiv.org/abs/2408.07009",
            "https://blog.google/innovation-and-ai/products/google-generative-ai-veo-imagen-3/"
          ],
          "note": "按首次公布的文本生成图像模型记录；不把后续 Imagen 3 编辑或定制端点的图像输入能力回填至该配置。",
          "noteEn": "Records the initial text-to-image model; image-input features from later Imagen 3 editing or customization endpoints are not backfilled into this configuration."
        }
      ]
    },
    "imagen-4": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "imagen-4.0-generate-001",
          "basis": "api",
          "input": [
            "text"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/imagen/4-0-generate"
          ],
          "note": "公开生成接口支持 1:1、3:4、4:3、9:16、16:9 比例和最高 2K 档输出，不支持图像编辑。此后续正式版端点现已停用；规格用于历史记录。",
          "noteEn": "The public generation endpoint supports 1:1, 3:4, 4:3, 9:16 and 16:9 aspect ratios and output up to the 2K tier, without image editing. This later GA endpoint is now discontinued; specifications are retained as historical information."
        }
      ]
    },
    "stable-diffusion-1": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "Stable Diffusion v1.4",
          "basis": "weights",
          "parameters": "860M",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://github.com/CompVis/stable-diffusion"
          ],
          "note": "860M 仅指 UNet 去噪网络，不含 123M CLIP 文本编码器和自编码器。512 × 512 为训练分辨率。图像输入用于 img2img 流程，不代表通用视觉理解。",
          "noteEn": "860M counts the UNet denoiser only, excluding the 123M CLIP text encoder and autoencoder. The training resolution is 512 × 512. Image input refers to the img2img workflow, not general visual understanding."
        }
      ]
    },
    "sdxl-1": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "SDXL 1.0 base",
          "basis": "weights",
          "parameters": "3.5B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://stability.ai/news-updates/stable-diffusion-sdxl-1-announcement",
            "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0",
            "https://huggingface.co/docs/diffusers/main/en/using-diffusers/sdxl"
          ],
          "note": "3.5B 采用首发公告的基础模型口径，不含可选 refiner。训练分辨率约 1024 × 1024，并支持其他宽高比；图像输入用于图生图流程。",
          "noteEn": "3.5B follows the launch announcement’s base-model count, excluding the optional refiner. Training resolution is approximately 1024 × 1024, with other aspect ratios supported. Image input refers to image-to-image workflows."
        }
      ]
    },
    "flux-1-open": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "FLUX.1 dev / schnell",
          "basis": "weights",
          "parameters": "12B",
          "input": [
            "text"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://huggingface.co/black-forest-labs/FLUX.1-dev",
            "https://huggingface.co/black-forest-labs/FLUX.1-schnell"
          ],
          "note": "两种模型的图像生成 Transformer 均为 12B，不含独立的文本编码器。schnell 支持 1–4 步推理。",
          "noteEn": "Both image-generation transformers have 12B parameters, excluding separate text encoders. Schnell supports 1–4 inference steps."
        }
      ]
    },
    "flux-1-kontext-dev": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "FLUX.1 Kontext dev",
          "basis": "weights",
          "parameters": "12B",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev"
          ],
          "note": "12B 指图像编辑 Transformer，不含独立文本编码器；此处仅记录 dev 图像编辑权重，不套用 pro / max 的文生图能力。",
          "noteEn": "12B counts the image-editing transformer, excluding separate text encoders. This entry covers the dev editing checkpoint, without attributing pro / max text-to-image capabilities to it."
        }
      ]
    },
    "midjourney-v6": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "Midjourney V6",
          "basis": "service",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version"
          ]
        }
      ]
    },
    "qwen-image": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "Qwen-Image",
          "basis": "weights",
          "parameters": "20B",
          "input": [
            "text"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://huggingface.co/Qwen/Qwen-Image",
            "https://qwenlm.github.io/blog/qwen-image/"
          ],
          "note": "20B 为官方标注的图像生成模型参数规模；此条仅记录最初的文生图权重，不包含后续 Qwen-Image-Edit。",
          "noteEn": "20B is the published image-model parameter count. This entry covers the initial text-to-image weights, excluding the later Qwen-Image-Edit release."
        }
      ]
    },
    "seedream-4": {
      "checkedAt": "2026-10-19",
      "variants": [
        {
          "name": "Seedream 4.0",
          "basis": "service",
          "input": [
            "text",
            "image"
          ],
          "output": [
            "image"
          ],
          "sources": [
            "https://seed.bytedance.com/en/blog/seedream-4-0-officially-released-beyond-drawing-into-imagination"
          ],
          "note": "支持最高 4K 输出、多张参考图以及单图和多图编辑。",
          "noteEn": "Supports output up to 4K, multiple reference images, and single- or multi-image editing."
        }
      ]
    },
    "minimax-m3-1-flash": {
      "checkedAt": "2026-10-20",
      "variants": [
        {
          "name": "MiniMax-M3.1-Flash",
          "basis": "api",
          "contextTokens": 1000000,
          "input": [
            "text",
            "image",
            "video"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://platform.minimax.io/docs/guides/text-generation"
          ]
        }
      ]
    },
    "mercury-3": {
      "checkedAt": "2026-10-20",
      "variants": [
        {
          "name": "mercury-3",
          "basis": "api",
          "contextTokens": "1M",
          "outputTokens": 131072,
          "input": [
            "text"
          ],
          "output": [
            "text"
          ],
          "sources": [
            "https://docs.inceptionlabs.ai/get-started/models"
          ]
        }
      ]
    }
  }
});
