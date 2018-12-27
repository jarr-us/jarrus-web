import blueGray from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';
import {
  APP_ICON_SRC,
  APP_TITLE,
  MUI_THEME_SETTINGS,
} from '../src/constants';

describe('APP Constants', () => {
  it('has frozen values', () => {
    expect(APP_ICON_SRC).toEqual('./images/favicon.png');
    expect(APP_TITLE).toEqual('JARRUS');
    expect(MUI_THEME_SETTINGS).toEqual({
      palette: {
        primary: blueGray,
        secondary: cyan,
        contrastThreshold: 3,
        tonalOffset: 0.2,
      },
      typography: {
        useNextVariants: true,
      },
    });
  });
});
