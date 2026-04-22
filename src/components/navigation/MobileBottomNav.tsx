import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { SvgIconComponent } from '@mui/icons-material';

export const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentValue = () => {
    const index = NAVIGATION_ITEMS.findIndex(item => item.path === location.pathname);
    return index >= 0 ? index : 0;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
      <div className="backdrop-blur-xl bg-white/10 border-t border-white/20">
        <BottomNavigation
          value={getCurrentValue()}
          onChange={(_event, newValue) => {
            navigate(NAVIGATION_ITEMS[newValue].path);
          }}
          sx={{
            backgroundColor: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              color: 'rgba(255, 255, 255, 0.6)',
              minWidth: 'auto',
              '&.Mui-selected': {
                color: 'rgba(255, 255, 255, 1)',
              },
            },
          }}
        >
          {NAVIGATION_ITEMS.map((item) => {
            const IconComponent = item.icon as SvgIconComponent;
            return (
              <BottomNavigationAction
                key={item.id}
                label={item.label}
                icon={<IconComponent />}
              />
            );
          })}
        </BottomNavigation>
      </div>
    </div>
  );
};
