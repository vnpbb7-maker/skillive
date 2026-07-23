export type SpecRow = { label: string; value: string }
export type SpecGroup = { title: string; rows: SpecRow[] }

export const notebookSpecGroups: SpecGroup[] = [
  {
    title: '製品概要',
    rows: [
      { label: '製品形式', value: 'ノートブックPC' },
      { label: '外形寸法', value: '313mm × 221.97mm × 16.9mm' },
      { label: '重量', value: '約1,300g' },
      { label: '素材', value: 'Aカバー：アルミ合金、Bカバー：マイラー、Cカバー：プラスチック' },
      { label: 'カラー', value: 'ACD：グレー、B：ブラック' },
    ],
  },
  {
    title: 'CPU',
    rows: [
      { label: 'プラットフォーム', value: 'Intel' },
      { label: 'シリーズ', value: 'Meteor Lake U（Core Ultra 5 115U）' },
      { label: 'TDP', value: '15W' },
    ],
  },
  {
    title: 'NPU / ローカルAI',
    rows: [
      { label: 'NPU性能', value: '11 TOPS（Intel AI Boost）' },
      { label: '合計AI性能', value: '約34 TOPS（CPU＋GPU＋NPU）' },
      { label: 'NPU活用機能', value: 'Studio Effects / 文字起こし' },
      { label: '対応モデル上限', value: '3B級 Q4（Qwen 2.5 3B 等）' },
      { label: 'プリインストール', value: 'Ollama + Open WebUI + Qwen 3B 等' },
    ],
  },
  {
    title: 'GPU',
    rows: [
      { label: '型番', value: 'Intel Graphics' },
      { label: 'クロック周波数', value: '最大 1.8 GHz' },
    ],
  },
  {
    title: 'メモリ（RAM）',
    rows: [
      { label: '規格', value: 'SODIMM' },
      { label: 'スロット数', value: '2' },
      { label: '周波数', value: 'DDR5 4800MT/s' },
      { label: '容量', value: '8GB〜（最大64GB）※今回注文分：不要' },
    ],
  },
  {
    title: 'ストレージ',
    rows: [
      { label: '容量', value: '128GB / 256GB / 512GB / 1TB / 2TB ※今回注文分：不要' },
      { label: 'スロット1', value: 'PCIe 4.0 ×4、M.2 2280 Key M' },
      { label: 'スロット2', value: 'PCIe 4.0 ×4、M.2 2280 Key M' },
    ],
  },
  {
    title: 'ディスプレイ',
    rows: [
      { label: 'サイズ／比率', value: '14インチ IPS LCD 16:10' },
      { label: '解像度', value: '1920×1200' },
      { label: '輝度', value: '220〜250 cd/m²' },
      { label: '接続方式', value: 'eDP' },
    ],
  },
  {
    title: 'バッテリー',
    rows: [
      { label: '種類', value: 'リチウムイオン電池' },
      { label: '仕様', value: '11.4V / 4,000mAh' },
    ],
  },
  {
    title: '無線通信',
    rows: [
      { label: 'Wi-Fi', value: 'IEEE 802.11 a/b/g/n/ax（2.4G／5G）RTL8852BE' },
      { label: 'Bluetooth', value: 'BT 5.2' },
      { label: 'インターフェース', value: 'PCIe & USB、M.2 E Key' },
      { label: 'アンテナ', value: '内蔵同軸アンテナ × 2' },
    ],
  },
  {
    title: 'カメラ / 指紋認証',
    rows: [
      { label: 'フロントカメラ', value: '2MP（1920×1080P）' },
      { label: 'リアカメラ', value: 'なし' },
      { label: '指紋認証 接続方式', value: 'USB、ワンキー電源ON対応' },
    ],
  },
  {
    title: 'オーディオ',
    rows: [
      { label: 'スピーカー', value: '4Ω 2W デュアルチャンネル × 2' },
      { label: 'マイク', value: 'デジタルマイク（D-MIC）× 2' },
    ],
  },
  {
    title: 'キーボード / タッチパッド',
    rows: [
      { label: '方式', value: 'マトリクスキーボード' },
      { label: 'バックライト', value: 'あり（2段階、白色）' },
      { label: 'レイアウト', value: 'JP 84キー' },
      { label: 'タッチパッド接続方式', value: 'HID-I2C インターフェース（メインボード側）' },
    ],
  },
  {
    title: 'インターフェース',
    rows: [
      { label: 'DCジャック', value: '×1　DC 4.0×1.7×10mm' },
      { label: 'USB-A（メインボード側）', value: 'USB 3.2 Gen1 ×1　青色、5Gbps' },
      { label: 'HDMI', value: 'HDMI Type-A ×1　HDMI 2.0、最大4096×2304@60Hz' },
      { label: 'USB-C', value: 'Type-C ×2　10Gbps、フルフィーチャー' },
      { label: 'USB-A（サブボード側）', value: 'USB 3.2 Gen1 ×2　青色' },
      { label: 'オーディオジャック', value: '3.5mm コンボジャック ×1　米国規格（CTIA）' },
      { label: 'カードリーダー', value: 'TF（microSD）カード ×1' },
    ],
  },
  {
    title: 'インジケーターランプ',
    rows: [
      { label: '電源', value: '白' },
      { label: '充電', value: '赤／緑（充電中：赤、充電完了：緑）' },
      { label: 'Caps Lock', value: '白' },
      { label: 'タッチパッドロック', value: '白' },
      { label: 'カメラ', value: '白' },
    ],
  },
  {
    title: 'セキュリティ',
    rows: [
      { label: 'ケンジントンロック', value: 'あり' },
      { label: 'TPM', value: 'ファームウェアTPM' },
    ],
  },
  {
    title: '冷却',
    rows: [
      { label: 'ファン', value: 'インテリジェントファン' },
      { label: '冷却TDP', value: '15W' },
      { label: '冷却モジュール', value: 'ヒートパイプ＋フィン構造' },
    ],
  },
  {
    title: 'ACアダプター',
    rows: [
      { label: '出力', value: 'DC 19V 3.42A 65W　日本規格、PSE認証取得済み' },
      { label: '入力', value: 'AC 100〜240V、50/60Hz' },
    ],
  },
  {
    title: 'OS',
    rows: [{ label: 'バージョン', value: 'Windows 11 Pro 25H2' }],
  },
  {
    title: 'EMC／安全規格',
    rows: [
      { label: 'EMI設計', value: '要対応' },
      { label: 'EMI試験', value: '3C / FCC / PSE' },
      { label: 'ESD試験（接触）', value: '±4KV' },
      { label: 'ESD試験（空気）', value: '±8KV' },
      { label: 'ESD保護等級', value: 'Bクラス' },
      { label: 'サージ保護', value: 'VBUS ±300V × 各10回 / VBAT ±150V × 各10回　間隔10秒' },
      { label: 'OVP保護', value: '22V（DC＋Type-C）' },
      { label: '動作温度', value: '5〜40℃（民生品）、-20〜60℃（産業品）' },
      { label: '動作湿度', value: '5〜95%（結露なし）' },
      { label: '保管温度', value: '-20〜60℃' },
      { label: '認証', value: 'CE / FCC / CCC' },
    ],
  },
  {
    title: '外装（カバー素材）',
    rows: [
      { label: 'Aカバー（天板）', value: 'アルミ合金 5052 / サンドブラスト陽極酸化 / グレー　ロゴ：カスタム' },
      { label: 'Bカバー（液晶裏面）', value: 'マイラー / 素材そのまま / ブラック　ロゴ：カスタム' },
      { label: 'Cカバー（パームレスト）', value: 'プラスチック / 塗装 / グレー　ロゴ：なし' },
      { label: 'Dカバー（底面）', value: 'アルミ合金 5052 / サンドブラスト陽極酸化 / グレー／シルバー　ロゴ：なし' },
    ],
  },
]
