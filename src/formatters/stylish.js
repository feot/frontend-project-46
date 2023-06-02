import _ from 'lodash';

const getCurrentIndent = (depth, indentSize = 4) => ' '.repeat(indentSize * depth - 2);
const getbracketIndent = (depth, indentSize = 4) => ' '.repeat(indentSize * depth - indentSize);

const stringify = (value, depth = 1) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return String(currentValue);
    }

    const currentIndent = getCurrentIndent(currentDepth);
    const bracketIndent = getbracketIndent(currentDepth);
    const lines = Object.entries(currentValue)
      .map(([key, keyValue]) => `${currentIndent}  ${key}: ${iter(keyValue, currentDepth + 1)}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, depth);
};

export default (differenceTree) => {
  const iter = (currentValue, depth = 1) => {
    const currentIndent = getCurrentIndent(depth);
    const bracketIndent = getbracketIndent(depth);
    const lines = currentValue
      .flatMap((item) => {
        switch (item.type) {
          case 'nested':
            return `${currentIndent}  ${item.key}: ${iter(item.children, depth + 1)}`;
          case 'removed':
            return `${currentIndent}- ${item.key}: ${stringify(item.value, depth + 1)}`;
          case 'added':
            return `${currentIndent}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
          case 'changed':
            return [`${currentIndent}- ${item.key}: ${stringify(item.oldValue, depth + 1)}`,
              `${currentIndent}+ ${item.key}: ${stringify(item.value, depth + 1)}`];
          default:
            return `${currentIndent}  ${item.key}: ${stringify(item.value, depth + 1)}`;
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(differenceTree);
};
