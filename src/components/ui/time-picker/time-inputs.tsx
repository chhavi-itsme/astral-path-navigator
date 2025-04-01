
import React from 'react';
import { Input } from '@/components/ui/input';

interface TimeInputsProps {
  displayHours: number;
  minutes: number;
  period: 'AM' | 'PM';
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
  onPeriodToggle: () => void;
  incrementHours: () => void;
  decrementHours: () => void;
  incrementMinutes: () => void;
  decrementMinutes: () => void;
}

export const TimeInputs = React.memo(({ 
  displayHours, 
  minutes, 
  period, 
  onHoursChange, 
  onMinutesChange, 
  onPeriodToggle,
  incrementHours,
  decrementHours,
  incrementMinutes,
  decrementMinutes
}: TimeInputsProps) => {
  return (
    <div className="flex gap-4 justify-center w-full">
      <div className="flex flex-col items-center">
        <button onClick={incrementHours} className="text-lg">▲</button>
        <Input
          className="w-16 text-center"
          value={displayHours.toString().padStart(2, '0')}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 1 && val <= 12) {
              onHoursChange(val);
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
              onMinutesChange(val);
            }
          }}
        />
        <button onClick={decrementMinutes} className="text-lg">▼</button>
      </div>
      <div className="flex flex-col items-center">
        <button onClick={onPeriodToggle} className="px-4 py-2 bg-secondary rounded">
          {period}
        </button>
      </div>
    </div>
  );
});

TimeInputs.displayName = 'TimeInputs';
