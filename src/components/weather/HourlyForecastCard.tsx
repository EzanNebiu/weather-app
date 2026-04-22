import { HourlyForecast } from '../../types/weather';
import { formatTemperature, getWeatherEmoji } from '../../utils/weather';
import { GlassCard } from '../common/GlassCard';

interface HourlyForecastCardProps {
  forecast: HourlyForecast;
}

export const HourlyForecastCard = ({ forecast }: HourlyForecastCardProps) => {
  return (
    <GlassCard 
      padding="sm" 
      className="min-w-[100px] flex-shrink-0 text-center hover:bg-white/15 transition-colors"
    >
      <p className="text-sm font-medium text-white/80 mb-2">
        {forecast.hour}
      </p>
      <div className="text-3xl mb-2">
        {getWeatherEmoji(forecast.condition)}
      </div>
      <p className="text-xl font-semibold text-white">
        {formatTemperature(forecast.temperature)}
      </p>
    </GlassCard>
  );
};
