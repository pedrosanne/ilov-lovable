
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
