// "use client"
import '../style/globals.css'
import '../style/index.css'
// import { Inter } from 'next/font/google'
import { Providers } from './provider'
// const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <Providers>
      <body className=''>
    
        {children}
        </body>
      </Providers>
    </html>
  )
}
