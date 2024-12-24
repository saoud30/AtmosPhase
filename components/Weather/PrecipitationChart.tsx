'use client';

import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CloudRain } from 'lucide-react';
import { format } from 'date-fns';

interface PrecipitationData {
  time: number;
  probability: number;
  amount: number;
}

interface PrecipitationChartProps {
  data: PrecipitationData[];
}

export function PrecipitationChart({ data }: PrecipitationChartProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <CloudRain className="text-primary" />
        <h3 className="font-semibold">Precipitation Forecast</h3>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="time"
              tickFormatter={(time) => format(new Date(time * 1000), 'HH:mm')}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              yAxisId="probability"
              orientation="left"
              stroke="hsl(var(--chart-1))"
              label={{ value: '%', position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="amount"
              orientation="right"
              stroke="hsl(var(--chart-2))"
              label={{ value: 'mm', position: 'insideRight' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="bg-background border rounded-lg shadow-lg p-2">
                    <p className="text-sm">
                      {format(new Date(payload[0].payload.time * 1000), 'HH:mm')}
                    </p>
                    <p className="text-sm text-[hsl(var(--chart-1))]">
                      Probability: {payload[0].value}%
                    </p>
                    <p className="text-sm text-[hsl(var(--chart-2))]">
                      Amount: {payload[1].value}mm
                    </p>
                  </div>
                );
              }}
            />
            <Bar
              yAxisId="probability"
              dataKey="probability"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.8}
            />
            <Bar
              yAxisId="amount"
              dataKey="amount"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}