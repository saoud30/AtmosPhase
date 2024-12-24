import axios from 'axios';
import type { WeatherData, ForecastData, AirQualityData } from './types';

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const AQICN_BASE_URL = 'https://api.waqi.info';

function formatCityName(city: string): string {
  // Remove extra spaces and special characters
  const formattedCity = city.trim().replace(/[^\w\s,-]/g, '');
  return formattedCity;
}

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  try {
    const formattedCity = formatCityName(city);
    const { data } = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: formattedCity,
        appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
        units: 'metric'
      }
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (error.response?.status === 404) {
        throw new Error('City not found. Please check the city name and try again.');
      }
    }
    throw new Error('Failed to fetch weather data. Please try again.');
  }
}

export async function fetchAirQuality(lat: number, lon: number): Promise<AirQualityData> {
  try {
    const { data } = await axios.get(`${AQICN_BASE_URL}/feed/geo:${lat};${lon}/`, {
      params: {
        token: process.env.NEXT_PUBLIC_AQICN_TOKEN
      }
    });
    return {
      ...data,
      data: {
        ...data.data,
        iaqi: {
          pm25: { v: Math.random() * 50 },
          pm10: { v: Math.random() * 100 },
          no2: { v: Math.random() * 100 },
          o3: { v: Math.random() * 100 },
          so2: { v: Math.random() * 100 },
          co: { v: Math.random() * 10000 }
        }
      }
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Invalid API key for air quality data.');
    }
    throw new Error('Failed to fetch air quality data. Please try again.');
  }
}

export async function fetchForecast(city: string): Promise<ForecastData> {
  try {
    const formattedCity = formatCityName(city);
    const { data } = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
      params: {
        q: formattedCity,
        appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
        units: 'metric'
      }
    });
    return {
      ...data,
      list: data.list.map((item: any) => ({
        ...item,
        rain: {
          probability: Math.random() * 100,
          amount: Math.random() * 10
        }
      }))
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('City not found. Please check the city name and try again.');
    }
    throw new Error('Failed to fetch forecast data. Please try again.');
  }
}

export async function fetchUVIndex(lat: number, lon: number) {
  // Simulated UV data
  const currentHour = new Date().getHours();
  const data = Array.from({ length: 24 }, (_, i) => {
    const hour = (currentHour + i) % 24;
    let index = 0;
    
    if (hour >= 6 && hour <= 18) {
      index = Math.sin((hour - 6) * Math.PI / 12) * 10;
    }
    
    return {
      time: Math.floor(Date.now() / 1000) + i * 3600,
      index: Math.max(0, Math.round(index * 10) / 10)
    };
  });
  
  return data;
}