
import './globals.css'
import '@coinbase/onchainkit/styles.css'
import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Lucky Spin Casino',
  description: 'Spin to Win Real Crypto Rewards!',
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: `${process.env.NEXT_PUBLIC_URL}/api/og`,
      button: {
        title: 'Play Lucky Spin Casino',
        action: {
          type: 'launch_frame',
          name: 'Lucky Spin Casino',
          url: process.env.NEXT_PUBLIC_URL,
          splashImageUrl: `${process.env.NEXT_PUBLIC_URL}/splash.png`,
          splashBackgroundColor: '#1e293b',
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
