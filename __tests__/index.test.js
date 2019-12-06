import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getResult = absolutionPath => fs.readFileSync(absolutionPath, 'utf8');

const pathToResultPretty = path.resolve(__dirname, '__fixtures__/result.txt');
const pathToResultPlain = path.resolve(__dirname, '__fixtures__/resultPlain.txt');
const pathToResultJson = path.resolve(__dirname, '__fixtures__/resultJSON.txt');

const pathToJson1 = path.resolve(__dirname, '__fixtures__/before.json');
const pathToJson2 = path.resolve(__dirname, '__fixtures__/after.json');

const pathToYml1 = path.resolve(__dirname, '__fixtures__/before.yml');
const pathToYml2 = path.resolve(__dirname, '__fixtures__/after.yml');

const pathToIni1 = path.resolve(__dirname, '__fixtures__/before.ini');
const pathToIni2 = path.resolve(__dirname, '__fixtures__/after.ini');

const casesPretty = [[pathToJson1, pathToJson2, pathToResultPretty],
  [pathToIni1, pathToIni2, pathToResultPretty], [pathToYml1, pathToYml2, pathToResultPretty]];

const casesPlain = [[pathToJson1, pathToJson2, pathToResultPlain],
  [pathToIni1, pathToIni2, pathToResultPlain], [pathToYml1, pathToYml2, pathToResultPlain]];

const casesJson = [[pathToJson1, pathToJson2, pathToResultJson],
  [pathToIni1, pathToIni2, pathToResultJson], [pathToYml1, pathToYml2, pathToResultJson]];

test.each(casesPretty)('genDiff(%p,\n %p)',
  (firstArg, secondArg, pathToResult) => {
    const format = 'pretty';
    const result = gendiff(firstArg, secondArg, format);
    const expectedResult = getResult(pathToResult);
    expect(result).toEqual(expectedResult);
  });
test.each(casesPlain)('genDiff(%p,\n %p)',
  (firstArg, secondArg, pathToResult) => {
    const format = 'plain';
    const result = gendiff(firstArg, secondArg, format);
    const expectedResult = getResult(pathToResult);
    expect(result).toEqual(expectedResult);
  });
test.each(casesJson)('genDiff(%p,\n %p)',
  (firstArg, secondArg, pathToResult) => {
    const format = 'json';
    const result = gendiff(firstArg, secondArg, format);
    const expectedResult = getResult(pathToResult);
    expect(result).toEqual(expectedResult);
  });
