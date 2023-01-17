import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { useDispatch, useSelector } from 'react-redux'
import MuiAlert from '@mui/material/Alert'
import { setNotificationAction } from '../../../store/generic/UIAction'

const UINotification = () => {
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.ui.notification)
    const vertical = 'top'
    const horizontal = 'right'

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })

    const handleClose = () => {
        const initialNotification = {
            open: false,
            status: null,
            message: null,
        }

        dispatch(setNotificationAction(initialNotification))
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={notification.open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={
                    notification.status === 1
                        ? 'success'
                        : notification.status === 2
                        ? 'error'
                        : notification.status === 3
                        ? 'error'
                        : notification.status === 4
                        ? 'warning'
                        : 'success'
                }
                sx={{ width: '100%' }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    )
}

export default UINotification
