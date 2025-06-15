
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Globe, Instagram, Twitter, MessageCircle, Edit, Plus, ShieldCheck, Star, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EditProfileDialog } from './EditProfileDialog';
import { CreatePostDialog } from './CreatePostDialog';
import { FollowButton } from './FollowButton';

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

  // Calcular nível baseado em posts
  const getProfileLevel = (postsCount: number) => {
    if (postsCount >= 100) return { level: 5, name: 'Influenciador' };
    if (postsCount >= 50) return { level: 4, name: 'Expert' };
    if (postsCount >= 20) return { level: 3, name: 'Ativo' };
    if (postsCount >= 5) return { level: 2, name: 'Iniciante' };
    return { level: 1, name: 'Novato' };
  };

  const profileLevel = getProfileLevel(profile.posts_count || 0);

  return (
    <>
      <Card className="mb-6 overflow-hidden shadow-lg">
        {/* Cover Image com gradiente melhorado - aumentando espaçamento */}
        <div 
          className="h-48 md:h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 relative"
          style={{
            backgroundImage: profile.cover_image_url ? `url(${profile.cover_image_url})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay para melhor contraste */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Badges flutuantes */}
          <div className="absolute top-4 right-4 flex gap-2">
            {profile.is_verified && (
              <Badge className="bg-blue-500/90 text-white border-0 shadow-lg">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Verificado
              </Badge>
            )}
            {profile.is_provider && (
              <Badge className="bg-purple-500/90 text-white border-0 shadow-lg">
                <Star className="h-3 w-3 mr-1" />
                Anunciante
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="relative px-4 md:px-8 pb-8">
          {/* Profile Layout aprimorado - aumentando margem top */}
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-end md:justify-between">
            {/* Left Section - Avatar e Info */}
            <div className="flex flex-col md:flex-row md:items-end md:space-x-8">
              {/* Avatar com border animado - aumentando margem negativa */}
              <div className="relative -mt-20 md:-mt-24 mb-8 md:mb-0">
                <div className="relative">
                  <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-white shadow-2xl ring-4 ring-blue-100">
                    <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                    <AvatarFallback className="text-xl md:text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {getInitials(profile.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Status online indicator */}
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full shadow-lg" />
                </div>
              </div>
              
              {/* Profile Info melhorada - aumentando margem top */}
              <div className="flex-1 md:mb-6 mt-4">
                {/* Name, Verification e Level */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {profile.presentation_name || profile.full_name}
                    </h1>
                    {profile.is_verified && (
                      <ShieldCheck className="h-6 w-6 md:h-7 md:w-7 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  
                  {/* Badge de nível */}
                  <Badge variant="secondary" className="w-fit">
                    <Award className="h-3 w-3 mr-1" />
                    Nível {profileLevel.level} - {profileLevel.name}
                  </Badge>
                </div>
                
                {/* Profession */}
                {profile.profession && (
                  <p className="text-lg text-gray-600 mb-3 font-medium">{profile.profession}</p>
                )}
                
                {/* Location and Join Date */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {profile.location}
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Membro desde {formatDate(profile.created_at)}
                  </div>
                </div>

                {/* Stats melhoradas */}
                <div className="flex items-center space-x-6 mb-4">
                  <Link to="#" className="hover:text-blue-600 transition-colors">
                    <span className="text-lg font-bold text-gray-900">{profile.posts_count || 0}</span>
                    <span className="text-sm text-gray-600 ml-1">posts</span>
                  </Link>
                  <Link to="#" className="hover:text-blue-600 transition-colors">
                    <span className="text-lg font-bold text-gray-900">{profile.followers_count || 0}</span>
                    <span className="text-sm text-gray-600 ml-1">seguidores</span>
                  </Link>
                  <Link to="#" className="hover:text-blue-600 transition-colors">
                    <span className="text-lg font-bold text-gray-900">{profile.following_count || 0}</span>
                    <span className="text-sm text-gray-600 ml-1">seguindo</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Section - Action Buttons melhorados */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end md:mb-6">
              {isOwnProfile ? (
                <>
                  <Button 
                    onClick={() => setShowCreatePost(true)}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Post
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditDialog(true)}
                    className="w-full sm:w-auto border-2 hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                </>
              ) : (
                <div className="flex gap-3">
                  <FollowButton 
                    userId={profile.id}
                    className="flex-1 sm:flex-none"
                  />
                  {onStartConversation && (
                    <Button 
                      onClick={onStartConversation} 
                      variant="outline"
                      className="flex-1 sm:flex-none border-2 hover:bg-gray-50"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Mensagem
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bio com estilo melhorado */}
          {profile.bio && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-gray-700 leading-relaxed text-lg">{profile.bio}</p>
            </div>
          )}

          {/* Social Links com ícones melhorados */}
          {(profile.website || profile.instagram_handle || profile.twitter_handle) && (
            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t">
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Website
                </a>
              )}
              {profile.instagram_handle && (
                <a
                  href={`https://instagram.com/${profile.instagram_handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-pink-600 hover:text-pink-800 transition-colors font-medium"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  @{profile.instagram_handle}
                </a>
              )}
              {profile.twitter_handle && (
                <a
                  href={`https://twitter.com/${profile.twitter_handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-600 transition-colors font-medium"
                >
                  <Twitter className="h-5 w-5 mr-2" />
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
