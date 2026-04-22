import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { LocationsPage } from '../pages/LocationsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ResponsiveNavigation } from '../components/navigation/ResponsiveNavigation';
import { EarthBackground } from '../components/background/EarthBackground';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { ErrorScreen } from '../components/layout/ErrorScreen';
import { useWeatherData } from '../hooks/useWeatherData';
import { mockWeatherData } from '../data/mockWeatherData';

interface LocationProviderProps {
  initialLat: number;
  initialLon: number;
}

export const LocationProvider = ({ initialLat, initialLon }: LocationProviderProps) => {
  const [latitude, setLatitude] = useState(initialLat);
  const [longitude, setLongitude] = useState(initialLon);

  const { data, loading: weatherLoading, error: weatherError, refetch } = useWeatherData(latitude, longitude);

  // Function to update location
  const updateLocation = (lat: number, lon: number) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  // Show loading state
  if (weatherLoading) {
    return <LoadingScreen />;
  }

  // If there's a weather API error, show error screen with retry
  if (weatherError && !data) {
    return <ErrorScreen error={weatherError} onRetry={refetch} />;
  }

  // Use real data if available, otherwise fallback to mock data
  const weatherData = data || mockWeatherData;

  return (
    <BrowserRouter>
      <AppContent weatherData={weatherData} onLocationChange={updateLocation} />
    </BrowserRouter>
  );
};

interface AppContentProps {
  weatherData: any;
  onLocationChange: (lat: number, lon: number) => void;
}

const AppContent = ({ weatherData, onLocationChange }: AppContentProps) => {
  const { location: weatherLocation, current } = weatherData;
  const location = useLocation();
  
  // Determine if rotation should be allowed based on current page
  // Only allow rotation on home page, and only after 10 second delay
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen relative">
      {/* Global Earth Background */}
      <EarthBackground 
        latitude={weatherLocation.latitude} 
        longitude={weatherLocation.longitude}
        timeOfDay={current.timeOfDay}
        isHomePage={isHomePage}
        timezoneOffset={weatherLocation.timezoneOffset}
      />

      {/* Navigation */}
      <ResponsiveNavigation />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage weatherData={weatherData} />} />
        <Route path="/search" element={<SearchPage onLocationSelect={onLocationChange} />} />
        <Route path="/locations" element={<LocationsPage onLocationSelect={onLocationChange} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
