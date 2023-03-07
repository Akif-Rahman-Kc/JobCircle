import Layout from '@/components/Layout'
import { AuthContext } from '@/store/Context'
import '@/styles/globals.css'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { io } from 'socket.io-client';
import NotificationBar from '@/components/Notifications/NotificationBar'

export default function App({ Component, pageProps }) {
  const [ userDetails, setUserDetails ] = useState({})
  const [ vendorDetails, setVendorDetails ] = useState({})
  const [ otpConf, setOtpConf ] = useState({})
  const [ sendNotification, setSendNotification ] = useState(null)
  const [ recieveNotification, setRecieveNotification ] = useState(null)
  const [ socket, setSocket ] = useState(io('https://api.dorlaro.shop'))
  const [ vendorOtpConf, setVendorOtpConf ] = useState({})
  const [ currentChat, setCurrentChat ] = useState(null)

  return (
    <Layout>
      <Provider store={store}>
        <AuthContext.Provider value={{ userDetails, socket, setUserDetails, vendorDetails, setVendorDetails, otpConf, setOtpConf, vendorOtpConf, setVendorOtpConf, sendNotification, setSendNotification, recieveNotification, setRecieveNotification, currentChat, setCurrentChat}}>
            <Component {...pageProps} />
            <NotificationBar/>
        </AuthContext.Provider>
      </Provider>
    </Layout>
  )
}
