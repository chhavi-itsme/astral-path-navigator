
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface PersonalizedInsightsProps {
  insights: string[];
}

const PersonalizedInsights: React.FC<PersonalizedInsightsProps> = ({ insights }) => {
  return (
    <div>
      <Separator className="my-4" />
      <h3 className="text-lg font-medium mb-4">Personalized Insights</h3>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start">
            <div className="bg-accent/10 text-accent rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              {index + 1}
            </div>
            <p className="text-muted-foreground">{insight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalizedInsights;
