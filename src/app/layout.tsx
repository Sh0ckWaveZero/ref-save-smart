import '~/styles/globals.css'

import { Noto_Sans_Thai } from 'next/font/google'
import { type Metadata } from 'next'
export const metadata: Metadata = {
  title: 'SaveSmart',
  description:
    'SaveSmart เป็นเครื่องมือที่ช่วยให้คุณเพิ่มดอกเบี้ยเงินฝากให้สูงสุด โดยการกระจายเงินฝากของคุณไปยังบัญชีธนาคารต่างๆ ตามอัตราดอกเบี้ยและเงื่อนไขของแต่ละบัญชี',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  display: 'swap',
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={notoSansThai.className}>{children}</body>
    </html>
  )
}
