'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GaugeChartProps {
  value: number;
  title: string;
  unit: string;
  maxValue: number;
  colorClass: string;
}

export function GaugeChart({ value, title, unit, maxValue, colorClass }: GaugeChartProps) {
  const percentage = (value / maxValue) * 100;
  const rotation = (percentage * 180) / 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-48 h-24 mx-auto">
          {/* Background arc */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-48 h-48 -mt-24 border-[24px] border-muted rounded-full"></div>
          </div>
          
          {/* Colored arc */}
          <div className="absolute inset-0 overflow-hidden" style={{ transform: `rotate(${rotation - 90}deg)` }}>
            <div className={cn("w-48 h-48 -mt-24 border-[24px] rounded-full", colorClass)} 
                 style={{ 
                   clipPath: 'polygon(50% 50%, 0 0, 100% 0)',
                   transform: 'rotate(-90deg)',
                   borderColor: 'currentColor'
                 }}></div>
          </div>
          
          {/* Value display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">
              {value}
              {unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}