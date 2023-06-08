import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = Object.freeze(
   createEnv({
      /*
       * Serverside Environment variables, not available on the client.
       * Will throw if you access these variables on the client.
       */
      server: {
         IP_GEOLOCATION_API_KEY: z.string(),
         IP_GEOLOCATION_API_URL: z.string().url(),
         // SUPABASE_SECRET_KEY: z.string(),
      },
      /*
       * Environment variables available on the client (and server).
       *
       * 💡 You'll get typeerrors if these are not prefixed with NEXT_PUBLIC_.
       */
      client: {
         // NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
         // NEXT_PUBLIC_SUPABASE_URL: z.string(),
      },
      /*
       * Due to how Next.js bundles environment variables on Edge and Client,
       * we need to manually destructure them to make sure all are included in bundle.
       *
       * 💡 You'll get typeerrors if not all variables from `server` & `client` are included here.
       */
      runtimeEnv: {
         IP_GEOLOCATION_API_KEY: process.env["IP_GEOLOCATION_API_KEY"],
         IP_GEOLOCATION_API_URL: process.env["IP_GEOLOCATION_API_URL"],
         // NEXT_PUBLIC_SUPABASE_ANON_KEY:
            // process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"],
         // NEXT_PUBLIC_SUPABASE_URL: process.env["NEXT_PUBLIC_SUPABASE_URL"],
         // SUPABASE_SECRET_KEY: process.env["SUPABASE_SECRET_KEY"],
      },
   })
);

export const getBaseUrl = () => {
   if (typeof window !== "undefined") return ""; // browser should use relative url
   if (process.env["VERCEL_URL"]) return `https://${process.env["VERCEL_URL"]}/`; // SSR should use vercel url
   return `http://127.0.0.1:${process.env["PORT"] ?? 4200}/`; // dev SSR should use localhost
};
