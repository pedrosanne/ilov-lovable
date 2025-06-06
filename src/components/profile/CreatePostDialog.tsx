
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { PostFormFields } from './post/PostFormFields';
import { PostMediaUpload } from './post/PostMediaUpload';
import { PostFormActions } from './post/PostFormActions';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video' | 'carousel' | 'reel'>('photo');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  const createPostMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await supabase
        .from('profile_posts')
        .insert({
          user_id: user.id,
          content: content.trim() || null,
          media_urls: mediaUrls.length > 0 ? mediaUrls : null,
          media_type: mediaUrls.length > 0 ? mediaType : null,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Post criado!",
        description: "Seu post foi publicado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setContent('');
      setMediaUrls([]);
      setMediaType('photo');
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar o post. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && mediaUrls.length === 0) {
      toast({
        title: "Atenção",
        description: "Adicione um texto ou mídia ao seu post.",
        variant: "destructive",
      });
      return;
    }
    createPostMutation.mutate();
  };

  const addMediaUrl = () => {
    const url = prompt('Digite a URL da mídia:');
    if (url) {
      setMediaUrls(prev => [...prev, url]);
    }
  };

  const removeMediaUrl = (index: number) => {
    setMediaUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar Novo Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PostFormFields
            content={content}
            onContentChange={setContent}
            user={user}
          />

          <PostMediaUpload
            mediaUrls={mediaUrls}
            mediaType={mediaType}
            onMediaTypeChange={setMediaType}
            onAddMedia={addMediaUrl}
            onRemoveMedia={removeMediaUrl}
          />

          <PostFormActions
            isSubmitting={createPostMutation.isPending}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
