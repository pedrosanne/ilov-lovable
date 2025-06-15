
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          cover_image_url: string | null
          is_provider: boolean
          is_admin: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
          presentation_name: string | null
          bio: string | null
          location: string | null
          profession: string | null
          birth_date: string | null
          website: string | null
          instagram_handle: string | null
          twitter_handle: string | null
          followers_count: number | null
          following_count: number | null
          posts_count: number | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          is_provider?: boolean
          is_admin?: boolean
          is_verified?: boolean
          presentation_name?: string | null
          bio?: string | null
          location?: string | null
          profession?: string | null
          birth_date?: string | null
          website?: string | null
          instagram_handle?: string | null
          twitter_handle?: string | null
          followers_count?: number | null
          following_count?: number | null
          posts_count?: number | null
        }
        Update: {
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          is_provider?: boolean
          is_admin?: boolean
          is_verified?: boolean
          presentation_name?: string | null
          bio?: string | null
          location?: string | null
          profession?: string | null
          birth_date?: string | null
          website?: string | null
          instagram_handle?: string | null
          twitter_handle?: string | null
          followers_count?: number | null
          following_count?: number | null
          posts_count?: number | null
        }
      }
      identity_verifications: {
        Row: {
          id: string
          user_id: string
          document_type: 'rg' | 'cnh' | 'passport'
          document_front_url: string
          document_back_url: string | null
          selfie_with_document_url: string
          verification_video_url: string
          status: 'pending' | 'approved' | 'rejected'
          rejection_reason: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          document_type: 'rg' | 'cnh' | 'passport'
          document_front_url: string
          document_back_url?: string | null
          selfie_with_document_url: string
          verification_video_url: string
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
        }
        Update: {
          document_type?: 'rg' | 'cnh' | 'passport'
          document_front_url?: string
          document_back_url?: string | null
          selfie_with_document_url?: string
          verification_video_url?: string
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
        }
      }
      conversations: {
        Row: {
          id: string
          participant_1: string
          participant_2: string
          last_message_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          participant_1: string
          participant_2: string
          last_message_at?: string | null
        }
        Update: {
          last_message_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          message_type: string | null
          media_url: string | null
          is_read: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          conversation_id: string
          sender_id: string
          content: string
          message_type?: string | null
          media_url?: string | null
          is_read?: boolean | null
        }
        Update: {
          content?: string
          message_type?: string | null
          media_url?: string | null
          is_read?: boolean | null
        }
      }
      ads: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          price: number | null
          category: 'beleza' | 'saude' | 'casa' | 'tecnologia' | 'educacao' | 'servicos_gerais' | 'consultoria' | 'eventos' | 'acompanhante'
          location: string
          whatsapp: string
          status: 'active' | 'inactive' | 'pending_approval' | 'rejected'
          image_url: string | null
          video_url: string | null
          views_count: number
          clicks_count: number
          created_at: string
          updated_at: string
          presentation_name: string | null
          age: number | null
          gender: string | null
          ethnicity: string | null
          height: number | null
          weight: number | null
          body_type: string | null
          languages: string[] | null
          highlight_phrase: string | null
          services_offered: string[] | null
          target_audience: string[] | null
          service_locations: string[] | null
          availability_days: string[] | null
          availability_hours: any | null
          appointment_only: boolean | null
          neighborhood: string | null
          postal_code: string | null
          accepts_travel: boolean | null
          hourly_rate: number | null
          packages: any | null
          payment_methods: string[] | null
          photos: any | null
          videos: any | null
          contact_telegram: string | null
          contact_instagram: string | null
          contact_email: string | null
          contact_other: string | null
          terms_accepted: boolean | null
          age_confirmed: boolean | null
          image_consent: boolean | null
          accepts_last_minute: boolean | null
          restrictions: string | null
          personal_rules: string | null
          favorite_fragrance: string | null
          favorite_drink: string | null
          preferred_gifts: string | null
          favorite_music: string | null
          highlight_package: string | null
          voice_audio_url: string | null
          voice_audio: string | null
        }
        Insert: {
          user_id: string
          title: string
          description: string
          price?: number | null
          category: 'beleza' | 'saude' | 'casa' | 'tecnologia' | 'educacao' | 'servicos_gerais' | 'consultoria' | 'eventos' | 'acompanhante'
          location: string
          whatsapp: string
          status?: 'active' | 'inactive' | 'pending_approval' | 'rejected'
          image_url?: string | null
          video_url?: string | null
          presentation_name?: string | null
          age?: number | null
          gender?: string | null
          ethnicity?: string | null
          height?: number | null
          weight?: number | null
          body_type?: string | null
          languages?: string[] | null
          highlight_phrase?: string | null
          services_offered?: string[] | null
          target_audience?: string[] | null
          service_locations?: string[] | null
          availability_days?: string[] | null
          availability_hours?: any | null
          appointment_only?: boolean | null
          neighborhood?: string | null
          postal_code?: string | null
          accepts_travel?: boolean | null
          hourly_rate?: number | null
          packages?: any | null
          payment_methods?: string[] | null
          photos?: any | null
          videos?: any | null
          contact_telegram?: string | null
          contact_instagram?: string | null
          contact_email?: string | null
          contact_other?: string | null
          terms_accepted?: boolean | null
          age_confirmed?: boolean | null
          image_consent?: boolean | null
          accepts_last_minute?: boolean | null
          restrictions?: string | null
          personal_rules?: string | null
          favorite_fragrance?: string | null
          favorite_drink?: string | null
          preferred_gifts?: string | null
          favorite_music?: string | null
          highlight_package?: string | null
          voice_audio_url?: string | null
          voice_audio?: string | null
        }
        Update: {
          title?: string
          description?: string
          price?: number | null
          category?: 'beleza' | 'saude' | 'casa' | 'tecnologia' | 'educacao' | 'servicos_gerais' | 'consultoria' | 'eventos' | 'acompanhante'
          location?: string
          whatsapp?: string
          status?: 'active' | 'inactive' | 'pending_approval' | 'rejected'
          image_url?: string | null
          video_url?: string | null
          presentation_name?: string | null
          age?: number | null
          gender?: string | null
          ethnicity?: string | null
          height?: number | null
          weight?: number | null
          body_type?: string | null
          languages?: string[] | null
          highlight_phrase?: string | null
          services_offered?: string[] | null
          target_audience?: string[] | null
          service_locations?: string[] | null
          availability_days?: string[] | null
          availability_hours?: any | null
          appointment_only?: boolean | null
          neighborhood?: string | null
          postal_code?: string | null
          accepts_travel?: boolean | null
          hourly_rate?: number | null
          packages?: any | null
          payment_methods?: string[] | null
          photos?: any | null
          videos?: any | null
          contact_telegram?: string | null
          contact_instagram?: string | null
          contact_email?: string | null
          contact_other?: string | null
          terms_accepted?: boolean | null
          age_confirmed?: boolean | null
          image_consent?: boolean | null
          accepts_last_minute?: boolean | null
          restrictions?: string | null
          personal_rules?: string | null
          favorite_fragrance?: string | null
          favorite_drink?: string | null
          preferred_gifts?: string | null
          favorite_music?: string | null
          highlight_package?: string | null
          voice_audio_url?: string | null
          voice_audio?: string | null
        }
      }
      highlight_packages: {
        Row: {
          id: string
          name: string
          price: number
          duration_days: number
          features: any
          created_at: string
        }
        Insert: {
          name: string
          price: number
          duration_days: number
          features: any
        }
        Update: {
          name?: string
          price?: number
          duration_days?: number
          features?: any
        }
      }
    }
  }
}

export type Ad = Database['public']['Tables']['ads']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
}

export type HighlightPackage = Database['public']['Tables']['highlight_packages']['Row']

export type Conversation = Database['public']['Tables']['conversations']['Row']

export type Message = Database['public']['Tables']['messages']['Row']
