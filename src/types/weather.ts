export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezoneOffset?: number; // Offset in minutes from UTC
}

export interface HourlyForecast {
  hour: string;
  temperature: number;
  condition: string;
  icon?: string;
}

export interface DailyForecast {
  day: string;
  date: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  icon?: string;
}

export interface CurrentWeather {
  temperature: number;
  condition: string;
  icon?: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}
