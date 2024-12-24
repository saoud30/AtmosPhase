export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastData {
  list: Array<{
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

export interface AirQualityData {
  data: {
    aqi: number;
    iaqi: {
      pm25: { v: number };
      pm10: { v: number };
      no2: { v: number };
      o3: { v: number };
      so2: { v: number };
      co: { v: number };
    };
  };
}