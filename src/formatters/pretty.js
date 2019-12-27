const getSpace = (counter, symb = '  ') => {
  const space = ' '.repeat(counter * 4);
  const correctSpace = space.slice(1, space.length - 1);
  return (counter !== 0) ? `${correctSpace}${symb}` : '';
};

const renderSingleObj = (element, count) => {
  if (!(element instanceof Object)) {
    return element;
  }
  const key = Object.keys(element).join();
  return `{\n${getSpace(count + 1)}${key}: ${element[key]}\n${getSpace(count)}}`;
};

const renders = {
  added: (name, count, value) => `${getSpace(count, '+ ')}${name}: ${renderSingleObj(value, count)}`,
  edited: (name, count, value) => (
    `${getSpace(count, '- ')}${name}: ${renderSingleObj(value.before, count)}\n${getSpace(count, '+ ')}${name}: ${renderSingleObj(value.after, count)}`
  ),
  deleted: (name, count, value) => `${getSpace(count, '- ')}${name}: ${renderSingleObj(value, count)}`,
  unchanged: (name, count, value) => `${getSpace(count)}${name}: ${value}`,
  nested: (name, count, value, children, getChildren) => `${getSpace(count)}${name}: ${getChildren(children, count + 1)}`,
};

const getRender = (ast, counter = 1) => {
  const result = ast.map((node) => {
    const render = renders[node.status];
    const element = render(node.name, counter, node.value, node.children, getRender);
    return element;
  });
  const string = result.join('\n');
  return `{\n${string}\n${getSpace(counter - 1)}}`;
};
export default getRender;
