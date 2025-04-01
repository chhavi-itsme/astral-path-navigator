
import React, { useRef, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SaturnCycleVisualization from '@/components/SaturnCycleVisualization';
import ReturnPeriodTable from './ReturnPeriodTable';
import PersonalizedInsights from './PersonalizedInsights';
import { SaturnReturnData } from '@/types/saturn-calculator-types';

interface SaturnReturnResultsProps {
  results: SaturnReturnData;
  birthDate: Date | undefined;
}

const SaturnReturnResults: React.FC<SaturnReturnResultsProps> = ({ results, birthDate }) => {
  const { toast } = useToast();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(true);
  const resultsRef = useRef<HTMLDivElement>(null);

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
                      <TableCell className="text-center">
                        {results.birthInfo.date} <span className="text-xs text-muted-foreground">{results.birthInfo.time}</span>
                      </TableCell>
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

              <ReturnPeriodTable 
                title="First Saturn Return" 
                ageRange="Age 27 - 30 years" 
                periods={results.firstReturn.periods} 
              />
              
              <ReturnPeriodTable 
                title="Second Saturn Return" 
                ageRange="Age 56 - 59 years" 
                periods={results.secondReturn.periods} 
              />
              
              <ReturnPeriodTable 
                title="Third Saturn Return" 
                ageRange="Age 86 - 89 years" 
                periods={results.thirdReturn.periods} 
              />
              
              {results.fourthReturn && (
                <ReturnPeriodTable 
                  title="Fourth Saturn Return" 
                  ageRange="Age 116 - 119 years" 
                  periods={results.fourthReturn.periods} 
                />
              )}
              
              {results.fifthReturn && (
                <ReturnPeriodTable 
                  title="Fifth Saturn Return" 
                  ageRange="Age 146 - 149 years" 
                  periods={results.fifthReturn.periods} 
                />
              )}
              
              <PersonalizedInsights insights={results.insights} />
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
  );
};

// Need to import Table components for the birth info table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default SaturnReturnResults;
