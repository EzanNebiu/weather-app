import { GlassCard } from '../common/GlassCard';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 via-blue-200 to-cyan-100 px-4">
      <GlassCard className="max-w-md w-full text-center">
        <div className="space-y-6">
          {/* Spinning Earth Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 animate-spin shadow-2xl shadow-blue-500/30" 
                 style={{ animationDuration: '3s' }}>
              <div className="w-full h-full rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* Loading Text */}
          <div>
            <h2 className="text-2xl font-light text-white mb-2">
              Loading Weather Data
            </h2>
            <p className="text-white/70 text-sm">
              Fetching your current location and weather...
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
