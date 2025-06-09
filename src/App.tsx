
import React, { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sitemap from "./components/Sitemap";
import LoadingSkeleton from "./components/LoadingSkeleton";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import CriticalResourcePreloader from "./components/CriticalResourcePreloader";
import { usePerformanceMonitoring } from "./hooks/usePerformanceMonitoring";

// Lazy load pages with intelligent preloading and priority hints
const Home = lazy(() => 
  import("./pages/Home").then(module => {
    // Preload calculator and about pages when home loads
    const preloadPromises = [
      import("./pages/Calculator"),
      import("./pages/About")
    ];
    Promise.all(preloadPromises);
    return module;
  })
);

const Calculator = lazy(() => 
  import("./pages/Calculator").then(module => {
    // Preload blog when calculator loads
    import("./pages/Blog");
    return module;
  })
);

const About = lazy(() => 
  import("./pages/About").then(module => {
    // Preload contact when about loads
    import("./pages/Contact");
    return module;
  })
);

const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Enhanced loading fallback with better skeleton and no CLS
const PageLoader = () => (
  <div className="min-h-[50vh] py-12" style={{ minHeight: '400px' }}>
    <div className="cosmic-container">
      <LoadingSkeleton variant="hero" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <LoadingSkeleton variant="card" count={3} />
      </div>
    </div>
  </div>
);

// Highly optimized query client with aggressive caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: (failureCount, error) => {
        if (failureCount < 2) return true;
        return false;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: 1,
      networkMode: 'offlineFirst',
    },
  },
});

// Enhanced service worker registration with better update handling
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    })
      .then(registration => {
        console.log('SW registered with scope:', registration.scope);
        
        // Handle updates more efficiently
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Show update notification without forcing reload
                console.log('New content available');
                // Could dispatch custom event for update notification
                window.dispatchEvent(new CustomEvent('sw-update-available'));
              }
            });
          }
        });
      })
      .catch(registrationError => {
        console.log('SW registration failed:', registrationError);
      });
  });
}

const App = () => {
  // Monitor performance in development
  usePerformanceMonitoring();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CriticalResourcePreloader />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-background">
              <Navbar />
              <main className="flex-grow">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              
              {/* Sitemap with enhanced lazy loading */}
              <div className="cosmic-container mb-12">
                <Suspense fallback={<LoadingSkeleton variant="text" count={3} />}>
                  <Sitemap />
                </Suspense>
              </div>
              
              <Footer />
            </div>
          </BrowserRouter>
          
          {/* Performance monitoring component */}
          <PerformanceOptimizer />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
