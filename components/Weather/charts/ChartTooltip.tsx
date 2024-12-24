'use client';

import { format } from 'date-fns';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  type: 'weather' | 'daylight';
}

export function ChartTooltip({ active, payload, type }: TooltipProps) {
  if (!active || !payload?.length) return null;

  if (type === 'weather') {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="text-sm">
          {format(new Date(payload[0].payload.time * 1000), 'MMM dd, HH:mm')}
        </p>
        <p className="text-sm text-[hsl(var(--chart-1))]">
          Temperature: {payload[0].value}°C
        </p>
        <p className="text-sm text-[hsl(var(--chart-2))]">
          Humidity: {payload[1].value}%
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background border rounded-lg shadow-lg p-2">
      <p className="text-sm">
        {format(new Date(payload[0].payload.time * 1000), 'HH:mm')}
      </p>
    </div>
  );
}