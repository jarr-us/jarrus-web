import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export const SOLUTION_DD_CLASSNAME = 'solutionSelector';
export const SESSION_DD_CLASSNAME = 'sessionSelector';
export const FILTER_CLASSNAME = 'session-listing-filter';

const stateFromProps = (props, _optionalSelectedSolution) => {
  const { sessions } = props;
  const selectedSolution = _optionalSelectedSolution || Object.keys(sessions)[0];
  const sessionOptions = sessions[selectedSolution] || [];
  const selectedSession = sessionOptions[0];
  return {
    selectedSolution,
    selectedSession,
    sessionOptions,
  };
};

class SessionListingFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateFromProps(props);

    const { selectedSolution, selectedSession } = this.state;
    if (props.onSessionsReceived && selectedSolution !== undefined) {
      props.onSessionsReceived({ selectedSolution, selectedSession });
    }

    this.handleUpdatedPropSessions = this.handleUpdatedPropSessions.bind(this);
    this.onSolutionSelect = this.onSolutionSelect.bind(this);
    this.onSessionSelect = this.onSessionSelect.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { sessions } = this.props;
    if (sessions !== prevProps.sessions) {
      this.handleUpdatedPropSessions(sessions);
    }
  }

  onSolutionSelect(e) {
    const { value } = e.target;

    this.setState(stateFromProps(this.props, value),
      () => this.onSessionFilterSelection());
  }

  onSessionSelect(e) {
    const { value } = e.target;

    this.setState({ selectedSession: value },
      () => this.onSessionFilterSelection());
  }

  onSessionFilterSelection() {
    const { onChange } = this.props;
    if (onChange) {
      const { selectedSolution, selectedSession } = this.state;
      onChange({
        selectedSolution,
        selectedSession,
      });
    }
  }

  handleUpdatedPropSessions(sessions) {
    const newState = stateFromProps({ sessions });
    this.setState(newState);

    const { onSessionsReceived } = this.props;
    if (onSessionsReceived) {
      const { selectedSolution, selectedSession } = newState;
      onSessionsReceived({ selectedSolution, selectedSession });
    }
  }

  render() {
    const { sessions } = this.props;
    const { selectedSolution, selectedSession, sessionOptions } = this.state;

    if (!selectedSolution) return null;

    const solutionOptions = Object.keys(sessions);

    return (
      <div className={FILTER_CLASSNAME}>
        <div>
          <Typography variant="h6">Solution</Typography>
          <select
            className={SOLUTION_DD_CLASSNAME}
            onChange={this.onSolutionSelect}
            value={selectedSolution}
          >
            { solutionOptions.map(s => (
              <option
                key={s}
                value={s}
              >
                {s}
              </option>))}
          </select>
        </div>
        <div>
          <Typography variant="h6">Session</Typography>
          <select
            className={SESSION_DD_CLASSNAME}
            onChange={this.onSessionSelect}
            value={selectedSession}
          >
            { sessionOptions.map(s => (
              <option
                key={s}
                value={s}
              >
                {s}
              </option>))}
          </select>
        </div>
      </div>
    );
  }
}

SessionListingFilter.propTypes = {
  sessions: PropTypes.object,
  onChange: PropTypes.func,
  onSessionsReceived: PropTypes.func,
};

SessionListingFilter.defaultProps = {
  sessions: {},
  onChange: () => {},
  onSessionsReceived: () => {},
};

export default SessionListingFilter;
