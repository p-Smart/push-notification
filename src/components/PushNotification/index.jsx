/* eslint-disable @next/next/no-img-element */
import {onMessage} from "firebase/messaging"
import { toast } from "react-hot-toast"
import { firebaseCloudMessaging} from "./firebase"
import { useEffect } from "react"
import { useNotificationContext } from "@/contexts/notificationContext"
import Image from "next/image"
import { useRouter } from "next/router"


const PushNotification = ({setToken}) => {
    const router = useRouter()
    const {setTokenLoading} = useNotificationContext()

    const fetchClientToken = async (times=0) => {
        try {
           if(times<5){
            const firebase = await firebaseCloudMessaging.init()
                if(firebase?.token && firebase?.messaging){
                    console.log('Client Notification Token:', firebase?.token)
                    setToken(firebase?.token)


                    onMessage(firebase.messaging, (payload) => {
                        console.log('Message from App ', payload)
                        handleShowNotification(payload)
                    } )
                    return
                }
                return await fetchClientToken(++times)
           }
           return toast.error('Failed generating token, try again later')
          }
          catch (err) {
            console.log(err.message)
            return await fetchClientToken(++times)
          }
          finally{
            setTokenLoading(false)
          }
    }

    const handleShowNotification = (payload) => {
        toast(
            <button
            style={{display: 'flex', gap: '5px', alignItems: 'center', border: 'none', backgroundColor: 'transparent', textAlign: 'left', cursor: 'pointer'}}
            onClick={ () => payload?.data?.click_action && router.push(payload?.data?.click_action) }
            >
                {
                payload?.data?.icon &&
                <img
                src={payload?.data?.icon}
                alt="notification-image"
                width={50}
                height={50}
                style={{objectFit: 'contain', borderRadius: '5px'}}
                />
                }
                <span>
                <h3>{payload?.data?.title}</h3>
                <p>{payload?.data?.body}</p>
            </span>
            </button>
        , {duration: 10000})

        Notification.requestPermission()
            .then((permission) => {
                if (permission === 'granted') {
                    const sound = new Audio('/assets/audios/notification.wav')
                    sound.play()
                    const notification = new Notification(payload?.data?.title, {
                        body: payload?.data?.body,
                        icon: payload?.data?.icon,
                        image: payload?.data?.image,
                        data: {
                            click_action: payload?.data?.click_action
                        }
                    })
    
                    notification.addEventListener('error', (e) => {
                        console.log(e)
                        alert('Error displaying the notification')
                    })

                    notification.addEventListener('click', (e) => {
                        window.open(payload?.data?.click_action, '_blank')
                    })
                } 
                else {
                    alert('Please allow notifications access in site settings!')
                }
            })
            .catch((error) => {
                console.error('Error requesting notification permission:', error)
                // toast.error(error.message)
            })
    }    


    useEffect( () => {        
        fetchClientToken()
    }, [] )


    return <></>
}


export default PushNotification