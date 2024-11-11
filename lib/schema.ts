export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      finance_leads: {
        Row: {
          amount_requested: string | null
          annual_income: string | null
          business_address: string | null
          business_city: string | null
          business_state: string | null
          business_zip: string | null
          company_name: string | null
          contact_email: string | null
          contact_first_name: string | null
          contact_last_name: string | null
          contact_message: string | null
          contact_phone: string | null
          created_at: string | null
          date_business_established: string | null
          fico: string | null
          id: number
          loan_type: 'business' | 'personal' | null
          revenue_pm: string | null
        }
        Insert: {
          amount_requested?: string | null
          annual_income?: string | null
          business_address?: string | null
          business_city?: string | null
          business_state?: string | null
          business_zip?: string | null
          company_name?: string | null
          contact_email?: string | null
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_message?: string | null
          contact_phone?: string | null
          created_at?: string | null
          date_business_established?: string | null
          fico?: string | null
          id?: number
          loan_type?: 'business' | 'personal' | null
          revenue_pm?: string | null
        }
        Update: {
          amount_requested?: string | null
          annual_income?: string | null
          business_address?: string | null
          business_city?: string | null
          business_state?: string | null
          business_zip?: string | null
          company_name?: string | null
          contact_email?: string | null
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_message?: string | null
          contact_phone?: string | null
          created_at?: string | null
          date_business_established?: string | null
          fico?: string | null
          id?: number
          loan_type?: 'business' | 'personal' | null
          revenue_pm?: string | null
        }
        Relationships: []
      }
      home_moving_leads: {
        Row: {
          contact_email: string | null
          contact_first_name: string | null
          contact_last_name: string | null
          contact_phone: string | null
          id: number
          moving_date: string | null
          room_count: string | null
          shipping_from: string | null
          shipping_to: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_phone?: string | null
          id?: number
          moving_date?: string | null
          room_count?: string | null
          shipping_from?: string | null
          shipping_to?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_phone?: string | null
          id?: number
          moving_date?: string | null
          room_count?: string | null
          shipping_from?: string | null
          shipping_to?: string | null
        }
        Relationships: []
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
export type Task = Database['public']['Tables']['finance_leads']['Row'];
export type HomeMovingLeads = Database['public']['Tables']['home_moving_leads']['Row'];