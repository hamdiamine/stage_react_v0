import axiosInstance from "axiosInstance";

const { createSlice } = require("@reduxjs/toolkit");

const UtilisateurSlice = createSlice({
    name: 'utilisateur',
    initialState: {
        isAuthentified: false,
        token: null,
        utilisateur: {}

    },
    reducers: {
        setAuthentificationParam(state, action) {
            state.isAuthentified = action.payload.isAuthentified
            state.utilisateur = action.payload.utilisateur
            localStorage.setItem('accessToken', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.utilisateur))
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
        },
        setUtilisateurFromStorage(state, action) {
            state.utilisateur = JSON.parse(localStorage.getItem('user'))
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
            state.isAuthentified = true
        },
        setLogoutParam(state, action){
            state.isAuthentified = false
            state.token = null
            state.utilisateur = {}
            delete axiosInstance.defaults.headers.common.Authorization
            localStorage.clear()
        }
    }
})

export const utilisateurActions = UtilisateurSlice.actions
export default UtilisateurSlice;