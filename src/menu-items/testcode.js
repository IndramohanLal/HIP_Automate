// assets
import { IconBrandChrome, IconHelp, IconArrowsMoveVertical, IconScan, IconBook, IconFileDownload, IconFileUpload } from '@tabler/icons';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'test-code',
  title: "Test the Code",
  type: 'group',
  children: [
    {
      id: 'responses',
      title: 'Responses',
      type: 'item',
      url: "/response",
      icon: <IconArrowsMoveVertical/>,
      breadcrumbs: false
    },
    {
      id: 'tests',
      title: 'Tests',
      type: 'item',
      url: "/test-code",
      icon: <IconScan/>,
      breadcrumbs: false
    },
    {
      id: "upload Script",
      title: 'Upload Script',
      type: 'item',
      url: "/upload-script",
      icon: <IconFileUpload/>,
      breadcrumbs: false
    },
    {
      id: 'generate-readme',
      title: 'Generate ReadMe',
      type: 'item',
      url: "/generate-readme",
      icon: <IconBook/>,
      breadcrumbs: false
    },
  ]
};

export default other;