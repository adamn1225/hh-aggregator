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
      freight: {
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          freight_type: string | null
          make: string | null
          model: string | null
          year: string | null
          pallets: string | null
          serial_number: string | null
          dimensions: string | null
          freight_id: string | null
          freight_class: string | null
          status: string | null
          user_id: string
          due_date: string | null
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
          in_progress?: boolean | null
          reminder_time?: string | null
        }
      },
      shippingQuotes: {
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          origin_city: string | null
          origin_state: string | null
          origin_zip: string | null
          destination_city: string | null
          destination_state: string | null
          destination_zip: string | null
          user_id: string
          due_date: string | null
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          origin_city?: string | null
          origin_state?: string | null
          origin_zip?: string | null
          destination_city?: string | null
          destination_state?: string | null
          destination_zip?: string | null
          user_id: string
          due_date?: string | null
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          origin_city?: string | null
          origin_state?: string | null
          origin_zip?: string | null
          destination_city?: string | null
          destination_state?: string | null
          destination_zip?: string | null
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
export type Task = Database['public']['Tables']['freight']['Row'];