import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Header } from '@youtube/components/Header';
import './global.css';
import { AppProps } from 'next/app';
import { env } from 'process';
import { useMemo } from 'react';
import * as Tooltip from '@shared/components/Tooltip';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  const supabaseClient = useMemo(
    () =>
      createBrowserSupabaseClient({
        supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        options: {
          realtime: {
            params: {
              eventsPerSecond: 10,
            },
          },
        },
      }),
    []
  );
  return (
    <>
      <Head>
        <title>What</title>
      </Head>
      <main>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Tooltip.Provider delayDuration={100}>
            <Header contryCode="GB" />
            <Component {...pageProps} />
          </Tooltip.Provider>
        </SessionContextProvider>
      </main>
    </>
  );
}
