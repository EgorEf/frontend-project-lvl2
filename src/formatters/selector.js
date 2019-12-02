import getPlainRender from './plain';
import getPrettyRender from './pretty';
import getJsonRender from './jsonFormat';

const renders = [
  {
    render: ast => getPlainRender(ast),
    check: format => (format === 'plain'),
  },
  {
    render: ast => getPrettyRender(ast),
    check: format => (format === 'pretty'),
  },
  {
    render: ast => getJsonRender(ast),
    check: format => (format === 'json'),
  },
];

const getRender = v => (
  renders.find(({ check }) => check(v))
);
export default getRender;
