'use client';

import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SensorChartProps {
  title: string;
  data: any[];
  dataKey: string;
  gradient: {
    from: string;
    to: string;
  };
  unit: string;
  valueFormatter: (value: number) => string;
}

export function SensorChart({
  title,
  data,
  dataKey,
  gradient,
  unit,
  valueFormatter,
}: SensorChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading chart...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={gradient.from} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={gradient.to} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                minTickGap={30}
              />
              <YAxis
                width={40}
                tickCount={5}
                tickFormatter={(value) => valueFormatter(value)}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                padding={{ top: 10, bottom: 10 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {title}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {/* {valueFormatter(payload[0].value)} */}
                              {unit}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Time
                            </span>
                            <span className="font-bold">
                              {new Date(payload[0].payload.time).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={gradient.from}
                fill={`url(#gradient-${dataKey})`}
                strokeWidth={2}
                animationDuration={500}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}