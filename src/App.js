import { useSelector } from 'react-redux';

import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';
import Login from 'views/pages/authentication/authentication3/Login3';

import Dashboard from 'views/dashboard/Default';
import MainLayout from 'layout/MainLayout';
import { Navigate, Outlet, Route } from 'react-router';
import Register from 'views/pages/authentication/authentication3/Register3';
import SamplePage from 'views/sample-page';

// project imports

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const isAuth = useSelector((state) => state.automation.isLoggedin);
 

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <Routes>
          {/* <Route
            element={!isAuth ? <Outlet /> : <Navigate to={'/login'} />}
          >
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route element={isAuth ? <Outlet /> : <Navigate to={'/login'} />}>
            <Route element={<MainLayout />}>
              <Route path='/dashboard/default' element={<Dashboard />} />
              <Route path='/sample-page' element={<SamplePage />} />
            </Route>
          </Route> */}
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;