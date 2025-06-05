
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Globe, Instagram, Twitter, MessageCircle, Settings, ShieldCheck, Plus, Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EditProfileDialog } from './EditProfileDialog';
import { CreatePostDialog } from './CreatePostDialog';

interface ProfileHeaderProps {
  profile: any;
  isOwnProfile: boolean;
  onStartConversation?: () => void;
}

export function ProfileHeader({ profile, isOwnProfile, onStartConversation }: ProfileHeaderProps) {
  const { user } = useAuth();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM yyyy', { locale: ptBR });
    } catch {
      return '';
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Card className="mb-6 overflow-hidden">
        {/* Cover Image */}
        <div 
          className="h-32 md:h-48 bg-gradient-to-r from-blue-500 to-purple-600"
          style={{
            backgroundImage: profile.cover_image_url ? `url(${profile.cover_image_url})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <CardContent className="relative px-4 md:px-6 pb-6">
          {/* Profile Layout */}
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-end md:justify-between">
            {/* Left Section - Avatar and Info */}
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-12 md:-mt-16 mb-4 md:mb-0">
                <Avatar className="h-20 w-20 md:h-28 md:w-28 border-4 border-white shadow-lg">
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                  <AvatarFallback className="text-lg md:text-xl">
                    {getInitials(profile.full_name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 md:mb-4">
                {/* Name and Verification */}
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    {profile.presentation_name || profile.full_name}
                  </h1>
                  {profile.is_verified && (
                    <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                
                {/* Profession */}
                {profile.profession && (
                  <p className="text-gray-600 mb-2">{profile.profession}</p>
                )}
                
                {/* Location and Join Date */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-2">
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profile.location}
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Membro desde {formatDate(profile.created_at)}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-sm">
                    <strong>{profile.posts_count || 0}</strong> posts
                  </span>
                  <span className="text-sm">
                    <strong>{profile.followers_count || 0}</strong> seguidores
                  </span>
                  <span className="text-sm">
                    <strong>{profile.following_count || 0}</strong> seguindo
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {profile.is_provider && (
                    <Badge variant="secondary">Anunciante</Badge>
                  )}
                  {profile.is_verified && (
                    <Badge className="bg-blue-500">Verificado</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-end md:mb-4">
              {isOwnProfile ? (
                <>
                  <Button 
                    onClick={() => setShowCreatePost(true)}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Post
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditDialog(true)}
                    className="w-full sm:w-auto"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                </>
              ) : (
                onStartConversation && (
                  <Button onClick={onStartConversation} className="w-full md:w-auto">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          )}

          {/* Social Links */}
          {(profile.website || profile.instagram_handle || profile.twitter_handle) && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Website
                </a>
              )}
              {profile.instagram_handle && (
                <a
                  href={`https://instagram.com/${profile.instagram_handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-pink-600 hover:text-pink-800 text-sm"
                >
                  <Instagram className="h-4 w-4 mr-1" />
                  @{profile.instagram_handle}
                </a>
              )}
              {profile.twitter_handle && (
                <a
                  href={`https://twitter.com/${profile.twitter_handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-600 text-sm"
                >
                  <Twitter className="h-4 w-4 mr-1" />
                  @{profile.twitter_handle}
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EditProfileDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        profile={profile}
      />

      <CreatePostDialog
        open={showCreatePost}
        onOpenChange={setShowCreatePost}
      />
    </>
  );
}
