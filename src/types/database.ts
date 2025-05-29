
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
          is_provider: boolean
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_provider?: boolean
          is_admin?: boolean
        }
        Update: {
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_provider?: boolean
          is_admin?: boolean
        }
      }
      ads: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          price: number
          category: 'beleza' | 'saude' | 'casa' | 'tecnologia' | 'educacao' | 'servicos_gerais' | 'consultoria' | 'eventos'
          location: string
          whatsapp: string
          status: 'active' | 'inactive' | 'pending_approval' | 'rejected'
          image_url: string | null
          video_url: string | null
          views_count: number
          clicks_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          title: string
          description: string
          price: number
          category: 'beleza' | 'saude' | 'casa' | 'tecnologia' | 'educacao' | 'servicos_gerais' | 'consultoria' | 'eventos'
          location: string
          whatsapp: string
          status?: 'active' | 'inactive' | 'pending_approval' | 'rejected'
          image_url?: string | null
          video_url?: string | null
        }
        Update: {
          title?: string
          description?: string
          price?: number
          category?: 'beleza' | 'saude' | 'casa' | 'tecnologia' | 'educacao' | 'servicos_gerais' | 'consultoria' | 'eventos'
          location?: string
          whatsapp?: string
          status?: 'active' | 'inactive' | 'pending_approval' | 'rejected'
          image_url?: string | null
          video_url?: string | null
        }
      }
    }
  }
}

export type Ad = Database['public']['Tables']['ads']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
}
