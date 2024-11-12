import { supabase } from '@/lib/initSupabase'
import '@/styles/app.css'
import '@/styles/tailwind.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  )
}