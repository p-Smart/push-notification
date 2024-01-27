// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"
import localforage from "localforage"
import toast from "react-hot-toast"

const firebaseConfig = {
  apiKey: "AIzaSyDFgTxCf8fdMwjtXJvEwEp8FkeOqKhK28A",
  authDomain: "notifications-test-63c7d.firebaseapp.com",
  projectId: "notifications-test-63c7d",
  storageBucket: "notifications-test-63c7d.appspot.com",
  messagingSenderId: "950843585792",
  appId: "1:950843585792:web:85e0235cfc698485f46fe5"
}

  
// Initialize Firebase

const firebaseCloudMessaging = {
  init: async () => {
     initializeApp(firebaseConfig)

    try {
      const messaging = getMessaging()
      const status = await Notification.requestPermission()

      // if ('serviceWorker' in navigator) {
      //   const reg = await navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope')
      //   const tokenInLocalForage = await localforage.getItem("fcm_token")
      //   if (reg && reg.active && reg.active.state==='activated' && tokenInLocalForage) {
      //     return {token: tokenInLocalForage, messaging}
      //   }
      // } 
      // else {
      //   return toast.error('Push notifications are not supported on this browser')
      // }
      

      if (status && status === "granted") {
        const fcm_token = await getToken(messaging, {
          vapidKey:
            `BNc_lAYJRB7RNSqCW6_-NYxrfvtOLTZSgwH2HZGdrRgrCERfp3rqJxOkbgWwKx33nI0w1fbcpWPedIl6jmGH5zc`,
        })
        await localforage.setItem('fcm_token', fcm_token)
        return {token: fcm_token, messaging}
      }

      return toast.error('Enable Notifications to use this app!')
      
    } 
    catch (err) {
      console.log(err.message)
      return null
    }
  },
}
export { firebaseCloudMessaging }