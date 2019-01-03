import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import {
  createMaterialTableColumnsByExampleObject,
  transformMaterialTableData,
} from '../../utils/material-table-util';

const TABLE_TITLE = 'Session Results';
const NO_RECORDS_MSG = 'No records to display';

const RunResultTable = ({ results }) => {
  const exampleRun = results[0];
  if (!exampleRun) return null;
  const columns = createMaterialTableColumnsByExampleObject(exampleRun);
  const data = transformMaterialTableData(results);

  return (
    <div style={{ marginTop: 24 }}>
      <MaterialTable
        columns={columns}
        title={TABLE_TITLE}
        data={data}
        localization={{
          emptyDataSourceMessage: NO_RECORDS_MSG,
        }}
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
