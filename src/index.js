import path from 'path';
import fs from 'fs';
import parsing from './parsers';
import getAst from './ast';
import rendering from './formatters/selector';

const readFile = (pathUser) => {
  const absolutionPath = path.resolve(pathUser);
  const data = fs.readFileSync(absolutionPath, 'utf8');
  return data;
};

export default(firstConfig, secondConfig, format) => {
  const key1 = path.extname(firstConfig);
  const key2 = path.extname(secondConfig);
  const data1 = readFile(firstConfig);
  const data2 = readFile(secondConfig);
  const obj1 = parsing(key1, data1);
  const obj2 = parsing(key2, data2);
  const ast = getAst(obj1, obj2);
  const result = rendering(ast, format);
  return result;
};
