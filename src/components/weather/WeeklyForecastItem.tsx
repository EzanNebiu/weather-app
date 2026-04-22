import { DailyForecast } from '../../types/weather';
import { formatTemperature, getWeatherEmoji } from '../../utils/weather';

interface WeeklyForecastItemProps {
  forecast: DailyForecast;
}

export const WeeklyForecastItem = ({ forecast }: WeeklyForecastItemProps) => {
  return (
    <div className="flex items-center justify-between py-4 px-2 hover:bg-white/5 rounded-xl transition-colors">
      {/* Day and Date */}
      <div className="flex-1">
        <p className="font-medium text-white text-base">
          {forecast.day}
        </p>
        <p className="text-sm text-white/60">
          {forecast.date}
        </p>
      </div>

      {/* Weather Icon */}
      <div className="text-3xl mx-4">
        {getWeatherEmoji(forecast.condition)}
      </div>

      {/* Temperature Range */}
      <div className="flex items-center gap-3 min-w-[100px] justify-end">
        <span className="text-white/60 text-base">
          {formatTemperature(forecast.lowTemp)}
        </span>
        <span className="text-white text-lg font-semibold">
          {formatTemperature(forecast.highTemp)}
        </span>
      </div>
    </div>
  );
};
