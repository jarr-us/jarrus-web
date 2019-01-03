import React from 'react';
import PropTypes from 'prop-types';
import ReactInputRange from 'react-input-range';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const RANGE_PROPS = {
  PoolSize: { minValue: 1, maxValue: 100, step: 1 },
  Iterations: { minValue: 1, maxValue: 100000, step: 1 },
  CrossoverRate: { minValue: 0, maxValue: 1, step: 0.01 },
  MutationRate: { minValue: 0, maxValue: 1, step: 0.01 },
  ElitismRate: { minValue: 0, maxValue: 1, step: 0.01 },
  MaximumLifeSpan: { minValue: 1, maxValue: 1000, step: 1 },
  ChildrenPerCouple: { minValue: 1, maxValue: 100, step: 1 },
};

export const CHOOSE_PROPS = [
  'ParentSelectionType',
  'CrossoverType',
  'ComputerName',
  'MutationType',
];

const stateFromConfigAndData = (data) => {
  const state = {};
  Object.keys(RANGE_PROPS).forEach((rp) => {
    state[rp] = {
      value: {
        min: RANGE_PROPS[rp].minValue,
        max: RANGE_PROPS[rp].maxValue,
      },
    };
  });
  if (data) {
    CHOOSE_PROPS.forEach((cp) => {
      const distinctChooseVals = new Set(data.map(row => row[cp]));
      Array.from(distinctChooseVals).forEach((dcv) => {
        if (!state[cp]) state[cp] = {};
        state[cp][dcv] = true;
      });
    });
  }
  return state;
};

class ResultFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = stateFromConfigAndData(props.data);

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.sendFilteredDataToParent = this.sendFilteredDataToParent.bind(this);
  }

  componentDidMount() {
    this.sendFilteredDataToParent();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.setState(stateFromConfigAndData(data),
        () => this.sendFilteredDataToParent());
    }
  }

  handleCheckbox(e, key, name) {
    this.setState(prevState => ({
      [key]: {
        ...prevState[key],
        [name]: e.target.checked,
      },
    }), () => { this.sendFilteredDataToParent(); });
  }

  handleSliderChange(value, name) {
    this.setState({ [name]: { value } }, () => { this.sendFilteredDataToParent(); });
  }

  sendFilteredDataToParent() {
    const { onFilterData, data } = this.props;
    if (!onFilterData || !data) return;

    let filteredData = JSON.parse(JSON.stringify(data));

    Object.keys(RANGE_PROPS).forEach(((rangeProp) => {
      const { [rangeProp]: srp } = this.state;
      const { min, max } = srp.value;
      filteredData = filteredData.filter(o => o[rangeProp] >= min && o[rangeProp] <= max);
    }));
    CHOOSE_PROPS.forEach((chooseProp) => {
      const { [chooseProp]: scp } = this.state;
      const choicesForProp = Object.keys(scp || {});
      choicesForProp.forEach((choice) => {
        if (!scp[choice]) {
          filteredData = filteredData.filter(o => o[chooseProp] !== choice);
        }
      });
    });
    onFilterData(filteredData);
  }

  render() {
    const { data } = this.props;
    if (!data) return null;

    return (
      <div style={{ display: 'flex', contentAlign: 'space-around' }}>
        <div>
          {
            this.state != null && CHOOSE_PROPS.map((key) => {
              const { [key]: curState } = this.state;
              if (curState === undefined) return null;
              const propBoxes = Object.keys(curState);
              if (propBoxes.length < 1) return null;

              return (
                <div key={key}>
                  <FormControl component="fieldset">
                    <Typography variant="overline">{key}</Typography>
                    <FormGroup>
                      { propBoxes.map(pb => (
                        <FormControlLabel
                          key={pb}
                          label={pb}
                          control={
                            (
                              <Checkbox
                                checked={curState[pb]}
                                onClick={(e) => { e.persist(); this.handleCheckbox(e, key, pb); }}
                                label={pb}
                                value={pb}
                              />
                            )}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </div>
              );
            })
          }
        </div>
        <div>
          { Object.keys(RANGE_PROPS).map((key) => {
            const rangeProps = {
              value: { min: RANGE_PROPS[key].minValue, max: RANGE_PROPS[key].maxValue },
              ...RANGE_PROPS[key],
            };
            const { [key]: stateObj } = this.state;
            rangeProps.value = (stateObj || {}).value;
            return (
              <div key={key}>
                <div style={{ display: 'flex', contentAlign: 'space-between' }}>
                  <Typography variant="overline">{key}</Typography>
                  <Typography variant="h6">{`${rangeProps.value.min} to ${rangeProps.value.max}`}</Typography>
                </div>
                <ReactInputRange
                  {...rangeProps}
                  allowSameValues
                  formatLabel={() => {}}
                  name={key}
                  onChange={(e) => { this.handleSliderChange(e, key); }}
                />
              </div>
            );
          })}
        </div>
      </div>);
  }
}


ResultFilter.propTypes = {
  onFilterData: PropTypes.func,
};

ResultFilter.defaultProps = {
  onFilterData: undefined,
};

export default ResultFilter;
