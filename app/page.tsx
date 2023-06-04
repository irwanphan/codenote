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
import { AuthProvider, useAuth } from '@contexts/authContext'
import TokoAuth from '@/libs/components/TokoAuth'

export default function App() {
  const { session, user, isLoadingSession } = useAuth()

  if (isLoadingSession === false) {
    console.log('session in app:', session)
  }

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