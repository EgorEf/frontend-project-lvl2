import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const pathToResult = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(pathToResult, 'utf8');

const absolutionPathToJson1 = path.resolve(__dirname, '__fixtures__/before.json');
const absolutionPathToJson2 = path.resolve(__dirname, '__fixtures__/after.json');

const absolutionPathToYml1 = path.resolve(__dirname, '__fixtures__/before.yml');
const absolutionPathToYml2 = path.resolve(__dirname, '__fixtures__/after.yml');

const relativePath1 = './__tests__/__fixtures__/before.json';
const relativePath2 = './__tests__/__fixtures__/after.json';

const relativePathYml1 = './__tests__/__fixtures__/before.yml';
const relativePathYml2 = './__tests__/__fixtures__/after.yml';

test('gendiff(nameFile1.json, nameFile2.json )', () => {
  expect(gendiff(absolutionPathToJson1, absolutionPathToJson2)).toEqual(result);
  expect(gendiff(relativePath1, relativePath2)).toEqual(result);
});
test('gendiff(nameFile1.yml, nameFile2.yml )', () => {
  expect(gendiff(absolutionPathToYml1, absolutionPathToYml2)).toEqual(result);
  expect(gendiff(relativePathYml1, relativePathYml2)).toEqual(result);
});
