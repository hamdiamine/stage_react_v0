import '../fake-db'
import React from 'react'
import { Provider } from 'react-redux'
import { MatxTheme } from 'app/template/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/core/contexts/AuthContext'
import { SettingsProvider } from 'app/template/contexts/SettingsContext'
import { ApplicationPages } from './core/routes/routes'
import store from './core/store/store'

const App = () => {
    const applicationPages = useRoutes(ApplicationPages())

    return (
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    {applicationPages}
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
}

export default App
