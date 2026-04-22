import { WeatherData } from '../types/weather';

export const mockWeatherData: WeatherData = {
  location: {
    name: 'San Francisco',
    country: 'United States',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  current: {
    temperature: 18,
    condition: 'Partly Cloudy',
    timeOfDay: 'afternoon',
  },
  hourly: [
    {
      hour: '14:00',
      temperature: 18,
      condition: 'Partly Cloudy',
    },
    {
      hour: '15:00',
      temperature: 19,
      condition: 'Sunny',
    },
    {
      hour: '16:00',
      temperature: 20,
      condition: 'Sunny',
    },
    {
      hour: '17:00',
      temperature: 19,
      condition: 'Partly Cloudy',
    },
    {
      hour: '18:00',
      temperature: 17,
      condition: 'Cloudy',
    },
  ],
  daily: [
    {
      day: 'Today',
      date: 'Mon, 21 Apr',
      highTemp: 22,
      lowTemp: 14,
      condition: 'Partly Cloudy',
    },
    {
      day: 'Tuesday',
      date: 'Tue, 22 Apr',
      highTemp: 24,
      lowTemp: 15,
      condition: 'Sunny',
    },
    {
      day: 'Wednesday',
      date: 'Wed, 23 Apr',
      highTemp: 23,
      lowTemp: 16,
      condition: 'Sunny',
    },
    {
      day: 'Thursday',
      date: 'Thu, 24 Apr',
      highTemp: 21,
      lowTemp: 14,
      condition: 'Cloudy',
    },
    {
      day: 'Friday',
      date: 'Fri, 25 Apr',
      highTemp: 19,
      lowTemp: 13,
      condition: 'Rainy',
    },
    {
      day: 'Saturday',
      date: 'Sat, 26 Apr',
      highTemp: 20,
      lowTemp: 14,
      condition: 'Partly Cloudy',
    },
    {
      day: 'Sunday',
      date: 'Sun, 27 Apr',
      highTemp: 22,
      lowTemp: 15,
      condition: 'Sunny',
    },
  ],
};
