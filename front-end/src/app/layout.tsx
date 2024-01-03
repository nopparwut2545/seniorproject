import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../../Component/navigation/page';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  showNavbar = true,
}: {
  children: React.ReactNode
  showNavbar?: boolean,
}) {
  return (
    <>
      {/* <div className='mt-16 my-5'>
        <button className='text-white text-center'  >Sign In</button>
      </div> */}
      <body className={inter.className}>
        {showNavbar && <Navbar />}
        {children}
        {/* <Footer /> */}
      </body>
    </>
  )
}