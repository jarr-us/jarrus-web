import blueGray from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';

export const APP_TITLE = 'JARRUS';
export const APP_ICON_SRC = './images/favicon.png';
export const MUI_THEME_SETTINGS = {
  palette: {
    primary: blueGray,
    secondary: cyan,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
  },
};
