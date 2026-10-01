// Primary-source history of AI methods, computing frameworks, and deployment.
(() => {
  const data = {
  "asOf": "2026-10-01",
  "updatedAt": "2026-10-01",
  "accessFilter": false,
  "companies": [
    {
      "id": "nvidia",
      "name": "NVIDIA",
      "nameEn": "NVIDIA",
      "aliases": "英伟达 CUDA Dynamo"
    },
    {
      "id": "google",
      "name": "Google",
      "nameEn": "Google",
      "aliases": "DeepMind TensorFlow JAX"
    },
    {
      "id": "microsoft",
      "name": "Microsoft",
      "nameEn": "Microsoft",
      "aliases": "微软 ONNX DeepSpeed"
    },
    {
      "id": "openai",
      "name": "OpenAI",
      "nameEn": "OpenAI",
      "aliases": "Triton PPO"
    },
    {
      "id": "meta",
      "name": "Meta",
      "nameEn": "Meta",
      "aliases": "Facebook RAG"
    },
    {
      "id": "deepseek",
      "name": "DeepSeek",
      "nameEn": "DeepSeek",
      "aliases": "深度求索"
    },
    {
      "id": "amd",
      "name": "AMD",
      "nameEn": "AMD",
      "aliases": "ROCm"
    },
    {
      "id": "huawei",
      "name": "华为",
      "nameEn": "Huawei",
      "aliases": "昇腾 Ascend CANN"
    },
    {
      "id": "apple",
      "name": "Apple",
      "nameEn": "Apple",
      "aliases": "苹果 MLX"
    },
    {
      "id": "pytorch",
      "name": "PyTorch",
      "nameEn": "PyTorch",
      "aliases": "Torch"
    },
    {
      "id": "vllm",
      "name": "vLLM",
      "nameEn": "vLLM",
      "aliases": "PagedAttention"
    },
    {
      "id": "ggml",
      "name": "ggml",
      "nameEn": "ggml",
      "aliases": "llama.cpp Georgi Gerganov"
    },
    {
      "id": "sglang",
      "name": "SGLang",
      "nameEn": "SGLang",
      "aliases": "RadixAttention"
    },
    {
      "id": "flashattention",
      "name": "FlashAttention",
      "nameEn": "FlashAttention",
      "aliases": "Dao-AILab Tri Dao"
    },
    {
      "id": "state-spaces",
      "name": "State Spaces",
      "nameEn": "State Spaces",
      "aliases": "Mamba"
    },
    {
      "id": "toronto",
      "name": "多伦多大学",
      "nameEn": "U. Toronto",
      "aliases": "University of Toronto AlexNet"
    },
    {
      "id": "montreal",
      "name": "蒙特利尔大学",
      "nameEn": "U. Montréal",
      "aliases": "University of Montreal GAN Bahdanau"
    },
    {
      "id": "berkeley",
      "name": "加州大学伯克利分校",
      "nameEn": "UC Berkeley",
      "aliases": "DDPM"
    },
    {
      "id": "stanford",
      "name": "斯坦福大学",
      "nameEn": "Stanford",
      "aliases": "DPO"
    },
    {
      "id": "washington",
      "name": "华盛顿大学",
      "nameEn": "U. Washington",
      "aliases": "University of Washington QLoRA"
    },
    {
      "id": "amsterdam",
      "name": "阿姆斯特丹大学",
      "nameEn": "U. Amsterdam",
      "aliases": "University of Amsterdam VAE Adam"
    },
    {
      "id": "edinburgh",
      "name": "爱丁堡大学",
      "nameEn": "U. Edinburgh",
      "aliases": "University of Edinburgh BPE"
    },
    {
      "id": "zhuiyi",
      "name": "追一科技",
      "nameEn": "Zhuiyi",
      "aliases": "RoFormer RoPE 苏剑林"
    },
    {
      "id": "compvis",
      "name": "CompVis",
      "nameEn": "CompVis",
      "aliases": "LMU Heidelberg latent diffusion"
    },
    {
      "id": "ista",
      "name": "奥地利科学技术研究所",
      "nameEn": "ISTA",
      "aliases": "Institute of Science and Technology Austria GPTQ"
    },
    {
      "id": "mit",
      "name": "麻省理工学院",
      "nameEn": "MIT",
      "aliases": "Massachusetts Institute of Technology AWQ"
    },
    {
      "id": "amazon",
      "name": "AWS",
      "nameEn": "AWS",
      "aliases": "Amazon 亚马逊 Firecracker microVM"
    },
    {
      "id": "e2b",
      "name": "E2B",
      "nameEn": "E2B",
      "aliases": "Sandbox 沙箱 Code Interpreter"
    },
    {
      "id": "docker",
      "name": "Docker",
      "nameEn": "Docker",
      "aliases": "容器 container images"
    },
    {
      "id": "kata",
      "name": "Kata Containers",
      "nameEn": "Kata Containers",
      "aliases": "容器 虚拟机 隔离 Kata runtime OpenInfra"
    },
    {
      "id": "cloud-hypervisor",
      "name": "Cloud Hypervisor",
      "nameEn": "Cloud Hypervisor",
      "aliases": "VMM 虚拟机监控器 Rust Linux Foundation"
    }
  ],
  "categories": {
    "methods": "算法与方法",
    "frameworks": "框架与计算",
    "deployment": "推理与部署",
    "infrastructure": "容器与沙箱"
  },
  "categoriesEn": {
    "methods": "Methods",
    "frameworks": "Frameworks & compute",
    "deployment": "Inference & deployment",
    "infrastructure": "Containers & sandboxes"
  },
  "kinds": {
    "paper": "研究论文",
    "release": "软件发布",
    "preview": "公开预览",
    "announcement": "项目公开"
  },
  "kindsEn": {
    "paper": "Research paper",
    "release": "Software release",
    "preview": "Public preview",
    "announcement": "Announcement"
  },
  "themes": {},
  "themesEn": {},
  "releases": [
    {
      "id": "cuda-sdk",
      "date": "2007-02-15",
      "name": "CUDA SDK",
      "company": "nvidia",
      "category": "frameworks",
      "kind": "preview",
      "summary": "CUDA 工具包与 SDK 公开测试，让开发者用 C 语言编写 GPU 计算程序。",
      "details": "CUDA 将 GPU 的用途扩展到图形渲染之外，为后续的深度学习计算提供编程与运行基础。首批公开工具面向 GeForce 8 系列。",
      "dateNote": "采用 NVIDIA 员工发布公开测试文档的日期；CUDA 架构已于 2006 年公布。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://forums.developer.nvidia.com/t/release-notes-and-readme-please-read-after-installing-cuda/213"
        }
      ],
      "en": {
        "summary": "A public beta of the CUDA toolkit and SDK brings C-based programming to GPU computing.",
        "details": "CUDA extends GPU programming beyond graphics and provides a foundation for later deep-learning workloads. The initial public tools target the GeForce 8 series.",
        "dateNote": "Dated to NVIDIA’s public-beta documentation announcement. The CUDA architecture had been introduced in 2006."
      }
    },
    {
      "id": "alexnet",
      "date": "2012",
      "name": "AlexNet",
      "company": "toronto",
      "category": "methods",
      "kind": "paper",
      "summary": "利用 GPU 训练深层卷积网络，在 ImageNet 图像分类中取得显著进展。",
      "details": "论文结合卷积网络、ReLU、数据增强和 dropout，展示了大规模数据与 GPU 训练的作用。研究由多伦多大学团队完成。",
      "dateNote": "原始会议论文集标注为 2012 年，本站保留年份精度，不推定月日。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks"
        }
      ],
      "en": {
        "summary": "A deep convolutional network trained on GPUs advances ImageNet image classification.",
        "details": "The University of Toronto team combines convolutional networks, ReLU, data augmentation, and dropout, demonstrating the value of large datasets and GPU training.",
        "dateNote": "The original proceedings specify 2012. No month or day is inferred."
      }
    },
    {
      "id": "word2vec",
      "date": "2013-01-16",
      "name": "word2vec",
      "company": "google",
      "category": "methods",
      "kind": "paper",
      "summary": "高效学习词向量，以连续空间表示词语关系。",
      "details": "CBOW 与 Skip-gram 降低大规模词表示学习的计算成本，成为神经语言处理的基础方法。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/1301.3781",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Efficient word-vector learning represents relationships in a continuous space.",
        "details": "CBOW and Skip-gram reduce the cost of learning large-scale word representations and become foundational neural NLP methods.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "docker",
      "date": "2013-03-15",
      "name": "Docker",
      "company": "docker",
      "category": "infrastructure",
      "kind": "announcement",
      "summary": "以镜像封装应用及依赖，推动可复现运行环境在开发和部署中的普及。",
      "details": "Docker 将环境构建、分发与容器运行整合为开发工具，后来也被 OpenHands 用于智能体代码执行。普通 Linux 容器共享宿主内核，提供进程与资源隔离；其隔离边界与独立内核的虚拟机不同。",
      "dateNote": "采用 Docker 官方回顾确认的 PyCon 首次公开演示日期；不是容器技术起源，也不是后来的 Docker Sandboxes 产品发布。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "Docker · 首次演示回顾",
          "titleEn": "Docker · First demonstration retrospective",
          "url": "https://www.docker.com/blog/docker-nine-years-young/"
        },
        {
          "title": "OpenHands · Docker 执行环境",
          "titleEn": "OpenHands · Docker execution environment",
          "url": "https://docs.openhands.dev/openhands/usage/sandboxes/docker"
        }
      ],
      "en": {
        "summary": "Image-based application packaging makes reproducible environments easier to build, share, and run.",
        "details": "Docker brings application packaging and container execution into one workflow. OpenHands later uses Docker for agent code execution. Ordinary Linux containers share the host kernel and isolate processes and resources; their boundary differs from a VM with its own kernel.",
        "dateNote": "Uses the first public PyCon demonstration confirmed by Docker, not the origin of container technology or the later Docker Sandboxes product."
      }
    },
    {
      "id": "vae",
      "date": "2013-12-20",
      "name": "Variational Autoencoder · VAE",
      "company": "amsterdam",
      "category": "methods",
      "kind": "paper",
      "summary": "结合变分推断与重参数化技巧，学习可采样的潜在表示。",
      "details": "此节点记录 Auto-Encoding Variational Bayes 论文，不将 VAE 的后续应用视为同日发布。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/1312.6114",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Variational inference and reparameterization learn a latent representation that can be sampled.",
        "details": "This records Auto-Encoding Variational Bayes, separately from subsequent applications of variational autoencoders.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "gan",
      "date": "2014-06-10",
      "name": "GAN",
      "company": "montreal",
      "category": "methods",
      "kind": "paper",
      "summary": "通过生成器与判别器的对抗训练学习数据分布。",
      "details": "生成器学习产生样本，判别器学习区分生成样本与真实数据。两者共同训练，形成生成建模的一条研究路线。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/1406.2661"
        }
      ],
      "en": {
        "summary": "Adversarial training between a generator and a discriminator learns a data distribution.",
        "details": "A generator learns to produce samples while a discriminator distinguishes them from real data. Their joint training establishes an approach to generative modeling.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "additive-attention",
      "date": "2014-09-01",
      "name": "Attention · Bahdanau et al.",
      "company": "montreal",
      "category": "methods",
      "kind": "paper",
      "summary": "让翻译模型在生成每个词时动态关注不同的输入位置。",
      "details": "论文将对齐与翻译联合学习，缓解编码器把整句话压缩到单个固定向量的限制。这是循环网络中的注意力方法，早于 Transformer。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/1409.0473"
        }
      ],
      "en": {
        "summary": "A translation model learns to attend to different input positions as it generates each word.",
        "details": "Jointly learning alignment and translation reduces reliance on a single fixed-length sentence representation. This attention mechanism uses recurrent networks and predates Transformer.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "cudnn",
      "date": "2014-09-07",
      "name": "cuDNN",
      "company": "nvidia",
      "category": "frameworks",
      "kind": "announcement",
      "summary": "GPU 深度学习基础算子库，为框架提供优化后的计算实现。",
      "details": "cuDNN 将卷积等常用操作封装为可复用底层库，减少各框架重复实现和优化的工作。",
      "sources": [
        {
          "url": "https://forums.developer.nvidia.com/t/announcing-nvidia-reg-cudnn-ndash-gpu-accelerated-machine-learning/34741",
          "title": "NVIDIA · 官方公开公告",
          "titleEn": "NVIDIA · Public announcement"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "记录 NVIDIA 官方论坛于 2014-09-07 发布的公开介绍，不将公告日等同于更早归档构建的生成日期。",
      "en": {
        "summary": "A GPU deep-learning primitive library provides optimized operations for frameworks.",
        "details": "cuDNN packages common operations such as convolutions into reusable primitives, reducing duplicate implementation and tuning across frameworks.",
        "dateNote": "Records NVIDIA’s public forum announcement on 2014-09-07, distinct from the build dates of earlier archived packages."
      }
    },
    {
      "id": "seq2seq",
      "date": "2014-09-10",
      "name": "Sequence to Sequence",
      "company": "google",
      "category": "methods",
      "kind": "paper",
      "summary": "用编码器与解码器把变长输入序列映射为变长输出序列。",
      "details": "研究采用多层 LSTM 完成端到端序列学习，并在机器翻译中验证效果。编码器—解码器结构随后被广泛用于生成任务。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/1409.3215"
        }
      ],
      "en": {
        "summary": "An encoder and decoder map variable-length input sequences to variable-length outputs.",
        "details": "The paper uses multilayer LSTMs for end-to-end sequence learning and evaluates them on translation. The encoder–decoder structure becomes widely used in generation tasks.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "adam",
      "date": "2014-12-22",
      "name": "Adam",
      "company": "amsterdam",
      "category": "methods",
      "kind": "paper",
      "summary": "结合梯度的一阶与二阶矩估计，自适应调整优化步长。",
      "details": "Kingma 与 Ba 提出 Adam；该优化器成为深度学习训练的常用基础组件。机构筛选不替代联合作者署名。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/1412.6980",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "First- and second-moment gradient estimates adapt optimization step sizes.",
        "details": "Kingma and Ba introduce Adam, which becomes a widely used deep-learning optimizer. The institution filter does not replace joint author attribution.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "knowledge-distillation",
      "date": "2015-03-09",
      "name": "Knowledge Distillation",
      "company": "google",
      "category": "methods",
      "kind": "paper",
      "summary": "利用教师模型的输出分布训练更小的学生模型。",
      "details": "记录 Hinton、Vinyals 与 Dean 的代表论文。模型压缩有更早研究，此处不声称其首次提出所有蒸馏思想。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/1503.02531",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "A teacher model’s output distribution trains a smaller student model.",
        "details": "Records the influential paper by Hinton, Vinyals, and Dean. Model compression predates this work; the entry does not claim the origin of every distillation idea.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "bpe-subword",
      "date": "2015-08-31",
      "name": "BPE · Subword Tokenization",
      "company": "edinburgh",
      "category": "methods",
      "kind": "paper",
      "summary": "将字节对编码用于子词切分，缓解固定词表的未登录词问题。",
      "details": "BPE 源自更早的数据压缩方法；此节点记录其在神经机器翻译中的代表性应用。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/1508.07909",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Byte-pair encoding is applied to subword segmentation to address unknown words.",
        "details": "BPE originated as a compression method. This entry dates its influential application to neural machine translation.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "tensorflow",
      "date": "2015-11-09",
      "name": "TensorFlow",
      "company": "google",
      "category": "frameworks",
      "kind": "release",
      "summary": "Google 开源机器学习框架，将内部研究工具开放给开发者。",
      "details": "TensorFlow 提供构建和运行机器学习计算的基础工具，支持研究实验与应用部署。该节点记录首次开源公告。",
      "dateNote": "",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://blog.google/innovation-and-ai/products/tensorflow-smarter-machine-learning-for/"
        }
      ],
      "en": {
        "summary": "Google releases its machine-learning framework as open-source software.",
        "details": "TensorFlow provides tools for defining and executing machine-learning computation, supporting both research and application deployment. This entry records its initial open-source announcement.",
        "dateNote": ""
      }
    },
    {
      "id": "resnet",
      "date": "2015-12-10",
      "name": "ResNet",
      "company": "microsoft",
      "category": "methods",
      "kind": "paper",
      "summary": "通过残差连接改善深层网络的优化与训练。",
      "details": "残差块学习对输入的修正，并通过捷径连接保留信息。论文在图像识别中展示深度扩展的效果，残差连接也成为后续模型的常用构件。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/1512.03385"
        }
      ],
      "en": {
        "summary": "Residual connections make very deep networks easier to optimize and train.",
        "details": "Residual blocks learn a correction to their input, with shortcut connections preserving information. The paper demonstrates deeper image-recognition networks; residual connections become a common model component.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "pytorch",
      "date": "2017",
      "name": "PyTorch",
      "company": "pytorch",
      "category": "frameworks",
      "kind": "release",
      "summary": "以动态图和 Python 工作流支持深度学习研究。",
      "details": "PyTorch 将张量计算、自动求导与易于调试的编程方式结合。这里记录项目的最初发布年份，后续 2.0 编译能力另设节点。",
      "dateNote": "PyTorch 官方回顾确认首发于 2017 年；该来源未给出准确月日。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://pytorch.org/blog/pytorch-adds-new-dev-tools/"
        }
      ],
      "en": {
        "summary": "Dynamic computation graphs and a Python workflow support deep-learning research.",
        "details": "PyTorch combines tensor computation, automatic differentiation, and an approachable debugging workflow. This entry records the initial release year; version 2.0’s compilation features have a separate entry.",
        "dateNote": "An official PyTorch retrospective dates the first release to 2017 without specifying a day."
      }
    },
    {
      "id": "sparse-moe",
      "date": "2017-01-23",
      "name": "Sparsely-Gated MoE",
      "company": "google",
      "category": "methods",
      "kind": "paper",
      "summary": "用稀疏路由选择少数专家，扩大模型容量并控制每次计算量。",
      "details": "论文在循环语言模型中使用稀疏门控专家层。总参数量与每个输入实际参与计算的参数量由此可以分开扩展。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/1701.06538"
        }
      ],
      "en": {
        "summary": "Sparse routing selects a small subset of experts to increase capacity while limiting computation.",
        "details": "The paper introduces sparsely gated expert layers in recurrent language models. Total parameter capacity can grow separately from the parameters used for each input.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "human-preferences",
      "date": "2017-06-12",
      "name": "Deep RL from Human Preferences",
      "company": "openai",
      "category": "methods",
      "kind": "paper",
      "summary": "从人类比较反馈中学习奖励信号，再用强化学习优化行为。",
      "details": "OpenAI 与 DeepMind 等研究者在模拟机器人与 Atari 任务中研究偏好学习。这项工作是后续语言模型人类反馈训练的重要研究基础。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/1706.03741"
        }
      ],
      "en": {
        "summary": "Human comparisons train a reward signal that guides reinforcement learning.",
        "details": "Researchers from OpenAI, DeepMind, and collaborators study preference learning in simulated robotics and Atari tasks. The work contributes to the foundations of later human-feedback training for language models.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "ppo",
      "date": "2017-07-20",
      "name": "PPO",
      "company": "openai",
      "category": "methods",
      "kind": "paper",
      "summary": "通过约束策略更新，提高强化学习训练的稳定性与实现便利性。",
      "details": "Proximal Policy Optimization 使用可多次优化的代理目标，简化策略梯度训练。它后来也被用于基于人类反馈的语言模型训练。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/1707.06347"
        }
      ],
      "en": {
        "summary": "Constrained policy updates offer a practical approach to stable reinforcement learning.",
        "details": "Proximal Policy Optimization uses a surrogate objective that supports multiple optimization steps and simplifies policy-gradient training. It is later used in language-model training with human feedback.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "onnx",
      "date": "2017-09-07",
      "name": "ONNX",
      "company": "microsoft",
      "category": "deployment",
      "kind": "announcement",
      "summary": "Microsoft 与 Facebook 提出通用模型表示，促进框架之间的互操作。",
      "details": "Open Neural Network Exchange 提供模型图与算子的交换格式，让训练框架与推理运行时之间的迁移更加直接。",
      "dateNote": "",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://azure.microsoft.com/en-us/blog/microsoft-and-facebook-create-open-ecosystem-for-ai-model-interoperability/"
        }
      ],
      "en": {
        "summary": "Microsoft and Facebook introduce a common model representation for framework interoperability.",
        "details": "Open Neural Network Exchange defines an exchange format for model graphs and operators, helping models move between training frameworks and inference runtimes.",
        "dateNote": ""
      }
    },
    {
      "id": "jax",
      "date": "2018",
      "name": "JAX",
      "company": "google",
      "category": "frameworks",
      "kind": "release",
      "summary": "结合 NumPy 风格接口、自动微分和面向加速器的编译。",
      "details": "JAX 支持可组合的函数变换，把数值程序转化为可求导、可编译和可并行执行的计算。",
      "dateNote": "采用 Google 官方年度回顾确认的 2018 年；来源未标出首发月日。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://research.google/blog/looking-back-at-googles-research-efforts-in-2018/"
        }
      ],
      "en": {
        "summary": "NumPy-style programming combines with automatic differentiation and accelerator compilation.",
        "details": "JAX provides composable function transformations for differentiating, compiling, and parallelizing numerical programs.",
        "dateNote": "The release year is confirmed by Google’s 2018 research retrospective; it does not specify the launch day."
      }
    },
    {
      "id": "gvisor",
      "date": "2018-05-03",
      "name": "gVisor",
      "company": "google",
      "category": "infrastructure",
      "kind": "announcement",
      "summary": "Google 公开用户态内核沙箱，为容器中的不受信任代码提供额外隔离。",
      "details": "gVisor 拦截应用的系统调用，减少代码直接接触宿主内核的机会，并与容器工具集成。它后来用于智能体代码执行和强化学习环境；腾讯工程团队公开记录了每日数百万个 Agentic-RL 沙箱的生产使用。",
      "dateNote": "采用 Google Cloud 公开介绍文章的日期。2018 年记录的是通用隔离技术公开，智能体应用属于后续影响，不倒置为当年的发布用途。",
      "sources": [
        {
          "title": "Google Cloud · gVisor 公开介绍",
          "url": "https://cloud.google.com/blog/products/identity-security/open-sourcing-gvisor-a-sandboxed-container-runtime"
        },
        {
          "title": "腾讯工程团队 · Agentic-RL 沙箱部署",
          "url": "https://gvisor.dev/blog/2026/04/23/scaling-agentic-rl-sandboxes-to-the-millions-with-gvisor-at-tencent/",
          "titleEn": "Tencent engineers · Agentic-RL deployment"
        }
      ],
      "en": {
        "summary": "Google introduces a user-space kernel sandbox that adds isolation for untrusted code in containers.",
        "details": "gVisor intercepts application system calls and reduces direct exposure to the host kernel. Later uses include agent code execution and reinforcement-learning environments; Tencent engineers report millions of daily production Agentic-RL sandboxes.",
        "dateNote": "Uses the Google Cloud introduction date. The 2018 event is a general-purpose isolation release; agent uses are later evidence of influence."
      },
      "tags": [],
      "milestone": false
    },
    {
      "id": "kata-containers",
      "date": "2018-05-22",
      "name": "Kata Containers 1.0",
      "company": "kata",
      "category": "infrastructure",
      "kind": "release",
      "summary": "将轻量虚拟机隔离接入容器工作流，为容器或 Pod 提供独立的客户机内核。",
      "details": "Kata 1.0 整合 Intel Clear Containers 与 Hyper runV，连接容器工具与硬件虚拟化。它后来成为 Kubernetes Agent Sandbox 支持的隔离后端。Kata 属于容器运行时，Cloud Hypervisor 等是它可选的底层虚拟机监控器。",
      "dateNote": "采用 OpenInfra 的 1.0 发布日期；项目在 2017 年 12 月已公开。智能体沙箱集成属于后续用途。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "OpenInfra · Kata 1.0 发布",
          "titleEn": "OpenInfra · Kata 1.0 release",
          "url": "https://superuser.openinfra.org/articles/kata-containers-1-0/"
        },
        {
          "title": "Kata · Agent Sandbox 集成",
          "titleEn": "Kata · Agent Sandbox integration",
          "url": "https://katacontainers.io/blog/kata-containers-agent-sandbox-integration/"
        },
        {
          "title": "Kata · 运行时架构",
          "titleEn": "Kata · Runtime architecture",
          "url": "https://katacontainers.io/software/"
        }
      ],
      "en": {
        "summary": "A container runtime uses lightweight VMs to give containers or pods their own guest kernel.",
        "details": "Kata 1.0 combines Intel Clear Containers and Hyper runV. It later becomes a supported isolation backend for Kubernetes Agent Sandbox. Kata is the container-runtime layer; Cloud Hypervisor is one of its optional VMM backends.",
        "dateNote": "Uses OpenInfra’s version 1.0 announcement. The project was introduced in December 2017; agent-sandbox integrations came later."
      }
    },
    {
      "id": "sentencepiece",
      "date": "2018-08-19",
      "name": "SentencePiece",
      "company": "google",
      "category": "frameworks",
      "kind": "paper",
      "summary": "直接从原始文本训练子词模型，减少对语言专用分词的依赖。",
      "details": "论文描述开源分词工具及可复现流程。所列日期为论文公开日期，并非仓库首次提交日期。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/1808.06226",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Subword models train directly on raw text without language-specific word segmentation.",
        "details": "The paper describes the open-source tokenizer and a reproducible workflow. The date is the paper’s publication, not the repository’s first commit.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "firecracker",
      "date": "2018-11-26",
      "name": "Firecracker",
      "company": "amazon",
      "category": "infrastructure",
      "kind": "announcement",
      "summary": "AWS 公开轻量 microVM 技术，以独立内核隔离短时、多租户工作负载。",
      "details": "Firecracker 基于 KVM，最初用于 Lambda 与 Fargate 的隔离执行。它后来成为 E2B 等智能体沙箱的底层组件，代表通过微虚拟机运行生成代码的技术路线。",
      "dateNote": "采用 AWS What’s New 公告的 11 月 26 日；AWS 开源博客介绍发表于次日。这里记录技术公开，而非智能体服务的诞生。",
      "sources": [
        {
          "title": "AWS · Firecracker 公告",
          "url": "https://aws.amazon.com/about-aws/whats-new/2018/11/firecracker-lightweight-virtualization-for-serverless-computing/"
        },
        {
          "title": "E2B · microVM 沙箱架构",
          "url": "https://e2b.dev/enterprise",
          "titleEn": "E2B · microVM sandbox architecture"
        }
      ],
      "en": {
        "summary": "AWS releases lightweight microVM technology to isolate short-lived, multi-tenant workloads with separate kernels.",
        "details": "Built on KVM, Firecracker initially supports isolation for Lambda and Fargate. It later underpins agent sandboxes such as E2B, representing the microVM approach to running generated code.",
        "dateNote": "Uses November 26 from AWS What’s New; the Open Source Blog follows on November 27. This records the virtualization release, not an agent-service launch."
      },
      "tags": [],
      "milestone": false
    },
    {
      "id": "onnx-runtime",
      "date": "2018-12-04",
      "name": "ONNX Runtime",
      "company": "microsoft",
      "category": "deployment",
      "kind": "release",
      "summary": "跨平台推理运行时将模型格式与底层执行后端衔接起来。",
      "details": "ONNX 是模型交换格式，ONNX Runtime 是执行引擎；二者分别记录。",
      "sources": [
        {
          "url": "https://azure.microsoft.com/en-us/blog/onnx-runtime-is-now-open-source/",
          "title": "Microsoft · 开源发布",
          "titleEn": "Microsoft · Open-source release"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "日期为 Microsoft 宣布开源 ONNX Runtime 的 2018-12-04。",
      "en": {
        "summary": "A cross-platform runtime connects model formats to execution backends.",
        "details": "ONNX is a model-exchange format; ONNX Runtime is an execution engine, so their releases are recorded separately.",
        "dateNote": "Dated to Microsoft’s open-source release announcement on 2018-12-04."
      }
    },
    {
      "id": "cloud-hypervisor",
      "date": "2019-07-25",
      "name": "Cloud Hypervisor v0.1.0",
      "company": "cloud-hypervisor",
      "category": "infrastructure",
      "kind": "preview",
      "summary": "以 Rust 构建面向云工作负载的轻量虚拟机监控器。",
      "details": "Cloud Hypervisor 提供底层虚拟机运行能力，可作为 Kata Containers 的后端。Kubernetes Agent Sandbox 后来的 AKS 部署指南明确使用 Cloud Hypervisor 与 Kata 组成的隔离栈；它与上层智能体框架、沙箱服务接口各有分工。",
      "dateNote": "采用官方 GitHub v0.1.0 预发布的时间。项目在 2019 年 5 月已公开，这不是首次宣布或稳定版发布。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "Cloud Hypervisor · v0.1.0 预发布",
          "titleEn": "Cloud Hypervisor · v0.1.0 pre-release",
          "url": "https://github.com/cloud-hypervisor/cloud-hypervisor/releases/tag/v0.1.0"
        },
        {
          "title": "Agent Sandbox · AKS 部署",
          "titleEn": "Agent Sandbox · AKS deployment",
          "url": "https://agent-sandbox.sigs.k8s.io/docs/use-cases/examples/kata-aks-sandbox/"
        },
        {
          "title": "Cloud Hypervisor · 项目文档",
          "titleEn": "Cloud Hypervisor · Project documentation",
          "url": "https://github.com/cloud-hypervisor/cloud-hypervisor"
        },
        {
          "title": "AWS · 早期项目报道",
          "titleEn": "AWS · Early project coverage",
          "url": "https://aws.amazon.com/blogs/opensource/firecracker-open-source-update-may-2019/"
        }
      ],
      "en": {
        "summary": "A Rust-based virtual machine monitor provides a compact VM layer for modern cloud workloads.",
        "details": "Cloud Hypervisor supplies the VM layer and can serve as a Kata Containers backend. Kubernetes Agent Sandbox later documents an AKS deployment using Cloud Hypervisor and Kata. It is distinct from an agent framework or a sandbox-service API.",
        "dateNote": "Uses the official v0.1.0 pre-release timestamp. The project was already public in May 2019; this is not the first announcement or a stable release."
      }
    },
    {
      "id": "scaling-laws",
      "date": "2020-01-23",
      "name": "Neural Scaling Laws",
      "company": "openai",
      "category": "methods",
      "kind": "paper",
      "summary": "系统研究语言模型性能与参数量、数据量及计算预算的关系。",
      "details": "论文给出特定实验范围内的经验规律，为模型规模与训练预算的分配提供依据。这些关系受数据与训练设置影响。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2001.08361"
        }
      ],
      "en": {
        "summary": "A systematic study relates language-model performance to model size, data, and compute.",
        "details": "The paper derives empirical relationships within its experimental setting, informing how model size and training compute can be allocated. The relationships depend on data and training conditions.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "deepspeed",
      "date": "2020-02-13",
      "name": "DeepSpeed · ZeRO",
      "company": "microsoft",
      "category": "frameworks",
      "kind": "release",
      "summary": "通过分片优化器状态等方式，降低分布式训练的显存占用。",
      "details": "Microsoft 在 Turing-NLG 公告中介绍 DeepSpeed 与 ZeRO，支持超出单卡内存容量的大模型训练。",
      "dateNote": "采用官方文章页面显示的发布日期。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://www.microsoft.com/en-us/research/blog/turing-nlg-a-17-billion-parameter-language-model-by-microsoft/"
        }
      ],
      "en": {
        "summary": "Partitioning optimizer state and other training data reduces distributed-training memory use.",
        "details": "Microsoft introduces DeepSpeed and ZeRO alongside Turing-NLG, supporting models whose training state exceeds a single accelerator’s memory.",
        "dateNote": "Dated to the publication date displayed on the official article."
      }
    },
    {
      "id": "rag",
      "date": "2020-05-22",
      "name": "RAG",
      "company": "meta",
      "category": "methods",
      "kind": "paper",
      "summary": "把外部文档检索与文本生成结合，用检索结果补充模型知识。",
      "details": "论文将参数化模型与可检索文档库结合，并在知识密集型任务中评估效果。检索库可以独立于模型参数更新。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2005.11401"
        }
      ],
      "en": {
        "summary": "Document retrieval supplies external knowledge to a text-generation model.",
        "details": "The paper combines a parametric model with a retrievable document collection and evaluates knowledge-intensive tasks. The retrieved knowledge can be updated independently of model parameters.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "ddpm",
      "date": "2020-06-19",
      "name": "DDPM",
      "company": "berkeley",
      "category": "methods",
      "kind": "paper",
      "summary": "通过逐步去噪训练生成模型，推动扩散模型的图像生成研究。",
      "details": "Denoising Diffusion Probabilistic Models 学习逆转逐步加噪过程，从噪声生成图像，并把扩散建模与去噪目标联系起来。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2006.11239"
        }
      ],
      "en": {
        "summary": "Iterative denoising provides a training approach for diffusion-based image generation.",
        "details": "Denoising Diffusion Probabilistic Models learn to reverse a gradual noising process, generating images from noise and connecting diffusion modeling to denoising objectives.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "cann-3",
      "date": "2020-08-10",
      "name": "CANN 3.0",
      "company": "huawei",
      "category": "frameworks",
      "kind": "release",
      "summary": "升级昇腾计算的软件栈，覆盖算子开发、模型编译与运行。",
      "details": "华为同时公布 CANN 3.0、MindStudio 与 MindX，完善昇腾平台从开发到部署的工具支持。该节点记录这一代软件平台发布。",
      "dateNote": "",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://www.huawei.com/cn/news/2020/8/huawei-hai-ascend/"
        }
      ],
      "en": {
        "summary": "An updated Ascend software stack covers operator development, model compilation, and execution.",
        "details": "Huawei announces CANN 3.0 together with MindStudio and MindX, extending development and deployment tooling for Ascend. This entry records that software-platform release.",
        "dateNote": ""
      }
    },
    {
      "id": "vit",
      "date": "2020-10-22",
      "name": "Vision Transformer",
      "company": "google",
      "category": "methods",
      "kind": "paper",
      "summary": "把图像切分为 patch 序列，直接使用 Transformer 进行视觉学习。",
      "details": "ViT 将图像块映射为 token，在充分预训练后完成图像识别，展示 Transformer 在视觉任务中的适用性。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2010.11929"
        }
      ],
      "en": {
        "summary": "Images become sequences of patches for Transformer-based visual learning.",
        "details": "ViT embeds image patches as tokens and performs image recognition after substantial pretraining, demonstrating Transformer’s applicability to vision.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "rope",
      "date": "2021-04-20",
      "name": "RoPE · RoFormer",
      "company": "zhuiyi",
      "category": "methods",
      "kind": "paper",
      "summary": "通过旋转变换将位置信息编码到注意力计算中。",
      "details": "RoFormer 论文提出旋转位置编码，使注意力能表达相对位置关系，后被多个语言模型采用。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/2104.09864",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Rotations encode position within attention computation.",
        "details": "RoFormer introduces rotary position embeddings, expressing relative-position relationships in attention and informing later language models.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "lora",
      "date": "2021-06-17",
      "name": "LoRA",
      "company": "microsoft",
      "category": "methods",
      "kind": "paper",
      "summary": "冻结基础权重，只训练低秩适配矩阵，降低模型微调成本。",
      "details": "LoRA 把权重更新表示为低秩矩阵乘积，减少可训练参数与优化器状态。适配参数可以与基础模型权重分开保存。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2106.09685"
        }
      ],
      "en": {
        "summary": "Frozen base weights and trainable low-rank matrices reduce the cost of model adaptation.",
        "details": "LoRA represents weight updates as products of low-rank matrices, reducing trainable parameters and optimizer state. Adaptation parameters can be stored separately from the base model.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "triton-1",
      "date": "2021-07-28",
      "name": "Triton 1.0",
      "company": "openai",
      "category": "frameworks",
      "kind": "release",
      "summary": "用接近 Python 的语言编写 GPU 内核，并由编译器处理底层优化。",
      "details": "OpenAI 发布 Triton 1.0，降低研究者编写高效 GPU 程序的门槛。该项目是 GPU 编程语言与编译器，与 NVIDIA Triton 推理服务器不同。",
      "dateNote": "采用 1.0 官方发布日；Triton 的早期研究论文发表于 2019 年。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://openai.com/index/triton/"
        }
      ],
      "en": {
        "summary": "A Python-like language and compiler simplify the development of optimized GPU kernels.",
        "details": "OpenAI releases Triton 1.0 to make efficient GPU programming more accessible. This language and compiler is distinct from NVIDIA’s Triton Inference Server.",
        "dateNote": "Dated to the official 1.0 release. The earlier Triton research paper appeared in 2019."
      }
    },
    {
      "id": "latent-diffusion",
      "date": "2021-12-20",
      "name": "Latent Diffusion",
      "company": "compvis",
      "category": "methods",
      "kind": "paper",
      "summary": "在压缩后的潜在空间执行扩散，降低高分辨率图像生成的成本。",
      "details": "将感知压缩与生成过程分开，并通过交叉注意力接收条件输入；属于后续潜在扩散系统的方法基础。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/2112.10752",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Diffusion in a compressed latent space reduces the cost of high-resolution image generation.",
        "details": "Perceptual compression is separated from generation, with cross-attention for conditioning, forming a methodological basis for later latent-diffusion systems.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "chain-of-thought",
      "date": "2022-01-28",
      "name": "Chain-of-Thought Prompting",
      "company": "google",
      "category": "methods",
      "kind": "paper",
      "summary": "在示例中加入中间推理步骤，改善语言模型的多步任务表现。",
      "details": "记录 Wei 等人的思维链提示论文。它是一种提示方法，与后续通过训练获得的推理模型分开。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/2201.11903",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Intermediate reasoning steps in examples improve multi-step language-model tasks.",
        "details": "Records Wei et al.’s chain-of-thought prompting paper, a prompting method distinct from later trained reasoning models.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "self-consistency",
      "date": "2022-03-21",
      "name": "Self-Consistency",
      "company": "google",
      "category": "methods",
      "kind": "paper",
      "summary": "采样多条推理路径，再聚合答案以提高推理稳定性。",
      "details": "该方法扩展思维链解码，用额外推理计算替代单一路径的贪心选择。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/2203.11171",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Multiple sampled reasoning paths are aggregated to improve answer consistency.",
        "details": "The method extends chain-of-thought decoding, using additional inference computation instead of one greedy path.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "chinchilla",
      "date": "2022-03-29",
      "name": "Chinchilla · Compute-optimal Training",
      "company": "google",
      "category": "methods",
      "kind": "paper",
      "summary": "在固定训练计算预算下，重新评估模型参数与训练数据的比例。",
      "details": "DeepMind 的研究表明，实验中的计算最优训练应共同扩展参数量与训练 tokens，为数据充分训练提供依据。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2203.15556"
        }
      ],
      "en": {
        "summary": "A fixed training-compute budget motivates a different balance of model size and data.",
        "details": "DeepMind’s experiments find that compute-optimal training scales model parameters and training tokens together, emphasizing adequate data for a chosen model size.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "flashattention",
      "date": "2022-05-27",
      "name": "FlashAttention",
      "company": "flashattention",
      "category": "deployment",
      "kind": "paper",
      "summary": "减少高带宽显存与片上存储之间的数据搬运，加速精确注意力计算。",
      "details": "FlashAttention 通过分块与重计算减少注意力计算的中间存储。它优化执行方式，同时保持精确注意力的语义。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2205.14135"
        }
      ],
      "en": {
        "summary": "Reduced data movement between GPU memory and on-chip storage accelerates exact attention.",
        "details": "FlashAttention uses tiling and recomputation to avoid storing large intermediate attention matrices, improving execution while preserving exact-attention semantics.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "flow-matching",
      "date": "2022-10-06",
      "name": "Flow Matching",
      "company": "meta",
      "category": "methods",
      "kind": "paper",
      "summary": "通过学习条件概率路径的向量场，训练连续流生成模型。",
      "details": "Flow Matching 提供无需在训练中模拟完整流轨迹的目标，成为图像等生成任务的一条主要技术路线。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/2210.02747",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Vector fields along conditional probability paths train continuous-flow generative models.",
        "details": "Flow Matching trains without simulating full flow trajectories and develops into a major approach for image and other generative tasks.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "gptq",
      "date": "2022-10-31",
      "name": "GPTQ",
      "company": "ista",
      "category": "deployment",
      "kind": "paper",
      "summary": "利用近似二阶信息进行训练后权重量化，降低大模型推理内存需求。",
      "details": "论文研究在较低精度下保存生成式 Transformer 权重；量化位宽不等同于全部计算都使用相同精度。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/2210.17323",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Approximate second-order information supports post-training weight quantization for lower-memory inference.",
        "details": "The paper studies low-bit storage of generative Transformer weights. Weight bit width does not imply identical precision for every operation.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "speculative-decoding",
      "date": "2022-11-30",
      "name": "Speculative Decoding",
      "company": "google",
      "category": "deployment",
      "kind": "paper",
      "summary": "由小模型起草、目标模型验证，在保持目标分布的同时加速生成。",
      "details": "记录 Leviathan 等人的精确采样算法论文；投机执行和并行解码存在相关及同期研究，完整作者与技术范围见原文。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/2211.17192",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": true,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "A small model drafts tokens and a target model verifies them, accelerating generation while preserving the target distribution.",
        "details": "Records Leviathan et al.’s exact-sampling algorithm. Related and concurrent work exists on speculation and parallel decoding; attribution and scope follow the paper.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "mlx",
      "date": "2023",
      "name": "MLX",
      "company": "apple",
      "category": "frameworks",
      "kind": "release",
      "summary": "为 Apple 芯片提供支持自动求导与统一内存的数组计算框架。",
      "details": "MLX 提供 Python 与 C++ 接口，支持函数变换和延迟计算。数组可在 CPU 与 GPU 运算中使用统一内存。",
      "dateNote": "官方项目引用信息标注 2023 年；本站不推定准确月日。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://github.com/ml-explore/mlx/blob/main/README.md"
        }
      ],
      "en": {
        "summary": "An array framework brings automatic differentiation and unified-memory execution to Apple silicon.",
        "details": "MLX offers Python and C++ interfaces, function transformations, and lazy computation. Arrays use unified memory across CPU and GPU operations.",
        "dateNote": "The official project citation specifies 2023; no precise launch day is inferred."
      }
    },
    {
      "id": "llama-cpp",
      "date": "2023-03-10",
      "name": "llama.cpp",
      "company": "ggml",
      "category": "deployment",
      "kind": "release",
      "summary": "用 C/C++ 在本地设备运行 LLaMA，并支持量化推理。",
      "details": "项目从轻量本地推理出发，围绕 ggml 张量计算实现模型执行。这里记录代码仓库的 Initial release 提交。",
      "dateNote": "日期取自官方代码仓库首个发布提交，不等同于后续软件包版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://github.com/ggml-org/llama.cpp/commit/26c0846"
        }
      ],
      "en": {
        "summary": "A C/C++ implementation runs LLaMA locally with quantized inference.",
        "details": "The project builds lightweight local model execution on ggml tensor computation. This entry records the repository’s initial release commit.",
        "dateNote": "Dated to the initial release commit in the official repository, rather than a later packaged version."
      }
    },
    {
      "id": "pytorch-2",
      "date": "2023-03-15",
      "name": "PyTorch 2.0",
      "company": "pytorch",
      "category": "frameworks",
      "kind": "release",
      "summary": "引入 torch.compile，在保留现有开发方式的同时增加编译加速。",
      "details": "TorchDynamo、AOTAutograd 与 TorchInductor 构成新的编译路径，为模型训练和推理提供优化，同时保留 eager 模式。",
      "dateNote": "",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://pytorch.org/blog/pytorch-2-0-release/"
        }
      ],
      "en": {
        "summary": "torch.compile adds compilation-based acceleration to the established PyTorch workflow.",
        "details": "TorchDynamo, AOTAutograd, and TorchInductor form a new compilation path for training and inference while eager execution remains available.",
        "dateNote": ""
      }
    },
    {
      "id": "gqa",
      "date": "2023-05-22",
      "name": "Grouped-Query Attention · GQA",
      "company": "google",
      "category": "methods",
      "kind": "paper",
      "summary": "多个查询头共享键值头，在注意力质量与 KV 缓存成本之间折中。",
      "details": "GQA 位于多头注意力与单组 Multi-Query Attention 之间，并研究从多头模型转换的方法。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/2305.13245",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Groups of query heads share key-value heads to balance quality and KV-cache cost.",
        "details": "GQA lies between multi-head and multi-query attention and includes a method for converting multi-head checkpoints.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "qlora",
      "date": "2023-05-23",
      "name": "QLoRA",
      "company": "washington",
      "category": "methods",
      "kind": "paper",
      "summary": "将低比特量化与低秩适配结合，降低大模型微调的显存需求。",
      "details": "QLoRA 在冻结的量化基础模型上训练适配参数，并提出 NF4、双重量化与分页优化器等技术。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2305.14314"
        }
      ],
      "en": {
        "summary": "Low-bit quantization and low-rank adaptation reduce memory requirements for model fine-tuning.",
        "details": "QLoRA trains adapters through a frozen, quantized base model using NF4, double quantization, and paged optimizers.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "dpo",
      "date": "2023-05-29",
      "name": "DPO",
      "company": "stanford",
      "category": "methods",
      "kind": "paper",
      "summary": "直接利用偏好数据优化语言模型，简化偏好对齐流程。",
      "details": "Direct Preference Optimization 从奖励建模目标推导出直接优化形式，不需要在训练循环中单独拟合奖励模型并进行在线强化学习。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2305.18290"
        }
      ],
      "en": {
        "summary": "Direct optimization on preference data simplifies language-model alignment.",
        "details": "Direct Preference Optimization derives a direct objective from preference-based reward modeling, avoiding a separately fitted reward model and an online reinforcement-learning loop.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "awq",
      "date": "2023-06-01",
      "name": "AWQ",
      "company": "mit",
      "category": "deployment",
      "kind": "paper",
      "summary": "参考激活分布保护关键权重，支持低比特模型部署。",
      "details": "AWQ 面向权重量化，并结合部署实现降低推理内存需求；不要求对全部模型参数重新训练。",
      "sources": [
        {
          "url": "https://arxiv.org/abs/2306.00978",
          "title": "原始论文 · arXiv",
          "titleEn": "Original paper · arXiv"
        }
      ],
      "tags": [],
      "milestone": false,
      "dateNote": "采用所列论文在 arXiv 的首个公开版本日期；不等同于更早相关概念或后续软件的首发日期。",
      "en": {
        "summary": "Activation statistics protect salient weights for low-bit model deployment.",
        "details": "AWQ targets weight-only quantization and practical deployment to reduce inference memory, without full-model retraining.",
        "dateNote": "Uses the cited paper’s first public arXiv version, not earlier related ideas or later software releases."
      }
    },
    {
      "id": "vllm",
      "date": "2023-06-20",
      "name": "vLLM · PagedAttention",
      "company": "vllm",
      "category": "deployment",
      "kind": "release",
      "summary": "通过分页管理 KV 缓存，改善语言模型推理服务的内存利用率。",
      "details": "vLLM 的公开发布将 PagedAttention 与推理服务系统结合，减少缓存浪费并支持请求之间的高效调度。",
      "dateNote": "",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://blog.vllm.ai/2023/06/20/vllm.html"
        }
      ],
      "en": {
        "summary": "Paged KV-cache management improves memory utilization in language-model serving.",
        "details": "The public vLLM release combines PagedAttention with a serving system to reduce cache waste and schedule requests more efficiently.",
        "dateNote": ""
      }
    },
    {
      "id": "flashattention-2",
      "date": "2023-07-17",
      "name": "FlashAttention-2",
      "company": "flashattention",
      "category": "deployment",
      "kind": "paper",
      "summary": "调整注意力计算的工作分配，提高 GPU 并行执行效率。",
      "details": "第二代方法减少非矩阵乘法操作，并优化线程块与 warp 之间的分工，进一步改善精确注意力的实现效率。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2307.08691"
        }
      ],
      "en": {
        "summary": "Revised work partitioning improves GPU parallelism for attention computation.",
        "details": "The second version reduces non-matrix-multiplication work and improves how computation is divided across thread blocks and warps.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "tensorrt-llm",
      "date": "2023-10-19",
      "name": "TensorRT-LLM",
      "company": "nvidia",
      "category": "deployment",
      "kind": "release",
      "summary": "面向 NVIDIA GPU 的大模型推理库向所有开发者公开。",
      "details": "TensorRT-LLM 结合编译、优化内核、张量并行与批处理，提供 Python 接口来定义和运行模型。",
      "dateNote": "采用官方文章注明的 10 月 19 日全面公开日期；该文章早于此日首次发布。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://developer.nvidia.com/blog/nvidia-tensorrt-llm-supercharges-large-language-model-inference-on-nvidia-h100-gpus/"
        }
      ],
      "en": {
        "summary": "An inference library for large language models on NVIDIA GPUs becomes publicly available.",
        "details": "TensorRT-LLM combines compilation, optimized kernels, tensor parallelism, and batching with a Python interface for defining and executing models.",
        "dateNote": "Dated to the October 19 public availability noted in the official article, which was initially published earlier."
      }
    },
    {
      "id": "mamba",
      "date": "2023-12-01",
      "name": "Mamba",
      "company": "state-spaces",
      "category": "methods",
      "kind": "paper",
      "summary": "以选择性状态空间模型处理序列，探索注意力之外的建模方式。",
      "details": "Mamba 让状态空间参数随输入变化，并采用面向硬件的执行算法，在序列长度方向实现线性扩展。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2312.00752"
        }
      ],
      "en": {
        "summary": "Selective state-space models offer an alternative approach to sequence modeling.",
        "details": "Mamba makes state-space parameters depend on the input and uses a hardware-aware execution algorithm with linear scaling in sequence length.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "sglang",
      "date": "2023-12-12",
      "name": "SGLang",
      "company": "sglang",
      "category": "deployment",
      "kind": "paper",
      "summary": "把结构化生成程序与运行时结合，复用前缀计算与缓存。",
      "details": "SGLang 提供生成程序接口，并在运行时使用 RadixAttention 等机制管理共享前缀。该节点记录系统论文首次公开。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2312.07104"
        }
      ],
      "en": {
        "summary": "A structured generation language and runtime reuse prefix computation and cached state.",
        "details": "SGLang combines a generation-program interface with runtime mechanisms such as RadixAttention for shared prefixes. This entry records the system paper’s first public version.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "grpo",
      "date": "2024-02-05",
      "name": "GRPO · DeepSeekMath",
      "company": "deepseek",
      "category": "methods",
      "kind": "paper",
      "summary": "用组内相对奖励估计优势，减少强化学习训练对独立价值模型的依赖。",
      "details": "DeepSeekMath 论文提出 Group Relative Policy Optimization，并用于数学推理训练。这里记录算法论文，具体模型发布保留在大模型页。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2402.03300"
        }
      ],
      "en": {
        "summary": "Group-relative rewards estimate advantages without a separate value model.",
        "details": "The DeepSeekMath paper introduces Group Relative Policy Optimization for mathematical reasoning. This entry records the method; model releases belong on the LLM timeline.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "e2b-code-interpreter",
      "date": "2024-05-06",
      "name": "E2B Code Interpreter SDK",
      "company": "e2b",
      "category": "infrastructure",
      "kind": "release",
      "summary": "将隔离代码执行封装为 SDK，供智能体运行生成的程序并读取执行结果。",
      "details": "E2B 将代码运行、文件与结果交互放入沙箱接口，支持多种模型与智能体框架。Code Interpreter SDK 是沙箱基础设施进入智能体应用的一种代表性开发接口；底层隔离技术与上层智能体工具分别记录。",
      "dateNote": "采用 Code Interpreter SDK 发布文章的 5 月 6 日，不能视作 E2B 公司成立或其首个 SDK 的发布时间。",
      "sources": [
        {
          "title": "E2B · Code Interpreter SDK 发布",
          "url": "https://e2b.dev/resources/launching-the-code-interpreter-sdk"
        },
        {
          "title": "E2B · 公开代码",
          "url": "https://github.com/e2b-dev/code-interpreter",
          "titleEn": "E2B · Source repository"
        }
      ],
      "en": {
        "summary": "Packages isolated code execution into an SDK so agents can run generated programs and inspect their results.",
        "details": "E2B exposes sandboxed code execution, files, and results through an interface usable with multiple models and agent frameworks. Its Code Interpreter SDK represents the developer-facing sandbox layer, separate from underlying isolation technology and end-user agents.",
        "dateNote": "Uses May 6 from the Code Interpreter SDK launch article, not E2B’s founding or first SDK release."
      },
      "tags": [],
      "milestone": false
    },
    {
      "id": "mla",
      "date": "2024-05-07",
      "name": "MLA · DeepSeek-V2",
      "company": "deepseek",
      "category": "methods",
      "kind": "paper",
      "summary": "以低秩联合压缩减少注意力中的 KV 缓存需求。",
      "details": "Multi-head Latent Attention 在压缩的潜在表示中缓存键值信息。该技术与 DeepSeek-V2 的专家架构共同面向高效训练和推理。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": true,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2405.04434"
        }
      ],
      "en": {
        "summary": "Low-rank joint compression reduces the KV-cache requirements of attention.",
        "details": "Multi-head Latent Attention caches key-value information in compressed latent representations. It accompanies the expert architecture in DeepSeek-V2 to improve training and inference efficiency.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "flashattention-3",
      "date": "2024-07-11",
      "name": "FlashAttention-3",
      "company": "flashattention",
      "category": "deployment",
      "kind": "paper",
      "summary": "围绕 Hopper GPU 的异步执行与低精度能力优化注意力内核。",
      "details": "第三代方法协同安排数据传输与计算，利用 Hopper 的硬件机制提升注意力执行效率。性能取决于硬件、精度和序列设置。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2407.08608"
        }
      ],
      "en": {
        "summary": "Attention kernels are redesigned around Hopper GPUs’ asynchronous execution and low-precision features.",
        "details": "The third version coordinates data movement and computation using Hopper-specific hardware features. Results depend on hardware, precision, and sequence configuration.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    },
    {
      "id": "vllm-v1",
      "date": "2025-01-27",
      "name": "vLLM V1",
      "company": "vllm",
      "category": "deployment",
      "kind": "preview",
      "summary": "重构推理核心，简化调度并改进前缀缓存与执行效率。",
      "details": "V1 是 vLLM 新一代执行架构的名称，公开时为 alpha 阶段。它重新组织调度、模型执行与缓存管理。",
      "dateNote": "采用 V1 alpha 公告日期，不表示 vLLM 软件版本号已达到 1.0。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://blog.vllm.ai/2025/01/27/v1-alpha-release.html"
        }
      ],
      "en": {
        "summary": "A rebuilt inference core simplifies scheduling and improves prefix caching and execution.",
        "details": "V1 names a new vLLM execution architecture, introduced in alpha. It reorganizes scheduling, model execution, and cache management.",
        "dateNote": "Dated to the V1 alpha announcement; this is not a claim that the package reached version 1.0."
      }
    },
    {
      "id": "nvidia-dynamo",
      "date": "2025-03-18",
      "name": "NVIDIA Dynamo",
      "company": "nvidia",
      "category": "deployment",
      "kind": "announcement",
      "summary": "面向多 GPU 推理的开源框架，协调分布式模型服务。",
      "details": "NVIDIA 随 Blackwell Ultra 公布 Dynamo，将大规模推理的调度与资源协调组织为软件框架。此节点记录首次公告。",
      "dateNote": "",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://nvidianews.nvidia.com/news/nvidia-blackwell-ultra-ai-factory-platform-paves-way-for-age-of-ai-reasoning"
        }
      ],
      "en": {
        "summary": "An open-source framework coordinates distributed model serving across GPUs.",
        "details": "NVIDIA announces Dynamo alongside Blackwell Ultra, providing a software framework for scheduling and resource coordination in large-scale inference. This entry records the announcement.",
        "dateNote": ""
      }
    },
    {
      "id": "rocm-7",
      "date": "2025-06-12",
      "name": "ROCm 7",
      "company": "amd",
      "category": "frameworks",
      "kind": "preview",
      "summary": "AMD 公布 ROCm 7 预览，更新面向 Instinct 加速器的软件支持。",
      "details": "ROCm 提供 GPU 计算所需的编译器、运行时与库。第七代预览随 MI350 系列公布，面向训练与推理软件栈的升级。",
      "dateNote": "采用官方预览公告日期，不等同于后续稳定版供应日期。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://www.amd.com/en/blogs/2025/amd-instinct-mi350-series-and-beyond-accelerating-the-future-of-ai-and-hpc.html"
        }
      ],
      "en": {
        "summary": "AMD previews ROCm 7 with updated software support for Instinct accelerators.",
        "details": "ROCm provides compilers, runtimes, and libraries for GPU computing. Its seventh-generation preview accompanies MI350 and updates the training and inference software stack.",
        "dateNote": "Dated to the official preview announcement rather than later stable availability."
      }
    },
    {
      "id": "flashattention-4",
      "date": "2026-03-05",
      "name": "FlashAttention-4",
      "company": "flashattention",
      "category": "deployment",
      "kind": "paper",
      "summary": "联合设计算法与内核流水线，适配 Blackwell 的计算和带宽特征。",
      "details": "第四代研究针对不同硬件单元性能扩展不均衡的问题，重新安排注意力计算与执行流水线，减少新的性能瓶颈。",
      "dateNote": "日期采用 arXiv 首个公开版本。",
      "tags": [],
      "milestone": false,
      "sources": [
        {
          "title": "原始资料",
          "url": "https://arxiv.org/abs/2603.05451"
        }
      ],
      "en": {
        "summary": "Algorithm and kernel-pipeline co-design adapts attention to Blackwell’s compute and bandwidth characteristics.",
        "details": "The fourth version responds to uneven performance scaling across hardware units by redesigning attention computation and execution pipelines to reduce emerging bottlenecks.",
        "dateNote": "Dated to the first public version on arXiv."
      }
    }
  ]
};
  // One canonical Transformer record, shared with the LLM timeline.
  const transformer = window.MODEL_ATLAS.releases.find(entry => entry.id === 'transformer');
  data.releases.push({ ...transformer, category: 'methods', en: window.MODEL_ATLAS_EN.transformer });
  data.releases.sort((a, b) => a.date.localeCompare(b.date));
  window.TECHNOLOGY_ATLAS = data;
})();
