export interface GoldPrice {
  name: string;
  buying: string;
  selling: string;
  change: string;
  type: string;
  trend: 'up' | 'down';
}

export interface RawGoldData {
  Alış: string;
  Satış: string;
  Değişim: string;
  Tür: string;
}