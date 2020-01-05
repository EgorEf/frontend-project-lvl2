import getPlainRender from './plain';
import getPrettyRender from './pretty';
import getJsonRender from './jsonFormat';

const renders = [
  {
    render: (ast) => getPlainRender(ast),
    check: (format) => (format === 'plain'),
  },
  {
    render: (ast) => getPrettyRender(ast),
    check: (format) => (format === 'pretty'),
  },
  {
    render: (ast) => getJsonRender(ast),
    check: (format) => (format === 'json'),
  },
];

export default (ast, f) => {
  const result = renders.find(({ check }) => check(f)).render(ast);
  return result;
};
