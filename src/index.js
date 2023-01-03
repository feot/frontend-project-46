import _ from 'lodash';
import parsers from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const dataParse1 = parsers(filepath1);
  const dataParse2 = parsers(filepath2);
  const keys = _.union(Object.keys(dataParse1), Object.keys(dataParse2)).sort();

  const diff = keys.map((key) => {
    const file1Value = dataParse1[key];
    const file2Value = dataParse2[key];
    const isFile1KeyExist = !(file1Value === undefined);
    const isFile2KeyExist = !(file2Value === undefined);

    if (isFile1KeyExist && isFile2KeyExist && file1Value === file2Value) {
      return `    ${key}: ${file1Value}`;
    }
    if (isFile1KeyExist && isFile2KeyExist && file1Value !== file2Value) {
      return `  - ${key}: ${file1Value}\n  + ${key}: ${file2Value}`;
    }
    if (isFile1KeyExist && !isFile2KeyExist) {
      return `  - ${key}: ${file1Value}`;
    }
    return `  + ${key}: ${file2Value}`;
  });

  return ['{', ...diff, '}'].join('\n');
};

export default genDiff;
