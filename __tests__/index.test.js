import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getExpectedResult = (absolutionPath) => fs.readFileSync(absolutionPath, 'utf8');

const pathToResultPretty = path.resolve(__dirname, '__fixtures__/result.txt');
const pathToResultPlain = path.resolve(__dirname, '__fixtures__/resultPlain.txt');
const pathToResultJson = path.resolve(__dirname, '__fixtures__/resultJSON.txt');

const pathToJson1 = path.resolve(__dirname, '__fixtures__/before.json');
const pathToJson2 = path.resolve(__dirname, '__fixtures__/after.json');

const pathToYml1 = path.resolve(__dirname, '__fixtures__/before.yml');
const pathToYml2 = path.resolve(__dirname, '__fixtures__/after.yml');

const pathToIni1 = path.resolve(__dirname, '__fixtures__/before.ini');
const pathToIni2 = path.resolve(__dirname, '__fixtures__/after.ini');

const format1 = 'pretty';
const format2 = 'plain';
const format3 = 'json';

const cases = [[format1, pathToJson1, pathToJson2, pathToResultPretty],
  [format1, pathToIni1, pathToIni2, pathToResultPretty],
  [format1, pathToYml1, pathToYml2, pathToResultPretty],
  [format2, pathToJson1, pathToJson2, pathToResultPlain],
  [format2, pathToIni1, pathToIni2, pathToResultPlain],
  [format2, pathToYml1, pathToYml2, pathToResultPlain],
  [format3, pathToJson1, pathToJson2, pathToResultJson],
  [format3, pathToIni1, pathToIni2, pathToResultJson],
  [format3, pathToYml1, pathToYml2, pathToResultJson]];

test.each(cases)('format: %s\ngenDiff(%p,\n %p)',
  (format, firstArg, secondArg, pathToResult) => {
    expect(genDiff(firstArg, secondArg, format)).toEqual(getExpectedResult(pathToResult));
  });
