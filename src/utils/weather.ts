/**
 * Get time-based gradient colors based on actual hour (0-23)
 * Creates realistic sky colors throughout the day
 */
export const getHourBasedGradient = (hour: number): string => {
  // Night: 0-4 (Deep blue/indigo)
  if (hour >= 0 && hour < 5) {
    return 'from-indigo-950 via-blue-950 to-slate-950';
  }
  
  // Pre-dawn: 5 (Dark blue transitioning)
  if (hour === 5) {
    return 'from-indigo-900 via-blue-900 to-slate-800';
  }
  
  // Dawn/Sunrise: 6-7 (Orange, pink, purple)
  if (hour === 6) {
    return 'from-orange-400 via-pink-400 to-purple-500';
  }
  if (hour === 7) {
    return 'from-orange-300 via-pink-300 to-blue-400';
  }
  
  // Early Morning: 8-9 (Soft blue, light pink)
  if (hour === 8) {
    return 'from-sky-300 via-blue-400 to-cyan-400';
  }
  if (hour === 9) {
    return 'from-blue-200 via-cyan-200 to-blue-100';
  }
  
  // Mid Morning to Noon: 10-12 (Bright blue, clear sky)
  if (hour >= 10 && hour <= 12) {
    return 'from-sky-400 via-blue-600 to-cyan-400';
  }
  
  // Afternoon: 13-16 (Bright, vivid blue)
  if (hour >= 13 && hour <= 16) {
    return 'from-sky-300 via-blue-400 to-cyan-200';
  }
  
  // Late Afternoon: 17 (Starting to warm)
  if (hour === 17) {
    return 'from-sky-300 via-blue-600 to-orange-200';
  }
  
  // Sunset Start: 18 (Orange, yellow, pink)
  if (hour === 18) {
    return 'from-orange-300 via-yellow-200 to-pink-200';
  }
  
  // Sunset Peak: 19 (Deep orange, pink, purple - your pinkish sunset)
  if (hour === 19) {
    return 'from-orange-400 via-pink-400 to-purple-400';
  }
  
  // Dusk: 20 (Purple, deep pink)
  if (hour === 20) {
    return 'from-purple-400 via-pink-500 to-indigo-600';
  }
  
  // Evening: 21 (Deep purple, indigo)
  if (hour === 21) {
    return 'from-purple-600 via-indigo-700 to-blue-900';
  }
  
  // Night: 22-23 (Deep blue, dark)
  if (hour >= 22) {
    return 'from-indigo-900 via-blue-950 to-slate-950';
  }
  
  // Fallback
  return 'from-sky-300 via-blue-200 to-cyan-100';
};

/**
 * Get local hour at a specific location
 * Uses timezone offset to calculate local time
 * If no offset provided, estimates from longitude
 */
export const getLocalHour = (longitude: number, timezoneOffsetMinutes?: number): number => {
  const now = new Date();
  
  if (timezoneOffsetMinutes !== undefined) {
    // Use provided timezone offset
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utcTime + (timezoneOffsetMinutes * 60000));
    return localTime.getHours();
  }
  
  // Estimate timezone from longitude
  // Longitude ranges from -180 to 180, each 15° = 1 hour
  const estimatedOffsetHours = Math.round(longitude / 15);
  const estimatedOffsetMinutes = estimatedOffsetHours * 60;
  
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utcTime + (estimatedOffsetMinutes * 60000));
  return localTime.getHours();
};

/**
 * Get time-based gradient colors (legacy support)
 */
export const getTimeBasedGradient = (
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
): string => {
  const gradients = {
    morning: 'from-blue-200 via-cyan-100 to-blue-50',
    afternoon: 'from-sky-300 via-blue-200 to-cyan-100',
    evening: 'from-orange-200 via-pink-200 to-purple-200',
    night: 'from-indigo-900 via-blue-900 to-slate-900',
  };

  return gradients[timeOfDay];
};

/**
 * Get weather condition emoji
 */
export const getWeatherEmoji = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return '☀️';
  if (lowerCondition.includes('cloud')) return '☁️';
  if (lowerCondition.includes('rain')) return '🌧️';
  if (lowerCondition.includes('snow')) return '❄️';
  if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) return '⛈️';
  if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) return '🌫️';
  
  return '🌤️';
};

/**
 * Format temperature with degree symbol
 */
export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°`;
};
