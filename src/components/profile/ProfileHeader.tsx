
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Settings, Camera, MapPin, Calendar, Globe } from 'lucide-react';
import { EditProfileDialog } from './EditProfileDialog';
import { CreatePostDialog } from './CreatePostDialog';
import { CreateStoryDialog } from './CreateStoryDialog';

interface ProfileHeaderProps {
  profile: any;
  isOwnProfile: boolean;
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);

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
        <div 
          className="h-48 bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 relative"
          style={{
            backgroundImage: profile.cover_image_url ? `url(${profile.cover_image_url})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {isOwnProfile && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
              onClick={() => setShowEditDialog(true)}
            >
              <Camera className="h-4 w-4 mr-2" />
              Editar Capa
            </Button>
          )}
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-start justify-between -mt-16 mb-4">
            <div className="flex items-end space-x-4">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-2xl">
                  {profile.full_name?.charAt(0) || profile.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="pb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.presentation_name || profile.full_name || 'Usuário'}
                </h1>
                {profile.profession && (
                  <p className="text-lg text-gray-600">{profile.profession}</p>
                )}
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profile.location}
                    </div>
                  )}
                  {profile.birth_date && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(profile.birth_date).getFullYear()}
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      <a href={profile.website} target="_blank" className="hover:text-blue-600">
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              {isOwnProfile ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditDialog(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                  <Button onClick={() => setShowCreatePost(true)}>
                    <Camera className="h-4 w-4 mr-2" />
                    Novo Post
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateStory(true)}
                  >
                    Adicionar Story
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={openWhatsApp} className="bg-green-600 hover:bg-green-700">
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Mensagem
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-gray-700 mb-4 max-w-2xl">{profile.bio}</p>
          )}

          {/* Stats */}
          <div className="flex space-x-8 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profile.posts_count || 0}</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profile.followers_count || 0}</div>
              <div className="text-sm text-gray-500">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profile.following_count || 0}</div>
              <div className="text-sm text-gray-500">Seguindo</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-2">
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
