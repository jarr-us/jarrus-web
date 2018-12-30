import React from 'react';
import Chance from 'chance';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageSession, { PAGE_DIV_CLASSNAME } from '../../../src/containers/session/session-container';
import * as sessionService from '../../../src/containers/session/session-service';
import sessionResultsFixtures from '../../../src/fixtures/run-results';
import ErrorBox from '../../../src/components/error-box';

configure({ adapter: new Adapter() });

describe('CONTAINER > Session', () => {
  let chance;
  beforeEach(() => {
    chance = new Chance();
  });

  describe('service calls', () => {
    describe('service.fetchSessionResults', () => {
      it('is called when handleSessionFilter()', () => {
        spyOn(sessionService, 'fetchSessionResults').and.returnValue(Promise.resolve([]));
        const component = mount(<PageSession />);

        expect(sessionService.fetchSessionResults).toHaveBeenCalledTimes(0);
        component.instance().handleSessionFilter({});

        expect(sessionService.fetchSessionResults).toHaveBeenCalledTimes(1);
      });

      it('sets state.results on success', (done) => {
        const serviceResponse = sessionResultsFixtures;
        spyOn(sessionService, 'fetchSessionResults').and.returnValue(Promise.resolve(serviceResponse));
        const component = mount(<PageSession />);
        component.instance().handleSessionFilter({});

        setTimeout(() => {
          expect(component.state().results).toEqual(serviceResponse);
          done();
        }, 0);
      });

      it('sets state.errMessage on failure', (done) => {
        const serviceErrorMsg = chance.string();
        spyOn(sessionService, 'fetchSessionResults').and.returnValue(Promise.reject(new Error(serviceErrorMsg)));
        const component = mount(<PageSession />);
        component.instance().handleSessionFilter({});

        setTimeout(() => {
          expect(component.state().errMessage).toEqual(serviceErrorMsg);
          done();
        }, 0);
      });
    });

    describe('service.fetchSessionListings()', () => {
      it('is called automatically on mount', () => {
        spyOn(sessionService, 'default').and.returnValue(Promise.resolve({}));
        mount(<PageSession />);

        expect(sessionService.default).toHaveBeenCalledTimes(1);
      });

      it('sets sessions state with success result', (done) => {
        const serviceResponse = {};
        spyOn(sessionService, 'default').and.returnValue(Promise.resolve(serviceResponse));
        const component = shallow(<PageSession />);

        setTimeout(() => {
          expect(component.state().sessions).toEqual(serviceResponse);
          done();
        }, 0);
      });

      it('sets errMessage state with caught error', (done) => {
        const serviceResponseErrMsg = chance.string();
        spyOn(sessionService, 'default').and.returnValue(Promise.reject(new Error(serviceResponseErrMsg)));
        const component = mount(<PageSession />);

        setTimeout(() => {
          expect(component.state().errMessage).toBe(serviceResponseErrMsg);
          done();
        }, 0);
      });
    });
  });

  describe('render states', () => {
    it('renders with default state', () => {
      const component = mount(<PageSession />);

      expect(component.state()).toEqual({
        sessions: {},
        results: undefined,
        errMessage: undefined,
      });
    });

    describe('default state', () => {
      let component;
      beforeEach(() => {
        component = mount(<PageSession />);
      });

      it('renders without props', () => {
        expect(component.html()).not.toBeNull();
      });

      it('renders the page within constant classname', () => {
        expect(component.find(`.${PAGE_DIV_CLASSNAME}`).length).toBe(1);
      });

      it('renders a SessionListingFilter', () => {
        expect(component.find('SessionListingFilter').length).toBe(1);
      });

      it('does not show a runresulttable', () => {
        expect(component.find('RunResultTable').length).toBe(0);
      });

      it('does not show an ErrorBox', () => {
        expect(component.find('ErrorBox').length).toBe(0);
      });
    });

    describe('state.results is populated', () => {
      let component;
      beforeEach(() => {
        component = mount(<PageSession />);
        component.setState({ results: [] });
      });

      it('draws a runResultTable', () => {
        expect(component.find('RunResultTable').length).toBe(1);
      });

      it('does not draw table when errMessage', () => {
        component.setState({ errMessage: chance.string() });

        expect(component.find('RunResultTable').length).toBe(0);
      });
    });

    describe('state.errMessage is populated', () => {
      let component;
      beforeEach(() => {
        component = mount(<PageSession />);
        component.setState({ errMessage: chance.string() });
      });

      it('draws an ErrorBox', () => {
        expect(component.find(ErrorBox).length).toBe(1);
      });
    });
  });
});
