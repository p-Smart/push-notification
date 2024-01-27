import PushNotification from '@/components/PushNotification'
import NotificationContext from '@/contexts/notificationContext'
import '@/styles/globals.css'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

const App = ({ Component, pageProps }) => {
  const [notificationToken, setNotificationToken] = useState('')
  const [tokenLoading, setTokenLoading] = useState(true)


  return (
    <NotificationContext.Provider
    value={{notificationToken, tokenLoading, setTokenLoading}}
    >
    <Component {...pageProps} />
    <Toaster 
     toastOptions={{style: {
      border: '1px solid rgba(var(--callout-border-rgb), 0.3)',
      backgroundColor: 'rgba(var(--callout-rgb))'
     }}}
    />
    <PushNotification setToken={setNotificationToken} />
    </NotificationContext.Provider>
  )
}


export default App
