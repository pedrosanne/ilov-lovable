
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Globe, Instagram, Twitter, Phone, User, Briefcase } from 'lucide-react';
import { ProfileVoicePlayer } from './ProfileVoicePlayer';

interface ProfileInfoProps {
  profile: any;
  isOwnProfile: boolean;
}

export function ProfileInfo({ profile, isOwnProfile }: ProfileInfoProps) {
  const InfoItem = ({ icon: Icon, label, value, link }: any) => {
    if (!value) return null;

    const content = (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <Icon className="h-5 w-5 text-gray-500" />
        <div>
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">{value}</p>
        </div>
      </div>
    );

    if (link) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <div className="space-y-6">
      {/* Áudio de apresentação */}
      {profile.voice_audio_url && (
        <ProfileVoicePlayer 
          audioUrl={profile.voice_audio_url}
          userName={profile.presentation_name || profile.full_name || 'Usuário'}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <InfoItem
            icon={User}
            label="Nome Completo"
            value={profile.full_name}
          />
          <InfoItem
            icon={User}
            label="Nome de Apresentação"
            value={profile.presentation_name}
          />
          <InfoItem
            icon={Briefcase}
            label="Profissão"
            value={profile.profession}
          />
          <InfoItem
            icon={MapPin}
            label="Localização"
            value={profile.location}
          />
          {isOwnProfile && (
            <InfoItem
              icon={Phone}
              label="Telefone"
              value={profile.phone}
            />
          )}
        </CardContent>
      </Card>

      {profile.bio && (
        <Card>
          <CardHeader>
            <CardTitle>Sobre</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Links e Contatos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <InfoItem
            icon={Globe}
            label="Website"
            value={profile.website}
            link={profile.website}
          />
          <InfoItem
            icon={Instagram}
            label="Instagram"
            value={profile.instagram_handle}
            link={profile.instagram_handle ? `https://instagram.com/${profile.instagram_handle.replace('@', '')}` : null}
          />
          <InfoItem
            icon={Twitter}
            label="Twitter"
            value={profile.twitter_handle}
            link={profile.twitter_handle ? `https://twitter.com/${profile.twitter_handle.replace('@', '')}` : null}
          />
        </CardContent>
      </Card>
    </div>
  );
}
