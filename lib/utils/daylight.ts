export function generateDaylightData(sunrise: number, sunset: number) {
  const data = [];
  const start = sunrise - 3600; // 1 hour before sunrise
  const end = sunset + 3600; // 1 hour after sunset
  const midday = (sunrise + sunset) / 2;
  const duration = sunset - sunrise;
  
  for (let time = start; time <= end; time += 900) { // 15-minute intervals
    // Create a semicircular curve using sine function
    const normalizedTime = (time - sunrise) / duration;
    const intensity = Math.max(0, 
      time >= sunrise && time <= sunset 
        ? Math.sin(normalizedTime * Math.PI) * 100 
        : 0
    );
    
    data.push({
      time,
      intensity
    });
  }
  return data;
}