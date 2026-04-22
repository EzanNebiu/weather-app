import { useNavigate, useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { GlassCard } from '../common/GlassCard';
import { SvgIconComponent } from '@mui/icons-material';

export const DesktopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveId = () => {
    const item = NAVIGATION_ITEMS.find(item => item.path === location.pathname);
    return item?.id || 'home';
  };

  const activeId = getActiveId();

  return (
    <div className="hidden md:block fixed top-6 left-6 z-50">
      <GlassCard padding="sm">
        <nav className="flex md:flex-col gap-2">
          {NAVIGATION_ITEMS.map((item) => {
            const IconComponent = item.icon as SvgIconComponent;
            const isActive = item.id === activeId;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white/80'
                  }
                `}
              >
                <IconComponent fontSize="small" />
                <span className="hidden lg:inline text-sm font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </GlassCard>
    </div>
  );
};
