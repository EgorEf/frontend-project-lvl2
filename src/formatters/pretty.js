const standartSpace = ' '.repeat(4);

const getStringFromObj = (element, space) => {
  if (!(element instanceof Object)) {
    return element;
  }
  const key = Object.keys(element).join();
  return `{\n${space}${standartSpace}${key}: ${element[key]}\n${space}}`;
};

const getSpace = (space, symbol) => {
  const correctSpace = space.slice(1, space.length - 1);
  return `${correctSpace}${symbol} `;
};

const renders = {
  added: (name, space, value) => `${getSpace(space, '+')}${name}: ${getStringFromObj(value, space)}`,
  edited: (name, space, value) => (
    `${getSpace(space, '-')}${name}: ${getStringFromObj(value.before, space)}\n${getSpace(space, '+')}${name}: ${getStringFromObj(value.after, space)}`
  ),
  deleted: (name, space, value) => `${getSpace(space, '-')}${name}: ${getStringFromObj(value, space)}`,
  unchanged: (name, space, value) => `${space}${name}: ${value}`,
  nested: (name, space, value, children, func) => `${space}${name}: ${func(children, space)}`,
};

const getRender = (ast, currentSpace = '') => {
  const space = `${currentSpace}${standartSpace}`;
  const result = ast.map((node) => {
    const render = renders[node.status];
    const element = render(node.name, space, node.value, node.children, getRender);
    return element;
  });
  const string = result.join('\n');
  return `{\n${string}\n${currentSpace}}`;
};
export default getRender;
