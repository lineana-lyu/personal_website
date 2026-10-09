import { useState } from 'react'
import { ArrowRight, CheckCircle2, ClipboardCheck, Database, FlaskConical, GitBranch, Info, RotateCcw, ShieldCheck } from 'lucide-react'
import './VersionFlowEvidence.css'

type Panel = 'trace' | 'acceptance' | 'scope'
const positions = [
  { name: 'Initial Baseline', short: 'POS-0', x: 48615, y: 83585, note: '真实 PCB 初始位置' },
  { name: 'Checkpoint 1', short: 'POS-1', x: 63365, y: 90330, note: '第一次移动后记录' },
  { name: 'Checkpoint 2', short: 'POS-2', x: 53675, y: 92645, note: '第二次移动后记录' },
]
const acceptance = [
  { id: 'A1', label: '插件加载', note: '嘉立创 EDA 中执行菜单指令' },
  { id: 'A2', label: '读取真实 PCB', note: '文档 Source 30,980 字符' },
  { id: 'A3', label: 'Baseline 持久化', note: 'EDA 重启后仍可查询' },
  { id: 'A4', label: 'Checkpoint 1', note: '提交后历史节点数为 2' },
  { id: 'A5', label: 'Checkpoint 2', note: '提交后历史节点数为 3' },
  { id: 'A6', label: '位移查询', note: '查询 R1 的两段轨迹' },
  { id: 'A7', label: '重启恢复', note: '重启后 R1 结果保持一致' },
  { id: 'A8', label: '拒绝错误提交', note: '重复 Baseline 被拒绝，历史不推进' },
]
const mapped = positions.map((p) => ({ x: 60 + ((p.x - 46000) / 22000) * 450, y: 276 - ((p.y - 82000) / 12000) * 190 }))
const tracePath = mapped.map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' ')

export function VersionFlowEvidence() {
  const [panel, setPanel] = useState<Panel>('trace')
  const [active, setActive] = useState(2)
  const current = positions[active]
  return (
    <section className="vf-evidence" aria-label="VersionFlow 真实项目证据与可视化">
      <div className="vf-evidence__heading">
        <div>
          <span>ACTUAL TEST DATA / EXPERIMENTAL MVP</span>
          <h4>R1 从哪里来，又移到了哪里？</h4>
          <p>依据上传的 v0.0.5 实机验收坐标重绘轨迹。这里是交互式证据示意，不是插件的真实 UI 截图。</p>
        </div>
        <span className="vf-build">v0.0.5 · EDA 3.2.203</span>
      </div>
      <div className="vf-evidence__tabs" role="tablist" aria-label="VersionFlow 证据章节">
        <button type="button" role="tab" aria-selected={panel === 'trace'} onClick={() => setPanel('trace')} className={panel === 'trace' ? 'is-active' : ''}><GitBranch aria-hidden="true" /> 位移轨迹</button>
        <button type="button" role="tab" aria-selected={panel === 'acceptance'} onClick={() => setPanel('acceptance')} className={panel === 'acceptance' ? 'is-active' : ''}><ClipboardCheck aria-hidden="true" /> 实机验收</button>
        <button type="button" role="tab" aria-selected={panel === 'scope'} onClick={() => setPanel('scope')} className={panel === 'scope' ? 'is-active' : ''}><FlaskConical aria-hidden="true" /> MVP 边界</button>
      </div>
      {panel === 'trace' && (
        <div className="vf-trace">
          <div className="vf-trace__top">
            <div><span>TRACKED COMPONENT</span><strong>R1</strong><small>内部 ID: f3eaf83d743d3b06</small></div>
            <div><span>COMMITTED HISTORY</span><strong>3 <small>个节点</small></strong><small>2 段位置变化 · 1 个器件</small></div>
          </div>
          <div className="vf-trace__body">
            <div className="vf-map">
              <div className="vf-map__top"><span>POSITION TRACE / XY</span><span>原始坐标 · 非物理比例示意</span></div>
              <svg role="img" aria-label="R1 从初始坐标 48615,83585 移动到 63365,90330，再移动到 53675,92645 的轨迹图" viewBox="0 0 570 320">
                <defs><pattern id="vf-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#8b9a94" strokeOpacity=".18" strokeWidth="1" /></pattern></defs>
                <rect x="0" y="0" width="570" height="320" fill="url(#vf-grid)" />
                <path d={tracePath} fill="none" stroke="#a1b8af" strokeWidth="4" strokeDasharray="7 7" strokeLinecap="round" />
                <path d={tracePath} fill="none" stroke="#4a8e81" strokeWidth="2" strokeLinejoin="round" />
                {mapped.map((p,i) => (
                  <g key={positions[i].short} opacity={i <= active ? 1 : .33}>
                    <circle cx={p.x} cy={p.y} r={active === i ? 18 : 13} fill={active === i ? '#286b5d' : '#f5f5f0'} stroke="#286b5d" strokeWidth="2" />
                    <circle cx={p.x} cy={p.y} r="3" fill={active === i ? '#fff' : '#286b5d'}/>
                    <text x={p.x} y={p.y - 25} textAnchor="middle" fill="#39564f" fontSize="13" fontWeight="750">{positions[i].short}</text>
                  </g>
                ))}
              </svg>
              <p>注意：坐标绘制为阅读示意；不表示插件已具备 PCB 画布上的轨迹叠加或可视化时间轴。</p>
            </div>
            <div className="vf-checkpoints">
              {positions.map((position,i) => <button type="button" key={position.short} onClick={() => setActive(i)} aria-pressed={active === i} className={active === i ? 'is-active' : ''}>
                <span className="vf-checkpoints__index">0{i}</span>
                <span className="vf-checkpoints__body"><strong>{position.name}</strong><small>{position.note}</small><code>({position.x}, {position.y})</code></span>
                <ArrowRight aria-hidden="true" />
              </button>)}
              <div className="vf-current"><span>SELECTED POSITION</span><strong>{current.short} · ({current.x}, {current.y})</strong>
                <small>{active === 0 ? '初始基线' : active === 1 ? '相对初始位置 Δ(+14750, +6745)' : '相对 Checkpoint 1 Δ(-9690, +2315)'}</small></div>
            </div>
          </div>
        </div>
      )}
      {panel === 'acceptance' && (
        <div className="vf-acceptance">
          <div className="vf-acceptance__intro"><div><span>DAY-1 GATE</span><strong>A1—A8</strong></div><p>八项检查在上传的实机验收记录中标记通过。A8 仅指重复 Baseline 的拒绝测试；真实存储写入失败场景未在 EDA 中执行。</p></div>
          <div className="vf-acceptance__grid">
            {acceptance.map(x => <div key={x.id}><CheckCircle2 aria-hidden="true" /><span>{x.id}</span><strong>{x.label}</strong><small>{x.note}</small></div>)}
          </div>
          <div className="vf-acceptance__note"><RotateCcw aria-hidden="true" /><span>已验证完整 EDA 重启恢复：同一个 R1 内部 ID、两段位移记录保持一致。</span></div>
        </div>
      )}
      {panel === 'scope' && (
        <div className="vf-scope">
          <div><CheckCircle2 aria-hidden="true" /><span>CONFIRMED / 已实测</span><h5>真正做到了什么</h5>
            <p>真实 PCB 文档读取；Initial Baseline；两次手动 Checkpoint；按器件位号查询两段位移；全量 EDA 重启后历史恢复；重复 Baseline 正确拒绝。</p></div>
          <div><Database aria-hidden="true" /><span>OFFLINE / 仅离线验证</span><h5>还不能声称实机通过</h5>
            <p>真实存储写入失败后的回滚、跨窗口并发创建；相关场景仅有离线模拟结果，不等同于真实 EDA 环境验证。</p></div>
          <div><Info aria-hidden="true" /><span>NOT BUILT / 后续方向</span><h5>没有提前包装成产品</h5>
            <p>实时版本树、自动变化监听、对象级完整语义 Diff、采购与生产影响判断、一键定位高亮、长期用户研究，均不属于当前 v0.0.5 交付。</p></div>
        </div>
      )}
      <footer className="vf-evidence__footer"><div><ShieldCheck aria-hidden="true" /><span>上传的源码已通过两组离线测试；实机结论来自 2026.10.08–09 的验收记录。</span></div>
        <a href="https://github.com/lineana-lyu/personal_website/blob/main/docs/versionflow/acceptance.md" target="_blank" rel="noreferrer">阅读完整验收说明 <ArrowRight aria-hidden="true" /></a></footer>
    </section>
  )
}
