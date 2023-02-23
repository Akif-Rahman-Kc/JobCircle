import Layout from '@/components/Layout'
import { AuthContext } from '@/store/Context'
import '@/styles/globals.css'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { io } from 'socket.io-client';

export default function App({ Component, pageProps }) {
  const [ userDetails, setUserDetails ] = useState({})
  const [ vendorDetails, setVendorDetails ] = useState({})
  const [ otpConf, setOtpConf ] = useState({})
  const [ vendorOtpConf, setVendorOtpConf ] = useState({})

  return (
    <Layout>
      <Provider store={store}>
        <AuthContext.Provider value={{ userDetails, socket:io('http://localhost:8800'),setUserDetails, vendorDetails, setVendorDetails, otpConf, setOtpConf, vendorOtpConf, setVendorOtpConf}}>
            <Component {...pageProps} />
        </AuthContext.Provider>
      </Provider>
    </Layout>
  )
}
