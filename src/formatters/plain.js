import _ from 'lodash';

const valueFormatter = (value) => {
  if (typeof value === 'string' && value !== '[complex value]') {
    return `'${value}'`;
  }
  return value;
};

const differenceStringify = (difference) => difference
  .map((differenceItem) => {
    const {
      key,
      state,
      oldValue,
      value,
    } = differenceItem;
    const diffBoilerplate = `Property '${key}' was ${state}`;
    const diffTail = (() => {
      switch (state) {
        case 'added':
          return ` with value: ${valueFormatter(value)}`;

        case 'updated':
          return `. From ${valueFormatter(oldValue)} to ${valueFormatter(value)}`;

        default:
          return '';
      }
    })();

    return `${diffBoilerplate}${diffTail}`;
  })
  .join('\n');

const mergeDifferenceTree = (differenceTree) => differenceTree
  .map((item) => {
    const itemWithSameKey = differenceTree
      .find((itemB) => (itemB.key === item.key) && itemB.value !== item.value);

    if (itemWithSameKey && item?.state === 'removed') {
      return {
        ...item,
        toDelete: true,
      };
    }
    if (itemWithSameKey) {
      return {
        ...item,
        state: 'updated',
        oldValue: itemWithSameKey.value,
      };
    }
    return { ...item };
  })
  .filter((item) => !item.toDelete);

const plain = (differenceTree) => {
  const iter = (item, keyPath) => {
    const newKeyPath = (keyPath) ? `${keyPath}.${item.key}` : item.key;
    const value = (_.isObject(item.value)) ? '[complex value]' : item.value;

    if (!item.children) {
      return [{
        state: item?.state,
        key: newKeyPath,
        value,
      }];
    }

    const newChildren = item.children
      .map((child) => iter(child, newKeyPath))
      .flat();

    return newChildren;
  };

  const differenceTreeFlatted = iter(differenceTree, '')
    .filter((item) => item.state && item.state !== 'stayed');
  const differenceTreeMerged = mergeDifferenceTree(differenceTreeFlatted);
  return differenceStringify(differenceTreeMerged);
};

export default plain;
