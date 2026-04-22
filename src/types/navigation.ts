import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface NavigationItem {
  id: string;
  label: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & { muiName: string };
  path: string;
}
