import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import LineChart from './LineChart';
import RadialBarChart from './RadialBarChart';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#00cca5",
    },
  },
});

let visitsData = [{ "total_visitors": "26.80" }, { "visits_per_day": "1065" }]

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);


  let data = [
    { "title": "Positive Test Case", "stat": "32.53%", "fluctuation": "+0.5" },
    { "title": "Negative Test Case", "stat": "32.53%", "fluctuation": "+0.5" },
    { "title": "Total API Tested", "stat": "32.53%", "fluctuation": "+0.5" },
    { "title": "Avg. Response Time", "stat": "32.53%", "fluctuation": "+0.5" },
    { "title": "Avg. Code Execution", "stat": "32.53%", "fluctuation": "+0.5" },
  ];

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", flexDirection: "row" }}>
            <ThemeProvider theme={Theme}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Audiences" {...a11yProps(1)} />
                <Tab label="Demographics" {...a11yProps(2)} />
                <Tab label="More" {...a11yProps(3)} />
              </Tabs>
            </ThemeProvider>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <Button variant="outlined" sx={{ marginRight: "20px", width: "20px", height: "20px", color: '#697586', border: "0.5px solid #00cca5" }}>
                <ShareIcon fontSize="12px" />
                &nbsp;Share</Button>
              <Button variant="outlined" sx={{ marginRight: "20px", width: "20px", height: "20px", color: '#697586', border: "0.5px solid #00cca5" }}>
                <PrintIcon fontSize="12px" />
                &nbsp;Print</Button>
              <Button
                variant="contained"
                sx={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#00cca5",
                  color: 'white',
                  '&:hover': {
                    backgroundColor: "#80e8cc",
                  },
                }}
              >
                <SystemUpdateAltIcon fontSize="12px" />
                &nbsp;Export
              </Button>
            </div>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Grid container spacing={gridSpacing}>
                    {data.map((eachData, index) => (
                      <Grid item key={index} lg={2} md={4} sm={6} xs={12} sx={{ marginRight: "25px" }}>
                        <EarningCard isLoading={isLoading} data={eachData} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={8}>
                  <LineChart />
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadialBarChart visitsData={visitsData[0]} />
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadialBarChart visitsData={visitsData[1]} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={8}>
                  <TotalGrowthBarChart isLoading={isLoading} />
                </Grid>
                <Grid item xs={12} md={4}>
                  {/* <PopularCard isLoading={isLoading} /> */}
                </Grid>
              </Grid>
            </Grid>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>

      </Grid>


    </Grid >
  );
};

export default Dashboard;
