import _ from 'lodash';

const actualStatus = [
  {
    status: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    status: 'edited',
    check: (obj1, obj2, key, type) => (_.has(obj2, key) && _.has(obj1, key) && (obj2[key] !== obj1[key]) && (type !== 'obj')),
  },
  {
    status: 'deleted',
    check: (obj1, obj2, key) => (!_.has(obj2, key)),
  },
  {
    status: 'unchanged',
    check: (obj1, obj2, key) => (obj2[key] === obj1[key]) || (_.has(obj1, key) && _.has(obj2, key)),
  },
];

const getStatus = (firstObj, secondObj, key, type) => (
  actualStatus.find(({ check }) => check(firstObj, secondObj, key, type)).status
);

const types = [
  {
    type: 'obj',
    check: (obj1, obj2, key) => (obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
  {
    type: 'node',
    check: (obj1, obj2, key) => !(obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
];

const getType = (firstObj, secondObj, key) => (
  types.find(({ check }) => check(firstObj, secondObj, key)).type
);
const getResultArr = (obj1, obj2) => {
  const arr1 = Object.keys(obj1);
  const arr2 = Object.keys(obj2);
  const filtered = arr2.filter(key => !_.has(obj1, key));
  return arr1.concat(filtered);
};

const getAst = (obj1, obj2) => {
  const resultArr = getResultArr(obj1, obj2);
  const reduced = resultArr.reduce((acc, key) => {
    const node = {};
    node.name = key;
    node.type = getType(obj1, obj2, key);
    node.status = getStatus(obj1, obj2, key, node.type);
    if (node.type === 'obj') {
      node.children = getAst(obj1[key], obj2[key]);
      return [...acc, node];
    }
    node.beforeValue = obj1[key] || typeof obj1[key] === 'boolean' ? obj1[key] : null;
    node.afterValue = obj2[key] || typeof obj2[key] === 'boolean' ? obj2[key] : null;
    return [...acc, node];
  }, []);
  return reduced;
};
export default getAst;
