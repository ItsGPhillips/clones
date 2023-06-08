import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

(async () => {
   const pool = new Pool({
      connectionString: process.env["DATABASE_URL"],
   });
   const db = drizzle(pool);

   // this will automatically run needed migrations on the database
   await migrate(db, { migrationsFolder: "./migrations" });
})();
