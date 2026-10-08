/* Curated hardware history. Event dates and configurations retain explicit source scope. */
window.HARDWARE_ATLAS = {
  "asOf": "2026-10-08",
  "updatedAt": "2026-10-08",
  "accessFilter": false,
  "companies": [
    {
      "id": "nvidia",
      "name": "NVIDIA",
      "nameEn": "NVIDIA",
      "aliases": "英伟达 GeForce Tesla Jetson Blackwell Rubin RTX Spark"
    },
    {
      "id": "amd",
      "name": "AMD",
      "nameEn": "AMD",
      "aliases": "超威 Instinct CDNA ROCm"
    },
    {
      "id": "google",
      "name": "Google",
      "nameEn": "Google",
      "aliases": "谷歌 TPU Trillium Ironwood"
    },
    {
      "id": "amazon",
      "name": "AWS",
      "nameEn": "AWS",
      "aliases": "Amazon 亚马逊 Trainium Inferentia"
    },
    {
      "id": "huawei",
      "name": "华为",
      "nameEn": "Huawei",
      "aliases": "昇腾 Ascend 华为 达芬奇 Atlas CloudMatrix 灵衢 950PR 950DT 960 超节点 Hi-ONE"
    },
    {
      "id": "intel",
      "name": "Intel",
      "nameEn": "Intel",
      "aliases": "英特尔 Habana Gaudi"
    },
    {
      "id": "cerebras",
      "name": "Cerebras",
      "nameEn": "Cerebras",
      "aliases": "晶圆 WSE CS-4 Nexus"
    },
    {
      "id": "apple",
      "name": "Apple",
      "nameEn": "Apple",
      "aliases": "苹果 M1 M3 Ultra M5 Ultra Mac"
    },
    {
      "id": "graphcore",
      "name": "Graphcore",
      "nameEn": "Graphcore",
      "aliases": "IPU Colossus GC200 Bow Bow-2000"
    },
    {
      "id": "meta",
      "name": "Meta",
      "nameEn": "Meta",
      "aliases": "Facebook MTIA 推荐 推理"
    }
  ],
  "categories": {
    "gpu": "数据中心 GPU",
    "accelerator": "专用加速器",
    "edge": "本地与边缘",
    "systems": "算力系统"
  },
  "categoriesEn": {
    "gpu": "Data-center GPUs",
    "accelerator": "Custom accelerators",
    "edge": "Local & edge",
    "systems": "Compute systems"
  },
  "kinds": {
    "announcement": "产品公布",
    "availability": "正式供应",
    "showcase": "公开展示",
    "deployment": "商用记录"
  },
  "kindsEn": {
    "announcement": "Announcement",
    "availability": "Availability",
    "showcase": "Public demonstration",
    "deployment": "Deployment record"
  },
  "themes": {},
  "themesEn": {},
  "tagsEn": {
    "AI 加速器": "AI accelerator",
    "本地与边缘": "Local & edge"
  },
  "releases": [
    {
      "id": "tesla-k80",
      "date": "2014-11-16",
      "name": "Tesla K80",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "双 GPU 计算卡扩展显存与吞吐，面向机器学习和科学计算。",
      "details": "K80 采用 Kepler 架构。双芯片板卡的显存需按每颗 GPU 分别理解，不能视为一个共享显存池。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-unveils-world-s-fastest-accelerator-for-data-analytics-and-scientific-computing-6622517"
        }
      ],
      "en": {
        "summary": "A dual-GPU accelerator expands memory and throughput for machine learning and scientific computing.",
        "details": "The Kepler-based K80 contains two GPUs. Its board-level memory capacity is split between them, rather than forming one shared memory pool.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "Tesla K80 · 2 GPUs",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "2 × 12 GB GDDR5",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Kepler",
            "chip": false
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-unveils-world-s-fastest-accelerator-for-data-analytics-and-scientific-computing-6622517"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "tesla-p100",
      "date": "2016-04-05",
      "name": "Tesla P100",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "Pascal 架构结合 HBM2 与 NVLink，支持深度学习训练和多 GPU 计算。",
      "details": "P100 将高带宽内存与 GPU 间高速互连纳入数据中心计算平台。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-delivers-massive-performance-leap-for-deep-learning-hpc-applications-with-nvidia-tesla-p100-accelerators"
        }
      ],
      "en": {
        "summary": "Pascal combines HBM2 and NVLink for deep learning and multi-GPU computing.",
        "details": "P100 brings high-bandwidth memory and fast GPU-to-GPU links into the data-center compute platform.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "Tesla P100",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Pascal",
            "chip": false
          },
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "16 GB HBM2",
            "chip": true
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-delivers-massive-performance-leap-for-deep-learning-hpc-applications-with-nvidia-tesla-p100-accelerators"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "google-tpu",
      "date": "2016-05-18",
      "name": "Google TPU",
      "company": "google",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "Google 公开介绍自研张量处理器，为神经网络推理提供专用硬件。",
      "details": "第一代 TPU 已在 Google 内部运行。它以定制计算路径提高机器学习推理效率。",
      "dateNote": "采用 Google 技术公告的 2016-05-18 日期；第一代 TPU 此前已在内部部署。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "Google · TPU 技术公告",
          "titleEn": "Google · TPU announcement",
          "url": "https://cloud.google.com/blog/products/ai-machine-learning/google-supercharges-machine-learning-tasks-with-custom-chip"
        },
        {
          "title": "官方发布资料",
          "url": "https://cloud.google.com/blog/products/gcp/google-supercharges-machine-learning-tasks-with-custom-chip"
        }
      ],
      "en": {
        "summary": "Google describes its custom tensor processor for neural-network inference.",
        "details": "The first TPU was already deployed inside Google, using specialized computation to improve machine-learning inference efficiency.",
        "dateNote": "Uses Google’s May 18, 2016 technical announcement. The first-generation TPU had already been deployed internally."
      }
    },
    {
      "id": "tesla-v100",
      "date": "2017-05-10",
      "name": "Tesla V100",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "Volta 引入 Tensor Core，将矩阵计算加速直接用于深度学习。",
      "details": "V100 面向训练、推理和高性能计算。此节点记录初代 16 GB 型号的公布。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-launches-revolutionary-volta-gpu-platform-fueling-next-era-of-ai-and-high-performance-computing"
        }
      ],
      "en": {
        "summary": "Volta introduces Tensor Cores to accelerate matrix operations for deep learning.",
        "details": "V100 targets training, inference, and HPC. This entry records the original 16 GB configuration.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "Tesla V100",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "16 GB HBM2",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "900 GB/s",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Volta",
            "chip": false
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-launches-revolutionary-volta-gpu-platform-fueling-next-era-of-ai-and-high-performance-computing"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "tpu-v2",
      "date": "2017-05-17",
      "name": "Cloud TPU · v2",
      "company": "google",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第二代 TPU 扩展到训练，并通过 Cloud TPU 向外部开发者提供算力。",
      "details": "Google 公布可互连组成 TPU Pod 的系统，支持 TensorFlow 训练与推理工作负载。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/google-cloud-offer-tpus-machine-learning/"
        }
      ],
      "en": {
        "summary": "Second-generation TPUs add training support and a route to external access through Cloud TPU.",
        "details": "Google announces systems that can be interconnected as TPU Pods for TensorFlow training and inference.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      }
    },
    {
      "id": "tpu-v3",
      "date": "2018-05-08",
      "name": "Google TPU v3",
      "company": "google",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第三代 TPU 扩展训练计算规模，并引入液冷 Pod。",
      "details": "TPU v3 在 Google I/O 公布，后续通过 Cloud TPU 向外部开发者开放。",
      "sources": [
        {
          "url": "https://blog.google/innovation-and-ai/technology/developers-tools/all-io18-announcements/",
          "title": "Google · I/O 2018 发布汇总",
          "titleEn": "Google · I/O 2018 announcements"
        },
        {
          "url": "https://www.macrumors.com/2018/05/08/google-assistant-improvements-google-io/",
          "title": "MacRumors · 发布会当日报道",
          "titleEn": "MacRumors · Same-day event reporting",
          "type": "reporting"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "采用 I/O 首日公布的 2018-05-08 日期，结合 Google 官方回顾和当日现场报道核验。",
      "en": {
        "summary": "Third-generation TPUs expand training scale with liquid-cooled pods.",
        "details": "TPU v3 is announced at Google I/O and later becomes accessible through Cloud TPU.",
        "dateNote": "Uses the I/O opening-day announcement on 2018-05-08, cross-checked against Google’s recap and same-day event reporting."
      }
    },
    {
      "id": "nvidia-t4",
      "date": "2018-09-12",
      "name": "NVIDIA Tesla T4",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "Turing Tensor Core 将低精度计算带入数据中心推理。",
      "details": "T4 面向语音、图像、视频和推荐服务，是从训练 GPU 向专门推理平台扩展的代表产品。",
      "sources": [
        {
          "url": "https://nvidianews.nvidia.com/news/new-nvidia-data-center-inference-platform-to-fuel-next-wave-of-ai-powered-services",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "日期为所列资料中的产品公布日，后续供应安排见详情。",
      "en": {
        "summary": "Turing Tensor Cores bring low-precision compute to data-center inference.",
        "details": "T4 targets speech, image, video, and recommendation services, representing the expansion from training GPUs to dedicated inference platforms.",
        "dateNote": "Dated to the product announcement in the cited source; availability is described separately."
      }
    },
    {
      "id": "ascend-310-910",
      "date": "2018-10-10",
      "name": "昇腾 310 / 910",
      "company": "huawei",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "华为公布昇腾芯片系列与达芬奇架构，覆盖推理和训练场景。",
      "details": "此节点记录 HUAWEI CONNECT 2018 的芯片系列公告，区分面向推理的 310 与面向训练的 910。",
      "dateNote": "记录系列公布，不将当时的 910 供货计划当作已完成的产品交付。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://e.huawei.com/cn/news/ebg/201810101135"
        }
      ],
      "en": {
        "summary": "Huawei announces the Ascend chip family and Da Vinci architecture for inference and training.",
        "details": "This entry records the chip-family announcement at HUAWEI CONNECT 2018, distinguishing inference-oriented 310 from training-oriented 910.",
        "dateNote": "Records the family announcement, without treating the announced 910 delivery plan as completed availability.",
        "name": "Ascend 310 / 910"
      }
    },
    {
      "id": "instinct-mi60",
      "date": "2018-11-06",
      "name": "AMD Radeon Instinct MI60 / MI50",
      "company": "amd",
      "category": "gpu",
      "kind": "announcement",
      "summary": "7 nm Vega 加速器引入 PCIe 4.0，扩展深度学习与高性能计算。",
      "details": "MI60 与 MI50 同日公布，归为一个代际节点；内存容量与供货时间随型号区分。",
      "sources": [
        {
          "url": "https://ir.amd.com/news-events/press-releases/detail/859/amd-unveils-worlds-first-7nm-datacenter-gpus----powering-the-next-era-of-artificial-intelligence-cloud-computing-and-high-performance-computing-hpc",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "日期为所列资料中的产品公布日，后续供应安排见详情。",
      "en": {
        "summary": "7 nm Vega accelerators introduce PCIe 4.0 for deep learning and HPC.",
        "details": "MI60 and MI50 share one generational entry. Memory capacity and availability vary by model.",
        "dateNote": "Dated to the product announcement in the cited source; availability is described separately."
      }
    },
    {
      "id": "habana-gaudi",
      "date": "2019-06-17",
      "name": "Habana Gaudi",
      "company": "intel",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "以太网互连与专用计算架构结合，面向可扩展的神经网络训练。",
      "details": "Gaudi 由当时独立的 Habana Labs 公布，后归入 Intel 产品线。此节点不把计划中的送样视为全面供货。",
      "sources": [
        {
          "url": "https://www.prnewswire.com/news-releases/habana-labs-announces-gaudi-ai-training-processor-300869169.html",
          "title": "Habana Labs · 原始新闻稿",
          "titleEn": "Habana Labs · Original press release"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "日期为所列资料中的产品公布日，后续供应安排见详情。",
      "en": {
        "summary": "An Ethernet-connected architecture targets scalable neural-network training.",
        "details": "Gaudi was announced by the then-independent Habana Labs and later joined Intel’s portfolio. Planned sampling is distinct from broad availability.",
        "dateNote": "Dated to the product announcement in the cited source; availability is described separately."
      }
    },
    {
      "id": "cerebras-wse1",
      "date": "2019-08-19",
      "name": "Cerebras WSE",
      "company": "cerebras",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "首代晶圆级引擎将计算核心、存储和互连放到同一片大型芯片上。",
      "details": "WSE 采用晶圆级设计减少跨芯片通信。18 GB 为分布式片上 SRAM，并非外部显存。",
      "sources": [
        {
          "url": "https://www.cerebras.ai/press-release/cerebras-systems-unveils-the-industrys-first-trillion-transistor-chip",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "日期为所列资料中的产品公布日，后续供应安排见详情。",
      "en": {
        "summary": "The first wafer-scale engine integrates compute, memory, and interconnect on one large chip.",
        "details": "The wafer-scale design reduces off-chip communication. Its 18 GB is distributed on-chip SRAM, not external GPU memory.",
        "dateNote": "Dated to the product announcement in the cited source; availability is described separately."
      },
      "hardware": {
        "variant": "Cerebras WSE · 1 wafer",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "片上 SRAM",
            "labelEn": "On-chip SRAM",
            "value": "18 GB",
            "chip": true
          }
        ],
        "sources": [
          "https://www.cerebras.ai/press-release/cerebras-systems-unveils-the-industrys-first-trillion-transistor-chip"
        ],
        "note": "规格对应所注明的芯片、板卡或系统配置；来源为发布资料或有明确出处的报道。",
        "noteEn": "Specifications apply to the named chip, card, or system configuration and are drawn from the linked announcement or attributed reporting."
      }
    },
    {
      "id": "ascend-910",
      "date": "2019-08-23",
      "name": "昇腾 910",
      "company": "huawei",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "昇腾 910 正式发布，为神经网络训练提供专用处理器。",
      "details": "这一节点记录 2019 年的产品发布，与 2018 年昇腾系列的首次公布分别保留。",
      "sources": [
        {
          "url": "https://spanish.xinhuanet.com/2019-08/23/c_138332419.htm",
          "title": "新华社 · 发布现场报道",
          "titleEn": "Xinhua · Launch reporting",
          "type": "reporting"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "日期依据新华社 2019-08-23 当日报道，报道明确该产品于当天发布。",
      "en": {
        "summary": "Ascend 910 launches as a dedicated processor for neural-network training.",
        "details": "This records the 2019 product launch, separately from the Ascend family announcement in 2018.",
        "dateNote": "Xinhua’s report dated 2019-08-23 explicitly states that the product launched that day.",
        "name": "Ascend 910"
      }
    },
    {
      "id": "aws-inferentia",
      "date": "2019-12-03",
      "name": "AWS Inferentia · Inf1",
      "company": "amazon",
      "category": "accelerator",
      "kind": "availability",
      "summary": "首代 Inferentia 通过 EC2 Inf1 提供机器学习推理服务。",
      "details": "Inf1 实例包含多种芯片数量配置，标志着 AWS 自研推理芯片进入公开云服务。",
      "sources": [
        {
          "url": "https://aws.amazon.com/about-aws/whats-new/2019/12/introducing-amazon-ec2-inf1-instances-high-performance-and-the-lowest-cost-machine-learning-inference-in-the-cloud/",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "日期为 EC2 Inf1 正式可用日，不是 Inferentia 芯片首次公布日。",
      "en": {
        "summary": "First-generation Inferentia becomes available for machine-learning inference through EC2 Inf1.",
        "details": "Inf1 offers configurations with different chip counts, bringing AWS-designed inference silicon to a public cloud service.",
        "dateNote": "Dated to EC2 Inf1 general availability, not the initial Inferentia chip announcement."
      }
    },
    {
      "id": "nvidia-a100",
      "date": "2020-05-14",
      "name": "NVIDIA A100",
      "company": "nvidia",
      "category": "gpu",
      "kind": "availability",
      "summary": "Ampere 将训练与推理统一到同一平台，并引入多实例 GPU。",
      "details": "MIG 可将单颗 A100 划分为独立实例。规格对应首发 40 GB SXM 型号，后续 80 GB 版本另有配置。",
      "dateNote": "日期为该产品或云服务的正式供应公告日。",
      "tags": [
        "GPU"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidias-new-ampere-data-center-gpu-in-full-production"
        }
      ],
      "en": {
        "summary": "Ampere unifies training and inference and introduces Multi-Instance GPU.",
        "details": "MIG partitions one A100 into isolated instances. Specifications describe the original 40 GB SXM configuration, rather than the later 80 GB version.",
        "dateNote": "Dated to the official availability announcement for this product or cloud service."
      },
      "hardware": {
        "variant": "A100 SXM · 40 GB · 1 GPU",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "40 GB HBM2",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "1,555 GB/s",
            "chip": true
          },
          {
            "label": "功耗上限",
            "labelEn": "Max power",
            "value": "400 W",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Ampere",
            "chip": false
          },
          {
            "label": "BF16·稠密",
            "labelEn": "BF16 · Dense",
            "value": "312 TFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "dense",
            "scope": "accelerator",
            "estimate": false
          }
        ],
        "sources": [
          "https://developer.nvidia.com/blog/nvidia-ampere-architecture-in-depth/"
        ],
        "note": "算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "graphcore-gc200",
      "date": "2020-07-15",
      "name": "Graphcore GC200 / IPU-M2000",
      "company": "graphcore",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第二代 IPU 以分布式片上存储与并行执行支持机器学习。",
      "details": "GC200 是计算芯片；IPU-M2000 是集成四颗 GC200 的系统。本节点体现 GPU 之外的专用计算路线。",
      "sources": [
        {
          "url": "https://www.graphcore.ai/posts/introducing-second-generation-ipu-systems-for-ai-at-scale",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "日期为所列资料中的产品公布日，后续供应安排见详情。",
      "en": {
        "summary": "Second-generation IPUs use distributed on-chip memory and parallel execution for machine learning.",
        "details": "GC200 is the processor; IPU-M2000 integrates four GC200 chips. This entry represents a specialized architecture beyond GPUs.",
        "dateNote": "Dated to the product announcement in the cited source; availability is described separately."
      }
    },
    {
      "id": "rtx-3090",
      "date": "2020-09-01",
      "name": "GeForce RTX 3090",
      "company": "nvidia",
      "category": "edge",
      "kind": "announcement",
      "summary": "24 GB 显存与 Ampere Tensor Core 为本地模型实验提供更大空间。",
      "details": "RTX 3090 是消费级显卡节点。发布价格为美国市场起价，不代表后续零售成交价。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "本地与边缘"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-delivers-greatest-ever-generational-leap-in-performance-with-geforce-rtx-30-series-gpus"
        }
      ],
      "en": {
        "summary": "24 GB of memory and Ampere Tensor Cores expand capacity for local model experiments.",
        "details": "RTX 3090 is a consumer GPU entry. The launch price is the US starting price, not a later retail quote.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "GeForce RTX 3090",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "24 GB GDDR6X",
            "chip": true
          },
          {
            "label": "发布起价",
            "labelEn": "Launch price",
            "value": "US$1,499",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Ampere",
            "chip": false
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-delivers-greatest-ever-generational-leap-in-performance-with-geforce-rtx-30-series-gpus"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "apple-m1",
      "date": "2020-11-10",
      "name": "Apple M1",
      "company": "apple",
      "category": "edge",
      "kind": "announcement",
      "summary": "统一内存架构与神经引擎进入 Mac，为本地机器学习提供新的计算平台。",
      "details": "M1 将 CPU、GPU 和 16 核神经引擎整合为 SoC。统一内存由系统组件共享。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "本地与边缘"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/"
        }
      ],
      "en": {
        "summary": "Unified memory and the Neural Engine come to the Mac as a platform for local machine learning.",
        "details": "M1 integrates the CPU, GPU, and a 16-core Neural Engine into one SoC with shared unified memory.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "Apple M1",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "神经引擎",
            "labelEn": "Neural Engine",
            "value": "16 核",
            "chip": true,
            "valueEn": "16 cores"
          }
        ],
        "sources": [
          "https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "instinct-mi100",
      "date": "2020-11-16",
      "name": "AMD Instinct MI100",
      "company": "amd",
      "category": "gpu",
      "kind": "announcement",
      "summary": "首代 CDNA 架构面向计算，结合 ROCm 支持 AI 与高性能计算。",
      "details": "MI100 将计算加速产品与图形产品路线分开，提供 32 GB HBM2 显存。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://ir.amd.com/news-events/press-releases/detail/981/amd-announces-worlds-fastest-hpc-accelerator-for-scientific-research"
        }
      ],
      "en": {
        "summary": "The first CDNA architecture targets compute with ROCm support for AI and HPC.",
        "details": "MI100 establishes a compute-focused architecture distinct from the graphics line, with 32 GB of HBM2.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "AMD Instinct MI100",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "32 GB HBM2",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "CDNA",
            "chip": false
          }
        ],
        "sources": [
          "https://ir.amd.com/news-events/press-releases/detail/981/amd-announces-worlds-fastest-hpc-accelerator-for-scientific-research"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "cerebras-wse2",
      "date": "2021-04-20",
      "name": "Cerebras WSE-2 / CS-2",
      "company": "cerebras",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第二代晶圆级引擎采用 7 nm 工艺，扩展计算阵列与片上存储。",
      "details": "WSE-2 为 CS-2 系统提供计算核心；40 GB 指片上 SRAM。",
      "sources": [
        {
          "url": "https://www.cerebras.ai/press-release/cerebras-systems-smashes-the-2-5-trillion-transistor-mark-with-new-second-generation-wafer-scale-engine",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        },
        {
          "url": "https://www.hpcwire.com/2021/04/20/cerebras-doubles-ai-performance-with-second-gen-7nm-wafer-scale-engine/",
          "title": "HPCwire · 当日发布报道",
          "titleEn": "HPCwire · Same-day launch reporting",
          "type": "reporting"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "采用原始新闻稿分发与同期发布报道一致的 2021-04-20 日期；Cerebras 迁移后的页面页头标为 4 月 12 日。",
      "en": {
        "summary": "The second wafer-scale engine uses a 7 nm process to expand compute and on-chip memory.",
        "details": "WSE-2 powers the CS-2 system; the 40 GB capacity refers to on-chip SRAM.",
        "dateNote": "Uses 2021-04-20, matching the original press-release distribution and contemporary launch reporting; the migrated Cerebras page header instead shows April 12."
      },
      "hardware": {
        "variant": "Cerebras WSE-2 · 1 wafer",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "片上 SRAM",
            "labelEn": "On-chip SRAM",
            "value": "40 GB",
            "chip": true
          }
        ],
        "sources": [
          "https://www.cerebras.ai/press-release/cerebras-systems-smashes-the-2-5-trillion-transistor-mark-with-new-second-generation-wafer-scale-engine"
        ],
        "note": "规格对应所注明的芯片、板卡或系统配置；来源为发布资料或有明确出处的报道。",
        "noteEn": "Specifications apply to the named chip, card, or system configuration and are drawn from the linked announcement or attributed reporting."
      }
    },
    {
      "id": "tpu-v4",
      "date": "2021-05-18",
      "name": "Google TPU v4",
      "company": "google",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第四代 TPU 以更大规模的 Pod 支持模型训练。",
      "details": "Google I/O 公布 TPU v4；此处记录硬件代际公布，不是 Cloud TPU v4 后续全面开放的日期。",
      "sources": [
        {
          "url": "https://blog.google/intl/es-419/noticias-de-la-empresa/de-google/google-io-2021-ayudar-en-los-momentos/",
          "title": "Google · I/O 2021 主题演讲",
          "titleEn": "Google · I/O 2021 keynote"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "日期为所列资料中的产品公布日，后续供应安排见详情。",
      "en": {
        "summary": "Fourth-generation TPUs expand pod-scale model training.",
        "details": "Google announces TPU v4 at I/O. This dates the hardware generation rather than later general availability of Cloud TPU v4.",
        "dateNote": "Dated to the product announcement in the cited source; availability is described separately."
      }
    },
    {
      "id": "instinct-mi250x",
      "date": "2021-11-08",
      "name": "AMD Instinct MI250X",
      "company": "amd",
      "category": "gpu",
      "kind": "announcement",
      "summary": "CDNA 2 采用多芯片设计，扩展训练和科学计算的内存容量。",
      "details": "MI250X 的 128 GB HBM2e 属于完整加速器模块；软件中的设备划分需结合其双计算芯片结构理解。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://ir.amd.com/news-events/press-releases/detail/1031/amd-unveils-workload-tailored-innovations-and-products-at-the-accelerated-data-center-premiere"
        }
      ],
      "en": {
        "summary": "CDNA 2 uses a multi-die design to expand memory capacity for training and scientific computing.",
        "details": "The 128 GB HBM2e capacity belongs to the complete accelerator module; software device partitioning reflects its two compute dies.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "AMD Instinct MI250X",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "128 GB HBM2e",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "CDNA 2",
            "chip": false
          }
        ],
        "sources": [
          "https://ir.amd.com/news-events/press-releases/detail/1031/amd-unveils-workload-tailored-innovations-and-products-at-the-accelerated-data-center-premiere"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "graphcore-bow",
      "date": "2022-03-03",
      "name": "Graphcore Bow IPU / Bow-2000",
      "company": "graphcore",
      "category": "accelerator",
      "kind": "availability",
      "summary": "通过三维晶圆键合改善供电，延续 IPU 的分布式计算与片上存储架构。",
      "details": "Bow 将计算晶圆与供电晶圆键合，并非堆叠两颗计算芯片。Bow-2000 系统集成四颗 Bow IPU；下列规格对应单颗 IPU。Argonne 的 ALCF AI Testbed 实际部署了 Bow Pod64，公开培训覆盖图神经网络和大模型运行。",
      "dateNote": "采用产品发布公告的 2022-03-03；官方当日表示 Bow Pod 系统已开始供货。Argonne 的使用记录属于后续应用，不改变发布日期。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "Graphcore · 产品发布",
          "titleEn": "Graphcore · Product announcement",
          "url": "https://www.graphcore.ai/posts/the-wow-factor-graphcore-systems-get-huge-power-and-efficiency-boost"
        },
        {
          "title": "Argonne · Bow Pod64 实际使用",
          "titleEn": "Argonne · Bow Pod64 in use",
          "url": "https://www.alcf.anl.gov/graphcore-ai-workshop-2023"
        }
      ],
      "en": {
        "summary": "A wafer-on-wafer power-delivery design advances Graphcore’s distributed IPU architecture.",
        "details": "Bow bonds a compute wafer to a power-delivery wafer, rather than stacking two compute processors. Bow-2000 combines four Bow IPUs; the specifications below apply to one IPU. Argonne’s ALCF AI Testbed deployed Bow Pod64 and offered hands-on training for graph neural networks and language models.",
        "dateNote": "Uses the March 3, 2022 launch announcement, which states that Bow Pod systems were already shipping. Later Argonne adoption does not change the release date."
      },
      "hardware": {
        "variant": "Bow IPU · 1 processor",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "片上存储",
            "labelEn": "On-chip memory",
            "value": "900 MB",
            "chip": true
          },
          {
            "label": "FP16.16",
            "labelEn": "FP16.16",
            "value": "350 TFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "FP16.16",
            "sparsity": "not-stated",
            "scope": "chip",
            "estimate": false
          }
        ],
        "sources": [
          "https://www.graphcore.ai/posts/the-wow-factor-graphcore-systems-get-huge-power-and-efficiency-boost",
          "https://docs.graphcore.ai/projects/graphcore-glossary/en/latest/#bow-ipu"
        ],
        "note": "规格为单颗 Bow IPU 的片上存储及 FP16.16 理论峰值；不与四芯片 Bow-2000 或 64 芯片 Bow Pod64 的聚合数值混用。来源未给出稀疏倍数，不据此换算其他精度或实际模型吞吐。",
        "noteEn": "Memory and FP16.16 theoretical peak apply to one Bow IPU, not the four-chip Bow-2000 or 64-chip Bow Pod64. No sparsity multiplier is assumed, and the figure is not converted into other precisions or measured model throughput."
      }
    },
    {
      "id": "nvidia-h100",
      "date": "2022-03-22",
      "name": "NVIDIA H100",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "Hopper 引入 Transformer Engine 与 FP8，加速大模型训练和推理。",
      "details": "H100 的 SXM 与 PCIe 型号规格不同。此处保留发布时披露的 SXM 配置。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-announces-hopper-architecture-the-next-generation-of-accelerated-computing"
        }
      ],
      "en": {
        "summary": "Hopper introduces the Transformer Engine and FP8 for large-model training and inference.",
        "details": "H100 SXM and PCIe variants have different specifications. This record retains the SXM figures disclosed at announcement.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "H100 SXM · 1 GPU · 2022 preliminary",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "80 GB HBM3",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "3 TB/s",
            "chip": true
          },
          {
            "label": "功耗上限",
            "labelEn": "Max power",
            "value": "700 W",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Hopper",
            "chip": false
          },
          {
            "label": "BF16·稠密",
            "labelEn": "BF16 · Dense",
            "value": "1,000 TFLOPS（预估）",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "dense",
            "scope": "accelerator",
            "estimate": true,
            "valueEn": "1,000 TFLOPS (preliminary)"
          }
        ],
        "sources": [
          "https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/"
        ],
        "note": "保留 2022 年发布时的预先规格：BF16 稠密 1,000 TFLOPS、带宽 3 TB/s；不与后续量产修订或 PCIe 型号混用。 算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "Retains the 2022 preliminary specifications: 1,000 dense BF16 TFLOPS and 3 TB/s memory bandwidth, separate from later shipping revisions and PCIe models. Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "intel-gaudi2",
      "date": "2022-05-10",
      "name": "Intel Habana Gaudi 2",
      "company": "intel",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "Gaudi 第二代转向 7 nm 工艺，继续采用以太网扩展训练系统。",
      "details": "Intel Vision 2022 公布 Gaudi 2，承接首代 Gaudi 与后续 Gaudi 3 的主要代际变化。",
      "sources": [
        {
          "url": "https://download.intel.com/newsroom/2022/corporate/vision/Habana-Gaudi2-Launch-Fact-Sheet.pdf",
          "title": "Intel · 发布说明",
          "titleEn": "Intel · Launch fact sheet"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "日期为所列资料中的产品公布日，后续供应安排见详情。",
      "en": {
        "summary": "The second Gaudi generation moves to 7 nm while retaining Ethernet-based training scale-out.",
        "details": "Gaudi 2 is introduced at Intel Vision 2022, bridging the first Gaudi generation and Gaudi 3.",
        "dateNote": "Dated to the product announcement in the cited source; availability is described separately."
      }
    },
    {
      "id": "rtx-4090",
      "date": "2022-09-20",
      "name": "GeForce RTX 4090",
      "company": "nvidia",
      "category": "edge",
      "kind": "announcement",
      "summary": "Ada 架构与 24 GB 显存支持本地推理、生成式图像和模型开发。",
      "details": "此节点记录显卡公布，官方公告给出的发售日为 2022-10-12。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "本地与边缘"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-delivers-quantum-leap-in-performance-introduces-new-era-of-neural-rendering-with-geforce-rtx-40-series"
        }
      ],
      "en": {
        "summary": "Ada and 24 GB of memory support local inference, image generation, and model development.",
        "details": "This entry records the announcement; the stated retail availability date was 2022-10-12.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "GeForce RTX 4090",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "24 GB GDDR6X",
            "chip": true
          },
          {
            "label": "发布起价",
            "labelEn": "Launch price",
            "value": "US$1,599",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Ada Lovelace",
            "chip": false
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-delivers-quantum-leap-in-performance-introduces-new-era-of-neural-rendering-with-geforce-rtx-40-series"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "aws-trainium",
      "date": "2022-10-10",
      "name": "AWS Trainium · Trn1",
      "company": "amazon",
      "category": "accelerator",
      "kind": "availability",
      "summary": "首代 Trainium 通过 EC2 Trn1 正式提供训练算力。",
      "details": "记录 Trn1 云实例正式上线，模型通过 AWS Neuron 软件栈编译和运行。",
      "dateNote": "日期为该产品或云服务的正式供应公告日。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://aws.amazon.com/blogs/aws/amazon-ec2-trn1-instances-for-high-performance-model-training-are-now-available/"
        }
      ],
      "en": {
        "summary": "First-generation Trainium becomes generally available through EC2 Trn1 for model training.",
        "details": "Records general availability of Trn1 cloud instances, with models compiled and run through the AWS Neuron stack.",
        "dateNote": "Dated to the official availability announcement for this product or cloud service."
      },
      "hardware": {
        "variant": "Trainium · 1 chip",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "BF16·稠密",
            "labelEn": "BF16 · Dense",
            "value": "191 TFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "dense",
            "scope": "chip",
            "estimate": false
          },
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "32 GiB HBM",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "0.8 TB/s",
            "chip": true
          }
        ],
        "sources": [
          "https://awsdocs-neuron.readthedocs-hosted.com/en/v2.25.0/general/arch/neuron-hardware/trainium2.html"
        ],
        "note": "采用 Neuron 架构文档中 Trainium 一代的对照规格，非 Trn1 实例总量。 算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "Uses the first-generation Trainium column in Neuron documentation, not a complete Trn1 instance. Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "nvidia-l4",
      "date": "2023-03-21",
      "name": "NVIDIA L4",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "低功耗 Ada GPU 承接 T4，支持生成式 AI 与视频推理。",
      "details": "L4 采用单槽 PCIe 形态，24 GB 显存与 72 W 功耗对应单卡配置。",
      "sources": [
        {
          "url": "https://developer.nvidia.com/blog/supercharging-ai-video-and-ai-inference-performance-with-nvidia-l4-gpus/",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "日期为所列资料中的产品公布日，后续供应安排见详情。",
      "en": {
        "summary": "A low-power Ada GPU succeeds T4 for generative AI and video inference.",
        "details": "L4 uses a single-slot PCIe form factor; 24 GB of memory and 72 W apply to one card.",
        "dateNote": "Dated to the product announcement in the cited source; availability is described separately."
      },
      "hardware": {
        "variant": "NVIDIA L4 · 1 PCIe GPU",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "24 GB GDDR6",
            "chip": true
          },
          {
            "label": "功耗",
            "labelEn": "Power",
            "value": "72 W",
            "chip": true
          },
          {
            "label": "BF16·稀疏",
            "labelEn": "BF16 · Sparse",
            "value": "242 TFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "sparse",
            "scope": "accelerator",
            "estimate": false
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "300 GB/s",
            "chip": true
          }
        ],
        "sources": [
          "https://developer.nvidia.com/blog/supercharging-ai-video-and-ai-inference-performance-with-nvidia-l4-gpus/",
          "https://www.nvidia.com/en-us/data-center/l4/"
        ],
        "note": "算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "aws-inferentia2",
      "date": "2023-04-13",
      "name": "AWS Inferentia2 · Inf2",
      "company": "amazon",
      "category": "accelerator",
      "kind": "availability",
      "summary": "第二代推理芯片通过 EC2 Inf2 支持生成式 AI 部署。",
      "details": "Inf2 的正式供应扩展了 AWS 专用推理硬件，面向语言模型等深度学习任务。",
      "dateNote": "日期为该产品或云服务的正式供应公告日。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://aws.amazon.com/blogs/aws/amazon-ec2-inf2-instances-for-low-cost-high-performance-generative-ai-inference-are-now-generally-available/"
        }
      ],
      "en": {
        "summary": "Second-generation inference chips power EC2 Inf2 for generative-AI deployment.",
        "details": "General availability of Inf2 expands AWS custom inference hardware for language models and other deep-learning workloads.",
        "dateNote": "Dated to the official availability announcement for this product or cloud service."
      }
    },
    {
      "id": "ascend-910b",
      "date": "2023-08-15",
      "name": "昇腾 910B",
      "company": "huawei",
      "category": "accelerator",
      "kind": "deployment",
      "summary": "用于讯飞与华为联合推出的星火一体机，支持企业部署专属大模型。",
      "details": "2023 年 8 月 15 日，科大讯飞与华为公开推出星火一体机。路透社随后确认该硬件采用昇腾 910B，并记录了同年 8 月的技术文档与客户采购；截至其 11 月报道时，华为尚未正式宣布这款芯片。",
      "sources": [
        {
          "url": "https://www.nbd.com.cn/articles/2023-08-15/2961074.html",
          "title": "每日经济新闻 · 星火一体机发布",
          "titleEn": "National Business Daily · Spark all-in-one launch",
          "type": "reporting"
        },
        {
          "url": "https://theprint.in/tech/factbox-how-huawei-plans-to-rival-nvidia-in-the-ai-chip-business/1835738/",
          "title": "路透社 · ThePrint 授权转载",
          "titleEn": "Reuters · Syndicated by ThePrint",
          "type": "reporting"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "日期对应搭载 910B 的星火一体机公开发布，记录客户商用产品节点；不代表芯片首次公布或首次出货。",
      "en": {
        "summary": "Powers the Spark all-in-one system introduced by iFLYTEK and Huawei for enterprise LLM deployment.",
        "details": "iFLYTEK and Huawei introduced the Spark all-in-one system on August 15, 2023. Reuters subsequently identified Ascend 910B as its processor and documented technical guides and customer orders from that August. Huawei had not formally announced the chip by the time of the November report.",
        "dateNote": "Dates the public introduction of the 910B-powered Spark all-in-one system as a customer product event, rather than the chip’s first announcement or shipment.",
        "name": "Ascend 910B"
      }
    },
    {
      "id": "tpu-v5e",
      "date": "2023-08-29",
      "name": "Google TPU v5e",
      "company": "google",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第五代 TPU 的经济型路线同时支持训练和推理。",
      "details": "v5e 与侧重高性能训练的 v5p 分别记录。首发为预览阶段，正式可用在 2023 年 11 月。",
      "sources": [
        {
          "url": "https://cloud.google.com/blog/products/compute/announcing-cloud-tpu-v5e-and-a3-gpus-in-ga",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        },
        {
          "url": "https://cloud.google.com/blog/products/compute/announcing-cloud-tpu-v5e-in-ga",
          "title": "Google Cloud · 正式可用公告",
          "titleEn": "Google Cloud · General availability"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "日期为所列资料中的产品公布日，后续供应安排见详情。",
      "en": {
        "summary": "The cost-focused fifth-generation TPU supports both training and inference.",
        "details": "v5e is distinct from the training-focused v5p. It debuts in preview, with general availability following in November 2023.",
        "dateNote": "Dated to the product announcement in the cited source; availability is described separately."
      }
    },
    {
      "id": "nvidia-h200",
      "date": "2023-11-13",
      "name": "NVIDIA H200",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "Hopper 平台升级到 HBM3e，增加大模型推理所需的显存与带宽。",
      "details": "H200 提供 141 GB 显存。原公告将系统供货安排在 2024 年第二季度。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-supercharges-hopper-the-worlds-leading-ai-computing-platform"
        }
      ],
      "en": {
        "summary": "Hopper gains HBM3e to increase memory capacity and bandwidth for large-model inference.",
        "details": "H200 provides 141 GB of memory. The original announcement schedules system availability for the second quarter of 2024.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "H200 SXM · 1 GPU · 初步规格",
        "variantEn": "H200 SXM · 1 GPU · Preliminary",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "141 GB HBM3e",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "4.8 TB/s",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Hopper",
            "chip": false
          },
          {
            "label": "BF16·稀疏",
            "labelEn": "BF16 · Sparse",
            "value": "1,979 TFLOPS（预估）",
            "valueEn": "1,979 TFLOPS (preliminary)",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "sparse",
            "scope": "accelerator",
            "estimate": true
          },
          {
            "label": "功耗上限",
            "labelEn": "Max power",
            "value": "700 W",
            "chip": true
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-supercharges-hopper-the-worlds-leading-ai-computing-platform",
          "https://www.nvidia.com/en-us/data-center/h200/"
        ],
        "note": "NVIDIA 当前页面仍将 H200 SXM 标注为预先规格，可能调整。BF16 采用稀疏 Tensor Core 理论峰值，非稠密算力或模型实测吞吐。显存带宽不等同于芯片互联带宽；功耗为规格上限。",
        "noteEn": "NVIDIA’s current page still labels H200 SXM specifications as preliminary and subject to change. BF16 is the sparse Tensor Core theoretical peak, not dense compute or measured model throughput. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum."
      }
    },
    {
      "id": "instinct-mi300x",
      "date": "2023-12-06",
      "name": "AMD Instinct MI300X",
      "company": "amd",
      "category": "gpu",
      "kind": "availability",
      "summary": "CDNA 3 与 192 GB HBM3 扩展单加速器的大模型容量。",
      "details": "此节点记录 MI300X 正式供应。单个 OAM 模块的规格与八卡平台的聚合容量分开记录。",
      "dateNote": "日期为该产品或云服务的正式供应公告日。",
      "tags": [
        "GPU"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://www.amd.com/en/newsroom/press-releases/2023-12-6-amd-delivers-leadership-portfolio-of-data-center-a.html"
        }
      ],
      "en": {
        "summary": "CDNA 3 and 192 GB of HBM3 expand large-model capacity per accelerator.",
        "details": "This entry records MI300X availability. Per-OAM specifications are distinct from the aggregate capacity of an eight-accelerator platform.",
        "dateNote": "Dated to the official availability announcement for this product or cloud service."
      },
      "hardware": {
        "variant": "MI300X OAM · 1 accelerator",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "192 GB HBM3",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "5.3 TB/s",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "CDNA 3",
            "chip": false
          },
          {
            "label": "BF16·稠密",
            "labelEn": "BF16 · Dense",
            "value": "1,307.4 TFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "dense",
            "scope": "accelerator",
            "estimate": false
          },
          {
            "label": "功耗上限",
            "labelEn": "Max board power",
            "value": "750 W",
            "chip": true
          }
        ],
        "sources": [
          "https://www.amd.com/en/newsroom/press-releases/2023-12-6-amd-delivers-leadership-portfolio-of-data-center-a.html",
          "https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/data-sheets/amd-instinct-mi300x-data-sheet.pdf"
        ],
        "note": "算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "tpu-v5p",
      "date": "2023-12-06",
      "name": "Google TPU v5p",
      "company": "google",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "侧重大规模模型训练的第五代 TPU，与 AI Hypercomputer 同时公布。",
      "details": "v5p 面向训练吞吐与规模扩展，和 v5e 的成本侧重形成不同产品定位。",
      "sources": [
        {
          "title": "Google · Gemini 与 TPU v5p 公告",
          "titleEn": "Google · Gemini and TPU v5p announcement",
          "url": "https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/"
        },
        {
          "url": "https://cloud.google.com/blog/products/ai-machine-learning/introducing-cloud-tpu-v5p-and-ai-hypercomputer",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "采用 Google 在 2023-12-06 的 Gemini 公告中公布 TPU v5p 的日期；Cloud 技术介绍页现标注 12 月 7 日。",
      "en": {
        "summary": "A fifth-generation TPU focused on large-model training is announced with AI Hypercomputer.",
        "details": "v5p emphasizes training throughput and scale, complementing the cost focus of v5e.",
        "dateNote": "Uses the TPU v5p announcement in Google’s December 6, 2023 Gemini article. The Cloud technical article is currently dated December 7."
      },
      "hardware": {
        "variant": "TPU v5p · 1 chip",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "BF16 峰值",
            "labelEn": "BF16 peak",
            "value": "459 TFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "not-stated",
            "scope": "chip",
            "estimate": false
          },
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "95 GiB HBM",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "2,765 GB/s",
            "chip": true
          }
        ],
        "sources": [
          "https://docs.cloud.google.com/tpu/docs/v5p"
        ],
        "note": "采用官方每芯片 BF16 峰值，未增加稀疏计算倍数；与 Pod 总量分开。 算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "Uses the official BF16 peak per chip without adding a sparsity multiplier; separate from Pod totals. Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "cerebras-wse3",
      "date": "2024-03-13",
      "name": "Cerebras WSE-3 / CS-3",
      "company": "cerebras",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第三代晶圆级引擎将大量计算核心与片上存储整合到单片晶圆。",
      "details": "WSE-3 为 CS-3 系统提供计算核心。44 GB 片上 SRAM 与 GPU 的外部 HBM 属于不同存储层级。 2024 年 8 月上线的 Cerebras Inference API 明确使用 CS-3 与 WSE-3，为公开推理服务提供实际应用依据。",
      "dateNote": "采用新闻正文明确标注的 2024-03-13 发布日期；页面顶部元数据存在不同日期。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine"
        },
        {
          "title": "Cerebras · 推理 API 应用",
          "titleEn": "Cerebras · Inference API deployment",
          "url": "https://www.cerebras.ai/press-release/cerebras-launches-the-worlds-fastest-ai-inference"
        }
      ],
      "en": {
        "summary": "The third wafer-scale engine integrates a large compute array and on-chip memory on one wafer.",
        "details": "WSE-3 powers the CS-3 system. Its 44 GB of on-chip SRAM is a different memory tier from external GPU HBM. Cerebras Inference, opened to developers in August 2024, explicitly uses CS-3 and WSE-3, providing a documented inference-service use case.",
        "dateNote": "Uses the explicit 2024-03-13 release dateline in the announcement body; the page header carries a different date."
      },
      "hardware": {
        "variant": "Cerebras WSE-3",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "片上 SRAM",
            "labelEn": "On-chip SRAM",
            "value": "44 GB",
            "chip": true
          }
        ],
        "sources": [
          "https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "nvidia-blackwell",
      "date": "2024-03-18",
      "name": "NVIDIA Blackwell · B200 / GB200",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "Blackwell 将新一代 GPU、Grace CPU 与 NVLink 系统结合，扩展模型训练与推理规模。",
      "details": "B200 是 GPU；GB200 将两颗 Blackwell GPU 与 Grace CPU 组合。GB200 NVL72 是机架系统，不能与单卡规格直接混用。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing"
        }
      ],
      "en": {
        "summary": "Blackwell combines a new GPU generation with Grace CPUs and NVLink systems for model training and inference.",
        "details": "B200 is a GPU. GB200 combines two Blackwell GPUs with a Grace CPU, while GB200 NVL72 is a rack-scale system.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "NVIDIA Blackwell · B200 / GB200",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Blackwell",
            "chip": false
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "intel-gaudi3",
      "date": "2024-04-09",
      "name": "Intel Gaudi 3",
      "company": "intel",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "Gaudi 3 结合矩阵计算、HBM 与以太网互连，面向大模型训练和推理。",
      "details": "Intel 在 Vision 2024 公布加速器。内存容量与带宽对应单个加速器，而非多卡服务器。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "Intel · Gaudi 3 发布归档",
          "titleEn": "Intel · Gaudi 3 announcement archive",
          "url": "https://www.intel.com/content/www/us/en/newsroom/news/vision-2024-gaudi-3-ai-accelerator.html"
        }
      ],
      "en": {
        "summary": "Gaudi 3 combines matrix compute, HBM, and Ethernet links for large-model training and inference.",
        "details": "Intel announces the accelerator at Vision 2024. Memory figures refer to one accelerator rather than a multi-device server.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "Intel Gaudi 3",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "128 GB HBM2e",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "3.7 TB/s",
            "chip": true
          }
        ],
        "sources": [
          "https://www.intel.com/content/www/us/en/newsroom/news/vision-2024-gaudi-3-ai-accelerator.html"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "meta-mtia-v2",
      "date": "2024-04-10",
      "name": "Meta MTIA · 第二代",
      "company": "meta",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "面向推荐与排序推理的自研加速器，在 Meta 数据中心运行生产模型。",
      "details": "第二代 MTIA 结合专用计算、片上 SRAM 和 PyTorch 软件栈，服务 Facebook 与 Instagram 的推荐和广告模型。此时的应用重点是推荐推理。",
      "dateNote": "采用 Meta 的第二代产品技术公告日；公告确认芯片已部署，不作为最早内部上线日。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "Meta · 第二代 MTIA 技术公告",
          "titleEn": "Meta · Next-generation MTIA",
          "url": "https://ai.meta.com/blog/next-generation-meta-training-inference-accelerator-AI-MTIA/"
        },
        {
          "title": "Meta · 生产部署说明",
          "titleEn": "Meta · Production deployment",
          "url": "https://about.fb.com/news/2024/04/introducing-our-next-generation-infrastructure-for-ai/"
        }
      ],
      "en": {
        "summary": "Meta’s custom accelerator serves production ranking and recommendation models in its data centers.",
        "details": "The second generation combines specialized compute, on-chip SRAM and a PyTorch software stack for Facebook and Instagram recommendation and advertising models. Its deployed focus is recommendation inference.",
        "dateNote": "Uses Meta’s second-generation technical announcement. Deployment was already underway; this is not the first internal deployment date.",
        "name": "Meta MTIA · Second generation"
      },
      "hardware": {
        "variant": "MTIA · 2nd generation · 1 accelerator",
        "checkedAt": "2026-10-03",
        "facts": [
          {
            "label": "BF16·稠密",
            "labelEn": "BF16 · Dense",
            "value": "177 TFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "dense",
            "scope": "accelerator",
            "estimate": false
          },
          {
            "label": "内存",
            "labelEn": "Memory",
            "value": "128 GB LPDDR5",
            "chip": true
          },
          {
            "label": "内存带宽",
            "labelEn": "Memory bandwidth",
            "value": "204.8 GB/s",
            "chip": true
          },
          {
            "label": "片上 SRAM",
            "labelEn": "On-chip SRAM",
            "value": "256 MB",
            "chip": false
          },
          {
            "label": "TDP",
            "labelEn": "TDP",
            "value": "90 W",
            "chip": true
          }
        ],
        "sources": [
          "https://ai.meta.com/blog/next-generation-meta-training-inference-accelerator-AI-MTIA/"
        ],
        "note": "规格对应第二代单个加速器。BF16 为官方 GEMM 稠密理论峰值；128 GB 与 204.8 GB/s 对应片外 LPDDR5，不是片上 SRAM 或互连带宽。TDP 不等于整机功耗。",
        "noteEn": "Specifications refer to one second-generation accelerator. BF16 is the stated dense GEMM theoretical peak. Capacity and bandwidth refer to off-chip LPDDR5, not SRAM or interconnect bandwidth. TDP is not complete-system power."
      }
    },
    {
      "id": "tpu-trillium",
      "date": "2024-05-14",
      "name": "Google TPU · Trillium",
      "company": "google",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第六代 TPU 增加计算、HBM 和互连能力，面向生成式模型。",
      "details": "Trillium 在 Google I/O 公布，支持训练与推理；公布时间与后续 Cloud TPU 服务供应时间分开。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://cloud.google.com/blog/products/compute/introducing-trillium-6th-gen-tpus"
        }
      ],
      "en": {
        "summary": "Sixth-generation TPUs expand compute, HBM, and interconnect capacity for generative models.",
        "details": "Trillium is announced at Google I/O for training and inference. The announcement is distinct from later Cloud TPU availability.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "TPU v6e / Trillium · 1 chip",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "BF16 峰值",
            "labelEn": "BF16 peak",
            "value": "918 TFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "not-stated",
            "scope": "chip",
            "estimate": false
          },
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "32 GB HBM",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "1,638 GB/s",
            "chip": true
          }
        ],
        "sources": [
          "https://docs.cloud.google.com/tpu/docs/v6e"
        ],
        "note": "采用部署文档中的 v6e 每芯片规格，不能视为首次公告已披露的全部参数。 算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "Uses deployed v6e per-chip specifications from the technical documentation, not a claim that every figure was disclosed at the first announcement. Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "instinct-mi325x",
      "date": "2024-10-10",
      "name": "AMD Instinct MI325X",
      "company": "amd",
      "category": "gpu",
      "kind": "announcement",
      "summary": "MI300 系列扩展到 HBM3e，提高生成式 AI 的内存容量与带宽。",
      "details": "MI325X 延续 CDNA 3 计算架构，并扩展单模块的存储配置。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://ir.amd.com/news-events/press-releases/detail/1218/amd-unveils-leadership-ai-solutions-at-advancing-ai-2024"
        }
      ],
      "en": {
        "summary": "The MI300 line gains HBM3e for greater generative-AI memory capacity and bandwidth.",
        "details": "MI325X retains the CDNA 3 compute architecture while expanding per-module memory.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "MI325X OAM · 1 accelerator",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "256 GB HBM3e",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "6 TB/s",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "CDNA 3",
            "chip": false
          },
          {
            "label": "BF16·稠密",
            "labelEn": "BF16 · Dense",
            "value": "1.3 PFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "dense",
            "scope": "accelerator",
            "estimate": false
          },
          {
            "label": "功耗上限",
            "labelEn": "Max board power",
            "value": "1,000 W",
            "chip": true
          }
        ],
        "sources": [
          "https://ir.amd.com/news-events/press-releases/detail/1218/amd-unveils-leadership-ai-solutions-at-advancing-ai-2024",
          "https://www.amd.com/en/products/accelerators/instinct/mi300/mi325x.html"
        ],
        "note": "算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "aws-trainium2",
      "date": "2024-12-03",
      "name": "AWS Trainium2 · Trn2",
      "company": "amazon",
      "category": "accelerator",
      "kind": "availability",
      "summary": "Trainium2 通过 Trn2 正式供应，扩展训练与推理的专用算力。",
      "details": "96 GiB 内存为单芯片规格。Trn2 实例包含 16 颗芯片；同日介绍的 UltraServer 当时仍处于预览。",
      "dateNote": "日期为该产品或云服务的正式供应公告日。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://aws.amazon.com/blogs/aws/amazon-ec2-trn2-instances-and-trn2-ultraservers-for-aiml-training-and-inference-is-now-available/"
        }
      ],
      "en": {
        "summary": "Trainium2 becomes available through Trn2, expanding custom compute for training and inference.",
        "details": "The 96 GiB figure is per chip. A Trn2 instance contains 16 chips; UltraServers introduced in the same article were still in preview.",
        "dateNote": "Dated to the official availability announcement for this product or cloud service."
      },
      "hardware": {
        "variant": "Trainium2 · 1 chip",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "96 GiB HBM",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "2.9 TB/s",
            "chip": true
          },
          {
            "label": "BF16·稠密",
            "labelEn": "BF16 · Dense",
            "value": "667 TFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "dense",
            "scope": "chip",
            "estimate": false
          }
        ],
        "sources": [
          "https://aws.amazon.com/blogs/aws/amazon-ec2-trn2-instances-and-trn2-ultraservers-for-aiml-training-and-inference-is-now-available/",
          "https://awsdocs-neuron.readthedocs-hosted.com/en/v2.25.0/general/arch/neuron-hardware/trainium2.html"
        ],
        "note": "按单芯片记录，非 Trn2 实例或 UltraServer 的总算力。 算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "Per chip, not the total of a Trn2 instance or UltraServer. Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "jetson-orin-nano-super",
      "date": "2024-12-17",
      "name": "Jetson Orin Nano Super",
      "company": "nvidia",
      "category": "edge",
      "kind": "availability",
      "summary": "开发套件通过软件升级与价格调整，扩展边缘端生成式 AI 的使用范围。",
      "details": "Super 是开发套件与性能模式更新，已有 Orin Nano 开发套件也可通过 JetPack 升级获得性能提升。",
      "dateNote": "日期为该产品或云服务的正式供应公告日。",
      "tags": [
        "本地与边缘"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://blogs.nvidia.com/blog/jetson-generative-ai-supercomputer/"
        }
      ],
      "en": {
        "summary": "A developer kit combines a software upgrade and lower pricing for edge generative AI.",
        "details": "Super updates the developer-kit offering and performance mode. Existing Orin Nano kit owners can also gain performance through a JetPack update.",
        "dateNote": "Dated to the official availability announcement for this product or cloud service."
      },
      "hardware": {
        "variant": "Jetson Orin Nano Super Developer Kit",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "102 GB/s",
            "chip": true
          },
          {
            "label": "发布起价",
            "labelEn": "Launch price",
            "value": "US$249",
            "chip": true
          }
        ],
        "sources": [
          "https://blogs.nvidia.com/blog/jetson-generative-ai-supercomputer/"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "rtx-5090",
      "date": "2025-01-06",
      "name": "GeForce RTX 5090",
      "company": "nvidia",
      "category": "edge",
      "kind": "announcement",
      "summary": "Blackwell 消费级旗舰扩展到 32 GB GDDR7，面向本地 AI 与图形工作负载。",
      "details": "记录 CES 公布，官方发售安排为 2025-01-30。价格为美国市场发布起价。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "本地与边缘"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-blackwell-geforce-rtx-50-series-opens-new-world-of-ai-computer-graphics"
        }
      ],
      "en": {
        "summary": "The Blackwell consumer flagship expands to 32 GB of GDDR7 for local AI and graphics workloads.",
        "details": "Records the CES announcement, with stated retail availability on 2025-01-30. Pricing is the US launch starting price.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "GeForce RTX 5090",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "32 GB GDDR7",
            "chip": true
          },
          {
            "label": "发布起价",
            "labelEn": "Launch price",
            "value": "US$1,999",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Blackwell",
            "chip": false
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-blackwell-geforce-rtx-50-series-opens-new-world-of-ai-computer-graphics"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "apple-m3-ultra",
      "date": "2025-03-05",
      "name": "Apple M3 Ultra",
      "company": "apple",
      "category": "edge",
      "kind": "announcement",
      "summary": "更大的统一内存配置为本地运行大型模型提供容量空间。",
      "details": "M3 Ultra 使用 UltraFusion 连接两颗 M3 Max。512 GB 是最高内存配置，CPU、GPU 与其他系统组件共享内存。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "本地与边缘"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://www.apple.com/newsroom/2025/03/apple-reveals-m3-ultra-taking-apple-silicon-to-a-new-extreme/"
        }
      ],
      "en": {
        "summary": "Larger unified-memory configurations increase capacity for running large models locally.",
        "details": "M3 Ultra links two M3 Max dies with UltraFusion. 512 GB is the maximum memory configuration, shared by the CPU, GPU, and other system components.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "Apple M3 Ultra",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "统一内存上限",
            "labelEn": "Max unified memory",
            "value": "512 GB",
            "chip": true
          }
        ],
        "sources": [
          "https://www.apple.com/newsroom/2025/03/apple-reveals-m3-ultra-taking-apple-silicon-to-a-new-extreme/"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "blackwell-ultra",
      "date": "2025-03-18",
      "name": "NVIDIA Blackwell Ultra",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "B300 与 GB300 平台扩展显存和推理计算，面向更长推理任务。",
      "details": "Blackwell Ultra 包含 GPU 与机架级配置。产品公布与后续合作伙伴供货分别记录。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-blackwell-ultra-ai-factory-platform-paves-way-for-age-of-ai-reasoning"
        }
      ],
      "en": {
        "summary": "B300 and GB300 platforms expand memory and inference compute for longer reasoning workloads.",
        "details": "Blackwell Ultra spans GPU and rack-scale configurations. The announcement is separate from subsequent partner availability.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "NVIDIA Blackwell Ultra",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Blackwell Ultra",
            "chip": false
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-blackwell-ultra-ai-factory-platform-paves-way-for-age-of-ai-reasoning"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "tpu-ironwood",
      "date": "2025-04-09",
      "name": "Google TPU · Ironwood",
      "company": "google",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第七代 TPU 面向大规模 AI 服务，进一步扩展芯片与系统协同。",
      "details": "此节点记录 Ironwood 公布。后续 Cloud TPU 版本的预览或正式供应日期与芯片公告不同。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/google-cloud-next-2025-sundar-pichai-keynote/"
        }
      ],
      "en": {
        "summary": "Seventh-generation TPUs target large-scale AI serving with closer chip and system integration.",
        "details": "This entry records the Ironwood announcement. Preview and general availability of Cloud TPU versions have separate dates.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      }
    },
    {
      "id": "ascend-910c-cloudmatrix384",
      "date": "2025-04-10",
      "name": "昇腾 910C · CloudMatrix 384",
      "company": "huawei",
      "category": "systems",
      "kind": "announcement",
      "summary": "384 颗昇腾 910C 通过高速互连组成统一计算系统。",
      "details": "CloudMatrix 384 是基于 Atlas 900 A3 的云端实例。该节点记录云服务系统公布，不把它等同于 910C 芯片首发。",
      "sources": [
        {
          "url": "https://www.huaweicloud.com/news/2025/20250424094932570.html",
          "title": "华为云 · CloudMatrix 384 发布",
          "titleEn": "Huawei Cloud · CloudMatrix 384 announcement"
        },
        {
          "url": "https://arxiv.org/abs/2506.12708",
          "title": "华为团队 · 系统论文",
          "titleEn": "Huawei team · System paper"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "官方公告明确发布活动发生于 2025-04-10。910C 芯片组成另据华为团队的系统论文核对。",
      "en": {
        "summary": "384 Ascend 910C processors are connected into a unified compute system.",
        "details": "CloudMatrix 384 is a cloud instance built on Atlas 900 A3. This entry dates the system announcement, not the first release of the 910C chip.",
        "dateNote": "The official announcement dates the event to April 10, 2025. The 910C chip configuration is documented in the Huawei-authored system paper.",
        "name": "Ascend 910C · CloudMatrix 384"
      }
    },
    {
      "id": "instinct-mi350",
      "date": "2025-06-12",
      "name": "AMD Instinct MI350 Series",
      "company": "amd",
      "category": "gpu",
      "kind": "announcement",
      "summary": "CDNA 4 扩展低精度计算与 HBM3e 容量，面向生成式 AI。",
      "details": "系列包括 MI350X 与 MI355X。规格按单个加速器列出，散热方案与功耗依型号而异。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://www.amd.com/en/blogs/2025/amd-instinct-mi350-series-and-beyond-accelerating-the-future-of-ai-and-hpc.html"
        }
      ],
      "en": {
        "summary": "CDNA 4 expands low-precision compute and HBM3e capacity for generative AI.",
        "details": "The family includes MI350X and MI355X. Specifications are per accelerator, with cooling and power varying by model.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "MI355X OAM · 1 accelerator",
        "checkedAt": "2026-10-01",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "288 GB HBM3e",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "8 TB/s",
            "chip": true
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "CDNA 4",
            "chip": false
          },
          {
            "label": "BF16·稠密",
            "labelEn": "BF16 · Dense",
            "value": "2.5166 PFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "BF16",
            "sparsity": "dense",
            "scope": "accelerator",
            "estimate": false
          },
          {
            "label": "功耗上限",
            "labelEn": "Board power",
            "value": "1,400 W",
            "chip": true
          }
        ],
        "sources": [
          "https://www.amd.com/en/products/accelerators/instinct/mi350.html",
          "https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/product-briefs/amd-instinct-mi355x-gpu-brochure.pdf"
        ],
        "note": "该家族以 MI355X 单个 OAM 加速器展示规格；不能当作 MI350X 或八卡平台的数值。 算力为所列配置的理论峰值，非模型训练或推理的实测吞吐。稠密与稀疏算力分别标注，显存带宽不等同于芯片互联带宽；功耗为上限或板卡规格。",
        "noteEn": "This family entry displays a single MI355X OAM accelerator, not MI350X or an eight-accelerator platform. Compute is the theoretical peak for the named configuration, not measured model throughput. Dense and sparse values are labeled separately. Memory bandwidth is distinct from chip interconnect bandwidth; power is the stated maximum or board rating."
      }
    },
    {
      "id": "dgx-spark",
      "date": "2025-10-13",
      "name": "NVIDIA DGX Spark",
      "company": "nvidia",
      "category": "edge",
      "kind": "availability",
      "summary": "GB10 与统一内存进入桌面设备，面向本地模型开发。",
      "details": "128 GB 为 CPU 与 GPU 共享的一致性内存。此处记录交付公告，与此前 Project DIGITS 和 DGX Spark 的产品预告区分。",
      "sources": [
        {
          "title": "NVIDIA · DGX Spark 交付公告",
          "titleEn": "NVIDIA · DGX Spark shipping announcement",
          "url": "https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-DGX-Spark-Arrives-for-Worlds-AI-Developers/default.aspx"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "记录 10 月 13 日的交付公告；公告说明设备自 10 月 15 日起可订购。",
      "en": {
        "summary": "GB10 and unified memory move into a desktop system for local model development.",
        "details": "128 GB is coherent memory shared by CPU and GPU. This entry records the shipping announcement separately from earlier Project DIGITS and DGX Spark previews.",
        "dateNote": "Records the October 13 shipping announcement, which states that ordering opens on October 15."
      },
      "hardware": {
        "variant": "NVIDIA DGX Spark",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "统一内存",
            "labelEn": "Unified memory",
            "value": "128 GB",
            "chip": true
          }
        ],
        "sources": [
          "https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-DGX-Spark-Arrives-for-Worlds-AI-Developers/default.aspx"
        ],
        "note": "规格对应所注明的芯片、板卡或系统配置；来源为发布资料或有明确出处的报道。",
        "noteEn": "Specifications apply to the named chip, card, or system configuration and are drawn from the linked announcement or attributed reporting."
      }
    },
    {
      "id": "aws-trainium3",
      "date": "2025-12-02",
      "name": "AWS Trainium3 · Trn3",
      "company": "amazon",
      "category": "accelerator",
      "kind": "availability",
      "summary": "第三代 Trainium 通过 Trn3 UltraServer 正式供应，支持训练与模型服务。",
      "details": "Trainium3 使用 3 nm 工艺。此处保留单芯片的内存与带宽，避免与 144 芯片系统的聚合规格混淆。",
      "dateNote": "日期为该产品或云服务的正式供应公告日。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-ec2-trn3-ultraservers/"
        }
      ],
      "en": {
        "summary": "Third-generation Trainium becomes available through Trn3 UltraServers for training and serving.",
        "details": "Trainium3 uses a 3 nm process. Memory and bandwidth are listed per chip, distinct from the aggregate specifications of a 144-chip system.",
        "dateNote": "Dated to the official availability announcement for this product or cloud service."
      },
      "hardware": {
        "variant": "Trainium3 · 1 chip",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "144 GB HBM3e",
            "chip": true
          },
          {
            "label": "带宽",
            "labelEn": "Bandwidth",
            "value": "4.9 TB/s",
            "chip": true
          }
        ],
        "sources": [
          "https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-ec2-trn3-ultraservers/"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "nvidia-rubin",
      "date": "2026-01-05",
      "name": "NVIDIA Vera Rubin",
      "company": "nvidia",
      "category": "gpu",
      "kind": "announcement",
      "summary": "Rubin GPU、Vera CPU 与新一代互连共同构成下一代 AI 计算平台。",
      "details": "官方同时公布多种协同芯片与系统设计。此节点记录 CES 平台公布，非所有整机同时可购买。 后续应用：NVIDIA 于 2026 年 9 月 30 日确认 CoreWeave 已提供 Vera Rubin NVL72，Cognition 已运行生产工作负载。此处仍保留年初的平台公布日期。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": true,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer"
        },
        {
          "title": "NVIDIA · CoreWeave 与 Cognition 实际应用",
          "titleEn": "NVIDIA · CoreWeave and Cognition deployment",
          "url": "https://blogs.nvidia.com/blog/coreweave-agentic-ai-vera-rubin/"
        }
      ],
      "en": {
        "summary": "Rubin GPUs, Vera CPUs, and new interconnects form a new AI compute platform.",
        "details": "The announcement covers several coordinated chips and system designs. This entry records the CES platform announcement, rather than universal retail availability. On September 30, 2026, NVIDIA confirmed CoreWeave availability of Vera Rubin NVL72 and Cognition production workloads. This entry retains the original platform announcement date.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "NVIDIA Vera Rubin",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Rubin",
            "chip": false
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "ascend-950pr",
      "date": "2026-03-20",
      "name": "昇腾 950PR · Atlas 350",
      "company": "huawei",
      "category": "accelerator",
      "kind": "availability",
      "summary": "950PR 随 Atlas 350 加速卡上市，面向推荐与大模型推理。",
      "details": "PR 面向 Prefill 与推荐场景。950DT 是面向 Decode 与训练的另一款芯片；2025 年路线图中的计划日期不作为其实际供货日期。所列规格仅对应本次 Atlas 350 板卡。",
      "sources": [
        {
          "url": "https://www.ithome.com/0/931/355.htm",
          "title": "IT之家 · 上市日期报道",
          "titleEn": "IT Home · Launch-date reporting",
          "type": "reporting"
        },
        {
          "url": "https://fund.eastmoney.com/a/202603213679633275.html",
          "title": "上海证券报 · 东方财富转载",
          "titleEn": "Shanghai Securities News · Syndicated by Eastmoney",
          "type": "reporting"
        },
        {
          "url": "https://www.huawei.com/en/news/2025/9/hc-xu-keynote-speech",
          "title": "华为 · 950 系列架构与路线图",
          "titleEn": "Huawei · 950 architecture and roadmap"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "IT之家 3 月 21 日报道明确上市事件发生于 2026-03-20；板卡规格由上海证券报记者的现场报道补充。",
      "en": {
        "summary": "950PR launches in the Atlas 350 accelerator card for recommendation and LLM inference.",
        "details": "PR targets prefill and recommendation. The separate 950DT targets decoding and training; roadmap dates are not treated as actual availability. The specifications here apply only to the Atlas 350 card.",
        "dateNote": "IT Home’s March 21 report explicitly dates the launch to 2026-03-20. Card specifications are supported by on-site Shanghai Securities News reporting.",
        "name": "Ascend 950PR · Atlas 350"
      },
      "hardware": {
        "variant": "Atlas 350 · Ascend 950PR",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "HBM 容量",
            "labelEn": "HBM capacity",
            "value": "112 GB",
            "chip": true
          },
          {
            "label": "内存带宽",
            "labelEn": "Memory bandwidth",
            "value": "1.4 TB/s",
            "chip": true
          }
        ],
        "sources": [
          "https://fund.eastmoney.com/a/202603213679633275.html"
        ],
        "note": "规格对应所注明的芯片、板卡或系统配置；来源为发布资料或有明确出处的报道。",
        "noteEn": "Specifications apply to the named chip, card, or system configuration and are drawn from the linked announcement or attributed reporting."
      }
    },
    {
      "id": "tpu-8",
      "date": "2026-04-22",
      "name": "Google TPU 8t / 8i",
      "company": "google",
      "category": "accelerator",
      "kind": "announcement",
      "summary": "第八代 TPU 分为面向训练的 8t 与面向推理的 8i。",
      "details": "两种芯片针对不同计算与通信瓶颈设计。所列 288 GB HBM 对应 TPU 8i，不能套用到 TPU 8t。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "AI 加速器"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://cloud.google.com/blog/products/compute/ai-infrastructure-at-next26"
        }
      ],
      "en": {
        "summary": "Eighth-generation TPUs split into training-oriented 8t and inference-oriented 8i.",
        "details": "The chips address different compute and communication bottlenecks. The listed 288 GB HBM capacity belongs to TPU 8i and must not be applied to TPU 8t.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      },
      "hardware": {
        "variant": "TPU 8i · 1 chip",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "显存",
            "labelEn": "Memory",
            "value": "288 GB HBM",
            "chip": true
          },
          {
            "label": "片上 SRAM",
            "labelEn": "On-chip SRAM",
            "value": "384 MB",
            "chip": false
          }
        ],
        "sources": [
          "https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive"
        ],
        "note": "规格对应上述型号，以所列原始资料为准；其他封装与整机配置可能不同。",
        "noteEn": "Specifications apply to the named configuration in the cited source. Other form factors and complete systems may differ."
      }
    },
    {
      "id": "nvidia-rtx-spark",
      "date": "2026-05-31",
      "name": "NVIDIA RTX Spark",
      "company": "nvidia",
      "category": "edge",
      "kind": "announcement",
      "summary": "将 Blackwell RTX GPU 与 Grace CPU 集成到 Windows 电脑平台，支持本地模型与智能体。",
      "details": "通过 NVLink-C2C 连接 GPU 与 CPU，提供最高 128 GB 统一内存。10 月 7 日开启笔记本预售，官方计划 10 月 16 日供应，紧凑台式机计划 11 月供应。",
      "dateNote": "日期为 5 月 31 日产品公布；后续预售与计划供货日期不作为首次发布日期。",
      "tags": [
        "本地与边缘"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "NVIDIA 产品公告",
          "titleEn": "NVIDIA product announcement",
          "url": "https://nvidianews.nvidia.com/news/nvidia-microsoft-windows-pcs-agents-rtx-spark"
        },
        {
          "title": "预售与供应计划",
          "titleEn": "Preorders and availability plans",
          "url": "https://blogs.nvidia.com/blog/local-ai-rtx-spark-microsoft-windows-event/"
        }
      ],
      "en": {
        "summary": "Combines a Blackwell RTX GPU and Grace CPU in a Windows PC platform for local models and agents.",
        "details": "NVLink-C2C connects the GPU and CPU, with up to 128 GB of unified memory. Laptop preorders opened October 7, with availability scheduled for October 16; compact desktops are planned for November.",
        "dateNote": "Dated to the May 31 product announcement, separately from later preorders and planned availability."
      },
      "hardware": {
        "variant": "NVIDIA RTX Spark · 1 superchip",
        "checkedAt": "2026-10-08",
        "facts": [
          {
            "label": "统一内存上限",
            "labelEn": "Max unified memory",
            "value": "128 GB",
            "chip": true
          },
          {
            "label": "FP4 峰值",
            "labelEn": "FP4 peak",
            "value": "1 PFLOPS",
            "chip": true,
            "metric": "compute",
            "precision": "FP4",
            "sparsity": "not-stated",
            "scope": "chip",
            "estimate": false
          },
          {
            "label": "架构",
            "labelEn": "Architecture",
            "value": "Blackwell RTX + Grace",
            "chip": false
          }
        ],
        "sources": [
          "https://nvidianews.nvidia.com/news/nvidia-microsoft-windows-pcs-agents-rtx-spark",
          "https://blogs.nvidia.com/blog/local-ai-rtx-spark-microsoft-windows-event/"
        ],
        "note": "统一内存为最高配置。FP4 为厂商标称峰值，公告未明确稀疏性口径；不等同于实际模型吞吐，也不可直接与其他精度比较。",
        "noteEn": "Memory is the maximum unified configuration. FP4 is the vendor-stated peak without a specified sparsity basis; it is not model throughput or directly comparable across precisions."
      }
    },
    {
      "id": "atlas-950-superpod",
      "date": "2026-07-17",
      "name": "Atlas 950 SuperPoD",
      "company": "huawei",
      "category": "systems",
      "kind": "showcase",
      "summary": "1024 卡超节点公开展示，以统一内存编址和高速互连扩展算力。",
      "details": "记录 WAIC 展出的实际系统；不将此前路线图中更大规模的满配设想作为此次展品规格。华为在 9 月 17 日全联接大会上表示，昇腾 950 超节点已规模商用，但未将商用部署限定为这套展品的配置。",
      "sources": [
        {
          "url": "https://www.huawei.com/cn/news/2026/7/atlas-950-superpod",
          "title": "官方发布资料",
          "titleEn": "Official announcement"
        },
        {
          "url": "https://www.huawei.com/cn/news/2026/9/hc-wang-keynote",
          "title": "华为全联接大会后续进展",
          "titleEn": "Huawei Connect deployment update"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "采用华为公告正文的 2026-07-17 展示日期，事件性质为真机公开展示。",
      "en": {
        "summary": "A 1,024-card SuperPoD is publicly demonstrated with unified addressing and high-speed links.",
        "details": "Records the system shown at WAIC; larger roadmap configurations are not attributed to this exhibit. On September 17, Huawei reported commercial deployment of Ascend 950 Supernodes at scale, without specifying that those deployments use this exhibit’s configuration.",
        "dateNote": "Uses the 2026-07-17 demonstration date in Huawei’s announcement; this is a public hardware demonstration."
      },
      "hardware": {
        "variant": "Atlas 950 SuperPoD · WAIC 2026",
        "checkedAt": "2026-09-30",
        "facts": [
          {
            "label": "加速卡规模",
            "labelEn": "Accelerator cards",
            "value": "1024",
            "chip": true
          }
        ],
        "sources": [
          "https://www.huawei.com/cn/news/2026/7/atlas-950-superpod"
        ],
        "note": "规格对应所注明的芯片、板卡或系统配置；来源为发布资料或有明确出处的报道。",
        "noteEn": "Specifications apply to the named chip, card, or system configuration and are drawn from the linked announcement or attributed reporting."
      }
    },
    {
      "id": "instinct-mi400",
      "date": "2026-07-23",
      "name": "AMD Instinct MI400 / Helios",
      "company": "amd",
      "category": "gpu",
      "kind": "announcement",
      "summary": "MI400 GPU 与 Helios 机架系统共同推进大规模 AI 基础设施。",
      "details": "MI455X 面向 AI，MI430X 面向高精度计算。此节点记录 Advancing AI 2026 的产品发布，不将多种系统规格合并为单卡参数。",
      "dateNote": "日期为官方公布日；后续供货安排见原始公告。",
      "tags": [
        "GPU"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "官方发布资料",
          "url": "https://ir.amd.com/news-events/press-releases/detail/1294/aai-2026-amd-delivers-full-stack-compute-for-the-agentic-ai-era"
        }
      ],
      "en": {
        "summary": "MI400 GPUs and Helios rack systems extend AMD large-scale AI infrastructure.",
        "details": "MI455X targets AI while MI430X targets high-precision computing. This entry records the Advancing AI 2026 launch without combining system specifications into a single-card figure.",
        "dateNote": "Dated to the official announcement; availability is described in the original source."
      }
    },
    {
      "id": "cerebras-cs4",
      "date": "2026-08-18",
      "name": "Cerebras CS-4",
      "company": "cerebras",
      "category": "systems",
      "kind": "announcement",
      "summary": "采用三颗 WSE-3 Turbo 与 Nexus 机架架构，面向低延迟推理及分离式部署。",
      "details": "模块化设计整合计算、供电和 I/O，支持由其他平台完成预填充、由 CS-4 完成解码的分离式推理。CS-4 是系统代际名称，处理器为 WSE-3 Turbo。",
      "dateNote": "采用官方 8 月 18 日公告日期；公告计划当季开始交付，未据此确认实际客户交付日。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "CS-4 系统公告",
          "titleEn": "CS-4 system announcement",
          "url": "https://www.cerebras.ai/blog/introducing-cerebras-cs-4"
        }
      ],
      "en": {
        "summary": "Combines three WSE-3 Turbo processors with the Nexus rack architecture for low-latency and disaggregated inference.",
        "details": "Its modular design integrates compute, power, and I/O. Other platforms can handle prefill while CS-4 handles decoding. CS-4 names the system generation; the processors are WSE-3 Turbo.",
        "dateNote": "Uses the August 18 announcement. Shipments were scheduled to begin that quarter; a customer delivery date is not established here."
      },
      "hardware": {
        "variant": "Cerebras CS-4 · Nexus",
        "checkedAt": "2026-10-08",
        "facts": [
          {
            "label": "处理器",
            "labelEn": "Processors",
            "value": "3 × WSE-3 Turbo",
            "chip": true
          },
          {
            "label": "机架架构",
            "labelEn": "Rack architecture",
            "value": "Nexus",
            "chip": false
          }
        ],
        "sources": [
          "https://www.cerebras.ai/blog/introducing-cerebras-cs-4"
        ],
        "note": "规格对应 CS-4 系统；官方性能倍率含特定模型测试与推算，不作为通用算力指标。",
        "noteEn": "Specifications describe the CS-4 system. Published speedups include model-specific tests and projections, not general compute metrics."
      }
    },
    {
      "id": "apple-m5-ultra",
      "date": "2026-08-25",
      "name": "Apple M5 Ultra",
      "company": "apple",
      "category": "edge",
      "kind": "announcement",
      "summary": "GPU 神经加速器与高带宽统一内存支持本地大模型推理。",
      "details": "用于新一代 Mac Studio，最高提供 512 GB 统一内存与 1.2 TB/s 内存带宽，官方展示了 LM Studio 等本地 AI 应用。统一内存由 CPU、GPU 等系统组件共享。",
      "dateNote": "采用 8 月 25 日公告日期；公告安排 Mac Studio 从 9 月 22 日开始供应，512 GB 配置计划 10 月下旬供应。",
      "tags": [
        "本地与边缘"
      ],
      "milestone": false,
      "sources": [
        {
          "title": "Mac Studio 与 M5 Ultra 公告",
          "titleEn": "Mac Studio and M5 Ultra announcement",
          "url": "https://www.apple.com/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/"
        }
      ],
      "en": {
        "summary": "GPU Neural Accelerators and high-bandwidth unified memory support local language-model inference.",
        "details": "Powers the new Mac Studio with up to 512 GB of unified memory and 1.2 TB/s memory bandwidth, with local AI applications such as LM Studio demonstrated by Apple. Memory is shared by the CPU, GPU, and other system components.",
        "dateNote": "Uses the August 25 announcement, which scheduled Mac Studio availability from September 22 and the 512 GB configuration for late October."
      },
      "hardware": {
        "variant": "Mac Studio · M5 Ultra",
        "checkedAt": "2026-10-08",
        "facts": [
          {
            "label": "统一内存上限",
            "labelEn": "Max unified memory",
            "value": "512 GB",
            "chip": true
          },
          {
            "label": "内存带宽",
            "labelEn": "Memory bandwidth",
            "value": "1.2 TB/s",
            "chip": true
          }
        ],
        "sources": [
          "https://www.apple.com/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/"
        ],
        "note": "512 GB 为公布的最高统一内存配置，计划 2026 年 10 月下旬供应；截至 10 月 8 日不记作该配置已交付。",
        "noteEn": "512 GB is the announced maximum unified-memory configuration, scheduled for late October 2026; it is not recorded as delivered as of October 8."
      }
    },
    {
      "id": "ascend-960-supernode",
      "date": "2026-09-17",
      "name": "昇腾 960 超节点",
      "company": "huawei",
      "category": "systems",
      "kind": "announcement",
      "summary": "以灵衢互连与 Hi-ONE NPO 光引擎连接最高 4096 张加速卡。",
      "details": "采用统一内存编址与全液冷设计，厂商公布的系统聚合峰值为 8 EFLOPS FP8、16 EFLOPS FP4，不代表单卡算力。同场芯片路线图计划 960DT 于 2027 年第一季度、960PR 于第三季度就绪。",
      "dateNote": "记录 9 月 17 日超节点产品公布，不代表昇腾 960 芯片或整机已经供货。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "昇腾 960 超节点公告",
          "titleEn": "Ascend 960 Supernode announcement",
          "url": "https://www.huawei.com/cn/news/2026/9/hc-ascend960-supernode"
        },
        {
          "title": "芯片路线图与系统架构",
          "titleEn": "Chip roadmap and system architecture",
          "url": "https://www.huawei.com/cn/news/2026/9/hc-wang-keynote"
        }
      ],
      "en": {
        "name": "Ascend 960 Supernode",
        "summary": "Uses UnifiedBus interconnects and Hi-ONE near-packaged optics to link up to 4,096 accelerator cards.",
        "details": "Features unified memory addressing and liquid cooling. Vendor-stated aggregate system peaks are 8 EFLOPS FP8 and 16 EFLOPS FP4, not per-card figures. The accompanying chip roadmap targets readiness for 960DT in Q1 2027 and 960PR in Q3 2027.",
        "dateNote": "Records the September 17 system announcement, not confirmed availability of Ascend 960 chips or complete systems."
      },
      "hardware": {
        "variant": "昇腾 960 超节点 · 公布配置",
        "variantEn": "Ascend 960 Supernode · announced configuration",
        "checkedAt": "2026-10-08",
        "facts": [
          {
            "label": "加速卡上限",
            "labelEn": "Max accelerator cards",
            "value": "4096",
            "chip": true
          },
          {
            "label": "互连",
            "labelEn": "Interconnect",
            "value": "灵衢 + Hi-ONE NPO",
            "valueEn": "UnifiedBus + Hi-ONE NPO",
            "chip": false
          }
        ],
        "sources": [
          "https://www.huawei.com/cn/news/2026/9/hc-ascend960-supernode",
          "https://www.huawei.com/cn/news/2026/9/hc-wang-keynote"
        ],
        "note": "规格对应官方公布的完整超节点配置；芯片就绪时间另见路线图，系统规模与峰值不等于已交付性能。",
        "noteEn": "Specifications describe the announced complete Supernode. Chip readiness follows the roadmap; system scale and peaks do not establish delivered performance."
      }
    }
  ],
  "coverage": {
    "checkedAt": "2026-10-08",
    "scope": "具有代表性的 GPU、专用加速器、算力系统及本地设备；日期优先依据一手资料，辅以署名媒体报道。区分产品公布、公开展示、供应计划与实际部署，规格保留芯片、板卡或系统范围。",
    "scopeEn": "Representative GPUs, custom accelerators, compute systems, and local devices. Dates prioritize primary sources with attributed reporting as needed. Announcements, demonstrations, availability plans, and deployments remain distinct; specifications retain chip, card, or system scope."
  }
};
