
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Globe, Instagram, Twitter, MessageCircle, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProfileHeaderProps {
  profile: any;
  isOwnProfile: boolean;
  onStartConversation?: () => void;
}

export function ProfileHeader({ profile, isOwnProfile, onStartConversation }: ProfileHeaderProps) {
  const { user } = useAuth();

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
    <Card className="mb-6">
      <div 
        className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"
        style={{
          backgroundImage: profile.cover_image_url ? `url(${profile.cover_image_url})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <CardContent className="relative pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-12">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg">
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              <AvatarFallback className="text-lg md:text-xl">
                {getInitials(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="mt-4 md:mt-0 md:mb-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.presentation_name || profile.full_name}
                </h1>
                {profile.is_verified && (
                  <ShieldCheck className="h-6 w-6 text-blue-500" title="Perfil verificado" />
                )}
              </div>
              
              {profile.profession && (
                <p className="text-gray-600 mt-1">{profile.profession}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
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

              <div className="flex items-center space-x-4 mt-3">
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
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.is_provider && (
                  <Badge variant="secondary">Anunciante</Badge>
                )}
                {profile.is_verified && (
                  <Badge className="bg-blue-500">Verificado</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            {isOwnProfile ? (
              <Button variant="outline" asChild>
                <Link to="/profile?tab=settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Link>
              </Button>
            ) : (
              onStartConversation && (
                <Button onClick={onStartConversation}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              )
            )}
          </div>
        </div>

        {profile.bio && (
          <div className="mt-6">
            <p className="text-gray-700">{profile.bio}</p>
          </div>
        )}

        {/* Links sociais */}
        {(profile.website || profile.instagram_handle || profile.twitter_handle) && (
          <div className="flex flex-wrap gap-4 mt-4">
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
  );
}
