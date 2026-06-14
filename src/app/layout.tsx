import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'La Mesa — Build Together',
  description: 'La Mesa helps founders, students, and builders form teams, map the roles they need, and move from idea to prototype.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
