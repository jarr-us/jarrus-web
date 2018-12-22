import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SideMenu } from '../../../src/components/site-layout/SideMenu';

configure({ adapter: new Adapter() });

describe('COMPONENT: Site Layout > Side Menu', () => {
  describe('render states', () => {
    it('renders without error', () => {
      const component = mount(<SideMenu />);

      expect(component.html()).not.toBeNull();
    });

    it('does not say hello world', () => {
      const component = mount(<SideMenu />);

      expect(component.text()).not.toEqual('Hello World!');
    });
  });
});
