
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Settings, Camera, MapPin, Calendar, Globe, Edit } from 'lucide-react';
import { EditProfileDialog } from './EditProfileDialog';
import { CreatePostDialog } from './CreatePostDialog';
import { CreateStoryDialog } from './CreateStoryDialog';
import { MediaUpload } from '@/components/ui/media-upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileHeaderProps {
  profile: any;
  isOwnProfile: boolean;
  onStartConversation?: () => void;
}

export function ProfileHeader({ profile, isOwnProfile, onStartConversation }: ProfileHeaderProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateCoverMutation = useMutation({
    mutationFn: async (coverImageUrl: string) => {
      const { error } = await supabase
        .from('profiles')
        .update({ cover_image_url: coverImageUrl })
        .eq('id', profile.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile.id] });
      setShowCoverUpload(false);
      toast({
        title: "Foto de capa atualizada!",
        description: "Sua foto de capa foi alterada com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar capa",
        description: "Não foi possível atualizar a foto de capa.",
        variant: "destructive",
      });
    },
  });

  const openWhatsApp = () => {
    if (profile.phone) {
      window.open(`https://wa.me/55${profile.phone}`, '_blank');
    }
  };

  const openInstagram = () => {
    if (profile.instagram_handle) {
      window.open(`https://instagram.com/${profile.instagram_handle}`, '_blank');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        {/* Cover Image */}
        <div className="relative">
          <div 
            className="h-48 md:h-80 bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 relative"
            style={{
              backgroundImage: profile.cover_image_url ? `url(${profile.cover_image_url})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay para melhor legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {isOwnProfile && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                  onClick={() => setShowCoverUpload(!showCoverUpload)}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Alterar Capa
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                  onClick={() => setShowEditDialog(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
            )}

            {/* Upload de capa */}
            {isOwnProfile && showCoverUpload && (
              <div className="absolute bottom-4 right-4 w-64">
                <MediaUpload
                  accept="image"
                  maxSizeMB={5}
                  onUploadComplete={(url) => updateCoverMutation.mutate(url)}
                  showPreview={false}
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Profile Info - Corrigido para evitar sobreposição */}
        <div className="px-4 md:px-6 pb-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            {/* Avatar e informações básicas */}
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar posicionado para não sobrepor */}
              <div className="relative -mt-16 md:-mt-20 z-10">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg mx-auto md:mx-0 bg-white">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="text-xl md:text-2xl">
                    {profile.presentation_name?.charAt(0) || profile.full_name?.charAt(0) || profile.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Informações do perfil */}
              <div className="text-center md:text-left md:pt-4 flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
                  {profile.presentation_name || profile.full_name || 'Usuário'}
                </h1>
                {profile.profession && (
                  <p className="text-base md:text-lg text-gray-600 break-words mt-1">{profile.profession}</p>
                )}
                
                {/* Informações adicionais */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-3 text-sm text-gray-500 gap-1 md:gap-0">
                  {profile.location && (
                    <div className="flex items-center justify-center md:justify-start">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="break-words">{profile.location}</span>
                    </div>
                  )}
                  {profile.birth_date && (
                    <div className="flex items-center justify-center md:justify-start">
                      <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{new Date(profile.birth_date).getFullYear()}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center justify-center md:justify-start">
                      <Globe className="h-4 w-4 mr-1 flex-shrink-0" />
                      <a href={profile.website} target="_blank" className="hover:text-blue-600 break-all">
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 md:pt-4">
              {isOwnProfile ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditDialog(true)}
                    className="w-full md:w-auto"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Button>
                  <Button 
                    onClick={() => setShowCreatePost(true)}
                    className="w-full md:w-auto"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Novo Post
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateStory(true)}
                    className="w-full md:w-auto"
                  >
                    Adicionar Story
                  </Button>
                </>
              ) : (
                <>
                  {profile.phone && (
                    <Button 
                      onClick={openWhatsApp} 
                      className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={onStartConversation}
                    className="w-full md:w-auto"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Mensagem
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mt-6">
              <p className="text-gray-700 max-w-none md:max-w-2xl break-words">{profile.bio}</p>
            </div>
          )}

          {/* Stats */}
          <div className="flex justify-center md:justify-start space-x-8 mt-6">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-900">{profile.posts_count || 0}</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-900">{profile.followers_count || 0}</div>
              <div className="text-sm text-gray-500">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-900">{profile.following_count || 0}</div>
              <div className="text-sm text-gray-500">Seguindo</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            {profile.instagram_handle && (
              <Badge variant="secondary" className="cursor-pointer" onClick={openInstagram}>
                @{profile.instagram_handle}
              </Badge>
            )}
            {profile.twitter_handle && (
              <Badge variant="secondary">
                @{profile.twitter_handle}
              </Badge>
            )}
            {profile.is_provider && (
              <Badge className="bg-blue-600">
                Anunciante
              </Badge>
            )}
          </div>
        </div>
      </div>

      <EditProfileDialog 
        open={showEditDialog} 
        onOpenChange={setShowEditDialog}
        profile={profile}
      />
      
      <CreatePostDialog 
        open={showCreatePost} 
        onOpenChange={setShowCreatePost}
      />
      
      <CreateStoryDialog 
        open={showCreateStory} 
        onOpenChange={setShowCreateStory}
      />
    </>
  );
}
