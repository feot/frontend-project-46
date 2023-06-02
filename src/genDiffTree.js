import _ from 'lodash';

const genDiffTree = (data1, data2) => {
  const uniqueKeys = _.union(Object.keys(data1), Object.keys(data2));
  const uniqueKeysSorted = _.sortBy(uniqueKeys, (key) => key);

  return uniqueKeysSorted
    .map((key) => {
      const file1Value = data1[key];
      const file2Value = data2[key];

      if (!Object.hasOwn(data1, key)) {
        return {
          key,
          value: file2Value,
          type: 'added',
          children: null,
        };
      }

      if (!Object.hasOwn(data2, key)) {
        return {
          key,
          value: file1Value,
          type: 'removed',
          children: null,
        };
      }

      if (_.isObject(file1Value) && _.isObject(file2Value)) {
        return {
          key,
          value: null,
          type: 'nested',
          children: genDiffTree(file1Value, file2Value),
        };
      }

      if (file1Value === file2Value) {
        return {
          key,
          value: file1Value,
          type: 'unchanged',
          children: null,
        };
      }

      return {
        key,
        value: file2Value,
        oldValue: file1Value,
        type: 'changed',
        children: null,
      };
    });
};

export default genDiffTree;
