
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface CommentsSectionProps {
  postId: string;
  onUpdate: () => void;
}

export function CommentsSection({ postId, onUpdate }: CommentsSectionProps) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  const { data: comments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          profiles!inner (
            id,
            full_name,
            avatar_url,
            presentation_name
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !content.trim()) return;

      const { error } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: content.trim(),
        });

      if (error) throw error;
    },
    onSuccess: () => {
      setNewComment('');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      onUpdate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCommentMutation.mutate(newComment);
  };

  return (
    <div className="border-t pt-4 mt-4">
      {/* Comments List */}
      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.profiles.avatar_url} />
              <AvatarFallback className="text-xs">
                {comment.profiles.presentation_name?.charAt(0) || 
                 comment.profiles.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold mr-2">
                  {comment.profiles.presentation_name || comment.profiles.full_name}
                </span>
                {comment.content}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      {user && (
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="text-xs">
              {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex space-x-2">
            <Input
              placeholder="Adicione um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="sm"
              disabled={!newComment.trim() || addCommentMutation.isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
