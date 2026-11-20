// Curated public benchmark snapshot. Exact configurations only; not launch scores.
window.MODEL_ATLAS_SCORES = Object.freeze({
  "checkedAt": "2026-11-20",
  "benchmarks": {
    "aa": {
      "name": "Artificial Analysis Intelligence Index",
      "version": "5.0.1",
      "source": "https://artificialanalysis.ai/leaderboards/models",
      "methodology": "https://artificialanalysis.ai/methodology/intelligence-benchmarking",
      "checkedAt": "2026-11-20"
    },
    "arena": {
      "name": "Arena Text · Overall · Style Control",
      "publishedAt": "2026-11-19",
      "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
      "category": "text-overall",
      "adjustments": "style-control",
      "checkedAt": "2026-11-20"
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
    "mistral-large-4-preview": "snapshot",
    "claude-fable-5-2": "variant",
    "lfm-3": "variant"
  },
  "entries": {
    "claude-opus-5-5": {
      "aa": {
        "model": "Claude Opus 5.5 (max with fallback)",
        "score": 59,
        "source": "https://artificialanalysis.ai/models/claude-opus-5-5",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "Claude Opus 5.5 (High)",
        "score": 1506,
        "confidenceInterval": 6,
        "votes": 18286,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "claude-sonnet-5-5": {
      "aa": {
        "model": "Claude Sonnet 5.5 (max with fallback)",
        "score": 55,
        "source": "https://artificialanalysis.ai/models/claude-sonnet-5-5",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "Claude Sonnet 5.5 (xHigh)",
        "score": 1473,
        "confidenceInterval": 6,
        "votes": 16925,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "claude-fable-5-1": {
      "aa": {
        "model": "Claude Fable 5.1 (max with fallback)",
        "score": 49,
        "source": "https://artificialanalysis.ai/models/claude-fable-5-1",
        "checkedAt": "2026-11-09",
        "note": "该型号已不在 AA 当前榜单中；保留 2026 年 11 月 9 日核对的 v5.0.1 成绩。",
        "noteEn": "This model is no longer in the AA Current leaderboard; retains the v5.0.1 score checked on November 9, 2026."
      },
      "arena": {
        "model": "Claude Fable 5.1 (Max)",
        "score": 1503,
        "confidenceInterval": 5,
        "votes": 22408,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "gpt-6-astra": {
      "aa": {
        "model": "GPT-6 Astra (max)",
        "score": 57,
        "source": "https://artificialanalysis.ai/models/gpt-6-astra",
        "checkedAt": "2026-11-16"
      },
      "arena": {
        "model": "GPT-6 Astra (Max)",
        "score": 1475,
        "confidenceInterval": 5,
        "votes": 20918,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "gpt-6-1-sol": {
      "aa": {
        "model": "GPT-6.1 Sol (max)",
        "score": 55,
        "source": "https://artificialanalysis.ai/models/gpt-6-1-sol",
        "checkedAt": "2026-11-16"
      },
      "arena": {
        "model": "GPT-6.1 Sol (Max)",
        "score": 1483,
        "confidenceInterval": 6,
        "votes": 15857,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "gemini-4-argon": {
      "aa": {
        "model": "Gemini 4 Argon (high)",
        "score": 50,
        "source": "https://artificialanalysis.ai/models/gemini-4-argon",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "Gemini 4 Argon (High)",
        "score": 1520,
        "confidenceInterval": 5,
        "votes": 27193,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "muse-spark-1-3": {
      "aa": {
        "model": "Muse Spark 1.3 (max)",
        "score": 37,
        "source": "https://artificialanalysis.ai/models/muse-spark-1-3",
        "checkedAt": "2026-11-04",
        "note": "AA 已将该型号标记为弃用；此处采用其详情页公布的 v5.0.1 成绩。",
        "noteEn": "AA marks this model as deprecated; this is the v5.0.1 score published on its detail page."
      },
      "arena": {
        "model": "Muse Spark 1.3 (Max)",
        "score": 1498,
        "confidenceInterval": 5,
        "votes": 30142,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "grok-4-7": {
      "aa": {
        "model": "Grok 4.7 (xhigh)",
        "score": 35,
        "source": "https://artificialanalysis.ai/models/grok-4-7",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "Grok 4.7 (xHigh)",
        "score": 1443,
        "confidenceInterval": 5,
        "votes": 25453,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "mimo-v2-6": {
      "aa": {
        "model": "MiMo-V2.6-Pro",
        "score": 30,
        "source": "https://artificialanalysis.ai/models/mimo-v2-6-pro",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "MiMo-V2.6-Pro",
        "score": 1481,
        "confidenceInterval": 9,
        "votes": 4045,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "qwen-3-8-max-0902": {
      "aa": {
        "model": "Qwen3.8 Max (0902)",
        "score": 34,
        "source": "https://artificialanalysis.ai/models/qwen3-8-max",
        "checkedAt": "2026-11-14",
        "note": "该型号已不在 AA 当前榜单中；保留 2026 年 11 月 14 日核对的 v5.0.1 成绩。",
        "noteEn": "This model is no longer in the AA Current leaderboard; retains the v5.0.1 score checked on November 14, 2026."
      }
    },
    "glm-5-3": {
      "aa": {
        "model": "GLM-5.3 (max)",
        "score": 32,
        "source": "https://artificialanalysis.ai/models/glm-5-3",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "GLM-5.3 (Max)",
        "score": 1482,
        "confidenceInterval": 5,
        "votes": 34708,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "step-5-preview": {
      "aa": {
        "model": "Step 5 Preview",
        "score": 29,
        "source": "https://artificialanalysis.ai/models/step-5",
        "checkedAt": "2026-11-20"
      }
    },
    "kimi-k3": {
      "arena": {
        "model": "Kimi K3 (Max)",
        "score": 1488,
        "confidenceInterval": 4,
        "votes": 44364,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "glm-5-3-flash": {
      "aa": {
        "model": "GLM-5.3-Flash",
        "score": 28,
        "source": "https://artificialanalysis.ai/models/glm-5-3-flash",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "GLM-5.3-Flash",
        "score": 1475,
        "confidenceInterval": 4,
        "votes": 56089,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "gemini-3-8-flash": {
      "aa": {
        "model": "Gemini 3.8 Flash (high)",
        "score": 31,
        "source": "https://artificialanalysis.ai/models/gemini-3-8-flash",
        "checkedAt": "2026-11-16"
      },
      "arena": {
        "model": "Gemini 3.8 Flash (High)",
        "score": 1497,
        "confidenceInterval": 4,
        "votes": 73351,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "deepseek-v4-1-flash": {
      "aa": {
        "model": "DeepSeek V4.1 Flash 1017 (max)",
        "score": 33,
        "source": "https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017",
        "checkedAt": "2026-11-20",
        "note": "对应 2026 年 10 月 17 日的 1017 快照。",
        "noteEn": "Evaluated on the October 17, 2026 (1017) checkpoint."
      },
      "arena": {
        "model": "DeepSeek-V4.1-Flash-20260910 (Max)",
        "score": 1475,
        "confidenceInterval": 6,
        "votes": 13492,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20",
        "note": "此分数对应 Arena 明确标注的 20260910 受测版本，不能视为 1017 快照的成绩。",
        "noteEn": "Arena explicitly identifies the evaluated 20260910 version; this is not a score for the 1017 checkpoint."
      }
    },
    "deepseek-v4-pro-0813": {
      "aa": {
        "model": "DeepSeek V4 Pro 0813 (max)",
        "score": 23,
        "source": "https://artificialanalysis.ai/models/deepseek-v4-pro",
        "checkedAt": "2026-11-20"
      }
    },
    "minimax-m3": {
      "aa": {
        "model": "MiniMax-M3",
        "score": 19,
        "source": "https://artificialanalysis.ai/models/minimax-m3",
        "checkedAt": "2026-11-20"
      }
    },
    "gpt-6-sol-luna": {
      "arena": {
        "model": "GPT-6 Sol (Max)",
        "score": 1458,
        "confidenceInterval": 5,
        "votes": 23032,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "claude-haiku-5-5": {
      "aa": {
        "model": "Claude Haiku 5.5 (max)",
        "score": 36,
        "source": "https://artificialanalysis.ai/models/claude-haiku-5-5",
        "checkedAt": "2026-11-20"
      }
    },
    "mistral-large-4-preview": {
      "aa": {
        "model": "Mistral Large 4 (high)",
        "score": 26,
        "source": "https://artificialanalysis.ai/models/mistral-large-4",
        "checkedAt": "2026-11-20",
        "note": "对应正式发布的 Mistral Large 4（high），不代表 10 月 6 日原始预览配置的成绩。",
        "noteEn": "Result for the released Mistral Large 4 (high), not the original October 6 preview configuration."
      }
    },
    "ling-3-1-flash": {
      "aa": {
        "model": "Ling 3.1 Flash 1019",
        "score": 30,
        "source": "https://artificialanalysis.ai/models/ling-3-1-flash-1019",
        "checkedAt": "2026-11-20",
        "note": "对应 1019 后训练版本的 v5.0.1 成绩，不用于原版 Ling 3.1 Flash。",
        "noteEn": "The v5.0.1 result for the 1019 post-trained checkpoint, not the original Ling 3.1 Flash."
      }
    },
    "muse-wonder": {
      "aa": {
        "model": "Muse Wonder Full (max)",
        "score": 50,
        "source": "https://artificialanalysis.ai/models/muse-wonder-full",
        "checkedAt": "2026-11-20"
      }
    },
    "muse-spark-open": {
      "aa": {
        "model": "Muse Spark Open (xhigh)",
        "score": 25,
        "source": "https://artificialanalysis.ai/models/muse-spark-open",
        "checkedAt": "2026-11-20"
      }
    },
    "reflection-beam-1": {
      "aa": {
        "model": "Beam 1.0",
        "score": 18,
        "source": "https://artificialanalysis.ai/models/reflection-beam",
        "checkedAt": "2026-11-20"
      }
    },
    "nemotron-3-5-vl-bolt": {
      "aa": {
        "model": "Nemotron 3.5 Super VL",
        "score": 14,
        "source": "https://artificialanalysis.ai/models/nemotron-3-5-super-vl",
        "checkedAt": "2026-11-20"
      }
    },
    "minimax-m3-1-flash": {
      "aa": {
        "model": "MiniMax-M3.1-Flash",
        "score": 29,
        "source": "https://artificialanalysis.ai/models/minimax-m3-1-flash",
        "checkedAt": "2026-11-20"
      }
    },
    "kimi-k3-1-pro": {
      "aa": {
        "model": "Kimi K3.1 Pro",
        "score": 46,
        "source": "https://artificialanalysis.ai/models/kimi-k3-1-pro",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "Kimi K3.1 Pro (Max)",
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "score": 1482,
        "confidenceInterval": 8,
        "votes": 6658,
        "checkedAt": "2026-11-20"
      }
    },
    "gpt-6-1-terra": {
      "aa": {
        "model": "GPT-6.1 Terra (max)",
        "score": 51,
        "source": "https://artificialanalysis.ai/models/gpt-6-1-terra",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "GPT-6.1 Terra (Max)",
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "score": 1474,
        "confidenceInterval": 8,
        "votes": 8278,
        "checkedAt": "2026-11-20"
      }
    },
    "gemini-4-carbon": {
      "aa": {
        "model": "Gemini 4 Carbon (high)",
        "score": 60,
        "source": "https://artificialanalysis.ai/models/gemini-4-carbon",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "Gemini 4 Carbon (High)",
        "score": 1527,
        "confidenceInterval": 10,
        "votes": 4262,
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "checkedAt": "2026-11-20"
      }
    },
    "inkling-2-small": {
      "aa": {
        "model": "Inkling 2 Small",
        "score": 31,
        "source": "https://artificialanalysis.ai/models/inkling-2-small",
        "checkedAt": "2026-11-20"
      }
    },
    "claude-fable-5-2": {
      "aa": {
        "model": "Claude Fable 5.2 (max with fallback)",
        "score": 65,
        "source": "https://artificialanalysis.ai/models/claude-fable-5-2",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "Claude Fable 5.2 (Max)",
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "score": 1503,
        "confidenceInterval": 9,
        "votes": 5216,
        "checkedAt": "2026-11-20"
      }
    },
    "muse-ember": {
      "aa": {
        "model": "Muse Ember (max)",
        "score": 36,
        "source": "https://artificialanalysis.ai/models/muse-ember",
        "checkedAt": "2026-11-20"
      }
    },
    "hunyuan-hy4": {
      "aa": {
        "model": "Tencent Hy4",
        "score": 35,
        "source": "https://artificialanalysis.ai/models/tencent-hy4",
        "checkedAt": "2026-11-20"
      }
    },
    "gemini-4-hydrogen": {
      "aa": {
        "model": "Gemini 4 Hydrogen (xhigh)",
        "score": 54,
        "source": "https://artificialanalysis.ai/models/gemini-4-hydrogen",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "Gemini 4 Hydrogen (High)",
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "score": 1490,
        "confidenceInterval": 9,
        "votes": 4743,
        "checkedAt": "2026-11-20"
      }
    },
    "qwen-4-max": {
      "aa": {
        "model": "Qwen4 Max",
        "score": 43,
        "source": "https://artificialanalysis.ai/models/qwen4-max",
        "checkedAt": "2026-11-20"
      }
    },
    "gpt-6-2-astra": {
      "aa": {
        "model": "GPT-6.2 Astra (max)",
        "score": 62,
        "source": "https://artificialanalysis.ai/models/gpt-6-2-astra",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "GPT-6.2 Astra (Max)",
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "score": 1468,
        "confidenceInterval": 12,
        "votes": 2398,
        "checkedAt": "2026-11-20"
      }
    },
    "gpt-6-2-sol": {
      "aa": {
        "model": "GPT-6.2 Sol (max)",
        "score": 57,
        "source": "https://artificialanalysis.ai/models/gpt-6-2-sol",
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "GPT-6.2 Sol (Max)",
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "score": 1465,
        "confidenceInterval": 12,
        "votes": 2541,
        "checkedAt": "2026-11-20"
      }
    },
    "lfm-3": {
      "aa": {
        "model": "LFM3-1.7B",
        "score": 6,
        "source": "https://artificialanalysis.ai/models/lfm3-1-7b",
        "checkedAt": "2026-11-20",
        "note": "此成绩对应 LFM3-1.7B 文本型号。",
        "noteEn": "This score is for the LFM3-1.7B text model."
      }
    },
    "gemini-4-neon": {
      "aa": {
        "model": "Gemini 4 Neon (xhigh)",
        "source": "https://artificialanalysis.ai/models/gemini-4-neon",
        "score": 61,
        "checkedAt": "2026-11-20"
      },
      "arena": {
        "model": "Gemini 4 Neon (High)",
        "source": "https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/viewer/text_style_control/latest",
        "score": 1513,
        "confidenceInterval": 9,
        "votes": 5555,
        "checkedAt": "2026-11-20"
      }
    }
  }
});
