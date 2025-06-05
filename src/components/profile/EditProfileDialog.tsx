
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProfileAvatarUpload } from './edit/ProfileAvatarUpload';
import { ProfileFormFields, ProfileFormData } from './edit/ProfileFormFields';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: any;
}

export function EditProfileDialog({ open, onOpenChange, profile }: EditProfileDialogProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
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
    mutationFn: async (data: ProfileFormData & { avatar_url?: string }) => {
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

  const handleFieldChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ProfileAvatarUpload
            avatarUrl={avatarUrl}
            fullName={formData.full_name}
            email={profile.email}
            onAvatarChange={setAvatarUrl}
          />

          <ProfileFormFields
            formData={formData}
            onFieldChange={handleFieldChange}
          />

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
