import axios from 'axios';
import * as cheerio from 'cheerio';

export interface GoldPrice {
  name: string;
  buying: string;
  selling: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

export const getGoldPrices = async (): Promise<GoldPrice[]> => {
  try {
    const response = await axios.get('https://www.haremaltin.com/canli-piyasalar');
    const $ = cheerio.load(response.data);
    const prices: GoldPrice[] = [];

    $('.table tbody tr').each((_, row) => {
      const $row = $(row);
      const name = $row.find('.span-isim').first().text().trim();
      const buying = $row.find('[id^="alis__"]').text().trim();
      const selling = $row.find('[id^="satis__"]').text().trim();
      const change = $row.find('[id^="yuzde__"]').text().trim();
      const hasUpArrow = $row.find('.rate.rise').length > 0;

      if (name && buying && selling) {
        prices.push({
          name,
          buying,
          selling,
          change,
          trend: hasUpArrow ? 'up' : 'down'
        });
      }
    });

    return prices;
  } catch (error) {
    console.error('Error fetching gold prices:', error);
    throw error;
  }
};