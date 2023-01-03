import { existsSync, readFileSync } from 'fs';
import { resolve as pathResolve, extname } from 'path';
import _ from 'lodash';

const getDataParse = (filepath) => {
  const workingDir = process.cwd();
  const absFilepath = (existsSync(filepath)) ? filepath : pathResolve(workingDir, filepath);
  const fileExtension = extname(filepath);

  switch (fileExtension) {
    case '.json':
      return JSON.parse(readFileSync(absFilepath), 'utf8');
    default:
      throw new Error(`Wrong file extension: ${fileExtension}`);
  }
};

const genDiff = (filepath1, filepath2) => {
  const dataParse1 = getDataParse(filepath1);
  const dataParse2 = getDataParse(filepath2);
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
