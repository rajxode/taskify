
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL as string;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { 
                prepare: false,
                max:10,
                idle_timeout:20,
                connect_timeout:10
            });
            
export const db = drizzle(client);