import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);

    case 'plain':
      return plain(diffTree);

    case 'json':
      console.log('json');
      return json(diffTree);

    default:
      throw new Error(`Wrong format: ${format}`);
  }
};
