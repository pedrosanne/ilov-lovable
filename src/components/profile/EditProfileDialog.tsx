
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MediaUpload } from '@/components/ui/media-upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: any;
}

export function EditProfileDialog({ open, onOpenChange, profile }: EditProfileDialogProps) {
  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    presentation_name: profile.presentation_name || '',
    bio: profile.bio || '',
    profession: profile.profession || '',
    location: profile.location || '',
    website: profile.website || '',
    instagram_handle: profile.instagram_handle || '',
    twitter_handle: profile.twitter_handle || '',
    phone: profile.phone || '',
  });
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (data: typeof formData & { avatar_url?: string }) => {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', profile.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({ ...formData, avatar_url: avatarUrl });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                {formData.full_name?.charAt(0) || profile.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <MediaUpload
              accept="image"
              maxSizeMB={3}
              onUploadComplete={setAvatarUrl}
              currentUrl={avatarUrl}
              showPreview={false}
              className="w-full max-w-xs"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Nome Completo</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="presentation_name">Nome de Apresentação</Label>
              <Input
                id="presentation_name"
                value={formData.presentation_name}
                onChange={(e) => handleInputChange('presentation_name', e.target.value)}
                placeholder="Como você quer ser chamado"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Conte um pouco sobre você..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="profession">Profissão</Label>
              <Input
                id="profession"
                value={formData.profession}
                onChange={(e) => handleInputChange('profession', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Cidade, Estado"
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefone/WhatsApp</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://seusite.com"
              />
            </div>

            <div>
              <Label htmlFor="instagram_handle">Instagram</Label>
              <Input
                id="instagram_handle"
                value={formData.instagram_handle}
                onChange={(e) => handleInputChange('instagram_handle', e.target.value)}
                placeholder="seuusuario"
              />
            </div>

            <div>
              <Label htmlFor="twitter_handle">Twitter</Label>
              <Input
                id="twitter_handle"
                value={formData.twitter_handle}
                onChange={(e) => handleInputChange('twitter_handle', e.target.value)}
                placeholder="seuusuario"
              />
            </div>
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
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
