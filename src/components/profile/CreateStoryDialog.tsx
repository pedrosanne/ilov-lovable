
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Video } from 'lucide-react';
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

  const [caption, setCaption] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [mediaUrl, setMediaUrl] = useState<string>('');

  const createStoryMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Usuário não autenticado');
      if (!mediaUrl) throw new Error('Mídia é obrigatória');

      const { error } = await supabase
        .from('profile_stories')
        .insert({
          user_id: user.id,
          media_url: mediaUrl,
          media_type: mediaType,
          caption: caption.trim() || null,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Story criado!",
        description: "Seu story foi publicado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      setCaption('');
      setMediaUrl('');
      setMediaType('photo');
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
    if (!mediaUrl) {
      toast({
        title: "Atenção",
        description: "Adicione uma mídia ao seu story.",
        variant: "destructive",
      });
      return;
    }
    createStoryMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar Novo Story</DialogTitle>
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

          {/* Media Type Selection */}
          <div>
            <Label>Tipo de Mídia</Label>
            <Select value={mediaType} onValueChange={(value: 'photo' | 'video') => setMediaType(value)}>
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
              </SelectContent>
            </Select>
          </div>

          {/* Media Upload */}
          <div>
            <Label>Mídia *</Label>
            <MediaUpload
              accept={mediaType === 'photo' ? 'image' : 'video'}
              maxSizeMB={mediaType === 'photo' ? 5 : 50}
              onUploadComplete={setMediaUrl}
              currentUrl={mediaUrl}
              showPreview={true}
              className="w-full"
            />
          </div>

          {/* Caption */}
          <div>
            <Label htmlFor="caption">Legenda (opcional)</Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Adicione uma legenda ao seu story..."
              rows={3}
              className="resize-none"
            />
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
              {createStoryMutation.isPending ? 'Publicando...' : 'Publicar Story'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
