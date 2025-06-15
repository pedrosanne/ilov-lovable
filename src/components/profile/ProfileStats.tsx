
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Heart, MessageCircle, TrendingUp } from 'lucide-react';

interface ProfileStatsProps {
  userId: string;
  isOwnProfile: boolean;
}

export function ProfileStats({ userId, isOwnProfile }: ProfileStatsProps) {
  const { data: stats } = useQuery({
    queryKey: ['profile-stats', userId],
    queryFn: async () => {
      // Buscar estatísticas dos posts
      const { data: postsStats } = await supabase
        .from('profile_posts')
        .select('likes_count, comments_count')
        .eq('user_id', userId);

      // Buscar visualizações dos anúncios (se for anunciante)
      const { data: adViews } = await supabase
        .from('ad_views')
        .select('id')
        .in('ad_id', 
          supabase
            .from('ads')
            .select('id')
            .eq('user_id', userId)
        );

      const totalLikes = postsStats?.reduce((sum, post) => sum + (post.likes_count || 0), 0) || 0;
      const totalComments = postsStats?.reduce((sum, post) => sum + (post.comments_count || 0), 0) || 0;
      const totalViews = adViews?.length || 0;

      return {
        totalLikes,
        totalComments,
        totalViews,
        totalPosts: postsStats?.length || 0,
      };
    },
  });

  if (!stats) return null;

  const statItems = [
    { icon: Heart, label: 'Curtidas', value: stats.totalLikes, color: 'text-red-500' },
    { icon: MessageCircle, label: 'Comentários', value: stats.totalComments, color: 'text-blue-500' },
    { icon: Eye, label: 'Visualizações', value: stats.totalViews, color: 'text-green-500' },
    { icon: TrendingUp, label: 'Engajamento', value: Math.round((stats.totalLikes + stats.totalComments) / Math.max(stats.totalPosts, 1)), color: 'text-purple-500' },
  ];

  if (!isOwnProfile) {
    // Para perfis de outros usuários, mostrar apenas likes e comentários
    return null;
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Estatísticas do Perfil</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-2`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
