import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, MapPin, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FloatingStarsText from '@/components/FloatingStarsText';
import FloatingSaturn from '@/components/FloatingSaturn';
import AdSenseAd from '@/components/AdSenseAd';

const Home = () => {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: "Ready to discover your Saturn Return?",
      description: "Click 'Calculate Now' to find out when your important life transitions will occur.",
      duration: 5000,
    });
  };

  React.useEffect(() => {
    // Show toast notification after 3 seconds
    const timer = setTimeout(() => {
      showNotification();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen star-dust relative overflow-hidden">
      {/* Floating Saturn globes */}
      <FloatingSaturn 
        size="sm" 
        position="top-16 left-8" 
        delay={0} 
        rotation={-20} 
        variant="purple" 
      />
      <FloatingSaturn 
        size="md" 
        position="top-32 right-12" 
        delay={1.5} 
        rotation={15} 
        variant="golden" 
      />
      <FloatingSaturn 
        size="sm" 
        position="bottom-40 left-16" 
        delay={2.5} 
        rotation={-10} 
        variant="fiery" 
      />
      <FloatingSaturn 
        size="lg" 
        position="bottom-24 right-8" 
        delay={0.8} 
        rotation={30} 
        variant="purple" 
      />
      <FloatingSaturn 
        size="sm" 
        position="top-1/2 left-4" 
        delay={3} 
        rotation={-25} 
        variant="golden" 
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden z-10">
        <div className="cosmic-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <FloatingStarsText starCount={8} starColor="rgba(135, 206, 250, 0.8)">
                <h1 className="text-4xl md:text-5xl lg:text-6xl cosmic-title mb-6 leading-tight">
                  Discover Your <span className="text-accent sparkling-text">Saturn Return</span> Journey
                </h1>
              </FloatingStarsText>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl star-text">
                Navigate life's major transitions with our accurate Saturn Return calculator. Understand when and how this powerful astrological event will impact your life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/calculator" className="saturn-button flex items-center justify-center gap-2">
                  Calculate Now <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#about" className="bg-transparent text-foreground border border-primary/30 font-medium rounded-full px-6 py-3 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
                <div className="absolute inset-0 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="relative z-10 animate-float">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="60" fill="#E6AD4C" />
                    <ellipse
                      cx="100"
                      cy="100"
                      rx="90"
                      ry="20"
                      transform="rotate(-20 100 100)"
                      stroke="#E6AD4C"
                      strokeWidth="4"
                      fill="none"
                      className="saturn-ring"
                    />
                    <circle cx="120" cy="80" r="10" fill="#F8D89C" opacity="0.7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad placement after hero section */}
      <section className="py-8">
        <div className="cosmic-container">
          <AdSenseAd 
            slot="1234567890" 
            format="auto" 
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 starfield-bg relative z-10">
        <div className="cosmic-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FloatingStarsText starCount={6}>
              <h2 className="text-3xl md:text-4xl cosmic-title sparkling-heading mb-6">What is a Saturn Return?</h2>
            </FloatingStarsText>
            <p className="text-lg text-muted-foreground">
              A Saturn Return is an astrological transit that occurs when the planet Saturn returns to the exact same position it was at the time of your birth. This happens approximately every 29.5 years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="cosmic-card p-8">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 sparkling-text">Life Transitions</h3>
              <p className="text-muted-foreground">
                Saturn Returns mark major life transitions, often bringing challenges that lead to significant personal growth and maturity.
              </p>
            </div>

            <div className="cosmic-card p-8">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 sparkling-text">When It Happens</h3>
              <p className="text-muted-foreground">
                The first Saturn Return occurs around age 27-30, the second near 57-60, and the third (if you're lucky) around 87-90 years old.
              </p>
            </div>

            <div className="cosmic-card p-8">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 sparkling-text">Cosmic Influence</h3>
              <p className="text-muted-foreground">
                Saturn is associated with discipline, responsibility, limitations, and structures. Its return often coincides with "growing up" moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad placement between sections */}
      <section className="py-8 bg-primary/5">
        <div className="cosmic-container">
          <AdSenseAd 
            slot="2345678901" 
            format="rectangle" 
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-primary/5 relative z-10">
        <div className="cosmic-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FloatingStarsText starCount={6} starColor="rgba(121, 80, 242, 0.8)">
              <h2 className="text-3xl md:text-4xl cosmic-title mb-6">How Our Calculator Works</h2>
            </FloatingStarsText>
            <p className="text-lg text-muted-foreground">
              Our Saturn Return calculator uses precise astronomical data to determine when Saturn will return to its natal position in your birth chart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-accent/10 rounded-full w-10 h-10 flex items-center justify-center text-accent font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 sparkling-text">Enter Your Birth Details</h3>
                    <p className="text-muted-foreground">
                      Provide your date of birth, birth time, and location to establish the position of Saturn in your natal chart.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-accent/10 rounded-full w-10 h-10 flex items-center justify-center text-accent font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 sparkling-text">Add Your Current Location</h3>
                    <p className="text-muted-foreground">
                      Enter your current city to help calculate how Saturn's energy may manifest in your present environment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-accent/10 rounded-full w-10 h-10 flex items-center justify-center text-accent font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 sparkling-text">Get Your Results</h3>
                    <p className="text-muted-foreground">
                      Receive a detailed analysis of your Saturn Return periods, including exact dates, duration, and personalized insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="cosmic-card p-6 max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Birth Date</label>
                    <div className="cosmic-input bg-card/50 flex items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">January 15, 1990</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Birth Time</label>
                    <div className="cosmic-input bg-card/50 flex items-center">
                      <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">14:30 (2:30 PM)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Birth City</label>
                    <div className="cosmic-input bg-card/50 flex items-center">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">New York, USA</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Current City</label>
                    <div className="cosmic-input bg-card/50 flex items-center">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">Los Angeles, USA</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Link to="/calculator" className="saturn-button w-full flex items-center justify-center">
                      Try It Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="cosmic-container">
          <div className="cosmic-card p-10 md:p-16 text-center">
            <FloatingStarsText starCount={10}>
              <h2 className="text-3xl md:text-4xl cosmic-title mb-6">Ready to Discover Your Saturn Return?</h2>
            </FloatingStarsText>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Understand the timing and significance of this important astrological transit in your life. Get accurate calculations and personalized insights.
            </p>
            <Link to="/calculator" className="saturn-button inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
              Calculate Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final ad placement */}
      <section className="py-8">
        <div className="cosmic-container">
          <AdSenseAd 
            slot="3456789012" 
            format="horizontal" 
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
