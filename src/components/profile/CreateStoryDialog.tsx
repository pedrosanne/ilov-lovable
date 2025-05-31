
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Video } from 'lucide-react';
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
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [caption, setCaption] = useState('');

  const createStoryMutation = useMutation({
    mutationFn: async () => {
      if (!user || !mediaUrl.trim()) throw new Error('Dados inválidos');

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
    if (!mediaUrl.trim()) {
      toast({
        title: "Atenção",
        description: "Adicione uma URL de mídia ao seu story.",
        variant: "destructive",
      });
      return;
    }
    createStoryMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Story</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="mediaUrl">URL da Mídia</Label>
            <Input
              id="mediaUrl"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              required
            />
          </div>

          <div>
            <Label htmlFor="caption">Legenda (opcional)</Label>
            <Input
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Adicione uma legenda..."
            />
          </div>

          <div className="text-sm text-gray-500">
            💡 Seu story ficará disponível por 24 horas
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
              disabled={createStoryMutation.isPending}
            >
              {createStoryMutation.isPending ? 'Criando...' : 'Criar Story'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
