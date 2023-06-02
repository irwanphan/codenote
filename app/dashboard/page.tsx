'use client'
import { useRouter } from "next/navigation"
import styles from './page.module.css'

const DashboardPage = () => {
    const router = useRouter()
    return (
        <main className={styles.main}>
            <h1>Dashboard</h1>
            <p>Test, just scanned content</p>
            <p></p>
        </main>
    )
}

export default DashboardPage