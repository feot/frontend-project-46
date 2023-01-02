import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import jsonDiffResult from '../__fixtures__/test_results.js';

test('json', () => {
  const file1Path = '__fixtures__/file1.json';
  const file2Path = '__fixtures__/file2.json';

  expect(genDiff(file1Path, file2Path)).toEqual(jsonDiffResult);
});

test('unsupported file extension', () => {
  const file1Path = '__fixtures__/file1.pdf';
  const file2Path = '__fixtures__/file2.pdf';

  expect(() => {
    genDiff(file1Path, file2Path);
  }).toThrow();
});
