
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useAdStats() {
  return useQuery({
    queryKey: ['ad-stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get user's ads with real view and click counts
      const { data: ads, error: adsError } = await supabase
        .from('ads')
        .select('id, views_count, clicks_count')
        .eq('user_id', user.id);

      if (adsError) {
        throw adsError;
      }

      const totalAds = ads.length;
      const totalViews = ads.reduce((sum, ad) => sum + (ad.views_count || 0), 0);
      const totalClicks = ads.reduce((sum, ad) => sum + (ad.clicks_count || 0), 0);

      // Get real message count from conversations
      const { count: conversationsCount } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`);

      return {
        totalAds,
        totalViews,
        totalClicks,
        totalMessages: conversationsCount || 0,
      };
    },
  });
}
