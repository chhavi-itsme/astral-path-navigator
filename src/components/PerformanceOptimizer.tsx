
import React, { useEffect, useState } from 'react';

const PerformanceOptimizer: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<any>(null);

  useEffect(() => {
    // Preload critical resources with high priority
    const preloadCriticalResources = () => {
      const criticalPaths = ['/calculator', '/about'];
      
      criticalPaths.forEach(path => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = path;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });

      // Preconnect to external domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://images.unsplash.com',
        'https://pagead2.googlesyndication.com'
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Monitor resource loading and set up caching
    const monitorResources = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const resources = performance.getEntriesByType('resource');
        
        // Calculate web vitals
        const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        const loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
        
        setPerformanceData({
          fcp: fcp.toFixed(0),
          domContentLoaded: domContentLoaded.toFixed(0),
          loadComplete: loadComplete.toFixed(0),
          resourceCount: resources.length,
          totalTransferSize: resources.reduce((total: number, resource: any) => total + (resource.transferSize || 0), 0),
          cacheHitRate: resources.filter((r: any) => r.transferSize === 0).length / resources.length * 100
        });
      }
    };

    // Optimize images loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        const imageElement = img as HTMLImageElement;
        if (!imageElement.getAttribute('width') || !imageElement.getAttribute('height')) {
          console.warn('Image missing dimensions - may cause CLS:', imageElement.src);
        }
      });
    };

    preloadCriticalResources();
    optimizeImages();
    
    if (document.readyState === 'complete') {
      monitorResources();
    } else {
      window.addEventListener('load', monitorResources);
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener('load', monitorResources);
    };
  }, []);

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-3 text-xs rounded-lg z-50 max-w-48">
      {performanceData && (
        <div className="space-y-1">
          <div className="font-bold text-green-400">Web Vitals</div>
          <div>FCP: {performanceData.fcp}ms</div>
          <div>DOM: {performanceData.domContentLoaded}ms</div>
          <div>Load: {performanceData.loadComplete}ms</div>
          <div>Resources: {performanceData.resourceCount}</div>
          <div>Size: {(performanceData.totalTransferSize / 1024).toFixed(1)}KB</div>
          <div>Cache: {performanceData.cacheHitRate.toFixed(0)}%</div>
        </div>
      )}
    </div>
  );
};

export default PerformanceOptimizer;
