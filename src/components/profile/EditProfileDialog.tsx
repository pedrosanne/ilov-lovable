
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload } from 'lucide-react';
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
  const [uploading, setUploading] = useState(false);
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
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}/avatar.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setAvatarUrl(data.publicUrl);
      toast({
        title: "Avatar atualizado!",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer upload da imagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

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
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                {formData.full_name?.charAt(0) || profile.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              <Button variant="outline" size="sm" disabled={uploading}>
                {uploading ? (
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4 mr-2" />
                )}
                {uploading ? 'Enviando...' : 'Alterar Foto'}
              </Button>
            </div>
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
              disabled={updateProfileMutation.isPending || uploading}
            >
              {updateProfileMutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
