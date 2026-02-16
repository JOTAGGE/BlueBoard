import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
