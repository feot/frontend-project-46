import _ from 'lodash';
import parsers from './parsers.js';
import formatterRouter from './formatters/formatterRouter.js';

const genDiff = (filepath1, filepath2, format) => {
  const dataParse1 = parsers(filepath1);
  const dataParse2 = parsers(filepath2);

  const iter = (data1, data2) => {
    const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
    const values = [];

    keys.forEach((key) => {
      let file1Value = data1[key];
      let file2Value = data2[key];
      const isFile1KeyExist = !(file1Value === undefined);
      const isFile2KeyExist = !(file2Value === undefined);
      let children = null;

      if (_.isObject(file1Value) && _.isObject(file2Value)) {
        children = iter(file1Value, file2Value);
        file1Value = null;
        file2Value = null;
      }

      if (isFile1KeyExist) {
        const state = (file1Value === file2Value) ? 'stayed' : 'removed';
        values.push({
          key,
          value: file1Value,
          state,
          children,
        });
        if (state === 'stayed') {
          return;
        }
      }
      if (isFile2KeyExist) {
        const state = (file1Value === file2Value) ? 'stayed' : 'added';
        values.push({
          key,
          value: file2Value,
          state,
          children,
        });
      }
    });

    return values;
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
