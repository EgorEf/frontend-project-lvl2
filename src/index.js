import path from 'path';
import fs from 'fs';
import parser from './parsers';
import getAst from './ast';
import getRender from './renders';

const readFile = (pathUser) => {
  const absolutionPath = path.resolve(pathUser);
  const data = fs.readFileSync(absolutionPath, 'utf8');
  return data;
};
export default(firstConfig, secondConfig) => {
  const format1 = path.extname(firstConfig);
  const format2 = path.extname(secondConfig);
  const data1 = readFile(firstConfig);
  const data2 = readFile(secondConfig);
  const obj1 = parser(format1, data1);
  const obj2 = parser(format2, data2);
  const ast = getAst(obj1, obj2);
  const render = getRender(ast);
  return render;
};
