import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ElevenLabsWidget } from '@/components/elevenlabs-widget'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f9fc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a12' },
  ],
}

export const metadata: Metadata = {
  title: 'ALE Visión — Monitoreo Visual con IA para Cámaras de Seguridad',
  description:
    'Convierte tus cámaras en supervisión visual con IA. ALE Visión analiza capturas periódicas y genera un Índice de Apego General (IAG) para detectar desviaciones en tiempo real.',
  keywords: ['monitoreo IA', 'cámaras seguridad', 'supervisión visual', 'SaaS', 'IAG'],
  authors: [{ name: 'ALE Visión' }],
  openGraph: {
    title: 'ALE Visión — Monitoreo Visual con IA',
    description: 'Supervisión inteligente para gasolineras, retail, almacenes y más.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ElevenLabsWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}

