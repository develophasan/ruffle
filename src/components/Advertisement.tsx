import React, { useEffect } from 'react';

interface AdvertisementProps {
  adSlot: string;
  format?: 'auto' | 'fluid';
  style?: React.CSSProperties;
}

export default function Advertisement({ adSlot, format = 'auto', style }: AdvertisementProps) {
  useEffect(() => {
    try {
      // AdSense kodunu yeniden yükle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="YOUR-AD-CLIENT-ID" // AdSense hesabınızdaki client ID
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}