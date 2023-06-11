import { LoadingBlockList } from "@/libs/elements/LoadingBlock"
import { useFetchSales } from "@/libs/hooks/sales/useFetchSales"
import { Box, Text } from "@chakra-ui/react"

const CodeNoteSalesList = () => {
    const { sales, isLoadingSales } = useFetchSales()
    if (isLoadingSales) return (<LoadingBlockList/>)

    return (
        <Box>
            {sales?.map((sale:any, index:number) => {
                return(
                    <Box key={index} p={3} mb={2} 
                        border='1px solid'
                        borderColor='gray.200' 
                        borderRadius='md'>
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

export default CodeNoteSalesList