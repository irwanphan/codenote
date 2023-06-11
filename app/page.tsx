'use client'
import './globals.css'
import { Box, Divider, Text } from '@chakra-ui/react'

import { useAuth } from '@contexts/authContext'
import TokoAuth from '@/libs/components/TokoAuth'
import FormSubmitButton from '@/libs/elements/FormSubmit'
import { FiDivideSquare } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useFetchSales } from '@/libs/hooks/sales/useFetchSales'
import { LoadingBlockList } from '@/libs/elements/LoadingBlock'
import ScannedSalesList from '@/libs/components/ScannedSalesList'

export default function App() {
  const { session, isLoadingSession } = useAuth()

  return (
    <main>
      <TokoAuth/>

          <Divider my={4} />

          <ScannedSalesList />

          <FormSubmitButton href="/sales" mr={2} px={3} 
            position='fixed' bottom={4} right={4}
          >
          <Box as={FiDivideSquare} mr={1} />
            Scan
          </FormSubmitButton>
    </main>
  ) 
}

function useSales(): { sales: any; isLoadingSales: any } {
  throw new Error('Function not implemented.')
}
