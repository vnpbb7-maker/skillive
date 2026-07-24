export type CostTaskRow = {
  time: string
  task: string
  detail: string
  tokens: string
  yen: number
}

// 「1日8〜15時間、継続的にAIを使う」実態を反映し、同じ7つの業務カテゴリのまま
// トークン量を実利用水準（複数ターンの対話・文脈の再送・推敲込み）まで引き上げて算出。
// レートはClaude Sonnet水準の標準API課金（$3 input/$15 output per MTok相当）を
// ¥150/USDでブレンドした約¥1.2 / 1,000トークンで統一。
export const costTaskRows: CostTaskRow[] = [
  { time: '09:00', task: 'メール返信', detail: '35通（スレッド往復含む）', tokens: '180,000 tok', yen: 216 },
  { time: '10:30', task: '議事録要約', detail: '3本（資料付き会議）', tokens: '150,000 tok', yen: 180 },
  { time: '11:30', task: '顧客向け翻訳', detail: '8本（提案書・契約書等）', tokens: '220,000 tok', yen: 264 },
  { time: '14:00', task: '提案資料ドラフト', detail: '3本（推敲・修正込み）', tokens: '260,000 tok', yen: 312 },
  { time: '15:30', task: 'コード補助', detail: '12回（対話形式）', tokens: '240,000 tok', yen: 288 },
  { time: '16:00', task: '調査・チャットQ&A', detail: '30回（継続的な壁打ち）', tokens: '210,000 tok', yen: 252 },
  { time: '17:00', task: 'データ分析', detail: '4本（複数シート横断）', tokens: '115,000 tok', yen: 138 },
]

export const costTaskTotal = {
  label: '1日 合計（7タスク）',
  tokens: '1,375,000 tok',
  yen: 1650,
}

export const realisticPlan = {
  label: 'Claude Max等 上位プラン',
  priceUsd: 200,
  priceYen: 33000,
  usdToJpy: 165,
  hoursPerDay: '8〜15時間',
  workDaysPerMonth: 20,
  perDay: 1650, // 33,000円 ÷ 20営業日 ＝ 上のタスク表の合計とも一致
}

export const costPersona = {
  initial: '太',
  name: '太郎さん',
  role: '営業部 / 入社5年目 / AI活用社員',
  stats: [
    { label: '1日（20営業日換算）', yen: 1650, tokens: '8〜15時間利用' },
    { label: '1ヶ月', yen: 33000, tokens: 'Claude Max等 $200/月' },
    { label: '1年', yen: 396000, tokens: '¥33,000 × 12ヶ月' },
    { label: '10人チーム / 年', yen: 3960000, tokens: '¥396,000 × 10名' },
  ],
}

export const costFootnote =
  '※タスクの内訳は「1日8〜15時間、継続的にAIを使う」実利用を前提に、複数ターンの対話・文脈の再送・推敲などを含めて算出（¥1.2 / 1,000トークン換算）。この水準の利用では、従量課金で積み上げても、Claude Max等の上位サブスクリプション（$200/月 ≈ ¥33,000、1ドル＝165円換算）とほぼ同水準のコストになります。'

export type PaymentPlan = {
  key: string
  label: string
  sublabel: string
  badge?: string
  perMonth: number
  perYear: number
  teamPerYear: number
  // 使用量によって変動するプラン（従量課金）向け。指定時はperMonth等の代わりに範囲表示する。
  perMonthRange?: [number, number]
  perYearRange?: [number, number]
  teamPerYearRange?: [number, number]
  note?: string
  strengths: string[]
  weaknesses: string[]
  accent: string
}

// 上のタスク表と同じ利用量（1日1,375,000 tok ≒ ¥1,650）を「平均的な月」として、
// 従量課金・固定サブスク・自社端末所有の3パターンを比較。
// 従量課金は使用量次第で変動するため、月の軽重で±20〜25%ほど上下する前提でレンジ表示。
export const paymentPlans: PaymentPlan[] = [
  {
    key: 'api',
    label: 'API実消費課金',
    sublabel: '使った分だけ（月により変動）',
    perMonth: 33000,
    perYear: 396000,
    teamPerYear: 3960000,
    perMonthRange: [25000, 42000],
    perYearRange: [300000, 500000],
    teamPerYearRange: [3000000, 5000000],
    note: '※実利用量に応じて変動（月平均¥33,000を想定）',
    strengths: ['軽い月は安く済む', '上限なく使える', '個別に従量制御'],
    weaknesses: ['重い月は上振れする', '管理工数あり', 'データ外部送信'],
    accent: '#C9A84C',
  },
  {
    key: 'subscription',
    label: 'サブスク固定',
    sublabel: 'Claude Max等（上位固定プラン）',
    badge: '固定額',
    perMonth: 33000,
    perYear: 396000,
    teamPerYear: 3960000,
    strengths: ['月によらず定額', '予測可能な固定費', 'サポート・GUI完備'],
    weaknesses: ['軽い月でも定額', '上限超過は上位プラン要', 'データ外部送信'],
    accent: '#B0AFA8',
  },
  {
    key: 'own-hardware',
    label: '自社端末所有',
    sublabel: 'Skillive Notebook ¥198,000（6年償却換算）',
    badge: '推奨',
    perMonth: 2750,
    perYear: 33000,
    teamPerYear: 330000,
    note: '※¥198,000（16GB/256GBモデル）を6年で均等償却した場合の換算',
    strengths: ['初期投資は約6ヶ月で回収', '7年目以降は追加費用ほぼゼロ', 'データ完全社内'],
    weaknesses: ['初期費用をまとめて用意', '電気代は別途', 'モデル更新は手動'],
    accent: '#4A9EFF',
  },
]
