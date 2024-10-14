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
          in_progress: boolean | null
          reminder_time: string | null
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id: string
          due_date?: string | null
          app_url?: string | null
          in_progress?: boolean | null
          reminder_time?: string | null
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id?: string
          due_date?: string | null
          app_url?: string | null
          in_progress?: boolean | null
          reminder_time?: string | null
        }
      },
      goals: { // Add the goals table here
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          goal: string | null
          user_id: string
          due_date: string | null
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          goal?: string | null
          user_id: string
          due_date?: string | null
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          goal?: string | null
          user_id?: string
          due_date?: string | null
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