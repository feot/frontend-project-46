import _ from 'lodash';

export default (differenceTree) => {
  const spacesCount = 4;

  const iter = (currentValue, depth) => {
    if (!currentValue?.children?.length && !_.isObject(currentValue.value)) {
      return String(currentValue.value);
    }

    const indentSize = depth * spacesCount;
    const currentIndent = ' '.repeat(indentSize - 2);
    const bracketIndent = ' '.repeat(indentSize - spacesCount);
    const children = (() => {
      if (currentValue?.children?.length) {
        return currentValue.children;
      }
      return Object.entries(currentValue.value).map(([key, value]) => ({ key, value }));
    })();
    const lines = children
      .map((item) => {
        const stateSymbol = (() => {
          switch (item.state) {
            case 'removed':
              return '-';
            case 'added':
              return '+';
            default:
              return ' ';
          }
        })();

        return `${currentIndent}${stateSymbol} ${item.key}: ${iter(item, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(differenceTree, 1);
};
