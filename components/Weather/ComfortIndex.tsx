'use client';

import { Card } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';

interface ComfortIndexProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

export function ComfortIndex({
  temperature,
  humidity,
  windSpeed,
  feelsLike
}: ComfortIndexProps) {
  const getComfortLevel = () => {
    if (feelsLike < 0) return { level: 'Very Cold', color: 'text-blue-500' };
    if (feelsLike < 10) return { level: 'Cold', color: 'text-blue-400' };
    if (feelsLike < 20) return { level: 'Cool', color: 'text-blue-300' };
    if (feelsLike < 25) return { level: 'Comfortable', color: 'text-green-500' };
    if (feelsLike < 30) return { level: 'Warm', color: 'text-yellow-500' };
    if (feelsLike < 35) return { level: 'Hot', color: 'text-orange-500' };
    return { level: 'Very Hot', color: 'text-red-500' };
  };

  const getBestTime = () => {
    if (feelsLike > 30) return 'Early morning or evening';
    if (feelsLike < 10) return 'Midday when temperature is highest';
    return 'Any time - conditions are favorable';
  };

  const comfort = getComfortLevel();

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Thermometer className="text-primary" />
        <h3 className="font-semibold">Comfort Index</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-2xl font-bold">{Math.round(feelsLike)}°C</p>
          <p className={`text-sm ${comfort.color}`}>{comfort.level}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Temperature</span>
            <span>{Math.round(temperature)}°C</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Humidity</span>
            <span>{humidity}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Wind Speed</span>
            <span>{windSpeed} km/h</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm font-medium">Best Time for Activities</p>
          <p className="text-sm text-muted-foreground">{getBestTime()}</p>
        </div>
      </div>
    </Card>
  );
}