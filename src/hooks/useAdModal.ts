import { useState, useEffect } from 'react';

export function useAdModal() {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const lastAdShow = localStorage.getItem('lastAdShow');
    const now = Date.now();
    
    // Son reklam gösteriminden 1 saat geçtiyse reklamı göster
    if (!lastAdShow || now - parseInt(lastAdShow) > 3600000) {
      setShowAd(true);
      localStorage.setItem('lastAdShow', now.toString());
    }
  }, []);

  return {
    showAd,
    closeAd: () => setShowAd(false)
  };
}