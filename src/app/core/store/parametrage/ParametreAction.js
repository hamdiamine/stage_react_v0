import { baseUrl, messageErreurGeneral } from 'app/core/util/Constant'
import axiosInstance from 'axiosInstance'
import { parametreActions } from './ParametreSlice'
import { uiActions } from '../generic/UISlice'

const baseController = '/parametre'

export const fetchListAllParametres = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await axiosInstance.get(
                baseUrl + baseController + '/listall'
            )

            if (response.status !== 200) {
                throw new Error(messageErreurGeneral)
            }

            const objetRetour = response.data
            if (objetRetour.code !== null) {
                throw new Error(objetRetour.messageException)
            }

            return objetRetour.data
        }
        const data = await fetchData()
        dispatch(
            parametreActions.setListParametre({
                listParametre: data || [],
            })
        )
    }
}

export const fetchListSelonOrganisation = (orgId) => {
    return async (dispatch) => {
        const fetchData = async (orgId) => {
            const response = await axiosInstance.get(
                baseUrl + baseController + '/listbyorg'
            )

            if (response.status !== 200) {
                throw new Error(messageErreurGeneral)
            }

            const objetRetour = response.data
            if (objetRetour.code !== null) {
                throw new Error(objetRetour.messageException)
            }

            return objetRetour.data
        }
        const data = await fetchData(orgId)
        dispatch(
            parametreActions.setListParametre({
                listParametre: data || [],
            })
        )
    }
}

export const saveParametre = (newListParametre, index) => {
    return async (dispatch) => {
        const saveData = async (parametre) => {
            const response = await axiosInstance.post(
                baseUrl + baseController + '/save',
                parametre
            )
            if (response.status !== 200) {
                throw new Error(messageErreurGeneral)
            }

            const objetRetour = await response.data
            if (objetRetour.code !== null) {
                throw new Error(objetRetour.messageException)
            }

            return objetRetour.data
        }
        const parametreToUpdate = newListParametre[index]
        await saveData(parametreToUpdate)
        dispatch(
            parametreActions.setListParametre({
                listParametre: newListParametre,
            })
        )

        dispatch(
            uiActions.setNotification({
                notification: {
                    open: true,
                    status: 1,
                    message: 'opération effectuée avec succès',
                },
            })
        )
    }
}

export const setGlobalSearch = (value) => {
    return (dispatch) => {
        dispatch(
            parametreActions.setGlobalFilter({
                globalFilter: value,
            })
        )
    }
}
