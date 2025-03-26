'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/date-range-picker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { database } from '@/firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { ref, onValue, query, limitToLast } from 'firebase/database'; // Métodos de Firebase
import * as XLSX from 'xlsx'; // Librería para exportar a Excel

export default function History() {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<{ from: Date; to: Date } | undefined>();
  const [historicalData, setHistoricalData] = useState<any[]>([]); // Datos históricos de Firebase
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [numRecords, setNumRecords] = useState("10"); // Número de registros a mostrar
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Obtener datos desde Firebase
    const sensorRef = query(ref(database, 'sensordata'), limitToLast(100)); // Limitar los últimos 100 registros
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          timestamp: new Date(data[key].timestamp).toISOString(),
          temperature: data[key].temperature,
          humidity: data[key].humidity,
        }));
        setHistoricalData(formattedData.reverse()); // Ordenar los datos en orden descendente
      } else {
        setHistoricalData([]);
      }
    });

  }, []);

  if (!mounted) {
    return null;
  }

  const handleDownloadExcel = () => {
    const dataToDownload = historicalData.slice(0, parseInt(numRecords));
    const ws = XLSX.utils.json_to_sheet(dataToDownload);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Historial");
    XLSX.writeFile(wb, `historial_sensor_${numRecords}.xlsx`);
  };

  // Filtrar los datos por el rango de fechas
  const filteredData = date
    ? historicalData.filter(
        (item) =>
          new Date(item.timestamp) >= date.from &&
          new Date(item.timestamp) <= date.to
      )
    : historicalData;

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="flex-1 flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto space-y-4">
            {/* Header and Main Controls */}
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
              <h1 className="text-2xl md:text-3xl font-bold">Historial de sensores</h1>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button
                  onClick={handleDownloadExcel}
                  variant="outline"
                  size="sm"
                  className="ml-auto md:ml-0"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </div>

            {/* Filters Section */}
            <div className={`space-y-4 md:space-y-0 md:flex md:items-center md:gap-4 ${showFilters ? 'block' : 'hidden md:flex'}`}>
              <div className="flex-1 min-w-[240px]">
                {/* <DatePickerWithRange date={date} setDate={setDate} /> */}
              </div>
              <Select value={numRecords} onValueChange={setNumRecords}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Number of records" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 registros</SelectItem>
                  <SelectItem value="20">20 registros</SelectItem>
                  <SelectItem value="50">50 registros</SelectItem>
                  <SelectItem value="100">100 registros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table Section */}
            <Card className="overflow-hidden">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="min-w-full">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background z-10">
                      <TableRow>
                        <TableHead className="w-[200px] md:w-auto">Fecha</TableHead>
                        <TableHead>Temperatura (°C)</TableHead>
                        <TableHead>Humedad (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.slice(0, parseInt(numRecords)).map((reading) => (
                        <TableRow key={reading.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {new Date(reading.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>{reading.temperature}</TableCell>
                          <TableCell>{reading.humidity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
