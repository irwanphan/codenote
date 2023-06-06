'use client'

import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode'
import styles from './page.module.css'
import { ChangeEvent, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import FormSubmitButton from '@/libs/elements/FormSubmit'
import { FiHome } from 'react-icons/fi'
import { Box } from '@chakra-ui/react'
import axios from 'axios'

import { useAuth } from '@/libs/contexts/authContext'

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

export default function Home() {
  const { session } = useAuth()
  const router = useRouter()

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
    console.log(`Scan result: ${decodedText}`, decodedResult)
    setScannedCode({decodedText, result: decodedResult})
    if (qtyRef.current != null) {
      qtyRef.current.focus()
    }
  }

  const config = {
    fps: 10,
    qrbox: {width: 320, height: 120},
    rememberLastUsedCamera: true,
    // Only support camera scan type.
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  }
  useEffect(() => {  
    const html5QrcodeScanner = new Html5QrcodeScanner("reader",
      config,
      /* verbose= */ false)
      html5QrcodeScanner.render(onScanSuccess, undefined)
  }, [])

  const [ isDisabled, setDisabled ] = useState(false)

  const handleSubmit = async (data:any) => {
    try {
      const user = await axios.post('/api/users', userData)
        .then(res => axios.post('/api/sales', data))
        .then(ref => router.push(`/dashboard`))
      // const res = await axios.post('/api/sales', data)
      // router.push(`/dashboard`)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <main className={styles.main}>

      <div id="reader" className={styles.qrCodeScanner}></div>

      <form className={styles.form}>
        <input type="text" name='productId' 
          value={scannedCode?.decodedText} 
          readOnly />
        <input type="number" name='qty' 
          ref={qtyRef}
          onChange={(e) => handleChanges(e)} 
          />

        <button 
          type="button"
          onClick={() => {
            // console.log(formSubmitValues)
            // handleSubmit(onSubmit)
            handleSubmit(formSubmitValues)
            router.push(`/`)
          }}
        >Submit</button>
      </form>


      <FormSubmitButton href="/" mr={2} px={3} 
        position='fixed' bottom={4} left={4}
      >
        <Box as={FiHome} mr={1} />
        Back
      </FormSubmitButton>

    </main>
  )
}
