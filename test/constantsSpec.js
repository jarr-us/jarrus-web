import { APP_ICON_SRC, APP_TITLE } from '../src/constants';

describe('APP Constants', () => {
  it('has frozen values', () => {
    expect(APP_ICON_SRC).toEqual('./images/favicon.png');
    expect(APP_TITLE).toEqual('JARRUS');
  });
});
