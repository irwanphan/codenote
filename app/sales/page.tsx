'use client'
import CodeNoteSalesList from "@/libs/components/CodeNoteSalesList"
import FormSubmitButton from "@/libs/elements/FormSubmit"
import { Box, Divider, Text } from "@chakra-ui/react"
import { FiHome } from "react-icons/fi"

const SalesPage = () => {
    return (
        <Box p={3} mb={16}>
            <Text
                fontSize='1.5rem'
                fontWeight={600}
            >
                Daftar Transaksi
            </Text>
            <Divider mt={2} mb={4} />
            <CodeNoteSalesList showAll />

            <FormSubmitButton href="/" mr={2} px={3} 
                position='fixed' bottom={4} left={4}
            >
                <Box as={FiHome} mr={1} />
                Back
            </FormSubmitButton>
        </Box>
    )
}

export default SalesPage