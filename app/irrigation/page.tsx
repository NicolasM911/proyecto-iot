'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { IrrigationButton } from '@/components/irrigation/IrrigationButton';
import { IrrigationHistory } from '@/components/irrigation/IrrigationHistory';

export default function Irrigations() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [irrigationEvents, setIrrigationEvents] = useState<Array<{
    id: string;
    timestamp: string;
    duration: number;
    source: string;
  }>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIrrigationStateChange = (isActive: boolean) => {
    if (isActive) {
      const newEvent = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        duration: 10,
        source: 'Botón Web'
      };
      setIrrigationEvents((prev) => [newEvent, ...prev]);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="flex-1 flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <main className="flex-1 p-6">
          <div className="container mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Control de Riego</h1>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Control Manual</h2>
                <IrrigationButton onStateChange={handleIrrigationStateChange} />
              </div>
              <IrrigationHistory events={irrigationEvents} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}