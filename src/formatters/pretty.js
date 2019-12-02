
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
    proces: (key, space, v1, v2) => `${getSpace(space)}+ ${key}: ${getStringFromObj(v2, space)}`,
    check: status => (status === 'added'),
  },
  {
    proces: (key, space, v1, v2) => (
      `${getSpace(space)}- ${key}: ${getStringFromObj(v1, space)}\n${getSpace(space)}+ ${key}: ${getStringFromObj(v2, space)}`
    ),
    check: status => (status === 'edited'),
  },
  {
    proces: (key, space, v1) => `${getSpace(space)}- ${key}: ${getStringFromObj(v1, space)}`,
    check: status => (status === 'deleted'),
  },
  {
    proces: (key, space, v1) => `${space}${key}: ${v1}`,
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
