'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { generateWeatherSummary } from '@/lib/gemini';
import type { WeatherData, AirQualityData } from '@/lib/types';

interface WeatherSummaryProps {
  weather: WeatherData;
  airQuality: AirQualityData;
}

export function WeatherSummary({ weather, airQuality }: WeatherSummaryProps) {
  const [summary, setSummary] = useState<string>('Generating summary...');

  useEffect(() => {
    const weatherWithAQI = {
      ...weather,
      airQuality: airQuality.data.aqi
    };
    generateWeatherSummary(weatherWithAQI).then(setSummary);
  }, [weather, airQuality]);

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Weather Summary</h3>
      <p className="text-muted-foreground">{summary}</p>
    </Card>
  );
}