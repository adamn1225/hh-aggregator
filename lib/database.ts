// lib/database.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './schema';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function getTasksDueNow() {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .lte('due_date', now)
        .is('is_complete', false);

    if (error) {
        console.error('Error fetching due tasks:', error);
        return [];
    }

    return data;
}