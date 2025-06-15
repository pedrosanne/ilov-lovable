
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Ad } from '@/types/database';
import { CategoryType } from '@/types/adHooks';

export function useAds(searchTerm?: string, category?: string, location?: string) {
  return useQuery({
    queryKey: ['ads', searchTerm, category, location],
    queryFn: async () => {
      let query = supabase
        .from('ads')
        .select(`
          *,
          profiles (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (category) {
        query = query.eq('category', category as CategoryType);
      }

      if (location) {
        query = query.ilike('location', `%${location}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as Ad[];
    },
  });
}

export function useAd(id: string) {
  return useQuery({
    queryKey: ['ad', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select(`
          *,
          profiles (
            id,
            full_name,
            avatar_url,
            phone
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data as Ad;
    },
  });
}

export function useMyAds() {
  return useQuery({
    queryKey: ['my-ads'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
