'use client'
import './globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@libs/theme'
import { RecoilRoot } from 'recoil'

import { supabase } from '@libs/connections/supabase'
import { type Session } from '@supabase/gotrue-js/src/lib/types'
import { useEffect, useState } from 'react'
// import { PageProps } from 'types/types'
import { AuthProvider } from '@contexts/authContext'
import TokoAuth from '@/libs/components/TokoAuth'

export default function App() {
  // const [ session, setSession ] = useState<Session | null | any>(null)
  
  const getInitialSession = () => {
    const supabaseSession = supabase.auth.getSession()
      .then(res => {
        console.log(res)
        // if (res.data.session != null) {
        //   localStorage.setItem('session', res.data.session)
        // }
      })
  }
  getInitialSession()

  return (
    <RecoilRoot>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <main>
            <TokoAuth/>
          </main>
        </ChakraProvider>
      </AuthProvider>
    </RecoilRoot>
  ) 
}