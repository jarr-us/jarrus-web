import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../../src/components/site-layout/Header';
import { APP_TITLE } from '../../../src/constants';

configure({ adapter: new Adapter() });

describe('COMPONENT > Site Layout > Header', () => {
  describe('render states', () => {
    let component;
    beforeEach(() => {
      component = mount(<Header />);
    });

    it('renders without error', () => {
      expect(component.html()).not.toBeNull();
    });

    it('has the app title in the header', () => {
      expect(component.html().indexOf(APP_TITLE)).toBeGreaterThan(-1);
    });

    it('has a material icon', () => {
      expect(component.find('.material-icons').length).toBe(1);
    });
  });
});
