'use client'

import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode';
import styles from './page.module.css'
import { ChangeEvent, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation';

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
      /* verbose= */ false);
      html5QrcodeScanner.render(onScanSuccess, undefined);
  }, [])
    
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
            router.push(`/dashboard/?name=${formSubmitValues.code}&qty=${formSubmitValues.qty}`)
          }}
        >Submit</button>
      </form>

    </main>
  )
}
