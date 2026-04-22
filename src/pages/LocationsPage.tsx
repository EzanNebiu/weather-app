import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/common/GlassCard';
import { Footer } from '../components/layout/Footer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface SavedLocation {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  temperature: number;
  condition: string;
  isFavorite: boolean;
}

interface LocationsPageProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

export const LocationsPage = ({ onLocationSelect }: LocationsPageProps) => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<SavedLocation[]>([
    {
      id: '1',
      name: 'New York',
      country: 'United States',
      latitude: 40.7128,
      longitude: -74.0060,
      temperature: 72,
      condition: 'Partly Cloudy',
      isFavorite: true,
    },
    {
      id: '2',
      name: 'London',
      country: 'United Kingdom',
      latitude: 51.5074,
      longitude: -0.1278,
      temperature: 61,
      condition: 'Rainy',
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Tokyo',
      country: 'Japan',
      latitude: 35.6762,
      longitude: 139.6503,
      temperature: 68,
      condition: 'Clear',
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (id: string) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { ...loc, isFavorite: !loc.isFavorite } : loc
    ));
  };

  const removeLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const handleSelectLocation = (location: SavedLocation) => {
    console.log('Selected location:', location);
    // Update the weather location
    onLocationSelect(location.latitude, location.longitude);
    // Navigate to home page
    navigate('/');
  };

  const handleCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Current location:', { latitude, longitude });
          onLocationSelect(latitude, longitude);
          navigate('/');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services and try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <>
      <main className="relative z-10 px-4 md:px-8 lg:px-12 py-8 pb-24 md:pb-8 min-h-screen">
        <div className="max-w-3xl mx-auto md:ml-32 lg:ml-48">
          <div className="pt-8 md:pt-4 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                My Locations
              </h1>
              <p className="text-white/70">
                Manage your saved weather locations
              </p>
            </div>

            {/* Current Location Card */}
            <GlassCard hover>
              <div 
                className="flex items-center gap-4 cursor-pointer"
                onClick={handleCurrentLocation}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <MyLocationIcon className="text-blue-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">
                    Current Location
                  </h3>
                  <p className="text-white/60 text-sm">
                    Use GPS to get local weather
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Saved Locations */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Saved Locations ({locations.length})
              </h2>
              
              {locations.length === 0 ? (
                <GlassCard>
                  <div className="text-center text-white/70 py-12">
                    <LocationOnIcon className="mx-auto text-white/40 mb-4" style={{ fontSize: 48 }} />
                    <p>No saved locations yet</p>
                    <p className="text-sm mt-2">Search for locations to add them here</p>
                  </div>
                </GlassCard>
              ) : (
                <div className="space-y-3">
                  {locations.map((location) => (
                    <GlassCard
                      key={location.id}
                      hover
                    >
                      <div className="flex items-center gap-4">
                        {/* Location Icon */}
                        <div 
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 cursor-pointer"
                          onClick={() => handleSelectLocation(location)}
                        >
                          <LocationOnIcon className="text-white/80" />
                        </div>

                        {/* Location Info */}
                        <div 
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => handleSelectLocation(location)}
                        >
                          <h3 className="text-white font-semibold text-lg truncate">
                            {location.name}
                          </h3>
                          <p className="text-white/60 text-sm truncate">
                            {location.country}
                          </p>
                        </div>

                        {/* Weather Info */}
                        <div 
                          className="text-right cursor-pointer"
                          onClick={() => handleSelectLocation(location)}
                        >
                          <p className="text-white font-bold text-xl">
                            {location.temperature}°
                          </p>
                          <p className="text-white/60 text-xs">
                            {location.condition}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(location.id);
                            }}
                            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                          >
                            {location.isFavorite ? (
                              <StarIcon className="text-yellow-400" fontSize="small" />
                            ) : (
                              <StarBorderIcon className="text-white/60" fontSize="small" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeLocation(location.id);
                            }}
                            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-colors group"
                          >
                            <DeleteIcon className="text-white/60 group-hover:text-red-400" fontSize="small" />
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};
