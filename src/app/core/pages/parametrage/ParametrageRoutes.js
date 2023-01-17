import React, { lazy } from 'react'
import Loadable from '../../../template/components/Loadable/Loadable'

const Parametrage = Loadable(lazy(() => import("./Parametrage")))
const ParametresGeneraux = Loadable(lazy(() => import("./parametresGeneraux/ParametresGeneraux")))

const ParametrageRoutes = [
    {
        path: '/parametrage',
        element: <Parametrage />,
    },
    {
        path: '/parametrage/parametresgeneraux',
        element: <ParametresGeneraux />,
    }
]

export default ParametrageRoutes