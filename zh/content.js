// 中文个人资料与项目概述；英文原版独立保留。
export const profile = {
  "name": "夏琛沣",
  "email": "sx1224@ic.ac.uk",
  "emailPlaceholder": "请输入邮箱地址"
};
export const projects = {
  "moduframe": {
    "title": "MODUFRAME",
    "category": "可持续设计 / 航空座椅 · 2025.09—12",
    "image": "/assets/moduframe-renders/moduframe-front-render.webp",
    "imageStyle": "case-studio",
    "imageWidth": 1086,
    "imageHeight": 1448,
    "alt": "MODUFRAME 航空座椅概念，采用 X 形铝合金支架、灰色软包与深蓝扶手",
    "imageCaption": "MODUFRAME 前后视图，基于 SDE 项目图纸制作的 AI 辅助概念效果图。",
    "companionImage": {
      "src": "/assets/moduframe-renders/moduframe-rear-render.webp",
      "alt": "MODUFRAME 后视效果图，展示独立餐桌板、电源及储物配件",
      "label": "背面 / 功能配件"
    },
    "description": "航空座椅的骨架、软包与配件使用寿命不同，但混合材料和复杂连接往往增加维修、拆解与回收的难度。MODUFRAME 将耐用铝合金骨架与可单独更换的坐垫、靠背及功能配件分开设计。我在团队前期调研的基础上独立完成概念方案，包括需求梳理、模块化 CAD 建模、材料选择与循环性评估。",
    "focusLabel": "我的职责",
    "focus": "概念设计、模块化 CAD 建模、材料选择与循环性评估",
    "contextLabel": "项目背景",
    "context": "帝国理工学院 · 二年级可持续设计工程课程 · 基于团队调研的个人方案",
    "highlights": [
      {
        "title": "按使用寿命划分模块",
        "text": "以 6061 铝合金骨架为基础，将座盆、靠背、坐垫与扶手表层设计为可更换部件。"
      },
      {
        "title": "减少局部维修的更换范围",
        "text": "通过可拆机械连接和独立配件，使清洁、维修与升级尽量集中在需要更换的部件上。"
      },
      {
        "title": "比较材料与回收方案",
        "text": "使用质量加权材料循环性指标（MCI）和 Ansys Granta EduPack Eco Audit，评估材料选择及报废处理方案。"
      }
    ],
    "gallery": [
      {
        "src": "/assets/moduframe-renders/moduframe-rear-render.webp",
        "alt": "MODUFRAME 后部概念效果图，展示餐桌板、电源和储物模块",
        "caption": "可单独更换的餐桌板、电源与储物配件。",
        "style": "product-cutout"
      },
      {
        "src": "/assets/moduframe-renders/primary-frame-front-render.webp",
        "alt": "三联座椅主骨架概念效果图，展示穿孔座盆",
        "caption": "主骨架概念效果图，基于项目原始图纸生成。",
        "style": "technical-detail"
      }
    ],
    "credit": "个人方案：夏琛沣；前期调研由团队共同完成。写实效果图基于 SDE 原始图纸，经 AI 辅助生成；系统图、连接图与评估图表来自原始项目材料。交互模型用于形态展示，并非源 CAD。质量和循环性数据为概念估算，尚未经实物测试或航空安全认证。"
  },
  "axispro": {
    "title": "AxisPro",
    "category": "产品工程 · 2025.09—2026.03",
    "image": "/assets/projects/axispro-studio.webp",
    "imageStyle": "case-studio",
    "alt": "AxisPro 电动涂装工作台效果图，展示升降立柱、模型夹具与实体控制面板",
    "imageCaption": "AxisPro 最终方案渲染图。",
    "description": "微缩模型涂装往往需要长时间保持固定姿势，并频繁调整模型的角度和位置。AxisPro 是四人团队开发的电动涂装工作台，将升降、俯仰、旋转与模型夹持集成在一起。团队通过用户调研、实体原型和人体工学测试调整机构与控制布局。我主要负责产品渲染、标签设计、五页用户指南及商业模式设计。",
    "focusLabel": "我的职责",
    "focus": "产品渲染、标签设计、五页用户指南与商业模式",
    "contextLabel": "项目背景",
    "context": "帝国理工学院 · 产品设计工程 · 四人团队项目",
    "highlights": [
      {
        "title": "根据使用姿势调整尺寸",
        "text": "团队通过不同身高使用者的测试确定立柱高度，并根据反馈缩减结构深度，减少桌面占用。"
      },
      {
        "title": "集中控制模型位置",
        "text": "中央摇杆控制高度与旋转，旋转编码器调节俯仰，布局兼顾左右手操作。"
      },
      {
        "title": "通过原型测试改进机构",
        "text": "团队采用具有自锁特性的丝杠，并在整机测试后更换电机驱动器，改善噪声和运动顿挫。"
      }
    ],
    "gallery": [
      {
        "src": "/assets/projects/axispro-in-use.jpg",
        "alt": "使用者正在操作 AxisPro 工作原型进行涂装",
        "caption": "使用者操作 AxisPro 原型进行微缩模型涂装。",
        "style": "case-photo"
      },
      {
        "src": "/assets/projects/axispro-exploded.webp",
        "alt": "AxisPro 爆炸装配图，展示夹具、丝杠、立柱与控制面板",
        "caption": "爆炸装配图：机构、外壳与控制部件之间的关系。",
        "style": "product-cutout"
      }
    ],
    "credit": "团队成员：Aaron Xu、Aidan Ryder、Lucian Brand、夏琛沣。机构、电路与原型测试为团队成果；我主要负责渲染、标签、五页用户指南及商业模式设计。"
  },
  "stream-x": {
    "title": "STREAM X",
    "category": "汽车造型 / CFD 分析 · 2025.09—12",
    "image": "/assets/projects/stream-x-studio.webp",
    "imageStyle": "case-studio",
    "alt": "STREAM X 原始灰模，展示开放轮拱、连续车身与集成尾部导流通道",
    "imageCaption": "原始 CAD 灰模：连续车身曲面、开放轮拱与尾部导流通道。",
    "description": "STREAM X 是一项结合汽车造型与流体仿真的个人项目。我从车身比例草图出发，设计低矮的车头、连续的座舱曲面和集成式车顶导流通道，并在 ANSYS Fluent 中分析简化模型的压力、速度、阻力与尾流。项目包括草图迭代、CAD 曲面建模、CFD 分析及后续优化方向的提出。",
    "focusLabel": "我的职责",
    "focus": "独立完成造型迭代、CAD 建模与 CFD 分析",
    "contextLabel": "项目背景",
    "context": "帝国理工学院 · 二年级热流体课程：能源与设计",
    "highlights": [
      {
        "title": "从外置尾翼到一体化通道",
        "text": "通过多轮草图比较，将独立尾翼改为融入车身的 C 形导流通道。"
      },
      {
        "title": "建立用于仿真的车身模型",
        "text": "细化圆滑车头、连续曲面与导流通道，并简化局部细节，为 CFD 分析准备几何模型。"
      },
      {
        "title": "根据流场确定优化重点",
        "text": "本次简化模型的模拟阻力系数为 0.345，分析显示尾部压力恢复和车身下缘流动分离仍有改进空间。"
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
    "credit": "个人项目：夏琛沣。灰模图来自原始 CAD；交互模型为简化的造型展示。CFD 采用缩比简化模型，结果不等同于全尺寸实车性能。道路场景为 Vizcom AI 辅助概念效果图。"
  },
  "the-path": {
    "title": "Jìng — The Path",
    "category": "校园空间 / 参与式设计 · 2025.04—06",
    "image": "/assets/projects/path-social-space.jpg",
    "imageStyle": "case-spatial",
    "alt": "Jìng — The Path 校园空间方案，展示 Queen’s Lawn 上的遮雨结构、共享座椅与活动场景",
    "imageCaption": "Queen’s Lawn 校园空间方案：遮雨设施、共享座椅与休憩区域。",
    "description": "Jìng — The Path 是五人团队围绕帝国理工学院 Queen’s Lawn 开展的公共空间设计。项目希望改善草坪在雨天和冬季的使用体验，增加学习、休息与交流的场所。团队通过现场观察、访谈、座椅原型及用户参与式设计活动，逐步形成由低位步道、曲面遮雨结构和模块化座椅组成的方案。",
    "focusLabel": "团队工作",
    "focus": "用户研究、参与式设计、CAD 建模、3D 打印与全尺寸纸板原型",
    "contextLabel": "项目背景",
    "context": "帝国理工学院 · Queen’s Lawn · 五人团队项目",
    "highlights": [
      {
        "title": "识别不同季节的使用问题",
        "text": "观察与访谈发现座椅不足、地面潮湿和季节性使用差异，由此明确遮雨、舒适性与空间灵活性的设计需求。"
      },
      {
        "title": "用不同尺度的原型测试方案",
        "text": "以 3D 打印和全尺寸纸板座椅研究组合方式与舒适性，再用泡沫、纸板场地模型比较高架环道和低位步道。"
      },
      {
        "title": "让用户反馈参与方案选择",
        "text": "设计活动共有 11 名学生和 1 名教授参与，其中 8 人更偏好低位步道。反馈也用于调整可拆座椅、铺装和排水方案。"
      }
    ],
    "gallery": [
      {
        "src": "/assets/projects/path-social-space.jpg",
        "alt": "Jìng 曲线遮雨结构与共享座椅的近地 CAD 视图",
        "caption": "共享座椅与曲面遮雨结构的 CAD 效果图。",
        "style": "spatial-detail"
      },
      {
        "src": "/assets/projects/path-structure.jpg",
        "alt": "包含滑梯与排水安排的曲线路径结构 CAD 研究",
        "caption": "将遮雨、排水、滑梯与攀爬功能纳入整体布局。",
        "style": "spatial-detail"
      },
      {
        "src": "/assets/projects/path-concept-sketch.jpg",
        "alt": "Jìng 早期概念的宽幅展示草图",
        "caption": "早期概念草图：连接座椅与公共空间的连续步道。",
        "style": "wide-detail"
      },
      {
        "src": "/assets/projects/path-seating-prototype.jpg",
        "alt": "参与者在参与式设计活动中操作 3D 打印模块化座椅",
        "caption": "参与者利用实体模型尝试不同的座椅组合。",
        "style": "small-detail"
      }
    ],
    "credit": "团队成员：夏琛沣、Yuxuan Zhou、Cici Song、Ziqi Zhou、Simon Wang。调研、座椅原型与空间设计均为团队成果；最终场地方案以 CAD 和效果图呈现，尚未建成。"
  },
  "simrest": {
    "title": "SIMREST Q2",
    "category": "产品外观 / CAD 设计 · 2026.07—08",
    "image": "/assets/process/simrest-raised-top.webp",
    "imageStyle": "case-bedside",
    "alt": "SIMREST Q2 床头产品概念，展示抬升的顶部充电区域与环形灯光",
    "imageCaption": "SIMREST Q2 顶部抬升方案的床头场景效果图。",
    "description": "在麒盛科技研发部实习期间，我参与了 SIMREST Q2 的 CAD 设计与外观建模。设计围绕圆形外壳、织物质感顶面、环形灯光和实体控制展开，比较不同顶部轮廓、底部操作布局及内部构件的装配方式。这里展示我的参与内容及相应的方案图。",
    "focusLabel": "我的职责",
    "focus": "参与 CAD 设计与外观建模",
    "contextLabel": "项目背景",
    "context": "麒盛科技 Keeson · 研发部实习项目",
    "highlights": [
      {
        "title": "协调外观与功能布局",
        "text": "在紧凑外壳中安排充电区域、环形 LED、USB-C 接口、麦克风、扬声器与通风孔。"
      },
      {
        "title": "比较两种操作方案",
        "text": "将设置控件集中在底面，比较滑块和按键的操作方式及状态指示。"
      },
      {
        "title": "细化外壳与装配关系",
        "text": "通过顶部轮廓对比、爆炸图和尺寸图，研究外观比例及各部件的配合。"
      }
    ],
    "gallery": [
      {
        "src": "/assets/projects/simrest-underside.jpg",
        "alt": "SIMREST Q2 底部布局，展示扬声器、通风孔与四组实体控制",
        "caption": "底部设置区：实体控件、扬声器与通风孔的布局。",
        "style": "warm-detail"
      },
      {
        "src": "/assets/projects/simrest-exploded.jpg",
        "alt": "SIMREST Q2 爆炸图，展示顶部区域、外壳与内部构件",
        "caption": "研究外壳与各构件之间的装配关系。",
        "style": "dark-detail"
      }
    ],
    "credit": "麒盛科技研发部实习项目，夏琛沣参与 CAD 设计与外观建模。所示图片为设计方案及构件布局，不代表独立完成整机研发，也不作为量产或功能验证结果。"
  }
};
