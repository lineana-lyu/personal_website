# LexiFlow｜产品验收与测试矩阵

> LF-QA-087 · 2026-10-08 · 与 v0.8.7 作品集配套。业务预期、已有回归约束和人工实测结论必须区分。

## 一、验收原则

- 学习核心是状态权威；不能依赖界面 DOM 的旧文本推进阶段。
- 点击按钮不等于持久化成功；存储确认后才推进任务或游标。
- 复习调度不由 AI 决定，且需要支持跨日与意外重启。
- AI 请求失败不得被显示为用户的语言错误，也不得丢失原句。
- 自动化检查与真实用户成功完成任务是两种不同证据。

## 二、主要验收矩阵

| 编号 | Given / When | Then | 对照脚本 |
| --- | --- | --- | --- |
| AC-01 | 从 Today 新建并确认词义 / 保存 | 直接完成 Select；明天 Memorize；不重复确认 | [Select V3](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-select-stage-v3.js) |
| AC-02 | Pending 卡片 / Today 批量选择 | 只选学习时间，不重复确认语义 | [Select V3](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-select-stage-v3.js) |
| AC-03 | 已冻结 DailyPlan / 刷新 | 当日成员身份与优先级一致 | [DailyPlan](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-daily-plan-persistence-v3.js) |
| AC-04 | 漏学多天 / 开启新学习日 | 不累积遗漏的新词配额、Review 受保护 | [StudyDay](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-studyday-due-v3.js) |
| AC-05 | Apply 直接复制参考例句 / 完成 | 不能作为原创表达通关 | [Apply Quality](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-apply-quality-v3.js) |
| AC-06 | 已审核 Apply 句子 / 编辑原文 | 审核失效并要求重新检查 | [Apply Quality](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-apply-quality-v3.js) |
| AC-07 | AI 请求出错 / 重试 | 保留原句、明确错误类型和重试路径 | [Apply Actions](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-apply-actions-v3.js) |
| AC-08 | Visualize 无个人联想 / 打开 | 不自动发送生成请求 | [Input Isolation](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-visualize-input-isolation-v3.js) |
| AC-09 | Review 首次答错 / 提交 | 进入 Again，受限同日修复与次日验证 | [Review Policy](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-review-policy-v3.js) |
| AC-10 | 网络不可用 / 本地英文查词 | 基础本地词典仍可使用 | [Local Runtime](https://github.com/lineana-lyu/lexiflow/blob/main/scripts/check-local-runtime-smoke-v3.js) |

## 三、可追溯的 Select 迭代

用户反映在选词卡、单词库和 Today 之间需要重复确认。现行设计是在制卡时确认具体词义，在 Today 只决定哪些词进入学习计划。

- [移除重复确认层的提交](https://github.com/lineana-lyu/lexiflow/commit/2bf79a900504f099ae67d0ed27e0d2517fbcb9dd)
- [删除旧 Select renderer](https://github.com/lineana-lyu/lexiflow/commit/6b7e0899ccd865c6dedd7b2abb4aca61b43ba568)
- [单步 Select 回归](https://github.com/lineana-lyu/lexiflow/commit/4c2027e45d33d847ee84c3095b12309cf587dafd)

## 四、测试执行记录规范

对每条用例记录运行版本、Windows / 浏览器信息、执行时间、预期 / 实际界面、可复现路径、日志或截图、缺陷级别及关联修复 Commit。

**证据状态声明**：上面的矩阵是验收设计与已有代码检查的索引，非所有用例在本轮制作作品集时均进行完整 Windows 实机验收。用户学习效率、留存、模型准确率和长期记忆效果仍需额外数据支撑。

## 五、公开交付

- [GitHub Actions — Learning Engine Check](https://github.com/lineana-lyu/lexiflow/actions/workflows/learning-check.yml)
- [Windows Releases](https://github.com/lineana-lyu/lexiflow/releases)
- [当前项目 README](https://github.com/lineana-lyu/lexiflow/blob/main/README.md)
