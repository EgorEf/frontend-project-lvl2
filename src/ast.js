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
const getAst = (obj1, obj2) => {
  const arr1 = Object.keys(obj1);
  const arr2 = Object.keys(obj2);
  const filtered = arr2.filter(key => !_.has(obj1, key));
  const results = arr1.concat(filtered);
  const reduced = results.reduce((acc, v) => {
    const node = {
      name: v,
      type: getType(obj1, obj2, v),
      status: '',
      beforeValue: '',
      afterValue: '',
    };
    node.status = getStatus(obj1, obj2, v, node.type);
    if (node.type === 'obj') {
      node.children = getAst(obj1[v], obj2[v]);
      return [...acc, node];
    }
    node.beforeValue = obj1[v] || null;
    node.afterValue = (obj2[v] === false) ? false : obj2[v] || null;
    node.children = [];
    return [...acc, node];
  }, []);
  return reduced;
};
export default getAst;
