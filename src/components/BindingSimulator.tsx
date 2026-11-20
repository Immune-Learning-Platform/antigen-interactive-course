import { useState } from 'react'

/* ==========================================================================
   抗原—抗体匹配模拟（课堂互动 T4）
   说明：强度曲线为教学示意（用于建立“互补度决定结合强弱”的直觉），
   不是任何实验测得的亲和力数据，界面中已明确标注。
   ========================================================================== */

const LEVELS = [
  { max: 30, label: '几乎不结合', tone: '#b3261e', text: '互补程度太低：抗体可变区与表位形状/化学性质不匹配，难以形成稳定结合。此时抗体“认不出”这个表位。' },
  { max: 60, label: '弱结合 / 易解离', tone: '#b8571a', text: '存在部分互补：能短暂结合，但结合力弱、容易解离。诊断试验中可能表现为信号弱或假阴性。' },
  { max: 85, label: '有效结合', tone: '#1e7f5c', text: '互补程度较好：可形成稳定结合，是疫苗诱导保护性抗体、检测方法成立的基础区间。' },
  { max: 101, label: '强结合', tone: '#0b3b33', text: '高度互补：结合牢固。注意：抗体“结合得牢”不等于“一定能中和”，中和还取决于抗体结合的是否为关键表位。' },
]

export function BindingSimulator() {
  const [value, setValue] = useState(55)
  const level = LEVELS.find((l) => value < l.max) ?? LEVELS[LEVELS.length - 1]
  const gap = Math.max(6, 78 - value * 0.62)

  return (
    <div className="binder">
      <svg viewBox="0 0 520 220" role="img" aria-label={`互补度 ${value}% 时抗体与表位的结合示意`}>
        {/* 抗体可变区 */}
        <g transform={`translate(${40 + gap},0)`}>
          <path d="M40 170 L40 120 L10 78" fill="none" stroke="#12564c" strokeWidth={16} strokeLinecap="round" />
          <path d="M40 170 L40 120 L70 78" fill="none" stroke="#12564c" strokeWidth={16} strokeLinecap="round" />
          <path d="M10 78 L4 56" fill="none" stroke="#8fc9ae" strokeWidth={13} strokeLinecap="round" />
          <path d="M70 78 L76 56" fill="none" stroke="#8fc9ae" strokeWidth={13} strokeLinecap="round" />
          <text x={40} y={198} textAnchor="middle" fontSize={11} fill="#5a6b67">
            抗体可变区
          </text>
        </g>

        {/* 抗原表位 */}
        <g transform={`translate(${300 + gap * 0.5},0)`}>
          <path
            d="M0 120 q18 -34 36 0 q18 34 36 0"
            fill="none"
            stroke="#8fc9ae"
            strokeWidth={14}
            strokeLinecap="round"
          />
          <circle cx={18} cy={104} r={9} fill="#c9a227" />
          <circle cx={36} cy={112} r={9} fill="#c9a227" />
          <circle cx={54} cy={104} r={9} fill="#c9a227" />
          <text x={36} y={198} textAnchor="middle" fontSize={11} fill="#5a6b67">
            抗原表位
          </text>
        </g>

        {/* 结合强度条 */}
        <rect x={40} y={20} width={440} height={12} rx={6} fill="#eef2f0" />
        <rect x={40} y={20} width={(440 * value) / 100} height={12} rx={6} fill={level.tone} style={{ transition: 'width .2s' }} />
        <text x={40} y={14} fontSize={11} fill="#5a6b67">
          结合强度（示意）
        </text>
      </svg>

      <label className="binder__control">
        <span className="small">
          表位与抗体可变区的<strong>互补度</strong>：
          <b className="mono">{value}%</b>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-valuetext={`${value}%，当前判定：${level.label}`}
        />
      </label>

      <p className="binder__result" style={{ borderLeftColor: level.tone }} aria-live="polite">
        <strong style={{ color: level.tone }}>{level.label}：</strong>
        {level.text}
      </p>
      <p className="xs muted">
        教学示意：曲线与数值用于建立“互补度 → 结合强弱”的直觉，非实验结果。真实亲和力需用表面等离子共振、ELISA 等方法测定。
      </p>
    </div>
  )
}
