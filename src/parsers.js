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

const selector = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: iniParser,
};
export default (type, data) => selector[type](data);
