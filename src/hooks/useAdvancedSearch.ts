
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
}

export function useAdvancedSearch(filters: SearchFilters) {
  return useQuery({
    queryKey: ['advanced-search', filters],
    queryFn: async () => {
      console.log('Searching with filters:', filters);
      
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

      if (error) {
        console.error('Search error:', error);
        throw error;
      }

      console.log('Search results:', data);
      return data as SearchResult[];
    },
  });
}
