
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

// Lazy load pages for better performance with preloading hints
const Home = lazy(() => 
  import("./pages/Home").then(module => {
    // Preload calculator page when home loads
    import("./pages/Calculator");
    return module;
  })
);
const Calculator = lazy(() => import("./pages/Calculator"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Enhanced loading fallback with skeleton
const PageLoader = () => (
  <div className="min-h-[50vh] py-12">
    <div className="cosmic-container">
      <LoadingSkeleton variant="hero" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <LoadingSkeleton variant="card" count={6} />
      </div>
    </div>
  </div>
);

// Optimized query client config with caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 15 * 60 * 1000, // 15 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (renamed from cacheTime)
      retry: (failureCount, error) => {
        // Smarter retry logic
        if (failureCount < 2) return true;
        return false;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

// Service worker registration for caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const App = () => (
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
          
          {/* Sitemap with lazy loading */}
          <div className="cosmic-container mb-12">
            <Suspense fallback={<LoadingSkeleton variant="text" count={3} />}>
              <Sitemap />
            </Suspense>
          </div>
          
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
