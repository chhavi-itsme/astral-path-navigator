
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StarryBackground from "./components/StarryBackground";
import FloatingSaturn from "./components/FloatingSaturn";
import ShootingStars from "./components/ShootingStars";
import Sitemap from "./components/Sitemap";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 bg-primary/20 rounded-full filter blur-xl animate-pulse"></div>
      <div className="w-full h-full animate-spin">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="80 170" />
        </svg>
      </div>
    </div>
  </div>
);

// Optimize query client config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent refetching data when window regains focus
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1, // Only retry failed requests once
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <StarryBackground />
          <ShootingStars count={5} speed={8} /> {/* Reduced count from 8 to 5 */}
          
          {/* Floating Saturn decorations with different variants - reduced number */}
          <FloatingSaturn size="lg" position="top-20 -left-10" delay={1} variant="golden" />
          <FloatingSaturn size="sm" position="bottom-40 right-10" delay={2} variant="purple" />
          <FloatingSaturn size="md" position="top-1/3 right-5" delay={3} variant="fiery" />
          
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          
          {/* Sitemap */}
          <div className="cosmic-container mb-12">
            <Sitemap />
          </div>
          
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
