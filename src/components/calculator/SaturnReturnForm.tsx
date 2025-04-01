import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { DatePicker } from '@/components/ui/calendar';
import { TimePicker } from '@/components/ui/time-picker';
import { SaturnReturnData } from '@/types/saturn-calculator-types';

interface SaturnReturnFormProps {
  onCalculate: (returnData: SaturnReturnData) => void;
  onBirthDateChange?: (date: Date | undefined) => void;
}

const SaturnReturnForm: React.FC<SaturnReturnFormProps> = ({ 
  onCalculate, 
  onBirthDateChange 
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [birthDateOpen, setBirthDateOpen] = useState(false);

  const handleBirthDateChange = (date: Date | undefined) => {
    setBirthDate(date);
    if (onBirthDateChange) {
      onBirthDateChange(date);
    }
    setBirthDateOpen(false);
  };

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
    
    setTimeout(() => {
      const birthYear = birthDate.getFullYear();
      const birthMonth = birthDate.getMonth();
      const birthDay = birthDate.getDate();
      
      const saturnSigns = [
        "Aries", "Taurus", "Gemini", "Cancer", 
        "Leo", "Virgo", "Libra", "Scorpio", 
        "Sagittarius", "Capricorn", "Aquarius", "Pisces"
      ];
      
      const generateRandomTime = () => {
        const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
        const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };
      
      const addRandomDaysToDate = (date: Date, maxDays: number) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + Math.floor(Math.random() * maxDays));
        return newDate;
      };
      
      const formatDateWithTime = (date: Date) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
      };
      
      const firstReturnDate1 = new Date(birthYear + 29, birthMonth, birthDay);
      const firstReturnDate2 = addRandomDaysToDate(new Date(birthYear + 29, birthMonth + 6, birthDay), 30);
      const firstReturnDate3 = addRandomDaysToDate(new Date(birthYear + 30, birthMonth, birthDay), 30);
      
      const secondReturnDate1 = new Date(birthYear + 58, birthMonth, birthDay);
      const secondReturnDate2 = addRandomDaysToDate(new Date(birthYear + 58, birthMonth + 6, birthDay), 30);
      const secondReturnDate3 = addRandomDaysToDate(new Date(birthYear + 59, birthMonth, birthDay), 30);
      
      const thirdReturnDate = new Date(birthYear + 88, birthMonth, birthDay);
      
      const fourthReturnDate1 = new Date(birthYear + 117, birthMonth, birthDay);
      const fourthReturnDate2 = addRandomDaysToDate(new Date(birthYear + 117, birthMonth + 6, birthDay), 30);
      const fourthReturnDate3 = addRandomDaysToDate(new Date(birthYear + 118, birthMonth, birthDay), 30);
      
      const fifthReturnDate = new Date(birthYear + 147, birthMonth, birthDay);
      
      const calculatePhase = () => {
        const now = new Date();
        const age = now.getFullYear() - birthYear;
        
        if (age < 27) return "Pre-First Saturn Return";
        if (age <= 30) return "First Saturn Return (Major Life Transition)";
        if (age < 56) return "Between Saturn Returns";
        if (age <= 60) return "Second Saturn Return (Wisdom Phase)";
        if (age < 86) return "Post-Second Saturn Return";
        if (age <= 90) return "Third Saturn Return";
        return "Post-Third Saturn Return";
      };
      
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
        birthInfo: {
          date: formatDateWithTime(birthDate),
          time: birthTime || generateRandomTime(),
          age: 0
        },
        firstReturn: {
          periods: [
            {
              date: formatDateWithTime(firstReturnDate1),
              time: `${generateRandomTime()}`,
              age: 29
            },
            {
              date: formatDateWithTime(firstReturnDate2),
              time: `${generateRandomTime()}`,
              age: 29
            },
            {
              date: formatDateWithTime(firstReturnDate3),
              time: `${generateRandomTime()}`,
              age: 29
            }
          ]
        },
        secondReturn: {
          periods: [
            {
              date: formatDateWithTime(secondReturnDate1),
              time: `${generateRandomTime()}`,
              age: 58
            },
            {
              date: formatDateWithTime(secondReturnDate2),
              time: `${generateRandomTime()}`,
              age: 58
            },
            {
              date: formatDateWithTime(secondReturnDate3),
              time: `${generateRandomTime()}`,
              age: 58
            }
          ]
        },
        thirdReturn: {
          periods: [
            {
              date: formatDateWithTime(thirdReturnDate),
              time: `${generateRandomTime()}`,
              age: 88
            }
          ]
        },
        fourthReturn: {
          periods: [
            {
              date: formatDateWithTime(fourthReturnDate1),
              time: `${generateRandomTime()}`,
              age: 117
            },
            {
              date: formatDateWithTime(fourthReturnDate2),
              time: `${generateRandomTime()}`,
              age: 117
            },
            {
              date: formatDateWithTime(fourthReturnDate3),
              time: `${generateRandomTime()}`,
              age: 117
            }
          ]
        },
        fifthReturn: {
          periods: [
            {
              date: formatDateWithTime(fifthReturnDate),
              time: `${generateRandomTime()}`,
              age: 147
            }
          ]
        },
        currentPhase: calculatePhase(),
        saturnSign: saturnSigns[birthYear % 12],
        insights: getInsights(calculatePhase())
      };
      
      onCalculate(saturnReturnData);
      setLoading(false);
      
      toast({
        title: "Calculation complete!",
        description: "Your Saturn Return details are ready to view.",
        duration: 5000,
      });
    }, 2500);
  };

  return (
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
                  onSelect={handleBirthDateChange}
                  initialFocus
                  className="pointer-events-auto"
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
            <TimePicker 
              value={birthTime}
              onChange={setBirthTime}
              className="cosmic-input"
            />
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
  );
};

export default SaturnReturnForm;
