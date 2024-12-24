'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastItem {
  time: string;
  temperature: number;
  weatherCode: string;
}

interface HourlyForecastProps {
  forecast: HourlyForecastItem[];
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Hourly Forecast</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-6">
          {forecast.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground">{item.time}</span>
              <WeatherIcon code={item.weatherCode} className="my-2 w-8 h-8" />
              <span className="font-medium">{Math.round(item.temperature)}°C</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};