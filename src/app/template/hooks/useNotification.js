import { useContext } from 'react'
import NotificationContext from 'app/template/contexts/NotificationContext'

const useNotification = () => useContext(NotificationContext)

export default useNotification
