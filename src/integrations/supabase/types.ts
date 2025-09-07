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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      activity_data: {
        Row: {
          calories: number | null
          created_at: string
          date: string
          distance: number | null
          id: string
          is_connected: boolean | null
          steps: number | null
          updated_at: string
          user_id: string
          weekly_steps: Json | null
        }
        Insert: {
          calories?: number | null
          created_at?: string
          date?: string
          distance?: number | null
          id?: string
          is_connected?: boolean | null
          steps?: number | null
          updated_at?: string
          user_id: string
          weekly_steps?: Json | null
        }
        Update: {
          calories?: number | null
          created_at?: string
          date?: string
          distance?: number | null
          id?: string
          is_connected?: boolean | null
          steps?: number | null
          updated_at?: string
          user_id?: string
          weekly_steps?: Json | null
        }
        Relationships: []
      }
      gamification_data: {
        Row: {
          achievements: Json | null
          badges: Json | null
          challenges: Json | null
          created_at: string
          id: string
          last_active_date: string | null
          level: number | null
          points: number | null
          streak: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          badges?: Json | null
          challenges?: Json | null
          created_at?: string
          id?: string
          last_active_date?: string | null
          level?: number | null
          points?: number | null
          streak?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements?: Json | null
          badges?: Json | null
          challenges?: Json | null
          created_at?: string
          id?: string
          last_active_date?: string | null
          level?: number | null
          points?: number | null
          streak?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      nutrition_data: {
        Row: {
          created_at: string
          daily_goals: Json | null
          date: string
          id: string
          meals: Json | null
          totals: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_goals?: Json | null
          date?: string
          id?: string
          meals?: Json | null
          totals?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          daily_goals?: Json | null
          date?: string
          id?: string
          meals?: Json | null
          totals?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          email: string | null
          gamification: Json | null
          gender: string | null
          goal: string | null
          height: number | null
          id: string
          name: string | null
          preferences: Json | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          gamification?: Json | null
          gender?: string | null
          goal?: string | null
          height?: number | null
          id?: string
          name?: string | null
          preferences?: Json | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          gamification?: Json | null
          gender?: string | null
          goal?: string | null
          height?: number | null
          id?: string
          name?: string | null
          preferences?: Json | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      regime_data: {
        Row: {
          calories_history: Json | null
          created_at: string
          date: string
          id: string
          jours_suivis: number | null
          moyenne_calories: number | null
          perte_graisse: number | null
          poids_actuel: number | null
          poids_cible: number | null
          poids_initial: number | null
          updated_at: string
          user_id: string
          weight_history: Json | null
        }
        Insert: {
          calories_history?: Json | null
          created_at?: string
          date?: string
          id?: string
          jours_suivis?: number | null
          moyenne_calories?: number | null
          perte_graisse?: number | null
          poids_actuel?: number | null
          poids_cible?: number | null
          poids_initial?: number | null
          updated_at?: string
          user_id: string
          weight_history?: Json | null
        }
        Update: {
          calories_history?: Json | null
          created_at?: string
          date?: string
          id?: string
          jours_suivis?: number | null
          moyenne_calories?: number | null
          perte_graisse?: number | null
          poids_actuel?: number | null
          poids_cible?: number | null
          poids_initial?: number | null
          updated_at?: string
          user_id?: string
          weight_history?: Json | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
