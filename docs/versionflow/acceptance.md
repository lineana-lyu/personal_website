# VersionFlow v0.0.5 · 实机验收结果

> 来源：2026-10-08 至 2026-10-09 上传的 VersionFlow 归档：\`VersionFlow-Day1/docs/validation/acceptance-results.md\`。  
> 环境：**Windows · 嘉立创 EDA 专业版 3.2.203 · 单窗口**。工程/文档：\`test / PCB1\`。  
> 结论：**RUNNABLE EXPERIMENTAL PLUGIN**，而非生产级发布。

## 实机验收 A1–A8

| ID | 要求 | 本次验收记录 | 边界 |
| --- | --- | --- | --- |
| A1 | 插件实际加载 | PASS，0.0.5 | EDA 菜单回调成功 |
| A2 | 真实 PCB 读取 | PASS，0.0.5 | Source 30,980 字符，同一 R1 ID 的位置被读取 |
| A3 | Baseline 持久化 | PASS，0.0.5 | 完整 EDA 重启后仍能追踪 |
| A4 | Checkpoint 1 提交 | PASS，0.0.5 | 历史链长度 2 |
| A5 | Checkpoint 2 提交 | PASS，0.0.5 | 历史链长度 3 |
| A6 | 搜索→两段位移 | PASS，0.0.5 | 根据 R1 位号解析到同一 ID |
| A7 | 重启→同一轨迹 | PASS，0.0.5 | 查询结果与重启前一致 |
| A8 | 失败提交不推进历史 | PASS，仅重复 Baseline 拒绝场景 | \`BASELINE_ALREADY_EXISTS\`；**实际 SYS_Storage 写入失败仅离线模拟，EDA 未验证** |

上述 8 项的通过不是「任何失败情况下均可靠」，只覆盖文档明确记录的具体场景。

## 完整可追溯链

器件位号：\`R1\`。内部 ID：\`f3eaf83d743d3b06\`。

| 状态 | 位置 | 证据文件（位于上传归档内部） |
| --- | --- | --- |
| 初始状态 POS-0 | (48615, 83585) | \`e0-v0.0.4-pass.png\` |
| 建立 Baseline | 记录 1 个组件 | \`baseline-v0.0.5-pass.png\` |
| CP1 / POS-1 | (63365, 90330) | \`cp-a-position-v0.0.5.png\`、\`cp-a-commit-v0.0.5.png\` |
| CP2 / POS-2 | (53675, 92645) | \`cp-b-position-v0.0.5.png\`、\`cp-b-commit-v0.0.5.png\` |
| 搜索轨迹 | 两段位移：(+14750, +6745) 与 (-9690, +2315) | \`trace-v0.0.5.png\` |
| 重启 EDA | 仍显示同一 ID 和两段位移 | \`trace-after-restart-v0.0.5.png\` |
| 重复 Baseline | 正确拒绝，链长度保持 3 | \`duplicate-baseline-fail-v0.0.5.png\` 与 \`history-after-failed-baseline-v0.0.5.png\` |

**公开资产说明**：上述实机 PNG 截图包含在用户上传归档里，当前作品集网页呈现的是依据真实坐标绘制的交互示意，**不是原生插件截图**；此处只提供文件名与验收内容索引，没有虚构一个公开 GitHub 截图地址。

## 离线测试与不完整范围

上传归档中 \`VersionFlow-Day1/tests/mvp.test.js\` 和 \`VersionFlow-Day1/tests/runtime.test.js\` 有通过记录，本轮也分别在独立解压目录运行并通过。包括记录链、重启模拟、失败写入模拟、位号冲突模拟等。此结论**不等于**这些边界在真实 EDA 环境完整实测。

**明确仍待验证**：跨 EDA 窗口并发保存、真实持久化写入失败、全工程多器件追溯、可用性研究、完整版本回滚与生产影响分析。

## 重要设计约束

当前插件正常运行通过 EDA 扩展 API，不依赖外部 Run API Gateway。历史 Checkpoint 是手动创建的，实时 PCB 修改并不会自动出现在已提交轨迹中。单窗口是本版本的使用前提。
