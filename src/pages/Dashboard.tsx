
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useAdStats } from '@/hooks/useAds';
import { useVerificationStatus } from '@/hooks/useVerificationStatus';
import { Navigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { VerificationAlert } from '@/components/dashboard/VerificationAlert';
import { MetricsSection } from '@/components/dashboard/MetricsSection';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { InsightsAndActionsSection } from '@/components/dashboard/InsightsAndActionsSection';
import { CreateAdSection } from '@/components/dashboard/CreateAdSection';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAdStats();
  const { isVerified, hasVerification, verificationStatus } = useVerificationStatus();

  // Get real favorites count
  const { data: favoritesCount } = useQuery({
    queryKey: ['favorites-count'],
    queryFn: async () => {
      if (!user) return 0;
      
      const { data: userAds } = await supabase
        .from('ads')
        .select('id')
        .eq('user_id', user.id);

      if (!userAds || userAds.length === 0) return 0;

      const adIds = userAds.map(ad => ad.id);
      
      const { count } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true })
        .in('ad_id', adIds);

      return count || 0;
    },
    enabled: !!user,
  });

  // Get real messages count
  const { data: messagesCount } = useQuery({
    queryKey: ['messages-count'],
    queryFn: async () => {
      if (!user) return 0;
      
      const { count } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`);

      return count || 0;
    },
    enabled: !!user,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Calculate conversion rate with real data
  const conversionRate = stats?.totalViews && stats?.totalClicks 
    ? ((stats.totalClicks / stats.totalViews) * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <DashboardHeader />

        {/* Verification Alert */}
        <div className="max-w-4xl mx-auto">
          <VerificationAlert 
            isVerified={isVerified}
            hasVerification={hasVerification}
            verificationStatus={verificationStatus}
          />
        </div>

        {/* KPI Metrics Cards - All Real Data */}
        <MetricsSection 
          stats={stats}
          statsLoading={statsLoading}
          favoritesCount={favoritesCount}
          messagesCount={messagesCount}
          conversionRate={conversionRate}
        />

        {/* Charts and Insights - Real Data */}
        <ChartsSection />

        {/* Insights and Actions - Real Data */}
        <InsightsAndActionsSection />

        {/* Quick Action Button for Creating Ads */}
        <CreateAdSection isVerified={isVerified} />
      </div>
    </div>
  );
};

export default Dashboard;
