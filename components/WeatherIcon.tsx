import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  CloudDrizzle
} from 'lucide-react';

interface WeatherIconProps {
  code: string;
  className?: string;
}

export const WeatherIcon = ({ code, className = '' }: WeatherIconProps) => {
  const getIcon = () => {
    // Weather condition codes from OpenWeather API
    if (code.startsWith('01')) return <Sun className={className} />; // clear sky
    if (code.startsWith('02') || code.startsWith('03') || code.startsWith('04')) return <Cloud className={className} />; // clouds
    if (code.startsWith('09')) return <CloudDrizzle className={className} />; // drizzle
    if (code.startsWith('10')) return <CloudRain className={className} />; // rain
    if (code.startsWith('11')) return <CloudLightning className={className} />; // thunderstorm
    if (code.startsWith('13')) return <CloudSnow className={className} />; // snow
    return <Sun className={className} />; // default
  };

  return getIcon();
};