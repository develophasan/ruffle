import { useState, useEffect, useCallback } from 'react';
import { getGoldPrices } from '../lib/api/goldApi';
import type { GoldPrice } from '../lib/types/gold';

export function useGoldPrices() {
  const [prices, setPrices] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      const data = await getGoldPrices();
      setPrices(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Fiyatlar güncellenirken bir hata oluştu');
      console.error('Error fetching prices:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return {
    prices,
    loading,
    error,
    lastUpdate,
    refreshing,
    refreshPrices: fetchPrices
  };
}