import React from 'react';
import Chance from 'chance';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SessionListingFilter, {
  SESSION_DD_CLASSNAME,
  SOLUTION_DD_CLASSNAME,
} from '../../src/components/session-listing-filter';

const SESSION_DD_SELECTOR = `select.${SESSION_DD_CLASSNAME}`;
const SOLUTION_DD_SELECTOR = `select.${SOLUTION_DD_CLASSNAME}`;

configure({ adapter: new Adapter() });

describe('COMPONENT> Session Listing Filter', () => {
  let chance;
  let key1;
  let key2;
  let VALID_SESSIONS_PROP;
  beforeEach(() => {
    chance = new Chance();
    key1 = chance.string();
    key2 = chance.string();
    VALID_SESSIONS_PROP = {
      [key1]: [chance.string(), chance.string()],
      [key2]: [chance.string(), chance.string(), chance.string()],
    };
  });

  describe('render states', () => {
    let component;
    describe('default state, no props', () => {
      beforeEach(() => {
        component = mount(<SessionListingFilter />);
      });

      it('starts with default state', () => {
        expect(component.state()).toEqual({
          selectedSolution: undefined,
          selectedSession: undefined,
          sessionOptions: [],
        });
      });

      it('render null without sessions prop', () => {
        expect(component.html()).toBeNull();
      });
    });

    describe('default state, update sessions prop', () => {
      beforeEach(() => {
        component = mount(<SessionListingFilter />);
        component.setProps({ sessions: VALID_SESSIONS_PROP });
      });

      it('handles updates to sessions prop', () => {
        expect(component.html()).not.toBeNull();
      });
    });

    describe('default state with sessions prop', () => {
      beforeEach(() => {
        component = mount(<SessionListingFilter sessions={VALID_SESSIONS_PROP} />);
      });

      it('has a dropdown for solutions and sessions', () => {
        expect(component.find(SOLUTION_DD_SELECTOR).children('option').length).toBe(Object.keys(VALID_SESSIONS_PROP).length);
        expect(component.find(SESSION_DD_SELECTOR).children('option').length).toBe(
          VALID_SESSIONS_PROP[Object.keys(VALID_SESSIONS_PROP)[0]].length,
        );
      });

      it('limits session options to selected solution', () => {
        const solutionDD = component.find(SOLUTION_DD_SELECTOR);
        const sessionDD = component.find(SESSION_DD_SELECTOR);

        expect(
          sessionDD
            .children('option')
            .map(node => node.text()),
        ).toEqual(
          VALID_SESSIONS_PROP[key1],
        );

        solutionDD.props().onChange({ target: { value: key2 } });
        component.update();

        expect(component.state().selectedSolution).toBe(key2);
        expect(component.state().sessionOptions).toEqual(VALID_SESSIONS_PROP[key2]);
        expect(
          component
            .find(SESSION_DD_SELECTOR)
            .children('option')
            .map(node => node.text()),
        ).toEqual(
          VALID_SESSIONS_PROP[key2],
        );
      });
    });
  });

  describe('calls prop passed fns', () => {
    it('calls props.onSessionsReceived with initial values', () => {
      const initSpy = jasmine.createSpy();
      mount(<SessionListingFilter onSessionsReceived={initSpy} sessions={VALID_SESSIONS_PROP} />);

      expect(initSpy).toHaveBeenCalledWith({
        selectedSolution: key1,
        selectedSession: VALID_SESSIONS_PROP[key1][0],
      });
    });

    it('calls props.onSessionsReceived with changed values', () => {
      const initSpy = jasmine.createSpy();
      const component = mount(<SessionListingFilter onSessionsReceived={initSpy} />);

      component.setProps({ sessions: VALID_SESSIONS_PROP });

      expect(initSpy).toHaveBeenCalledWith({
        selectedSolution: key1,
        selectedSession: VALID_SESSIONS_PROP[key1][0],
      });
    });

    it('calls props.onChange when solution changed', () => {
      const changeSpy = jasmine.createSpy();
      const component = mount(<SessionListingFilter
        onChange={changeSpy}
        sessions={VALID_SESSIONS_PROP}
      />);

      component.find(SOLUTION_DD_SELECTOR)
        .props()
        .onChange({ target: { value: key2 } });

      expect(changeSpy).toHaveBeenCalledWith({
        selectedSolution: key2,
        selectedSession: jasmine.any(String),
      });
    });

    it('calls props.onChange when session changed', () => {
      const changeSpy = jasmine.createSpy();
      const component = mount(<SessionListingFilter
        onChange={changeSpy}
        sessions={VALID_SESSIONS_PROP}
      />);

      component.find(SESSION_DD_SELECTOR)
        .props()
        .onChange({ target: { value: key2 } });

      expect(changeSpy).toHaveBeenCalledWith({
        selectedSession: key2,
        selectedSolution: jasmine.any(String),
      });
    });
  });
});
