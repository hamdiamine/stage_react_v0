import { createSlice } from '@reduxjs/toolkit'

const UISlice = createSlice({
    name: 'ui',
    initialState: {
        notification: { open: false, status: null, message: null },
        affichDeleteDialog: false,
        submitted: false,
        loading: false,
        loadingAxios: 0,
        locale: 'fr',
        networkError: false
    },
    reducers: {
        reset(state) {
            state = UISlice.getInitialState()
        },
        setNotification(state, action) {
            state.notification = action.payload.notification
        },
        setAffichDeleteDialog(state, action) {
            state.affichDeleteDialog = action.payload.affichDeleteDialog
        },
        setSubmitted(state, action) {
            state.submitted = action.payload.submitted
        },
        setLoading(state, action) {
            state.loading = action.payload.loading
        },
        setLoadingAxios(state, action) {
            state.loadingAxios = action.payload.loadingAxios
        },
        incLoadingAxios(state, action) {
            state.loadingAxios = state.loadingAxios + 1
        },
        decLoadingAxios(state, action) {
            if (state.loadingAxios > 0) {
                state.loadingAxios = state.loadingAxios - 1
            } else {
                state.loadingAxios = 0
            }

        },
        setNetworkError(state, action) {
            state.networkError = action.payload.networkError
        },
        setLocale(state, action) {
            state.locale = action.payload.locale
        },
    },
})

export const uiActions = UISlice.actions

export default UISlice
