// 中文项目开发过程，图片与尺寸沿用原始材料。
export const projectProcesses = {
  "moduframe": {
    "title": "MODUFRAME",
    "intro": "从循环设计需求出发，通过部件研究、材料比较与循环性评估，开发可维护的模块化航空座椅。",
    "stages": [
      {
        "id": "system",
        "label": "系统",
        "title": "先理解零件的使用寿命",
        "body": "项目从航空座椅循环利用的障碍切入：混合材料难以分离，不同部件磨损速度不同。团队前期研究被转化为舒适、可维修、轻量化与材料回收等设计要求。我在此基础上发展个人方案，用系统图梳理各部件从投入使用到离开客舱后的生命周期。",
        "images": [
          {
            "src": "/assets/process/moduframe-circular-system-map.png",
            "alt": "循环系统图：原始系统研究：采购、制造、安装、维护、拆解与材料回收。",
            "caption": "原始系统研究：采购、制造、安装、维护、拆解与材料回收。",
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
        "label": "结构",
        "title": "保留骨架，单独更换零件",
        "body": "以 6061 铝合金骨架作为长寿命结构基础，将 X 形支架、横向导轨与可拆座盆组织为可维护的单元。效果图用于说明构件关系，原始连接图则保留具体结构细节。以下写实图片为基于原始图纸的 AI 辅助概念效果图，并非已制造的部件。",
        "images": [
          {
            "src": "/assets/moduframe-renders/primary-frame-front-render.webp",
            "alt": "主骨架 · 正面：三个座位共用横向导轨与四组 X 形支架。（AI 辅助概念效果图）",
            "caption": "三个座位共用横向导轨与四组 X 形支架。",
            "title": "主骨架 · 正面",
            "group": "骨架视图",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/primary-frame-rear-render.webp",
            "alt": "主骨架 · 背面：曲面支架确定靠背轮廓，同时显露各模块的连接界面。（AI 辅助概念效果图）",
            "caption": "曲面支架确定靠背轮廓，同时显露各模块的连接界面。",
            "title": "主骨架 · 背面",
            "group": "骨架视图",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/primary-frame-side-render.webp",
            "alt": "主骨架 · 侧面：侧视图展示座盆、靠背支撑与底部骨架之间的关系。（AI 辅助概念效果图）",
            "caption": "侧视图展示座盆、靠背支撑与底部骨架之间的关系。",
            "title": "主骨架 · 侧面",
            "group": "骨架视图",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/x-leg-frame-render.webp",
            "alt": "X 形支架：通过内凹截面与开放区域，探索减少支架材料用量的几何方案。（AI 辅助概念效果图）",
            "caption": "通过内凹截面与开放区域，探索减少支架材料用量的几何方案。",
            "title": "X 形支架",
            "group": "部件与连接",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/seat-pan-render.webp",
            "alt": "可拆座盆：带孔再生聚合物座盆由两根结构导轨支撑。（AI 辅助概念效果图）",
            "caption": "带孔再生聚合物座盆由两根结构导轨支撑。",
            "title": "可拆座盆",
            "group": "部件与连接",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/modular-seat-joint-render.webp",
            "alt": "模块化导轨连接：分开的配合面说明座盆与共用骨架的连接关系。（AI 辅助概念效果图）",
            "caption": "分开的配合面说明座盆与共用骨架的连接关系。",
            "title": "模块化导轨连接",
            "group": "部件与连接",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/process/moduframe-quarter-turn-joint.png",
            "alt": "四分之一转连接件：原始 CAD 细节图：通过四分之一转紧固件形成可逆的机械连接。",
            "caption": "原始 CAD 细节图：通过四分之一转紧固件形成可逆的机械连接。",
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
        "label": "舒适层",
        "title": "让直接接触的表面可以更换",
        "body": "根据不同使用寿命拆分舒适层，提出可分别清洁、更换的 rPET 网布、TPU 与 E-TPU 层。靠背、头枕及扶手各自形成模块，避免因局部磨损而替换整套软包座椅。下列写实图为 AI 辅助概念效果图。",
        "images": [
          {
            "src": "/assets/moduframe-renders/comfort-seat-front-render.webp",
            "alt": "舒适模块 · 正面：完整舒适模块包含轮廓靠背、坐垫与独立扶手接触面。（AI 辅助概念效果图）",
            "caption": "完整舒适模块包含轮廓靠背、坐垫与独立扶手接触面。",
            "title": "舒适模块 · 正面",
            "group": "舒适模块总成",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/comfort-seat-perspective-render.webp",
            "alt": "舒适模块 · 透视：斜视角呈现各接触表面及其分层构造。（AI 辅助概念效果图）",
            "caption": "斜视角呈现各接触表面及其分层构造。",
            "title": "舒适模块 · 透视",
            "group": "舒适模块总成",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/cushion-exploded-render.webp",
            "alt": "三层坐垫：间隔网布罩面、压力分散层与结构底板分离，以支持按层更换。（AI 辅助概念效果图）",
            "caption": "间隔网布罩面、压力分散层与结构底板分离，以支持按层更换。",
            "title": "三层坐垫",
            "group": "可更换层",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/backrest-exploded-render.webp",
            "alt": "靠背分层：网状背板与可移除舒适面板采用独立部件设计。（AI 辅助概念效果图）",
            "caption": "网状背板与可移除舒适面板采用独立部件设计。",
            "title": "靠背分层",
            "group": "可更换层",
            "kind": "render",
            "width": 1254,
            "height": 1254
          },
          {
            "src": "/assets/moduframe-renders/headrest-exploded-render.webp",
            "alt": "头枕分层：成形支撑板承载可拆卸的头部接触软垫。（AI 辅助概念效果图）",
            "caption": "成形支撑板承载可拆卸的头部接触软垫。",
            "title": "头枕分层",
            "group": "可更换层",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/armrest-support-render.webp",
            "alt": "扶手支撑：独立支撑位于可更换的接触表层下方。（AI 辅助概念效果图）",
            "caption": "独立支撑位于可更换的接触表层下方。",
            "title": "扶手支撑",
            "group": "扶手模块",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/armrest-cap-render.webp",
            "alt": "扶手表层：将日常磨损最集中的表面做成可拆件。（AI 辅助概念效果图）",
            "caption": "将日常磨损最集中的表面做成可拆件。",
            "title": "扶手表层",
            "group": "扶手模块",
            "kind": "render",
            "width": 1448,
            "height": 1086
          }
        ]
      },
      {
        "id": "accessories",
        "label": "配件",
        "title": "让配件独立维护",
        "body": "餐桌板、电源与储物件作为独立服务模块连接到座椅，使局部升级无需替换主骨架。采用胶粘固定的储物袋仍存在拆解难题，是后续迭代需要解决的取舍。下列写实图为 AI 辅助概念效果图。",
        "images": [
          {
            "src": "/assets/moduframe-renders/accessory-backrest-render.webp",
            "alt": "椅背配件总成：餐桌板、电源与储物部件形成可更换的后部组合。（AI 辅助概念效果图）",
            "caption": "餐桌板、电源与储物部件形成可更换的后部组合。",
            "title": "椅背配件总成",
            "group": "后部总成",
            "kind": "render",
            "width": 1086,
            "height": 1448
          },
          {
            "src": "/assets/moduframe-renders/storage-bag-render.webp",
            "alt": "储物袋：软质储物件提供便捷取放空间；胶粘连接仍需进一步改进。（AI 辅助概念效果图）",
            "caption": "软质储物件提供便捷取放空间；胶粘连接仍需进一步改进。",
            "title": "储物袋",
            "group": "后部总成",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/tray-table-render.webp",
            "alt": "可延伸餐桌板：方案将滑动延伸结构与卡扣锁定方式结合。（AI 辅助概念效果图）",
            "caption": "方案将滑动延伸结构与卡扣锁定方式结合。",
            "title": "可延伸餐桌板",
            "group": "服务模块",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/power-module-render.webp",
            "alt": "电源模块：独立电源单元与座椅下方供电接口相连。（AI 辅助概念效果图）",
            "caption": "独立电源单元与座椅下方供电接口相连。",
            "title": "电源模块",
            "group": "服务模块",
            "kind": "render",
            "width": 1448,
            "height": 1086
          },
          {
            "src": "/assets/moduframe-renders/storage-board-render.webp",
            "alt": "座下储物板：可拆底板与可调绑带用于约束乘客行李。（AI 辅助概念效果图）",
            "caption": "可拆底板与可调绑带用于约束乘客行李。",
            "title": "座下储物板",
            "group": "服务模块",
            "kind": "render",
            "width": 1448,
            "height": 1086
          }
        ]
      },
      {
        "id": "assessment",
        "label": "评估",
        "title": "检验材料选择带来的影响",
        "body": "通过质量加权材料循环性指标（MCI）与 Ansys Granta EduPack Eco Audit，评估材料、制造、运输及报废情景。报告中的概念估算质量为 13.1 kg，加权 MCI 为 0.70；铝材是质量与材料隐含环境影响的主要来源。Eco Audit 采用一年分析期，未计入运营使用阶段。这些数值为模型估算，不是实测生命周期表现；实物验证与航空安全认证仍待开展。",
        "images": [
          {
            "src": "/assets/process/moduframe-eco-audit-chart.png",
            "alt": "Eco Audit 结果：原始评估图：材料、制造、运输及报废阶段的影响贡献。",
            "caption": "原始评估图：材料、制造、运输及报废阶段的影响贡献。",
            "title": "Eco Audit 结果",
            "group": "",
            "kind": "drawing",
            "width": 1426,
            "height": 1068
          },
          {
            "src": "/assets/process/moduframe-mass-and-mci-analysis.png",
            "alt": "质量与循环性分析：原始提交材料：估算质量 13.1 kg，加权 MCI 0.70。",
            "caption": "原始提交材料：估算质量 13.1 kg，加权 MCI 0.70。",
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
    "intro": "团队从涂装高度测试出发，逐步完成机构研究、控制布局与可工作的整机原型。我主要负责渲染、标签、五页用户指南及商业模式。",
    "stages": [
      {
        "id": "research",
        "label": "调研",
        "title": "从涂装者的工作方式出发",
        "body": "团队围绕模型、手部、姿势与周边工作空间四个方面展开研究，将 18 个初始构想收敛为定位工作站。在选择机构之前，先用可调灰纸板模型，与身高 155—203 cm 的参与者共同测试适合涂装的高度。",
        "images": [
          {
            "alt": "较矮使用者的高度测试：通过灰纸板原型检查模型位置与工作台之间的关系。",
            "caption": "通过灰纸板原型检查模型位置与工作台之间的关系。",
            "width": 1800,
            "height": 1350,
            "src": "/assets/process/axis-height-short.webp"
          },
          {
            "alt": "较高使用者的高度测试：使用同一可调模型，比较不同身高所需的位置调整。",
            "caption": "使用同一可调模型，比较不同身高所需的位置调整。",
            "width": 1800,
            "height": 1350,
            "src": "/assets/process/axis-height-tall.webp"
          }
        ]
      },
      {
        "id": "mechanisms",
        "label": "原型",
        "title": "从粗略模型到可控运动",
        "body": "团队先通过早期模型确定桌面占地与手部可达范围，再进入详细 CAD。高度调节比较了伸缩、皮带、滑轮与丝杠方案，最终采用结构更简洁且具有自锁特性的丝杠；随后研究如何在立柱与模型夹具中布置另外两个旋转轴。",
        "images": [
          {
            "alt": "原型与 CAD 的迭代过程：从初始效果图、灰纸板模型，到多轮立柱 CAD 方案。",
            "caption": "从初始效果图、灰纸板模型，到多轮立柱 CAD 方案。",
            "width": 1733,
            "height": 969,
            "src": "/assets/process/axis-prototype-evolution.webp"
          },
          {
            "alt": "垂直机构的工坊原型：通过实体机构研究升降方案与部件布置。",
            "caption": "通过实体机构研究升降方案与部件布置。",
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
        "title": "让反馈真正改变布局",
        "body": "测试推动了机构外形与控制面板的调整。使用者偏好更浅的立柱，团队因此加宽螺母支架，将其深度从 108 mm 减至 58 mm。手臂长度测试倾向于 90 mm 的伸出距离；控制测试则促成十字摇杆与旋转编码器布局，使高度及旋转调节更直观。",
        "images": [
          {
            "alt": "螺母支架的三轮 CAD 迭代：根据用户对浅立柱的偏好，逐步调整支架宽度与深度。",
            "caption": "根据用户对浅立柱的偏好，逐步调整支架宽度与深度。",
            "width": 1250,
            "height": 594,
            "src": "/assets/process/axis-mount-iterations.webp"
          },
          {
            "alt": "控制面板布局与用户测试：比较初始方案与测试后的摇杆、旋转编码器布置。",
            "caption": "比较初始方案与测试后的摇杆、旋转编码器布置。",
            "width": 1025,
            "height": 849,
            "src": "/assets/process/axis-control-iterations.webp"
          }
        ]
      },
      {
        "id": "working-prototype",
        "label": "制作与测试",
        "title": "把运动整合成完整系统",
        "body": "团队先分别测试各电机，再集成电路与机械结构。面包板测试推进为焊接电路板及整机原型。测试中发现原有电机驱动器存在噪声与明显步进顿挫，随后换用 TMC2209 驱动器，改善运行平顺性。此部分为团队工程开发成果。",
        "images": [
          {
            "alt": "底座内部的电路集成：工作原型打开后，可见控制板及底座内部走线。",
            "caption": "工作原型打开后，可见控制板及底座内部走线。",
            "width": 1800,
            "height": 1078,
            "src": "/assets/process/axis-electronics-integration.webp"
          },
          {
            "alt": "原型电路焊接：团队将面包板测试推进为焊接电路，服务于整机集成。",
            "caption": "团队将面包板测试推进为焊接电路，服务于整机集成。",
            "width": 1720,
            "height": 1390,
            "src": "/assets/process/axis-soldering.webp"
          }
        ]
      },
      {
        "id": "assembly",
        "label": "装配",
        "title": "明确部件如何配合",
        "body": "团队在机构开发中同时考虑制造与装配。螺母支架采用标准 M3 紧固件与轴承，梳理为九步装配过程；立柱采用一致截面与内部加强筋，螺栓及摩擦配合则便于拆解维修。这些细节来自 CAD 与原型阶段的生产方案研究。",
        "images": [
          {
            "alt": "夹具与螺母支架爆炸图：CAD 图展示夹具、轴承、齿轮及支架的装配关系。",
            "caption": "CAD 图展示夹具、轴承、齿轮及支架的装配关系。",
            "width": 1620,
            "height": 1446,
            "src": "/assets/process/axis-holder-exploded.webp"
          },
          {
            "alt": "立柱截面：截面图说明内部加强筋与壁面结构。",
            "caption": "截面图说明内部加强筋与壁面结构。",
            "width": 792,
            "height": 370,
            "src": "/assets/process/axis-tower-section.webp"
          }
        ]
      },
      {
        "id": "outcome",
        "label": "成果",
        "title": "将工作站带入实际涂装流程",
        "body": "最终团队原型整合高度调节、俯仰、模型旋转、可靠夹持及颜料盘、画笔收纳。实拍记录其在微缩模型涂装中的使用情况，效果图用于呈现产品形态。我在四人团队中主要负责商业模式、标签、五页用户指南与渲染。后续仍需改进运动部件的线缆管理及旋转限位。",
        "images": [
          {
            "alt": "工作原型的涂装场景：使用者坐在工作台前操作完整 AxisPro 原型。",
            "caption": "使用者坐在工作台前操作完整 AxisPro 原型。",
            "width": 1800,
            "height": 1188,
            "src": "/assets/process/axis-use-photograph.webp"
          },
          {
            "alt": "最终产品效果图：来自原始作品集的 AxisPro 工作站渲染。",
            "caption": "来自原始作品集的 AxisPro 工作站渲染。",
            "width": 1800,
            "height": 1013,
            "src": "/assets/process/axis-final-render.webp"
          }
        ]
      }
    ]
  },
  "stream-x": {
    "intro": "从车身轮廓草图，推进到连续曲面建模与空气动力学分析。",
    "stages": [
      {
        "id": "research",
        "label": "草图",
        "title": "先建立比例，再展开细节",
        "body": "项目从跑车形态研究及分流器、尾翼、扩散器等气流控制方式的比较出发。早期草图探索低矮姿态、紧凑座舱与连续车身曲率，第一轮深入方案进一步明确车头、肩线及侧面曲面。",
        "images": [
          {
            "alt": "早期侧面比例草图：由原始作品集中的四组草图整理，比较车身轮廓。",
            "caption": "由原始作品集中的四组草图整理，比较车身轮廓。",
            "width": 1600,
            "height": 720,
            "src": "/assets/process/stream-silhouette-studies.webp"
          },
          {
            "alt": "STREAM X 第一轮方案：将车身比例转化为较明确的前部与侧面曲面。",
            "caption": "将车身比例转化为较明确的前部与侧面曲面。",
            "width": 1578,
            "height": 671,
            "src": "/assets/process/stream-first-iteration.webp"
          }
        ]
      },
      {
        "id": "iteration",
        "label": "迭代",
        "title": "把导流方式融入车身",
        "body": "第二轮方案通过外置尾翼表达空气动力学意图。反馈促使我重新审视对附加构件的依赖，转向集成于车身的 C 形气流通道。设计重点随之变为：保持车身表面连续，同时为气流建立从车顶向尾部流动的路径。",
        "images": [
          {
            "alt": "外置尾翼方案：第二轮草图中，外置尾翼是整车造型的一部分。",
            "caption": "第二轮草图中，外置尾翼是整车造型的一部分。",
            "width": 1578,
            "height": 881,
            "src": "/assets/process/stream-wing-iteration.webp"
          },
          {
            "alt": "集成导流通道草图：原始后侧视图中的橙色线条表示预期气流路径，并非仿真结果。",
            "caption": "原始后侧视图中的橙色线条表示预期气流路径，并非仿真结果。",
            "width": 1800,
            "height": 1066,
            "src": "/assets/process/stream-channel-sketch.webp"
          }
        ]
      },
      {
        "id": "cad",
        "label": "CAD",
        "title": "将草图转化为连续曲面",
        "body": "简化 CAD 将圆滑前缘、曲面座舱、轮拱与尾部通道组织为一个车身。灰模与线框视图共同呈现曲面几何；在保留主要形态并简化小尺度细节后，该模型成为后续空气动力学研究的基础。",
        "images": [
          {
            "alt": "STREAM X 车身灰模：原始 CAD 渲染展示圆滑车头、车顶通道与开放轮拱。",
            "caption": "原始 CAD 渲染展示圆滑车头、车顶通道与开放轮拱。",
            "width": 1800,
            "height": 1013,
            "src": "/assets/process/stream-clay-cad.webp"
          },
          {
            "alt": "STREAM X 车身线框：同一模型的线框视图展示曲面几何构成。",
            "caption": "同一模型的线框视图展示曲面几何构成。",
            "width": 1800,
            "height": 1013,
            "src": "/assets/process/stream-cad-wireframe.webp"
          }
        ]
      },
      {
        "id": "simulation",
        "label": "仿真设置",
        "title": "建立可分析的 CFD 模型",
        "body": "通过描绘正面轮廓确定参考面积，并利用半车模型的对称性缩小计算域。在 ANSYS Fluent 中设置约 30.5 m/s 的入口速度与 k–ε 湍流模型。报告采用 458,336 个多面体单元，并在查看流场之前检查表面及体网格质量。该研究使用缩比简化几何。",
        "images": [
          {
            "alt": "CFD 计算域：简化半车几何外围的计算域设置。",
            "caption": "简化半车几何外围的计算域设置。",
            "width": 697,
            "height": 675,
            "src": "/assets/process/stream-cfd-domain.webp"
          },
          {
            "alt": "CFD 体网格：用于 Fluent 分析的计算域网格。",
            "caption": "用于 Fluent 分析的计算域网格。",
            "width": 384,
            "height": 236,
            "src": "/assets/process/stream-volume-mesh.webp",
            "size": "small"
          }
        ]
      },
      {
        "id": "analysis",
        "label": "结果",
        "title": "从流场中理解形态的影响",
        "body": "通过压力与速度云图观察前缘、车顶通道及尾流。报告中简化模型的模拟阻力系数为 0.345，与前期几何估算值 0.3025 属于不同阶段的结果。该数值描述本次研究模型，不是经验证的全尺寸车辆性能。",
        "images": [
          {
            "alt": "CFD 压力云图：保留报告中的原始图例与数值刻度，观察车身周围压力分布。",
            "caption": "保留报告中的原始图例与数值刻度，观察车身周围压力分布。",
            "width": 1243,
            "height": 554,
            "src": "/assets/process/stream-pressure-analysis.webp"
          },
          {
            "alt": "CFD 速度云图：展示研究几何及其周围计算域中的速度分布。",
            "caption": "展示研究几何及其周围计算域中的速度分布。",
            "width": 977,
            "height": 499,
            "src": "/assets/process/stream-velocity-analysis.webp"
          }
        ]
      },
      {
        "id": "reflection",
        "label": "反思",
        "title": "用分析结果明确下一轮修改",
        "body": "分析识别出车身下缘流动分离与车顶后方压力恢复不足。后续方案拟调整通道曲率及出口、改善底部形态，并研究小幅尾缘上翘。同时认识到缩比和简化几何的局限。道路场景效果图仅用于传达设计方向，不作为仿真证据。",
        "images": [
          {
            "alt": "尾流速度细节：通过车后低速区域识别下一轮需要优化的部位。",
            "caption": "通过车后低速区域识别下一轮需要优化的部位。",
            "width": 767,
            "height": 407,
            "src": "/assets/process/stream-rear-wake.webp"
          },
          {
            "alt": "海岸道路概念效果图：使用 Vizcom AI 辅助呈现银色 STREAM X 的整体造型。",
            "caption": "使用 Vizcom AI 辅助呈现银色 STREAM X 的整体造型。",
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
    "intro": "团队从校园观察出发，通过实体原型与共创活动，发展共享空间提案。",
    "stages": [
      {
        "id": "research",
        "label": "调研",
        "title": "从每天发生的校园生活出发",
        "body": "Queen’s Lawn 周边的观察与访谈揭示了季节性差异：天气好时草坪使用频繁，冬季则缺少座椅、遮蔽及可用地面。团队据此将任务定义为一处能够支持全年学习、休息与相聚的灵活场所。",
        "images": [
          {
            "alt": "观察与访谈研究板：原始报告将季节性观察、访谈内容与设计洞察联系起来。",
            "caption": "原始报告将季节性观察、访谈内容与设计洞察联系起来。",
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
        "label": "概念",
        "title": "从高位螺旋转向低位路径",
        "body": "团队比较了 InnoRest、HoloHub 与 The Path 三个方向。结合学生反馈及适应性、容量、多功能性与可行性比较，选择 The Path；随后为改善可达性与实际使用，将较高的螺旋形态降低为流动的路径与环道。",
        "images": [
          {
            "alt": "早期螺旋概念：两层螺旋结构与整合式座椅的初始草图。",
            "caption": "两层螺旋结构与整合式座椅的初始草图。",
            "width": 448,
            "height": 402,
            "nativeWidth": 448,
            "nativeHeight": 402,
            "src": "/assets/process/path-concept-spiral.webp",
            "size": "small"
          },
          {
            "alt": "低位路径研究：概念筛选后形成的遮蔽、路径与座椅布置草图。",
            "caption": "概念筛选后形成的遮蔽、路径与座椅布置草图。",
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
        "title": "从手中的模型到可试坐的座椅",
        "body": "团队通过 3D 打印座椅研究相同模块的不同组合，再制作全尺寸纸板版本，让参与者试坐与后仰。12 人共创活动中，9 人认为固定折叠机构并非必要，因此方案转向使用可拆连接的分离式模块。",
        "images": [
          {
            "alt": "3D 打印座椅体验：参与者手持模型，实际调整模块的组合方式。",
            "caption": "参与者手持模型，实际调整模块的组合方式。",
            "width": 301,
            "height": 310,
            "nativeWidth": 301,
            "nativeHeight": 310,
            "src": "/assets/process/path-seat-model-handling.webp",
            "size": "small"
          },
          {
            "alt": "全尺寸纸板座椅测试：通过参与者试坐及后仰，收集初步舒适性反馈。",
            "caption": "通过参与者试坐及后仰，收集初步舒适性反馈。",
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
        "label": "共创",
        "title": "用实体模型比较空间布局",
        "body": "团队以泡沫与纸板模型比较抬高环道和低位路径。12 名参与者（11 名学生、1 名教授）在 Queen’s Lawn 比例模型上放置座椅及人物，其中 8 人偏好路径方案，认为其更好地兼顾私密停留与社交联系。",
        "images": [
          {
            "alt": "抬高环道原型：用于比较空间布局的泡沫、纸板比例模型。",
            "caption": "用于比较空间布局的泡沫、纸板比例模型。",
            "width": 338,
            "height": 289,
            "nativeWidth": 338,
            "nativeHeight": 289,
            "src": "/assets/process/path-loop-prototype.webp",
            "size": "small"
          },
          {
            "alt": "低位路径原型：与环道方案并置，帮助参与者表达空间使用偏好。",
            "caption": "与环道方案并置，帮助参与者表达空间使用偏好。",
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
        "label": "细化",
        "title": "将反馈转化为设计决策",
        "body": "团队根据反馈提出适应潮湿条件的铺装与排水方案，并在安静区和共享区周边分别安排座椅。滑梯与攀爬墙为结构增加可互动的路径，最终在整体 CAD 中整合这些设计决定。",
        "images": [
          {
            "alt": "整合后的 CAD 提案：曲面肋片遮蔽、路径、滑梯与攀爬墙共同形成空间方案。",
            "caption": "曲面肋片遮蔽、路径、滑梯与攀爬墙共同形成空间方案。",
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
        "label": "提案",
        "title": "回到真实的校园情境中",
        "body": "最终 CAD 效果图将方案放回 Queen’s Lawn，表达曲面遮蔽、模块座椅与开放通行如何支持校园生活。日景与夜景用于呈现空间氛围及场地关系；完整结构仍为概念提案，并未建成。",
        "images": [
          {
            "alt": "校园场景中的俯视效果图：最终 CAD 方案与 Queen’s Lawn 场地的关系。",
            "caption": "最终 CAD 方案与 Queen’s Lawn 场地的关系。",
            "width": 796,
            "height": 563,
            "nativeWidth": 796,
            "nativeHeight": 563,
            "src": "/assets/process/path-final-aerial.webp"
          },
          {
            "alt": "共享空间夜景：夜间效果图表达遮蔽结构与路径照明的预期氛围。",
            "caption": "夜间效果图表达遮蔽结构与路径照明的预期氛围。",
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
    "intro": "麒盛科技研发部实习中的 CAD 与外观建模参与：比较产品形态、实体控制及构件安排。",
    "stages": [
      {
        "id": "form",
        "label": "外观概念",
        "title": "让产品安静融入床头",
        "body": "方案以圆柱形外壳结合织物质感顶面、环形灯光及无线充电区域，在紧凑形态中布置后部 USB-C 接口、前部麦克风与下壳通风区域。我在研发实习中参与其 CAD 设计与外观建模，以下图片展示方案研究过程。",
        "images": [
          {
            "alt": "SIMREST Q2 顶部视图：通过效果图研究顶面与拟采用的无线充电区域。",
            "caption": "通过效果图研究顶面与拟采用的无线充电区域。",
            "width": 1448,
            "height": 1086,
            "nativeWidth": 1448,
            "nativeHeight": 1086,
            "src": "/assets/process/simrest-top-interface.webp"
          },
          {
            "alt": "SIMREST Q2 后部视图：研究 USB-C 接口与下壳通风区域的布置。",
            "caption": "研究 USB-C 接口与下壳通风区域的布置。",
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
        "label": "实体控制",
        "title": "有序安排底部设置",
        "body": "初始界面方案将问候、音量、鼾声干预灵敏度及角度设置集中到底面。滑块以可见位置表达当前设置，扬声器与支脚则围绕控制区域布置。这些图用于研究界面布局，不代表相关功能已完成验证。",
        "images": [
          {
            "alt": "滑块式底部布局：四组设置滑块、扬声器孔及支脚之间的安排。",
            "caption": "四组设置滑块、扬声器孔及支脚之间的安排。",
            "width": 1254,
            "height": 1254,
            "nativeWidth": 1254,
            "nativeHeight": 1254,
            "src": "/assets/process/simrest-slider-base.webp"
          },
          {
            "alt": "音量滑块细节：拟议滑块通过高、中、低、关闭四档表达音量设置。",
            "caption": "拟议滑块通过高、中、低、关闭四档表达音量设置。",
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
        "label": "方案比较",
        "title": "探索按键式控制",
        "body": "另一方案以独立模式按键与发光状态标签替代滑块。两组效果图在保留整体底部布局的前提下，比较设置选择方式与状态传达形式，为外观及交互方案评审提供依据。",
        "images": [
          {
            "alt": "按键式底部方案：用模式按键及发光标签替代滑块。",
            "caption": "用模式按键及发光标签替代滑块。",
            "width": 1254,
            "height": 1254,
            "nativeWidth": 1254,
            "nativeHeight": 1254,
            "src": "/assets/process/simrest-button-base.webp"
          },
          {
            "alt": "按键与状态指示：音量按键的中档标签亮起，用于表达拟议状态反馈。",
            "caption": "音量按键的中档标签亮起，用于表达拟议状态反馈。",
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
        "label": "构件布局",
        "title": "把分层关系表达清楚",
        "body": "爆炸视图分开呈现顶部圆盘、环形件、织物表层、外壳、通风底座及下方面板，用于说明构件安排，以及紧凑外观如何拆分成多个零件。该图为概念装配表达，不代表已完成生产或整机验证。",
        "images": [
          {
            "alt": "SIMREST Q2 分层构件图：概念爆炸视图展示外壳与上下层构件的关系。",
            "caption": "概念爆炸视图展示外壳与上下层构件的关系。",
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
        "label": "形态比较",
        "title": "比较两种顶部轮廓",
        "body": "通过顶面平齐与中央圆盘抬升两种方案，比较外形轮廓及环形灯光的表现。相同床头情境下的并列效果图，让细微形态差异更容易被识别。",
        "images": [
          {
            "alt": "平齐式顶部：中央圆盘与顶面保持平齐的床头场景效果图。",
            "caption": "中央圆盘与顶面保持平齐的床头场景效果图。",
            "width": 1672,
            "height": 941,
            "nativeWidth": 1672,
            "nativeHeight": 941,
            "src": "/assets/process/simrest-flush-top.webp"
          },
          {
            "alt": "抬升式顶部：中央圆盘高于顶面的床头场景效果图。",
            "caption": "中央圆盘高于顶面的床头场景效果图。",
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
        "title": "明确尺度与展示方式",
        "body": "原始尺寸研究标注外径 120 mm、主体高度 45.7 mm、中央圆盘直径 54 mm，以及抬升方案的 6 mm 高差。最终床头效果图将紧凑形态放回使用场景，帮助传达外观比例与设计意图。",
        "images": [
          {
            "alt": "SIMREST Q2 原始尺寸图：侧视与俯视尺寸说明概念方案的外形尺度。",
            "caption": "侧视与俯视尺寸说明概念方案的外形尺度。",
            "width": 1800,
            "height": 906,
            "nativeWidth": 1800,
            "nativeHeight": 906,
            "src": "/assets/process/simrest-dimensions.webp"
          },
          {
            "alt": "最终床头场景效果图：在木质床头柜上展示产品的概念形态与使用情境。",
            "caption": "在木质床头柜上展示产品的概念形态与使用情境。",
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
