
import React, { useState } from 'react';
import SaturnReturnForm from '@/components/calculator/SaturnReturnForm';
import SaturnReturnResults from '@/components/calculator/SaturnReturnResults';
import ResultsPlaceholder from '@/components/calculator/ResultsPlaceholder';
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
