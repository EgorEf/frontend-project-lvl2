import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const pathToResult = path.resolve(__dirname, '__fixtures__/result.txt');
const pathToResultPlain = path.resolve(__dirname, '__fixtures__/resultPlain.txt');
const pathToResultJson = path.resolve(__dirname, '__fixtures__/resultJSON.txt');
const result = fs.readFileSync(pathToResult, 'utf8');
const resultPlain = fs.readFileSync(pathToResultPlain, 'utf8');
const resultJson = fs.readFileSync(pathToResultJson, 'utf8');

const pathToJson1 = path.resolve(__dirname, '__fixtures__/before.json');
const pathToJson2 = path.resolve(__dirname, '__fixtures__/after.json');

const pathToYml1 = path.resolve(__dirname, '__fixtures__/before.yml');
const pathToYml2 = path.resolve(__dirname, '__fixtures__/after.yml');

const pathToIni1 = path.resolve(__dirname, '__fixtures__/before.ini');
const pathToIni2 = path.resolve(__dirname, '__fixtures__/after.ini');

const casesNested = [[pathToJson1, pathToJson2, result], [pathToIni1, pathToIni2, result],
  [pathToYml1, pathToYml2, result]];

const casesPlain = [[pathToJson1, pathToJson2, resultPlain], [pathToIni1, pathToIni2, resultPlain],
  [pathToYml1, pathToYml2, resultPlain]];

const casesJson = [[pathToJson1, pathToJson2, resultJson], [pathToIni1, pathToIni2, resultJson],
  [pathToYml1, pathToYml2, resultJson]];

describe("'gendiff' utility ", () => {
  test.each(casesNested)('genDiff(%p,\n %p), \n return %p',
    (firstArg, secondArg, expectedResult) => {
      const format = 'pretty';
      const resulted = gendiff(firstArg, secondArg, format);
      expect(resulted).toEqual(expectedResult);
    });
  test.each(casesPlain)('genDiff(%p,\n %p), \n return %p',
    (firstArg, secondArg, expectedResult) => {
      const format = 'plain';
      const resulted = gendiff(firstArg, secondArg, format);
      expect(resulted).toEqual(expectedResult);
    });
  test.each(casesJson)('genDiff(%p,\n %p), \n return %p',
    (firstArg, secondArg, expectedResult) => {
      const format = 'json';
      const resulted = gendiff(firstArg, secondArg, format);
      expect(resulted).toEqual(expectedResult);
    });
});
