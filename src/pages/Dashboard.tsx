
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PlusCircle, Eye, Heart, MessageCircle, TrendingUp, Shield, AlertTriangle, Users } from 'lucide-react';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { TrafficSourceChart } from '@/components/dashboard/TrafficSourceChart';
import { InsightsSection } from '@/components/dashboard/InsightsSection';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useAuth } from '@/hooks/useAuth';
import { useAdStats } from '@/hooks/useAds';
import { useVerificationStatus } from '@/hooks/useVerificationStatus';
import { Navigate, Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

  const getVerificationAlert = () => {
    if (isVerified) return null;

    if (!hasVerification) {
      return (
        <Alert className="border-red-200 bg-red-50 rounded-2xl">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex items-center justify-between">
              <div>
                <strong>Verificação de identidade necessária!</strong>
                <p className="mt-1">Você precisa verificar sua identidade para usar todas as funcionalidades da plataforma.</p>
              </div>
              <Button asChild className="ml-4 bg-red-600 hover:bg-red-700 rounded-xl">
                <Link to="/profile?tab=settings">
                  Verificar Agora
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      );
    }

    switch (verificationStatus) {
      case 'pending':
        return (
          <Alert className="border-yellow-200 bg-yellow-50 rounded-2xl">
            <Shield className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Verificação em análise</strong>
              <p className="mt-1">Sua verificação está sendo analisada. Você será notificado quando for aprovada.</p>
            </AlertDescription>
          </Alert>
        );
      case 'rejected':
        return (
          <Alert className="border-red-200 bg-red-50 rounded-2xl">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Verificação rejeitada</strong>
                  <p className="mt-1">Sua verificação foi rejeitada. Envie novos documentos para continuar usando a plataforma.</p>
                </div>
                <Button asChild className="ml-4 bg-red-600 hover:bg-red-700 rounded-xl">
                  <Link to="/profile?tab=settings">
                    Nova Verificação
                  </Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  // Calculate conversion rate with real data
  const conversionRate = stats?.totalViews && stats?.totalClicks 
    ? ((stats.totalClicks / stats.totalViews) * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard do Anunciante
          </h1>
          <p className="text-gray-600 text-lg">
            Acompanhe o desempenho dos seus anúncios com dados reais e precisos
          </p>
        </div>

        {/* Verification Alert */}
        {getVerificationAlert() && (
          <div className="max-w-4xl mx-auto">
            {getVerificationAlert()}
          </div>
        )}

        {/* KPI Metrics Cards - All Real Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricsCard
            title="Visualizações do Perfil"
            value={statsLoading ? '...' : stats?.totalViews || 0}
            icon={Eye}
            trend={stats?.totalViews ? { value: 0, isPositive: true } : undefined}
            subtitle="total acumulado"
          />
          
          <MetricsCard
            title="Cliques no WhatsApp"
            value={statsLoading ? '...' : stats?.totalClicks || 0}
            icon={MessageCircle}
            trend={stats?.totalClicks ? { value: 0, isPositive: true } : undefined}
            subtitle="total acumulado"
          />
          
          <MetricsCard
            title="Favoritos"
            value={favoritesCount !== undefined ? favoritesCount : '...'}
            icon={Heart}
            subtitle="total acumulado"
          />
          
          <MetricsCard
            title="Conversas Iniciadas"
            value={messagesCount !== undefined ? messagesCount : '...'}
            icon={Users}
            subtitle="total acumulado"
          />
          
          <MetricsCard
            title="Taxa de Conversão"
            value={`${conversionRate}%`}
            icon={TrendingUp}
            subtitle="cliques/visualizações"
          />
        </div>

        {/* Charts and Insights - Real Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EngagementChart />
          <TrafficSourceChart />
        </div>

        {/* Insights and Actions - Real Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InsightsSection />
          <QuickActions />
        </div>

        {/* Quick Action Button for Creating Ads */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#4de9d8] to-[#3bc9d8] hover:from-[#3bc9d8] hover:to-[#2ab5c5] text-white border-0 shadow-lg rounded-2xl px-8 py-4 text-lg font-semibold"
            disabled={!isVerified}
            asChild={isVerified}
          >
            {isVerified ? (
              <Link to="/create-ad">
                <PlusCircle className="h-5 w-5 mr-2" />
                Criar Novo Anúncio
              </Link>
            ) : (
              <>
                <PlusCircle className="h-5 w-5 mr-2" />
                Criar Novo Anúncio 🔒
              </>
            )}
          </Button>
          {!isVerified && (
            <p className="text-sm text-gray-500 mt-2">
              Verifique sua identidade para criar anúncios
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
