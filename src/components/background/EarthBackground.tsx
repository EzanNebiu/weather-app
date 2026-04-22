import { EarthScene } from './EarthScene';
import { getHourBasedGradient, getLocalHour } from '../../utils/weather';

interface EarthBackgroundProps {
  latitude: number;
  longitude: number;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  isHomePage: boolean;
  timezoneOffset?: number;
}

export const EarthBackground = ({ 
  latitude, 
  longitude, 
  isHomePage,
  timezoneOffset
}: EarthBackgroundProps) => {
  // Calculate local hour at the location
  const localHour = getLocalHour(longitude, timezoneOffset);
  
  // Get gradient based on actual hour
  const gradientClass = getHourBasedGradient(localHour);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dynamic gradient background based on actual local time */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} transition-colors duration-1000`} />
      
      {/* 3D Earth Scene */}
      <div className="absolute inset-0">
        <EarthScene 
          latitude={latitude} 
          longitude={longitude} 
          isHomePage={isHomePage}
        />
      </div>

      {/* Atmospheric overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

