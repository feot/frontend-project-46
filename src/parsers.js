import yaml from 'js-yaml';
import { existsSync, readFileSync } from 'fs';
import { resolve as pathResolve, extname } from 'path';

export default (filepath) => {
  const workingDir = process.cwd();
  const absFilepath = (existsSync(filepath)) ? filepath : pathResolve(workingDir, filepath);
  const fileExtension = extname(filepath);

  switch (fileExtension) {
    case '.json':
      return JSON.parse(readFileSync(absFilepath), 'utf8');
    case '.yaml':
      return yaml.load(readFileSync(absFilepath), 'utf8');
    case '.yml':
      return yaml.load(readFileSync(absFilepath), 'utf8');
    default:
      throw new Error(`Wrong file extension: ${fileExtension}`);
  }
};
