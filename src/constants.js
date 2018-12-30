import blueGray from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';

export const APP_TITLE = 'JARRUS';
export const APP_ICON_SRC = './images/favicon.png';
export const ERROR_MUST_BE_ARRAY_PARAM = 'Parameter must be an array';
export const ERROR_BAD_SHAPE_ARRAY_MEMBER = 'Invalid shape of Parameter Array member';
export const ERROR_INVALID_PARAM = 'Invalid Parameters Provided';
export const MUI_THEME_SETTINGS = {
  palette: {
    primary: blueGray,
    secondary: cyan,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontSize: 24,
    useNextVariants: true,
  },
};
