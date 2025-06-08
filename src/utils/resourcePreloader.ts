
// Resource preloader for critical assets
export class ResourcePreloader {
  private static preloadedResources = new Set<string>();

  static preloadRoute(route: string) {
    if (this.preloadedResources.has(route)) return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
    
    this.preloadedResources.add(route);
  }

  static preloadImage(src: string, priority: 'high' | 'low' = 'low') {
    if (this.preloadedResources.has(src)) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    if (priority === 'high') {
      link.setAttribute('fetchpriority', 'high');
    }
    document.head.appendChild(link);
    
    this.preloadedResources.add(src);
  }

  static preloadFont(src: string) {
    if (this.preloadedResources.has(src)) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = src;
    document.head.appendChild(link);
    
    this.preloadedResources.add(src);
  }

  static preloadCriticalCSS() {
    // Inline critical CSS for above-the-fold content
    const criticalCSS = `
      .cosmic-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      .cosmic-title { font-weight: 700; background: linear-gradient(to right, #7950f2, #4cc9f0); 
                     -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .saturn-button { background: linear-gradient(135deg, #7950f2, #4cc9f0); color: white; 
                      padding: 0.75rem 1.5rem; border-radius: 9999px; transition: all 0.3s; }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  }

  static initializePreloading() {
    // Preload critical routes on app start
    requestIdleCallback(() => {
      this.preloadRoute('/calculator');
      this.preloadRoute('/about');
      this.preloadCriticalCSS();
    });
  }
}

// Initialize on module load
if (typeof window !== 'undefined') {
  ResourcePreloader.initializePreloading();
}
