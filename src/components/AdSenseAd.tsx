
import React, { useEffect } from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = ''
}) => {
  useEffect(() => {
    try {
      // Only push ads if AdSense is loaded and we're not in development
      if (typeof window !== 'undefined' && 
          (window as any).adsbygoogle && 
          import.meta.env.PROD) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Don't render ads in development
  if (import.meta.env.DEV) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 p-4 text-center text-gray-500 ${className}`}>
        <p>Ad Placeholder</p>
        <p className="text-sm">Slot: {slot}</p>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

export default AdSenseAd;
