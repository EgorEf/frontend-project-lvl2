import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const gendiff = (firstConfig, secondConfig) => {
  const firstPath = path.resolve(firstConfig);
  const secondPath = path.resolve(secondConfig);
  const jsonFormat1 = fs.readFileSync(firstPath, 'utf8');
  const jsonFormat2 = fs.readFileSync(secondPath, 'utf8');
  const data1 = JSON.parse(jsonFormat1);
  const data2 = JSON.parse(jsonFormat2);
  const arr1 = Object.entries(data1);
  const arr2 = Object.entries(data2);
  const filtered = arr2.filter(([key]) => !_.has(data1, key));
  const arr = arr1.concat(filtered);
  const reduced = arr.reduce((acc, [key, value]) => {
    if (_.has(data2, key) && !_.has(data1, key)) {
      return [...acc, `  + ${key}: ${value}`];
    }
    if (_.has(data2, key) && data2[key] !== value) {
      return [...acc, `  + ${key}: ${data2[key]}`, `  - ${key}: ${value}`];
    }
    if (!_.has(data2, key)) {
      return [...acc, `  - ${key}: ${value}`];
    }
    return [...acc, `    ${key}: ${value}`];
  }, []);
  const result = reduced.join('\n');
  const exit = `{\n${result}\n}`;
  return exit;
};

export default gendiff;
