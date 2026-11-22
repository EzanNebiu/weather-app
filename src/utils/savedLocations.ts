export interface SavedLocation {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  isFavorite: boolean;
}

const STORAGE_KEY = 'weatherapp_saved_locations';

const DEFAULT_LOCATIONS: SavedLocation[] = [
  { id: 'new-york', name: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006, isFavorite: true },
  { id: 'london', name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, isFavorite: false },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, isFavorite: false },
];

export const loadSavedLocations = (): SavedLocation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_LOCATIONS;
  } catch {
    return DEFAULT_LOCATIONS;
  }
};

export const saveSavedLocations = (locations: SavedLocation[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  } catch {
    // ignore - storage unavailable
  }
};

/** Add a location (e.g. picked from search) to the saved list, unless it is already there. */
export const addSavedLocation = (location: Omit<SavedLocation, 'isFavorite'>): void => {
  const locations = loadSavedLocations();
  const exists = locations.some(
    loc => loc.id === location.id ||
      (Math.abs(loc.latitude - location.latitude) < 0.01 && Math.abs(loc.longitude - location.longitude) < 0.01)
  );
  if (!exists) {
    saveSavedLocations([...locations, { ...location, isFavorite: false }]);
  }
};
