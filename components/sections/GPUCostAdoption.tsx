import { Check, X } from 'lucide-react'
import {
  costTaskRows,
  costTaskTotal,
  costPersona,
  costFootnote,
  realisticPlan,
  paymentPlans,
} from '@/lib/gpuCostAdoption'

function formatYen(amount: number) {
  return `¥${amount.toLocaleString('ja-JP')}`
}

export default function GPUCostAdoption() {
  return (
    <div className="mb-20" id="gpu-cost-adoption">
      {/* ── A day in the life ── */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background: '#C9A84C' }} />
            <span className="eyebrow" style={{ color: '#C9A84C' }}>COST &amp; ADOPTION</span>
            <div className="h-px w-8" style={{ background: '#C9A84C' }} />
          </div>
          <p className="text-xs tracking-widest text-[#6B6A63] font-sans uppercase mb-3">
            A Day in the Life — Subscription as Yen
          </p>
          <h2 className="section-heading text-[#F5F5F0] mb-3">
            営業の太郎さん — 1日のAIコストは実は{' '}
            <span style={{ color: '#C9A84C' }}>{formatYen(realisticPlan.perDay)}</span> 相当
          </h2>
          <p className="text-[#B0AFA8] font-sans text-sm max-w-2xl mx-auto leading-relaxed">
            1日{realisticPlan.hoursPerDay}、継続的にAIを使う実利用ベースで再計算。{realisticPlan.label}（${realisticPlan.priceUsd}/月 ≈ {formatYen(realisticPlan.priceYen)}）クラスの契約が実質的に必要な水準です。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          {/* Task table */}
          <div className="glass-card overflow-hidden">
            <div className="px-4 pt-4 pb-1 text-xs text-[#6B6A63] font-sans">
              1日8〜15時間、継続的にAIを使った場合の内訳
            </div>
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="text-left text-xs text-[#6B6A63] uppercase tracking-wider border-b border-[rgba(201,168,76,0.15)]">
                  <th className="py-3 px-4 font-normal">時刻</th>
                  <th className="py-3 px-4 font-normal">タスク</th>
                  <th className="py-3 px-4 font-normal text-right">トークン</th>
                  <th className="py-3 px-4 font-normal text-right">円換算</th>
                </tr>
              </thead>
              <tbody>
                {costTaskRows.map((row) => (
                  <tr
                    key={row.time}
                    className="border-b border-[rgba(255,255,255,0.04)]"
                    id={`gpu-cost-row-${row.time.replace(':', '')}`}
                  >
                    <td className="py-3 px-4 text-[#6B6A63]">{row.time}</td>
                    <td className="py-3 px-4 text-[#F5F5F0]">
                      {row.task} <span className="text-[#6B6A63]">{row.detail}</span>
                    </td>
                    <td className="py-3 px-4 text-right text-[#B0AFA8]">{row.tokens}</td>
                    <td className="py-3 px-4 text-right text-[#F5F5F0] font-medium">
                      ¥{row.yen}
                    </td>
                  </tr>
                ))}
                <tr style={{ background: 'rgba(201,168,76,0.08)' }}>
                  <td colSpan={2} className="py-4 px-4 text-[#F5F5F0] font-serif text-base">
                    {costTaskTotal.label}
                  </td>
                  <td className="py-4 px-4 text-right text-[#B0AFA8]">{costTaskTotal.tokens}</td>
                  <td className="py-4 px-4 text-right text-xl font-serif" style={{ color: '#C9A84C' }}>
                    ¥{costTaskTotal.yen}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Persona card */}
          <div className="glass-card p-6 flex flex-col" id="gpu-cost-persona">
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[rgba(201,168,76,0.15)]">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg flex-shrink-0"
                style={{ background: '#C9A84C20', color: '#C9A84C', border: '1px solid #C9A84C40' }}
              >
                {costPersona.initial}
              </div>
              <div>
                <p className="font-serif text-lg text-[#F5F5F0]">{costPersona.name}</p>
                <p className="text-xs text-[#6B6A63] font-sans">{costPersona.role}</p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {costPersona.stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#B0AFA8] font-sans">{stat.label}</span>
                  <div className="text-right">
                    <p className="font-serif text-lg" style={{ color: '#4A9EFF' }}>
                      {formatYen(stat.yen)}
                    </p>
                    <p className="text-[10px] text-[#6B6A63] font-sans">{stat.tokens}</p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-auto p-4 text-sm font-sans text-[#B0AFA8] leading-relaxed"
              style={{ background: 'rgba(74,158,255,0.06)', border: '1px solid rgba(74,158,255,0.2)' }}
            >
              <span style={{ color: '#4A9EFF' }} className="font-medium">ポイント：</span>
              {' '}この実消費を、企業はどう支払うか？
            </div>
          </div>
        </div>
        <p className="text-[11px] text-[#6B6A63] font-sans mt-3 leading-relaxed">{costFootnote}</p>
      </div>

      {/* ── Three ways to pay ── */}
      <div>
        <div className="text-center mb-10">
          <p className="text-xs tracking-widest text-[#6B6A63] font-sans uppercase mb-3">
            Three Ways to Pay
          </p>
          <h2 className="section-heading text-[#F5F5F0] mb-3">
            支払方法は3つ — どれが一番もったいないか
          </h2>
          <p className="text-[#B0AFA8] font-sans text-sm max-w-2xl mx-auto leading-relaxed">
            太郎さんのように1日8〜15時間AIを使う社員では、従量課金でも固定サブスクでも、月あたりの負担はほぼ同水準（約¥33,000）になる。自社端末を所有すれば、その負担そのものがゼロになる。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {paymentPlans.map((plan) => (
            <div
              key={plan.key}
              className="glass-card p-6 flex flex-col relative overflow-hidden"
              id={`gpu-payment-plan-${plan.key}`}
              style={plan.badge === '推奨' ? { border: `1px solid ${plan.accent}60` } : undefined}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: plan.accent }}
              />
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif text-xl text-[#F5F5F0]">{plan.label}</h3>
                {plan.badge && (
                  <span
                    className="text-xs font-sans px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: `${plan.accent}20`,
                      color: plan.accent,
                      border: `1px solid ${plan.accent}40`,
                    }}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6B6A63] font-sans mb-5">{plan.sublabel}</p>

              <div className="space-y-2 mb-6 pb-5 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-[#6B6A63]">1人 / 月</span>
                  <span className="text-[#F5F5F0]">{formatYen(plan.perMonth)}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-[#6B6A63]">1人 / 年</span>
                  <span className="text-[#F5F5F0]">{formatYen(plan.perYear)}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-[#6B6A63]">10人 / 年</span>
                  <span className="font-serif text-lg" style={{ color: plan.accent }}>
                    {formatYen(plan.teamPerYear)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-sans mb-2" style={{ color: '#6DBF82' }}>強み</p>
                <ul className="space-y-1.5">
                  {plan.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm font-sans text-[#B0AFA8]">
                      <Check size={14} style={{ color: '#6DBF82' }} className="flex-shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-sans mb-2 text-[#B0605A]">弱み</p>
                <ul className="space-y-1.5">
                  {plan.weaknesses.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-sm font-sans text-[#B0AFA8]">
                      <X size={14} className="flex-shrink-0 mt-0.5 text-[#B0605A]" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
