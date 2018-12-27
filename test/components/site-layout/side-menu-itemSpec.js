import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideMenuItem from '../../../src/components/site-layout/side-menu-item';

configure({ adapter: new Adapter() });

describe('COMPONENTS > Site-Layout > SideMenuItem', () => {
  describe('render states', () => {
    it('renders without props', () => {
      const component = mount(<SideMenuItem />);

      expect(component.html()).not.toBeNull();
    });

    it('defaults to link icon and MenuItem primary text', () => {
      const component = mount(<SideMenuItem />);

      expect(component.props().icon).toBe('link');
      expect(component.props().primaryText).toBe('MenuItem');
    });

    it('renders an icon with icon text', () => {
      const component = mount(<SideMenuItem icon="AAA" />);

      expect(component.find('.material-icons').first().text()).toBe('AAA');
    });
  });
});
