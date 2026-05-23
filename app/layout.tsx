import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Montserrat } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/layout/ProgressBar'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-mont',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Stark Legal | Commercial Law Firm | Nigeria',
  description:
    'Stark Legal — A 21st century full-service commercial law firm in Nigeria providing strategic legal solutions in Energy, Transport, Financial Services, Corporate & Commercial Law, and Dispute Resolution.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${montserrat.variable}`}>
      <body>
        <ProgressBar />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
