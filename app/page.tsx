'use client'
import './globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Divider } from '@chakra-ui/react'
import theme from '@libs/theme'
import { RecoilRoot } from 'recoil'

import { supabase } from '@libs/connections/supabase'
import { type Session } from '@supabase/gotrue-js/src/lib/types'
import { useEffect, useState } from 'react'
// import { PageProps } from 'types/types'
import { AuthProvider, useAuth } from '@contexts/authContext'
import TokoAuth from '@/libs/components/TokoAuth'
import FormSubmitButton from '@/libs/elements/FormSubmit'

export default function App() {
  const { session, isLoadingSession } = useAuth();

  return (
    <main>
      <TokoAuth/>

      { session && (
        <>
          <Divider my={4} />


          <FormSubmitButton href="/sales" mr={2} px={3} 
            position='fixed' bottom={4} right={4}
          >
            Scan
          </FormSubmitButton>
        </>
      )}
    </main>
  ) 
}