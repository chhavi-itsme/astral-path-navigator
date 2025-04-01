
import React from 'react';

interface ClockNumbersProps {
  displayHours: number;
}

export const ClockNumbers = React.memo(({ displayHours }: ClockNumbersProps) => {
  return (
    <>
      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
        const angle = ((num - 3) * 30) * Math.PI / 180;
        const radius = 110;
        const left = Math.cos(angle) * radius + 128;
        const top = Math.sin(angle) * radius + 128;
        
        return (
          <div 
            key={num}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-lg ${num === displayHours ? 'font-bold' : ''}`}
            style={{ left: `${left}px`, top: `${top}px` }}
          >
            {num}
          </div>
        );
      })}
    </>
  );
});

ClockNumbers.displayName = 'ClockNumbers';
