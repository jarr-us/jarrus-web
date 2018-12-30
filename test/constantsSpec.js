import blueGray from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';
import {
  APP_ICON_SRC,
  APP_TITLE,
  ERROR_BAD_SHAPE_ARRAY_MEMBER,
  ERROR_INVALID_PARAM,
  ERROR_MUST_BE_ARRAY_PARAM,
  MUI_THEME_SETTINGS,
} from '../src/constants';

describe('APP Constants', () => {
  it('has frozen values', () => {
    expect(APP_ICON_SRC).toEqual('./images/favicon.png');
    expect(APP_TITLE).toEqual('JARRUS');
    expect(ERROR_BAD_SHAPE_ARRAY_MEMBER).toEqual('Invalid shape of Parameter Array member');
    expect(ERROR_INVALID_PARAM).toEqual('Invalid Parameters Provided');
    expect(ERROR_MUST_BE_ARRAY_PARAM).toEqual('Parameter must be an array');
    expect(MUI_THEME_SETTINGS).toEqual({
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
    });
  });
});
