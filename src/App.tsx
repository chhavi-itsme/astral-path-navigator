
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StarryBackground from "./components/StarryBackground";
import FloatingSaturn from "./components/FloatingSaturn";
import ShootingStars from "./components/ShootingStars";
import Sitemap from "./components/Sitemap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <StarryBackground />
          <ShootingStars count={8} speed={8} />
          
          {/* Floating Saturn decorations */}
          <FloatingSaturn size="lg" position="top-20 -left-10" delay={1} />
          <FloatingSaturn size="sm" position="bottom-40 right-10" delay={2} />
          <FloatingSaturn size="md" position="top-1/3 right-5" delay={3} />
          <FloatingSaturn size="sm" position="bottom-10 left-1/4" delay={0.5} />
          
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
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
