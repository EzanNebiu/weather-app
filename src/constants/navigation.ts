import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavigationItem } from '../types/navigation';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    path: '/',
  },
  {
    id: 'search',
    label: 'Search',
    icon: SearchIcon,
    path: '/search',
  },
  {
    id: 'locations',
    label: 'Locations',
    icon: LocationOnIcon,
    path: '/locations',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon,
    path: '/settings',
  },
];
