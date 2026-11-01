// Curated public benchmark snapshot. Exact configurations only; not launch scores.
window.MODEL_ATLAS_SCORES = Object.freeze({
  "checkedAt": "2026-11-01",
  "benchmarks": {
    "aa": {
      "name": "Artificial Analysis Intelligence Index",
      "version": "5.0",
      "source": "https://artificialanalysis.ai/leaderboards/models",
      "methodology": "https://artificialanalysis.ai/methodology/intelligence-benchmarking",
      "checkedAt": "2026-11-01"
    },
    "arena": {
      "name": "Arena Text · Overall · Style Control",
      "publishedAt": "2026-10-28",
      "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
      "category": "text-overall",
      "adjustments": "style-control",
      "checkedAt": "2026-11-01"
    }
  },
  "cardScopes": {
    "claude-fable-5-1": "variant",
    "gpt-6-sol-luna": "variant",
    "mimo-v2-6": "variant",
    "muse-wonder": "variant",
    "nemotron-3-5-vl-bolt": "variant",
    "deepseek-v4-1-flash": "snapshot",
    "ling-3-1-flash": "snapshot",
    "mistral-large-4-preview": "snapshot"
  },
  "entries": {
    "claude-opus-5-5": {
      "aa": {
        "model": "Claude Opus 5.5 (max with fallback)",
        "score": 58,
        "source": "https://artificialanalysis.ai/models/claude-opus-5-5",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "Claude Opus 5.5 (High)",
        "score": 1509,
        "confidenceInterval": 7,
        "votes": 11415,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "claude-sonnet-5-5": {
      "aa": {
        "model": "Claude Sonnet 5.5 (max with fallback)",
        "score": 54,
        "source": "https://artificialanalysis.ai/models/claude-sonnet-5-5",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "Claude Sonnet 5.5 (xHigh)",
        "score": 1477,
        "confidenceInterval": 7,
        "votes": 10033,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "claude-fable-5-1": {
      "aa": {
        "model": "Claude Fable 5.1 (max with fallback)",
        "score": 49,
        "source": "https://artificialanalysis.ai/models/claude-fable-5-1",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "Claude Fable 5.1 (Max)",
        "score": 1504,
        "confidenceInterval": 6,
        "votes": 17178,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "gpt-6-astra": {
      "aa": {
        "model": "GPT-6 Astra (max)",
        "score": 57,
        "source": "https://artificialanalysis.ai/models/gpt-6-astra",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "GPT-6 Astra (Max)",
        "score": 1476,
        "confidenceInterval": 6,
        "votes": 15038,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "gpt-6-1-sol": {
      "aa": {
        "model": "GPT-6.1 Sol (max)",
        "score": 55,
        "source": "https://artificialanalysis.ai/models/gpt-6-1-sol",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "GPT-6.1 Sol (Max)",
        "score": 1481,
        "confidenceInterval": 7,
        "votes": 9367,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "gemini-4-argon": {
      "aa": {
        "model": "Gemini 4 Argon (high)",
        "score": 50,
        "source": "https://artificialanalysis.ai/models/gemini-4-argon",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "Gemini 4 Argon (High)",
        "score": 1520,
        "confidenceInterval": 6,
        "votes": 11889,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "muse-spark-1-3": {
      "aa": {
        "model": "Muse Spark 1.3 (max)",
        "score": 36,
        "source": "https://artificialanalysis.ai/models/muse-spark-1-3",
        "checkedAt": "2026-11-01",
        "note": "AA 已将该型号标记为弃用；此处采用其详情页公布的 v5.0 成绩。",
        "noteEn": "AA marks this model as deprecated; this is the v5.0 score published on its detail page."
      },
      "arena": {
        "model": "Muse Spark 1.3 (Max)",
        "score": 1495,
        "confidenceInterval": 5,
        "votes": 22134,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "grok-4-7": {
      "aa": {
        "model": "Grok 4.7 (xhigh)",
        "score": 34,
        "source": "https://artificialanalysis.ai/models/grok-4-7",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "Grok 4.7 (xHigh)",
        "score": 1441,
        "confidenceInterval": 6,
        "votes": 16442,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "mimo-v2-6": {
      "aa": {
        "model": "MiMo-V2.6-Pro",
        "score": 30,
        "source": "https://artificialanalysis.ai/models/mimo-v2-6-pro",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "MiMo-V2.6-Pro",
        "score": 1480,
        "confidenceInterval": 9,
        "votes": 4037,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "qwen-3-8-max-0902": {
      "aa": {
        "model": "Qwen3.8 Max (0902)",
        "score": 34,
        "source": "https://artificialanalysis.ai/models/qwen3-8-max",
        "checkedAt": "2026-11-01"
      }
    },
    "glm-5-3": {
      "aa": {
        "model": "GLM-5.3 (max)",
        "score": 32,
        "source": "https://artificialanalysis.ai/models/glm-5-3",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "GLM-5.3 (Max)",
        "score": 1481,
        "confidenceInterval": 5,
        "votes": 26606,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "step-5-preview": {
      "aa": {
        "model": "Step 5 Preview",
        "score": 29,
        "source": "https://artificialanalysis.ai/models/step-5",
        "checkedAt": "2026-11-01"
      }
    },
    "kimi-k3": {
      "arena": {
        "model": "Kimi K3 (Max)",
        "score": 1488,
        "confidenceInterval": 4,
        "votes": 36780,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "glm-5-3-flash": {
      "aa": {
        "model": "GLM-5.3-Flash",
        "score": 28,
        "source": "https://artificialanalysis.ai/models/glm-5-3-flash",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "GLM-5.3-Flash",
        "score": 1477,
        "confidenceInterval": 5,
        "votes": 41642,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "gemini-3-8-flash": {
      "aa": {
        "model": "Gemini 3.8 Flash (high)",
        "score": 31,
        "source": "https://artificialanalysis.ai/models/gemini-3-8-flash",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "Gemini 3.8 Flash (High)",
        "score": 1496,
        "confidenceInterval": 4,
        "votes": 47803,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "preliminary": true,
        "checkedAt": "2026-11-01"
      }
    },
    "deepseek-v4-1-flash": {
      "aa": {
        "model": "DeepSeek V4.1 Flash 1017 (max)",
        "score": 32,
        "source": "https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017",
        "checkedAt": "2026-11-01",
        "note": "对应 2026 年 10 月 17 日的 1017 快照。",
        "noteEn": "Evaluated on the October 17, 2026 (1017) checkpoint."
      },
      "arena": {
        "model": "DeepSeek-V4.1-Flash-20260910 (Max)",
        "score": 1476,
        "confidenceInterval": 6,
        "votes": 13657,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "note": "此分数对应 Arena 明确标注的 20260910 受测版本，不能视为 1017 快照的成绩。",
        "noteEn": "Arena explicitly identifies the evaluated 20260910 version; this is not a score for the 1017 checkpoint.",
        "checkedAt": "2026-11-01"
      }
    },
    "deepseek-v4-pro-0813": {
      "aa": {
        "model": "DeepSeek V4 Pro 0813 (max)",
        "score": 23,
        "source": "https://artificialanalysis.ai/models/deepseek-v4-pro",
        "checkedAt": "2026-11-01"
      }
    },
    "minimax-m3": {
      "aa": {
        "model": "MiniMax-M3",
        "score": 19,
        "source": "https://artificialanalysis.ai/models/minimax-m3",
        "checkedAt": "2026-11-01"
      }
    },
    "gpt-6-sol-luna": {
      "arena": {
        "model": "GPT-6 Sol (Max)",
        "score": 1458,
        "confidenceInterval": 6,
        "votes": 15807,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-01"
      }
    },
    "claude-haiku-5-5": {
      "aa": {
        "model": "Claude Haiku 5.5 (max)",
        "score": 36,
        "source": "https://artificialanalysis.ai/models/claude-haiku-5-5",
        "checkedAt": "2026-11-01"
      }
    },
    "mistral-large-4-preview": {
      "aa": {
        "model": "Mistral Large 4 (high)",
        "score": 26,
        "source": "https://artificialanalysis.ai/models/mistral-large-4",
        "checkedAt": "2026-11-01",
        "note": "对应正式发布的 Mistral Large 4（high），不代表 10 月 6 日原始预览配置的成绩。",
        "noteEn": "Result for the released Mistral Large 4 (high), not the original October 6 preview configuration."
      }
    },
    "ling-3-1-flash": {
      "aa": {
        "model": "Ling 3.1 Flash 1019",
        "score": 29,
        "source": "https://artificialanalysis.ai/models/ling-3-1-flash-1019",
        "checkedAt": "2026-11-01",
        "note": "对应 1019 后训练版本的 v5.0 成绩，不用于原版 Ling 3.1 Flash。",
        "noteEn": "The v5.0 result for the 1019 post-trained checkpoint, not the original Ling 3.1 Flash."
      }
    },
    "muse-wonder": {
      "aa": {
        "model": "Muse Wonder Full (max)",
        "score": 50,
        "source": "https://artificialanalysis.ai/models/muse-wonder-full",
        "checkedAt": "2026-11-01"
      }
    },
    "muse-spark-open": {
      "aa": {
        "model": "Muse Spark Open (xhigh)",
        "score": 25,
        "source": "https://artificialanalysis.ai/models/muse-spark-open",
        "checkedAt": "2026-11-01"
      }
    },
    "reflection-beam-1": {
      "aa": {
        "model": "Beam 1.0",
        "score": 18,
        "source": "https://artificialanalysis.ai/models/reflection-beam",
        "checkedAt": "2026-11-01"
      }
    },
    "nemotron-3-5-vl-bolt": {
      "aa": {
        "model": "Nemotron 3.5 Super VL",
        "score": 14,
        "source": "https://artificialanalysis.ai/models/nemotron-3-5-super-vl",
        "checkedAt": "2026-11-01"
      }
    },
    "minimax-m3-1-flash": {
      "aa": {
        "model": "MiniMax-M3.1-Flash",
        "score": 29,
        "source": "https://artificialanalysis.ai/models/minimax-m3-1-flash",
        "checkedAt": "2026-11-01"
      }
    },
    "kimi-k3-1-pro": {
      "aa": {
        "model": "Kimi K3.1 Pro",
        "score": 46,
        "source": "https://artificialanalysis.ai/models/kimi-k3-1-pro",
        "checkedAt": "2026-11-01"
      }
    },
    "gpt-6-1-terra": {
      "aa": {
        "model": "GPT-6.1 Terra (max)",
        "score": 51,
        "source": "https://artificialanalysis.ai/models/gpt-6-1-terra",
        "checkedAt": "2026-11-01"
      }
    },
    "gemini-4-carbon": {
      "aa": {
        "model": "Gemini 4 Carbon (high)",
        "score": 59,
        "source": "https://artificialanalysis.ai/models/gemini-4-carbon",
        "checkedAt": "2026-11-01"
      },
      "arena": {
        "model": "Gemini 4 Carbon (High)",
        "score": 1528,
        "confidenceInterval": 9,
        "votes": 4403,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "preliminary": true,
        "checkedAt": "2026-11-01"
      }
    }
  }
});
