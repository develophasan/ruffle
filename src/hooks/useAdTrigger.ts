import { useState, useEffect } from 'react';

export function useAdTrigger() {
  const [shouldShowAd, setShouldShowAd] = useState(false);

  useEffect(() => {
    const lastAdTime = localStorage.getItem('lastAdTime');
    const now = Date.now();
    const hourInMs = 3600000; // 1 saat

    if (!lastAdTime || (now - Number(lastAdTime)) > hourInMs) {
      setShouldShowAd(true);
      localStorage.setItem('lastAdTime', now.toString());
    }
  }, []);

  const triggerAd = () => {
    setShouldShowAd(true);
    localStorage.setItem('lastAdTime', Date.now().toString());
  };

  return { shouldShowAd, setShouldShowAd, triggerAd };
}