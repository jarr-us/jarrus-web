import runSessions from '../../fixtures/run-session';
import runResults from '../../fixtures/run-results';
import {
  ERROR_BAD_SHAPE_ARRAY_MEMBER,
  ERROR_INVALID_PARAM,
  ERROR_MUST_BE_ARRAY_PARAM,
} from '../../constants';

export const fetchSessionListings = () => Promise.resolve(runSessions);

const groupSessionsReducer = (acc, obj) => {
  const key = obj.SolutionType;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(obj.Session);
  return acc;
};

export const groupSessionsOnSolutions = (arrayParam) => {
  if (!Array.isArray(arrayParam)) return Promise.reject(new Error(ERROR_MUST_BE_ARRAY_PARAM));
  const invalidArrayMembers = arrayParam.filter(s => !s || !s.SolutionType || !s.Session);
  if (invalidArrayMembers.length > 0) {
    return Promise.reject(new Error(ERROR_BAD_SHAPE_ARRAY_MEMBER));
  }

  const reducedArray = arrayParam.reduce(groupSessionsReducer, {});

  return Promise.resolve(reducedArray);
};

const fetchAndGroupSolutions = arrayParam => exports.fetchSessionListings(arrayParam)
  .then(raw => exports.groupSessionsOnSolutions(raw));

export const fetchSessionResults = (solutionid, sessionid) => {
  if (typeof solutionid !== 'string' || typeof sessionid !== 'string') {
    return Promise.reject(new Error(ERROR_INVALID_PARAM));
  }

  return exports.retrieveSessionResultsFromDatabase(solutionid, sessionid);
};

export const retrieveSessionResultsFromDatabase = (solutionid, sessionid) => Promise.resolve(
  runResults.filter(
    rr => rr.SolutionType === solutionid
    && rr.Session === sessionid,
  ),
);

export default fetchAndGroupSolutions;
