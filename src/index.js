import path from 'path';
import fs from 'fs';
import parse from './parsers';
import getAst from './ast';
import getRender from './formatters';

const getType = (config) => path.extname(config).slice(1);

export default (path1, path2, format) => {
  const type1 = getType(path1);
  const type2 = getType(path2);
  const data1 = fs.readFileSync(path1, 'utf8');
  const data2 = fs.readFileSync(path2, 'utf8');
  const obj1 = parse(type1, data1);
  const obj2 = parse(type2, data2);
  const ast = getAst(obj1, obj2);
  const render = getRender(ast, format);
  return render;
};
