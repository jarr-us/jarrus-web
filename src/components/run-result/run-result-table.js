import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { createReactTableColumnsByExampleObject } from '../../utils/react-table-util';

const DEFAULT_ROW_COUNT = 5;
const DEFAULT_REACT_TABLE_CLASSES = '-striped -highlight';
const RunResultTable = ({ results }) => {
  const exampleRun = results[0];
  if (!exampleRun) return null;
  const columns = createReactTableColumnsByExampleObject(exampleRun);

  return (
    <div>
      <ReactTable
        className={DEFAULT_REACT_TABLE_CLASSES}
        columns={columns}
        data={results}
        defaultPageSize={DEFAULT_ROW_COUNT}
      />
    </div>
  );
};

RunResultTable.propTypes = {
  results: PropTypes.array,
};

RunResultTable.defaultProps = {
  results: [],
};

export default RunResultTable;
