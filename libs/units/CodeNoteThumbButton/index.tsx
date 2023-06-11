import FormSubmitButton from "@/libs/elements/FormSubmit"
import { Box, Flex } from "@chakra-ui/react"
import { BiScan } from "react-icons/bi"


const CodeNoteThumbButton = () => {
    return (
        <FormSubmitButton href="/sales" 
            position='fixed' 
            bottom={0} left={6}
            px={4} pt={12} pb={10}
            borderTopRadius={32}
            borderBottom={0}
            >
            <Flex justifyContent='center' alignItems='center' flexDirection='column'>
                <BiScan fontSize='2.5rem' />
                <Box display='block'>
                    Scan
                </Box>
            </Flex>
        </FormSubmitButton>
    )
}

export default CodeNoteThumbButton