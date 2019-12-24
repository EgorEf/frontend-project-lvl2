import _ from 'lodash';

const typesNode = [
  {
    status: 'added',
    getNode: (name, status, firstValue, secondValue) => (
      { name, status, value: secondValue }
    ),
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    status: 'edited',
    getNode: (name, status, firstValue, secondValue) => (
      { name, status, value: { before: firstValue, after: secondValue } }
    ),
    check: (obj1, obj2, key) => (_.has(obj2, key) && _.has(obj1, key) && (obj2[key] !== obj1[key]))
    && !(obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
  {
    status: 'deleted',
    getNode: (name, status, firstValue) => ({ name, status, value: firstValue }),
    check: (obj1, obj2, key) => (!_.has(obj2, key)),
  },
  {
    status: 'unchanged',
    getNode: (name, status, firstValue) => ({ name, status, value: firstValue }),
    check: (obj1, obj2, key) => (obj2[key] === obj1[key]) && (_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    status: 'nested',
    getNode: (name, status, firstValue, secondValue, func) => (
      { name, status, children: func(firstValue, secondValue) }
    ),
    check: (obj1, obj2, key) => (obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
];

const identification = (firstObj, secondObj, key) => (
  typesNode.find(({ check }) => check(firstObj, secondObj, key))
);

const getUniqKeys = (obj1, obj2) => _.union(_.keys(obj1), _.keys(obj2));

const getAst = (obj1, obj2) => {
  const uniqKeys = getUniqKeys(obj1, obj2);
  const result = uniqKeys.map((key) => {
    const { status, getNode } = identification(obj1, obj2, key);
    const node = getNode(key, status, obj1[key], obj2[key], getAst);
    return node;
  });
  return result;
};
export default getAst;
