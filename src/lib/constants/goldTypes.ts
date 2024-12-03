export const GOLD_MAPPINGS = {
  'GA': { type: 'gram-altin', name: 'Gram Altın' },
  'C': { type: 'ceyrek-altin', name: 'Çeyrek Altın' },
  'Y': { type: 'yarim-altin', name: 'Yarım Altın' },
  'T': { type: 'tam-altin', name: 'Tam Altın' }
} as const;

export const MOCK_PRICES = [
  {
    name: 'Gram Altın',
    buying: '2.997,96',
    selling: '3.034,01',
    change: '1.05',
    type: 'gram-altin',
    trend: 'up' as const
  },
  {
    name: 'Çeyrek Altın',
    buying: '4.896,00',
    selling: '4.951,00',
    change: '0.96',
    type: 'ceyrek-altin',
    trend: 'up' as const
  },
  {
    name: 'Yarım Altın',
    buying: '9.823,00',
    selling: '9.902,00',
    change: '0.65',
    type: 'yarim-altin',
    trend: 'up' as const
  },
  {
    name: 'Tam Altın',
    buying: '19.585,00',
    selling: '19.728,00',
    change: '0.58',
    type: 'tam-altin',
    trend: 'up' as const
  }
];