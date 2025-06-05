
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Globe, Instagram, Twitter, Edit, MessageCircle, Calendar, ShieldCheck } from 'lucide-react';
import { EditProfileDialog } from './EditProfileDialog';
import { CreateStoryDialog } from './CreateStoryDialog';

interface ProfileHeaderProps {
  profile: any;
  isOwnProfile: boolean;
  onStartConversation?: () => void;
}

export function ProfileHeader({ profile, isOwnProfile, onStartConversation }: ProfileHeaderProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showStoryDialog, setShowStoryDialog] = useState(false);

  return (
    <>
      <Card className="relative overflow-hidden">
        {/* Cover Image */}
        <div 
          className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative"
          style={{
            backgroundImage: profile.cover_image_url ? `url(${profile.cover_image_url})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {isOwnProfile && (
            <Button
              size="sm"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-0"
              onClick={() => setShowStoryDialog(true)}
            >
              + Adicionar Story
            </Button>
          )}
        </div>

        <CardContent className="relative">
          {/* Profile Info Container - Fixed positioning */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 -mt-16 relative z-10">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-2xl">
                  {profile.full_name?.charAt(0) || profile.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Details - Better spacing and layout */}
            <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-lg p-4 lg:p-6 lg:ml-4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {profile.presentation_name || profile.full_name || 'Usuário'}
                    </h1>
                    {profile.is_verified && (
                      <ShieldCheck className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                  
                  {profile.profession && (
                    <p className="text-lg text-gray-600 mb-2">{profile.profession}</p>
                  )}
                  
                  {profile.bio && (
                    <p className="text-gray-700 mb-3 leading-relaxed">{profile.bio}</p>
                  )}

                  {/* Stats */}
                  <div className="flex gap-6 mb-4">
                    <div className="text-center">
                      <div className="font-bold text-lg">{profile.posts_count || 0}</div>
                      <div className="text-sm text-gray-600">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{profile.followers_count || 0}</div>
                      <div className="text-sm text-gray-600">Seguidores</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{profile.following_count || 0}</div>
                      <div className="text-sm text-gray-600">Seguindo</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profile.location}
                      </div>
                    )}
                    {profile.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {profile.phone}
                      </div>
                    )}
                    {profile.website && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                          {profile.website}
                        </a>
                      </div>
                    )}
                    {profile.instagram_handle && (
                      <div className="flex items-center gap-1">
                        <Instagram className="h-4 w-4" />
                        <a href={`https://instagram.com/${profile.instagram_handle}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                          @{profile.instagram_handle}
                        </a>
                      </div>
                    )}
                    {profile.twitter_handle && (
                      <div className="flex items-center gap-1">
                        <Twitter className="h-4 w-4" />
                        <a href={`https://twitter.com/${profile.twitter_handle}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                          @{profile.twitter_handle}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 lg:flex-col">
                  {isOwnProfile ? (
                    <Button 
                      onClick={() => setShowEditDialog(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Editar Perfil
                    </Button>
                  ) : (
                    onStartConversation && (
                      <Button 
                        onClick={onStartConversation}
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Mensagem
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      {isOwnProfile && (
        <EditProfileDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          profile={profile}
        />
      )}

      {/* Create Story Dialog */}
      {isOwnProfile && (
        <CreateStoryDialog
          open={showStoryDialog}
          onOpenChange={setShowStoryDialog}
        />
      )}
    </>
  );
}
