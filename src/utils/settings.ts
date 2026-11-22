export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kmh' | 'mph' | 'ms';
export type PressureUnit = 'hpa' | 'inhg' | 'mb';
export type DistanceUnit = 'km' | 'mi';

export interface Settings {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  pressureUnit: PressureUnit;
  distanceUnit: DistanceUnit;
  use24HourFormat: boolean;
  notifications: boolean;
}

const STORAGE_KEY = 'weatherapp_settings';

export const DEFAULT_SETTINGS: Settings = {
  temperatureUnit: 'celsius',
  windSpeedUnit: 'kmh',
  pressureUnit: 'hpa',
  distanceUnit: 'km',
  use24HourFormat: true,
  notifications: true,
};

export const loadSettings = (): Settings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage unavailable (private mode etc.) - settings just won't persist
  }
};
