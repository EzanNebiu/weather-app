// Export all components for easy importing
export { GlassCard } from './components/common/GlassCard';
export { EarthBackground } from './components/background/EarthBackground';
export { WeatherHeader } from './components/weather/WeatherHeader';
export { HourlyForecastBar } from './components/weather/HourlyForecastBar';
export { HourlyForecastCard } from './components/weather/HourlyForecastCard';
export { WeeklyForecastList } from './components/weather/WeeklyForecastList';
export { WeeklyForecastItem } from './components/weather/WeeklyForecastItem';
export { ResponsiveNavigation } from './components/navigation/ResponsiveNavigation';
export { MobileBottomNav } from './components/navigation/MobileBottomNav';
export { DesktopNav } from './components/navigation/DesktopNav';
export { WeatherHomePage } from './pages/WeatherHomePage';

// Export types
export type {
  Location,
  HourlyForecast,
  DailyForecast,
  CurrentWeather,
  WeatherData,
} from './types/weather';
export type { NavigationItem } from './types/navigation';

// Export utilities
export {
  latLongToPosition,
  formatCoordinates,
} from './utils/location';
export {
  getTimeBasedGradient,
  getWeatherEmoji,
  formatTemperature,
} from './utils/weather';

// Export constants
export { NAVIGATION_ITEMS } from './constants/navigation';
export { BREAKPOINTS, EARTH_ROTATION_DURATION, PULSE_DURATION } from './constants/ui';

// Export mock data
export { mockWeatherData } from './data/mockWeatherData';
