'use client'

import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode'
import styles from './page.module.css'
import { ChangeEvent, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import FormSubmitButton from '@/libs/elements/FormSubmit'
import { FiHome } from 'react-icons/fi'
import { Box } from '@chakra-ui/react'
import axios from 'axios'

import { checkoutResolver, IFormInput } from "@interfaces//checkout"
import { useForm, SubmitHandler, Resolver } from "react-hook-form"
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
    code: scannedCode.decodedText,
    ...formValues
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

  const resolver: Resolver<IFormInput> = async (values) => {
    return checkoutResolver(values)
  }
  const [ isDisabled, setDisabled ] = useState(false)
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
        // address: '',
        // city: '',
        // province: '',
        // postal: '',
        total: 0,
        // note: '',
        orders: [],
        user: { email: '', name: '' }
    },
    resolver
  })
  const createSale = (data:any) => axios.post('./api/sales', data)
  const createUserIfNotExist = (data:any) => axios.post('/api/users', data)
  
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log('running', data)
    setDisabled
    // setIsLoading(true)
    // toast({title:'Submitting ...'})
    // data.orders = checkCart
    // data.total = total!
    data.user.email = session!.user.email
    data.user.name = session!.user.user_metadata.name
    data.user.id = session!.user.id
    console.log(data)

    const userData = {
        id: session!.user.id,
        email: session!.user.email,
        name: session!.user.user_metadata.name,
        image: session!.user.user_metadata.picture
    }

    const user = await createUserIfNotExist(userData)
    // console.log('user: ', user)

    const purchase = await createSale(data)
    // console.log('purchase: ', purchase)
    
    // TEST: comment localstorage.remove, setCart([]), and router.push
    // localStorage.removeItem("cart")
    // setCart([])
    // toast({title:'Purchase order submitted', status:'success'})
    // toast({title:'Redirecting ...'})
    // setIsLoading(false)
    // router.push(`/admin-area/purchases/${purchase.data.id}`)
  }
    
  return (
    <main className={styles.main}>

      <div id="reader" className={styles.qrCodeScanner}></div>

      <form className={styles.form}>
        <input type="text" name='code' 
          value={scannedCode?.decodedText} 
          readOnly />
        <input type="number" name='qty' 
          ref={qtyRef}
          onChange={(e) => handleChanges(e)} 
          />

        <button 
          type="button"
          onClick={() => {
            console.log(formSubmitValues)
            handleSubmit(onSubmit)
            // router.push(`/dashboard/?name=${formSubmitValues.code}&qty=${formSubmitValues.qty}`)
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
