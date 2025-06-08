
import React, { useEffect, useState } from 'react';

const PerformanceOptimizer: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<any>(null);

  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalPaths = ['/calculator', '/about', '/blog'];
      
      criticalPaths.forEach(path => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = path;
        document.head.appendChild(link);
      });
    };

    // Monitor resource loading
    const monitorResources = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const resources = performance.getEntriesByType('resource');
        
        setPerformanceData({
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          resourceCount: resources.length,
          totalTransferSize: resources.reduce((total: number, resource: any) => total + (resource.transferSize || 0), 0)
        });
      }
    };

    preloadCriticalResources();
    
    if (document.readyState === 'complete') {
      monitorResources();
    } else {
      window.addEventListener('load', monitorResources);
    }

    return () => {
      window.removeEventListener('load', monitorResources);
    };
  }, []);

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 text-xs rounded z-50">
      {performanceData && (
        <div>
          <div>DOM: {performanceData.domContentLoaded.toFixed(0)}ms</div>
          <div>Load: {performanceData.loadComplete.toFixed(0)}ms</div>
          <div>Resources: {performanceData.resourceCount}</div>
          <div>Size: {(performanceData.totalTransferSize / 1024).toFixed(1)}KB</div>
        </div>
      )}
    </div>
  );
};

export default PerformanceOptimizer;
