import Layout from '@/components/Layout'
import { AuthContext } from '@/store/Context'
import '@/styles/globals.css'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [ userDetails, setUserDetails ] = useState({})
  const [ vendorDetails, setVendorDetails ] = useState({})

  return (
    <Layout>
      <AuthContext.Provider value={{ userDetails, setUserDetails, vendorDetails, setVendorDetails}}>
            <Component {...pageProps} />
        </AuthContext.Provider>
    </Layout>
  )
}
