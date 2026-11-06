// 中文项目开发过程，图片与尺寸沿用原始材料。
export const projectProcesses = {
  "moduframe": {
    "title": "MODUFRAME",
    "intro": "从座椅维护和材料回收需求出发，完成模块划分、结构建模、材料比较与循环性评估。",
    "stages": [
      {
        "id": "system",
        "label": "需求分析",
        "title": "梳理座椅的全生命周期",
        "body": "航空座椅由多种材料组成，各部件的磨损速度也不同。团队先期调研重点分析材料分离、维修与回收的困难。我据此整理舒适性、可维修性、轻量化和回收要求，并通过系统图梳理采购、制造、使用、拆解及回收各阶段，作为个人方案的设计基础。",
        "images": [
          {
            "src": "/assets/process/moduframe-circular-system-map.png",
            "alt": "循环系统图：座椅从采购、制造到维护、拆解与材料回收的系统图。",
            "caption": "座椅从采购、制造到维护、拆解与材料回收的系统图。",
            "title": "循环系统图",
            "group": "",
            "kind": "drawing",
            "width": 2100,
            "height": 1485
          }
        ]
      },
      {
        "id": "structure",
        "label": "骨架结构",
        "title": "保留主骨架，单独更换部件",
        "body": "主骨架采用 6061 铝合金，由 X 形支架和横向导轨支撑可拆座盆。各模块通过机械连接装配，便于后续维护。下方效果图基于原始图纸经 AI 辅助生成，用于展示结构关系；连接细节另附原始 CAD 图。",
        "images": [
          {
            "src": "/assets/moduframe-renders/primary-frame-front-render.webp",
            "alt": "主骨架 · 正面：三个座位共用横向导轨和四组 X 形支架。（AI 辅助概念效果图）",
            "caption": "三个座位共用横向导轨和四组 X 形支架。",
            "title": "主骨架 · 正面",
            "group": "骨架视图",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/primary-frame-rear-render.webp",
            "alt": "主骨架 · 背面：靠背支撑轮廓及各模块的连接位置。（AI 辅助概念效果图）",
            "caption": "靠背支撑轮廓及各模块的连接位置。",
            "title": "主骨架 · 背面",
            "group": "骨架视图",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/primary-frame-side-render.webp",
            "alt": "主骨架 · 侧面：座盆、靠背支撑与底部骨架的侧视关系。（AI 辅助概念效果图）",
            "caption": "座盆、靠背支撑与底部骨架的侧视关系。",
            "title": "主骨架 · 侧面",
            "group": "骨架视图",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/x-leg-frame-render.webp",
            "alt": "X 形支架：通过内凹截面与开放结构，探索减少支架材料用量。（AI 辅助概念效果图）",
            "caption": "通过内凹截面与开放结构，探索减少支架材料用量。",
            "title": "X 形支架",
            "group": "部件与连接",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/seat-pan-render.webp",
            "alt": "可拆座盆：带孔的再生聚合物座盆，由两根导轨支撑。（AI 辅助概念效果图）",
            "caption": "带孔的再生聚合物座盆，由两根导轨支撑。",
            "title": "可拆座盆",
            "group": "部件与连接",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/modular-seat-joint-render.webp",
            "alt": "模块化导轨连接：座盆与共用骨架的配合及连接位置。（AI 辅助概念效果图）",
            "caption": "座盆与共用骨架的配合及连接位置。",
            "title": "模块化导轨连接",
            "group": "部件与连接",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/process/moduframe-quarter-turn-joint.png",
            "alt": "四分之一转连接件：原始 CAD 细节：四分之一转紧固件形成可拆连接。",
            "caption": "原始 CAD 细节：四分之一转紧固件形成可拆连接。",
            "title": "四分之一转连接件",
            "group": "部件与连接",
            "kind": "drawing",
            "width": 1128,
            "height": 1142
          }
        ]
      },
      {
        "id": "comfort",
        "label": "坐垫与靠背",
        "title": "将软包拆分为可更换的层",
        "body": "坐垫与靠背按材料寿命分层，采用可分别清洁、更换的 rPET 网布、TPU 与 E-TPU 部件。头枕和扶手也独立设计，以减少局部磨损时的更换范围。下方为基于原始图纸生成的 AI 辅助概念效果图。",
        "images": [
          {
            "src": "/assets/moduframe-renders/comfort-seat-front-render.webp",
            "alt": "舒适模块 · 正面：靠背、坐垫与扶手接触面分别设置。（AI 辅助概念效果图）",
            "caption": "靠背、坐垫与扶手接触面分别设置。",
            "title": "软包模块 · 正面",
            "group": "软包模块总成",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/comfort-seat-perspective-render.webp",
            "alt": "舒适模块 · 透视：从斜侧面查看软包形态与分层关系。（AI 辅助概念效果图）",
            "caption": "从斜侧面查看软包形态与分层关系。",
            "title": "软包模块 · 透视",
            "group": "软包模块总成",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/cushion-exploded-render.webp",
            "alt": "三层坐垫：网布表层、压力分散层与结构底板可分别更换。（AI 辅助概念效果图）",
            "caption": "网布表层、压力分散层与结构底板可分别更换。",
            "title": "三层坐垫",
            "group": "分层构造",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/backrest-exploded-render.webp",
            "alt": "靠背分层：网状背板与软垫面板分开设计。（AI 辅助概念效果图）",
            "caption": "网状背板与软垫面板分开设计。",
            "title": "靠背分层",
            "group": "分层构造",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/headrest-exploded-render.webp",
            "alt": "头枕分层：成形支撑板与可拆头枕软垫。（AI 辅助概念效果图）",
            "caption": "成形支撑板与可拆头枕软垫。",
            "title": "头枕分层",
            "group": "分层构造",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/armrest-support-render.webp",
            "alt": "扶手支撑：扶手支撑与上方可更换表层。（AI 辅助概念效果图）",
            "caption": "扶手支撑与上方可更换表层。",
            "title": "扶手支撑",
            "group": "扶手模块",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/armrest-cap-render.webp",
            "alt": "扶手表层：将易磨损的扶手接触面设计为可拆件。（AI 辅助概念效果图）",
            "caption": "将易磨损的扶手接触面设计为可拆件。",
            "title": "扶手面板",
            "group": "扶手模块",
            "kind": "render",
            "width": 1448,
            "height": 1086
          }
        ]
      },
      {
        "id": "accessories",
        "label": "功能配件",
        "title": "让餐桌、电源与储物件独立维护",
        "body": "餐桌板、电源和储物配件分别安装在座椅上，局部升级无需更换主骨架。其中，储物袋仍采用胶粘固定，拆解较为困难，是后续需要改进的连接方式。下方为 AI 辅助概念效果图。",
        "images": [
          {
            "src": "/assets/moduframe-renders/accessory-backrest-render.webp",
            "alt": "椅背配件总成：餐桌板、电源与储物件分别安装在椅背。（AI 辅助概念效果图）",
            "caption": "餐桌板、电源与储物件分别安装在椅背。",
            "title": "椅背配件总成",
            "group": "后部总成",
            "kind": "render",
            "width": 1086,
            "height": 1448
          },
          {
            "src": "/assets/moduframe-renders/storage-bag-render.webp",
            "alt": "储物袋：储物袋采用胶粘连接，后续需改进拆卸方式。（AI 辅助概念效果图）",
            "caption": "储物袋采用胶粘连接，后续需改进拆卸方式。",
            "title": "储物袋",
            "group": "后部总成",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/tray-table-render.webp",
            "alt": "可延伸餐桌板：餐桌板采用滑动延伸结构和卡扣锁定方式。（AI 辅助概念效果图）",
            "caption": "餐桌板采用滑动延伸结构和卡扣锁定方式。",
            "title": "可延伸餐桌板",
            "group": "功能配件",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/power-module-render.webp",
            "alt": "电源模块：独立电源模块连接座椅下方的供电接口。（AI 辅助概念效果图）",
            "caption": "独立电源模块连接座椅下方的供电接口。",
            "title": "电源模块",
            "group": "功能配件",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/storage-board-render.webp",
            "alt": "座下储物板：可拆底板和可调绑带用于固定行李。（AI 辅助概念效果图）",
            "caption": "可拆底板和可调绑带用于固定行李。",
            "title": "座下储物板",
            "group": "功能配件",
            "kind": "render",
            "width": 1448,
            "height": 1086
          }
        ]
      },
      {
        "id": "assessment",
        "label": "材料评估",
        "title": "评估材料用量与循环利用潜力",
        "body": "采用质量加权材料循环性指标（MCI）和 Ansys Granta EduPack Eco Audit，比较材料、制造、运输及报废阶段的环境影响。方案估算质量为 13.1 kg，加权 MCI 为 0.70；铝材占较大质量比例，也是材料阶段环境影响的主要来源。Eco Audit 分析期为一年，未计入运营使用阶段。结果属于概念估算，尚需实物测试和航空安全认证。",
        "images": [
          {
            "src": "/assets/process/moduframe-eco-audit-chart.png",
            "alt": "Eco Audit 结果：材料、制造、运输及报废阶段的环境影响。",
            "caption": "材料、制造、运输及报废阶段的环境影响。",
            "title": "Eco Audit 结果",
            "group": "",
            "kind": "drawing",
            "width": 1426,
            "height": 1068
          },
          {
            "src": "/assets/process/moduframe-mass-and-mci-analysis.png",
            "alt": "质量与循环性分析：估算质量 13.1 kg，质量加权 MCI 为 0.70。",
            "caption": "估算质量 13.1 kg，质量加权 MCI 为 0.70。",
            "title": "质量与循环性分析",
            "group": "",
            "kind": "drawing",
            "width": 925,
            "height": 775
          }
        ]
      }
    ]
  },
  "axispro": {
    "intro": "四人团队完成了用户调研、机构与控制布局迭代，以及可工作的整机原型。我主要负责渲染、标签、用户指南和商业模式设计。",
    "stages": [
      {
        "id": "research",
        "label": "用户调研",
        "title": "确定合适的涂装高度",
        "body": "团队从模型位置、手部操作、身体姿势和桌面空间四个方面展开调研，从 18 个初始构想中筛选出电动涂装工作台方案。随后使用可调纸板模型，邀请身高 155—203 cm 的参与者测试合适的涂装高度。",
        "images": [
          {
            "alt": "较矮使用者的高度测试：用可调纸板原型测试不同模型高度。",
            "caption": "用可调纸板原型测试不同模型高度。",
            "width": 1800,
            "height": 1350,
            "src": "/assets/process/axis-height-short.webp"
          },
          {
            "alt": "较高使用者的高度测试：比较较高使用者所需的调节范围。",
            "caption": "比较较高使用者所需的调节范围。",
            "width": 1800,
            "height": 1350,
            "src": "/assets/process/axis-height-tall.webp"
          }
        ]
      },
      {
        "id": "mechanisms",
        "label": "机构原型",
        "title": "比较升降与旋转方案",
        "body": "团队先用粗略模型确认桌面占用和手部可达范围，再细化 CAD 结构。升降机构比较了伸缩、皮带、滑轮与丝杠方案，最终选择结构相对简洁、具有自锁特性的丝杠，并进一步研究俯仰和旋转机构在立柱及夹具中的布置。",
        "images": [
          {
            "alt": "原型与 CAD 的迭代过程：从初始效果图、纸板模型到多轮立柱 CAD 方案。",
            "caption": "从初始效果图、纸板模型到多轮立柱 CAD 方案。",
            "width": 1733,
            "height": 969,
            "src": "/assets/process/axis-prototype-evolution.webp"
          },
          {
            "alt": "垂直机构的工坊原型：实体机构原型，用于比较升降方式与部件布置。",
            "caption": "实体机构原型，用于比较升降方式与部件布置。",
            "width": 1200,
            "height": 1600,
            "src": "/assets/process/axis-mechanism-test.webp",
            "size": "portrait"
          }
        ]
      },
      {
        "id": "user-testing",
        "label": "用户测试",
        "title": "根据反馈缩减尺寸、调整控制",
        "body": "测试中，使用者更倾向于深度较小的立柱。团队调整螺母支架的宽深比例，将深度从 108 mm 减至 58 mm；手臂可达范围测试则支持采用 90 mm 的伸出距离。控制面板经比较后采用十字摇杆与旋转编码器，分别调节高度、旋转和俯仰。",
        "images": [
          {
            "alt": "螺母支架的三轮 CAD 迭代：根据测试反馈，调整螺母支架的宽深比例。",
            "caption": "根据测试反馈，调整螺母支架的宽深比例。",
            "width": 1250,
            "height": 594,
            "src": "/assets/process/axis-mount-iterations.webp"
          },
          {
            "alt": "控制面板布局与用户测试：比较摇杆与旋转编码器的布局。",
            "caption": "比较摇杆与旋转编码器的布局。",
            "width": 1025,
            "height": 849,
            "src": "/assets/process/axis-control-iterations.webp"
          }
        ]
      },
      {
        "id": "working-prototype",
        "label": "整机测试",
        "title": "集成电路与机械结构",
        "body": "团队先分别测试电机，完成面包板电路测试后进行焊接，再将控制电路与机械结构集成到整机。针对原驱动器的噪声和明显步进顿挫，团队换用 TMC2209 驱动器，改善运行平顺性。",
        "images": [
          {
            "alt": "底座内部的电路集成：打开底座后可见控制板及内部走线。",
            "caption": "打开底座后可见控制板及内部走线。",
            "width": 1800,
            "height": 1078,
            "src": "/assets/process/axis-electronics-integration.webp"
          },
          {
            "alt": "原型电路焊接：团队将面包板测试电路焊接装配，用于整机测试。",
            "caption": "团队将面包板测试电路焊接装配，用于整机测试。",
            "width": 1720,
            "height": 1390,
            "src": "/assets/process/axis-soldering.webp"
          }
        ]
      },
      {
        "id": "assembly",
        "label": "装配设计",
        "title": "细化连接与装配步骤",
        "body": "团队在 CAD 和原型阶段同步考虑制造、装配与维修。螺母支架使用标准 M3 紧固件和轴承，装配过程分为九步；立柱采用等截面与内部加强筋，并通过螺栓、摩擦配合等方式连接，便于拆解。",
        "images": [
          {
            "alt": "夹具与螺母支架爆炸图：夹具、轴承、齿轮与螺母支架的装配关系。",
            "caption": "夹具、轴承、齿轮与螺母支架的装配关系。",
            "width": 1620,
            "height": 1446,
            "src": "/assets/process/axis-holder-exploded.webp"
          },
          {
            "alt": "立柱截面：立柱截面及内部加强筋。",
            "caption": "立柱截面及内部加强筋。",
            "width": 792,
            "height": 370,
            "src": "/assets/process/axis-tower-section.webp"
          }
        ]
      },
      {
        "id": "outcome",
        "label": "项目成果",
        "title": "完成原型与使用说明",
        "body": "最终原型集成升降、俯仰、模型旋转和夹持功能，并设有颜料盘及画笔收纳空间。团队通过实际涂装记录使用情况。我完成了产品渲染、标签、五页用户指南及商业模式设计。后续改进重点包括运动部件的线缆管理和旋转限位。",
        "images": [
          {
            "alt": "工作原型的涂装场景：使用者操作 AxisPro 原型进行模型涂装。",
            "caption": "使用者操作 AxisPro 原型进行模型涂装。",
            "width": 1800,
            "height": 1188,
            "src": "/assets/process/axis-use-photograph.webp"
          },
          {
            "alt": "最终产品效果图：AxisPro 最终方案渲染图。",
            "caption": "AxisPro 最终方案渲染图。",
            "width": 1800,
            "height": 1013,
            "src": "/assets/process/axis-final-render.webp"
          }
        ]
      }
    ]
  },
  "stream-x": {
    "intro": "独立完成车身草图、曲面建模与 CFD 分析，并根据流场结果提出下一轮修改方向。",
    "stages": [
      {
        "id": "research",
        "label": "比例草图",
        "title": "确定车身比例与轮廓",
        "body": "从跑车造型和气流控制方式入手，比较分流器、尾翼及扩散器的作用。早期草图围绕低矮车身、紧凑座舱和连续曲线展开，第一轮方案进一步明确车头、肩线与侧面曲面的关系。",
        "images": [
          {
            "alt": "早期侧面比例草图：四组侧面草图，比较车身轮廓与比例。",
            "caption": "四组侧面草图，比较车身轮廓与比例。",
            "width": 1600,
            "height": 720,
            "src": "/assets/process/stream-silhouette-studies.webp"
          },
          {
            "alt": "STREAM X 第一轮方案：第一轮方案，细化车头与侧面曲面。",
            "caption": "第一轮方案，细化车头与侧面曲面。",
            "width": 1578,
            "height": 671,
            "src": "/assets/process/stream-first-iteration.webp"
          }
        ]
      },
      {
        "id": "iteration",
        "label": "方案迭代",
        "title": "从外置尾翼转向集成导流通道",
        "body": "第二轮方案采用外置尾翼。根据反馈，我转向与车身融为一体的 C 形导流通道，希望在保持表面连续的同时，引导气流从车顶流向尾部。图中的气流线为设计示意，后续再通过仿真分析。",
        "images": [
          {
            "alt": "外置尾翼方案：第二轮方案，以外置尾翼组织尾部造型。",
            "caption": "第二轮方案，以外置尾翼组织尾部造型。",
            "width": 1578,
            "height": 881,
            "src": "/assets/process/stream-wing-iteration.webp"
          },
          {
            "alt": "集成导流通道草图：橙色线条为预期气流路径示意，并非仿真结果。",
            "caption": "橙色线条为预期气流路径示意，并非仿真结果。",
            "width": 1800,
            "height": 1066,
            "src": "/assets/process/stream-channel-sketch.webp"
          }
        ]
      },
      {
        "id": "cad",
        "label": "曲面建模",
        "title": "将草图细化为车身曲面",
        "body": "在 CAD 中整合圆滑车头、座舱、轮拱和尾部通道，通过灰模与线框视图检查曲面形态。在保留主要外形的基础上简化局部细节，为后续 CFD 分析准备几何模型。",
        "images": [
          {
            "alt": "STREAM X 原始 CAD 灰模：圆滑车头、车顶通道与开放轮拱。",
            "caption": "原始 CAD 灰模：圆滑车头、车顶通道与开放轮拱。",
            "width": 1800,
            "height": 1013,
            "src": "/assets/process/stream-clay-cad.webp"
          },
          {
            "alt": "STREAM X 车身线框：同一车身模型的曲面线框视图。",
            "caption": "同一车身模型的曲面线框视图。",
            "width": 1800,
            "height": 1013,
            "src": "/assets/process/stream-cad-wireframe.webp"
          }
        ]
      },
      {
        "id": "simulation",
        "label": "仿真设置",
        "title": "建立计算域与网格",
        "body": "先根据正面轮廓确定参考面积，再采用对称半车模型减少计算量。ANSYS Fluent 中设置约 30.5 m/s 的入口速度和 k–ε 湍流模型，使用 458,336 个多面体单元，并检查表面及体网格质量。本次分析采用缩比简化几何。",
        "images": [
          {
            "alt": "CFD 计算域：简化半车模型及外部计算域。",
            "caption": "简化半车模型及外部计算域。",
            "width": 697,
            "height": 675,
            "src": "/assets/process/stream-cfd-domain.webp"
          },
          {
            "alt": "CFD 体网格：用于 Fluent 分析的体网格。",
            "caption": "用于 Fluent 分析的体网格。",
            "width": 384,
            "height": 236,
            "src": "/assets/process/stream-volume-mesh.webp",
            "size": "small"
          }
        ]
      },
      {
        "id": "analysis",
        "label": "结果分析",
        "title": "分析压力分布与尾流",
        "body": "利用压力、速度云图分析车头、车顶通道和尾流区域。简化模型的模拟阻力系数为 0.345；前期几何估算值为 0.3025，两者来自不同阶段与方法，不能直接作为优化幅度的比较。仿真结果仅适用于本次研究模型。",
        "images": [
          {
            "alt": "CFD 压力云图：压力分布云图，保留原始图例与数值刻度。",
            "caption": "压力分布云图，保留原始图例与数值刻度。",
            "width": 1243,
            "height": 554,
            "src": "/assets/process/stream-pressure-analysis.webp"
          },
          {
            "alt": "CFD 速度云图：车身周围及尾流区域的速度分布。",
            "caption": "车身周围及尾流区域的速度分布。",
            "width": 977,
            "height": 499,
            "src": "/assets/process/stream-velocity-analysis.webp"
          }
        ]
      },
      {
        "id": "reflection",
        "label": "改进方向",
        "title": "根据流场结果提出修改方案",
        "body": "分析显示车身下缘存在流动分离，车顶后方的压力恢复也有改进空间。下一轮拟调整通道曲率与出口、细化车底形态，并研究尾缘小幅上翘的效果。道路场景图由 Vizcom AI 辅助生成，用于展示造型，不作为仿真结果。",
        "images": [
          {
            "alt": "尾流速度细节：车后低速区域，作为下一轮优化的分析依据。",
            "caption": "车后低速区域，作为下一轮优化的分析依据。",
            "width": 767,
            "height": 407,
            "src": "/assets/process/stream-rear-wake.webp"
          },
          {
            "alt": "海岸道路概念效果图：Vizcom AI 辅助概念效果图，展示整体造型。",
            "caption": "Vizcom AI 辅助概念效果图，展示整体造型。",
            "width": 1448,
            "height": 1086,
            "src": "/assets/process/stream-visualisation.webp"
          }
        ]
      }
    ]
  },
  "the-path": {
    "title": "Jìng — The Path",
    "intro": "团队通过校园观察、用户访谈和实体原型，逐步完善 Queen’s Lawn 公共空间方案。",
    "stages": [
      {
        "id": "research",
        "label": "场地调研",
        "title": "了解草坪在不同季节的使用情况",
        "body": "团队在 Queen’s Lawn 周边观察并访谈使用者，发现晴天草坪较活跃，而冬季受到座椅不足、缺少遮雨设施及地面潮湿的限制。由此将设计目标确定为：增加全年可用的学习、休息和交流空间。",
        "images": [
          {
            "alt": "观察与访谈研究板：将季节性观察、访谈记录整理为设计需求。",
            "caption": "将季节性观察、访谈记录整理为设计需求。",
            "width": 1032,
            "height": 1228,
            "nativeWidth": 1032,
            "nativeHeight": 1228,
            "src": "/assets/process/path-research-board.webp"
          }
        ]
      },
      {
        "id": "concepts",
        "label": "概念筛选",
        "title": "降低路径高度，改善空间可达性",
        "body": "团队比较 InnoRest、HoloHub 和 The Path 三个概念，结合学生反馈，从适应性、容量、功能与可行性等方面评估后选择 The Path。随后将较高的螺旋结构调整为接近地面的步道与环道，以方便通行和日常使用。",
        "images": [
          {
            "alt": "早期螺旋概念：初始草图：两层螺旋结构与整合式座椅。",
            "caption": "初始草图：两层螺旋结构与整合式座椅。",
            "width": 448,
            "height": 402,
            "nativeWidth": 448,
            "nativeHeight": 402,
            "src": "/assets/process/path-concept-spiral.webp",
            "size": "small"
          },
          {
            "alt": "低位步道研究：降低路径高度后，重新安排遮雨设施、步道与座椅。",
            "caption": "降低路径高度后，重新安排遮雨设施、步道与座椅。",
            "width": 587,
            "height": 409,
            "nativeWidth": 587,
            "nativeHeight": 409,
            "src": "/assets/process/path-lowered-path-sketch.webp"
          }
        ]
      },
      {
        "id": "seating",
        "label": "座椅原型",
        "title": "从组合模型到全尺寸试坐",
        "body": "团队先用 3D 打印模型比较座椅组合，再制作全尺寸纸板椅，邀请参与者试坐、后仰。在 12 人参与的设计活动中，9 人认为固定折叠机构并非必要，方案因此改为使用可拆连接的独立座椅模块。",
        "images": [
          {
            "alt": "3D 打印座椅体验：参与者用 3D 打印模型尝试不同座椅组合。",
            "caption": "参与者用 3D 打印模型尝试不同座椅组合。",
            "width": 301,
            "height": 310,
            "nativeWidth": 301,
            "nativeHeight": 310,
            "src": "/assets/process/path-seat-model-handling.webp",
            "size": "small"
          },
          {
            "alt": "全尺寸纸板座椅测试：通过全尺寸纸板椅试坐，收集初步舒适性反馈。",
            "caption": "通过全尺寸纸板椅试坐，收集初步舒适性反馈。",
            "width": 212,
            "height": 218,
            "nativeWidth": 212,
            "nativeHeight": 218,
            "src": "/assets/process/path-cardboard-seating-test.webp",
            "size": "small"
          }
        ]
      },
      {
        "id": "layout",
        "label": "布局测试",
        "title": "邀请使用者比较两种空间布局",
        "body": "使用泡沫和纸板制作高架环道、低位步道两种模型。11 名学生与 1 名教授在 Queen’s Lawn 比例模型上摆放座椅和人物，讨论使用方式。其中 8 人更偏好低位步道，认为它能够同时提供相对安静的区域和交流空间。",
        "images": [
          {
            "alt": "高架环道原型：高架环道的泡沫与纸板比例模型。",
            "caption": "高架环道的泡沫与纸板比例模型。",
            "width": 338,
            "height": 289,
            "nativeWidth": 338,
            "nativeHeight": 289,
            "src": "/assets/process/path-loop-prototype.webp",
            "size": "small"
          },
          {
            "alt": "低位步道原型：低位步道模型，用于与高架环道方案对照。",
            "caption": "低位步道模型，用于与高架环道方案对照。",
            "width": 344,
            "height": 304,
            "nativeWidth": 344,
            "nativeHeight": 304,
            "src": "/assets/process/path-lower-prototype.webp",
            "size": "small"
          }
        ]
      },
      {
        "id": "refine",
        "label": "方案细化",
        "title": "落实铺装、排水与活动设施",
        "body": "根据反馈，团队补充了适应潮湿环境的铺装和排水设计，并在安静区与共享区分别安排座椅。滑梯和攀爬墙增加活动功能，最终与曲面遮雨结构一起整合到 CAD 方案中。",
        "images": [
          {
            "alt": "整合后的 CAD 提案：整合遮雨结构、步道、滑梯和攀爬墙的 CAD 方案。",
            "caption": "整合遮雨结构、步道、滑梯和攀爬墙的 CAD 方案。",
            "width": 730,
            "height": 461,
            "nativeWidth": 730,
            "nativeHeight": 461,
            "src": "/assets/process/path-integrated-cad.webp"
          }
        ]
      },
      {
        "id": "proposal",
        "label": "最终方案",
        "title": "展示方案与校园场地的关系",
        "body": "最终效果图将曲面遮雨结构、模块化座椅和步道放入 Queen’s Lawn 场景，展示空间布局及使用方式。日景与夜景分别呈现场地关系和照明设想；该方案仍处于概念设计阶段。",
        "images": [
          {
            "alt": "校园场景中的俯视效果图：最终方案与 Queen’s Lawn 的场地关系。",
            "caption": "最终方案与 Queen’s Lawn 的场地关系。",
            "width": 796,
            "height": 563,
            "nativeWidth": 796,
            "nativeHeight": 563,
            "src": "/assets/process/path-final-aerial.webp"
          },
          {
            "alt": "共享空间夜景：夜景效果图，展示路径照明与空间氛围。",
            "caption": "夜景效果图，展示路径照明与空间氛围。",
            "width": 1039,
            "height": 585,
            "nativeWidth": 1039,
            "nativeHeight": 585,
            "src": "/assets/process/path-final-night.webp"
          }
        ]
      }
    ]
  },
  "simrest": {
    "title": "SIMREST Q2",
    "intro": "记录在麒盛科技研发部参与的 CAD 与外观建模工作：从形态比较、操作布局到装配和尺寸细化。",
    "stages": [
      {
        "id": "form",
        "label": "外观设计",
        "title": "确定外壳形态与功能位置",
        "body": "方案采用圆柱形外壳、织物质感顶面和环形灯光，在顶部布置无线充电区域，后部设置 USB-C 接口，前部及底部安排麦克风和通风孔。我在实习期间参与了 CAD 设计与外观建模，以下图片记录方案的比较与细化。",
        "images": [
          {
            "alt": "SIMREST Q2 顶部视图：顶面造型与无线充电区域的布局。",
            "caption": "顶面造型与无线充电区域的布局。",
            "width": 1448,
            "height": 1086,
            "nativeWidth": 1448,
            "nativeHeight": 1086,
            "src": "/assets/process/simrest-top-interface.webp"
          },
          {
            "alt": "SIMREST Q2 后部视图：USB-C 接口与底部通风孔的位置。",
            "caption": "USB-C 接口与底部通风孔的位置。",
            "width": 1448,
            "height": 1086,
            "nativeWidth": 1448,
            "nativeHeight": 1086,
            "src": "/assets/process/simrest-rear-usbc.webp"
          }
        ]
      },
      {
        "id": "sliders",
        "label": "滑块方案",
        "title": "将常用设置集中到底部",
        "body": "初始方案将问候、音量、鼾声干预灵敏度和角度设置集中在底面。滑块的位置用于显示当前档位，扬声器与支脚围绕控制区布置。本阶段主要比较外观与操作布局。",
        "images": [
          {
            "alt": "滑块式底部布局：底部四组滑块、扬声器孔和支脚的布局。",
            "caption": "底部四组滑块、扬声器孔和支脚的布局。",
            "width": 1254,
            "height": 1254,
            "nativeWidth": 1254,
            "nativeHeight": 1254,
            "src": "/assets/process/simrest-slider-base.webp"
          },
          {
            "alt": "音量滑块细节：音量滑块设有高、中、低、关闭四档。",
            "caption": "音量滑块设有高、中、低、关闭四档。",
            "width": 1080,
            "height": 772,
            "nativeWidth": 1080,
            "nativeHeight": 772,
            "src": "/assets/process/simrest-slider-detail.webp"
          }
        ]
      },
      {
        "id": "buttons",
        "label": "按键方案",
        "title": "比较按键与滑块的操作方式",
        "body": "另一方案用独立模式按键和发光状态标签替代滑块。在保留整体底部布局的基础上，比较两种设置方式及状态指示，为方案评审提供参考。",
        "images": [
          {
            "alt": "按键式底部方案：以模式按键和发光标签替代滑块的方案。",
            "caption": "以模式按键和发光标签替代滑块的方案。",
            "width": 1254,
            "height": 1254,
            "nativeWidth": 1254,
            "nativeHeight": 1254,
            "src": "/assets/process/simrest-button-base.webp"
          },
          {
            "alt": "按键与状态指示：通过亮起的标签指示当前音量档位。",
            "caption": "通过亮起的标签指示当前音量档位。",
            "width": 1396,
            "height": 997,
            "nativeWidth": 1396,
            "nativeHeight": 997,
            "src": "/assets/process/simrest-button-detail.webp"
          }
        ]
      },
      {
        "id": "assembly",
        "label": "装配关系",
        "title": "拆分外壳，明确部件位置",
        "body": "爆炸图分开展示顶部圆盘、环形件、织物表层、外壳、通风底座及底部面板，用于检查各层构件的位置和装配关系。本阶段为概念装配设计，尚非量产结构验证。",
        "images": [
          {
            "alt": "SIMREST Q2 分层构件图：概念爆炸图，展示外壳与各层构件的装配关系。",
            "caption": "概念爆炸图，展示外壳与各层构件的装配关系。",
            "width": 1800,
            "height": 1350,
            "nativeWidth": 3840,
            "nativeHeight": 2880,
            "src": "/assets/process/simrest-assembly.webp"
          }
        ]
      },
      {
        "id": "profile",
        "label": "顶部比较",
        "title": "比较平齐与抬升两种顶面",
        "body": "通过顶部平齐和中央圆盘抬升两种方案，比较外形轮廓与环形灯光的效果。使用相同床头场景进行对照，便于观察形态差异。",
        "images": [
          {
            "alt": "平齐式顶部：中央圆盘与顶面平齐的方案。",
            "caption": "中央圆盘与顶面平齐的方案。",
            "width": 1672,
            "height": 941,
            "nativeWidth": 1672,
            "nativeHeight": 941,
            "src": "/assets/process/simrest-flush-top.webp"
          },
          {
            "alt": "抬升式顶部：中央圆盘高于顶面的方案。",
            "caption": "中央圆盘高于顶面的方案。",
            "width": 1448,
            "height": 1086,
            "nativeWidth": 1448,
            "nativeHeight": 1086,
            "src": "/assets/process/simrest-raised-top.webp"
          }
        ]
      },
      {
        "id": "scale",
        "label": "尺寸细化",
        "title": "细化外形尺寸与比例",
        "body": "原始尺寸图标注外径 120 mm、主体高度 45.7 mm、中央圆盘直径 54 mm，以及抬升方案的 6 mm 高差。最终效果图将产品放回床头场景，展示外观比例。",
        "images": [
          {
            "alt": "SIMREST Q2 原始尺寸图：侧视及俯视尺寸图，说明产品外形尺度。",
            "caption": "侧视及俯视尺寸图，说明产品外形尺度。",
            "width": 1800,
            "height": 906,
            "nativeWidth": 1800,
            "nativeHeight": 906,
            "src": "/assets/process/simrest-dimensions.webp"
          },
          {
            "alt": "最终床头场景效果图：床头使用场景中的最终概念效果图。",
            "caption": "床头使用场景中的最终概念效果图。",
            "width": 1491,
            "height": 1055,
            "nativeWidth": 1491,
            "nativeHeight": 1055,
            "src": "/assets/process/simrest-final-bedside.webp"
          }
        ]
      }
    ]
  }
};
