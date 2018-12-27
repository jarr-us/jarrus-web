import React from 'react';
import { mount, configure } from 'enzyme';
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import createHistory from 'history/createBrowserHistory';
import { SideMenu } from '../../../src/components/site-layout/SideMenu';

configure({ adapter: new Adapter() });
const history = createHistory();

describe('COMPONENT: Site Layout > Side Menu', () => {
  describe('render states', () => {
    it('renders without error', () => {
      const component = mount(<Router history={history}><SideMenu /></Router>);

      expect(component.html()).not.toBeNull();
    });

    it('uses react-router Links', () => {
      const component = mount(<Router history={history}><SideMenu /></Router>);

      expect(component.find('Link').length).toBeGreaterThan(0);
    });
  });
});
