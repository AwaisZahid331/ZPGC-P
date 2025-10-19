import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/Utils/Constants.js";

export default defineConfig({
  schema: "./db/Schemas/index.js",  
  out: "./drizzle",
  driver: "pg",                    
  dbCredentials: {
    connectionString: DATABASE_URL, 
  },
});
