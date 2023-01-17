import MatxLayout from '../../template/components/MatxLayout/MatxLayout'
import AuthGuard from '../pages/securite/login/AuthGuard'
import { Navigate } from 'react-router-dom'
import NotFound from '../pages/notFound/NotFound'
import Login from '../pages/securite/login/Login'
import React from 'react'
import ParametrageRoutes from '../pages/parametrage/ParametrageRoutes'
import HomeRoutes from '../pages/home/HomeRoutes'
import Loading from 'app/template/components/MatxLoading/MatxLoading'

export const ApplicationPages = () => {
    return [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [...HomeRoutes, ...ParametrageRoutes],
        },
        {
            path: '/',
            element: <Navigate to="signin" />,
        },
        {
            path: '/signin',
            element: <Login />,
        },
        {
            path: '/loading',
            element: <Loading />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
}
