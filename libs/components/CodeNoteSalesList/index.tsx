import { LoadingBlockList } from "@/libs/elements/LoadingBlock"
import { useFetchSales } from "@/libs/hooks/sales/useFetchSales"
import { Box, Flex, Link, Text } from "@chakra-ui/react"
import { FiArrowRightCircle } from "react-icons/fi"

interface CodeNoteSalesListProps {
    itemsShowed?: number
    showAll?: boolean
}

const CodeNoteSalesList = ({itemsShowed = 10, showAll = false}: CodeNoteSalesListProps) => {
    const { sales, isLoadingSales } = useFetchSales()

    if (isLoadingSales) return (<LoadingBlockList/>)

    return (
        <Box>
            {sales?.slice(0, showAll ? undefined : itemsShowed).map((sale:any, index:number) => {
                const createdAt = new Date(sale.createdAt).toLocaleString("id-ID", {
                    month: 'long', day: 'numeric', year: 'numeric', 
                    hour: 'numeric', minute: 'numeric', second: 'numeric'
                })
                // console.log(createdAt)

                return(
                    <Box key={index} p={3} mb={2} 
                        border='1px solid'
                        borderColor='gray.200'
                        borderRadius='md'>
                        <Text fontSize='0.75rem' color='orange.400' fontWeight={600}>
                            {createdAt}
                        </Text>
                            {sale.detail.map((detail:any, index:number) => {
                            return (
                                <>
                                    <Text>
                                        ID Produk: {detail.productId}
                                    </Text>
                                    <Text>
                                        Jumlah: {detail.qty}
                                    </Text>
                                </>
                            )
                        })}
                    </Box>  
                )
            })}
            {sales!.length > itemsShowed && showAll === false && (
                <Flex justifyContent='right'>
                    <Link href="/sales" >
                        <Flex alignItems='baseline'>
                            <Text mr={1}>Lihat semua</Text>
                             <FiArrowRightCircle />
                        </Flex>
                    </Link>
                </Flex>   
            )}
        </Box>
    )
}

export default CodeNoteSalesList