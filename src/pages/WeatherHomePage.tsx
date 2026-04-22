import { WeatherData } from '../types/weather';
import { WeatherHeader } from '../components/weather/WeatherHeader';
import { HourlyForecastBar } from '../components/weather/HourlyForecastBar';
import { WeeklyForecastList } from '../components/weather/WeeklyForecastList';
import { ResponsiveNavigation } from '../components/navigation/ResponsiveNavigation';

interface WeatherHomePageProps {
  weatherData: WeatherData;
}

export const WeatherHomePage = ({ weatherData }: WeatherHomePageProps) => {
  const { location, current, hourly, daily } = weatherData;

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <ResponsiveNavigation />

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-8 lg:px-12 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto space-y-8 md:ml-32 lg:ml-48">
          {/* Weather Header */}
          <div className="pt-8 md:pt-4">
            <WeatherHeader current={current} location={location} />
          </div>

          {/* Hourly Forecast */}
          <HourlyForecastBar hourly={hourly} />

          {/* Weekly Forecast */}
          <WeeklyForecastList daily={daily} />
        </div>
      </main>
    </div>
  );
};
