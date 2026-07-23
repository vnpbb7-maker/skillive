export type WorkstationSpec = { label: string; value: string }

export type WorkstationTier = {
  key: string
  tierLabel: string
  name: string
  subtitle: string
  price: string
  audience: string
  specs: WorkstationSpec[]
  accent: string
}

export const workstationTiers: WorkstationTier[] = [
  {
    key: 'tower-4000b',
    tierLabel: 'TIER 1 / DESKTOP',
    name: 'Tower 4000B',
    subtitle: 'RTX PRO 4000 Blackwell搭載',
    price: '¥580,000〜',
    audience: 'SMBオフィス / 個人事業主の本格AI機 / 中小企業の業務AI',
    specs: [
      { label: 'GPU', value: 'RTX PRO 4000 Blackwell' },
      { label: 'VRAM', value: '24GB GDDR7 ECC' },
      { label: 'メモリ帯域', value: '672 GB/s' },
      { label: 'CUDAコア', value: '8,960' },
      { label: 'AI性能（FP4）', value: '約1,500 TOPS' },
      { label: 'フォームファクタ', value: 'シングルスロット / 約140W' },
      { label: '対応モデル上限', value: '14B級 Q4（Qwen Coder 14B 等）' },
      { label: '主な解禁機能', value: 'SDXL/Flux画像生成、本格RAG、コードAgent' },
    ],
    accent: '#6DBF82',
  },
  {
    key: 'tower-5000b',
    tierLabel: 'TIER 2 / WORKSTATION',
    name: 'Tower 5000B',
    subtitle: 'RTX PRO 5000 Blackwell搭載',
    price: '¥1,280,000〜',
    audience: '部署単位 / 中堅企業 / 5-10名同時利用サーバ',
    specs: [
      { label: 'GPU', value: 'RTX PRO 5000 Blackwell' },
      { label: 'VRAM', value: '48GB GDDR7' },
      { label: 'メモリ帯域', value: '1,344 GB/s' },
      { label: 'CUDAコア', value: '14,080' },
      { label: 'AI性能（FP4）', value: '約2,400 TOPS' },
      { label: 'フォームファクタ', value: 'デュアルスロット / 約300W' },
      { label: '対応モデル上限', value: '32B級（70B Q4も辛うじて可）' },
      { label: '主な解禁機能', value: '10万件超RAG、LoRA学習、短尺動画生成' },
    ],
    accent: '#4A9EFF',
  },
  {
    key: 'tower-6000b',
    tierLabel: 'TIER 3 / SERVER-CLASS',
    name: 'Tower 6000B',
    subtitle: 'RTX PRO 6000 Blackwell搭載 — フラッグシップ',
    price: '¥2,980,000〜',
    audience: '全社AI基盤 / AI Lab / 50-100名規模の本格運用',
    specs: [
      { label: 'GPU', value: 'RTX PRO 6000 Blackwell（Workstation）' },
      { label: 'VRAM', value: '96GB GDDR7 ECC' },
      { label: 'メモリ帯域', value: '1,792 GB/s' },
      { label: 'CUDAコア', value: '24,064' },
      { label: 'AI性能（FP4）', value: '4,000 TOPS' },
      { label: 'フォームファクタ', value: 'デュアルスロット / 600W' },
      { label: '対応モデル上限', value: '70B-72B級 FP8（単機で運用可能）' },
      { label: '主な解禁機能', value: '動画生成720P+、3D生成、本格Agent並列' },
    ],
    accent: '#9B7FFF',
  },
]
