
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MediaUpload } from '@/components/ui/media-upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface CreateStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateStoryDialog({ open, onOpenChange }: CreateStoryDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');

  const createStoryMutation = useMutation({
    mutationFn: async () => {
      if (!user || !mediaUrl.trim()) throw new Error('Dados inválidos');

      // Detectar tipo de mídia baseado na URL
      const isVideo = /\.(mp4|webm|ogg|mov|avi)$/i.test(mediaUrl);
      const mediaType = isVideo ? 'video' : 'photo';

      const { error } = await supabase
        .from('profile_stories')
        .insert({
          user_id: user.id,
          media_url: mediaUrl.trim(),
          media_type: mediaType,
          caption: caption.trim() || null,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Story criado!",
        description: "Seu story foi publicado e ficará disponível por 24 horas.",
      });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      setMediaUrl('');
      setCaption('');
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar o story. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaUrl.trim()) {
      toast({
        title: "Atenção",
        description: "Adicione uma mídia ao seu story.",
        variant: "destructive",
      });
      return;
    }
    createStoryMutation.mutate();
  };

  const handleMediaUpload = (url: string) => {
    setMediaUrl(url);
  };

  const handleRemoveMedia = () => {
    setMediaUrl('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Story</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Mídia do Story</Label>
            <MediaUpload
              onUploadComplete={handleMediaUpload}
              onRemove={handleRemoveMedia}
              currentUrl={mediaUrl}
              accept="both"
              maxSizeMB={50}
              className="w-full"
              showPreview={true}
            />
          </div>

          <div>
            <Label htmlFor="caption">Legenda (opcional)</Label>
            <Input
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Adicione uma legenda..."
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">
              {caption.length}/200 caracteres
            </p>
          </div>

          <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded">
            💡 Seu story ficará disponível por 24 horas e será visível para todos que visitarem seu perfil.
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
              disabled={createStoryMutation.isPending || !mediaUrl}
            >
              {createStoryMutation.isPending ? 'Criando...' : 'Criar Story'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
