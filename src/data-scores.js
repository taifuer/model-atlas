// Curated public benchmark snapshot. Exact configurations only; not launch scores.
window.MODEL_ATLAS_SCORES = Object.freeze({
  "checkedAt": "2026-10-25",
  "benchmarks": {
    "aa": {
      "name": "Artificial Analysis Intelligence Index",
      "version": "4.3.2",
      "source": "https://artificialanalysis.ai/leaderboards/models",
      "methodology": "https://artificialanalysis.ai/methodology/intelligence-benchmarking",
      "checkedAt": "2026-10-25"
    },
    "arena": {
      "name": "Arena Text · Overall · Style Control",
      "publishedAt": "2026-10-22",
      "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
      "category": "text-overall",
      "adjustments": "style-control",
      "checkedAt": "2026-10-25"
    }
  },
  "cardScopes": {
    "claude-fable-5-1": "variant",
    "gpt-6-sol-luna": "variant",
    "mimo-v2-6": "variant",
    "muse-wonder": "variant",
    "nemotron-3-5-vl-bolt": "variant",
    "deepseek-v4-1-flash": "snapshot"
  },
  "entries": {
    "claude-opus-5-5": {
      "aa": {
        "model": "Claude Opus 5.5 (max with fallback)",
        "score": 58,
        "source": "https://artificialanalysis.ai/models/claude-opus-5-5",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "Claude Opus 5.5 (High)",
        "score": 1509,
        "confidenceInterval": 7,
        "votes": 10322,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "claude-sonnet-5-5": {
      "aa": {
        "model": "Claude Sonnet 5.5 (max with fallback)",
        "score": 56,
        "source": "https://artificialanalysis.ai/models/claude-sonnet-5-5",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "Claude Sonnet 5.5 (xHigh)",
        "score": 1478,
        "confidenceInterval": 7,
        "votes": 8977,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "claude-fable-5-1": {
      "aa": {
        "model": "Claude Fable 5.1 (max with fallback)",
        "score": 53,
        "source": "https://artificialanalysis.ai/models/claude-fable-5-1",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "Claude Fable 5.1 (Max)",
        "score": 1503,
        "confidenceInterval": 6,
        "votes": 16343,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "gpt-6-astra": {
      "aa": {
        "model": "GPT-6 Astra (max)",
        "score": 53,
        "source": "https://artificialanalysis.ai/models/gpt-6-astra",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "GPT-6 Astra (Max)",
        "score": 1476,
        "confidenceInterval": 6,
        "votes": 14076,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "gpt-6-1-sol": {
      "aa": {
        "model": "GPT-6.1 Sol (max)",
        "score": 52,
        "source": "https://artificialanalysis.ai/models/gpt-6-1-sol",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "GPT-6.1 Sol (Max)",
        "score": 1480,
        "confidenceInterval": 7,
        "votes": 8305,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "gemini-4-argon": {
      "aa": {
        "model": "Gemini 4 Argon (high)",
        "score": 53,
        "source": "https://artificialanalysis.ai/models/gemini-4-argon",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "Gemini 4 Argon (High)",
        "score": 1517,
        "confidenceInterval": 7,
        "votes": 10083,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "preliminary": true,
        "checkedAt": "2026-10-25"
      }
    },
    "muse-spark-1-3": {
      "aa": {
        "model": "Muse Spark 1.3 (max)",
        "score": 48,
        "source": "https://artificialanalysis.ai/models/muse-spark-1-3",
        "checkedAt": "2026-10-25",
        "note": "对应 Muse Spark 1.3 (max) 的评测结果；AA 已将该型号标记为弃用，保留其详情页公布的历史成绩。",
        "noteEn": "Evaluation result for Muse Spark 1.3 (max). AA marks this model as deprecated; its detail page retains the historical score."
      },
      "arena": {
        "model": "Muse Spark 1.3 (Max)",
        "score": 1496,
        "confidenceInterval": 5,
        "votes": 20506,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "grok-4-7": {
      "aa": {
        "model": "Grok 4.7 (xhigh)",
        "score": 46,
        "source": "https://artificialanalysis.ai/models/grok-4-7",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "Grok 4.7 (xHigh)",
        "score": 1441,
        "confidenceInterval": 6,
        "votes": 14693,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "mimo-v2-6": {
      "aa": {
        "model": "MiMo-V2.6-Pro",
        "score": 46,
        "source": "https://artificialanalysis.ai/models/mimo-v2-6-pro",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "MiMo-V2.6-Pro",
        "score": 1480,
        "confidenceInterval": 9,
        "votes": 4067,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "qwen-3-8-max-0902": {
      "aa": {
        "model": "Qwen3.8 Max (0902)",
        "score": 45,
        "source": "https://artificialanalysis.ai/models/qwen3-8-max",
        "checkedAt": "2026-10-25"
      }
    },
    "glm-5-3": {
      "aa": {
        "model": "GLM-5.3 (max)",
        "score": 45,
        "source": "https://artificialanalysis.ai/models/glm-5-3",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "GLM-5.3 (Max)",
        "score": 1481,
        "confidenceInterval": 5,
        "votes": 25144,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "step-5-preview": {
      "aa": {
        "model": "Step 5 Preview",
        "score": 44,
        "source": "https://artificialanalysis.ai/models/step-5",
        "checkedAt": "2026-10-25"
      }
    },
    "kimi-k3": {
      "aa": {
        "model": "Kimi K3 (max)",
        "score": 44,
        "source": "https://artificialanalysis.ai/models/kimi-k3",
        "checkedAt": "2026-10-25",
        "note": "对应 Kimi K3 (max) 的评测结果；AA 已将该型号标记为弃用，保留其详情页公布的历史成绩。",
        "noteEn": "Evaluation result for Kimi K3 (max). AA marks this model as deprecated; its detail page retains the historical score."
      },
      "arena": {
        "model": "Kimi K3 (Max)",
        "score": 1487,
        "confidenceInterval": 4,
        "votes": 35379,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "glm-5-3-flash": {
      "aa": {
        "model": "GLM-5.3-Flash",
        "score": 42,
        "source": "https://artificialanalysis.ai/models/glm-5-3-flash",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "GLM-5.3-Flash",
        "score": 1476,
        "confidenceInterval": 5,
        "votes": 38359,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "gemini-3-8-flash": {
      "aa": {
        "model": "Gemini 3.8 Flash (high)",
        "score": 41,
        "source": "https://artificialanalysis.ai/models/gemini-3-8-flash",
        "checkedAt": "2026-10-25"
      },
      "arena": {
        "model": "Gemini 3.8 Flash (High)",
        "score": 1496,
        "confidenceInterval": 4,
        "votes": 43997,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "preliminary": true,
        "checkedAt": "2026-10-25"
      }
    },
    "deepseek-v4-1-flash": {
      "aa": {
        "model": "DeepSeek V4.1 Flash 1017 (max)",
        "score": 45,
        "source": "https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017",
        "checkedAt": "2026-10-25",
        "note": "对应 2026 年 10 月 17 日的 1017 快照。",
        "noteEn": "Evaluated on the October 17, 2026 (1017) checkpoint."
      },
      "arena": {
        "model": "DeepSeek-V4.1-Flash-20260910 (Max)",
        "score": 1476,
        "confidenceInterval": 6,
        "votes": 13750,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "note": "此分数对应 Arena 明确标注的 20260910 受测版本，不能视为 1017 快照的成绩。",
        "noteEn": "Arena explicitly identifies the evaluated 20260910 version; this is not a score for the 1017 checkpoint.",
        "checkedAt": "2026-10-25"
      }
    },
    "deepseek-v4-pro-0813": {
      "aa": {
        "model": "DeepSeek V4 Pro 0813 (max)",
        "score": 36,
        "source": "https://artificialanalysis.ai/models/deepseek-v4-pro",
        "checkedAt": "2026-10-25"
      }
    },
    "minimax-m3": {
      "aa": {
        "model": "MiniMax-M3",
        "score": 29,
        "source": "https://artificialanalysis.ai/models/minimax-m3",
        "checkedAt": "2026-10-25"
      }
    },
    "hunyuan-hy3": {
      "aa": {
        "model": "Hy3",
        "score": 25,
        "source": "https://artificialanalysis.ai/models/hy3",
        "checkedAt": "2026-10-25"
      }
    },
    "mistral-medium-3-5": {
      "aa": {
        "model": "Mistral Medium 3.5",
        "score": 14,
        "source": "https://artificialanalysis.ai/models/mistral-medium-3-5",
        "checkedAt": "2026-10-25"
      }
    },
    "gpt-6-sol-luna": {
      "aa": {
        "model": "GPT-6 Sol (max)",
        "score": 48,
        "source": "https://artificialanalysis.ai/models/gpt-6-sol",
        "checkedAt": "2026-10-25",
        "note": "对应 GPT-6 Sol (max) 的评测结果；AA 已将该型号标记为弃用，保留其详情页公布的历史成绩。",
        "noteEn": "Evaluation result for GPT-6 Sol (max). AA marks this model as deprecated; its detail page retains the historical score."
      },
      "arena": {
        "model": "GPT-6 Sol (Max)",
        "score": 1459,
        "confidenceInterval": 6,
        "votes": 14707,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-10-25"
      }
    },
    "claude-haiku-5-5": {
      "aa": {
        "model": "Claude Haiku 5.5 (max)",
        "score": 43,
        "source": "https://artificialanalysis.ai/models/claude-haiku-5-5",
        "checkedAt": "2026-10-25"
      }
    },
    "mistral-large-4-preview": {
      "aa": {
        "model": "Mistral Large 4 Preview",
        "score": 38,
        "source": "https://artificialanalysis.ai/models/mistral-large-4",
        "checkedAt": "2026-10-25"
      }
    },
    "ling-3-1-flash": {
      "aa": {
        "model": "Ling 3.1 Flash",
        "score": 41,
        "source": "https://artificialanalysis.ai/models/ling-3-1-flash",
        "checkedAt": "2026-10-25"
      }
    },
    "muse-wonder": {
      "aa": {
        "model": "Muse Wonder Full (max)",
        "score": 56,
        "source": "https://artificialanalysis.ai/models/muse-wonder-full",
        "checkedAt": "2026-10-25"
      }
    },
    "muse-spark-open": {
      "aa": {
        "model": "Muse Spark Open (xhigh)",
        "score": 39,
        "source": "https://artificialanalysis.ai/models/muse-spark-open",
        "checkedAt": "2026-10-25"
      }
    },
    "reflection-beam-1": {
      "aa": {
        "model": "Beam 1.0",
        "score": 30,
        "source": "https://artificialanalysis.ai/models/reflection-beam",
        "checkedAt": "2026-10-25"
      }
    },
    "nemotron-3-5-vl-bolt": {
      "aa": {
        "model": "Nemotron 3.5 Super VL",
        "score": 26,
        "source": "https://artificialanalysis.ai/models/nemotron-3-5-super-vl",
        "checkedAt": "2026-10-25"
      }
    },
    "minimax-m3-1-flash": {
      "aa": {
        "model": "MiniMax-M3.1-Flash",
        "score": 43,
        "source": "https://artificialanalysis.ai/models/minimax-m3-1-flash",
        "checkedAt": "2026-10-25"
      }
    },
    "kimi-k3-1-pro": {
      "aa": {
        "model": "Kimi K3.1 Pro",
        "score": 55,
        "source": "https://artificialanalysis.ai/models/kimi-k3-1-pro",
        "checkedAt": "2026-10-25"
      }
    }
  }
});
