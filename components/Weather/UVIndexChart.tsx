'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun } from 'lucide-react';
import { format } from 'date-fns';

interface UVData {
  time: number;
  index: number;
}

interface UVIndexChartProps {
  data: UVData[];
}

export function UVIndexChart({ data }: UVIndexChartProps) {
  const getUVRiskLevel = (index: number) => {
    if (index <= 2) return { level: 'Low', color: 'text-green-500' };
    if (index <= 5) return { level: 'Moderate', color: 'text-yellow-500' };
    if (index <= 7) return { level: 'High', color: 'text-orange-500' };
    if (index <= 10) return { level: 'Very High', color: 'text-red-500' };
    return { level: 'Extreme', color: 'text-purple-500' };
  };

  const currentUV = data[0]?.index || 0;
  const riskLevel = getUVRiskLevel(currentUV);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sun className="text-primary" />
        <h3 className="font-semibold">UV Index</h3>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold">{currentUV}</p>
        <p className={`text-sm ${riskLevel.color}`}>{riskLevel.level} Risk</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              tickFormatter={(time) => format(new Date(time * 1000), 'HH:mm')}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              domain={[0, 'dataMax + 2']}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const uvIndex = payload[0].value as number;
                const risk = getUVRiskLevel(uvIndex);
                return (
                  <div className="bg-background border rounded-lg shadow-lg p-2">
                    <p className="text-sm">
                      {format(new Date(payload[0].payload.time * 1000), 'HH:mm')}
                    </p>
                    <p className={`text-sm ${risk.color}`}>
                      UV Index: {uvIndex} ({risk.level})
                    </p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="index"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}