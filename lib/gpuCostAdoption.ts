export type CostTaskRow = {
  time: string
  task: string
  detail: string
  tokens: string
  yen: number
}

export const costTaskRows: CostTaskRow[] = [
  { time: '09:00', task: 'メール返信', detail: '8通', tokens: '9,600 tok', yen: 12 },
  { time: '10:30', task: '議事録要約', detail: '1本（1h会議）', tokens: '8,000 tok', yen: 10 },
  { time: '11:30', task: '顧客向け翻訳', detail: '3本', tokens: '7,500 tok', yen: 9 },
  { time: '14:00', task: '提案資料ドラフト', detail: '1本', tokens: '6,000 tok', yen: 7 },
  { time: '15:30', task: 'コード補助', detail: '2回', tokens: '8,000 tok', yen: 10 },
  { time: '16:00', task: '調査・チャットQ&A', detail: '10回', tokens: '20,000 tok', yen: 24 },
  { time: '17:00', task: 'データ分析', detail: '1本', tokens: '7,000 tok', yen: 8 },
]

export const costTaskTotal = {
  label: 'サンプル7タスク合計（参考）',
  tokens: '66,100 tok',
  yen: 80,
}

// 上記の7タスクはあくまで代表的な業務の一例。
// 実際に1日を通してAIを使う（8〜15時間/日）場合、単純なタスク単位のトークン換算では
// 実態を大きく下回ってしまうため、上位プラン（Claude Max等）の実勢価格を基準に再計算。
export const realisticPlan = {
  label: 'Claude Max等 上位プラン',
  priceUsd: 200,
  priceYen: 33000,
  usdToJpy: 165,
  hoursPerDay: '8〜15時間',
  workDaysPerMonth: 20,
  perDay: 1650, // 33,000円 ÷ 20営業日
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
  '※上記は「代表的な7タスク」の単純なトークン換算（¥80/日）ではなく、1日8〜15時間AIを使い続ける実利用を前提に、Claude Max等の上位サブスクリプション（$200/月 ≈ ¥33,000、1ドル＝165円換算）を基準に再計算した実質コストです。タスク単位の従量課金だけでは、実際の連続利用（対話・コーディング支援・エージェント作業等）を大きく下回るため、上位プラン基準の方が実態に近いと考えています。';

export type PaymentPlan = {
  key: string
  label: string
  sublabel: string
  badge?: string
  perMonth: number
  perYear: number
  teamPerYear: number
  strengths: string[]
  weaknesses: string[]
  accent: string
}

export const paymentPlans: PaymentPlan[] = [
  {
    key: 'api',
    label: 'API実消費課金',
    sublabel: '使った分だけ',
    perMonth: 1600,
    perYear: 19200,
    teamPerYear: 192000,
    strengths: ['実需要のみ', '上限なし', '個別に従量制御'],
    weaknesses: ['管理工数あり', 'データ外部送信', '価格変動リスク'],
    accent: '#C9A84C',
  },
  {
    key: 'subscription',
    label: 'サブスク固定',
    sublabel: 'ChatGPT / Claude Team',
    badge: '一般的',
    perMonth: 4650,
    perYear: 55800,
    teamPerYear: 558000,
    strengths: ['簡単・予算固定', 'サポート付き', 'GUI完備'],
    weaknesses: ['実需要の約3倍', '上限超過は別料金', 'データ外部送信'],
    accent: '#B0AFA8',
  },
  {
    key: 'own-hardware',
    label: '自社端末所有',
    sublabel: 'Skillive Notebook / GPU',
    badge: '推奨',
    perMonth: 0,
    perYear: 0,
    teamPerYear: 0,
    strengths: ['利用無制限', 'データ完全社内', '永久にゼロ'],
    weaknesses: ['初期投資（約1年回収）', '電気代のみ', 'モデル更新は手動'],
    accent: '#4A9EFF',
  },
]
