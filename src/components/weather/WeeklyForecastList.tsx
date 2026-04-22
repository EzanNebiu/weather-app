import { DailyForecast } from '../../types/weather';
import { GlassCard } from '../common/GlassCard';
import { WeeklyForecastItem } from './WeeklyForecastItem';

interface WeeklyForecastListProps {
  daily: DailyForecast[];
}

export const WeeklyForecastList = ({ daily }: WeeklyForecastListProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-white/90 mb-3 px-1">
        7-Day Forecast
      </h3>
      <GlassCard padding="sm">
        <div className="divide-y divide-white/10">
          {daily.map((forecast, index) => (
            <WeeklyForecastItem key={index} forecast={forecast} />
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
