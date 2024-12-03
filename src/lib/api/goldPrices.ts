import axios from 'axios';
import type { GoldPrice } from '../types/gold';

const API_URL = 'https://finans.truncgil.com/v2/today.json';

// Mock data for fallback
const fallbackPrices: GoldPrice[] = [
  {
    name: 'Gram Altın',
    buying: '2.997,96',
    selling: '3.034,01',
    change: '1.05',
    trend: 'up'
  },
  {
    name: 'Çeyrek Altın',
    buying: '4.896,00',
    selling: '4.951,00',
    change: '0.96',
    trend: 'up'
  },
  {
    name: 'Yarım Altın',
    buying: '9.823,00',
    selling: '9.902,00',
    change: '0.65',
    trend: 'up'
  },
  {
    name: 'Tam Altın',
    buying: '19.585,00',
    selling: '19.728,00',
    change: '0.58',
    trend: 'up'
  }
];

export async function getGoldPrices(): Promise<GoldPrice[]> {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      timeout: 5000
    });

    const data = response.data;
    
    if (!data) {
      return fallbackPrices;
    }

    const prices: GoldPrice[] = [];

    // Map API data to our format
    const mappings = {
      'gram-altin': { key: 'GA', name: 'Gram Altın' },
      'ceyrek-altin': { key: 'C', name: 'Çeyrek Altın' },
      'yarim-altin': { key: 'Y', name: 'Yarım Altın' },
      'tam-altin': { key: 'T', name: 'Tam Altın' }
    };

    Object.entries(mappings).forEach(([_, info]) => {
      const item = data[info.key];
      if (item) {
        const change = item.Değişim?.replace('%', '') || '0';
        prices.push({
          name: info.name,
          buying: item.Alış?.replace('.', ',') || '0',
          selling: item.Satış?.replace('.', ',') || '0',
          change,
          trend: parseFloat(change) >= 0 ? 'up' : 'down'
        });
      }
    });

    return prices.length > 0 ? prices : fallbackPrices;
  } catch (error) {
    console.error('Error fetching gold prices:', error);
    return fallbackPrices;
  }
}