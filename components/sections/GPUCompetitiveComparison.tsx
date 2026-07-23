import { competitorRows, priceAdvantage, priceAdvantageNote } from '@/lib/gpuCompetitive'

export default function GPUCompetitiveComparison() {
  return (
    <div className="mb-20" id="gpu-competitive-comparison">
      <div className="text-center mb-10">
        <p className="text-xs tracking-widest text-[#6B6A63] font-sans uppercase mb-3">
          Competitive Landscape
        </p>
        <h2 className="section-heading text-[#F5F5F0] mb-3">
          NPU搭載PC 競合比較（16GB / 256GB構成）
        </h2>
        <p className="text-[#B0AFA8] font-sans text-sm max-w-2xl mx-auto leading-relaxed">
          同クラスのNPU搭載ビジネスノートと比較しても、Skilliveは価格優位性があります。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* Comparison table */}
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm font-sans min-w-[640px]">
            <thead>
              <tr className="text-left text-xs text-[#6B6A63] uppercase tracking-wider border-b border-[rgba(201,168,76,0.15)]">
                <th className="py-3 px-4 font-normal">項目</th>
                {competitorRows.map((row) => (
                  <th
                    key={row.vendor}
                    className="py-3 px-4 font-normal text-center"
                    style={row.isOwn ? { color: '#C9A84C' } : undefined}
                  >
                    {row.vendor}
                    <div className="text-[10px] normal-case text-[#6B6A63] mt-0.5">{row.model}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'CPU', key: 'cpu' as const },
                { label: 'NPU性能', key: 'npuPower' as const },
                { label: '合計AI性能', key: 'totalAiPower' as const },
                { label: 'セキュリティ', key: 'security' as const },
              ].map((row) => (
                <tr key={row.label} className="border-b border-[rgba(255,255,255,0.04)]">
                  <td className="py-3 px-4 text-[#6B6A63]">{row.label}</td>
                  {competitorRows.map((c) => (
                    <td
                      key={c.vendor}
                      className="py-3 px-4 text-center"
                      style={c.isOwn ? { color: '#F5F5F0', fontWeight: 500 } : { color: '#B0AFA8' }}
                    >
                      {c[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ background: 'rgba(201,168,76,0.06)' }}>
                <td className="py-4 px-4 text-[#F5F5F0] font-serif">参考価格</td>
                {competitorRows.map((c) => (
                  <td
                    key={c.vendor}
                    className="py-4 px-4 text-center font-serif text-base"
                    style={{ color: c.isOwn ? '#C9A84C' : '#F5F5F0' }}
                  >
                    {c.price}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Price advantage callout */}
        <div className="glass-card p-6" id="gpu-price-advantage">
          <p className="font-serif text-lg text-[#F5F5F0] mb-5">Skillive 優位性</p>
          <div className="space-y-4 mb-6">
            {priceAdvantage.map((item) => (
              <div
                key={item.vs}
                className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.06)] last:border-b-0 last:pb-0"
              >
                <span className="text-sm text-[#B0AFA8] font-sans">対 {item.vs}</span>
                <span className="font-serif text-2xl" style={{ color: '#C9A84C' }}>
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#6B6A63] font-sans leading-relaxed">{priceAdvantageNote}</p>
        </div>
      </div>
    </div>
  )
}
