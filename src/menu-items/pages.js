import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: "Pages",
  type: 'group',
  children: [
    {
      id: 'user-pages',
      title: 'User Pages',
      type: 'item',
      url: '',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
  ]
};

export default pages;
