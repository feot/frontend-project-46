import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import diffResult from '../__fixtures__/test_results.js';

test('json', () => {
  const file1Path = '__fixtures__/file1.json';
  const file2Path = '__fixtures__/file2.json';

  expect(genDiff(file1Path, file2Path)).toEqual(diffResult);
});

test('yaml', () => {
  const file1Path = '__fixtures__/file1.yaml';
  const file2Path = '__fixtures__/file2.yaml';

  expect(genDiff(file1Path, file2Path)).toEqual(diffResult);
});

test('unsupported file extension', () => {
  const file1Path = '__fixtures__/file1.pdf';
  const file2Path = '__fixtures__/file2.pdf';

  expect(() => {
    genDiff(file1Path, file2Path);
  }).toThrow();
});
