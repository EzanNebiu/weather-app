import { HourlyForecast } from '../../types/weather';
import { HourlyForecastCard } from './HourlyForecastCard';

interface HourlyForecastBarProps {
  hourly: HourlyForecast[];
}

export const HourlyForecastBar = ({ hourly }: HourlyForecastBarProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-white/90 mb-3 px-1">
        Hourly Forecast
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {hourly.map((forecast, index) => (
          <HourlyForecastCard key={index} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};
