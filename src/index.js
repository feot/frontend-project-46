import _ from 'lodash';
import parser from './parsers.js';
import formatterRouter from './formatters/formatterRouter.js';

const genDiff = (filepath1, filepath2, format) => {
  const dataParse1 = parser(filepath1);
  const dataParse2 = parser(filepath2);

  const iter = (data1, data2) => {
    const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();

    return keys
      .map((key) => {
        const file1Value = data1[key];
        const file2Value = data2[key];
        const isFile1KeyExist = !(file1Value === undefined);
        const isFile2KeyExist = !(file2Value === undefined);

        if (_.isObject(file1Value) && _.isObject(file2Value)) {
          return [{
            key,
            value: null,
            state: 'stayed',
            children: iter(file1Value, file2Value),
          }];
        }

        if (isFile1KeyExist && isFile2KeyExist && file1Value !== file2Value) {
          return [
            {
              key,
              value: file1Value,
              state: 'removed',
              children: null,
            },
            {
              key,
              value: file2Value,
              state: 'added',
              children: null,
            },
          ];
        }

        const state = (() => {
          if (isFile1KeyExist) {
            return (file1Value === file2Value) ? 'stayed' : 'removed';
          }
          return (file1Value === file2Value) ? 'stayed' : 'added';
        })();

        return [{
          key,
          value: (isFile1KeyExist) ? file1Value : file2Value,
          state,
          children: null,
        }];
      })
      .flat();
  };

  const differenceTree = {
    key: null,
    value: null,
    state: 'stayed',
    children: iter(dataParse1, dataParse2),
  };
  const formatter = formatterRouter(format);

  return formatter(differenceTree);
};

export default genDiff;
