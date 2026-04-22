import { GlassCard } from '../common/GlassCard';

interface ErrorScreenProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 via-blue-200 to-cyan-100 px-4">
      <GlassCard className="max-w-md w-full text-center">
        <div className="space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
              <div className="text-6xl">⚠️</div>
            </div>
          </div>

          {/* Error Message */}
          <div>
            <h2 className="text-2xl font-light text-white mb-3">
              Oops! Something went wrong
            </h2>
            <p className="text-white/80 text-sm bg-white/10 rounded-lg p-3">
              {error}
            </p>
          </div>

          {/* Retry Button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="
                flex items-center justify-center gap-2 
                w-full py-3 px-6 
                bg-white/20 hover:bg-white/30 
                backdrop-blur-md 
                rounded-xl 
                text-white font-medium
                transition-all duration-200
                border border-white/20
                hover:scale-105
              "
            >
              <span className="text-xl">🔄</span>
              Try Again
            </button>
          )}

          {/* Help Text */}
          <p className="text-white/60 text-xs">
            Make sure you've allowed location access and have an active internet connection
          </p>
        </div>
      </GlassCard>
    </div>
  );
};
