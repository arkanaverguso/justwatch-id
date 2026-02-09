// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-4a5705cdb7bbadd6a7add349c1b9a244');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/4a5705cdb7bbadd6a7add349c1b9a244/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/d3/d2/ec/d3d2ec57ad2f2c846fe9d9e858375554.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="bfcec8f0eff6cad240aac6aff0895b41"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/bf/ce/c8/bfcec8f0eff6cad240aac6aff0895b41.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}