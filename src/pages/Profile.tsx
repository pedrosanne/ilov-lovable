
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StoriesRow } from '@/components/profile/StoriesRow';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { PostsFeed } from '@/components/profile/PostsFeed';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

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
        .select('*')
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ProfileHeader 
          profile={profile} 
          isOwnProfile={isOwnProfile}
        />
        
        {stories && stories.length > 0 && (
          <StoriesRow stories={stories} />
        )}
        
        <ProfileTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOwnProfile={isOwnProfile}
        />
        
        <div className="mt-6">
          {activeTab === 'posts' && (
            <PostsFeed userId={profile.id} isOwnProfile={isOwnProfile} />
          )}
          {activeTab === 'info' && (
            <ProfileInfo profile={profile} isOwnProfile={isOwnProfile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
