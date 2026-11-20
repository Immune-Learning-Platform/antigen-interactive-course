import { useState } from 'react'
import { ModelViewer, type ViewerPart } from '../three/ModelViewer'
import { createAntibodyScene } from '../three/createAntibodyScene'
import { createBacteriumScene } from '../three/createBacteriumScene'
import { createVirusScene } from '../three/createVirusScene'
import { EpitopeTypesVisual } from './visuals'
import { Tag } from './ui'

/* ==========================================================================
   三维实验室组件：表位实验室 / 结构解剖台 / AI 结构预测示意
   所有模型均为程序化生成的原创几何，无外部模型文件、无版权与元数据风险。
   ========================================================================== */

function LabPanel({
  parts,
  activeId,
  onPick,
  intro,
}: {
  parts: ViewerPart[]
  activeId: string | null
  onPick: (id: string) => void
  intro: string
}) {
  const active = parts.find((p) => p.id === activeId)
  return (
    <aside className="lab__panel" aria-live="polite">
      <p className="xs muted">{intro}</p>
      <div className="lab__chips">
        {parts.map((p) => (
          <button
            key={p.id}
            type="button"
            className="chip chip--sm"
            aria-pressed={p.id === activeId}
            onClick={() => onPick(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
      {active ? (
        <div className="lab__detail">
          <Tag tone="gold">已选中</Tag>
          <h4>{active.label}</h4>
          <p className="small">{active.detail}</p>
        </div>
      ) : (
        <div className="lab__detail lab__detail--empty">
          <h4>操作提示</h4>
          <ul className="small">
            <li>拖动模型旋转，滚轮缩放；点击模型上的结构或上方标签查看说明。</li>
            <li>用工具栏按钮显示/隐藏部件与模拟处理（如变性）。</li>
            <li>三维不可用时自动降级为静态图示，内容不丢失。</li>
          </ul>
        </div>
      )}
    </aside>
  )
}

/** 表位实验室：抗体—抗原 + 线性/构象表位 */
export function EpitopeLab() {
  const [parts, setParts] = useState<ViewerPart[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="lab">
      <ModelViewer
        factory={createAntibodyScene}
        title="抗体与抗原表位模型"
        badge="三维模型 · 表位"
        hint="拖动旋转 · 滚轮缩放 · 点击表位查看说明"
        height={430}
        onReady={setParts}
        onSelect={(p) => setActiveId(p?.id ?? null)}
        selectedId={selected}
        fallback={<EpitopeTypesVisual />}
      />
      <LabPanel
        parts={parts}
        activeId={activeId}
        onPick={(id) => {
          setSelected(id)
          setActiveId(id)
        }}
        intro="模型包含：抗体可变区、抗原表面、线性表位、构象表位。试试点选“构象表位”后打开工具栏的“变性处理”。"
      />
    </div>
  )
}

/** 结构解剖台：细菌 / 病毒切换 */
export function StructureLab() {
  const [tab, setTab] = useState<'bacterium' | 'virus'>('bacterium')
  const [parts, setParts] = useState<ViewerPart[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const switchTab = (next: 'bacterium' | 'virus') => {
    setTab(next)
    setParts([])
    setActiveId(null)
    setSelected(null)
  }

  return (
    <div className="lab">
      <div className="lab__stage">
        <div className="figure__toolbar">
          <button
            type="button"
            className="btn btn--quiet btn--sm"
            aria-pressed={tab === 'bacterium'}
            onClick={() => switchTab('bacterium')}
          >
            细菌（革兰阳性菌）
          </button>
          <button
            type="button"
            className="btn btn--quiet btn--sm"
            aria-pressed={tab === 'virus'}
            onClick={() => switchTab('virus')}
          >
            有囊膜病毒
          </button>
          <span className="xs muted">切换到不同病原，观察“结构成分抗原”的差别</span>
        </div>
        {tab === 'bacterium' ? (
          <ModelViewer
            factory={createBacteriumScene}
            title="细菌结构成分抗原模型"
            badge="三维模型 · 细菌"
            height={420}
            onReady={setParts}
            onSelect={(p) => setActiveId(p?.id ?? null)}
            selectedId={selected}
            fallback={<p className="small">当前环境不支持 WebGL，请使用下方结构清单查看各部分说明。</p>}
          />
        ) : (
          <ModelViewer
            factory={createVirusScene}
            title="病毒结构成分抗原模型"
            badge="三维模型 · 病毒"
            height={420}
            onReady={setParts}
            onSelect={(p) => setActiveId(p?.id ?? null)}
            selectedId={selected}
            fallback={<p className="small">当前环境不支持 WebGL，请使用下方结构清单查看各部分说明。</p>}
          />
        )}
      </div>
      <LabPanel
        parts={parts}
        activeId={activeId}
        onPick={(id) => {
          setSelected(id)
          setActiveId(id)
        }}
        intro={
          tab === 'bacterium'
            ? '细菌侧重点在“零件”：H 抗原（鞭毛）、O 抗原（菌体）、荚膜抗原、菌毛抗原、革兰阳性菌磷壁酸。'
            : '病毒侧重点在“外壳与核酸”：衣壳蛋白、包膜糖蛋白、核酸抗原。'
        }
      />
    </div>
  )
}

/** AI 结构解析示意：置信度着色 + 区域点击 */
const AI_REGIONS = [
  {
    id: 'core',
    label: '核心折叠区（高置信）',
    detail: '结构预测置信度高，通常对应保守的疏水核心与稳定二级结构，适合作为结构研究的起点。',
    color: '#1f6fd0',
  },
  {
    id: 'surface',
    label: '表面环区（低置信）',
    detail: '表面环区柔性大、置信度低，但恰恰常是抗体识别的表位所在——低置信不等于不重要，需要实验补证。',
    color: '#e0762f',
  },
  {
    id: 'patch',
    label: '候选表位区',
    detail: '结合结构暴露程度与序列特征预测的候选表位区域；预测结果需用血清学或结构实验验证。',
    color: '#c9a227',
  },
]

export function AiStructureVisual() {
  const [active, setActive] = useState(AI_REGIONS[0].id)
  const hit = AI_REGIONS.find((r) => r.id === active) ?? AI_REGIONS[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 640 240" role="img" aria-label="抗原结构预测的置信度示意：核心区高置信、表面环区低置信、候选表位区">
        <path
          d="M70 160 C110 70, 170 200, 220 120 S300 40, 350 130 S440 210, 500 110 S570 60, 590 120"
          fill="none"
          stroke="#d7e2de"
          strokeWidth={16}
          strokeLinecap="round"
        />
        <path
          d="M70 160 C110 70, 170 200, 220 120 S300 40, 350 130"
          fill="none"
          stroke={active === 'core' ? '#1f6fd0' : '#7aa8e0'}
          strokeWidth={active === 'core' ? 20 : 16}
          strokeLinecap="round"
          onClick={() => setActive('core')}
          style={{ cursor: 'pointer' }}
        />
        <path
          d="M350 130 S440 210, 500 110"
          fill="none"
          stroke={active === 'surface' ? '#e0762f' : '#f0b27f'}
          strokeWidth={active === 'surface' ? 20 : 16}
          strokeLinecap="round"
          onClick={() => setActive('surface')}
          style={{ cursor: 'pointer' }}
        />
        <path
          d="M500 110 S570 60, 590 120"
          fill="none"
          stroke={active === 'patch' ? '#c9a227' : '#e3cf8f'}
          strokeWidth={active === 'patch' ? 20 : 16}
          strokeLinecap="round"
          onClick={() => setActive('patch')}
          style={{ cursor: 'pointer' }}
        />
        <g>
          {[
            [220, 120],
            [350, 130],
            [500, 110],
          ].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r={5} fill="#fff" stroke="#0b3b33" strokeWidth={1.5} />
          ))}
        </g>
        <text x={70} y={30} fontSize={11.5} fill="#5a6b67">
          颜色示意结构预测置信度：蓝 = 高置信；橙 = 低置信（柔性环区）；金 = 候选表位区
        </text>
        <text x={70} y={228} fontSize={11} fill="#5a6b67">
          教学示意，不代表任何具体蛋白的真实预测结果；预测需实验验证。
        </text>
      </svg>
      <div className="figure__toolbar">
        {AI_REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            className="btn btn--quiet btn--sm"
            aria-pressed={active === r.id}
            onClick={() => setActive(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{hit.label}：</strong>
        {hit.detail}
      </p>
    </div>
  )
}
