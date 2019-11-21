import yaml from 'js-yaml';

export default(key, data) => {
  let pars;
  if (key === '.json') {
    pars = JSON.parse;
  }
  if (key === '.yml') {
    pars = yaml.safeLoad;
  }
  return pars(data);
};
