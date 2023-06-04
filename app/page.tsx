'use client'
import './globals.css'
import { Box, Divider } from '@chakra-ui/react'

import { useAuth } from '@contexts/authContext'
import TokoAuth from '@/libs/components/TokoAuth'
import FormSubmitButton from '@/libs/elements/FormSubmit'
import { FiDivideSquare } from 'react-icons/fi'

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
            <Box as={FiDivideSquare} mr={1} />
            Scan
          </FormSubmitButton>
        </>
      )}
    </main>
  ) 
}