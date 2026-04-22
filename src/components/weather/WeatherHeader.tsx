import { CurrentWeather, Location } from '../../types/weather';
import { formatTemperature } from '../../utils/weather';
import { GlassCard } from '../common/GlassCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface WeatherHeaderProps {
  current: CurrentWeather;
  location: Location;
}

export const WeatherHeader = ({ current, location }: WeatherHeaderProps) => {
  return (
    <GlassCard padding="lg" className="text-center">
      {/* Location */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <LocationOnIcon className="text-white/80" fontSize="small" />
        <h2 className="text-lg md:text-xl font-light text-white/90">
          {location.name}, {location.country}
        </h2>
      </div>

      {/* Temperature */}
      <div className="mb-3">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight text-white">
          {formatTemperature(current.temperature)}
        </h1>
      </div>

      {/* Condition */}
      <p className="text-xl md:text-2xl font-light text-white/80">
        {current.condition}
      </p>
    </GlassCard>
  );
};
