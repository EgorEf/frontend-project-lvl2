
const getStringFromObj = (element, space) => {
  if (element instanceof Object) {
    const key = Object.keys(element)[0];
    const value = Object.values(element)[0];
    return `{\n${space}    ${key}: ${value}\n${space}}`;
  }
  return element;
};
const getSpace = space => space.slice(1, space.length - 1);
const renders = [
  {
    proces: (key, space, value1, value2) => `${getSpace(space)}+ ${key}: ${getStringFromObj(value2, space)}`,
    check: status => (status === 'added'),
  },
  {
    proces: (key, space, value1, value2) => `${getSpace(space)}- ${key}: ${getStringFromObj(value1, space)}\n${getSpace(space)}+ ${key}: ${getStringFromObj(value2, space)}`,
    check: status => (status === 'edited'),
  },
  {
    proces: (key, space, value1) => `${getSpace(space)}- ${key}: ${getStringFromObj(value1, space)}`,
    check: status => (status === 'deleted'),
  },
  {
    proces: (key, space, value1) => `${space}${key}: ${value1}`,
    check: status => (status === 'unchanged'),
  },
];
const getProcess = v => (
  renders.find(({ check }) => check(v))
);
const standartSpace = ' '.repeat(4);
const getRender = (ast, currentSpace = '') => {
  const correctSpace = `${currentSpace}${standartSpace}`;
  const result = ast.reduce((acc, v) => {
    if (v.type === 'obj') return [...acc, `${correctSpace}${v.name}: ${getRender(v.children, correctSpace)}`];
    const { proces } = getProcess(v.status);
    const element = proces(v.name, correctSpace, v.beforeValue, v.afterValue);
    return [...acc, element];
  }, []);
  const string = result.join('\n');
  return `{\n${string}\n${currentSpace}}`;
};
export default getRender;
