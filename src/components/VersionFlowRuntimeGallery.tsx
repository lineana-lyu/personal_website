import { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Image as ImageIcon } from 'lucide-react'
import './VersionFlowRuntimeGallery.css'

type EvidenceStep = {
  id: string
  no: string
  short: string
  heading: string
  description: string
  file: string
  alt: string
  checkpoint: string
}

const steps: EvidenceStep[] = [
  {
    id: 'baseline', no: '01', short: 'Baseline', heading: '初始基线已提交',
    description: '在真实 PCB 中创建 Initial Baseline；弹窗返回器件数 1 和快照标识。这是后续比较的已提交起点。',
    file: 'baseline-v0.0.5-pass-evidence.svg',
    alt: 'VersionFlow v0.0.5 实机截取：Initial Baseline 已提交，器件数为 1。',
    checkpoint: 'A3 · 基线持久化',
  },
  {
    id: 'cp1', no: '02', short: 'CP1', heading: '第一次移动已经提交',
    description: '对 R1 第一次移动后手动提交 Checkpoint 1；弹窗显示 Committed chain: 2，表示已经形成两条历史记录。',
    file: 'cp-a-commit-v0.0.5-evidence.svg',
    alt: 'VersionFlow 实机截取：Checkpoint 1 已提交，Committed chain: 2。',
    checkpoint: 'A4 · 第一次提交',
  },
  {
    id: 'cp2', no: '03', short: 'CP2', heading: '第二次移动被追加到历史',
    description: '在第二次移动后手动提交 Checkpoint 2；历史节点由 2 增至 3，并不是把前一条历史覆盖。',
    file: 'cp-b-commit-v0.0.5-evidence.svg',
    alt: 'VersionFlow 实机截取：Checkpoint 2 已提交，Committed chain: 3。',
    checkpoint: 'A5 · 第二次提交',
  },
  {
    id: 'trace', no: '04', short: '位移查询', heading: 'R1 的两段位移可以被检索',
    description: '通过同一个内部器件 ID 关联三个已提交的位置；实机窗口显示 R1 从 Baseline 到两次 Checkpoint 的坐标变化。',
    file: 'trace-v0.0.5-evidence.svg',
    alt: 'VersionFlow Movement Trace 实机截图：R1 同一内部 ID、Baseline、Checkpoint 1 和 2 的两段位移。',
    checkpoint: 'A6 · 两段轨迹',
  },
  {
    id: 'restart', no: '05', short: '重启恢复', heading: '重启 EDA 后仍能找回轨迹',
    description: '关闭并重新打开 EDA，再次运行查询；同一 R1 的历史节点与两段位移仍被还原。',
    file: 'trace-after-restart-v0.0.5-evidence.svg',
    alt: 'VersionFlow 在嘉立创 EDA 重启后的 Movement Trace 实机截图，仍展示两次 Checkpoint 位移。',
    checkpoint: 'A7 · 重启一致',
  },
  {
    id: 'reject', no: '06', short: '重复拒绝', heading: '禁止在现有历史上重复初始化',
    description: '再次调用 Initial Baseline 后，插件返回 BASELINE_ALREADY_EXISTS；这是重复 Baseline 被拒绝的实机证据，不代表真实磁盘写入失败已通过测试。',
    file: 'duplicate-baseline-fail-v0.0.5-evidence.svg',
    alt: 'VersionFlow 实机失败状态：Baseline 未创建，Error: BASELINE_ALREADY_EXISTS。',
    checkpoint: 'A8 · 拒绝重复基线',
  },
  {
    id: 'history', no: '07', short: '历史完整', heading: '拒绝操作后，历史依然保持 3 条',
    description: '在重复 Baseline 被拒绝后查询当前状态，Committed checkpoints: 3，证明这一次被拒绝的操作没有推进历史。',
    file: 'history-after-failed-baseline-v0.0.5-evidence.svg',
    alt: 'VersionFlow 实机当前状态：Committed checkpoints 为 3，Last recorded 为 Checkpoint 2。',
    checkpoint: 'A8 · 原历史未推进',
  },
]

const asset = (filename: string) => import.meta.env.BASE_URL + 'media/versionflow/' + filename

export function VersionFlowRuntimeGallery() {
  const [activeId, setActiveId] = useState('trace')
  const selected = steps.find(step => step.id === activeId) ?? steps[3]
  const imageUrl = asset(selected.file)

  return (
    <section className="vf-real-gallery" aria-label="VersionFlow v0.0.5 七张真实运行截图">
      <div className="vf-real-gallery__intro">
        <div>
          <span>REAL RUNTIME / SEVEN VERIFIED SCREENS</span>
          <h4>真正运行过的插件，留下了什么证据？</h4>
          <p>7 张来自嘉立创 EDA 专业版 3.2.203 的真实验收截图，依次对应快照创建、两次 Checkpoint、位移查询、重启恢复和异常拒绝。保留实际界面，不用设计稿替代。</p>
        </div>
        <span className="vf-real-gallery__count">07 <small>/ 07</small></span>
      </div>

      <div className="vf-real-gallery__nav" role="tablist" aria-label="选择实机验收步骤">
        {steps.map(step => (
          <button type="button" role="tab" id={'vf-gallery-tab-' + step.id}
            aria-controls="vf-gallery-panel" aria-selected={selected.id === step.id}
            key={step.id}
            className={selected.id === step.id ? 'is-active' : ''}
            onClick={() => setActiveId(step.id)}>
            <span>{step.no}</span>
            <strong>{step.short}</strong>
          </button>
        ))}
      </div>

      <div className="vf-real-gallery__content" role="tabpanel" id="vf-gallery-panel" aria-labelledby={'vf-gallery-tab-' + selected.id}>
        <a className="vf-real-gallery__screen" href={imageUrl} target="_blank" rel="noreferrer"
          aria-label={'打开' + selected.heading + '的完整证据截图'}>
          <div className="vf-real-gallery__screen-meta">
            <span><i /> JLCEDA PRO / VERSIONFLOW 0.0.5</span>
            <span>{selected.no} / 07</span>
          </div>
          <div className="vf-real-gallery__screen-inner">
            <img src={imageUrl} alt={selected.alt} loading="lazy" />
          </div>
          <span className="vf-real-gallery__open"><ImageIcon aria-hidden="true" /> 点击放大真实截图 <ArrowUpRight aria-hidden="true" /></span>
        </a>

        <div className="vf-real-gallery__story">
          <span className="vf-real-gallery__eyebrow">EVIDENCE {selected.no} / 07</span>
          <h5>{selected.heading}</h5>
          <p>{selected.description}</p>
          <div className="vf-real-gallery__proof"><CheckCircle2 aria-hidden="true" />{selected.checkpoint}</div>
          <div className="vf-real-gallery__clarify">截图仅裁剪到原始证据区域，未修改弹窗中的运行结果。下方的坐标轨迹图为辅助理解的交互示意，并非插件原生轨迹可视化功能。</div>
        </div>
      </div>

      <div className="vf-real-gallery__foot">
        <span>截图基于 v0.0.5 单窗口实测；A8 只验证重复 Baseline 拒绝，不代表实机存储写入失败。</span>
        <a href="https://github.com/lineana-lyu/personal_website/blob/main/docs/versionflow/acceptance.md"
          target="_blank" rel="noreferrer">对应验收报告 <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}
