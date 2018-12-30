import React from 'react';
import Chance from 'chance';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RunResultTable from '../../../src/components/run-result/run-result-table';

configure({ adapter: new Adapter() });

describe('COMPONENT > Run Result> RunResultTable', () => {
  let chance;
  let VALID_RESULTS;
  describe('rendering', () => {
    beforeEach(() => {
      chance = new Chance();
      VALID_RESULTS = [{ [chance.string()]: chance.string() }];
    });

    it('doesnt render without props', () => {
      const component = mount(<RunResultTable />);

      expect(component.html()).toBeNull();
    });

    it('renders a reacttable if props.results[0] exists', () => {
      const component = mount(<RunResultTable results={VALID_RESULTS} />);

      expect(component.find('ReactTable').length).toBe(1);
    });
  });
});
