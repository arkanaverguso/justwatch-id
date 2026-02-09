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

        const nativeContainer = document.getElementById('container-45aeef9ea1ee8d947538a9ff8ebecd66');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/45aeef9ea1ee8d947538a9ff8ebecd66/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/e0/88/53/e0885363b4640e0dc9c82e284031e7a1.js' }
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
            if(document.querySelector(`script[src*="fd454ca8bbfdf45add030fd0b58b33da"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/fd/45/4c/fd454ca8bbfdf45add030fd0b58b33da.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}