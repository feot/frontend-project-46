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
      type,
      oldValue,
      value,
    } = differenceItem;
    const state = (type === 'added' && oldValue !== undefined) ? 'updated' : type;
    const diffBoilerplate = `Property '${key}' was ${state}`;
    const diffTail = (() => {
      if (type === 'added') {
        if (oldValue !== undefined) {
          return `. From ${valueFormatter(oldValue)} to ${valueFormatter(value)}`;
        }
        return ` with value: ${valueFormatter(value)}`;
      }
      return '';
    })();

    return `${diffBoilerplate}${diffTail}`;
  })
  .join('\n');

const mergeDifferenceTree = (differenceTree) => differenceTree
  .map((item) => {
    const itemWithSameKey = differenceTree
      .find((itemB) => (itemB.key === item.key) && itemB.value !== item.value);

    if (itemWithSameKey) {
      return {
        ...item,
        oldValue: itemWithSameKey.value,
      };
    }
    return { ...item };
  })
  .filter((item) => item?.type !== 'changed');

const plain = (differenceTree) => {
  const iter = (item, keyPath) => {
    const newKeyPath = (keyPath) ? `${keyPath}.${item.key}` : item.key;
    const value = (_.isObject(item.value)) ? '[complex value]' : item.value;

    if (!item.children) {
      return [{
        type: item?.type,
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
    .filter((item) => item.type && item.type !== 'unchanged');
  const differenceTreeMerged = mergeDifferenceTree(differenceTreeFlatted);
  return differenceStringify(differenceTreeMerged);
};

export default plain;
