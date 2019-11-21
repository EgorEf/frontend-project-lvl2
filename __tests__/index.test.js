import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const pathToResult = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(pathToResult, 'utf8');

const pathToJson1 = path.resolve(__dirname, '__fixtures__/before.json');
const pathToJson2 = path.resolve(__dirname, '__fixtures__/after.json');

const pathToYml1 = path.resolve(__dirname, '__fixtures__/before.yml');
const pathToYml2 = path.resolve(__dirname, '__fixtures__/after.yml');

const pathToIni1 = path.resolve(__dirname, '__fixtures__/before.ini');
const pathToIni2 = path.resolve(__dirname, '__fixtures__/after.ini');
const cases = [[pathToJson1, pathToJson2, result], [pathToYml1, pathToYml2, result],
  [pathToIni1, pathToIni2, result]];
describe("'gendiff' utility ", () => {
  test.each(cases)('flat-file genDiff(%p,\n %p), \n return %p',
    (firstArg, secondArg, expectedResult) => {
      const resulted = gendiff(firstArg, secondArg);
      expect(resulted).toEqual(expectedResult);
    });
});
