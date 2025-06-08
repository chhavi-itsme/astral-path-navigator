
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'hero' | 'blog' | 'calculator';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ variant = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        );
      
      case 'card':
        return (
          <div className="cosmic-card p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        );
      
      case 'text':
        return (
          <div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        );
      
      case 'blog':
        return (
          <div className="cosmic-card p-6">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-10 w-32" />
          </div>
        );
      
      case 'calculator':
        return (
          <div className="cosmic-card p-6">
            <Skeleton className="h-8 w-1/2 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        );
      
      default:
        return <Skeleton className="h-20 w-full" />;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
