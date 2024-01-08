import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Divider, Typography, ListItemButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
import {
  ListItemIcon,
} from '@mui/material';
import { IconBrandChrome, IconHelp, IconCodeCircle2, IconBook, IconFileText, IconFile } from '@tabler/icons';
import CircleIcon from '@mui/icons-material/Circle';
import { IconDashboard } from '@tabler/icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import CheckIcon from '@mui/icons-material/Check';
import NetworkCheckSharpIcon from '@mui/icons-material/NetworkCheckSharp';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';

// ... (previous imports)

// ... (previous imports)

const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;


const NavGroup = ({ item }) => {
  
  const theme = useTheme();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleAccordionToggle = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const titleIcon = [
    // <CheckIcon key="check" />,
    <NetworkCheckIcon key="network-check" />,
  ];

  return (
    <>
      {item.title === "dashboard" && (
        <ListItemButton
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            ...theme.typography.menuCaption,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemButton component={Link} to={item.children[0].url} sx={{ display: 'block' }}>
            <Typography variant="body1">{item.title}</Typography>
          </ListItemButton>
        </ListItemButton>
      )}
      {item.title === "Test Generator" && (
        <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              ...theme.typography.menuCaption,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '-15px',
              marginBottom:"-15px"
            }}
          >
              <ListItemIcon><CreateSharpIcon /></ListItemIcon>
            <Typography ml={1}>{item.title}</Typography>
          
        
            
          </AccordionSummary>

          <AccordionDetails>
            {item.children?.map((menu, index) => (
              <ListItemButton key={index} component={Link} to={menu.url} sx={{ display: 'flex', alignItems: 'center', width: "100%", marginLeft:"-20px"}}>
                {menu.icon}
                <Typography ml={1}>{menu.title}</Typography>
              </ListItemButton>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
      {item.title === "Test the Code" && (
        <Accordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              ...theme.typography.menuCaption,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '-15px',
              marginBottom:"-15px"
            }}
          >
             <ListItemIcon><NetworkCheckSharpIcon/></ListItemIcon>
             <Typography ml={1}>{item.title}</Typography>

          </AccordionSummary>

          <AccordionDetails>
            {item.children?.map((menu, index) => (
              <ListItemButton key={index} component={Link} to={menu.url} sx={{ display: 'flex', alignItems: 'center', width: "100%", marginLeft:"-20px"}}>
                {menu.icon}
                <Typography ml={1}>{menu.title}</Typography>
              </ListItemButton>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
