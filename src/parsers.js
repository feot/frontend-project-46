import yaml from 'js-yaml';

export default (data, fileExtension) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(data, 'utf8');
    case '.yaml':
      return yaml.load(data, 'utf8');
    case '.yml':
      return yaml.load(data, 'utf8');
    default:
      throw new Error(`Wrong file extension: ${fileExtension}`);
  }
};
