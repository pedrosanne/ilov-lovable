
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Video, Grid3x3, Film } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

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
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>
                {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                {user?.user_metadata?.presentation_name || user?.user_metadata?.full_name || 'Você'}
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">O que você está pensando?</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Compartilhe algo interessante..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Media Type Selection */}
          {mediaUrls.length > 0 && (
            <div>
              <Label>Tipo de Mídia</Label>
              <Select value={mediaType} onValueChange={(value: any) => setMediaType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo">
                    <div className="flex items-center">
                      <Camera className="h-4 w-4 mr-2" />
                      Foto
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center">
                      <Video className="h-4 w-4 mr-2" />
                      Vídeo
                    </div>
                  </SelectItem>
                  <SelectItem value="carousel">
                    <div className="flex items-center">
                      <Grid3x3 className="h-4 w-4 mr-2" />
                      Carrossel
                    </div>
                  </SelectItem>
                  <SelectItem value="reel">
                    <div className="flex items-center">
                      <Film className="h-4 w-4 mr-2" />
                      Reel
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Media URLs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Mídia</Label>
              <Button type="button" variant="outline" size="sm" onClick={addMediaUrl}>
                <Camera className="h-4 w-4 mr-2" />
                Adicionar Mídia
              </Button>
            </div>
            
            {mediaUrls.length > 0 && (
              <div className="space-y-2">
                {mediaUrls.map((url, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <span className="flex-1 text-sm truncate">{url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMediaUrl(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? 'Publicando...' : 'Publicar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
