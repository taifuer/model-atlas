/* Documented first-party API rates, not launch prices or subscription fees.
 * Numeric input/output pairs are per one million tokens, in the stated currency.
 * Preserve version, region, tiers, and expiry when updating. */
window.MODEL_ATLAS_PRICES = Object.freeze({
  "checkedAt": "2026-10-03",
  "unitTokens": 1000000,
  "inputType": "uncached-text",
  "outputType": "text",
  "entries": {
    "gpt-6-astra": {
      "variants": [
        {
          "name": "gpt-6-astra",
          "currency": "USD",
          "tiers": [
            {
              "input": 10.0,
              "output": 50.0,
              "label": "输入 ≤ 272K tokens",
              "labelEn": "Input ≤ 272K tokens"
            },
            {
              "input": 20.0,
              "output": 75.0,
              "label": "输入 > 272K tokens",
              "labelEn": "Input > 272K tokens"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-6-astra",
            "https://developers.openai.com/api/docs/pricing"
          ],
          "note": "输入超过 272K tokens 后，整次请求采用长上下文费率。",
          "noteEn": "For prompts over 272K input tokens, long-context rates apply to the full request."
        }
      ]
    },
    "gpt-6-sol-luna": {
      "variants": [
        {
          "name": "gpt-6-luna",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.1,
              "output": 0.5,
              "label": "输入 ≤ 272K tokens",
              "labelEn": "Input ≤ 272K tokens"
            },
            {
              "input": 0.2,
              "output": 0.75,
              "label": "输入 > 272K tokens",
              "labelEn": "Input > 272K tokens"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-6-luna",
            "https://developers.openai.com/api/docs/pricing"
          ],
          "note": "输入超过 272K tokens 后，整次请求采用长上下文费率。",
          "noteEn": "For prompts over 272K input tokens, long-context rates apply to the full request."
        },
        {
          "name": "gpt-6-sol",
          "currency": "USD",
          "tiers": [
            {
              "input": 2.0,
              "output": 10.0,
              "label": "输入 ≤ 272K tokens",
              "labelEn": "Input ≤ 272K tokens"
            },
            {
              "input": 4.0,
              "output": 15.0,
              "label": "输入 > 272K tokens",
              "labelEn": "Input > 272K tokens"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-6-sol",
            "https://developers.openai.com/api/docs/pricing"
          ],
          "note": "输入超过 272K tokens 后，整次请求采用长上下文费率。",
          "noteEn": "For prompts over 272K input tokens, long-context rates apply to the full request."
        }
      ]
    },
    "gpt-5-6": {
      "variants": [
        {
          "name": "gpt-5.6-sol",
          "currency": "USD",
          "tiers": [
            {
              "input": 4.0,
              "output": 20.0,
              "label": "输入 ≤ 272K tokens",
              "labelEn": "Input ≤ 272K tokens"
            },
            {
              "input": 8.0,
              "output": 30.0,
              "label": "输入 > 272K tokens",
              "labelEn": "Input > 272K tokens"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.6",
            "https://developers.openai.com/api/docs/pricing"
          ],
          "note": "输入超过 272K tokens 后，整次请求采用长上下文费率。当前为优惠价，至少持续至 2026 年 11 月 21 日；官方未公布确定结束日期。",
          "noteEn": "For prompts over 272K input tokens, long-context rates apply to the full request. These promotional rates are available at least through November 21, 2026; no fixed end date has been announced."
        }
      ]
    },
    "gpt-5-5": {
      "variants": [
        {
          "name": "gpt-5.5-2026-04-23",
          "currency": "USD",
          "tiers": [
            {
              "input": 5.0,
              "output": 30.0,
              "label": "输入 ≤ 272K tokens",
              "labelEn": "Input ≤ 272K tokens"
            },
            {
              "input": 10.0,
              "output": 45.0,
              "label": "输入 > 272K tokens",
              "labelEn": "Input > 272K tokens"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.5",
            "https://developers.openai.com/api/docs/pricing"
          ],
          "note": "输入超过 272K tokens 后，官方规定对完整会话采用长上下文费率。",
          "noteEn": "For prompts over 272K input tokens, the documentation applies long-context rates to the full session."
        }
      ]
    },
    "gpt-5-4": {
      "variants": [
        {
          "name": "gpt-5.4-2026-03-05",
          "currency": "USD",
          "tiers": [
            {
              "input": 2.5,
              "output": 15.0,
              "label": "输入 ≤ 272K tokens",
              "labelEn": "Input ≤ 272K tokens"
            },
            {
              "input": 5.0,
              "output": 22.5,
              "label": "输入 > 272K tokens",
              "labelEn": "Input > 272K tokens"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.4",
            "https://developers.openai.com/api/docs/pricing"
          ],
          "note": "输入超过 272K tokens 后，官方规定对完整会话采用长上下文费率。",
          "noteEn": "For prompts over 272K input tokens, the documentation applies long-context rates to the full session."
        }
      ]
    },
    "gpt-5-3-codex": {
      "variants": [
        {
          "name": "gpt-5.3-codex",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.75,
              "output": 14.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.3-codex",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "gpt-5-2": {
      "variants": [
        {
          "name": "gpt-5.2-2025-12-11",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.75,
              "output": 14.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.2",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "gpt-5-1": {
      "variants": [
        {
          "name": "gpt-5.1-2025-11-13",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.25,
              "output": 10.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5.1",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "gpt-5": {
      "variants": [
        {
          "name": "gpt-5-2025-08-07",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.25,
              "output": 10.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-5",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "gpt-4-1": {
      "variants": [
        {
          "name": "gpt-4.1-2025-04-14",
          "currency": "USD",
          "tiers": [
            {
              "input": 2.0,
              "output": 8.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4.1",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "gpt-4-5": {
      "variants": [
        {
          "name": "gpt-4.5-preview-2025-02-27",
          "currency": "USD",
          "tiers": [
            {
              "input": 75.0,
              "output": 150.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4.5-preview",
            "https://developers.openai.com/api/docs/pricing"
          ],
          "archived": true,
          "note": "官方文档已标注弃用；此处保留文档价格，不表示接口仍可用。",
          "noteEn": "The documentation marks this model as deprecated. The documented rate is retained and does not imply current availability."
        }
      ]
    },
    "gpt-4o": {
      "variants": [
        {
          "name": "gpt-4o-2024-08-06",
          "currency": "USD",
          "tiers": [
            {
              "input": 2.5,
              "output": 10.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4o",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "gpt-4o-mini": {
      "variants": [
        {
          "name": "gpt-4o-mini-2024-07-18",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.15,
              "output": 0.6,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4o-mini",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "gpt-4-turbo": {
      "variants": [
        {
          "name": "gpt-4-turbo-2024-04-09",
          "currency": "USD",
          "tiers": [
            {
              "input": 10.0,
              "output": 30.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4-turbo",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "gpt-4": {
      "variants": [
        {
          "name": "gpt-4-0613",
          "currency": "USD",
          "tiers": [
            {
              "input": 30.0,
              "output": 60.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-4",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "o3-o4-mini": {
      "variants": [
        {
          "name": "o4-mini-2025-04-16",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.1,
              "output": 4.4,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o4-mini",
            "https://developers.openai.com/api/docs/pricing"
          ]
        },
        {
          "name": "o3-2025-04-16",
          "currency": "USD",
          "tiers": [
            {
              "input": 2.0,
              "output": 8.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o3",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "o3-mini": {
      "variants": [
        {
          "name": "o3-mini-2025-01-31",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.1,
              "output": 4.4,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o3-mini",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "o1": {
      "variants": [
        {
          "name": "o1-2024-12-17",
          "currency": "USD",
          "tiers": [
            {
              "input": 15.0,
              "output": 60.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o1",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "o1-preview": {
      "variants": [
        {
          "name": "o1-preview-2024-09-12",
          "currency": "USD",
          "tiers": [
            {
              "input": 15.0,
              "output": 60.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/o1-preview",
            "https://developers.openai.com/api/docs/pricing"
          ]
        }
      ]
    },
    "claude-fable-5-1": {
      "variants": [
        {
          "name": "Claude Fable 5.1",
          "currency": "USD",
          "tiers": [
            {
              "input": 10.0,
              "output": 50.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/fable-5-1/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-fable-5": {
      "variants": [
        {
          "name": "Claude Fable 5",
          "currency": "USD",
          "tiers": [
            {
              "input": 10.0,
              "output": 50.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/fable-5/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-opus-5-5": {
      "variants": [
        {
          "name": "Claude Opus 5.5",
          "currency": "USD",
          "tiers": [
            {
              "input": 4.0,
              "output": 20.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-5-5/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-opus-5": {
      "variants": [
        {
          "name": "Claude Opus 5",
          "currency": "USD",
          "tiers": [
            {
              "input": 5.0,
              "output": 25.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-5/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-sonnet-5-5": {
      "variants": [
        {
          "name": "Claude Sonnet 5.5",
          "currency": "USD",
          "tiers": [
            {
              "input": 2.0,
              "output": 10.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/sonnet-5-5/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-sonnet-5": {
      "variants": [
        {
          "name": "Claude Sonnet 5",
          "currency": "USD",
          "tiers": [
            {
              "input": 2.0,
              "output": 10.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/sonnet-5/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-haiku-4-5": {
      "variants": [
        {
          "name": "Claude Haiku 4.5",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.0,
              "output": 5.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/haiku-4-5/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-opus-4-8": {
      "variants": [
        {
          "name": "Claude Opus 4.8",
          "currency": "USD",
          "tiers": [
            {
              "input": 5.0,
              "output": 25.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-4-8/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-opus-4-7": {
      "variants": [
        {
          "name": "Claude Opus 4.7",
          "currency": "USD",
          "tiers": [
            {
              "input": 5.0,
              "output": 25.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-4-7/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-opus-4-6": {
      "variants": [
        {
          "name": "Claude Opus 4.6",
          "currency": "USD",
          "tiers": [
            {
              "input": 5.0,
              "output": 25.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-4-6/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-opus-4-5": {
      "variants": [
        {
          "name": "Claude Opus 4.5",
          "currency": "USD",
          "tiers": [
            {
              "input": 5.0,
              "output": 25.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/opus-4-5/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-sonnet-4-6": {
      "variants": [
        {
          "name": "Claude Sonnet 4.6",
          "currency": "USD",
          "tiers": [
            {
              "input": 3.0,
              "output": 15.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/sonnet-4-6/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "claude-sonnet-4-5": {
      "variants": [
        {
          "name": "Claude Sonnet 4.5",
          "currency": "USD",
          "tiers": [
            {
              "input": 3.0,
              "output": 15.0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.claude.com/docs/en/models/sonnet-4-5/overview",
            "https://platform.claude.com/docs/en/about-claude/pricing"
          ]
        }
      ]
    },
    "gemini-3-8-flash": {
      "variants": [
        {
          "name": "gemini-3.8-flash",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.75,
              "output": 3.75,
              "label": "限时价格 · 至 2026.12.31",
              "labelEn": "Promotional rate · through Dec 31, 2026",
              "validUntil": "2026-12-31"
            }
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/pricing#gemini-3.8-flash"
          ],
          "note": "官方计划自 2027 年 1 月 1 日起调整为输入 $1.50、输出 $7.50 / 百万 tokens。",
          "noteEn": "The published schedule changes to $1.50 input and $7.50 output per million tokens on January 1, 2027."
        }
      ],
      "note": "采用 Gemini Developer API 的付费标准档文本价格；输出包含思考 tokens。",
      "noteEn": "Paid Standard text rates for the Gemini Developer API. Output includes thinking tokens."
    },
    "gemini-3-7-flash": {
      "variants": [
        {
          "name": "gemini-3.7-flash",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.75,
              "output": 3.75,
              "label": "限时价格 · 至 2026.12.31",
              "labelEn": "Promotional rate · through Dec 31, 2026",
              "validUntil": "2026-12-31"
            }
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/pricing#gemini-3.7-flash"
          ],
          "note": "官方计划自 2027 年 1 月 1 日起调整为输入 $1.50、输出 $7.50 / 百万 tokens。",
          "noteEn": "The published schedule changes to $1.50 input and $7.50 output per million tokens on January 1, 2027."
        }
      ],
      "note": "采用 Gemini Developer API 的付费标准档文本价格；输出包含思考 tokens。",
      "noteEn": "Paid Standard text rates for the Gemini Developer API. Output includes thinking tokens."
    },
    "gemini-3-6-flash": {
      "variants": [
        {
          "name": "gemini-3.6-flash",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.75,
              "output": 3.75,
              "label": "限时价格 · 至 2026.12.31",
              "labelEn": "Promotional rate · through Dec 31, 2026",
              "validUntil": "2026-12-31"
            }
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/pricing#gemini-3.6-flash"
          ],
          "note": "官方计划自 2027 年 1 月 1 日起调整为输入 $1.50、输出 $7.50 / 百万 tokens。",
          "noteEn": "The published schedule changes to $1.50 input and $7.50 output per million tokens on January 1, 2027."
        }
      ],
      "note": "采用 Gemini Developer API 的付费标准档文本价格；输出包含思考 tokens。",
      "noteEn": "Paid Standard text rates for the Gemini Developer API. Output includes thinking tokens."
    },
    "gemini-3-5-flash": {
      "variants": [
        {
          "name": "gemini-3.5-flash",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.5,
              "output": 9,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/pricing#gemini-3.5-flash"
          ]
        }
      ],
      "note": "采用 Gemini Developer API 的付费标准档文本价格；输出包含思考 tokens。",
      "noteEn": "Paid Standard text rates for the Gemini Developer API. Output includes thinking tokens."
    },
    "gemini-3-1": {
      "variants": [
        {
          "name": "gemini-3.1-pro-preview",
          "currency": "USD",
          "tiers": [
            {
              "input": 2,
              "output": 12,
              "label": "输入 ≤ 200K tokens",
              "labelEn": "Input ≤ 200K tokens"
            },
            {
              "input": 4,
              "output": 18,
              "label": "输入 > 200K tokens",
              "labelEn": "Input > 200K tokens"
            }
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/pricing#gemini-3.1-pro-preview"
          ]
        }
      ],
      "note": "采用 Gemini Developer API 的付费标准档文本价格；输出包含思考 tokens。",
      "noteEn": "Paid Standard text rates for the Gemini Developer API. Output includes thinking tokens."
    },
    "gemini-3-flash": {
      "variants": [
        {
          "name": "gemini-3-flash-preview",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.5,
              "output": 3,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/pricing#gemini-3-flash-preview"
          ]
        }
      ],
      "note": "采用 Gemini Developer API 的付费标准档文本价格；输出包含思考 tokens。",
      "noteEn": "Paid Standard text rates for the Gemini Developer API. Output includes thinking tokens."
    },
    "gemini-2-5": {
      "variants": [
        {
          "name": "gemini-2.5-pro",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.25,
              "output": 10,
              "label": "输入 ≤ 200K tokens",
              "labelEn": "Input ≤ 200K tokens"
            },
            {
              "input": 2.5,
              "output": 15,
              "label": "输入 > 200K tokens",
              "labelEn": "Input > 200K tokens"
            }
          ],
          "sources": [
            "https://ai.google.dev/gemini-api/docs/pricing#gemini-2.5-pro"
          ]
        }
      ],
      "note": "采用 Gemini Developer API 的付费标准档文本价格；输出包含思考 tokens。",
      "noteEn": "Paid Standard text rates for the Gemini Developer API. Output includes thinking tokens."
    },
    "deepseek-v4-1-flash": {
      "variants": [
        {
          "name": "DeepSeek-V4.1-Flash",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.15,
              "output": 0.6,
              "label": "低峰时段",
              "labelEn": "Off-peak"
            },
            {
              "input": 0.3,
              "output": 1.2,
              "label": "高峰时段",
              "labelEn": "Peak"
            }
          ],
          "sources": [
            "https://api-docs.deepseek.com/quick_start/pricing/"
          ]
        }
      ],
      "note": "未命中缓存的输入价格。高峰为周一至周五 UTC 01:00–04:00、06:00–10:00（北京时间 09:00–12:00、14:00–18:00），中国法定节假日除外；其余时段按低峰计费。",
      "noteEn": "Uncached input rates. Peak hours are Monday–Friday, 01:00–04:00 and 06:00–10:00 UTC, excluding Chinese public holidays. All other hours are off-peak."
    },
    "deepseek-v4-pro-0813": {
      "variants": [
        {
          "name": "DeepSeek-V4-Pro-0813",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.66,
              "output": 1.98,
              "label": "低峰时段",
              "labelEn": "Off-peak"
            },
            {
              "input": 1.32,
              "output": 3.96,
              "label": "高峰时段",
              "labelEn": "Peak"
            }
          ],
          "sources": [
            "https://api-docs.deepseek.com/quick_start/pricing/"
          ]
        }
      ],
      "note": "未命中缓存的输入价格。高峰为周一至周五 UTC 01:00–04:00、06:00–10:00（北京时间 09:00–12:00、14:00–18:00），中国法定节假日除外；其余时段按低峰计费。",
      "noteEn": "Uncached input rates. Peak hours are Monday–Friday, 01:00–04:00 and 06:00–10:00 UTC, excluding Chinese public holidays. All other hours are off-peak."
    },
    "grok-4-7": {
      "variants": [
        {
          "name": "grok-4.7",
          "currency": "USD",
          "tiers": [
            {
              "input": 2,
              "output": 6,
              "label": "输入 < 200K tokens",
              "labelEn": "Input < 200K tokens"
            },
            {
              "input": 4,
              "output": 12,
              "label": "输入 ≥ 200K tokens",
              "labelEn": "Input ≥ 200K tokens"
            }
          ],
          "sources": [
            "https://docs.x.ai/developers/pricing"
          ]
        }
      ],
      "note": "全球 API 端点的标准价格；达到长上下文阈值后整次请求按高档费率计费。美国区域端点另加 10%，Priority 档另行定价。",
      "noteEn": "Standard global-endpoint rates. At the long-context threshold, all request tokens use the higher tier. The US regional endpoint adds 10%; Priority has separate rates."
    },
    "grok-4-6": {
      "variants": [
        {
          "name": "grok-4.6",
          "currency": "USD",
          "tiers": [
            {
              "input": 2,
              "output": 6,
              "label": "输入 < 200K tokens",
              "labelEn": "Input < 200K tokens"
            },
            {
              "input": 4,
              "output": 12,
              "label": "输入 ≥ 200K tokens",
              "labelEn": "Input ≥ 200K tokens"
            }
          ],
          "sources": [
            "https://docs.x.ai/developers/pricing"
          ]
        }
      ],
      "note": "全球 API 端点的标准价格；达到长上下文阈值后整次请求按高档费率计费。美国区域端点另加 10%，Priority 档另行定价。",
      "noteEn": "Standard global-endpoint rates. At the long-context threshold, all request tokens use the higher tier. The US regional endpoint adds 10%; Priority has separate rates."
    },
    "grok-4-5": {
      "variants": [
        {
          "name": "grok-4.5",
          "currency": "USD",
          "tiers": [
            {
              "input": 2,
              "output": 6,
              "label": "输入 < 200K tokens",
              "labelEn": "Input < 200K tokens"
            },
            {
              "input": 4,
              "output": 12,
              "label": "输入 ≥ 200K tokens",
              "labelEn": "Input ≥ 200K tokens"
            }
          ],
          "sources": [
            "https://docs.x.ai/developers/pricing"
          ]
        }
      ],
      "note": "全球 API 端点的标准价格；达到长上下文阈值后整次请求按高档费率计费。Priority 档另行定价。",
      "noteEn": "Standard global-endpoint rates. At the long-context threshold, all request tokens use the higher tier. Priority has separate rates."
    },
    "glm-5-3-flash": {
      "variants": [
        {
          "name": "GLM-5.3-Flash",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.15,
              "output": 0.5,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://docs.z.ai/guides/overview/pricing"
          ]
        }
      ],
      "note": "采用 Z.ai 国际平台的官方 API 价格；与模型权重自行部署的成本分开。",
      "noteEn": "Official Z.ai international API rates, separate from the cost of self-hosting model weights."
    },
    "glm-5-3": {
      "variants": [
        {
          "name": "GLM-5.3",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.4,
              "output": 4.4,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://docs.z.ai/guides/overview/pricing"
          ]
        }
      ],
      "note": "采用 Z.ai 国际平台的官方 API 价格；与模型权重自行部署的成本分开。",
      "noteEn": "Official Z.ai international API rates, separate from the cost of self-hosting model weights."
    },
    "glm-5-2": {
      "variants": [
        {
          "name": "GLM-5.2",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.4,
              "output": 4.4,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://docs.z.ai/guides/overview/pricing"
          ]
        }
      ],
      "note": "采用 Z.ai 国际平台的官方 API 价格；与模型权重自行部署的成本分开。",
      "noteEn": "Official Z.ai international API rates, separate from the cost of self-hosting model weights."
    },
    "glm-5-1": {
      "variants": [
        {
          "name": "GLM-5.1",
          "currency": "USD",
          "tiers": [
            {
              "input": 1.4,
              "output": 4.4,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://docs.z.ai/guides/overview/pricing"
          ]
        }
      ],
      "note": "采用 Z.ai 国际平台的官方 API 价格；与模型权重自行部署的成本分开。",
      "noteEn": "Official Z.ai international API rates, separate from the cost of self-hosting model weights."
    },
    "glm-5": {
      "variants": [
        {
          "name": "GLM-5",
          "currency": "USD",
          "tiers": [
            {
              "input": 1,
              "output": 3.2,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://docs.z.ai/guides/overview/pricing"
          ]
        }
      ],
      "note": "采用 Z.ai 国际平台的官方 API 价格；与模型权重自行部署的成本分开。",
      "noteEn": "Official Z.ai international API rates, separate from the cost of self-hosting model weights."
    },
    "glm-4-7": {
      "variants": [
        {
          "name": "GLM-4.7",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.6,
              "output": 2.2,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://docs.z.ai/guides/overview/pricing"
          ]
        }
      ],
      "note": "采用 Z.ai 国际平台的官方 API 价格；与模型权重自行部署的成本分开。",
      "noteEn": "Official Z.ai international API rates, separate from the cost of self-hosting model weights."
    },
    "glm-4-6": {
      "variants": [
        {
          "name": "GLM-4.6",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.6,
              "output": 2.2,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://docs.z.ai/guides/overview/pricing"
          ]
        }
      ],
      "note": "采用 Z.ai 国际平台的官方 API 价格；与模型权重自行部署的成本分开。",
      "noteEn": "Official Z.ai international API rates, separate from the cost of self-hosting model weights."
    },
    "glm-4-5": {
      "variants": [
        {
          "name": "GLM-4.5",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.6,
              "output": 2.2,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://docs.z.ai/guides/overview/pricing"
          ]
        }
      ],
      "note": "采用 Z.ai 国际平台的官方 API 价格；与模型权重自行部署的成本分开。",
      "noteEn": "Official Z.ai international API rates, separate from the cost of self-hosting model weights."
    },
    "glm-4-7-flash": {
      "variants": [
        {
          "name": "GLM-4.7-Flash",
          "currency": "USD",
          "tiers": [
            {
              "input": 0,
              "output": 0,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://docs.z.ai/guides/overview/pricing"
          ]
        }
      ],
      "note": "采用 Z.ai 国际平台的官方 API 价格；GLM-4.7-Flash 在核对日为免费 API，仍受平台额度与速率限制。",
      "noteEn": "Z.ai lists this API as free on the review date, subject to platform quotas and rate limits."
    },
    "qwen-3-8-flash": {
      "variants": [
        {
          "name": "qwen3.8-flash",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.15,
              "output": 0.47,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://www.qwencloud.com/models/qwen3.8-flash"
          ]
        }
      ],
      "note": "QwenCloud 托管 Flash 的文本 API 价格；不代表自行部署 Flash-Next 权重的成本。",
      "noteEn": "Text API rates for hosted QwenCloud Flash, separate from the cost of self-hosting Flash-Next weights."
    },
    "qwen-3-8-max-0902": {
      "variants": [
        {
          "name": "qwen3.8-max",
          "currency": "USD",
          "tiers": [
            {
              "input": 2,
              "output": 6,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://www.qwencloud.com/models/qwen3.8-max",
            "https://docs.qwencloud.com/changelog/model-updates/qwen3.8-max-upgrade"
          ]
        }
      ],
      "note": "当前 QwenCloud Max 服务的价格；对应 0902 更新，不回填为初始版本首发价。",
      "noteEn": "Rates for the current QwenCloud Max service following the 0902 update, not the initial release price."
    },
    "minimax-m3": {
      "variants": [
        {
          "name": "MiniMax-M3",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.3,
              "output": 1.2,
              "label": "输入 ≤ 512K tokens",
              "labelEn": "Input ≤ 512K tokens"
            },
            {
              "input": 0.6,
              "output": 2.4,
              "label": "输入 > 512K tokens",
              "labelEn": "Input > 512K tokens"
            }
          ],
          "sources": [
            "https://platform.minimax.io/docs/guides/pricing-paygo"
          ]
        }
      ],
      "note": "采用国际平台 Pay-as-you-go 标准档现行价格，不含 Priority、Highspeed 或 Token Plan 订阅。",
      "noteEn": "Current international Pay-as-you-go Standard rates, excluding Priority, Highspeed, and Token Plan subscriptions."
    },
    "minimax-m2-7": {
      "variants": [
        {
          "name": "MiniMax-M2.7",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.3,
              "output": 1.2,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.minimax.io/docs/guides/pricing-paygo"
          ]
        }
      ],
      "note": "采用国际平台 Pay-as-you-go 标准档现行价格，不含 Priority、Highspeed 或 Token Plan 订阅。",
      "noteEn": "Current international Pay-as-you-go Standard rates, excluding Priority, Highspeed, and Token Plan subscriptions."
    },
    "minimax-m2-5": {
      "variants": [
        {
          "name": "MiniMax-M2.5",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.3,
              "output": 1.2,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.minimax.io/docs/guides/pricing-paygo"
          ]
        }
      ],
      "note": "采用国际平台 Pay-as-you-go 标准档现行价格，不含 Priority、Highspeed 或 Token Plan 订阅。",
      "noteEn": "Current international Pay-as-you-go Standard rates, excluding Priority, Highspeed, and Token Plan subscriptions."
    },
    "minimax-m2-1": {
      "variants": [
        {
          "name": "MiniMax-M2.1",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.3,
              "output": 1.2,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.minimax.io/docs/guides/pricing-paygo"
          ]
        }
      ],
      "note": "采用国际平台 Pay-as-you-go 标准档现行价格，不含 Priority、Highspeed 或 Token Plan 订阅。",
      "noteEn": "Current international Pay-as-you-go Standard rates, excluding Priority, Highspeed, and Token Plan subscriptions."
    },
    "minimax-m2": {
      "variants": [
        {
          "name": "MiniMax-M2",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.3,
              "output": 1.2,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://platform.minimax.io/docs/guides/pricing-paygo"
          ]
        }
      ],
      "note": "采用国际平台 Pay-as-you-go 标准档现行价格，不含 Priority、Highspeed 或 Token Plan 订阅。",
      "noteEn": "Current international Pay-as-you-go Standard rates, excluding Priority, Highspeed, and Token Plan subscriptions."
    },
    "mimo-v2-6": {
      "variants": [
        {
          "name": "mimo-v2.6-flash",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.14,
              "output": 0.28,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://mimo.mi.com/docs/en-US/price/pay-as-you-go"
          ]
        },
        {
          "name": "mimo-v2.6-pro",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.435,
              "output": 0.87,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://mimo.mi.com/docs/en-US/price/pay-as-you-go"
          ]
        }
      ],
      "note": "海外区域实时 API 的美元价格；中国大陆区域按人民币另行定价，不含 Batch 或加速服务。",
      "noteEn": "USD rates for the overseas real-time API. Mainland China has separate CNY rates; Batch and Ultraspeed are excluded."
    },
    "mimo-v2-5": {
      "variants": [
        {
          "name": "mimo-v2.5",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.14,
              "output": 0.28,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://mimo.mi.com/docs/en-US/price/pay-as-you-go"
          ]
        },
        {
          "name": "mimo-v2.5-pro",
          "currency": "USD",
          "tiers": [
            {
              "input": 0.435,
              "output": 0.87,
              "label": "标准 API",
              "labelEn": "Standard API"
            }
          ],
          "sources": [
            "https://mimo.mi.com/docs/en-US/price/pay-as-you-go"
          ]
        }
      ],
      "note": "海外区域实时 API 的美元价格；中国大陆区域按人民币另行定价，不含 Batch 或加速服务。官方计划于 2026 年 10 月 21 日停用 V2.5 系列 API。",
      "noteEn": "USD rates for the overseas real-time API. Mainland China has separate CNY rates; Batch and Ultraspeed are excluded. V2.5 API retirement is scheduled for October 21, 2026."
    },
    "gpt-6-1-sol": {
      "checkedAt": "2026-10-03",
      "variants": [
        {
          "name": "gpt-6.1-sol",
          "currency": "USD",
          "tiers": [
            {
              "input": 2,
              "output": 10,
              "label": "Standard · 输入 ≤ 272K tokens",
              "labelEn": "Standard · Input ≤ 272K tokens"
            },
            {
              "input": 4,
              "output": 15,
              "label": "Standard · 输入 > 272K tokens",
              "labelEn": "Standard · Input > 272K tokens"
            }
          ],
          "sources": [
            "https://developers.openai.com/api/docs/models/gpt-6.1-sol"
          ]
        }
      ]
    },
    "gemini-4-argon": {
      "checkedAt": "2026-10-03",
      "variants": [
        {
          "name": "Gemini 4 Argon",
          "currency": "USD",
          "announced": true,
          "tiers": [
            {
              "input": 2,
              "output": 10,
              "label": "已公布的首发价 · 尚未普遍开放",
              "labelEn": "Announced introductory rate · Not generally available"
            },
            {
              "input": 4,
              "output": 20,
              "label": "首发优惠结束后的公布价格",
              "labelEn": "Announced rate after the introductory period"
            }
          ],
          "sources": [
            "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/"
          ],
          "note": "Google 尚未明确优惠的结束日期。此处是公告价格，不表示公开 API 已可购买。",
          "noteEn": "Google has not specified the introductory period’s end date. These announced rates do not imply general API availability."
        }
      ]
    }
  }
});
