'use client'
import { usePathname, useSearchParams  } from "next/navigation"
import styles from './page.module.css'
import { useEffect } from "react"

const DashboardPage = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + searchParams.toString();
        console.log(url);
    }, [pathname, searchParams]);
      
    return (
        <main className={styles.main}>
            <h1>Dashboard</h1>
            <p>Test, just scanned content</p>
            <p>{searchParams}</p>
        </main>
    )
}

export default DashboardPage