'use client';

import { Card } from '@/components/ui/card';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Gauge } from 'lucide-react';

interface CurrentWeatherProps {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  weatherCode: string;
  description: string;
}

export const CurrentWeather = ({
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  pressure,
  weatherCode,
  description,
}: CurrentWeatherProps) => {
  return (
    <Card className="p-6 bg-card text-card-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold">{Math.round(temperature)}°C</h2>
          <p className="text-muted-foreground">Feels like {Math.round(feelsLike)}°C</p>
          <p className="capitalize mt-1">{description}</p>
        </div>
        <WeatherIcon code={weatherCode} className="w-16 h-16" />
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-400" />
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="font-medium">{humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="text-blue-400" />
          <div>
            <p className="text-sm text-muted-foreground">Wind</p>
            <p className="font-medium">{windSpeed} km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Gauge className="text-blue-400" />
          <div>
            <p className="text-sm text-muted-foreground">Pressure</p>
            <p className="font-medium">{pressure} hPa</p>
          </div>
        </div>
      </div>
    </Card>
  );
};