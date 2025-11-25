import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Raleway } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: 'Mi Portafolio',
  description: 'Plantilla',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={raleway.className}>
      <body className={inter.className}>
        {/* Contenido */}
        {children}

      </body>
    </html>
  )
}