'use client';

import { Card } from '@/components/ui/card';

interface AirQualityCardProps {
  aqi: number;
}

export function AirQualityCard({ aqi }: AirQualityCardProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Air Quality</h3>
      <div className="text-center">
        <div className="text-4xl font-bold mb-2">{aqi}</div>
        <p className="text-muted-foreground">Air Quality Index</p>
      </div>
    </Card>
  );
}