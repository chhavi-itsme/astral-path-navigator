
import React, { useState, useCallback, memo } from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ClockFace } from './clock-face';
import { TimeInputs } from './time-inputs';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

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

  // Convert 24-hour format to 12-hour format
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

  // Update the time when hours, minutes, or period changes
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

  // Handlers for time adjustments
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

  const handleClockClick = useCallback((newHour: number) => {
    setHours(newHour);
  }, []);

  const handleHoursChange = useCallback((newHours: number) => {
    setHours(newHours);
  }, []);

  const handleMinutesChange = useCallback((newMinutes: number) => {
    setMinutes(newMinutes);
  }, []);

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
          
          {/* Clock Face Component */}
          <ClockFace 
            displayHours={displayHours} 
            onClockClick={handleClockClick} 
          />
          
          {/* Time Input Controls Component */}
          <TimeInputs 
            displayHours={displayHours}
            minutes={minutes}
            period={period}
            onHoursChange={handleHoursChange}
            onMinutesChange={handleMinutesChange}
            onPeriodToggle={togglePeriod}
            incrementHours={incrementHours}
            decrementHours={decrementHours}
            incrementMinutes={incrementMinutes}
            decrementMinutes={decrementMinutes}
          />
          
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
