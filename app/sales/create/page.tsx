'use client'

import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode'
import styles from './page.module.css'
import { ChangeEvent, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import FormSubmitButton from '@/libs/elements/FormSubmit'
import { FiHome } from 'react-icons/fi'
import { Box, Input } from '@chakra-ui/react'
import axios from 'axios'

import { useAuth } from '@/libs/contexts/authContext'
import UIFx from 'uifx'
import LoadingOverlay from '@/libs/elements/LoadingOverlay'
import { set } from 'react-hook-form'

type scannedCodeType = {
  decodedText: string,
  result: {
    text: string,
    format: {
      format: number,
      formatName: string
    },
    debugData: {
      decoderName: string
    }
  }
}

const audioPath = '/static/beep6pixabay.mp3'

let beep: UIFx | null = null

const CreateSalesPage = () => {
  const { session } = useAuth()
  const router = useRouter()

  const [ isLoading, setLoading ] = useState(false)

  const [ scannedCode, setScannedCode ] = useState<scannedCodeType>({
    decodedText: '',
    result: {
      text: '',
      format: {
        format: 0,
        formatName: ''
      },
      debugData: {
        decoderName: ''
      }
    }
  })
  const [ formValues, setFormValues ] = useState({
    qty: 0

  })
  const formSubmitValues = {
    productId: scannedCode.decodedText,
    userEmail: session?.user.email,
    userId: session?.user.id,
    ...formValues
  }
  const userData = {
    userEmail: session?.user.email,
    userName: session?.user.user_metadata.name,
    userId: session?.user.id,
    userImage: session?.user.user_metadata.picture
  }

  const qtyRef = useRef<HTMLInputElement>(null)

  const handleChanges = (e:ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const onScanSuccess = (decodedText:any, decodedResult:any) => {
    // handle decoded results here
    // console.log(`Scan result: ${decodedText}`, decodedResult)
    setScannedCode({decodedText, result: decodedResult})
    if (qtyRef.current != null && beep != null) {
      qtyRef.current.focus()
      beep.play()
    }
  }

  const config = {
    fps: 5,
    qrbox: {
      width: 240, 
      height: 160
    },
    rememberLastUsedCamera: true,
    // Only support camera scan type.
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  }
  useEffect(() => {  
    if (typeof window !== 'undefined') {
      beep = new UIFx(audioPath, {
        volume: 0.4,
        throttleMs: 100,
      })

      const html5QrcodeScanner = new Html5QrcodeScanner("reader",
        config,
        /* verbose= */ false)
        html5QrcodeScanner.render(onScanSuccess, undefined)
    }
  }, [])

  const [ isDisabled, setDisabled ] = useState(false)

  const handleSubmit = async (data:any) => {
    try {
      const user = await axios.post('/api/users', userData)
        .then(res => axios.post('/api/sales', data))
        .then(ref => router.push(`/`))
      // const res = await axios.post('/api/sales', data)
      // router.push(`/dashboard`)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Box p={3} mb={16} >

      { isLoading && <LoadingOverlay />}

      <Box id="reader" className={styles.qrCodeScanner} 
        margin='0 auto 2rem'
        // maxH='200px'
        maxW='280px'
        borderRadius={4}
      />

      <form className={styles.form}>
        <small>Scanned Code:</small>
        <Input type="text" name='productId'
          mb={2}
          value={scannedCode?.decodedText} 
          readOnly />

        <small>Quantity:</small>
        <Input type="number" name='qty' 
          mb={2}
          ref={qtyRef}
          onChange={(e) => handleChanges(e)} 
          />

        <FormSubmitButton 
          notLink
          backgroundColor='green.100'
          w='full'
          onClick={() => {
            // console.log(formSubmitValues)
            // handleSubmit(onSubmit)
            setLoading(true)
            handleSubmit(formSubmitValues)
            // router.push(`/`)
          }}
        >Submit</FormSubmitButton>
      </form>


      <FormSubmitButton href="/" mr={2} px={3} 
        position='fixed' bottom={4} left={4}
      >
        <Box as={FiHome} mr={1} />
        Back
      </FormSubmitButton>

    </Box>
  )
}

export default CreateSalesPage