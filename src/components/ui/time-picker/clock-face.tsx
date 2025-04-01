
import React, { useRef, useCallback } from 'react';
import { ClockNumbers } from './clock-numbers';
import { ClockHand } from './clock-hand';
import { HourMarker } from './hour-marker';

interface ClockFaceProps {
  displayHours: number;
  onClockClick: (hours: number) => void;
}

export const ClockFace = React.memo(({ displayHours, onClockClick }: ClockFaceProps) => {
  const clockRef = useRef<HTMLDivElement>(null);
  
  // Calculate angle for the hand
  const angle = ((displayHours % 12) * 30 - 90) * Math.PI / 180;

  // Handle clock face clicks
  const handleClockClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!clockRef.current) return;
    
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    // Calculate angle in radians, then convert to hours (0-11)
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    
    const newHour = Math.round((angle / (2 * Math.PI)) * 12);
    // Convert to 0-11 range
    const normalizedHour = newHour === 0 ? 12 : newHour > 12 ? newHour - 12 : newHour;
    
    onClockClick(normalizedHour);
  }, [onClockClick]);

  return (
    <div 
      ref={clockRef}
      className="w-64 h-64 rounded-full bg-secondary relative my-4"
      onClick={handleClockClick}
    >
      {/* Clock Numbers */}
      <ClockNumbers displayHours={displayHours} />
      
      {/* Clock Hand */}
      <ClockHand angle={angle} hours={displayHours} />
      
      {/* Center Dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
      
      {/* Selected Hour Circle */}
      <HourMarker angle={angle} displayHours={displayHours} />
    </div>
  );
});

ClockFace.displayName = 'ClockFace';
