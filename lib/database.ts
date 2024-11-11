// lib/database.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './schema';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

