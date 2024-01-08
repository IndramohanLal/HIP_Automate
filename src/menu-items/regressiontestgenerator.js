// assets
import { IconBrandChrome, IconHelp,IconCodeCircle2, IconBook, IconFileText, IconFile } from '@tabler/icons';

import CheckIcon from '@mui/icons-material/Check';
// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  title: "Test Generator",
  type: 'group',
  icon:[<CheckIcon key="check"/>],
  children: [
    {
      id: 'regression-test-generator',
      title: 'Test Cases',
      type: 'item',
      url: '/sample-page',
      icon:<IconHelp/> ,
      breadcrumbs: false
    },
    {
      id: "generate Script using API logs",
      title: 'Generate Script Using API Logs',
      type: 'item',
      url: "/generate-script",
      icon: <IconFile/>,
      breadcrumbs: false
    },
    {
      id: "generate Script using PDF",
      title: 'Generate Script Using PDF',
      type: 'item',
      url: "/generate-pdf-script",
      icon: <IconFileText/>,
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
