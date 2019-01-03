import React from 'react';
import ReactInputRange from 'react-input-range';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultFilter, {
  RANGE_PROPS,
  CHOOSE_PROPS,
} from '../../../src/components/run-result/result-filter';
import runResultsFixture from '../../../src/fixtures/run-results';

configure({ adapter: new Adapter() });

describe('COMPONENT > Run-Result > result-filter', () => {
  describe('render states', () => {
    describe('default state, no props', () => {
      let component;
      beforeEach(() => {
        component = mount(<ResultFilter />);
      });

      it('renders nothing', () => {
        expect(component.html()).toBeNull();
      });
    });

    describe('default state, valid data prop', () => {
      let component;
      let data;
      beforeEach(() => {
        data = runResultsFixture;
        component = mount(<ResultFilter data={data} />);
      });

      describe('lifecycle events', () => {
        let onFilterData;
        beforeEach(() => {
          onFilterData = jasmine.createSpy();
          component = mount(<ResultFilter
            data={data}
            onFilterData={onFilterData}
          />);
        });

        describe('onComponentDidMount', () => {
          it('transmits filtered data to parent', () => {
            expect(onFilterData).toHaveBeenCalledTimes(1);
          });
        });

        describe('onComponentDidUpdate', () => {
          it('transmits filtered data when props change', () => {
            expect(onFilterData).toHaveBeenCalledTimes(1);
            component.setProps({ data: [], onFilterData });

            expect(onFilterData).toHaveBeenCalledTimes(2);
          });

          it('skips transmit if .data is unchanged', () => {
            expect(onFilterData).toHaveBeenCalledTimes(1);
            component.setProps({ data, onFilterData });

            expect(onFilterData).toHaveBeenCalledTimes(1);
          });
        });
      });

      describe('choose checkboxes', () => {
        it('shows 1 checkbox grp for each prop key in CHOOSE_PROPS', () => {
          expect(component.find('FormGroup').length).toBe(CHOOSE_PROPS.length);
        });

        it('calls props onFilterData when changed', () => {
          const onFilterData = jasmine.createSpy();
          component = mount(<ResultFilter
            data={data}
            onFilterData={onFilterData}
          />);
          const box = component.find('Checkbox').first();
          box.props().onClick({ persist: () => {}, target: { checked: false } });
          component.update();

          expect(onFilterData).toHaveBeenCalledTimes(2);
        });
      });

      describe('range sliders', () => {
        it('shows 1 for each prop key in RANGE_PROPS', () => {
          expect(component.find(ReactInputRange).length).toBe(Object.keys(RANGE_PROPS).length);

          Object.keys(RANGE_PROPS).forEach((rp) => {
            expect(component.find(`[name="${rp}"]`).length).toBe(1);
          });
        });

        it('calls props onFilterData when changed', () => {
          const onFilterData = jasmine.createSpy();
          component = mount(<ResultFilter
            data={data}
            onFilterData={onFilterData}
          />);
          const slider = component.find(ReactInputRange).first();
          slider.props().onChange({ min: 3, max: 5 });
          component.update();

          expect(onFilterData).toHaveBeenCalledTimes(2);
        });
      });
    });
  });
});
