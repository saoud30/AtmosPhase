'use client';

import { Card } from '@/components/ui/card';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { Wind } from 'lucide-react';

interface WindChartProps {
  windSpeed: number;
  windDeg: number;
  gust?: number;
}

export function WindChart({ windSpeed, windDeg, gust }: WindChartProps) {
  // Convert wind direction to cardinal points
  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index];
  };

  const data = [
    {
      direction: getWindDirection(windDeg),
      value: windSpeed,
      gust: gust || windSpeed
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="text-primary" />
        <h3 className="font-semibold">Wind Conditions</h3>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="direction"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, Math.max(windSpeed, gust || 0) + 5]}
            />
            <Radar
              name="Wind Speed"
              dataKey="value"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
            />
            {gust && (
              <Radar
                name="Gust"
                dataKey="gust"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.4}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Wind Speed: {windSpeed} km/h</p>
        {gust && <p>Gust Speed: {gust} km/h</p>}
        <p>Direction: {getWindDirection(windDeg)} ({windDeg}°)</p>
      </div>
    </Card>
  );
}