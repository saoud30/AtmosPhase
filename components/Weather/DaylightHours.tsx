'use client';

import { Card } from '@/components/ui/card';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Sun } from 'lucide-react';
import { ChartTooltip } from './charts/ChartTooltip';
import { ChartGradient } from './charts/ChartGradients';
import { generateDaylightData } from '@/lib/utils/daylight';

interface Props {
  sunrise: number;
  sunset: number;
}

export function DaylightHours({ sunrise, sunset }: Props) {
  const data = generateDaylightData(sunrise, sunset);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sun className="text-yellow-500" />
        <h3 className="font-semibold">Daylight Hours</h3>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground mb-4">
        <div>
          <p>Sunrise</p>
          <p className="font-medium text-foreground">
            {format(new Date(sunrise * 1000), 'HH:mm')}
          </p>
        </div>
        <div className="text-right">
          <p>Sunset</p>
          <p className="font-medium text-foreground">
            {format(new Date(sunset * 1000), 'HH:mm')}
          </p>
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <ChartGradient id="daylight" color="#fbbf24" />
            </defs>
            <Area
              type="monotone"
              dataKey="intensity"
              stroke="#fbbf24"
              fill="url(#daylight)"
              fillOpacity={0.8}
            />
            <Tooltip content={(props) => <ChartTooltip {...props} type="daylight" />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}