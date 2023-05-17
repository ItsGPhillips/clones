import "./global.css";
import { headers as Headers } from "next/headers";
import { cn } from "@shared/utils/cn";
import * as Tooltip from "@shared/components/Tooltip";
import { env } from "@youtube/app/env";
import { use } from "react";
import { Header } from "@youtube/components/Header";

import { Roboto } from "next/font/google";
const roboto = Roboto({
   subsets: ["latin"],
   weight: ["400", "100", "300", "700"],
});

export const metadata = {
   title: "Nx Next App",
   description: "Generated by create-nx-workspace",
};

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

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const headers = Headers();
   const contryCode = use(getContryCode(headers.get("x-forwarded-for")));
   return (
      <html lang="en">
         <body
            className={cn(
               "bg-dark-800 relative isolate z-0 min-h-screen text-white",
               roboto.className
            )}
         >
            <Tooltip.Provider delayDuration={100}>
               <Header contryCode={contryCode} />
               {children}
            </Tooltip.Provider>
         </body>
      </html>
   );
}