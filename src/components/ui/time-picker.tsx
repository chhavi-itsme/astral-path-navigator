
import React, { useState, useRef, useCallback, memo } from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// Memoize the clock numbers to avoid recreating them on every render
const ClockNumbers = memo(({ displayHours }: { displayHours: number }) => {
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

// Memoize the clock hand component
const ClockHand = memo(({ angle, hours }: { angle: number, hours: number }) => {
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

// Memoize the hour marker
const HourMarker = memo(({ angle, displayHours }: { angle: number, displayHours: number }) => {
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

export const TimePicker = memo(({ value, onChange, className }: TimePickerProps) => {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState<number>(
    value ? parseInt(value.split(':')[0]) : 12
  );
  const [minutes, setMinutes] = useState<number>(
    value ? parseInt(value.split(':')[1]) : 0
  );
  const [period, setPeriod] = useState<'AM' | 'PM'>(
    value ? (parseInt(value.split(':')[0]) >= 12 ? 'PM' : 'AM') : 'AM'
  );
  const clockRef = useRef<HTMLDivElement>(null);

  // Convert 24-hour format to 12-hour format
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

  // Update the time when hours, minutes, or period changes - using useCallback to memoize
  const updateTime = useCallback(() => {
    const newHours = period === 'PM' && hours < 12 
      ? hours + 12 
      : period === 'AM' && hours === 12 
        ? 0 
        : hours;
    
    onChange(`${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  }, [hours, minutes, period, onChange]);

  // Call updateTime when dependencies change
  React.useEffect(() => {
    updateTime();
  }, [hours, minutes, period, updateTime]);

  // Handle clock face clicks - optimized with useCallback
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
    
    setHours(normalizedHour);
  }, []);

  // Handlers as useCallback to prevent recreation
  const incrementHours = useCallback(() => {
    setHours(prev => (prev === 12 ? 1 : prev + 1));
  }, []);

  const decrementHours = useCallback(() => {
    setHours(prev => (prev === 1 ? 12 : prev - 1));
  }, []);

  const incrementMinutes = useCallback(() => {
    setMinutes(prev => (prev === 59 ? 0 : prev + 1));
  }, []);

  const decrementMinutes = useCallback(() => {
    setMinutes(prev => (prev === 0 ? 59 : prev - 1));
  }, []);

  const togglePeriod = useCallback(() => {
    setPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'));
  }, []);

  const resetTime = useCallback(() => {
    setHours(12);
    setMinutes(0);
    setPeriod('AM');
  }, []);

  // Calculate angle for the hand
  const angle = ((displayHours % 12) * 30 - 90) * Math.PI / 180;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal flex items-center",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="h-4 w-4 mr-2" />
          {value ? (
            format(new Date(`2000-01-01T${value}`), 'h:mm a')
          ) : (
            <span className="text-muted-foreground">Select time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex flex-col items-center gap-4">
          {/* Time Display */}
          <div className="flex justify-center items-center w-full bg-primary text-primary-foreground py-4 rounded-lg text-5xl font-light">
            <span>{displayHours.toString().padStart(2, '0')}</span>
            <span className="mx-1">:</span>
            <span>{minutes.toString().padStart(2, '0')}</span>
            <div className="ml-4 flex flex-col text-xl">
              <button 
                className={`px-2 ${period === 'AM' ? 'font-bold' : 'opacity-60'}`}
                onClick={() => setPeriod('AM')}
              >
                AM
              </button>
              <button 
                className={`px-2 ${period === 'PM' ? 'font-bold' : 'opacity-60'}`}
                onClick={() => setPeriod('PM')}
              >
                PM
              </button>
            </div>
          </div>
          
          {/* Clock Face */}
          <div 
            ref={clockRef}
            className="w-64 h-64 rounded-full bg-secondary relative my-4"
            onClick={handleClockClick}
          >
            {/* Clock Numbers - memoized component */}
            <ClockNumbers displayHours={displayHours} />
            
            {/* Clock Hand - memoized component */}
            <ClockHand angle={angle} hours={displayHours} />
            
            {/* Center Dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
            
            {/* Selected Hour Circle - memoized component */}
            <HourMarker angle={angle} displayHours={displayHours} />
          </div>
          
          {/* Input Controls */}
          <div className="flex gap-4 justify-center w-full">
            <div className="flex flex-col items-center">
              <button onClick={incrementHours} className="text-lg">▲</button>
              <Input
                className="w-16 text-center"
                value={displayHours.toString().padStart(2, '0')}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1 && val <= 12) {
                    setHours(val);
                  }
                }}
              />
              <button onClick={decrementHours} className="text-lg">▼</button>
            </div>
            <div className="flex items-center text-2xl font-bold">:</div>
            <div className="flex flex-col items-center">
              <button onClick={incrementMinutes} className="text-lg">▲</button>
              <Input
                className="w-16 text-center"
                value={minutes.toString().padStart(2, '0')}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 0 && val <= 59) {
                    setMinutes(val);
                  }
                }}
              />
              <button onClick={decrementMinutes} className="text-lg">▼</button>
            </div>
            <div className="flex flex-col items-center">
              <button onClick={togglePeriod} className="px-4 py-2 bg-secondary rounded">
                {period}
              </button>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex justify-between w-full mt-2">
            <Button 
              variant="outline" 
              onClick={resetTime}
            >
              Clear
            </Button>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});

TimePicker.displayName = 'TimePicker';
