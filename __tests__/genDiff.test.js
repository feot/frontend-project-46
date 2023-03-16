import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { resultPlain, resultStylish } from '../__fixtures__/test_results.js';

test('json', () => {
  const file1Path = '__fixtures__/file1.json';
  const file2Path = '__fixtures__/file2.json';
  const receivedResult = genDiff(file1Path, file2Path);

  expect(receivedResult).toEqual(resultStylish);
});

test('yaml', () => {
  const file1Path = '__fixtures__/file1.yml';
  const file2Path = '__fixtures__/file2.yml';
  const receivedResult = genDiff(file1Path, file2Path);

  expect(receivedResult).toEqual(resultStylish);
});

test('plain style', () => {
  const file1Path = '__fixtures__/file1.yml';
  const file2Path = '__fixtures__/file2.yml';
  const receivedResult = genDiff(file1Path, file2Path, 'plain');

  expect(receivedResult).toEqual(resultPlain);
});

test('unsupported file extension', () => {
  const file1Path = '__fixtures__/file1.pdf';
  const file2Path = '__fixtures__/file2.pdf';

  expect(() => genDiff(file1Path, file2Path)).toThrow(Error);
});
