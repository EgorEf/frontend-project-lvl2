
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
    render: (name, space, value) => `${getSpace(space)}+ ${name}: ${getStringFromObj(value, space)}`,
    check: status => (status === 'added'),
  },
  {
    render: (name, space, value) => (
      `${getSpace(space)}- ${name}: ${getStringFromObj(value.before, space)}\n${getSpace(space)}+ ${name}: ${getStringFromObj(value.after, space)}`
    ),
    check: status => (status === 'edited'),
  },
  {
    render: (name, space, value) => `${getSpace(space)}- ${name}: ${getStringFromObj(value, space)}`,
    check: status => (status === 'deleted'),
  },
  {
    render: (name, space, value) => `${space}${name}: ${value}`,
    check: status => (status === 'unchanged'),
  },
  {
    render: (name, space, value, children, func) => `${space}${name}: ${func(children, space)}`,
    check: status => (status === 'nested'),
  },
];

const getRenderForNode = v => (
  renders.find(({ check }) => check(v))
);

const standartSpace = ' '.repeat(4);

const getRender = (ast, currentSpace = '') => {
  const correctSpace = `${currentSpace}${standartSpace}`;
  const result = ast.reduce((acc, node) => {
    const { render } = getRenderForNode(node.status);
    const element = render(node.name, correctSpace, node.value, node.children, getRender);
    return [...acc, element];
  }, []);
  const string = result.join('\n');
  return `{\n${string}\n${currentSpace}}`;
};
export default getRender;
