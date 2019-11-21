import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parsing from './parsers';

const readFile = (pathing) => {
  const absolutionPath = path.resolve(pathing);
  const data = fs.readFileSync(absolutionPath, 'utf8');
  return data;
};
const gendiff = (firstConfig, secondConfig) => {
  const format1 = path.extname(firstConfig);
  const format2 = path.extname(secondConfig);
  const data1 = readFile(firstConfig);
  const data2 = readFile(secondConfig);
  const obj1 = parsing(format1, data1);
  const obj2 = parsing(format2, data2);
  const arr1 = Object.entries(obj1);
  const arr2 = Object.entries(obj2);
  const filtered = arr2.filter(([key]) => !_.has(obj1, key));
  const arr = arr1.concat(filtered);
  const reduced = arr.reduce((acc, [key, value]) => {
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
  const exit = `{\n${result}\n}`;
  return exit;
};

export default gendiff;
