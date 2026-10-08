# LexiFlow｜产品需求文档（PRD）

> **LF-PRD-PORTFOLIO-087 · v0.8.7 作品集对照稿 · 2026-10-08**  
> 状态：基于公开仓库代码、产品契约和历史迭代整理，**不代表正式上线评审签字文件**。  
> 产品形态：Windows 桌面应用 / 本地优先 / 单用户。  
> 角色：独立产品设计与开发，未虚构跨部门团队、用户研究数据或商业成果。  
> 实现基线：[LexiFlow main](https://github.com/lineana-lyu/lexiflow)；[package.json](https://github.com/lineana-lyu/lexiflow/blob/main/package.json)。

## 1. 产品定义与机会

LexiFlow 并非只提供单词释义或记忆打卡的词典，而是把学习者遇到的具体词义转化为「可以主动回忆、联想到个人情境、运用到原创表达，并经过周期复习巩固」的学习对象。产品面向在电脑上学习英语、阅读时收集生词、希望提升表达能力的自学者。

**核心用户任务（JTBD）**

> 当我在阅读、课程或练习中遇到新词时，我希望快速确认正在理解的那个义项，保存并安排少量可完成的练习，日后能够把它写进自己的句子，而不是只停留在看懂中文翻译。

**用户价值假设（尚未通过长期用户研究验证）**

- 减少选词、制卡与加入学习计划之间的无意义往返。
- 保护需要到期复习的单词，不因漏学而产生强制的新词债务。
- 把「AI 替用户生成答案」转为「用户先尝试，AI 根据需要辅导」。
- 本地词典和确定性学习核心在网络或模型不可用时继续工作。

产品定位、功能运行和模型质量是不同层面的证据。本项目已具备开源软件和自动化检查，但**没有可公开核验的留存提升、A/B 转化率或英语水平提高比例**，因此不写虚构的增长数字。

## 2. 目标用户与典型场景

| 场景 | 真实产品问题 | 对应能力 |
| --- | --- | --- |
| 阅读时遇词 | 在线等待、义项不明确、查完就忘 | 本地查词、明确词义、制卡 |
| 今天准备学新词 | 重复确认词义、入口间反复跳转 | Today 直达制卡，Pending 批量选择 |
| 单词看得懂但写不出 | 缺乏主动回忆与原创表达 | Memorize、Apply |
| 想用自己的记忆场景联想 | AI 直接生成可能脱离用户经验 | Visualize 用户先写，AI 按需细化 |
| 几天没有学习 | 新词堆积；旧词复习被挤掉 | 冻结 DailyPlan、复习优先、No Vocabulary Debt |
| AI 检查失败或给出错误建议 | 不确定什么才算学会 | 明确错误、保留草稿、AI 只当教练 |

以上目标用户为产品画像假设，而非伪称来自已完成的定量访谈。

## 3. 产品目标与非目标

### 3.1 本期目标

**G1｜完整学习路径**：用户可从本地词典查词进入词卡，明确具体词义，经 Select → Memorize → Visualize → Apply → Review 进行训练。

**G2｜可解释的今日计划**：Today 给出有限的当日任务，旧词到期复习优先，正常流程不累积漏学的新词配额。

**G3｜有效的原创表达**：Apply 必须由用户先表达，AI 提供结构化诊断与建议，系统不能把复制词典例句当作真实应用。

**G4｜本地可用与失败兜底**：网络或 AI 服务不可用时保留基本查词、制卡、持久化和手动学习能力。

### 3.2 不在本期成果范围

不把完整的口语自动评分、社交排名、班级协作、云端多端同步、具有完整覆盖率的权威词源解释、经实证提升的记忆效果写作已交付成果。

## 4. 功能优先级与范围

| ID | 功能 | 优先级 | 当前产品要求 | 证据 |
| --- | --- | --- | --- | --- |
| F01 | 本地查词与确认目标词义 | P0 | 英文 / 中文反查 / 常见短语，本地词典优先 | [README](https://github.com/lineana-lyu/lexiflow/blob/main/README.md) |
| F02 | 今日加入新词 | P0 | Today 制卡完成 Select；Pending 可批量选入，不重复确认词义 | [Select Intake](https://github.com/lineana-lyu/lexiflow/blob/main/public/select-intake-v3.js) |
| F03 | 阶段学习 | P0 | 五阶段、正常情况跨学习日推进 | [产品契约](https://github.com/lineana-lyu/lexiflow/blob/main/docs/PRODUCT_LEARNING_CONTRACT_V3.md) |
| F04 | 到期复习 | P0 | 冻结计划、Review Again、Stable 维护 | [Learning Core](https://github.com/lineana-lyu/lexiflow/blob/main/public/learning-core-v3.js) |
| F05 | 语音与参考例句 | P0 | 词典音频优先、本地 Kokoro / 系统语音降级、整句播放 | [README](https://github.com/lineana-lyu/lexiflow/blob/main/README.md) |
| F06 | AI 联想与表达反馈 | P1 | 用户先联想/表达，AI 按需补充 | [运行时职责](https://github.com/lineana-lyu/lexiflow/blob/main/docs/RUNTIME_AUTHORITY_V3.md) |
| F07 | 词源可信解释 | P2 | 无权威证据不可编造教学故事 | 历史测试反馈；仍在完善 |
| F08 | 本地学习数据 | P0 | Electron userData 持久化，不需云端账户 | [README](https://github.com/lineana-lyu/lexiflow/blob/main/README.md) |

## 5. 信息架构

常用入口：**今日学习**（任务与计划）、**查词 / 添加单词**（理解词义与制卡）、**单词库**（Pending、学习词卡）、**设置**（本地能力和选项）。

### 旅程 A｜从 Today 创建新词

1. 在 Today 发起添加词卡。
2. 查词并确认本次要学的义项、词性、例句与发音。
3. 保存并完成 Select 记账。
4. 页面明确提示：下一学习日开始 Memorize。

### 旅程 B｜先收藏，之后安排

1. 从侧栏查词，确认义项并制卡。
2. 词卡进入单词库的 Pending。
3. 用户在 Today 从 Pending 选择下一次要学习的词卡，可批量确认。
4. Today **不再第二次询问这张词卡的义项**；下一学习日开始 Memorize。

两条路径保持相同的学习阶段约束，仅根据用户是否立即纳入 Today 决定保存路径。

## 6. 核心业务规则

1. **学习对象是具体词义**，不是只看拼写是否相同。
2. **阶段模型**：Select → Memorize → Visualize → Apply → Review。Stable 是记忆状态，不是第六个活动阶段。
3. **正常跨日**：完成一个阶段通常在下一个合资格 StudyDay 才可执行下一阶段；单日不能串行通关所有阶段。
4. **Today 冻结**：同一 StudyDay 的 DailyPlan 是有限、可恢复且幂等的；优先级 Review → Memorize → Visualize → Apply → Select。
5. **No Vocabulary Debt**：漏学不累积强制新词配额；Review 负担大时，优先减少当日新词容量。
6. **记忆梯度**：Review 为 1 → 3 → 7 → 16 → 21；Stable 维护目标为 30 → 45 → 68 → 90（允许有界平滑窗口）。
7. **失败记忆**：首次复习错误进入 Review Again；同日最多一次修复，修复成功也不能直接恢复长间隔，次学习日再验证。
8. **Advance Learning**：当天常规任务完成后最多提前解锁一项合资格的 Memorize / Visualize / Apply；Review 不能提前。

更精确的状态转移与数据字段以[产品学习契约 V3](https://github.com/lineana-lyu/lexiflow/blob/main/docs/PRODUCT_LEARNING_CONTRACT_V3.md)为准。

## 7. AI 产品规则

| 位置 | AI 可以做 | 不可以做 | 失败兜底 |
| --- | --- | --- | --- |
| 查词补充 | 提供可选解释和例句 | 没有权威来源仍声称正确词源 | 优先保留本地词典事实 |
| Visualize | 用户先写联想后细化场景或生成图片 | 页面打开即自动替用户创建联想 | 保留草稿、上传图片、跳过 |
| Apply | 检查语义用法、语法、自然性，提出候选修改 | 自动替用户造句、静默采纳编辑、由模型决定学习状态 | 保留原句、具体报错、重试或明确跳过 |
| Review / Today | 不参与日期与状态决策 | 任意决定阶段、记忆等级、任务成员 | 确定性规则独立运行 |

## 8. 可验收需求

| 编号 | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | 用户从 Today 创建卡并确认义项 | 保存词卡 | 完成 Select；下个学习日 Memorize；无二次确认 |
| AC-02 | Pending 中已有目标词卡 | 从 Today 批量选择 | 只确认学习安排，不重复确认义项 |
| AC-03 | 今日计划已创建 | 刷新或重新打开 | 同一天任务成员身份不随意变动 |
| AC-04 | 用户漏学几日 | 新 StudyDay 开始 | 不追加历史新词欠债；到期复习优先 |
| AC-05 | Apply 输入复制词典例句 | 试图完成阶段 | 拒绝视为原创表达并说明原因 |
| AC-06 | Apply 已完成文本检查 | 用户修改原句 | 旧检查结果失效，需重新检查 |
| AC-07 | AI 调用出错 | 检查或重试 | 失败是接口异常而非语言错误；用户输入不丢失 |
| AC-08 | 尚未有用户联想 | 打开 Visualize | 不自动消耗 AI 请求 |
| AC-09 | Review 首次答错 | 提交复习结果 | 进入 Again；受限同日修复与隔日验证 |
| AC-10 | 在线服务不可用 | 英文基础查词 | 可在本地词典中继续查询 |

**证据等级**：上述规则可和源码及其自动化检查对照；这不等于全部 Windows 交互均已在本次作品集制作时重新实测通过。

## 9. 指标口径与后续研究

这些是**计划指标，不是已有结果**。

- **阶段漏斗**：查词 → 选定义项 → 保存卡片 → 纳入 Today → Memorize → Visualize → Apply → Review。
- **流程效率**：从新词入口到成功保存的操作步数、耗时、重复确认次数。
- **质量**：中文反查意图 Top-1 匹配、Apply 诊断 span F1、同句复检一致率、建议误改率。
- **学习负荷**：到期 Review 完成率、新词负荷分布、漏学后重返学习的任务峰值。
- **长期价值**：隔日/周回忆表现、是否真正将目标词义用于原创表达；需要取得用户同意并独立研究。

## 10. 风险、依赖和下一步

- **词源可信性**：词根外观拆分不等于历史词源，需要权威出处与保守回退。
- **中文语义漂移**：反查结果需要人工黄金集验证常用语义和意图。
- **AI 反馈不稳定**：使用结构化诊断、固定规则与验证闭环仍不代表所有句子都准确。
- **首次 TTS 模型加载**：模型与系统降级的体验、延迟需要设备实测。
- **学习价值证据不足**：需要任务式用户访谈、实机走查、短期和长期记忆前后测。

## 11. 参考证据

- [当前公开版本与下载](https://github.com/lineana-lyu/lexiflow/releases)
- [产品学习契约 V3](https://github.com/lineana-lyu/lexiflow/blob/main/docs/PRODUCT_LEARNING_CONTRACT_V3.md)
- [运行时职责与边界 V3](https://github.com/lineana-lyu/lexiflow/blob/main/docs/RUNTIME_AUTHORITY_V3.md)
- [Select Intake V3](https://github.com/lineana-lyu/lexiflow/blob/main/public/select-intake-v3.js)
- [Apply Quality V3 检查脚本](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-apply-quality-v3.js)
- [学习引擎自动化检查](https://github.com/lineana-lyu/lexiflow/actions/workflows/learning-check.yml)

---

本文件为作品集展示稿，所有尚未量化验证的假设都保留研究状态，不将测试脚本等同于用户价值证明。
