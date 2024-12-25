'use client';

import { Card } from '@/components/ui/card';
import { getWeatherEmoji } from '@/lib/utils/weather';
import { format } from 'date-fns';

interface HourlyForecastItem {
  time: string;
  temperature: number;
  weatherCode: string;
}

interface HourlyForecastProps {
  forecast: HourlyForecastItem[];
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <Card className="p-6 glass-card">
      <h3 className="font-semibold mb-4">Hourly Forecast</h3>
      <div className="flex justify-between items-center">
        {forecast.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span className="text-sm text-muted-foreground">{formatTime(item.time)}</span>
            <span className="text-2xl">{getWeatherEmoji(item.weatherCode)}</span>
            <span className="font-medium">{Math.round(item.temperature)}°C</span>
          </div>
        ))}
      </div>
    </Card>
  );
};