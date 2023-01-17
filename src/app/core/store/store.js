import { configureStore } from '@reduxjs/toolkit'
import EcommerceReducer from 'app/template/redux/reducers/EcommerceReducer'
import NavigationReducer from 'app/template/redux/reducers/NavigationReducer'
import NotificationReducer from 'app/template/redux/reducers/NotificationReducer'
import ScrumBoardReducer from 'app/template/redux/reducers/ScrumBoardReducer'
import ParametreSlice from './parametrage/ParametreSlice'
import UISlice from './generic/UISlice'
import OrganisationSlice from './securite/OrganisationSlice'
import UtilisateurSlice from './securite/UtilisateurSlice'

const store = configureStore({
    reducer: {
        parametre: ParametreSlice.reducer,
        organisation: OrganisationSlice.reducer,
        utilisateur: UtilisateurSlice.reducer,
        ui: UISlice.reducer,
        notifications: NotificationReducer,
        navigations: NavigationReducer,
        scrumboard: ScrumBoardReducer,
        ecommerce: EcommerceReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export default store
