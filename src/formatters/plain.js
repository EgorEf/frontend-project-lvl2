import _ from 'lodash';

const getСorrectViev = (element) => {
  if (element instanceof Object) {
    return '[complex value]';
  }
  if (typeof element === 'string') {
    return `'${element}'`;
  }
  return element;
};

const renders = {
  added: (names, v) => `Property '${names.join('.')}' was added with value: ${getСorrectViev(v)}`,
  edited: (names, v) => `Property '${names.join('.')}' was updated. From ${getСorrectViev(v.before)} to ${getСorrectViev(v.after)}`,
  deleted: (names) => `Property '${names.join('.')}' was removed`,
  nested: (names, v, children, getChildren) => getChildren(children, names),
};

const filtrator = (v) => (v.status !== 'unchanged');

const getResultArr = (arr, fullName = []) => {
  const filteredArr = arr.filter(filtrator);
  const resultArr = filteredArr.map((node) => {
    const currentName = [...fullName, node.name];
    const render = renders[node.status];
    const element = render(currentName, node.value, node.children, getResultArr);
    return element;
  });
  return _.flattenDeep(resultArr);
};

export default (ast) => getResultArr(ast).join('\n');
