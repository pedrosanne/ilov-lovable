
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Share, MoreHorizontal, Play } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CommentsSection } from './CommentsSection';

interface PostCardProps {
  post: any;
  isOwnProfile: boolean;
  onUpdate: () => void;
}

export function PostCard({ post, isOwnProfile, onUpdate }: PostCardProps) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const { data: isLiked, refetch: refetchLike } = useQuery({
    queryKey: ['post-like', post.id, user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', post.id)
        .eq('user_id', user.id)
        .single();
      
      return !!data;
    },
    enabled: !!user,
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user) return;

      if (isLiked) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('post_likes')
          .insert({
            post_id: post.id,
            user_id: user.id,
          });
      }
    },
    onSuccess: () => {
      refetchLike();
      onUpdate();
    },
  });

  const formatDate = (dateString: string) => {
    return new Intl.RelativeTimeFormat('pt-BR').format(
      Math.floor((new Date(dateString).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const mediaUrls = Array.isArray(post.media_urls) ? post.media_urls : [];
  const hasMultipleMedia = mediaUrls.length > 1;

  return (
    <Card className="shadow-sm max-w-lg mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.profiles.avatar_url} />
              <AvatarFallback>
                {post.profiles.presentation_name?.charAt(0) || 
                 post.profiles.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                {post.profiles.presentation_name || post.profiles.full_name}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(post.created_at)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Content Text */}
        {post.content && (
          <div className="px-6 pb-4">
            <p className="text-gray-900">{post.content}</p>
          </div>
        )}

        {/* Media Content */}
        {mediaUrls.length > 0 && (
          <div className="relative">
            {hasMultipleMedia && (
              <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-sm z-10">
                {currentMediaIndex + 1}/{mediaUrls.length}
              </div>
            )}
            
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              {post.media_type === 'video' || post.media_type === 'reel' ? (
                <div className="relative w-full h-full">
                  <video 
                    src={mediaUrls[currentMediaIndex]}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                </div>
              ) : (
                <img 
                  src={mediaUrls[currentMediaIndex]}
                  alt="Post content"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Carousel Navigation */}
            {hasMultipleMedia && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {mediaUrls.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentMediaIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => likeMutation.mutate()}
                className={isLiked ? 'text-red-500 hover:text-red-600' : ''}
              >
                <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                {post.likes_count || 0}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-5 w-5 mr-1" />
                {post.comments_count || 0}
              </Button>
              
              <Button variant="ghost" size="sm">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <CommentsSection 
              postId={post.id} 
              onUpdate={onUpdate}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
