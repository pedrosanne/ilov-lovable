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
      ad_clicks: {
        Row: {
          ad_id: string
          clicked_at: string | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          ad_id: string
          clicked_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          ad_id?: string
          clicked_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_clicks_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_clicks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_views: {
        Row: {
          ad_id: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          ad_id: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          ad_id?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_views_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          accepts_last_minute: boolean | null
          accepts_travel: boolean | null
          age: number | null
          age_confirmed: boolean | null
          appointment_only: boolean | null
          availability_days: string[] | null
          availability_hours: Json | null
          body_type: string | null
          category: Database["public"]["Enums"]["category_type"]
          clicks_count: number | null
          contact_email: string | null
          contact_instagram: string | null
          contact_other: string | null
          contact_telegram: string | null
          created_at: string | null
          description: string
          ethnicity: string | null
          favorite_drink: string | null
          favorite_fragrance: string | null
          favorite_music: string | null
          gender: string | null
          height: number | null
          highlight_package: string | null
          highlight_phrase: string | null
          hourly_rate: number | null
          id: string
          image_consent: boolean | null
          image_url: string | null
          languages: string[] | null
          location: string
          neighborhood: string | null
          packages: Json | null
          payment_methods: string[] | null
          personal_rules: string | null
          photos: Json | null
          postal_code: string | null
          preferred_gifts: string | null
          presentation_name: string | null
          price: number
          restrictions: string | null
          service_locations: string[] | null
          services_offered: string[] | null
          status: Database["public"]["Enums"]["ad_status"] | null
          target_audience: string[] | null
          terms_accepted: boolean | null
          title: string
          updated_at: string | null
          user_id: string
          video_url: string | null
          videos: Json | null
          views_count: number | null
          weight: number | null
          whatsapp: string
        }
        Insert: {
          accepts_last_minute?: boolean | null
          accepts_travel?: boolean | null
          age?: number | null
          age_confirmed?: boolean | null
          appointment_only?: boolean | null
          availability_days?: string[] | null
          availability_hours?: Json | null
          body_type?: string | null
          category: Database["public"]["Enums"]["category_type"]
          clicks_count?: number | null
          contact_email?: string | null
          contact_instagram?: string | null
          contact_other?: string | null
          contact_telegram?: string | null
          created_at?: string | null
          description: string
          ethnicity?: string | null
          favorite_drink?: string | null
          favorite_fragrance?: string | null
          favorite_music?: string | null
          gender?: string | null
          height?: number | null
          highlight_package?: string | null
          highlight_phrase?: string | null
          hourly_rate?: number | null
          id?: string
          image_consent?: boolean | null
          image_url?: string | null
          languages?: string[] | null
          location: string
          neighborhood?: string | null
          packages?: Json | null
          payment_methods?: string[] | null
          personal_rules?: string | null
          photos?: Json | null
          postal_code?: string | null
          preferred_gifts?: string | null
          presentation_name?: string | null
          price: number
          restrictions?: string | null
          service_locations?: string[] | null
          services_offered?: string[] | null
          status?: Database["public"]["Enums"]["ad_status"] | null
          target_audience?: string[] | null
          terms_accepted?: boolean | null
          title: string
          updated_at?: string | null
          user_id: string
          video_url?: string | null
          videos?: Json | null
          views_count?: number | null
          weight?: number | null
          whatsapp: string
        }
        Update: {
          accepts_last_minute?: boolean | null
          accepts_travel?: boolean | null
          age?: number | null
          age_confirmed?: boolean | null
          appointment_only?: boolean | null
          availability_days?: string[] | null
          availability_hours?: Json | null
          body_type?: string | null
          category?: Database["public"]["Enums"]["category_type"]
          clicks_count?: number | null
          contact_email?: string | null
          contact_instagram?: string | null
          contact_other?: string | null
          contact_telegram?: string | null
          created_at?: string | null
          description?: string
          ethnicity?: string | null
          favorite_drink?: string | null
          favorite_fragrance?: string | null
          favorite_music?: string | null
          gender?: string | null
          height?: number | null
          highlight_package?: string | null
          highlight_phrase?: string | null
          hourly_rate?: number | null
          id?: string
          image_consent?: boolean | null
          image_url?: string | null
          languages?: string[] | null
          location?: string
          neighborhood?: string | null
          packages?: Json | null
          payment_methods?: string[] | null
          personal_rules?: string | null
          photos?: Json | null
          postal_code?: string | null
          preferred_gifts?: string | null
          presentation_name?: string | null
          price?: number
          restrictions?: string | null
          service_locations?: string[] | null
          services_offered?: string[] | null
          status?: Database["public"]["Enums"]["ad_status"] | null
          target_audience?: string[] | null
          terms_accepted?: boolean | null
          title?: string
          updated_at?: string | null
          user_id?: string
          video_url?: string | null
          videos?: Json | null
          views_count?: number | null
          weight?: number | null
          whatsapp?: string
        }
        Relationships: [
          {
            foreignKeyName: "ads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          participant_1: string
          participant_2: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          participant_1: string
          participant_2: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          participant_1?: string
          participant_2?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_participant_1_fkey"
            columns: ["participant_1"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant_2_fkey"
            columns: ["participant_2"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          ad_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          ad_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          ad_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      highlight_packages: {
        Row: {
          created_at: string | null
          duration_days: number
          features: Json
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string | null
          duration_days: number
          features: Json
          id?: string
          name: string
          price: number
        }
        Update: {
          created_at?: string | null
          duration_days?: number
          features?: Json
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          media_url: string | null
          message_type: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          media_url?: string | null
          message_type?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          media_url?: string | null
          message_type?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "profile_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "profile_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_posts: {
        Row: {
          comments_count: number | null
          content: string | null
          created_at: string
          id: string
          likes_count: number | null
          media_type: string | null
          media_urls: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          comments_count?: number | null
          content?: string | null
          created_at?: string
          id?: string
          likes_count?: number | null
          media_type?: string | null
          media_urls?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          comments_count?: number | null
          content?: string | null
          created_at?: string
          id?: string
          likes_count?: number | null
          media_type?: string | null
          media_urls?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_stories: {
        Row: {
          caption: string | null
          created_at: string
          expires_at: string
          id: string
          media_type: string
          media_url: string
          user_id: string
          views_count: number | null
        }
        Insert: {
          caption?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          media_type: string
          media_url: string
          user_id: string
          views_count?: number | null
        }
        Update: {
          caption?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          media_type?: string
          media_url?: string
          user_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birth_date: string | null
          cover_image_url: string | null
          created_at: string | null
          email: string
          followers_count: number | null
          following_count: number | null
          full_name: string | null
          id: string
          instagram_handle: string | null
          is_admin: boolean | null
          is_provider: boolean | null
          location: string | null
          phone: string | null
          posts_count: number | null
          presentation_name: string | null
          profession: string | null
          twitter_handle: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          email: string
          followers_count?: number | null
          following_count?: number | null
          full_name?: string | null
          id: string
          instagram_handle?: string | null
          is_admin?: boolean | null
          is_provider?: boolean | null
          location?: string | null
          phone?: string | null
          posts_count?: number | null
          presentation_name?: string | null
          profession?: string | null
          twitter_handle?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          email?: string
          followers_count?: number | null
          following_count?: number | null
          full_name?: string | null
          id?: string
          instagram_handle?: string | null
          is_admin?: boolean | null
          is_provider?: boolean | null
          location?: string | null
          phone?: string | null
          posts_count?: number | null
          presentation_name?: string | null
          profession?: string | null
          twitter_handle?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      story_views: {
        Row: {
          created_at: string
          id: string
          ip_address: unknown | null
          story_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          story_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          story_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_views_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "profile_stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      clean_expired_stories: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_or_create_conversation: {
        Args: { user1_id: string; user2_id: string }
        Returns: string
      }
    }
    Enums: {
      ad_status: "active" | "inactive" | "pending_approval" | "rejected"
      category_type:
        | "beleza"
        | "saude"
        | "casa"
        | "tecnologia"
        | "educacao"
        | "servicos_gerais"
        | "consultoria"
        | "eventos"
        | "acompanhante"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ad_status: ["active", "inactive", "pending_approval", "rejected"],
      category_type: [
        "beleza",
        "saude",
        "casa",
        "tecnologia",
        "educacao",
        "servicos_gerais",
        "consultoria",
        "eventos",
        "acompanhante",
      ],
    },
  },
} as const
