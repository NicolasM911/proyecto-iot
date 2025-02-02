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
    <div className="flex items-center justify-center w-full">
      <Button
        onClick={handleClick}
        disabled={isActive}
        size="icon"
        className={cn(
          ' relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-blue-500 transition-all duration-500',
          isActive ? 'bg-blue-500 hover:bg-blue-600' : 'bg-muted hover:bg-muted/80'
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <Droplets className={cn(
            'w-12 h-12 md:w-16 md:h-16 transition-all duration-500 ',
            isActive ? 'text-white animate-bounce' : 'text-muted-foreground'
          )} />
          {isActive ? (
            <span className="text-xl md:text-2xl font-bold text-white">{countdown}s</span>
          ) : (
            <span className="text-sm md:text-base font-medium text-muted-foreground text-blue-500">
              Activar Riego
            </span>
          )}
        </div>
      </Button>
    </div>
  );
}