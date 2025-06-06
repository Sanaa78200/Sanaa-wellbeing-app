
import { useState, useEffect } from 'react';

export const useMobileDetection = () => {
  const [isMobileOptimized, setIsMobileOptimized] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileOptimized(isMobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobileOptimized };
};
