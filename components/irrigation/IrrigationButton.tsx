'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IrrigationButtonProps {
  onStateChange?: (isActive: boolean) => void;
}

export function IrrigationButton({ onStateChange }: IrrigationButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsActive(false);
      setCountdown(10);
      onStateChange?.(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, countdown, onStateChange]);

  const handleClick = () => {
    if (!isActive) {
      setIsActive(true);
      setCountdown(10);
      onStateChange?.(true);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isActive}
      size="lg"
      className={cn(
        'relative w-full h-16 transition-all duration-500',
        isActive ? 'bg-blue-500 hover:bg-blue-600' : 'bg-muted hover:bg-muted/80'
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Droplets className={cn(
          'w-6 h-6 transition-all duration-500',
          isActive ? 'text-white animate-bounce' : 'text-muted-foreground'
        )} />
      </div>
      <div className={cn(
        'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
        isActive ? 'opacity-100' : 'opacity-0'
      )}>
        <div className="flex items-center space-x-2">
          <span className="text-white font-bold">{countdown}s</span>
        </div>
      </div>
      <span className={cn(
        'ml-2 transition-opacity duration-300',
        isActive ? 'opacity-0' : 'opacity-100'
      )}>
        Activar Riego
      </span>
    </Button>
  );
}