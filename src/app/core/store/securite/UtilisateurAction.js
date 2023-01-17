import { baseUrl, messageErreurGeneral } from "app/core/util/Constant"
import axiosInstance from "axiosInstance"
import { uiActions } from "../generic/UISlice"
import { utilisateurActions } from "./UtilisateurSlice"

const baseController = '/utilisateur'

export const authentification = (utilisateur) => {
    return async (dispatch) => {
        const authentif = async (utilisateur) => {
            const response = await axiosInstance.post(
                baseUrl + baseController + '/authentification',
                utilisateur
            )
            dispatch(uiActions.setLoading({ loading: false }))

            if (response.status !== 200) {
                throw new Error(messageErreurGeneral)
            }

            const objetRetour = await response.data
            return objetRetour
        }
        try {
            dispatch(uiActions.setLoading({ loading: true }))
            const objetRetour = await authentif(utilisateur)
            if (objetRetour.data) {
                dispatch(utilisateurActions.setAuthentificationParam({
                    isAuthentified: true,
                    token: objetRetour.data.token,
                    utilisateur: objetRetour.data
                }))
            } else {
                dispatch(
                    uiActions.setNotification({
                        notification: {
                            open: true,
                            status: 2,
                            message: objetRetour.messageException
                        },
                    })
                )
            }
        } catch (error) {
            dispatch(uiActions.setLoading({ loading: false }))
            if(!error.response){
                dispatch(
                    uiActions.setNotification({
                        notification: {
                            open: true,
                            status: 2,
                            message: 'Problème de connexion avec le serveur',
                        },
                    })
                )
            }
        }
    }
}

export const guard = () => {
    return async (dispatch) => {
        const guard = async () => {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
            const response = await axiosInstance.post(
                baseUrl + baseController + '/guard')

            if (response.status !== 200) {
                throw new Error(messageErreurGeneral)
            }

            const objetRetour = await response.data
            if (objetRetour.code !== null) {
                throw new Error(objetRetour.messageException)
            }
            return objetRetour.data
        }
        try {
            await guard()
            dispatch(utilisateurActions.setUtilisateurFromStorage({}))
        } catch (error) {
            dispatch(utilisateurActions.setLogoutParam({}))
        }
    }
}