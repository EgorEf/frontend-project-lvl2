import yaml from 'js-yaml';
import ini from 'ini';

const obj = {
  '.json': d => JSON.parse(d),
  '.yml': d => yaml.safeLoad(d),
  '.ini': d => ini.parse(d),
};
export default (key, data) => obj[key](data);
