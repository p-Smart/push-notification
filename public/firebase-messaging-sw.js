importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')



const firebaseConfig = {
    apiKey: "AIzaSyDFgTxCf8fdMwjtXJvEwEp8FkeOqKhK28A",
    authDomain: "notifications-test-63c7d.firebaseapp.com",
    projectId: "notifications-test-63c7d",
    storageBucket: "notifications-test-63c7d.appspot.com",
    messagingSenderId: "950843585792",
    appId: "1:950843585792:web:85e0235cfc698485f46fe5"
  }
  

const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()


self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    var promise = new Promise((resolve) => {
      setTimeout(resolve, 1000);
    })
    .then(() => {
        return clients.openWindow(event.notification?.data?.click_action);
    })

    event.waitUntil(promise);
})


messaging.onBackgroundMessage((payload) => {
    console.log('Message from Service Worker ', payload);
    if (!payload.hasOwnProperty('notification')) {
        const notificationTitle = payload?.data?.title
        const notificationOptions = {
            body: payload?.data?.body,
            icon: payload?.data?.icon,
            image: payload?.data?.image,
            data: {
                click_action: payload?.data?.click_action
            }
        }
        return self.registration.showNotification(notificationTitle, notificationOptions)
    }
})
