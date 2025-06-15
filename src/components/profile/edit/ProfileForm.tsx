
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProfileAvatarUpload } from './ProfileAvatarUpload';
import { ProfileFormFields, ProfileFormData } from './ProfileFormFields';
import { ProfileVoiceAudio } from './ProfileVoiceAudio';

interface ProfileFormProps {
  profile: any;
  onClose: () => void;
}

export function ProfileForm({ profile, onClose }: ProfileFormProps) {
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
    voice_audio_url: profile.voice_audio_url || null,
  });
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '');
  const [voiceAudioUrl, setVoiceAudioUrl] = useState(profile.voice_audio_url || null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData & { avatar_url?: string }) => {
      console.log('Atualizando perfil com dados:', data);
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
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
    
    console.log('Enviando dados do perfil:', {
      ...formData,
      avatar_url: avatarUrl,
      voice_audio_url: voiceAudioUrl
    });
    
    updateProfileMutation.mutate({ 
      ...formData, 
      avatar_url: avatarUrl,
      voice_audio_url: voiceAudioUrl
    });
  };

  const handleFieldChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVoiceAudioChange = (url: string | null) => {
    console.log('Áudio de voz alterado:', url);
    setVoiceAudioUrl(url);
    setFormData(prev => ({ ...prev, voice_audio_url: url }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <ProfileVoiceAudio
        voiceAudioUrl={voiceAudioUrl}
        onAudioChange={handleVoiceAudioChange}
      />

      <div className="flex justify-end space-x-2 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
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
  );
}
