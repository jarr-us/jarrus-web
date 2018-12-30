import Chance from 'chance';
import * as sessionService from '../../../src/containers/session/session-service';
import fixtureData from '../../../src/fixtures/run-session';
import {
  ERROR_BAD_SHAPE_ARRAY_MEMBER,
  ERROR_INVALID_PARAM,
  ERROR_MUST_BE_ARRAY_PARAM,
} from '../../../src/constants';

describe('CONTAINERS > Session > Session Service', () => {
  let chance;
  beforeEach(() => {
    chance = new Chance();
  });

  describe('default service', () => {
    it('returns a promise', () => {
      expect(sessionService.default().then).toBeDefined();
    });

    it('fetches and groups', (done) => {
      spyOn(sessionService, 'fetchSessionListings').and.returnValue(Promise.resolve([]));
      spyOn(sessionService, 'groupSessionsOnSolutions').and.returnValue(Promise.resolve({}));

      sessionService.default()
        .then(() => {
          expect(sessionService.fetchSessionListings).toHaveBeenCalledTimes(1);
          expect(sessionService.groupSessionsOnSolutions).toHaveBeenCalledTimes(1);
          done();
        })
        .catch(() => {
          fail('should have resolved');
          done();
        });
    });
  });

  describe('groupSessionsOnSolutions', () => {
    let validArrayObject;
    beforeEach(() => {
      validArrayObject = { SolutionType: chance.string(), Session: chance.string() };
    });
    const acceptableParam = [];
    it('returns a promise', () => {
      expect(sessionService.groupSessionsOnSolutions(acceptableParam).then).toBeDefined();
    });

    it('rejects when nonArray param passed', (done) => {
      sessionService.groupSessionsOnSolutions()
        .then(() => {
          fail('should not resolve');
          done();
        })
        .catch((e) => {
          expect(e.message).toBe(ERROR_MUST_BE_ARRAY_PARAM);
          done();
        });
    });

    it('rejects when undefined array member passed', (done) => {
      const invalidArrayObject = undefined;
      sessionService.groupSessionsOnSolutions([validArrayObject, invalidArrayObject])
        .then(() => {
          fail('should not resolve');
          done();
        })
        .catch((e) => {
          expect(e.message).toBe(ERROR_BAD_SHAPE_ARRAY_MEMBER);
          done();
        });
    });

    it('rejects when no solution on array member passed', (done) => {
      const invalidArrayObject = { Session: chance.string() };
      sessionService.groupSessionsOnSolutions([validArrayObject, invalidArrayObject])
        .then(() => {
          fail('should not resolve');
          done();
        })
        .catch((e) => {
          expect(e.message).toBe(ERROR_BAD_SHAPE_ARRAY_MEMBER);
          done();
        });
    });

    it('rejects when no session on array member passed', (done) => {
      const invalidArrayObject = { SolutionType: chance.string() };
      sessionService.groupSessionsOnSolutions([validArrayObject, invalidArrayObject])
        .then(() => {
          fail('should not resolve');
          done();
        })
        .catch((e) => {
          expect(e.message).toBe(ERROR_BAD_SHAPE_ARRAY_MEMBER);
          done();
        });
    });

    it('returns an object with key:array pairing solution/sessions', (done) => {
      sessionService.groupSessionsOnSolutions(fixtureData)
        .then((result) => {
          expect(Object.keys(result).length).toBe(3);
          expect(result.TimeDrivingFitnessCalculator.length).toBe(2);
          expect(result.MLBStadiumTour.length).toBe(3);
          expect(result.TravellingSalesman.length).toBe(1);
          done();
        })
        .catch((e) => {
          fail(`should have resolved, bad fixture? Message: ${e.message}`);
          done();
        });
    });
  });

  describe('fetchSessionResults service', () => {
    beforeEach(() => {
      spyOn(sessionService, 'retrieveSessionResultsFromDatabase').and.returnValue(Promise.resolve([]));
    });

    it('returns a promise', () => {
      expect(sessionService.fetchSessionResults().then).toBeDefined();
    });

    it('rejects without string 1st param', (done) => {
      sessionService.fetchSessionResults(undefined, chance.string())
        .then(() => {
          fail('should not have resolved');
          done();
        })
        .catch((e) => {
          expect(e.message).toBe(ERROR_INVALID_PARAM);
          done();
        });
    });

    it('rejects without string 2nd param', (done) => {
      sessionService.fetchSessionResults(chance.string(), undefined)
        .then(() => {
          fail('should not have resolved');
          done();
        })
        .catch((e) => {
          expect(e.message).toBe(ERROR_INVALID_PARAM);
          done();
        });
    });

    it('resolves with an array', (done) => {
      sessionService.fetchSessionResults(chance.string(), chance.string())
        .then((ret) => {
          expect(Array.isArray(ret)).toBeTruthy();
          done();
        })
        .catch(() => {
          fail('should have resolved');
          done();
        });
    });
  });

  describe('fetchSessionListings service', () => {
    it('returns a promise', () => {
      expect(sessionService.fetchSessionListings().then).toBeDefined();
    });

    it('resolves to fixture', (done) => {
      sessionService.fetchSessionListings()
        .then((sessions) => {
          expect(sessions).toEqual(fixtureData);
          done();
        })
        .catch(() => {
          fail('should resolve promise');
          done();
        });
    });
  });
});
