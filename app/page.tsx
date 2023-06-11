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

export default function App() {
  const { session, isLoadingSession } = useAuth()
  const [ salesData, setSalesData ] = useState<any>(null)
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  const { sales, isLoadingSales } = useFetchSales()

  useEffect(() => {
    console.log(sales)
  }, [sales])
  
  // if (isLoadingSession || isLoading) return (
  //   <>loading</>
  // )
  const SalesList = () => {
    if (isLoadingSales) return (
      <Box>
        loading sales
      </Box>
    )

    return (
      <Box>
        {sales?.map((sale:any, index:number) => {
          return(
            <Box key={index} p={4} mb={4} bg='gray.100' borderRadius='md'>
              <Text fontSize='0.75rem'>
                {sale.createdAt}
              </Text>
              {sale.detail.map((detail:any, index:number) => {
                return (
                  <>
                    <Text>
                      Product ID: {detail.productId}
                    </Text>
                    <Text>
                      Quantity: {detail.qty}
                    </Text>
                  </>
                )
              })}
            </Box>  
          )
        })}
      </Box>
    )
  }

  return (
    <main>
      <TokoAuth/>

          <Divider my={4} />

            {/* {!isLoadingSales && sales?.map((sale:any, index:number) => {
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
            })} */}
            <SalesList/>

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
