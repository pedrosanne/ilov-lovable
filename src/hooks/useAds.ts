
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Ad, Database } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

type AdInsert = Database['public']['Tables']['ads']['Insert'];
type CategoryType = Database['public']['Tables']['ads']['Row']['category'];

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

export function useCreateAd() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (ad: AdInsert) => {
      const { data, error } = await supabase
        .from('ads')
        .insert(ad)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast({
        title: "Anúncio criado!",
        description: "Seu anúncio foi enviado para aprovação.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar anúncio",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useMyAds() {
  return useQuery({
    queryKey: ['my-ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}

export function useAdStats() {
  return useQuery({
    queryKey: ['ad-stats'],
    queryFn: async () => {
      const { data: ads, error: adsError } = await supabase
        .from('ads')
        .select('id, views_count, clicks_count');

      if (adsError) {
        throw adsError;
      }

      const totalAds = ads.length;
      const totalViews = ads.reduce((sum, ad) => sum + ad.views_count, 0);
      const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks_count, 0);

      return {
        totalAds,
        totalViews,
        totalClicks,
        totalMessages: 0, // Will be implemented later
      };
    },
  });
}

export function useRecordView() {
  return useMutation({
    mutationFn: async (adId: string) => {
      // Record view
      const { error: viewError } = await supabase
        .from('ad_views')
        .insert({
          ad_id: adId,
          ip_address: null,
          user_agent: navigator.userAgent,
        });

      if (viewError) {
        console.error('Error recording view:', viewError);
        return;
      }

      // Increment view count using a simple update
      const { data: currentAd } = await supabase
        .from('ads')
        .select('views_count')
        .eq('id', adId)
        .single();

      if (currentAd) {
        const { error: updateError } = await supabase
          .from('ads')
          .update({ views_count: (currentAd.views_count || 0) + 1 })
          .eq('id', adId);

        if (updateError) {
          console.error('Error incrementing views:', updateError);
        }
      }
    },
  });
}

export function useRecordClick() {
  return useMutation({
    mutationFn: async (adId: string) => {
      // Record click
      const { error: clickError } = await supabase
        .from('ad_clicks')
        .insert({
          ad_id: adId,
          ip_address: null,
          user_agent: navigator.userAgent,
        });

      if (clickError) {
        console.error('Error recording click:', clickError);
        return;
      }

      // Increment click count using a simple update
      const { data: currentAd } = await supabase
        .from('ads')
        .select('clicks_count')
        .eq('id', adId)
        .single();

      if (currentAd) {
        const { error: updateError } = await supabase
          .from('ads')
          .update({ clicks_count: (currentAd.clicks_count || 0) + 1 })
          .eq('id', adId);

        if (updateError) {
          console.error('Error incrementing clicks:', updateError);
        }
      }
    },
  });
}
