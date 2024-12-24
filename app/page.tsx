'use client';

import { useEffect, useState, useCallback } from 'react';
import { Header } from '@/components/Layout/Header';
import { WeatherGrid } from '@/components/Weather/WeatherGrid';
import { LoadingState } from '@/components/Loading/LoadingState';
import { ErrorState } from '@/components/Error/ErrorState';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { fetchWeatherData, fetchAirQuality, fetchForecast } from '@/lib/api';
import type { WeatherData, ForecastData, AirQualityData } from '@/lib/types';

function WeatherDashboard() {
  const [city, setCity] = useState('Delhi, IN');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCityChange = useCallback((newCity: string) => {
    if (newCity.trim().length >= 2) {
      setCity(newCity);
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (!city.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);

      const weatherData = await fetchWeatherData(city);
      const forecastData = await fetchForecast(city);
      const aqData = await fetchAirQuality(
        weatherData.coord.lat,
        weatherData.coord.lon
      );

      setWeather(weatherData);
      setForecast(forecastData);
      setAirQuality(aqData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;
  if (!weather || !forecast || !airQuality) {
    return <ErrorState message="Weather data is unavailable" />;
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header city={city} onCityChange={handleCityChange} />
        <WeatherGrid 
          weather={weather} 
          airQuality={airQuality}
          forecast={forecast.list}
        />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
      <WeatherDashboard />
    </ErrorBoundary>
  );
}