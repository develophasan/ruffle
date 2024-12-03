import type { GoldPrice } from '../types/gold';

const GOLD_MAPPINGS = {
  'GA': { type: 'gram-altin', name: 'Gram Altın' },
  'C': { type: 'ceyrek-altin', name: 'Çeyrek Altın' },
  'Y': { type: 'yarim-altin', name: 'Yarım Altın' },
  'T': { type: 'tam-altin', name: 'Tam Altın' }
};

export function formatGoldPrice(data: any): GoldPrice[] {
  if (!data) return [];
  
  return Object.entries(GOLD_MAPPINGS)
    .map(([key, info]) => {
      const item = data[key];
      if (!item) return null;

      const change = item.Değişim?.replace('%', '').trim() || '0';
      const buying = item.Alış?.replace('.', ',').trim() || '0';
      const selling = item.Satış?.replace('.', ',').trim() || '0';

      return {
        name: info.name,
        type: info.type,
        buying,
        selling,
        change,
        trend: parseFloat(change) >= 0 ? 'up' : 'down'
      };
    })
    .filter((item): item is GoldPrice => item !== null);