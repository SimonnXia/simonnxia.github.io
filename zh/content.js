// 中文个人资料与项目概述；英文原版独立保留。
export const profile = {
  "name": "夏琛沣",
  "email": "sx1224@ic.ac.uk",
  "emailPlaceholder": "请输入邮箱地址"
};
export const projects = {
  "moduframe": {
    "title": "MODUFRAME",
    "category": "可持续设计工程 / 航空座椅 · 2025.09—12",
    "image": "/assets/moduframe-renders/moduframe-front-render.webp",
    "imageStyle": "case-studio",
    "imageWidth": 1086,
    "imageHeight": 1448,
    "alt": "MODUFRAME 航空座椅概念，采用 X 形铝合金支架、灰色软包与深蓝扶手",
    "imageCaption": "座椅系统的前后视图。基于 SDE 原始图纸制作的 AI 辅助概念效果图。",
    "companionImage": {
      "src": "/assets/moduframe-renders/moduframe-rear-render.webp",
      "alt": "MODUFRAME 后视效果图，展示独立餐桌板、电源及储物配件",
      "label": "后部 / 服务模块"
    },
    "description": "航空座椅中的不同材料与零件寿命差异很大，维修与报废后的材料分离因此变得复杂。MODUFRAME 以耐用铝合金骨架为基础，将舒适层与服务配件设计为可独立拆换的模块。项目在团队前期研究基础上，由我完成个人方案，逐步推进需求定义、生命周期梳理、模块化 CAD 与材料评估。",
    "focusLabel": "我的职责",
    "focus": "个人概念设计、模块化 CAD、材料选择与循环性评估",
    "contextLabel": "项目背景",
    "context": "帝国理工学院 · DE2 可持续设计工程 · 基于团队研究的个人设计",
    "highlights": [
      {
        "title": "区分零件的使用寿命",
        "text": "以 6061 铝合金骨架承载可更换的座盆、靠背、坐垫与扶手表层，让不同寿命的部件分别维护。"
      },
      {
        "title": "围绕维修组织结构",
        "text": "采用机械连接与独立配件，支持按部件清洁、维修与升级。"
      },
      {
        "title": "用分析检验材料选择",
        "text": "通过质量加权材料循环性指标与 Ansys Granta EduPack Eco Audit，识别材料影响及回收环节的改进重点。"
      }
    ],
    "gallery": [
      {
        "src": "/assets/moduframe-renders/moduframe-rear-render.webp",
        "alt": "MODUFRAME 后部概念效果图，展示餐桌板、电源和储物模块",
        "caption": "后部配件被组织为可独立更换的服务模块。",
        "style": "product-cutout"
      },
      {
        "src": "/assets/moduframe-renders/primary-frame-front-render.webp",
        "alt": "三联座椅主骨架概念效果图，展示穿孔座盆",
        "caption": "基于原始 CAD 研究呈现的长寿命主骨架。",
        "style": "technical-detail"
      }
    ],
    "credit": "个人设计：夏琛沣；前期调研由团队共同完成。写实图片为基于 SDE 图纸生成的 AI 辅助概念效果图，并非实物或试验照片。系统图、连接细节与评估图表来自原始提交材料。交互模型依据效果图重建，用于形态展示，不是源 CAD。质量与循环性数据为概念估算；本项目尚未进行实物验证或航空安全认证。"
  },
  "axispro": {
    "title": "AxisPro",
    "category": "产品工程 · 2025.09—2026.03",
    "image": "/assets/projects/axispro-studio.webp",
    "imageStyle": "case-studio",
    "alt": "AxisPro 工作站效果图，展示升降立柱、模型夹具与实体控制面板",
    "imageCaption": "AxisPro 最终产品形态的工作室效果图。",
    "description": "微缩模型涂装通常需要长时间保持姿势、反复调整手部位置，并受桌面空间限制。AxisPro 是一项四人团队设计，将高度调节、俯仰、旋转与模型夹持整合在一台电动工作站中。团队通过用户调研、实体原型与人体工学测试，逐步确定结构布局及实体控制方式。我主要负责渲染、标签与五页用户指南，以及商业模式设计。",
    "focusLabel": "我的职责",
    "focus": "产品渲染、标签设计、五页用户指南与商业模式",
    "contextLabel": "项目背景",
    "context": "帝国理工学院 · 产品设计工程 · 四人团队项目",
    "highlights": [
      {
        "title": "适应使用者的姿势",
        "text": "团队通过人体尺寸测试确定立柱高度，并根据反馈减小结构深度，减少桌面占用。"
      },
      {
        "title": "让调节更直观",
        "text": "中央摇杆控制高度与旋转，旋转编码器控制俯仰；布局兼顾左利手和右利手使用者。"
      },
      {
        "title": "通过制作发现问题",
        "text": "团队采用丝杠实现自锁定位，并在原型测试后更换电机驱动器，改善噪声与运动顿挫。"
      }
    ],
    "gallery": [
      {
        "src": "/assets/projects/axispro-in-use.jpg",
        "alt": "使用者正在操作 AxisPro 工作原型进行涂装",
        "caption": "工作原型的实际使用场景：将模型调整到适合涂装的位置。",
        "style": "case-photo"
      },
      {
        "src": "/assets/projects/axispro-exploded.webp",
        "alt": "AxisPro 爆炸装配图，展示夹具、丝杠、立柱与控制面板",
        "caption": "爆炸装配图：机构、外壳与控制部件之间的关系。",
        "style": "product-cutout"
      }
    ],
    "credit": "团队成员：Aaron Xu、Aidan Ryder、Lucian Brand、夏琛沣。机构、电路及原型验证为团队成果；我的主要职责为商业模式、标签、五页用户指南与渲染。"
  },
  "stream-x": {
    "title": "STREAM X",
    "category": "汽车造型 / 热流体分析 · 2025.09—12",
    "image": "/assets/projects/stream-x-studio.webp",
    "imageStyle": "case-studio",
    "alt": "STREAM X 原始灰模，展示开放轮拱、连续车身与集成尾部导流通道",
    "imageCaption": "STREAM X 原始形态研究：将开放轮拱与后部导流通道整合于连续车身。",
    "description": "STREAM X 探索连续曲面与集成车顶通道如何引导气流。设计以低矮车头、连贯座舱曲面与收束尾部表达空气动力学意图，并在 ANSYS Fluent 中分析简化模型的压力分布、速度、阻力及尾流。项目由我独立完成，涵盖草图迭代、CAD 曲面建模与 CFD 分析。",
    "focusLabel": "我的职责",
    "focus": "独立完成造型迭代、CAD 建模与 CFD 分析",
    "contextLabel": "项目背景",
    "context": "帝国理工学院 · DE2 热流体：能源与设计",
    "highlights": [
      {
        "title": "将导流结构融入车身",
        "text": "方案从附加尾翼转向集成于车身的 C 形通道，使气流路径与整体造型共同发展。"
      },
      {
        "title": "把草图转化为分析几何",
        "text": "通过圆滑前缘、集成通道与连续纵向曲率，将造型草图推进为可用于仿真的简化模型。"
      },
      {
        "title": "从仿真中提炼改进方向",
        "text": "简化模型的模拟阻力系数为 0.345。下一轮迭代将重点改善尾部压力恢复与车身下缘流动分离；该数值不是经实车验证的性能。"
      }
    ],
    "gallery": [
      {
        "src": "/assets/projects/stream-x-road-rear.jpg",
        "alt": "银色 STREAM X 在海岸公路上的 AI 辅助概念效果图",
        "caption": "AI 辅助概念效果图：连贯车顶、后部通道与连续灯带。",
        "style": "case-photo"
      },
      {
        "src": "/assets/projects/stream-x-cfd.png",
        "alt": "简化 STREAM X 模型周围按压力着色的 CFD 流线",
        "caption": "按压力着色的 CFD 流线结果。",
        "style": "technical-detail"
      }
    ],
    "credit": "个人设计研究：夏琛沣。交互场景为简化形态展示，上方灰模为原始 CAD 渲染。仿真采用缩比简化模型，结果不能直接视为全尺寸实车性能。道路场景为 Vizcom AI 辅助概念效果图，不作为仿真证据。"
  },
  "the-path": {
    "title": "Jìng — The Path",
    "category": "空间设计 / 参与式设计 · 2025.04—06",
    "image": "/assets/projects/path-social-space.jpg",
    "imageStyle": "case-spatial",
    "alt": "Jìng — The Path 校园空间提案，展示 Queen’s Lawn 上的遮蔽结构、共享座椅与活动场景",
    "imageCaption": "校园情境中的空间提案：在 Queen’s Lawn 提供遮蔽、座椅与停留空间。",
    "description": "如何让 Queen’s Lawn 不只在晴天承载校园生活？Jìng 将曲线遮蔽结构、灵活座椅与学习、休息、交流空间结合起来。作为五人团队成员，我参与了这项校园空间设计项目。团队通过观察、访谈、实体原型与共创活动，形成兼顾社交联系与安静停留的低位路径方案。",
    "focusLabel": "团队方法",
    "focus": "用户研究、参与式设计、CAD、3D 打印与全尺寸纸板原型",
    "contextLabel": "项目背景",
    "context": "帝国理工学院 · Queen’s Lawn · 五人团队项目",
    "highlights": [
      {
        "title": "从日常校园生活出发",
        "text": "观察与访谈发现座椅不足、地面湿滑及季节性使用差异，进而明确遮蔽、舒适与灵活社交空间的设计需求。"
      },
      {
        "title": "在两种尺度上制作原型",
        "text": "团队用 3D 打印座椅与全尺寸纸板椅探索舒适性及组合方式，并通过泡沫、纸板场地模型比较抬高环道与低位路径。"
      },
      {
        "title": "让使用者参与决策",
        "text": "共创活动包含 11 名学生与 1 名教授，其中 8 人更偏好路径方案。反馈进一步影响了可拆座椅、地面铺装及排水设计。"
      }
    ],
    "gallery": [
      {
        "src": "/assets/projects/path-social-space.jpg",
        "alt": "Jìng 曲线遮蔽结构与共享座椅的近地 CAD 视图",
        "caption": "以 CAD 视图表达带遮蔽的共享空间。",
        "style": "spatial-detail"
      },
      {
        "src": "/assets/projects/path-structure.jpg",
        "alt": "包含滑梯与排水安排的曲线路径结构 CAD 研究",
        "caption": "将遮蔽、排水与互动设施共同纳入设计。",
        "style": "spatial-detail"
      },
      {
        "src": "/assets/projects/path-concept-sketch.jpg",
        "alt": "Jìng 早期概念的宽幅展示草图",
        "caption": "早期概念：穿过共享景观的连续路径。",
        "style": "wide-detail"
      },
      {
        "src": "/assets/projects/path-seating-prototype.jpg",
        "alt": "参与者在共创活动中操作 3D 打印模块化座椅",
        "caption": "通过实体模型测试模块化座椅的组合方式。",
        "style": "small-detail"
      }
    ],
    "credit": "团队成员：夏琛沣、Yuxuan Zhou、Cici Song、Ziqi Zhou、Simon Wang。此处展示的研究、座椅与空间原型为团队成果；完整场地结构仍为 CAD 提案，尚未建成。"
  },
  "simrest": {
    "title": "SIMREST Q2",
    "category": "产品外观 / CAD 设计 · 2026.07—08",
    "image": "/assets/process/simrest-raised-top.webp",
    "imageStyle": "case-bedside",
    "alt": "SIMREST Q2 床头产品概念，展示抬升的顶部充电区域与环形灯光",
    "imageCaption": "床头场景中的抬升式顶部方案。",
    "description": "在麒盛科技研发部实习期间，我参与 SIMREST Q2 的 CAD 设计与外观建模。项目通过圆形外壳、织物质感顶面、灯光反馈与实体控制，探索床头产品的紧凑布局。不同效果图比较顶部形态、底部设置方式与内部构件安排，帮助呈现外观方案及装配关系。",
    "focusLabel": "我的职责",
    "focus": "参与 CAD 设计与外观建模",
    "contextLabel": "项目背景",
    "context": "麒盛科技 Keeson · 研发部实习项目",
    "highlights": [
      {
        "title": "协调外观与功能布局",
        "text": "在紧凑外壳中研究充电区域、环形 LED、USB-C 接口、麦克风、扬声器与通风位置。"
      },
      {
        "title": "保持主界面的简洁",
        "text": "将细节设置放在底面，并比较滑块与按键方案，探索清晰的操作方式与状态表达。"
      },
      {
        "title": "细化形态与部件关系",
        "text": "通过平齐与抬升式顶部对比、分层装配图及尺寸图，推进外观与内部构件的配合研究。"
      }
    ],
    "gallery": [
      {
        "src": "/assets/projects/simrest-underside.jpg",
        "alt": "SIMREST Q2 底部布局，展示扬声器、通风孔与四组实体控制",
        "caption": "将细节控制放在底面，保持主表面简洁。",
        "style": "warm-detail"
      },
      {
        "src": "/assets/projects/simrest-exploded.jpg",
        "alt": "SIMREST Q2 爆炸图，展示顶部区域、外壳与内部构件",
        "caption": "研究外壳与各构件之间的装配关系。",
        "style": "dark-detail"
      }
    ],
    "credit": "麒盛科技研发实习项目；夏琛沣参与 CAD 设计与外观建模。图中为设计方案与构件布局表达，不代表本人独立完成整机研发，亦不构成量产、功能或临床效果验证。"
  }
};
