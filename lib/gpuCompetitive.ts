export type CompetitorRow = {
  vendor: string
  model: string
  cpu: string
  npuPower: string
  totalAiPower: string
  security: string
  price: string
  isOwn?: boolean
}

// 構成基準: 16GB / 256GB
export const competitorRows: CompetitorRow[] = [
  {
    vendor: 'Dell',
    model: 'Pro 14 Premium',
    cpu: 'Core Ultra 5 125U',
    npuPower: '11 TOPS',
    totalAiPower: '約34 TOPS',
    security: 'vPro Essentials',
    price: '¥280,000〜',
  },
  {
    vendor: 'HP',
    model: 'EliteBook 840 G12',
    cpu: 'Core Ultra 5/7',
    npuPower: '11-12 TOPS',
    totalAiPower: '約34 TOPS',
    security: 'HP Wolf Security',
    price: '¥290,000〜',
  },
  {
    vendor: 'NEC',
    model: 'VersaPro VX-R',
    cpu: 'Core Ultra 5/7 200U',
    npuPower: '12 TOPS',
    totalAiPower: '約36 TOPS',
    security: 'Secured-Core PC',
    price: '¥388,850〜',
  },
  {
    vendor: 'Skillive',
    model: 'S-Core（16GB/256GB）',
    cpu: 'Core Ultra 5 115U',
    npuPower: '11 TOPS',
    totalAiPower: '約34 TOPS',
    security: 'TPM 2.0 + BTO',
    price: '¥198,000〜',
    isOwn: true,
  },
]

export const priceAdvantage = [
  { vs: 'NEC', pct: -49 },
  { vs: 'HP', pct: -32 },
  { vs: 'Dell', pct: -29 },
]

export const priceAdvantageNote =
  '中間流通マージン排除＋ベンダー直接調達による構造的優位。法人ボリューム導入のハードルを下げる。'
