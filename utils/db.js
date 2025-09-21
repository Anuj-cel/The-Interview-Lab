"use client"
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
console.log("This is connection string",process.env.NEXT_PUBLIC_DATABASE_URL)
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
const db = drizzle(sql,{schema} );
 export default db;