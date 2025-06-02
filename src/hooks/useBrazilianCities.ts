
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BrazilianCity {
  id: string;
  name: string;
  state_code: string;
  state_name: string;
  latitude: number;
  longitude: number;
  population: number;
}

export function useBrazilianCities() {
  return useQuery({
    queryKey: ['brazilian-cities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brazilian_cities')
        .select('*')
        .order('population', { ascending: false });

      if (error) {
        throw error;
      }

      return data as BrazilianCity[];
    },
  });
}

export function useSearchBrazilianCities(searchTerm: string) {
  return useQuery({
    queryKey: ['search-brazilian-cities', searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2) {
        return [];
      }

      const { data, error } = await supabase
        .from('brazilian_cities')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,state_name.ilike.%${searchTerm}%`)
        .order('population', { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }

      return data as BrazilianCity[];
    },
    enabled: searchTerm.length >= 2,
  });
}
