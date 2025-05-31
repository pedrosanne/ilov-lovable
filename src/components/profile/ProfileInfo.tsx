
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Globe, Mail, Phone, Instagram, Twitter } from 'lucide-react';

interface ProfileInfoProps {
  profile: any;
  isOwnProfile: boolean;
}

export function ProfileInfo({ profile, isOwnProfile }: ProfileInfoProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.bio && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Sobre</h4>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          )}
          
          {profile.profession && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Profissão</h4>
              <p className="text-gray-700">{profile.profession}</p>
            </div>
          )}

          {profile.location && (
            <div className="flex items-center text-gray-700">
              <MapPin className="h-4 w-4 mr-2" />
              {profile.location}
            </div>
          )}

          {profile.birth_date && (
            <div className="flex items-center text-gray-700">
              <Calendar className="h-4 w-4 mr-2" />
              Nascido em {new Date(profile.birth_date).getFullYear()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contato */}
      <Card>
        <CardHeader>
          <CardTitle>Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.email && (
            <div className="flex items-center text-gray-700">
              <Mail className="h-4 w-4 mr-2" />
              <a href={`mailto:${profile.email}`} className="hover:text-blue-600">
                {profile.email}
              </a>
            </div>
          )}

          {profile.phone && (
            <div className="flex items-center text-gray-700">
              <Phone className="h-4 w-4 mr-2" />
              <a href={`tel:${profile.phone}`} className="hover:text-blue-600">
                {profile.phone}
              </a>
            </div>
          )}

          {profile.website && (
            <div className="flex items-center text-gray-700">
              <Globe className="h-4 w-4 mr-2" />
              <a href={profile.website} target="_blank" className="hover:text-blue-600">
                {profile.website}
              </a>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {profile.instagram_handle && (
              <Badge variant="secondary" className="flex items-center">
                <Instagram className="h-3 w-3 mr-1" />
                @{profile.instagram_handle}
              </Badge>
            )}
            
            {profile.twitter_handle && (
              <Badge variant="secondary" className="flex items-center">
                <Twitter className="h-3 w-3 mr-1" />
                @{profile.twitter_handle}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{profile.posts_count || 0}</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{profile.followers_count || 0}</div>
              <div className="text-sm text-gray-500">Seguidores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{profile.following_count || 0}</div>
              <div className="text-sm text-gray-500">Seguindo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membro desde */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR', {
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
