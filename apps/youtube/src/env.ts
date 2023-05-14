// src/env.mjs
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
      },
      /*
       * Environment variables available on the client (and server).
       *
       * 💡 You'll get typeerrors if these are not prefixed with NEXT_PUBLIC_.
       */
      client: {},
      /*
       * Due to how Next.js bundles environment variables on Edge and Client,
       * we need to manually destructure them to make sure all are included in bundle.
       *
       * 💡 You'll get typeerrors if not all variables from `server` & `client` are included here.
       */
      runtimeEnv: {
         IP_GEOLOCATION_API_KEY: process.env.IP_GEOLOCATION_API_KEY,
         IP_GEOLOCATION_API_URL: process.env.IP_GEOLOCATION_API_URL,
      },
   })
);
