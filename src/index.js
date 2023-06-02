import { existsSync, readFileSync } from 'fs';
import { resolve as pathResolve, extname } from 'path';
import parser from './parsers.js';
import formatter from './formatters/index.js';
import genDiffTree from './genDiffTree.js';

const getData = (filepath) => {
  const workingDir = process.cwd();
  const absFilepath = (existsSync(filepath)) ? filepath : pathResolve(workingDir, filepath);

  if (!existsSync(absFilepath)) {
    throw new Error(`No such file, open '${absFilepath}'`);
  }

  const fileExtension = extname(filepath);
  const fileType = fileExtension.substring(1, fileExtension.length);

  // if (fileType === 'yaml' || fileType === 'yml') {
  //   console.log({
  //     yamlFileContent: readFileSync(absFilepath, 'utf8'),
  //   });
  // }

  return parser(readFileSync(absFilepath), fileType);
};

const getFormattedDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diffTree = genDiffTree(data1, data2);

  return formatter(diffTree, format);
};

export default getFormattedDiff;
