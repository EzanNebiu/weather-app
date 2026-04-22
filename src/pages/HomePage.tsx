import { WeatherData } from '../types/weather';
import { WeatherHeader } from '../components/weather/WeatherHeader';
import { HourlyForecastBar } from '../components/weather/HourlyForecastBar';
import { WeeklyForecastList } from '../components/weather/WeeklyForecastList';
import { Footer } from '../components/layout/Footer';

interface HomePageProps {
  weatherData: WeatherData;
}

export const HomePage = ({ weatherData }: HomePageProps) => {
  const { location, current, hourly, daily } = weatherData;

  return (
    <>
      <main className="relative z-10 px-3 sm:px-4 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 pb-20 sm:pb-24 md:pb-8 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 md:ml-32 lg:ml-48">
          {/* Weather Header */}
          <div className="pt-4 sm:pt-6 md:pt-8">
            <WeatherHeader current={current} location={location} />
          </div>

          {/* Hourly Forecast */}
          <HourlyForecastBar hourly={hourly} />

          {/* Weekly Forecast */}
          <WeeklyForecastList daily={daily} />
        </div>
      </main>
      
      <Footer />
    </>
  );
};
