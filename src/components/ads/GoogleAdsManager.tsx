
import React, { useEffect } from 'react';

interface GoogleAdsProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
}

export const GoogleAdsManager: React.FC<GoogleAdsProps> = ({ 
  adSlot, 
  adFormat = 'auto',
  className = ''
}) => {
  useEffect(() => {
    // Initialisation Google AdSense quand disponible
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Erreur Google Ads:', error);
    }
  }, []);

  return (
    <div className={`google-ads-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // À remplacer par votre ID AdSense
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

// Composants prêts à l'emploi pour différentes positions
export const BannerAd: React.FC = () => (
  <GoogleAdsManager 
    adSlot="1234567890"
    adFormat="horizontal"
    className="w-full h-20 bg-gray-100 flex items-center justify-center"
  />
);

export const SidebarAd: React.FC = () => (
  <GoogleAdsManager 
    adSlot="0987654321"
    adFormat="vertical"
    className="w-full h-64 bg-gray-100 flex items-center justify-center"
  />
);

export const MobileAd: React.FC = () => (
  <GoogleAdsManager 
    adSlot="1122334455"
    adFormat="rectangle"
    className="w-full h-16 bg-gray-100 flex items-center justify-center"
  />
);

export default GoogleAdsManager;
