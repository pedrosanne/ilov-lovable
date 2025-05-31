
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PostCard } from './PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Camera } from 'lucide-react';

interface PostsFeedProps {
  userId: string;
  isOwnProfile: boolean;
}

export function PostsFeed({ userId, isOwnProfile }: PostsFeedProps) {
  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ['posts', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_posts')
        .select(`
          *,
          profiles!inner (
            id,
            full_name,
            avatar_url,
            presentation_name
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-96" />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center shadow-sm">
        <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {isOwnProfile ? 'Ainda não há posts' : 'Nenhum post encontrado'}
        </h3>
        <p className="text-gray-600">
          {isOwnProfile 
            ? 'Compartilhe seus primeiros momentos criando um post!' 
            : 'Este usuário ainda não compartilhou nenhum post.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          isOwnProfile={isOwnProfile}
          onUpdate={refetch}
        />
      ))}
    </div>
  );
}
