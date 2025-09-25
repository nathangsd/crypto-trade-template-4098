import { memo, ReactNode, useEffect } from 'react';

interface PerformanceWrapperProps {
  children: ReactNode;
  className?: string;
  enableHardwareAcceleration?: boolean;
  enableWillChange?: boolean;
  trackPerformance?: boolean;
  componentName?: string;
}

// Higher-order component for performance optimization
export const PerformanceWrapper = memo(({
  children,
  className = '',
  enableHardwareAcceleration = false,
  enableWillChange = false,
  trackPerformance = false,
  componentName = 'component'
}: PerformanceWrapperProps) => {
  
  useEffect(() => {
    if (trackPerformance && 'performance' in window) {
      performance.mark(`${componentName}-mount`);
      
      return () => {
        performance.mark(`${componentName}-unmount`);
        performance.measure(
          `${componentName}-lifecycle`,
          `${componentName}-mount`,
          `${componentName}-unmount`
        );
      };
    }
  }, [trackPerformance, componentName]);

  const optimizedClassName = [
    className,
    enableHardwareAcceleration && 'transform-gpu',
    enableWillChange && 'will-change-transform'
  ].filter(Boolean).join(' ');

  return (
    <div className={optimizedClassName}>
      {children}
    </div>
  );
});

PerformanceWrapper.displayName = 'PerformanceWrapper';