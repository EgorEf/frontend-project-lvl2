import _ from 'lodash';

const nodes = [
  {
    status: 'added',
    getValue: (first, second) => _.identity(second),
    getChild: () => '',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    status: 'edited',
    getValue: (first, second) => ({ before: first, after: second }),
    getChild: () => '',
    check: (obj1, obj2, key) => (_.has(obj2, key) && _.has(obj1, key) && (obj2[key] !== obj1[key]))
    && !(obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
  {
    status: 'deleted',
    getValue: first => _.identity(first),
    getChild: () => '',
    check: (obj1, obj2, key) => (!_.has(obj2, key)),
  },
  {
    status: 'unchanged',
    getValue: first => _.identity(first),
    getChild: () => '',
    check: (obj1, obj2, key) => (obj2[key] === obj1[key]) && (_.has(obj1, key) && _.has(obj2, key)),
  },
  {
    status: 'nested',
    getValue: () => '',
    getChild: (obj1, obj2, func) => func(obj1, obj2),
    check: (obj1, obj2, key) => (obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
];

const getNode = (firstObj, secondObj, key) => (
  nodes.find(({ check }) => check(firstObj, secondObj, key))
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
    const { status, getValue, getChild } = getNode(obj1, obj2, key);
    const name = key;
    const value = getValue(obj1[key], obj2[key], key);
    const children = getChild(obj1[key], obj2[key], getAst);
    const node = {
      name,
      status,
      value,
      children,
    };
    return [...acc, node];
  }, []);
  return reduced;
};
export default getAst;
