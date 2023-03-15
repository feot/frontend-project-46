import _ from 'lodash';

const valueFormatter = (value) => {
  if (typeof value === 'string' && value !== '[complex value]') {
    return `'${value}'`;
  }
  return value;
};

const differenceStringify = (differenceObj) => Object.entries(differenceObj)
  .map(([key, value]) => {
    const state = (value.state === 'added' && Object.hasOwn(value, 'oldValue')) ? 'updated' : value.state;
    const diffBoilerplate = `Property '${key}' was ${state}`;
    const diffTail = (() => {
      switch (state) {
        case 'added':
          return ` with value: ${valueFormatter(value.value)}`;

        case 'updated':
          return `. From ${valueFormatter(value.oldValue)} to ${valueFormatter(value.value)}`;

        default:
          return '';
      }
    })();

    return `${diffBoilerplate}${diffTail}`;
  })
  .join('\n');

const plain = (differenceTree) => {
  const res = {};

  const iter = (data, keyPath) => {
    if (!data?.children?.length && !_.isObject(data.value)) {
      return data.value;
    }

    const children = (() => {
      if (data?.children?.length) {
        return data.children;
      }
      return Object.entries(data.value).map(([key, value]) => ({ key, value }));
    })();

    children.forEach((item) => {
      const newKeyPath = (keyPath) ? `${keyPath}.${item.key}` : item.key;
      const itemState = item.state;
      const value = (_.isObject(iter(item, newKeyPath))) ? '[complex value]' : iter(item, newKeyPath);

      if (itemState && itemState !== 'stayed') {
        if (Object.hasOwn(res, newKeyPath)) {
          res[newKeyPath] = {
            oldValue: res[newKeyPath].value,
            value,
            state: itemState,
          };
        } else {
          res[newKeyPath] = {
            value,
            state: itemState,
          };
        }
      }
    });

    return res;
  };

  return differenceStringify(iter(differenceTree, ''));
};

export default plain;
