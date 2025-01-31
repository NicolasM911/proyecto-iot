'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IrrigationEvent {
  id: string;
  timestamp: string;
  duration: number;
}

interface IrrigationHistoryProps {
  events: IrrigationEvent[];
}

export function IrrigationHistory({ events }: IrrigationHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Riego</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Fecha</TableHead>
                <TableHead>Duración</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    {new Date(event.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{event.duration} segundos</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}