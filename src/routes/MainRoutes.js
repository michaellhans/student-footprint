import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('pages/dashboard/DashboardOverall')));
const Major = Loadable(lazy(() => import('pages/dashboard/DashboardMajor')));
const Student = Loadable(lazy(() => import('pages/dashboard/DashboardStudent')));
const DataView = Loadable(lazy(() => import('pages/dashboard/DataView')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'major',
            element: <Major />
        },
        {
            path: 'student',
            element: <Student />
        },
        {
            path: 'data-view',
            element: <DataView />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: '*',
            element: <Navigate to="/dashboard" />
        }
    ]
};

export default MainRoutes;
