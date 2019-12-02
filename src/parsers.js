import yaml from 'js-yaml';
import ini from 'ini';

const iniParser = (data) => {
  const obj = ini.parse(data);
  const jsonString = JSON.stringify(obj);
  const parse = JSON.parse(jsonString, (k, v) => {
    if (typeof v === 'string' && v === v.toUpperCase()) {
      return Number(v);
    } return v;
  });
  return parse;
};

const obj = {
  '.json': d => JSON.parse(d),
  '.yml': d => yaml.safeLoad(d),
  '.ini': d => iniParser(d),
};
export default (key, data) => obj[key](data);
