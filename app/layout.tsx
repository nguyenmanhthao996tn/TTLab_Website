import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeLanguageProvider } from '@/context/theme-language-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'TTLab - The Things Lab | FCE, UIT, VNU-HCM',
  description:
    'TTLab (The Things Lab) - nhóm nghiên cứu thuộc Khoa Kỹ thuật Máy tính, Trường Đại học Công nghệ Thông tin (UIT), ĐHQG-HCM. Nghiên cứu hệ thống nhúng, RF/anten, IoT, LPWAN và robotics.',
  icons: {
    icon: '/icon-32x32.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">
        <ThemeLanguageProvider>
          {children}
        </ThemeLanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
