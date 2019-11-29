import getPlainRender from './plain';
import getNestedRender from './nested';

const renders = [
  {
    render: ast => getPlainRender(ast),
    check: format => (format === 'plain'),
  },
  {
    render: ast => getNestedRender(ast),
    check: format => (format === 'nested'),
  },
];

const getRender = v => (
  renders.find(({ check }) => check(v))
);
export default getRender;
