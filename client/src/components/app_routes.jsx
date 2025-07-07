/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from './Loadable';
import Layout from './Layout/Layout';
import RouteGuard from './RouteGuard';
import Home from '../views/Home';
import Upload from './Upload';
import DemageAnalysis from './DemageAnalysis';
import Reports from './Reports';


/* ***Layouts**** */
const Auth = Loadable(lazy(() => import('../views/Auth/Auth')));
const Login = Loadable(lazy(() => import('../views/Auth/Login')));
const Register = Loadable(lazy(() => import('../views/Auth/Register')));
const Forget = Loadable(lazy(() => import('../views/Auth/Forget')));

const app_routes = [
    {
        path: "/auth",
        element: <RouteGuard><Auth /></RouteGuard>,
        children: [
            { path: '/auth/login', exact: true, element: <Login /> },
            { path: '/auth/register', exact: true, element: <Register /> },
            { path: "/auth/forget/:token?", exact: true, element: <Forget /> },
        ]
    },
    {
        path: '/',

        element: <RouteGuard> <Layout /></RouteGuard>,
        children: [
            { path: '', exact: true, element: <Navigate to="/home" /> },
            { path: '/home', exact: true, element: <Home /> },
            { path: '/upload', exact: true, element: <Upload /> },
            { path: '/demage-analysis', exact: true, element: <DemageAnalysis /> },
            { path: '/reports', exact: true, element: <Reports /> },
            { path: '*', element: <Navigate to="/home" /> },
        ],
    },

];

export default app_routes;
