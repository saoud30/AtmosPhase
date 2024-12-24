'use client';

import { Card } from '@/components/ui/card';
import { Wind } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AirQualityDetailsProps {
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
  so2: number;
  co: number;
}

export function AirQualityDetails({
  pm25,
  pm10,
  no2,
  o3,
  so2,
  co
}: AirQualityDetailsProps) {
  const data = [
    { name: 'PM2.5', value: pm25, limit: 25 },
    { name: 'PM10', value: pm10, limit: 50 },
    { name: 'NO₂', value: no2, limit: 200 },
    { name: 'O₃', value: o3, limit: 100 },
    { name: 'SO₂', value: so2, limit: 350 },
    { name: 'CO', value: co, limit: 10000 }
  ];

  const getHealthRecommendation = () => {
    const maxRatio = Math.max(...data.map(item => item.value / item.limit));
    if (maxRatio <= 0.5) return 'Air quality is good. Perfect for outdoor activities!';
    if (maxRatio <= 1) return 'Moderate air quality. Sensitive individuals should limit prolonged outdoor exposure.';
    return 'Poor air quality. Consider reducing outdoor activities.';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="text-primary" />
        <h3 className="font-semibold">Air Quality Components</h3>
      </div>
      <div className="h-[200px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-background border rounded-lg shadow-lg p-2">
                    <p className="text-sm font-medium">{data.name}</p>
                    <p className="text-sm">Value: {data.value} µg/m³</p>
                    <p className="text-sm">Limit: {data.limit} µg/m³</p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-muted-foreground">{getHealthRecommendation()}</p>
    </Card>
  );
}