export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          additional_information: string | null
          archived: boolean
          consent_confirmed: boolean
          country: string
          cover_letter: string | null
          created_at: string
          current_location: string | null
          email: string
          email_delivery_status: string
          full_name: string
          highest_qualification: string | null
          id: string
          job_id: string
          linkedin_url: string | null
          phone: string | null
          portfolio_url: string | null
          recruiter_notes: string | null
          relevant_skills: string | null
          resume_mime: string
          resume_name: string
          resume_path: string
          status: Database["public"]["Enums"]["application_status"]
          submitted_ip_hash: string | null
          updated_at: string
          years_experience: string | null
        }
        Insert: {
          additional_information?: string | null
          archived?: boolean
          consent_confirmed: boolean
          country: string
          cover_letter?: string | null
          created_at?: string
          current_location?: string | null
          email: string
          email_delivery_status?: string
          full_name: string
          highest_qualification?: string | null
          id?: string
          job_id: string
          linkedin_url?: string | null
          phone?: string | null
          portfolio_url?: string | null
          recruiter_notes?: string | null
          relevant_skills?: string | null
          resume_mime: string
          resume_name: string
          resume_path: string
          status?: Database["public"]["Enums"]["application_status"]
          submitted_ip_hash?: string | null
          updated_at?: string
          years_experience?: string | null
        }
        Update: {
          additional_information?: string | null
          archived?: boolean
          consent_confirmed?: boolean
          country?: string
          cover_letter?: string | null
          created_at?: string
          current_location?: string | null
          email?: string
          email_delivery_status?: string
          full_name?: string
          highest_qualification?: string | null
          id?: string
          job_id?: string
          linkedin_url?: string | null
          phone?: string | null
          portfolio_url?: string | null
          recruiter_notes?: string | null
          relevant_skills?: string | null
          resume_mime?: string
          resume_name?: string
          resume_path?: string
          status?: Database["public"]["Enums"]["application_status"]
          submitted_ip_hash?: string | null
          updated_at?: string
          years_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          application_deadline: string | null
          category: string
          country: string
          created_at: string
          description: string
          employer_label: string
          employment_type: string
          experience_level: string
          id: string
          is_published: boolean
          is_sample: boolean
          posted_at: string
          preferred_qualifications: string[]
          requirements: string[]
          responsibilities: string[]
          salary_range: string | null
          slug: string
          summary: string
          title: string
          updated_at: string
          work_arrangement: string
        }
        Insert: {
          application_deadline?: string | null
          category: string
          country: string
          created_at?: string
          description: string
          employer_label: string
          employment_type: string
          experience_level: string
          id?: string
          is_published?: boolean
          is_sample?: boolean
          posted_at?: string
          preferred_qualifications?: string[]
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string | null
          slug: string
          summary: string
          title: string
          updated_at?: string
          work_arrangement: string
        }
        Update: {
          application_deadline?: string | null
          category?: string
          country?: string
          created_at?: string
          description?: string
          employer_label?: string
          employment_type?: string
          experience_level?: string
          id?: string
          is_published?: boolean
          is_sample?: boolean
          posted_at?: string
          preferred_qualifications?: string[]
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string | null
          slug?: string
          summary?: string
          title?: string
          updated_at?: string
          work_arrangement?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "recruiter"
      application_status:
        | "new"
        | "reviewing"
        | "shortlisted"
        | "interview"
        | "declined"
        | "hired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "recruiter"],
      application_status: [
        "new",
        "reviewing",
        "shortlisted",
        "interview",
        "declined",
        "hired",
      ],
    },
  },
} as const
