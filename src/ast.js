import _ from 'lodash';

const nodes = [
  {
    status: 'added',
    proces: (obj1, obj2) => _.identity(obj2),
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    status: 'edited',
    proces: (obj1, obj2) => ({ before: obj1, after: obj2 }),
    check: (obj1, obj2, key) => (_.has(obj2, key) && _.has(obj1, key) && (obj2[key] !== obj1[key]))
    && !(obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
  {
    status: 'deleted',
    proces: (obj1) => _.identity(obj1),
    check: (obj1, obj2, key) => (!_.has(obj2, key)),
  },
  {
    status: 'unchanged',
    proces: (obj1) => _.identity(obj1),
    check: (obj1, obj2, key) => (obj2[key] === obj1[key]) && (_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    status: 'nested',
    proces: (obj1, obj2, func) => func(obj1, obj2),
    check: (obj1, obj2, key) => (obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
];

const getNode = (firstObj, secondObj, key) => (
  nodes.find(({ check }) => check(firstObj, secondObj, key))
);

const getResultArr = (obj1, obj2) => {
  const arr1 = Object.keys(obj1);
  const arr2 = Object.keys(obj2);
  const filtered = arr2.filter((key) => !_.has(obj1, key));
  return arr1.concat(filtered);
};

const constructorNodes = {
  nested: (name, status, result) => ({ name, status, children: result }),
  unchanged: (name, status, result) => ({ name, status, value: result }),
  deleted: (name, status, result) => ({ name, status, value: result }),
  edited: (name, status, result) => ({ name, status, value: result }),
  added: (name, status, result) => ({ name, status, value: result }),
};

const getAst = (obj1, obj2) => {
  const resultArr = getResultArr(obj1, obj2);
  const reduced = resultArr.reduce((acc, key) => {
    const { status, proces } = getNode(obj1, obj2, key);
    const name = key;
    const resultForNode = proces(obj1[key], obj2[key], getAst);
    const node = constructorNodes[status](name, status, resultForNode);
    return [...acc, node];
  }, []);
  return reduced;
};
export default getAst;
