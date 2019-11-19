import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const pathToResult = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(pathToResult, 'utf8');

const absolutionPath1 = path.resolve(__dirname, '__fixtures__/before.json');
const absolutionPath2 = path.resolve(__dirname, '__fixtures__/after.json');

const relativePath1 = './__tests__/__fixtures__/before.json';
const relativePath2 = './__tests__/__fixtures__/after.json';

test('gendiff', () => {
  expect(gendiff(absolutionPath1, absolutionPath2)).toEqual(result);
  expect(gendiff(relativePath1, relativePath2)).toEqual(result);
});
