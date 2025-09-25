import { lazy, Suspense, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

const DefaultFallback = () => (
  <div className="bg-black py-8 flex items-center justify-center">
    <div className="animate-pulse-fast">
      <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
    </div>
  </div>
);

export const LazySection = ({
  children,
  fallback = <DefaultFallback />,
  className = ''
}: LazySectionProps) => {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  );
};