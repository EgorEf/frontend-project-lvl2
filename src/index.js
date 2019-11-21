import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parsers';

const readFile = (pathUser) => {
  const absolutionPath = path.resolve(pathUser);
  const data = fs.readFileSync(absolutionPath, 'utf8');
  return data;
};
const getResultArr = (firstObj, secondObj) => {
  const arr1 = Object.entries(firstObj);
  const arr2 = Object.entries(secondObj);
  const filtered = arr2.filter(([key]) => !_.has(firstObj, key));
  return arr1.concat(filtered);
};
const gendiff = (firstConfig, secondConfig) => {
  const format1 = path.extname(firstConfig);
  const format2 = path.extname(secondConfig);
  const data1 = readFile(firstConfig);
  const data2 = readFile(secondConfig);
  const obj1 = parser(format1, data1);
  const obj2 = parser(format2, data2);
  const resultArr = getResultArr(obj1, obj2);
  const reduced = resultArr.reduce((acc, [key, value]) => {
    if (_.has(obj2, key) && !_.has(obj1, key)) {
      return [...acc, `  + ${key}: ${value}`];
    }
    if (_.has(obj2, key) && obj2[key] !== value) {
      return [...acc, `  + ${key}: ${obj2[key]}`, `  - ${key}: ${value}`];
    }
    if (!_.has(obj2, key)) {
      return [...acc, `  - ${key}: ${value}`];
    }
    return [...acc, `    ${key}: ${value}`];
  }, []);
  const result = reduced.join('\n');
  return `{\n${result}\n}`;
};

export default gendiff;
