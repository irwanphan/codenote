import { LoadingBlockList } from "@/libs/elements/LoadingBlock"
import { useFetchSales } from "@/libs/hooks/sales/useFetchSales"
import { Box, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

type CodeNoteSalesListProps = {
    itemsShowed?: number
}

const CodeNoteSalesList = ({itemsShowed = 10}: CodeNoteSalesListProps) => {
    const { sales, isLoadingSales } = useFetchSales()
    const [ haveMore, setHaveMore ] = useState<Boolean>(false)

    // const haveMore = sales.length > itemsShowed
    if (isLoadingSales) return (<LoadingBlockList/>)

    useEffect(() => {
        if (!isLoadingSales) {
            if (sales!.length > itemsShowed) {
                setHaveMore(true)
            }
        }
    }, [sales, isLoadingSales])

    return (
        <Box>
            {sales?.slice(0, 10).map((sale:any, index:number) => {
                const createdAt = new Date(sale.createdAt).toLocaleString("id-ID", {
                    month: 'long', day: 'numeric', year: 'numeric', 
                    hour: 'numeric', minute: 'numeric', second: 'numeric'
                })
                console.log(createdAt)

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
            {haveMore && (
                <Box>
                    <Text>Have more</Text>
                </Box>   
            )}
        </Box>
    )
}

export default CodeNoteSalesList