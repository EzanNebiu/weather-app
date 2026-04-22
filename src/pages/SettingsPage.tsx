import { useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { Footer } from '../components/layout/Footer';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SpeedIcon from '@mui/icons-material/Speed';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';

type TemperatureUnit = 'celsius' | 'fahrenheit';
type WindSpeedUnit = 'kmh' | 'mph' | 'ms';
type PressureUnit = 'hpa' | 'inhg' | 'mb';
type DistanceUnit = 'km' | 'mi';

interface Settings {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  pressureUnit: PressureUnit;
  distanceUnit: DistanceUnit;
  use24HourFormat: boolean;
  notifications: boolean;
}

export const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings>({
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    pressureUnit: 'hpa',
    distanceUnit: 'km',
    use24HourFormat: true,
    notifications: true,
  });

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <main className="relative z-10 px-4 md:px-8 lg:px-12 py-8 pb-24 md:pb-8 min-h-screen">
        <div className="max-w-3xl mx-auto md:ml-32 lg:ml-48">
          <div className="pt-8 md:pt-4 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Settings
              </h1>
              <p className="text-white/70">
                Customize your weather experience
              </p>
            </div>

            {/* Units Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Units</h2>

              {/* Temperature Unit */}
              <GlassCard>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ThermostatIcon className="text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Temperature</h3>
                      <p className="text-white/60 text-sm">Display unit</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateSetting('temperatureUnit', 'celsius')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        settings.temperatureUnit === 'celsius'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      °C
                    </button>
                    <button
                      onClick={() => updateSetting('temperatureUnit', 'fahrenheit')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        settings.temperatureUnit === 'fahrenheit'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      °F
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Wind Speed Unit */}
              <GlassCard>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <SpeedIcon className="text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Wind Speed</h3>
                      <p className="text-white/60 text-sm">Display unit</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateSetting('windSpeedUnit', 'kmh')}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                        settings.windSpeedUnit === 'kmh'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      km/h
                    </button>
                    <button
                      onClick={() => updateSetting('windSpeedUnit', 'mph')}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                        settings.windSpeedUnit === 'mph'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      mph
                    </button>
                    <button
                      onClick={() => updateSetting('windSpeedUnit', 'ms')}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                        settings.windSpeedUnit === 'ms'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      m/s
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Pressure Unit */}
              <GlassCard>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <WaterDropIcon className="text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Pressure</h3>
                      <p className="text-white/60 text-sm">Display unit</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateSetting('pressureUnit', 'hpa')}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                        settings.pressureUnit === 'hpa'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      hPa
                    </button>
                    <button
                      onClick={() => updateSetting('pressureUnit', 'inhg')}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                        settings.pressureUnit === 'inhg'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      inHg
                    </button>
                    <button
                      onClick={() => updateSetting('pressureUnit', 'mb')}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                        settings.pressureUnit === 'mb'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      mb
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Distance Unit */}
              <GlassCard>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <VisibilityIcon className="text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Distance</h3>
                      <p className="text-white/60 text-sm">Visibility unit</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateSetting('distanceUnit', 'km')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        settings.distanceUnit === 'km'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      km
                    </button>
                    <button
                      onClick={() => updateSetting('distanceUnit', 'mi')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        settings.distanceUnit === 'mi'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      mi
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Preferences Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Preferences</h2>

              {/* Time Format */}
              <GlassCard>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <DarkModeIcon className="text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Time Format</h3>
                      <p className="text-white/60 text-sm">12 or 24 hour</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting('use24HourFormat', !settings.use24HourFormat)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      settings.use24HourFormat
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-white/60'
                    }`}
                  >
                    {settings.use24HourFormat ? '24h' : '12h'}
                  </button>
                </div>
              </GlassCard>

              {/* Notifications */}
              <GlassCard>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <NotificationsIcon className="text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Notifications</h3>
                      <p className="text-white/60 text-sm">Weather alerts</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting('notifications', !settings.notifications)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      settings.notifications ? 'bg-blue-500' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        settings.notifications ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </GlassCard>
            </div>

            {/* Info */}
            <GlassCard>
              <div className="text-center text-white/60 text-sm py-4">
                <p>WeatherApp v2</p>
                <p className="mt-1">Premium HD 3D Earth Edition</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};
