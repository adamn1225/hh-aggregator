// lib/database.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './schema';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function getTasksDueNow() {
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const currentTime = now.toTimeString().split(' ')[0]; // Get current time in HH:MM:SS format

    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('due_date', today)
        .eq('reminder_time', currentTime)
        .is('is_complete', false);

    if (error) {
        console.error('Error fetching due tasks:', error);
        return [];
    }

    return data;
}