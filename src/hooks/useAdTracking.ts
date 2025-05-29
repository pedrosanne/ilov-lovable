
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
