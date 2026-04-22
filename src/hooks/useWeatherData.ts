import { useState, useEffect } from 'react';
import { WeatherData } from '../types/weather';
import { fetchWeatherData } from '../services/weatherService';

interface UseWeatherDataResult {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useWeatherData = (
  lat: number | null, 
  lon: number | null
): UseWeatherDataResult => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (lat === null || lon === null) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const weatherData = await fetchWeatherData(lat, lon);
        setData(weatherData);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to fetch weather data';
        setError(errorMessage);
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon, refetchTrigger]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { data, loading, error, refetch };
};
