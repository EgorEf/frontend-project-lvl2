import path from 'path';
import fs from 'fs';
import parsing from './parsers';
import getAst from './ast';
import rendering from './formatters';

const readFile = (pathUser) => {
  const absolutionPath = path.resolve(pathUser);
  const data = fs.readFileSync(absolutionPath, 'utf8');
  return data;
};

const types = [
  {
    type: 'json',
    check: extension => extension === '.json',
  },
  {
    type: 'yml',
    check: extension => extension === '.yml',
  },
  {
    type: 'ini',
    check: extension => extension === '.ini',
  },
];

const getType = (config) => {
  const extension = path.extname(config);
  return types.find(({ check }) => check(extension)).type;
};

export default(firstConfig, secondConfig, format) => {
  const type1 = getType(firstConfig);
  const type2 = getType(secondConfig);
  const data1 = readFile(firstConfig);
  const data2 = readFile(secondConfig);
  const obj1 = parsing(type1, data1);
  const obj2 = parsing(type2, data2);
  const ast = getAst(obj1, obj2);
  const result = rendering(ast, format);
  return result;
};
