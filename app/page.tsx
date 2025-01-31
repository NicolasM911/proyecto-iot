'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { SensorChart } from '@/components/dashboard/sensor-chart';
import { SensorStats } from '@/components/dashboard/sensor-stats';
import { database } from '@/firebaseConfig';
import { ref, onValue, query, limitToLast } from 'firebase/database';
import { GaugeChart } from '@/components/dashboard/gauge-chart';
import { IrrigationButton } from '@/components/irrigation/IrrigationButton';
import { IrrigationHistory } from '@/components/irrigation/IrrigationHistory';

interface SensorData {
  time: string;
  temperature: number;
  humidity: number;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<SensorData[]>([]);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [irrigationEvents, setIrrigationEvents] = useState<Array<{
    id: string;
    timestamp: string;
    duration: number;
  }>>([]);

  useEffect(() => {
    setMounted(true);

    const sensorRef = query(ref(database, 'sensorData'), limitToLast(100)); // Limitar la consulta a los últimos 100 registros
    onValue(sensorRef, (snapshot) => {
      const newData = snapshot.val();
      if (newData) {
        const formattedData: SensorData[] = Object.keys(newData).map((key) => ({
          time: newData[key].timestamp,
          temperature: newData[key].temperature,
          humidity: newData[key].humidity,
        }));
        setData(formattedData);
        setCurrentTemp(formattedData[formattedData.length - 1].temperature);
        setCurrentHumidity(formattedData[formattedData.length - 1].humidity);
      }
      setLoading(false);
    });

    return () => {
      // Limpiar la suscripción a Firebase si es necesario
    };
  }, []);

  const handleIrrigationStateChange = (isActive: boolean) => {
    if (isActive) {
      const newEvent = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        duration: 10,
      };
      setIrrigationEvents((prev) => [newEvent, ...prev]);
    }
  };

  if (!mounted) {
    return null; // Prevent hydration issues by not rendering until client-side
  }

  const lastTimestamp = data.length > 0 ? data[data.length - 1].time : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="flex-1 flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <main className="flex-1 p-6">
          <div className="container mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {lastTimestamp && (
              <p className="text-lg dark:text-white mt-2">Ultimo registro almacenado: {lastTimestamp}</p>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
              </div>
            ) : (
              <>
                <SensorStats
                  temperature={Math.round(currentTemp * 10) / 10}
                  humidity={Math.round(currentHumidity)}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <SensorChart
                    title="Temperature"
                    data={data}
                    dataKey="temperature"
                    gradient={{
                      from: 'hsl(var(--chart-1))',
                      to: 'hsl(var(--chart-1))',
                    }}
                    unit="°C"
                    valueFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <SensorChart
                    title="Humidity"
                    data={data}
                    dataKey="humidity"
                    gradient={{
                      from: 'hsl(var(--chart-2))',
                      to: 'hsl(var(--chart-2))',
                    }}
                    unit="%"
                    valueFormatter={(value) => `${Math.round(value)}`}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <GaugeChart
                    value={Math.round(currentTemp * 10) / 10}
                    title="Current Temperature"
                    unit="°C"
                    maxValue={40}
                    colorClass="text-red-500"
                  />
                  <GaugeChart
                    value={Math.round(currentHumidity)}
                    title="Current Humidity"
                    unit="%H"
                    maxValue={100}
                    colorClass="text-blue-500"
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
