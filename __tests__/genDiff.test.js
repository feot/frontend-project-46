import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { resultPlain, resultStylish } from '../__fixtures__/test_results.js';

test('json', async () => {
  const file1Path = '__fixtures__/file1.json';
  const file2Path = '__fixtures__/file2.json';
  const receivedResult = await genDiff(file1Path, file2Path);

  expect(receivedResult).toEqual(resultStylish);
});

test('yaml', async () => {
  const file1Path = '__fixtures__/file1.yaml';
  const file2Path = '__fixtures__/file2.yaml';
  const receivedResult = await genDiff(file1Path, file2Path);

  expect(receivedResult).toEqual(resultStylish);
});

test('plain style', async () => {
  const file1Path = '__fixtures__/file1.yaml';
  const file2Path = '__fixtures__/file2.yaml';
  const receivedResult = await genDiff(file1Path, file2Path, 'plain');

  expect(receivedResult).toEqual(resultPlain);
});

test('unsupported file extension', async () => {
  const file1Path = '__fixtures__/file1.pdf';
  const file2Path = '__fixtures__/file2.pdf';

  await expect(genDiff(file1Path, file2Path))
    .rejects
    .toThrow();
});
