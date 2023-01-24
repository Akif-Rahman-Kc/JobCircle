import Layout from '@/components/Layout'
import { AuthContext } from '@/store/Context'
import '@/styles/globals.css'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [ userDetails, setUserDetails ] = useState({})

  return (
    <Layout>
      <AuthContext.Provider value={{ userDetails, setUserDetails}}>
            <Component {...pageProps} />
        </AuthContext.Provider>
    </Layout>
  )
}
