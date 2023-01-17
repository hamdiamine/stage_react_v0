import React from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { utilisateurActions } from 'app/core/store/securite/UtilisateurSlice';
import { guard } from 'app/core/store/securite/UtilisateurAction';
import axiosInstance from 'axiosInstance';
import { baseUrl } from 'app/core/util/Constant';

const AuthGuard = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthentified = useSelector((state) => state.utilisateur.isAuthentified)
    let withToken = false
    if(!isAuthentified){
        const token = localStorage.getItem('accessToken')
        if(token && token!==null){
            withToken = true
            dispatch(utilisateurActions.setUtilisateurFromStorage())
        }
    }
    
    //dispatch(guard())
    /*const guard = async () => {
        try {
            await axiosInstance.get(baseUrl + '/utilisateur/guard')
            dispatch(utilisateurActions.setUtilisateurFromStorage())
            return true
        } catch (error) {
            dispatch(utilisateurActions.setLogoutParam())
            return false
        }


    }*/
    return <>{(isAuthentified||withToken) ? children : <Navigate to="/signin" />}</>
}

export default AuthGuard
