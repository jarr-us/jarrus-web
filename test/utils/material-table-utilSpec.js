import Chance from 'chance';
import {
  createMaterialTableColumnsByExampleObject,
  transformMaterialTableData,
} from '../../src/utils/material-table-util';

describe('UTIL > Material Table', () => {
  let chance;
  let key1;
  let key2;
  let key3;
  let exampleObject;
  beforeEach(() => {
    chance = new Chance();
    key1 = chance.string();
    key2 = chance.string();
    key3 = chance.string();
    exampleObject = {
      [key1]: chance.string(),
      [key2]: chance.string(),
    };
  });

  describe('transformMaterialTableData()', () => {
    it('does not modify array of objects with string props', () => {
      const sampleArray = [
        {
          [key1]: chance.string(),
          [key2]: chance.string(),
          [key3]: chance.string(),
        }, {
          [key1]: chance.string(),
          [key2]: chance.string(),
          [key3]: chance.string(),
        }, {
          [key1]: chance.string(),
          [key2]: chance.string(),
          [key3]: chance.string(),
        },
      ];

      expect(transformMaterialTableData(sampleArray)).toEqual(sampleArray);
    });

    it('transforms members with a bool prop to a string', () => {
      const sampleArray = [
        {
          [key1]: chance.string(),
          [key2]: chance.bool(),
          [key3]: chance.string(),
        }, {
          [key1]: chance.string(),
          [key2]: chance.bool(),
          [key3]: chance.string(),
        }, {
          [key1]: chance.string(),
          [key2]: chance.bool(),
          [key3]: chance.string(),
        },
      ];

      const result = transformMaterialTableData(sampleArray);

      expect(typeof result[0][key2]).toEqual('string');
      expect(result[0][key2]).toEqual(`${sampleArray[0][key2]}`);
      expect(typeof result[1][key2]).toEqual('string');
      expect(result[1][key2]).toEqual(`${sampleArray[1][key2]}`);
      expect(typeof result[2][key2]).toEqual('string');
      expect(result[2][key2]).toEqual(`${sampleArray[2][key2]}`);
    });
  });

  describe('createMaterialTableColumnsByExampleObject()', () => {
    let result;
    beforeEach(() => {
      result = createMaterialTableColumnsByExampleObject(exampleObject);
    });

    it('maps object to array by keys', () => {
      expect(result.length).toBe(Object.keys(exampleObject).length);
    });

    it('creates object with props title and field', () => {
      expect(result[0]).toEqual({
        title: key1,
        field: key1,
      });

      expect(result[1]).toEqual({
        title: key2,
        field: key2,
      });
    });
  });
});
