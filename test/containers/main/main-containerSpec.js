import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageMain from '../../../src/containers/main/main-container';

configure({ adapter: new Adapter() });

describe('CONTAINER > Main', () => {
  describe('render states', () => {
    it('renders without error', () => {
      const component = mount(<PageMain />);

      expect(component.html()).not.toBeNull();
    });
  });
});
