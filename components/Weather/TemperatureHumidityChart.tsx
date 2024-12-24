'use client';

import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ChartTooltip } from './charts/ChartTooltip';
import { ChartGradient } from './charts/ChartGradients';

interface DataPoint {
  time: number;
  temperature: number;
  humidity: number;
}

interface Props {
  data: DataPoint[];
}

export function TemperatureHumidityChart({ data }: Props) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Temperature and Humidity Forecast</h3>
      <p className="text-sm text-muted-foreground mb-4">Weather conditions for the next few days</p>
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <ChartGradient id="temperature" color="hsl(var(--chart-1))" />
              <ChartGradient id="humidity" color="hsl(var(--chart-2))" />
            </defs>
            <XAxis
              dataKey="time"
              tickFormatter={(time: number) => format(new Date(time * 1000), 'MMM dd, HH:mm')}
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              yAxisId="temp"
              orientation="left"
              stroke="hsl(var(--chart-1))"
              label={{ value: '°C', position: 'insideLeft', fill: 'hsl(var(--chart-1))' }}
            />
            <YAxis
              yAxisId="humidity"
              orientation="right"
              stroke="hsl(var(--chart-2))"
              label={{ value: '%', position: 'insideRight', fill: 'hsl(var(--chart-2))' }}
            />
            <Tooltip content={(props) => <ChartTooltip {...props} type="weather" />} />
            <Area
              yAxisId="temp"
              type="monotone"
              dataKey="temperature"
              stroke="hsl(var(--chart-1))"
              fillOpacity={0.8}
              fill="url(#temperature)"
            />
            <Area
              yAxisId="humidity"
              type="monotone"
              dataKey="humidity"
              stroke="hsl(var(--chart-2))"
              fillOpacity={0.8}
              fill="url(#humidity)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}