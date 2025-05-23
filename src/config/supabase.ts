import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
export {}; // <--- add this temporarily to make sure TypeScript treats it as a module

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);