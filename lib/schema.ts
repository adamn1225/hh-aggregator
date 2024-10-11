export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          task: string | null
          user_id: string
          due_date: string | null
          app_url: string | null
          in_progress: boolean | null // Add in_progress here
          reminder_time: string | null // Add reminder_time here
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id: string
          due_date?: string | null
          app_url?: string | null
          in_progress?: boolean | null // Add in_progress here
          reminder_time?: string | null // Add reminder_time here
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id?: string
          due_date?: string | null
          app_url?: string | null
          in_progress?: boolean | null // Add in_progress here
          reminder_time?: string | null // Add reminder_time here
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Define the Task type
export type Task = Database['public']['Tables']['todos']['Row'];