import _ from 'lodash';

const typesNode = [
  {
    status: 'added',
    getResult: (obj1, obj2) => _.identity(obj2),
    getNode: (name, status, result) => ({ name, status, value: result }),
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    status: 'edited',
    getResult: (obj1, obj2) => ({ before: obj1, after: obj2 }),
    getNode: (name, status, result) => ({ name, status, value: result }),
    check: (obj1, obj2, key) => (_.has(obj2, key) && _.has(obj1, key) && (obj2[key] !== obj1[key]))
    && !(obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
  {
    status: 'deleted',
    getResult: (obj1) => _.identity(obj1),
    getNode: (name, status, result) => ({ name, status, value: result }),
    check: (obj1, obj2, key) => (!_.has(obj2, key)),
  },
  {
    status: 'unchanged',
    getResult: (obj1) => _.identity(obj1),
    getNode: (name, status, result) => ({ name, status, value: result }),
    check: (obj1, obj2, key) => (obj2[key] === obj1[key]) && (_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    status: 'nested',
    getResult: (obj1, obj2, func) => func(obj1, obj2),
    getNode: (name, status, result) => ({ name, status, children: result }),
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
    const { status, getResult, getNode } = identification(obj1, obj2, key);
    const resultForNode = getResult(obj1[key], obj2[key], getAst);
    const node = getNode(key, status, resultForNode);
    return node;
  });
  return result;
};
export default getAst;
