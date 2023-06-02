import _ from 'lodash';

const valueFormatter = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const differenceStringify = (difference) => difference
  .map((differenceItem) => {
    const {
      keyPath,
      type,
      oldValue,
      value,
    } = differenceItem;
    const state = (type === 'changed') ? 'updated' : type;
    const diffBoilerplate = `Property '${keyPath}' was ${state}`;
    const diffTail = (() => {
      switch (type) {
        case 'added':
          return ` with value: ${valueFormatter(value)}`;

        case 'changed':
          return `. From ${valueFormatter(oldValue)} to ${valueFormatter(value)}`;

        default:
          return '';
      }
    })();

    return `${diffBoilerplate}${diffTail}`;
  })
  .join('\n');

const plain = (differenceTree) => {
  const iter = (item, keyPath) => {
    const newKeyPath = (keyPath) ? `${keyPath}.${item.key}` : item.key;

    if (!item.children) {
      return {
        ...item,
        keyPath: newKeyPath,
      };
    }

    const newChildren = item.children
      .map((child) => iter(child, newKeyPath))
      .flat();

    return newChildren;
  };

  const differenceTreeFlatted = differenceTree
    .map((item) => iter(item, ''))
    .flat()
    .filter((item) => !(item?.type === 'unchanged'));
  console.log(JSON.stringify(differenceTreeFlatted, null, 2));
  return differenceStringify(differenceTreeFlatted);
};

export default plain;
