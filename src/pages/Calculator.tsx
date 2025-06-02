
import React, { useState } from 'react';
import SaturnReturnForm from '@/components/calculator/SaturnReturnForm';
import SaturnReturnResults from '@/components/calculator/SaturnReturnResults';
import ResultsPlaceholder from '@/components/calculator/ResultsPlaceholder';
import FloatingSaturn from '@/components/FloatingSaturn';
import FloatingStarsText from '@/components/FloatingStarsText';
import { SaturnReturnData } from '@/types/saturn-calculator-types';

const Calculator = () => {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [results, setResults] = useState<SaturnReturnData | null>(null);

  const handleCalculate = (returnData: SaturnReturnData) => {
    setResults(returnData);
  };

  const handleBirthDateChange = (date: Date | undefined) => {
    setBirthDate(date);
  };

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Floating Saturn globes */}
      <FloatingSaturn 
        size="sm" 
        position="top-10 left-10" 
        delay={0} 
        rotation={-15} 
        variant="golden" 
      />
      <FloatingSaturn 
        size="md" 
        position="top-20 right-16" 
        delay={1} 
        rotation={20} 
        variant="purple" 
      />
      <FloatingSaturn 
        size="sm" 
        position="bottom-32 left-20" 
        delay={2} 
        rotation={-10} 
        variant="fiery" 
      />
      <FloatingSaturn 
        size="lg" 
        position="bottom-20 right-10" 
        delay={0.5} 
        rotation={25} 
        variant="golden" 
      />

      <div className="cosmic-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <FloatingStarsText starCount={8} starColor="rgba(135, 206, 250, 0.8)">
            <h1 className="text-4xl font-bold mb-4">Saturn Return Calculator</h1>
          </FloatingStarsText>
          <p className="text-lg text-muted-foreground">
            Enter your birth details to discover the timing and influence of your Saturn Return periods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SaturnReturnForm 
              onCalculate={handleCalculate} 
              onBirthDateChange={handleBirthDateChange} 
            />
          </div>

          <div>
            {results ? (
              <SaturnReturnResults results={results} birthDate={birthDate} />
            ) : (
              <ResultsPlaceholder />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
