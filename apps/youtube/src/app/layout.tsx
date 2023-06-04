import "./global.css";
import { headers as Headers } from "next/headers";
import { cn } from "@shared/utils/cn";
import { env } from "@youtube/env";
import { Header } from "@youtube/components/Header";
import SupabaseProvider from "@youtube/components/Supabase";
import { ClientReactQueryProvider } from "@shared/ReactQuery";

import { Roboto } from "next/font/google";
import { createServerComponentClient } from "@youtube/supabase";

import { SSRProvider } from "@shared/components/SSRProvider";

const roboto = Roboto({
   subsets: ["latin"],
   weight: ["400", "100", "300", "700"],
});

const getContryCode = async (ip: string | null) => {
   if (ip === null) {
      ip = `86.${Math.floor(Math.random() * 255)}.${Math.floor(
         Math.random() * 255
      )}.${Math.floor(Math.random() * 255)}`;
   }
   const res = await fetch(
      `${env.IP_GEOLOCATION_API_URL}?apiKey=${env.IP_GEOLOCATION_API_KEY}&ip=${ip}&fields=country_code2`,
      {
         cache: "force-cache",
      }
   );
   const data = await res.json();
   return (data.country_code2 ?? "??") as string;
};

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const supabase = createServerComponentClient();
   const {
      data: { session },
   } = await supabase.auth.getSession();

   const headers = Headers();
   const contryCode = await getContryCode(headers.get("x-forwarded-for"));

   return (
      <html lang="en">
         <body
            className={cn(
               "relative isolate z-0 min-h-screen bg-dark-800 text-white",
               roboto.className
            )}
            suppressHydrationWarning={true}
         >
            <SSRProvider>
               <SupabaseProvider session={session}>
                  <ClientReactQueryProvider>
                     <Header contryCode={contryCode} />
                     <div className="flex h-[var(--content-height)] max-w-full grow-0 flex-row">
                        {children}
                     </div>
                  </ClientReactQueryProvider>
               </SupabaseProvider>
            </SSRProvider>
         </body>
      </html>
   );
}
