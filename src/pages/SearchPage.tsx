import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/common/GlassCard';
import { Footer } from '../components/layout/Footer';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface SearchResult {
  id: string;
  name: string;
  country: string;
  region?: string;
  latitude: number;
  longitude: number;
}

interface SearchPageProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

export const SearchPage = ({ onLocationSelect }: SearchPageProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // Use OpenStreetMap Nominatim API for geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'WeatherApp/2.0'
          }
        }
      );
      
      const data = await response.json();
      
      const results: SearchResult[] = data.map((item: any) => ({
        id: item.place_id.toString(),
        name: item.address?.city || item.address?.town || item.address?.village || item.name || 'Unknown',
        country: item.address?.country || 'Unknown',
        region: item.address?.state || item.address?.region,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      }));
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to mock data if API fails
      const mockResults: SearchResult[] = [
        { id: '1', name: 'New York', country: 'United States', region: 'New York', latitude: 40.7128, longitude: -74.0060 },
        { id: '2', name: 'London', country: 'United Kingdom', region: 'England', latitude: 51.5074, longitude: -0.1278 },
        { id: '3', name: 'Tokyo', country: 'Japan', region: 'Kanto', latitude: 35.6762, longitude: 139.6503 },
        { id: '4', name: 'Paris', country: 'France', region: 'Île-de-France', latitude: 48.8566, longitude: 2.3522 },
        { id: '5', name: 'Sydney', country: 'Australia', region: 'New South Wales', latitude: -33.8688, longitude: 151.2093 },
        { id: '6', name: 'Prizren', country: 'Kosovo', latitude: 42.2139, longitude: 20.7397 },
      ].filter(result => 
        result.name.toLowerCase().includes(query.toLowerCase()) ||
        result.country.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(mockResults);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    // Debounce the search
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  const handleSelectLocation = (result: SearchResult) => {
    console.log('Selected location:', result);
    // Update the location in the app
    onLocationSelect(result.latitude, result.longitude);
    // Navigate to home page to show the weather
    navigate('/');
  };

  return (
    <>
      <main className="relative z-10 px-3 sm:px-4 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 pb-20 sm:pb-24 md:pb-8 min-h-screen">
        <div className="max-w-3xl mx-auto md:ml-32 lg:ml-48">
          <div className="pt-4 sm:pt-6 md:pt-8 space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                Search Locations
              </h1>
              <p className="text-sm sm:text-base text-white/70">
                Find weather information for any city worldwide
              </p>
            </div>

            {/* Search Input */}
            <GlassCard>
              <div className="relative">
                <SearchIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl sm:text-2xl" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Search for a city..."
                  className="w-full bg-transparent text-white placeholder-white/50 pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-base sm:text-lg outline-none"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
            </GlassCard>

            {/* Search Results */}
            {isSearching && (
              <GlassCard>
                <div className="text-center text-white/70 py-8">
                  Searching...
                </div>
              </GlassCard>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                {searchResults.map((result) => (
                  <GlassCard
                    key={result.id}
                    hover
                    onClick={() => handleSelectLocation(result)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 cursor-pointer active:scale-98 transition-transform">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <LocationOnIcon className="text-white/80 text-xl sm:text-2xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-base sm:text-lg truncate">
                          {result.name}
                        </h3>
                        <p className="text-white/60 text-xs sm:text-sm truncate">
                          {result.region ? `${result.region}, ` : ''}{result.country}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
              <GlassCard>
                <div className="text-center text-white/70 py-6 sm:py-8 text-sm sm:text-base">
                  No locations found for "{searchQuery}"
                </div>
              </GlassCard>
            )}

            {searchQuery.length === 0 && (
              <GlassCard>
                <div className="text-center text-white/70 py-12">
                  <SearchIcon className="mx-auto text-white/40 mb-4" style={{ fontSize: 48 }} />
                  <p>Start typing to search for locations</p>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};
