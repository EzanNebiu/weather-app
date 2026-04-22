import { WeatherData, Location, CurrentWeather, HourlyForecast, DailyForecast } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '77c50873b39347fc9a2165234262104';
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';

console.log('Weather Service Initialized:', { 
  hasApiKey: !!API_KEY, 
  baseUrl: BASE_URL 
});

interface WeatherAPIResponse {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
}

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data: WeatherAPIResponse = await response.json();
    return transformApiData(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data: WeatherAPIResponse = await response.json();
    return transformApiData(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const transformApiData = (data: WeatherAPIResponse): WeatherData => {
  const location: Location = {
    name: data.location.name,
    country: data.location.country,
    latitude: data.location.lat,
    longitude: data.location.lon,
  };

  const currentWeather: CurrentWeather = {
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    timeOfDay: getTimeOfDay(new Date(data.location.localtime)),
  };

  // Get next 5 hours from today's forecast
  const now = new Date(data.location.localtime);
  const currentHour = now.getHours();
  const todayForecast = data.forecast.forecastday[0];
  const tomorrowForecast = data.forecast.forecastday[1];
  
  const allHours = [
    ...todayForecast.hour.slice(currentHour),
    ...(tomorrowForecast?.hour || [])
  ];

  const hourly: HourlyForecast[] = allHours.slice(0, 5).map((hour) => ({
    hour: new Date(hour.time).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    temperature: hour.temp_c,
    condition: hour.condition.text,
    icon: hour.condition.icon,
  }));

  const daily: DailyForecast[] = data.forecast.forecastday.map((day, index) => {
    const date = new Date(day.date);
    return {
      day: index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      highTemp: day.day.maxtemp_c,
      lowTemp: day.day.mintemp_c,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    };
  });

  return {
    location,
    current: currentWeather,
    hourly,
    daily,
  };
};

const getTimeOfDay = (date: Date): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};
