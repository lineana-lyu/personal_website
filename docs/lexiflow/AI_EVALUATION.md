# LexiFlow｜AI 能力与评测设计

> LF-AI-EVAL-087 · 2026-10-08 · 产品评测方案。未获得的统计数据不作为已取得的成绩。

## 一、模型应该做什么

定位为 Coach, not Authority：AI 可以帮助澄清词义、细化个人联想、审核原创表达和给出候选编辑；学习阶段、Today 计划、Review 日期与 Stable 状态由确定性学习核心负责。

| 任务 | 典型问题 | 评价方式 | 当前状态 |
| --- | --- | --- | --- |
| 中文反查 | 词性与目标义项混淆 | 人工意图黄金集、Top-1 匹配率 | 有实现与规则；人工标注待执行 |
| Visualize | AI 直接替用户构造第一联想 | 用户首创性与调用边界回归 | 已有结构和脚本检查 |
| Apply 诊断 | 同句反复检查不一致、错误 span 不准 | span F1、误报率、复检一致率 | 有契约及回归；无已发布准确率 |
| 可执行修正 | 误改原本正确的介词、冠词、专名 | 不安全改写率 | 有独立编辑验证 |
| AI 失败 | 草稿丢失、无法理解失败原因 | 实机降级走查 | 完整实机评测待执行 |
| 词源解释 | 无来源编造词源故事 | 权威黄金集、证据正确率 | 仍需更全面验证 |

## 二、真实问题驱动的两个案例

### A. 同一原句得到不同修改意见

历史反馈涉及 Apply 同句多次检查时出现不稳定建议。目标不是做一个会润色的聊天框，而是让学习者明确理解自己哪处确有问题、是否必须修正，以及谁最终控制输入文本。

现有实现将诊断契约与一键修改动作分离；改动动作需要独立验证，且同一输入可复用持久化检查结果。证据见 [Apply Quality 回归脚本](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-apply-quality-v3.js) 与 [诊断契约](https://github.com/lineana-lyu/lexiflow/blob/main/lib/sentence-feedback-contract.js)。这里不把源码断言解释为模型对所有语句的准确率保证。

### B. 错误识别单词内部的 i

历史反馈中，ride 内部字符 i 被误判成独立代词；另一种情况是真正的小写代词漏检。评测应包含下列对照句：

- “I ride a bike.”：不应错误标记 ride 内的字母。
- “i ride a bike.”：独立小写代词应该被正确处理。
- “I like riding.”：riding 内部字母不应被作为单独代词诊断。

应根据词法边界与准确字符 span 识别，而不是仅使用字符串包含规则。这是应纳入评测的场景，不是本轮已重新跑通全部模型的证明。

## 三、评测协议

区分四层证据：

1. 静态源码和契约检查：确认业务约束存在、旧不当逻辑没有回归。
2. 接口与持久化集成测试：验证保存失败、AI 调用失败和状态一致性。
3. Windows 实机人工走查：评估阅读、输入、重试、跳过和恢复是否自然。
4. 用户与语言黄金集研究：客观测算准确率、任务效率及学习收益。

每次执行记录 Commit、模型配置、数据集版本、具体输入、预期和实际输出、复现步骤与日志。未运行的维度标记为待测，不填零也不虚填高分。

## 四、相关证据

- [运行时 AI 权限边界](https://github.com/lineana-lyu/lexiflow/blob/main/docs/RUNTIME_AUTHORITY_V3.md)
- [Apply 回归检查](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-apply-quality-v3.js)
- [Visualize 输入隔离检查](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-visualize-input-isolation-v3.js)
- [Learning Engine Check](https://github.com/lineana-lyu/lexiflow/actions/workflows/learning-check.yml)
