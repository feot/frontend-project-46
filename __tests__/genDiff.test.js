import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.json', 'file2.json', 'resultStylish'],
  ['file1.yaml', 'file2.yml', 'resultStylish', 'stylish'],
  ['file1.json', 'file2.json', 'resultPlain', 'plain'],
  ['file1.yaml', 'file2.yml', 'resultPlain', 'plain'],
  ['file1.json', 'file2.json', 'resultJSON.json', 'json'],
  ['file1.yaml', 'file2.yml', 'resultJSON.json', 'json'],
];

describe('output formats', () => {
  test.each(cases)('difference %s and %s', (filenameA, filenameB, resultName, format = 'stylish') => {
    const filepathA = getFixturePath(filenameA);
    const filepathB = getFixturePath(filenameB);

    expect(genDiff(filepathA, filepathB, format)).toEqual(readFile(resultName));
  });
});

test('unsupported file extension', () => {
  const filepathA = getFixturePath('file1.txt');
  const filepathB = getFixturePath('file2.txt');

  expect(() => genDiff(filepathA, filepathB)).toThrow(Error);
});

test('non-existing file', () => {
  const filepathA = getFixturePath('file1.pdf');
  const filepathB = getFixturePath('file2.pdf');

  expect(() => genDiff(filepathA, filepathB)).toThrow(Error);
});

test('unsupported format', () => {
  const filepathA = getFixturePath('file1.json');
  const filepathB = getFixturePath('file2.json');

  expect(() => genDiff(filepathA, filepathB, 'cool')).toThrow(Error);
});
