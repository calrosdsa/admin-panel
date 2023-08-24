import '../style/globals.css'
import '../style/index.css'
import { Inter } from 'next/font/google'
import { Providers } from './provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        
      <body className='bg-gray-50'>
    
        {children}
        </body>
      </Providers>
    </html>
  )
}
