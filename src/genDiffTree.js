import _ from 'lodash';

const genDiffTree = (data1, data2) => {
  const iter = (dataA, dataB) => {
    const uniqueKeys = _.union(Object.keys(dataA), Object.keys(dataB));
    const uniqueKeysSorted = _.sortBy(uniqueKeys, (key) => key);

    return uniqueKeysSorted
      .map((key) => {
        const fileAValue = dataA[key];
        const fileBValue = dataB[key];
        const isFileAKeyExist = !(fileAValue === undefined);
        const isFileBKeyExist = !(fileBValue === undefined);

        if (_.isObject(fileAValue) && _.isObject(fileBValue)) {
          return [{
            key,
            value: null,
            type: 'nested',
            children: iter(fileAValue, fileBValue),
          }];
        }

        if (isFileAKeyExist && isFileBKeyExist && fileAValue !== fileBValue) {
          return [
            {
              key,
              value: fileAValue,
              type: 'changed',
              children: null,
            },
            {
              key,
              value: fileBValue,
              type: 'added',
              children: null,
            },
          ];
        }

        const type = (() => {
          if (isFileAKeyExist) {
            return (fileAValue === fileBValue) ? 'unchanged' : 'removed';
          }
          return (fileAValue === fileBValue) ? 'unchanged' : 'added';
        })();

        return [{
          key,
          value: (isFileAKeyExist) ? fileAValue : fileBValue,
          type,
          children: null,
        }];
      })
      .flat();
  };

  return {
    key: null,
    value: null,
    type: 'nested',
    children: iter(data1, data2),
  };
};

export default genDiffTree;
