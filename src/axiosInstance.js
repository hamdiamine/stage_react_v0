import { uiActions } from 'app/core/store/generic/UISlice';
import axios from 'axios'
import store from './app/core/store/store'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(function (config) {
    store.dispatch(uiActions.incLoadingAxios())
    return config;
}, function (error) {
    // Do something with request error
    store.dispatch(uiActions.decLoadingAxios())
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(uiActions.decLoadingAxios())
        store.dispatch(uiActions.setNetworkError({ networkError: false }))
        return response
    },
    (error) => {
        store.dispatch(uiActions.decLoadingAxios())
        console.log("Error IMMO:", error)
        if (!error.response) {
            store.dispatch(uiActions.setNetworkError({ networkError: true }))
            store.dispatch(uiActions.setLoadingAxios({ loadingAxios: 0 }))
            return Promise.reject(error);
        }
        if (error.response && error.response.status === 403) {
            window.location = '/signin';
        } else {
            store.dispatch(
                uiActions.setNotification({
                    notification: {
                        open: true,
                        status: 2,
                        message: 'Problème serveur',
                    },
                })
            )
            return Promise.reject(error);
        }

    }
)

export default axiosInstance