const getСorrectViev = (element) => {
  if (element instanceof Object) {
    return '[complex value]';
  }
  if (typeof element === 'string') {
    return `'${element}'`;
  }
  return element;
};

const renders = [
  {
    proces: (name, v1, v2) => `Property '${name}' was added with value: ${getСorrectViev(v2)}`,
    check: status => (status === 'added'),
  },
  {
    proces: (name, v1, v2) => `Property '${name}' was updated. From ${getСorrectViev(v1)} to ${getСorrectViev(v2)}`,
    check: status => (status === 'edited'),
  },
  {
    proces: name => `Property '${name}' was removed`,
    check: status => (status === 'deleted'),
  },
];

const getProcess = v => (
  renders.find(({ check }) => check(v))
);

const filtrator = v => (v.status !== 'unchanged' || v.type === 'obj');

const getResultArr = (arr, newAcc = [], fullName = []) => {
  const filteredArr = arr.filter(filtrator);
  const resultArr = filteredArr.reduce((acc, v) => {
    const currentName = [...fullName, v.name];
    if (v.type === 'obj') {
      return getResultArr(v.children, acc, currentName);
    }
    const { proces } = getProcess(v.status);
    const element = proces(currentName.join('.'), v.beforeValue, v.afterValue);
    return [...acc, [element]];
  }, newAcc);
  return resultArr;
};

const getPlainRender = ast => getResultArr(ast).join('\n');
export default getPlainRender;
