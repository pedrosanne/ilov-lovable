
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProfileFormFields } from './ProfileFormFields';
import { ProfileAvatarUpload } from './ProfileAvatarUpload';
import { ProfileCoverUpload } from './ProfileCoverUpload';
import { ProfileVoiceAudio } from './ProfileVoiceAudio';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ProfileFormProps {
  profile: any;
  onClose: () => void;
}

export function ProfileForm({ profile, onClose }: ProfileFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    presentation_name: profile.presentation_name || '',
    bio: profile.bio || '',
    location: profile.location || '',
    website: profile.website || '',
    instagram_handle: profile.instagram_handle || '',
    twitter_handle: profile.twitter_handle || '',
    profession: profile.profession || '',
    birth_date: profile.birth_date || '',
    phone: profile.phone || '',
    avatar_url: profile.avatar_url || '',
    cover_image_url: profile.cover_image_url || '',
    voice_audio_url: profile.voice_audio_url || '',
  });

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      // Preparar dados para o update, convertendo strings vazias para null quando necessário
      const updateData = {
        ...formData,
        birth_date: formData.birth_date.trim() === '' ? null : formData.birth_date,
        website: formData.website.trim() === '' ? null : formData.website,
        instagram_handle: formData.instagram_handle.trim() === '' ? null : formData.instagram_handle,
        twitter_handle: formData.twitter_handle.trim() === '' ? null : formData.twitter_handle,
        profession: formData.profession.trim() === '' ? null : formData.profession,
        phone: formData.phone.trim() === '' ? null : formData.phone,
        bio: formData.bio.trim() === '' ? null : formData.bio,
        location: formData.location.trim() === '' ? null : formData.location,
        avatar_url: formData.avatar_url.trim() === '' ? null : formData.avatar_url,
        cover_image_url: formData.cover_image_url.trim() === '' ? null : formData.cover_image_url,
        voice_audio_url: formData.voice_audio_url.trim() === '' ? null : formData.voice_audio_url,
      };

      console.log('Dados sendo enviados para atualização:', updateData);

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', profile.id);

      if (error) {
        console.error('Erro ao atualizar perfil:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      onClose();
    },
    onError: (error) => {
      console.error('Erro na mutação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProfileAvatarUpload
        avatarUrl={formData.avatar_url}
        fullName={formData.full_name}
        email={profile.email}
        onAvatarChange={(url) => updateField('avatar_url', url)}
      />

      <ProfileCoverUpload
        currentCoverUrl={formData.cover_image_url}
        onCoverChange={(url) => updateField('cover_image_url', url)}
        onCoverRemove={() => updateField('cover_image_url', '')}
      />

      <ProfileFormFields
        formData={formData}
        onFieldChange={updateField}
      />

      <ProfileVoiceAudio
        voiceAudioUrl={formData.voice_audio_url}
        onAudioChange={(url) => updateField('voice_audio_url', url || '')}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={updateProfileMutation.isPending}>
          {updateProfileMutation.isPending && (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          )}
          Salvar
        </Button>
      </div>
    </form>
  );
}
