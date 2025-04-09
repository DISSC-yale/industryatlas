import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Industry Atlas',
  description: 'Industry atlas',
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
