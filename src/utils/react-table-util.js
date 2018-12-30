export const createReactTableColumnsByExampleObject = exampleObject => Object
  .keys(exampleObject)
  .map(prop => ({ Header: prop, accessor: prop }));

export default createReactTableColumnsByExampleObject;
