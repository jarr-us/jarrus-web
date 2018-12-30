import React from 'react';
import Chance from 'chance';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorBox, { ERROR_BOX_CLASSNAME } from '../../src/components/error-box';

configure({ adapter: new Adapter() });

const ERROR_BOX_SELECTOR = `.${ERROR_BOX_CLASSNAME}`;

describe('COMPONENT > Error Box', () => {
  let chance;
  let text;
  describe('rendering', () => {
    beforeEach(() => {
      chance = new Chance();
      text = chance.string();
    });
    let component;
    beforeEach(() => {
      component = mount(<ErrorBox />);
    });

    it('renders without any props', () => {
      expect(component.html()).not.toBeNull();
    });

    it('renders div with constant classname', () => {
      expect(component.find(ERROR_BOX_SELECTOR).length).toBe(1);
    });

    it('renders prop text as text', () => {
      component.setProps({ text });

      expect(component.find(ERROR_BOX_SELECTOR).text()).toBe(text);
    });
  });
});
