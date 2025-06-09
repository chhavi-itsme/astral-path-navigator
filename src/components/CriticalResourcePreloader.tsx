
import { useEffect } from 'react';

const CriticalResourcePreloader = () => {
  useEffect(() => {
    // Preload critical CSS and JS resources
    const preloadResources = [
      { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', as: 'style' },
      { href: '/calculator', as: 'document' },
      { href: '/about', as: 'document' }
    ];

    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'style') {
        link.onload = () => {
          link.rel = 'stylesheet';
        };
      }
      document.head.appendChild(link);
    });

    // Prefetch non-critical pages
    const prefetchPages = ['/blog', '/contact'];
    prefetchPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });

    // Optimize critical path rendering
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // Load non-critical resources during idle time
        import('../pages/Blog');
        import('../pages/Contact');
      });
    }

  }, []);

  return null;
};

export default CriticalResourcePreloader;
