'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, TrendingUp, TrendingDown } from 'lucide-react';

interface SensorStatsProps {
  temperature: number;
  humidity: number;
}

export function SensorStats({ temperature, humidity }: SensorStatsProps) {
  const [prevTemp, setPrevTemp] = useState(temperature);
  const [prevHumidity, setPrevHumidity] = useState(humidity);
  const [tempChange, setTempChange] = useState(0);
  const [humidityChange, setHumidityChange] = useState(0);

  useEffect(() => {
    setTempChange(temperature - prevTemp);
    setPrevTemp(temperature);
  }, [temperature]);

  useEffect(() => {
    setHumidityChange(humidity - prevHumidity);
    setPrevHumidity(humidity);
  }, [humidity]);

  const getChangeDisplay = (value: number) => {
    if (value === 0) return null;
    const formattedValue = Math.abs(value).toFixed(1);
    const Icon = value > 0 ? TrendingUp : TrendingDown;
    const color = value > 0 ? 'text-green-500' : 'text-red-500';
    
    return (
      <div className={`flex items-center ${color} text-sm ml-2`}>
        <Icon className="h-4 w-4 mr-1" />
        {formattedValue}
      </div>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          <Thermometer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold">{temperature}°C</div>
            {getChangeDisplay(tempChange)}
          </div>
          <p className="text-xs text-muted-foreground">
            Current reading
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Humidity</CardTitle>
          <Droplets className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold">{humidity}%</div>
            {getChangeDisplay(humidityChange)}
          </div>
          <p className="text-xs text-muted-foreground">
            Current reading
          </p>
        </CardContent>
      </Card>
    </div>
  );
}