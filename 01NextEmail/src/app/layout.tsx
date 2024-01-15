import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Email | Parmjeet Mishra Projects',
  description: 'Next Email + Zod Validations + TailwindCSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black/90 text-white`}>{children}
      <Toaster />
      </body>
    </html>
  )
}
