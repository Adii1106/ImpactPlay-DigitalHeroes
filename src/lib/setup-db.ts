import { Client } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();

  const migrationsDir = path.join(process.cwd(), "supabase", "migrations");
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (file.endsWith(".sql")) {
      console.log(`Applying migration: ${file}...`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      
      // pg client supports multiple statements separated by semicolon in a single query() call
      await client.query(sql);
      console.log(`Finished ${file}`);
    }
  }

  await client.end();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
