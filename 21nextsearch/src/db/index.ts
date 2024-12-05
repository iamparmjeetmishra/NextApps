import env from "@/env/server"
import { drizzle } from "drizzle-orm/neon-http"
import {neon} from "@neondatabase/serverless"

//for Query purposes
const queryClient = neon(env.DATABASE_URL)
console.log('queryClient', queryClient)
const db = drizzle({client: queryClient})

export default db