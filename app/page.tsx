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
  
    const sensorRef = query(ref(database, 'sensordata'), limitToLast(100));
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const newData = snapshot.val();
      console.log("Datos recibidos desde Firebase:", newData); // <-- Verifica los datos que llegan
  
      if (newData) {
        const formattedData: SensorData[] = Object.keys(newData).map((key) => ({
          time: newData[key].timestamp,
          temperature: newData[key].temperature,
          humidity: newData[key].humidity,
        }));
  
        console.log("Datos formateados:", formattedData); // <-- Verifica la transformación
  
        setData([...formattedData]); // <-- Asegura que React detecte el cambio de estado
        setCurrentTemp(formattedData[formattedData.length - 1].temperature);
        setCurrentHumidity(formattedData[formattedData.length - 1].humidity);
      }
      setLoading(false);
    });
  
    return () => unsubscribe(); // Limpia la suscripción cuando el componente se desmonta
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
            <h1 className="text-3xl font-bold">Panel</h1>

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
                    title="Temperatura"
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
                    title="Humedad"
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
                    title="Temperatura actual"
                    unit="°C"
                    maxValue={40}
                    colorClass="text-red-500"
                  />
                  <GaugeChart
                    value={Math.round(currentHumidity)}
                    title="Humedad actual"
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
