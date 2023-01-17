import { uiActions } from '../../store/generic/UISlice'


export const setNotificationAction = (notif) => {
    return (dispatch) => {
        dispatch(
            uiActions.setNotification({
                notification: notif
            })
        )
    }
}