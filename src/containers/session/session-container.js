import React from 'react';
import fetchSessionService, { fetchSessionResults } from './session-service';
import SessionListingFilter from '../../components/session-listing-filter';
import RunResultTable from '../../components/run-result/run-result-table';
import ErrorBox from '../../components/error-box';

export const PAGE_DIV_CLASSNAME = 'session-container';
const wrapInPageDiv = jsx => (<div className={PAGE_DIV_CLASSNAME}>{jsx}</div>);

class PageSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errMessage: undefined,
      results: undefined,
      sessions: {},
    };

    this.handleSessionFilter = this.handleSessionFilter.bind(this);
    this.populateSessionResults = this.populateSessionResults.bind(this);
    this.populateSessionListings = this.populateSessionListings.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.populateSessionListings();
  }

  clearErrorAndResults() {
    this.setState({ results: undefined, errMessage: undefined });
  }

  handleError(e) {
    const { message } = e;
    this.setState({ errMessage: message });
  }

  handleSessionFilter(updates) {
    const { selectedSolution, selectedSession } = updates;
    this.populateSessionResults(selectedSolution, selectedSession);
  }

  populateSessionResults(solution, session) {
    this.clearErrorAndResults();
    fetchSessionResults(solution, session)
      .then((results) => {
        this.setState({ results });
      })
      .catch((e) => {
        this.handleError(e);
      });
  }

  populateSessionListings() {
    this.clearErrorAndResults();
    fetchSessionService()
      .then(sessions => this.setState({ sessions }))
      .catch((e) => {
        this.handleError(e);
      });
  }

  render() {
    const {
      errMessage,
      results,
      sessions,
    } = this.state;

    if (errMessage) {
      return wrapInPageDiv(<ErrorBox text={errMessage} />);
    }

    return wrapInPageDiv(
      <React.Fragment>
        <SessionListingFilter
          onChange={this.handleSessionFilter}
          onSessionsReceived={this.handleSessionFilter}
          sessions={sessions}
        />
        { results && (
          <RunResultTable results={results} />
        )}
      </React.Fragment>,
    );
  }
}

export default PageSession;
