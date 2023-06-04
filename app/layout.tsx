'use client'
import { AuthProvider } from '@/libs/contexts/authContext'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import './globals.css'
import { Inter } from 'next/font/google'
import { metadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <RecoilRoot>
          <AuthProvider>
            <ChakraProvider theme={theme}>
              {children}
            </ChakraProvider>
          </AuthProvider>
        </RecoilRoot>
      </body>
    </html>
  )
}
