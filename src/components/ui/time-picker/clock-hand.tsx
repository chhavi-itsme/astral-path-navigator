
import React from 'react';

interface ClockHandProps {
  angle: number;
  hours: number;
}

export const ClockHand = React.memo(({ angle, hours }: ClockHandProps) => {
  return (
    <div 
      className="absolute top-1/2 left-1/2 transform origin-left"
      style={{ 
        width: '100px', 
        height: '2px', 
        backgroundColor: 'blue',
        transform: `rotate(${hours * 30 - 90}deg)`,
        transformOrigin: 'left center'
      }}
    />
  );
});

ClockHand.displayName = 'ClockHand';
