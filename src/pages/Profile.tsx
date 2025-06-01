
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StoriesRow } from '@/components/profile/StoriesRow';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ClientProfileTabs } from '@/components/profile/ClientProfileTabs';
import { ProfileTypeToggle } from '@/components/profile/ProfileTypeToggle';
import { PostsFeed } from '@/components/profile/PostsFeed';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { FavoritesSection } from '@/components/profile/FavoritesSection';
import { UpgradeToProvider } from '@/components/profile/UpgradeToProvider';
import { ProfileSettings } from '@/components/profile/ProfileSettings';
import { MessagesSystem } from '@/components/messages/MessagesSystem';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [profileViewType, setProfileViewType] = useState<'client' | 'provider'>('client');
  const [showMessages, setShowMessages] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId || user?.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: stories } = useQuery({
    queryKey: ['stories', userId || user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_stories')
        .select(`
          *,
          user: profiles!inner (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('user_id', userId || user?.id)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Perfil não encontrado</h2>
          </div>
        </div>
      </div>
    );
  }

  const isOwnProfile = user?.id === profile.id;
  
  // Determinar qual tipo de perfil mostrar
  const showProviderProfile = profileViewType === 'provider' && profile.is_provider;

  const handleStartConversation = () => {
    setShowMessages(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsFeed userId={profile.id} isOwnProfile={isOwnProfile} />;
      case 'info':
        return <ProfileInfo profile={profile} isOwnProfile={isOwnProfile} />;
      case 'favorites':
        return isOwnProfile ? <FavoritesSection /> : null;
      case 'messages':
        return isOwnProfile ? (
          <MessagesSystem />
        ) : null;
      case 'upgrade':
        return isOwnProfile && !profile.is_provider ? <UpgradeToProvider /> : null;
      case 'settings':
        return isOwnProfile ? <ProfileSettings /> : null;
      default:
        return <PostsFeed userId={profile.id} isOwnProfile={isOwnProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ProfileHeader 
          profile={profile} 
          isOwnProfile={isOwnProfile}
          onStartConversation={!isOwnProfile ? handleStartConversation : undefined}
        />
        
        {stories && stories.length > 0 && (
          <StoriesRow stories={stories} />
        )}

        {/* Toggle de tipo de perfil (apenas para perfil próprio) */}
        {isOwnProfile && (
          <ProfileTypeToggle
            profile={profile}
            currentViewType={profileViewType}
            onViewTypeChange={setProfileViewType}
          />
        )}
        
        {/* Renderizar abas diferentes baseado no tipo de perfil */}
        {showProviderProfile ? (
          <ProfileTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            isOwnProfile={isOwnProfile}
            isProvider={true}
          />
        ) : (
          <ClientProfileTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            isOwnProfile={isOwnProfile}
          />
        )}
        
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Dialog para mensagens */}
      <Dialog open={showMessages} onOpenChange={setShowMessages}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <MessagesSystem 
            startConversationWith={!isOwnProfile ? profile.id : undefined}
            onClose={() => setShowMessages(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
