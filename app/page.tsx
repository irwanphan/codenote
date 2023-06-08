'use client'
import './globals.css'
import { Box, Divider } from '@chakra-ui/react'

import { useAuth } from '@contexts/authContext'
import TokoAuth from '@/libs/components/TokoAuth'
import FormSubmitButton from '@/libs/elements/FormSubmit'
import { FiDivideSquare } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  const { session, isLoadingSession } = useAuth()
  const [ salesData, setSalesData ] = useState<any>(null)
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  const fetchData = async () => {
    const user = await axios.get('/api/sales').then(res => console.log(res))
  }

  useEffect(() => {
    if (session) {
      fetchData()
    }
    setIsLoading(false)
  }, [])

  // if (isLoadingSession || isLoading) return (
  //   <>loading</>
  // )

  return (
    <main>
      <TokoAuth/>

          <Divider my={4} />

            {salesData?.map((sale:any, index:number) => {
              return(
                <Box key={index} p={4} mb={4} bg='gray.100' borderRadius='md'>
                  <Box as='h3' mb={2} fontWeight='bold'>
                    {sale.productName}
                  </Box>
                  <Box as='p' mb={2}>
                    {sale.productPrice}
                  </Box>
                  <Box as='p'>
                    {sale.productQty}
                  </Box>
                </Box>  
              )
            })}

          <FormSubmitButton href="/sales" mr={2} px={3} 
            position='fixed' bottom={4} right={4}
          >
            <Box as={FiDivideSquare} mr={1} />
            Scan
          </FormSubmitButton>
    </main>
  ) 
}