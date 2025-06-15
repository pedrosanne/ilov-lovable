
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PostHeader } from './post/PostHeader';
import { PostContent } from './post/PostContent';
import { PostActions } from './post/PostActions';

interface PostCardProps {
  post: any;
  isOwnProfile: boolean;
  onUpdate: () => void;
}

export function PostCard({ post, isOwnProfile, onUpdate }: PostCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();

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

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('profile_posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Post excluído",
        description: "Seu post foi excluído com sucesso.",
      });
      onUpdate();
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir post",
        description: "Não foi possível excluir o post. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/profile/${post.user_id}`;
    const shareText = `Confira este post: ${post.content || 'Post interessante'}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Compartilhar Post',
          text: shareText,
          url: postUrl,
        });
      } catch (error) {
        // Fallback se o usuário cancelar o compartilhamento
        copyToClipboard(postUrl);
      }
    } else {
      copyToClipboard(postUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Link copiado!",
        description: "O link do post foi copiado para a área de transferência.",
      });
    }).catch(() => {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      });
    });
  };

  const handleDeletePost = () => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      deletePostMutation.mutate();
    }
  };

  return (
    <Card className="shadow-sm w-full max-w-lg mx-auto">
      <CardHeader className="pb-3">
        <PostHeader 
          post={post}
          isOwnProfile={isOwnProfile}
          onShare={handleShare}
          onDelete={handleDeletePost}
        />
      </CardHeader>

      <CardContent className="p-0">
        <PostContent post={post} />
        
        <PostActions 
          post={post}
          isLiked={isLiked || false}
          onLike={() => likeMutation.mutate()}
          onShare={handleShare}
          onUpdate={onUpdate}
        />
      </CardContent>
    </Card>
  );
}
