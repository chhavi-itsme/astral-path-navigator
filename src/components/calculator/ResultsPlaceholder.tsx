
import React from 'react';

const ResultsPlaceholder: React.FC = () => {
  return (
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
  );
};

export default ResultsPlaceholder;
