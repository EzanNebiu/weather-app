import { LocationProvider } from './router/AppRouter';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { useGeolocation } from './hooks/useGeolocation';
import { mockWeatherData } from './data/mockWeatherData';

function App() {
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();

  console.log('App State:', { 
    geoLoading, 
    geoError,
    latitude,
    longitude 
  });

  // Show loading state while getting geolocation
  if (geoLoading) {
    return <LoadingScreen />;
  }

  // If there's a geolocation error, use mock data location as fallback
  const initialLat = latitude || mockWeatherData.location.latitude;
  const initialLon = longitude || mockWeatherData.location.longitude;

  if (geoError) {
    console.warn('Geolocation error:', geoError);
    console.info('Using mock location as fallback');
  }

  return (
    <LocationProvider initialLat={initialLat} initialLon={initialLon} />
  );
}

export default App;

