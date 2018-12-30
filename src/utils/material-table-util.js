export const createMaterialTableColumnsByExampleObject = exampleObject => Object
  .keys(exampleObject)
  .map(k => ({ title: k, field: k }));

export const transformMaterialTableData = (results) => {
  let data = results;
  const boolColumns = Object.keys(results[0]).filter(k => typeof results[0][k] === 'boolean');
  boolColumns.forEach((bc) => {
    data = data.map(obj => ({ ...obj, [bc]: obj[bc] === true ? 'true' : 'false' }));
  });

  return data;
};

export default createMaterialTableColumnsByExampleObject;
