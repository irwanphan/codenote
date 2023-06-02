'use client'

import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode';
import styles from './page.module.css'
import { useEffect } from 'react'

export default function Home() {

  const onScanSuccess = (decodedText:any, decodedResult:any) => {
    // handle decoded results here
    console.log(`Scan result: ${decodedText}`, decodedResult)
  }

  const config = {
    fps: 10,
    qrbox: {width: 360, height: 160},
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

    </main>
  )
}
