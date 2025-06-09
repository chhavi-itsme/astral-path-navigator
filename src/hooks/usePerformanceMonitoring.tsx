
import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface LargestContentfulPaintEntry extends PerformanceEntry {
  renderTime: number;
  loadTime: number;
}

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    const metrics: PerformanceMetrics = {};

    // Monitor Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as LargestContentfulPaintEntry[];
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
      console.log('LCP:', metrics.lcp);
      
      // Send to analytics if needed
      if (metrics.lcp > 2500) {
        console.warn('LCP is above recommended threshold');
      }
    });

    // Monitor First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        metrics.fcp = entry.startTime;
        console.log('FCP:', metrics.fcp);
      });
    });

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShiftEntry = entry as LayoutShiftEntry;
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
        }
      }
      metrics.cls = clsValue;
      console.log('CLS:', metrics.cls);
      
      if (metrics.cls > 0.1) {
        console.warn('CLS is above recommended threshold');
      }
    });

    // Monitor Time to First Byte (TTFB)
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const navEntry = navigationEntries[0];
      metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
      console.log('TTFB:', metrics.ttfb);
    }

    if ('PerformanceObserver' in window) {
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        fcpObserver.observe({ entryTypes: ['paint'] });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Performance monitoring not supported');
      }
    }

    // Monitor long tasks that block the main thread
    const longTaskObserver = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(entry => {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry.duration, 'ms');
        }
      });
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // longtask not supported in all browsers
    }

    return () => {
      lcpObserver.disconnect();
      fcpObserver.disconnect();
      clsObserver.disconnect();
      longTaskObserver.disconnect();
    };
  }, []);
};
