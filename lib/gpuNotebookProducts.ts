// ノートPC（GPUハードウェア事業）の販売バリエーション定義
// 金額はJPY（Stripeでは0桁通貨のため unit_amount = 円そのまま）
// ★ このファイルが価格の正本です。API側もここを参照するため、
//    クライアントから送られた金額を信用することはありません。

export type NotebookVariant = {
  sku: string
  memory: string
  storage: string
  price: number // JPY
  note: string
  isBase?: boolean
}

export const NOTEBOOK_PRODUCT_NAME = 'Skillive Notebook PC（Core Ultra 5 115U / 14インチ）'

export const notebookVariants: NotebookVariant[] = [
  {
    sku: 'nb-8gb-256gb',
    memory: '8GB',
    storage: '256GB',
    price: 179250,
    note: '基準からメモリ -15,000円',
  },
  {
    sku: 'nb-8gb-512gb',
    memory: '8GB',
    storage: '512GB',
    price: 188000,
    note: '上記からSSD +7,000円',
  },
  {
    sku: 'nb-16gb-256gb',
    memory: '16GB',
    storage: '256GB',
    price: 198000,
    note: '今回の指定基準価格',
    isBase: true,
  },
  {
    sku: 'nb-16gb-512gb',
    memory: '16GB',
    storage: '512GB',
    price: 206750,
    note: '上記からSSD +7,000円',
  },
  {
    sku: 'nb-32gb-512gb',
    memory: '32GB',
    storage: '512GB',
    price: 256750,
    note: '上記からメモリ +40,000円',
  },
  {
    sku: 'nb-32gb-1tb',
    memory: '32GB',
    storage: '1TB',
    price: 269250,
    note: '上記からSSD +10,000円',
  },
]

export function getVariantBySku(sku: string): NotebookVariant | undefined {
  return notebookVariants.find((v) => v.sku === sku)
}
