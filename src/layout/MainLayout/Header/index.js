import PropTypes from 'prop-types';

// material-ui
import { Avatar, Box, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import LogoSection from '../LogoSection';

import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import WelcomeMsg from './WelcomeMsg';
import Dropdown from './Dropdown';
import Datepicker from './Datepicker';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>

        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: "#00cca5",
              color: theme.palette.secondary.light,
              '&:hover': {
                background: "#80e8cc",
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 3 }}>
        <WelcomeMsg />
      </Box>
      <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 0.5 }}>
        <Dropdown />
      </Box>
      <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 0.5 }}>
        <Datepicker />
      </Box>
      <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 0.5 }}>
        <SearchIcon />
      </Box>
      <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 0.5 }}>
        <MailOutlineIcon />
      </Box>
      <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 0.5 }}>
        <NotificationsNoneIcon />
      </Box>
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
