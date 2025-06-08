
import React from 'react';
import FloatingStarsText from '@/components/FloatingStarsText';
import FloatingSaturn from '@/components/FloatingSaturn';
import { Calculator, Star, Users, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
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

      <div className="cosmic-container relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <FloatingStarsText starCount={8} starColor="rgba(135, 206, 250, 0.8)">
            <h1 className="text-4xl md:text-5xl cosmic-title mb-6">About Our Saturn Return Calculator</h1>
          </FloatingStarsText>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Understanding the cosmic timing of your life's most transformative periods through precise astrological calculations.
          </p>
        </div>

        {/* What We Do */}
        <section className="mb-16">
          <div className="cosmic-card p-8 md:p-12">
            <FloatingStarsText starCount={6}>
              <h2 className="text-3xl cosmic-title mb-6 text-center">What We Do</h2>
            </FloatingStarsText>
            <div className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                Our Saturn Return Calculator is a sophisticated tool designed to help you understand one of astrology's most significant transits. 
                By analyzing the position of Saturn at your birth and its current celestial journey, we provide precise calculations of when 
                your Saturn Return periods will occur.
              </p>
              <p>
                Saturn Returns are pivotal moments that happen approximately every 29.5 years, marking major life transitions and periods of 
                growth. Our calculator doesn't just tell you when these periods will happen—it helps you understand what they mean and how 
                to navigate them with wisdom and preparation.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <FloatingStarsText starCount={6}>
            <h2 className="text-3xl cosmic-title mb-12 text-center">Why Our Calculator Stands Out</h2>
          </FloatingStarsText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="cosmic-card p-6 text-center">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Calculator className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 sparkling-text">Precise Calculations</h3>
              <p className="text-muted-foreground">
                Using advanced astronomical data to provide accurate Saturn Return timing down to the exact dates.
              </p>
            </div>

            <div className="cosmic-card p-6 text-center">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 sparkling-text">Personalized Insights</h3>
              <p className="text-muted-foreground">
                Tailored interpretations based on your unique birth chart and current life circumstances.
              </p>
            </div>

            <div className="cosmic-card p-6 text-center">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 sparkling-text">User-Friendly</h3>
              <p className="text-muted-foreground">
                Simple interface that makes complex astrological calculations accessible to everyone.
              </p>
            </div>

            <div className="cosmic-card p-6 text-center">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 sparkling-text">Real-Time Updates</h3>
              <p className="text-muted-foreground">
                Current planetary positions ensure your calculations reflect the most up-to-date cosmic influences.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="cosmic-card p-8 md:p-12 bg-primary/5">
            <FloatingStarsText starCount={6}>
              <h2 className="text-3xl cosmic-title mb-6 text-center">Our Mission</h2>
            </FloatingStarsText>
            <div className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                We believe that understanding cosmic timing can empower people to make better life decisions and navigate 
                challenges with greater wisdom. Our mission is to make astrological insights accessible, accurate, and 
                practical for modern life.
              </p>
              <p>
                Whether you're approaching your first Saturn Return in your late twenties, experiencing your second in 
                your late fifties, or curious about future cycles, our tool provides the clarity you need to embrace 
                these transformative periods with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section>
          <FloatingStarsText starCount={6}>
            <h2 className="text-3xl cosmic-title mb-12 text-center">How Our Calculator Works</h2>
          </FloatingStarsText>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="cosmic-card p-6">
              <div className="text-accent text-2xl font-bold mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3 sparkling-text">Enter Your Details</h3>
              <p className="text-muted-foreground">
                Provide your birth date, time, and location to establish Saturn's position in your natal chart.
              </p>
            </div>

            <div className="cosmic-card p-6">
              <div className="text-accent text-2xl font-bold mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3 sparkling-text">Astronomical Analysis</h3>
              <p className="text-muted-foreground">
                Our system calculates Saturn's orbital cycle and determines when it returns to your natal position.
              </p>
            </div>

            <div className="cosmic-card p-6">
              <div className="text-accent text-2xl font-bold mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3 sparkling-text">Receive Insights</h3>
              <p className="text-muted-foreground">
                Get detailed information about your Saturn Return periods, including timing and personalized guidance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
