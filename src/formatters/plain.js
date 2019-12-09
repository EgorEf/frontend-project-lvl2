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

const renders = [
  {
    render: (arrNames, v) => `Property '${arrNames.join('.')}' was added with value: ${getСorrectViev(v)}`,
    check: status => (status === 'added'),
  },
  {
    render: (arrNames, v) => `Property '${arrNames.join('.')}' was updated. From ${getСorrectViev(v.before)} to ${getСorrectViev(v.after)}`,
    check: status => (status === 'edited'),
  },
  {
    render: arrNames => `Property '${arrNames.join('.')}' was removed`,
    check: status => (status === 'deleted'),
  },
  {
    render: (arrNames, v, child, func) => func(child, arrNames),
    check: status => (status === 'nested'),
  },
];

const getRender = v => (
  renders.find(({ check }) => check(v))
);

const filtrator = v => (v.status !== 'unchanged' || v.status === 'nested');

const getResultArr = (arr, fullName = []) => {
  const filteredArr = arr.filter(filtrator);
  const resultArr = filteredArr.reduce((acc, node) => {
    const currentName = [...fullName, node.name];
    const { render } = getRender(node.status);
    const element = render(currentName, node.value, node.children, getResultArr);
    return [...acc, element];
  }, []);
  return _.flattenDeep(resultArr);
};

export default ast => getResultArr(ast).join('\n');
