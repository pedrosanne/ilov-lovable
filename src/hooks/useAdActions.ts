
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AdInsert } from '@/types/adHooks';

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
