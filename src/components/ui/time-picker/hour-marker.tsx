
import React from 'react';

interface HourMarkerProps {
  angle: number;
  displayHours: number;
}

export const HourMarker = React.memo(({ angle, displayHours }: HourMarkerProps) => {
  const left = Math.cos(angle) * 110 + 128;
  const top = Math.sin(angle) * 110 + 128;
  
  return (
    <div 
      className="absolute w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${left}px`, top: `${top}px` }}
    >
      {displayHours}
    </div>
  );
});

HourMarker.displayName = 'HourMarker';
