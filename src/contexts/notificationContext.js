import { createContext } from 'react';
import { useContext } from 'react';

const NotificationContext = createContext();


export const useNotificationContext = () => {

    return useContext(NotificationContext)
}

export default NotificationContext