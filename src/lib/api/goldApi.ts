import axios from 'axios';
import { GOLD_MAPPINGS, MOCK_PRICES } from '../constants/goldTypes';
import type { GoldPrice, RawGoldData } from '../types/gold';

const API_URL = 'https://finans.truncgil.com/v2/today.json';

export async function getGoldPrices(): Promise<GoldPrice[]> {
  try {
    const response = await axios.get<Record<string, RawGoldData>>(API_URL, {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      timeout: 5000
    });

    if (!response.data) {
      return MOCK_PRICES;
    }

    const prices: GoldPrice[] = [];

    Object.entries(GOLD_MAPPINGS).forEach(([key, info]) => {
      const item = response.data[key];
      if (item) {
        const change = item.Değişim?.replace('%', '').trim() || '0';
        const buying = item.Alış?.replace('.', ',').trim() || '0';
        const selling = item.Satış?.replace('.', ',').trim() || '0';

        prices.push({
          name: info.name,
          type: info.type,
          buying,
          selling,
          change,
          trend: parseFloat(change) >= 0 ? 'up' : 'down'
        });
      }
    });

    return prices.length > 0 ? prices : MOCK_PRICES;
  } catch (error) {
    console.error('Error fetching gold prices:', error);
    return MOCK_PRICES;
  }
}