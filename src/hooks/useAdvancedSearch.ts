
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SearchFilters {
  searchTerm?: string;
  category?: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  image_url: string;
  whatsapp: string;
  user_id: string;
  views_count: number;
  distance_km: number;
  created_at: string;
  identity_verification_video_url?: string;
  identity_verification_status?: string;
  status: string;
}

export function useAdvancedSearch(filters: SearchFilters) {
  return useQuery({
    queryKey: ['advanced-search', filters],
    queryFn: async () => {
      console.log('Searching with filters:', filters);
      
      // Usar a função existente se estiver disponível, senão fazer query simples
      try {
        const { data, error } = await supabase.rpc('search_ads_by_location', {
          search_lat: filters.latitude || null,
          search_lng: filters.longitude || null,
          search_radius_km: filters.radiusKm || 50,
          search_term: filters.searchTerm || null,
          search_category: filters.category || null,
          search_city: filters.city || null,
          search_state: filters.state || null,
          limit_count: 20,
        });

        if (error) throw error;
        return data as SearchResult[];
      } catch (err) {
        console.log('RPC function not available, using simple query');
        
        // Fallback para query simples
        let query = supabase
          .from('ads')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(20);

        if (filters.searchTerm) {
          query = query.or(`title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
        }

        if (filters.category) {
          // Garantir que a categoria seja válida e fazer cast para o tipo correto
          const validCategories = ['beleza', 'saude', 'casa', 'tecnologia', 'educacao', 'servicos_gerais', 'consultoria', 'eventos', 'acompanhante'] as const;
          if (validCategories.includes(filters.category as any)) {
            query = query.eq('category', filters.category as typeof validCategories[number]);
          }
        }

        if (filters.city) {
          query = query.ilike('location', `%${filters.city}%`);
        }

        if (filters.state) {
          query = query.ilike('location', `%${filters.state}%`);
        }

        const { data, error: queryError } = await query;

        if (queryError) {
          console.error('Search error:', queryError);
          throw queryError;
        }

        console.log('Search results:', data);
        return data?.map(ad => ({
          ...ad,
          distance_km: 0, // Sem cálculo de distância no fallback
          city: ad.location || '', // Usar location como city temporariamente
          state: ad.location || '', // Usar location como state temporariamente
          latitude: 0, // Valor padrão até ter os campos reais
          longitude: 0, // Valor padrão até ter os campos reais
          identity_verification_video_url: '', // Valor padrão até ter o campo real
          identity_verification_status: 'pending', // Valor padrão até ter o campo real
        })) as SearchResult[] || [];
      }
    },
  });
}
