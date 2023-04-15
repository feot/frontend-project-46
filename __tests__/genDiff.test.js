import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { resultPlain, resultStylish, resultJSON } from '../__fixtures__/test_results.js';

const cases = [
  ['__fixtures__/file1.json', '__fixtures__/file2.json', resultStylish, 'stylish'],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yml', resultStylish, 'stylish'],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', resultPlain, 'plain'],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yml', resultPlain, 'plain'],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', resultJSON, 'json'],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yml', resultJSON, 'json'],
];

describe('output formats', () => {
  test.each(cases)('difference %s and %s', (a, b, result, format = 'stylish') => {
    expect(genDiff(a, b, format)).toEqual(result);
  });
});

test('unsupported file extension', () => {
  const file1Path = '__fixtures__/file1.txt';
  const file2Path = '__fixtures__/file2.txt';

  expect(() => genDiff(file1Path, file2Path)).toThrow(Error);
});

test('non-existing file', () => {
  const file1Path = '__fixtures__/file1.pdf';
  const file2Path = '__fixtures__/file2.pdf';

  expect(() => genDiff(file1Path, file2Path)).toThrow(Error);
});

test('unsupported format', () => {
  const file1Path = '__fixtures__/file1.json';
  const file2Path = '__fixtures__/file2.json';

  expect(() => genDiff(file1Path, file2Path, 'cool')).toThrow(Error);
});
