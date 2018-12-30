import { createReactTableColumnsByExampleObject } from '../../src/utils/react-table-util';

describe('UTILS > React Table Util', () => {
  describe('createReactTableColumnsByExampleObject', () => {
    it('maps an objects keys to have Header and accessor props', () => {
      const startObject = { key1: 'a', key2: 'b' };
      const outputObject = createReactTableColumnsByExampleObject(startObject);

      expect(outputObject[0]).toEqual({
        Header: 'key1',
        accessor: 'key1',
      });

      expect(outputObject[1]).toEqual({
        Header: 'key2',
        accessor: 'key2',
      });
    });
  });
});
