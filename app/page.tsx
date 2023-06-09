'use client'
import './globals.css'
import { Box, Divider } from '@chakra-ui/react'

import { useAuth } from '@contexts/authContext'
import TokoAuth from '@/libs/components/TokoAuth'
import CodeNoteSalesList from '@/libs/components/CodeNoteSalesList'
import CodeNoteThumbButton from '@/libs/units/CodeNoteThumbButton'

export default function App() {
  // const { session, isLoadingSession } = useAuth()

  return (
    <Box p={3} mb={16}>
      <TokoAuth/>
      <Divider my={4} />

      <CodeNoteSalesList />
      <CodeNoteThumbButton />
    </Box>
  ) 
}