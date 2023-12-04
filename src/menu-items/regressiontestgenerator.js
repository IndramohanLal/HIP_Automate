// assets
import { IconBrandChrome, IconHelp,IconCodeCircle2 } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  title: "Regression Test Generator",
  type: 'group',
  children: [
    {
      id: 'regression-test-generator',
      title: 'Test Cases',
      type: 'item',
      url: '/sample-page',
      icon: IconCodeCircle2,
      breadcrumbs: false
    },
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/berry/',
    //   icon: icons.IconHelp,
    //   external: true,
    //   target: true
    // }
  ]
};

export default other;
