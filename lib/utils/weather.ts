export const getWeatherEmoji = (code: string): string => {
    // Weather condition codes from OpenWeather API
    if (code.startsWith('01')) return '☀️'; // clear sky
    if (code.startsWith('02')) return '⛅️'; // few clouds
    if (code.startsWith('03')) return '☁️'; // scattered clouds
    if (code.startsWith('04')) return '☁️'; // broken clouds
    if (code.startsWith('09')) return '🌧️'; // shower rain
    if (code.startsWith('10')) return '🌦️'; // rain
    if (code.startsWith('11')) return '⛈️'; // thunderstorm
    if (code.startsWith('13')) return '🌨️'; // snow
    if (code.startsWith('50')) return '🌫️'; // mist
    return '☀️'; // default
  };