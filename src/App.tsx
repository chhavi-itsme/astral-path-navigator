
import React, { Suspense, lazy } from "react";
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
import { usePerformanceMonitoring } from "./hooks/usePerformanceMonitoring";

// Lazy load pages with intelligent preloading
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
const NotFound = lazy(() => import("./pages/NotFound"));

// Enhanced loading fallback with better skeleton
const PageLoader = () => (
  <div className="min-h-[50vh] py-12">
    <div className="cosmic-container">
      <LoadingSkeleton variant="hero" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <LoadingSkeleton variant="card" count={3} />
      </div>
    </div>
  </div>
);

// Optimized query client with better caching and compression
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // 30 minutes
      gcTime: 60 * 60 * 1000, // 1 hour
      retry: (failureCount, error) => {
        // Smart retry with exponential backoff
        if (failureCount < 3) return true;
        return false;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: 'offlineFirst', // Better offline support
    },
    mutations: {
      retry: 2,
      networkMode: 'offlineFirst',
    },
  },
});

// Enhanced service worker registration with update handling
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    })
      .then(registration => {
        console.log('SW registered: ', registration);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, could show update notification
                console.log('New content available, please refresh');
              }
            });
          }
        });
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const App = () => {
  // Monitor performance in development
  usePerformanceMonitoring();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
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
  );
};

export default App;
