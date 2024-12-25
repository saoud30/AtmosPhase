'use client';

import { CurrentWeather } from '@/components/CurrentWeather';
import { AirQualityCard } from '@/components/AirQualityCard';
import { TemperatureHumidityChart } from './TemperatureHumidityChart';
import { DaylightHours } from './DaylightHours';
import { WeatherSummary } from './WeatherSummary';
import { WeatherChat } from './WeatherChat';
import { WindChart } from './WindChart';
import { PrecipitationChart } from './PrecipitationChart';
import { ComfortIndex } from './ComfortIndex';
import { HourlyForecast } from '@/components/HourlyForecast';
import { format } from 'date-fns';
import type { WeatherData, AirQualityData } from '@/lib/types';

interface WeatherGridProps {
  weather: WeatherData;
  airQuality: AirQualityData;
  forecast: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      icon: string;
    }>;
    rain?: {
      probability: number;
      amount: number;
    };
  }>;
}

export function WeatherGrid({ weather, airQuality, forecast }: WeatherGridProps) {
  const forecastData = forecast.map(item => ({
    time: item.dt,
    temperature: item.main.temp,
    humidity: item.main.humidity
  }));

  const precipitationData = forecast.map(item => ({
    time: item.dt,
    probability: item.rain?.probability || 0,
    amount: item.rain?.amount || 0
  }));

  const specificTimes = ['20:30', '23:30', '02:30', '05:30', '11:00'];
  const hourlyForecast = forecast
    .filter((_, index) => index < 24)
    .filter(item => {
      const timeStr = format(new Date(item.dt * 1000), 'HH:mm');
      return specificTimes.includes(timeStr);
    })
    .map(item => ({
      time: format(new Date(item.dt * 1000), 'HH:mm'),
      temperature: item.main.temp,
      weatherCode: item.weather[0].icon
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-float">
      <CurrentWeather
        temperature={weather.main.temp}
        feelsLike={weather.main.feels_like}
        humidity={weather.main.humidity}
        windSpeed={weather.wind.speed}
        pressure={weather.main.pressure}
        weatherCode={weather.weather[0].icon}
        description={weather.weather[0].description}
      />
      <ComfortIndex
        temperature={weather.main.temp}
        humidity={weather.main.humidity}
        windSpeed={weather.wind.speed}
        feelsLike={weather.main.feels_like}
      />
      <TemperatureHumidityChart data={forecastData} />
      <PrecipitationChart data={precipitationData} />
      <WindChart
        windSpeed={weather.wind.speed}
        windDeg={weather.wind.deg}
        gust={weather.wind.gust}
      />
      <AirQualityCard aqi={airQuality.data.aqi} />
      <DaylightHours 
        sunrise={weather.sys.sunrise} 
        sunset={weather.sys.sunset}
      />
      <WeatherSummary weather={weather} airQuality={airQuality} />
      <div className="lg:col-span-2">
        <HourlyForecast forecast={hourlyForecast} />
      </div>
      <WeatherChat />
    </div>
  );
}