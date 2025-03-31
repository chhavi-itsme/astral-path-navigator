import React, { useState, useRef } from 'react';
import { Calendar, Clock, MapPin, Info, Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { DatePicker } from '@/components/ui/calendar';
import SaturnCycleVisualization from '@/components/SaturnCycleVisualization';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TimePicker } from '@/components/ui/time-picker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SaturnReturnData {
  birthInfo: {
    date: string;
    time: string;
    age: number;
  };
  firstReturn: {
    periods: Array<{
      date: string;
      time: string;
      age: number;
    }>;
  };
  secondReturn: {
    periods: Array<{
      date: string;
      time: string;
      age: number;
    }>;
  };
  thirdReturn: {
    periods: Array<{
      date: string;
      time: string;
      age: number;
    }>;
  };
  fourthReturn?: {
    periods: Array<{
      date: string;
      time: string;
      age: number;
    }>;
  };
  fifthReturn?: {
    periods: Array<{
      date: string;
      time: string;
      age: number;
    }>;
  };
  currentPhase: string;
  saturnSign: string;
  insights: string[];
}

const Calculator = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [results, setResults] = useState<SaturnReturnData | null>(null);
  const [birthDateOpen, setBirthDateOpen] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(true);
  const resultsRef = useRef<HTMLDivElement>(null);

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
      
      setResults(saturnReturnData);
      setLoading(false);
      
      toast({
        title: "Calculation complete!",
        description: "Your Saturn Return details are ready to view.",
        duration: 5000,
      });
    }, 2500);
  };

  const calculateCurrentAge = () => {
    if (!birthDate) return 0;
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    const yearInMs = 1000 * 60 * 60 * 24 * 365.25;
    const ageInMs = today.getTime() - birthDate.getTime();
    return parseFloat((ageInMs / yearInMs).toFixed(2));
  };

  const toggleDetailedResults = () => {
    setShowDetailedResults(prev => !prev);
  };

  const generatePDF = async () => {
    if (!resultsRef.current || !results) return;
    
    setPdfLoading(true);
    toast({
      title: "Preparing PDF",
      description: "Creating your Saturn Return report...",
    });

    try {
      const input = resultsRef.current;
      const canvas = await html2canvas(input, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#000000',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`saturn-return-${new Date().toISOString().slice(0, 10)}.pdf`);
      
      toast({
        title: "PDF Generated Successfully",
        description: "Your Saturn Return report has been downloaded.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error Generating PDF",
        description: "There was an issue creating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPdfLoading(false);
    }
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
          </div>

          <div>
            {results ? (
              <Card className="cosmic-card h-full overflow-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>Saturn Returns - {results.saturnSign}</span>
                  </CardTitle>
                  <CardDescription>
                    Current Phase: {results.currentPhase}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div ref={resultsRef}>
                    <SaturnCycleVisualization 
                      currentAge={calculateCurrentAge()} 
                      birthDate={birthDate}
                      showDetailedResults={showDetailedResults}
                      toggleDetailedResults={toggleDetailedResults}
                    />
                    
                    {showDetailedResults && (
                      <>
                        <div className="overflow-x-auto">
                          <Table className="border rounded-md">
                            <TableHeader className="bg-secondary/50">
                              <TableRow>
                                <TableHead className="text-center">Age</TableHead>
                                <TableHead className="text-center">Birth Date</TableHead>
                                <TableHead className="text-center">Return chart</TableHead>
                                <TableHead className="text-center">Transits x Natal ch.</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="bg-accent/10">
                                <TableCell className="text-center">{results.birthInfo.age}</TableCell>
                                <TableCell className="text-center">{results.birthInfo.date} <span className="text-xs text-muted-foreground">{results.birthInfo.time}</span></TableCell>
                                <TableCell className="text-center">
                                  <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                    Return chart
                                  </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                    Transits x Natal ch.
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>

                        <div className="overflow-x-auto">
                          <Table className="border rounded-md">
                            <TableHeader className="bg-secondary/50">
                              <TableRow>
                                <TableHead className="text-center">Age</TableHead>
                                <TableHead className="text-center">First Saturn Return (Age 27 - 30 years)</TableHead>
                                <TableHead className="text-center">Return chart</TableHead>
                                <TableHead className="text-center">Transits x Natal ch.</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {results.firstReturn.periods.map((period, index) => (
                                <TableRow key={`first-${index}`} className={index % 2 === 0 ? "bg-accent/5" : ""}>
                                  <TableCell className="text-center">{period.age}</TableCell>
                                  <TableCell className="text-center">{period.date} <span className="text-xs text-muted-foreground">{period.time}</span></TableCell>
                                  <TableCell className="text-center">
                                    <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                      Return chart{index === 1 ? " (R)" : ""}
                                    </Button>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                      Transits x Natal ch.
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <Table className="border rounded-md">
                            <TableHeader className="bg-secondary/50">
                              <TableRow>
                                <TableHead className="text-center">Age</TableHead>
                                <TableHead className="text-center">Second Saturn Return (Age 56 - 59 years)</TableHead>
                                <TableHead className="text-center">Return chart</TableHead>
                                <TableHead className="text-center">Transits x Natal ch.</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {results.secondReturn.periods.map((period, index) => (
                                <TableRow key={`second-${index}`} className={index % 2 === 0 ? "bg-accent/5" : ""}>
                                  <TableCell className="text-center">{period.age}</TableCell>
                                  <TableCell className="text-center">{period.date} <span className="text-xs text-muted-foreground">{period.time}</span></TableCell>
                                  <TableCell className="text-center">
                                    <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                      Return chart{index === 1 ? " (R)" : ""}
                                    </Button>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                      Transits x Natal ch.
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <Table className="border rounded-md">
                            <TableHeader className="bg-secondary/50">
                              <TableRow>
                                <TableHead className="text-center">Age</TableHead>
                                <TableHead className="text-center">Third Saturn Return (Age 86 - 89 years)</TableHead>
                                <TableHead className="text-center">Return chart</TableHead>
                                <TableHead className="text-center">Transits x Natal ch.</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {results.thirdReturn.periods.map((period, index) => (
                                <TableRow key={`third-${index}`} className={index % 2 === 0 ? "bg-accent/5" : ""}>
                                  <TableCell className="text-center">{period.age}</TableCell>
                                  <TableCell className="text-center">{period.date} <span className="text-xs text-muted-foreground">{period.time}</span></TableCell>
                                  <TableCell className="text-center">
                                    <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                      Return chart
                                    </Button>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                      Transits x Natal ch.
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        
                        {results.fourthReturn && (
                          <div className="overflow-x-auto">
                            <Table className="border rounded-md">
                              <TableHeader className="bg-secondary/50">
                                <TableRow>
                                  <TableHead className="text-center">Age</TableHead>
                                  <TableHead className="text-center">Fourth Saturn Return (Age 116 - 119 years)</TableHead>
                                  <TableHead className="text-center">Return chart</TableHead>
                                  <TableHead className="text-center">Transits x Natal ch.</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {results.fourthReturn.periods.map((period, index) => (
                                  <TableRow key={`fourth-${index}`} className={index % 2 === 0 ? "bg-accent/5" : ""}>
                                    <TableCell className="text-center">{period.age}</TableCell>
                                    <TableCell className="text-center">{period.date} <span className="text-xs text-muted-foreground">{period.time}</span></TableCell>
                                    <TableCell className="text-center">
                                      <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                        Return chart{index === 1 ? " (R)" : ""}
                                      </Button>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                        Transits x Natal ch.
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                        
                        {results.fifthReturn && (
                          <div className="overflow-x-auto">
                            <Table className="border rounded-md">
                              <TableHeader className="bg-secondary/50">
                                <TableRow>
                                  <TableHead className="text-center">Age</TableHead>
                                  <TableHead className="text-center">Fifth Saturn Return (Age 146 - 149 years)</TableHead>
                                  <TableHead className="text-center">Return chart</TableHead>
                                  <TableHead className="text-center">Transits x Natal ch.</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {results.fifthReturn.periods.map((period, index) => (
                                  <TableRow key={`fifth-${index}`} className={index % 2 === 0 ? "bg-accent/5" : ""}>
                                    <TableCell className="text-center">{period.age}</TableCell>
                                    <TableCell className="text-center">{period.date} <span className="text-xs text-muted-foreground">{period.time}</span></TableCell>
                                    <TableCell className="text-center">
                                      <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                        Return chart
                                      </Button>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                                        Transits x Natal ch.
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                        
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
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={generatePDF}
                      disabled={pdfLoading}
                      className="w-auto flex gap-2 items-center bg-accent/20 hover:bg-accent/30 text-accent-foreground rounded-full border border-accent/50 transition-colors backdrop-blur-sm shadow-lg hover:shadow-accent/20 transform hover:scale-105"
                    >
                      {pdfLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Save Result as PDF
                        </>
                      )}
                    </Button>
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
