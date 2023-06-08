import type { Config } from "drizzle-kit";

export default {
   schema: "./src/index.ts",
   out: "./migrations",
   connectionString: process.env["DATABASE_URL"]!,
} satisfies Config;
