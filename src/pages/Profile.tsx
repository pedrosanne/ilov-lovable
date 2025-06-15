
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStats } from '@/components/profile/ProfileStats';
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
import { VerificationModal } from '@/components/verification/VerificationModal';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useVerificationModal } from '@/hooks/useVerificationModal';

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [profileViewType, setProfileViewType] = useState<'client' | 'provider'>('client');
  const [showMessages, setShowMessages] = useState(false);
  const { showModal, closeModal, checkVerificationAndExecute } = useVerificationModal();

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full mb-6 rounded-xl" />
          <Skeleton className="h-32 w-full mb-6 rounded-xl" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfil não encontrado</h2>
            <p className="text-gray-600">O usuário que você está procurando não existe.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isOwnProfile = user?.id === profile.id;
  const showProviderProfile = profileViewType === 'provider' && profile.is_provider;

  const handleStartConversation = () => {
    if (isOwnProfile) {
      setShowMessages(true);
      return;
    }

    checkVerificationAndExecute(() => {
      setShowMessages(true);
    });
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
        return isOwnProfile ? <MessagesSystem /> : null;
      case 'upgrade':
        return isOwnProfile ? <UpgradeToProvider /> : null;
      case 'settings':
        return isOwnProfile ? <ProfileSettings /> : null;
      default:
        return <PostsFeed userId={profile.id} isOwnProfile={isOwnProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <ProfileHeader 
          profile={profile} 
          isOwnProfile={isOwnProfile}
          onStartConversation={!isOwnProfile ? handleStartConversation : undefined}
        />
        
        {/* Estatísticas do perfil */}
        <ProfileStats 
          userId={profile.id}
          isOwnProfile={isOwnProfile}
        />
        
        {stories && stories.length > 0 && (
          <StoriesRow stories={stories} />
        )}

        {/* Toggle de tipo de perfil */}
        {isOwnProfile && (
          <ProfileTypeToggle
            profile={profile}
            currentViewType={profileViewType}
            onViewTypeChange={setProfileViewType}
          />
        )}
        
        {/* Renderizar abas baseado no tipo de perfil */}
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

      {/* Modal de verificação */}
      <VerificationModal
        open={showModal}
        onOpenChange={closeModal}
        actionType="mensagens"
      />
      
      <Footer />
    </div>
  );
};

export default Profile;
