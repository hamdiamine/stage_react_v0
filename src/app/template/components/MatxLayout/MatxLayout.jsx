import React from 'react'
import { MatxLayouts } from './index'
import { MatxSuspense } from 'app/template/components'
import useSettings from 'app/template/hooks/useSettings'
import UINotification from '../../../core/components/generic/uiNotification/UINotification'
import Loading from '../MatxLoading/MatxLoading'
import { useSelector } from 'react-redux'
import NetworkError from 'app/core/components/generic/networkError/NetworkError'

const MatxLayout = (props) => {
    const { settings } = useSettings()
    const Layout = MatxLayouts[settings.activeLayout]
    const loadingAxios = useSelector((state) => state.ui.loadingAxios)
    const networkError = useSelector((state) => state.ui.networkError)


    return (
        <MatxSuspense>
            {networkError && <NetworkError />}
            {loadingAxios > 0 && <Loading />}
            <Layout {...props} />
            <UINotification />
        </MatxSuspense>
    )
}

export default MatxLayout
