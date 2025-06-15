
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Camera, Play, Grid3x3, Film } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PostCard } from './PostCard';

interface PostsFeedGridProps {
  userId: string;
  isOwnProfile: boolean;
  viewMode: 'grid' | 'feed';
}

export function PostsFeedGrid({ userId, isOwnProfile, viewMode }: PostsFeedGridProps) {
  const [selectedPost, setSelectedPost] = useState<any>(null);

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
      <div className={viewMode === 'grid' ? "grid grid-cols-3 gap-1" : "grid gap-6"}>
        {Array.from({ length: viewMode === 'grid' ? 9 : 3 }).map((_, i) => (
          <Skeleton key={i} className={viewMode === 'grid' ? "aspect-square" : "h-96"} />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-xl p-16 text-center shadow-sm border">
        <Camera className="h-20 w-20 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          {isOwnProfile ? 'Ainda não há posts' : 'Nenhum post encontrado'}
        </h3>
        <p className="text-gray-600 text-lg">
          {isOwnProfile 
            ? 'Compartilhe seus primeiros momentos criando um post!' 
            : 'Este usuário ainda não compartilhou nenhum post.'
          }
        </p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <>
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {posts.map((post) => {
            const mediaUrls = Array.isArray(post.media_urls) ? post.media_urls : [];
            const firstMedia = mediaUrls[0];
            const firstMediaUrl = typeof firstMedia === 'string' ? firstMedia : String(firstMedia || '');
            
            return (
              <div
                key={post.id}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:opacity-90 transition-opacity"
                onClick={() => setSelectedPost(post)}
              >
                {firstMediaUrl && (
                  <>
                    {post.media_type === 'video' || post.media_type === 'reel' ? (
                      <video
                        src={firstMediaUrl}
                        className="w-full h-full object-cover"
                        muted
                      />
                    ) : (
                      <img
                        src={firstMediaUrl}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Overlay com ícones */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {post.media_type === 'video' && (
                        <Play className="h-8 w-8 text-white" />
                      )}
                      {post.media_type === 'reel' && (
                        <Film className="h-8 w-8 text-white" />
                      )}
                      {post.media_type === 'carousel' && (
                        <Grid3x3 className="h-8 w-8 text-white" />
                      )}
                    </div>
                    
                    {/* Indicadores */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {mediaUrls.length > 1 && (
                        <div className="bg-black/60 text-white px-2 py-1 rounded text-xs">
                          <Grid3x3 className="h-3 w-3" />
                        </div>
                      )}
                      {(post.media_type === 'video' || post.media_type === 'reel') && (
                        <div className="bg-black/60 text-white px-2 py-1 rounded text-xs">
                          <Play className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {!firstMediaUrl && (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal para visualizar post completo */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-4xl h-[90vh] p-0">
            {selectedPost && (
              <div className="h-full overflow-y-auto">
                <PostCard 
                  post={selectedPost} 
                  isOwnProfile={isOwnProfile}
                  onUpdate={refetch}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // View mode: feed
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
