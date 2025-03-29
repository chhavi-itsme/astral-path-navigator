
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { DatePicker } from '@/components/ui/calendar';

interface SaturnReturnData {
  firstReturn: {
    startDate: string;
    endDate: string;
    age: number;
  };
  secondReturn: {
    startDate: string;
    endDate: string;
    age: number;
  };
  thirdReturn?: {
    startDate: string;
    endDate: string;
    age: number;
  };
  currentPhase: string;
  saturnSign: string;
  insights: string[];
}

const Calculator = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [results, setResults] = useState<SaturnReturnData | null>(null);
  const [birthDateOpen, setBirthDateOpen] = useState(false);

  const calculateSaturnReturn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate) {
      toast({
        title: "Birth date required",
        description: "Please select your birth date to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (!birthCity.trim()) {
      toast({
        title: "Birth city required",
        description: "Please enter the city where you were born.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Demo data calculation
      const birthYear = birthDate.getFullYear();
      const firstReturnYear = birthYear + 29;
      const secondReturnYear = birthYear + 59;
      const thirdReturnYear = birthYear + 88;
      
      const getRandomOffset = () => Math.floor(Math.random() * 10) - 5;
      
      const calculatePhase = () => {
        const now = new Date();
        const age = now.getFullYear() - birthYear;
        
        if (age < 27) return "Pre-First Saturn Return";
        if (age <= 30) return "First Saturn Return (Major Life Transition)";
        if (age < 56) return "Between Saturn Returns";
        if (age <= 60) return "Second Saturn Return (Wisdom Phase)";
        return "Post-Second Saturn Return";
      };
      
      const saturnSigns = [
        "Aries", "Taurus", "Gemini", "Cancer", 
        "Leo", "Virgo", "Libra", "Scorpio", 
        "Sagittarius", "Capricorn", "Aquarius", "Pisces"
      ];
      
      const getInsights = (phase: string) => {
        if (phase.includes("First Saturn Return")) {
          return [
            "You're entering a period of significant personal growth and maturity.",
            "This is a time to reflect on your life direction and make necessary adjustments.",
            "You may feel pressure to achieve certain milestones or establish yourself professionally.",
            "Focus on building strong foundations for your future self."
          ];
        } else if (phase.includes("Second Saturn Return")) {
          return [
            "This is a time of wisdom gathering and sharing your life experience.",
            "Reflect on your accomplishments and set intentions for your legacy.",
            "You may experience a renewed sense of purpose or direction.",
            "Consider what truly matters to you at this stage of life."
          ];
        } else if (phase.includes("Pre-First")) {
          return [
            "You're building toward your first major life transition.",
            "Focus on gaining experience and developing your skills.",
            "Pay attention to the structures and limitations in your life.",
            "Begin preparing for your upcoming Saturn Return by reflecting on your goals."
          ];
        } else if (phase.includes("Between")) {
          return [
            "You're in a period of implementing the lessons from your first Saturn Return.",
            "Focus on building upon the foundations you've established.",
            "Continue to develop mastery in your chosen areas.",
            "Prepare for the wisdom phase that will come with your second Saturn Return."
          ];
        } else {
          return [
            "You've navigated multiple major life transitions.",
            "Share your wisdom and experience with younger generations.",
            "Focus on your legacy and what you wish to leave behind.",
            "Enjoy the freedom that comes with Saturn's lessons well-learned."
          ];
        }
      };
      
      const saturnReturnData: SaturnReturnData = {
        firstReturn: {
          startDate: `${firstReturnYear + getRandomOffset()}-06-15`,
          endDate: `${firstReturnYear + getRandomOffset() + 2}-02-20`,
          age: 29
        },
        secondReturn: {
          startDate: `${secondReturnYear + getRandomOffset()}-07-10`,
          endDate: `${secondReturnYear + getRandomOffset() + 2}-04-05`,
          age: 59
        },
        thirdReturn: {
          startDate: `${thirdReturnYear + getRandomOffset()}-05-22`,
          endDate: `${thirdReturnYear + getRandomOffset() + 2}-01-18`,
          age: 88
        },
        currentPhase: calculatePhase(),
        saturnSign: saturnSigns[birthYear % 12],
        insights: getInsights(calculatePhase())
      };
      
      setResults(saturnReturnData);
      setLoading(false);
      
      toast({
        title: "Calculation complete!",
        description: "Your Saturn Return details are ready to view.",
        duration: 5000,
      });
    }, 2500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="cosmic-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Saturn Return Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Enter your birth details to discover the timing and influence of your Saturn Return periods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div>
            <Card className="cosmic-card">
              <CardHeader>
                <CardTitle>Enter Your Details</CardTitle>
                <CardDescription>
                  Provide accurate information for the most precise calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateSaturnReturn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date of Birth</Label>
                    <Popover open={birthDateOpen} onOpenChange={setBirthDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="cosmic-input w-full justify-start text-left font-normal flex items-center"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {birthDate ? (
                            birthDate.toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          ) : (
                            <span className="text-muted-foreground">Select your birth date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <DatePicker
                          mode="single"
                          selected={birthDate}
                          onSelect={(date) => {
                            setBirthDate(date);
                            setBirthDateOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthTime">
                      Time of Birth (optional)
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="h-4 w-4 p-0 ml-1">
                            <Info className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          For the most accurate results, include your birth time if known.
                        </PopoverContent>
                      </Popover>
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="birthTime"
                        placeholder="HH:MM (e.g. 14:30)"
                        className="cosmic-input pl-10"
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthCity">Birth City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="birthCity"
                        placeholder="City, Country"
                        className="cosmic-input pl-10"
                        value={birthCity}
                        onChange={(e) => setBirthCity(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentCity">Current City (optional)</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="currentCity"
                        placeholder="City, Country"
                        className="cosmic-input pl-10"
                        value={currentCity}
                        onChange={(e) => setCurrentCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="saturn-button w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      "Calculate My Saturn Return"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div>
            {results ? (
              <Card className="cosmic-card h-full">
                <CardHeader>
                  <CardTitle>Your Saturn Return Timeline</CardTitle>
                  <CardDescription>
                    Saturn is in {results.saturnSign} in your birth chart
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Current Phase</h3>
                    <p className="text-accent font-semibold text-xl">{results.currentPhase}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Saturn Return Periods</h3>
                    
                    <div className="space-y-6">
                      <div className="cosmic-card p-4">
                        <h4 className="font-medium text-foreground mb-2">First Saturn Return (Age {results.firstReturn.age})</h4>
                        <p className="text-muted-foreground text-sm mb-1">
                          <span className="font-medium">Start Date:</span> {formatDate(results.firstReturn.startDate)}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          <span className="font-medium">End Date:</span> {formatDate(results.firstReturn.endDate)}
                        </p>
                      </div>
                      
                      <div className="cosmic-card p-4">
                        <h4 className="font-medium text-foreground mb-2">Second Saturn Return (Age {results.secondReturn.age})</h4>
                        <p className="text-muted-foreground text-sm mb-1">
                          <span className="font-medium">Start Date:</span> {formatDate(results.secondReturn.startDate)}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          <span className="font-medium">End Date:</span> {formatDate(results.secondReturn.endDate)}
                        </p>
                      </div>
                      
                      {results.thirdReturn && (
                        <div className="cosmic-card p-4">
                          <h4 className="font-medium text-foreground mb-2">Third Saturn Return (Age {results.thirdReturn.age})</h4>
                          <p className="text-muted-foreground text-sm mb-1">
                            <span className="font-medium">Start Date:</span> {formatDate(results.thirdReturn.startDate)}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            <span className="font-medium">End Date:</span> {formatDate(results.thirdReturn.endDate)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Personalized Insights</h3>
                    <ul className="space-y-2">
                      {results.insights.map((insight, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-accent/10 text-accent rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-muted-foreground">{insight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground italic">
                    Note: This calculator provides approximate dates based on general astrological principles. For a more precise analysis, consult with a professional astrologer.
                  </p>
                </CardFooter>
              </Card>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 p-8">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
                  <div className="relative animate-float">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="30" fill="#E6AD4C" />
                      <ellipse
                        cx="50"
                        cy="50"
                        rx="45"
                        ry="10"
                        transform="rotate(-20 50 50)"
                        stroke="#E6AD4C"
                        strokeWidth="3"
                        fill="none"
                        className="saturn-ring"
                      />
                      <circle cx="60" cy="40" r="5" fill="#F8D89C" opacity="0.7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Your Saturn Return Results</h3>
                  <p className="text-muted-foreground">
                    Fill out the form to calculate when your Saturn Returns will occur and what they mean for you.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
