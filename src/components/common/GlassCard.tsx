import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: 'light' | 'medium' | 'strong';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ 
  children, 
  className = '', 
  blur = 'medium',
  padding = 'md',
  hover = false,
  onClick,
}: GlassCardProps) => {
  const blurClasses = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    strong: 'backdrop-blur-lg',
  };

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
  };

  const hoverClass = hover 
    ? 'transition-all duration-200 hover:bg-white/15 hover:shadow-xl hover:scale-[1.02] cursor-pointer' 
    : '';

  return (
    <div
      onClick={onClick}
      className={`
        bg-white/10 
        ${blurClasses[blur]}
        ${paddingClasses[padding]}
        rounded-2xl 
        shadow-lg 
        border border-white/20
        ${hoverClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
