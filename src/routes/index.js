import MainLayout from 'layout/MainLayout';
import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
// routes

import Loadable from 'ui-component/Loadable';
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
import Login from 'views/pages/authentication/authentication3/Login3';
import { useSelector } from 'react-redux';
import Dashboard from 'views/dashboard/Default';
import SamplePage from 'views/sample-page';
import DataDisplay from 'views/dowloadPDF/downloadPDF'
import Register from 'views/pages/authentication/authentication3/Register3';
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
// ==============================|| ROUTING RENDER ||============================== //


export default function ThemeRoutes() {
  const isAuth = localStorage.getItem("isLoggedIn")

  return useRoutes([
    {
      path: '/',
      element: isAuth ? <MainLayout /> : <Login />,
      children: [
        { path: 'dashboard/default', element: <Dashboard /> },
        { path: 'sample-page', element: <SamplePage /> },
        { path: '', element: <Dashboard /> },
        { path: 'viewScript', element: <DataDisplay /> }
      ],
    },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
  ]);
}