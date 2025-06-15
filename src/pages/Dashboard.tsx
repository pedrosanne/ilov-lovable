
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

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAdStats();
  const { isVerified, hasVerification, verificationStatus } = useVerificationStatus();

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

  // Calculate conversion rate
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
            Acompanhe o desempenho dos seus anúncios e otimize seus resultados
          </p>
        </div>

        {/* Verification Alert */}
        {getVerificationAlert() && (
          <div className="max-w-4xl mx-auto">
            {getVerificationAlert()}
          </div>
        )}

        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricsCard
            title="Visualizações do Perfil"
            value={statsLoading ? '...' : stats?.totalViews || 0}
            icon={Eye}
            trend={{ value: 12, isPositive: true }}
            subtitle="últimos 30 dias"
          />
          
          <MetricsCard
            title="Cliques no WhatsApp"
            value={statsLoading ? '...' : stats?.totalClicks || 0}
            icon={MessageCircle}
            trend={{ value: 8, isPositive: true }}
            subtitle="últimos 30 dias"
          />
          
          <MetricsCard
            title="Favoritos"
            value={statsLoading ? '...' : Math.floor((stats?.totalViews || 0) * 0.15)}
            icon={Heart}
            trend={{ value: 15, isPositive: true }}
            subtitle="total acumulado"
          />
          
          <MetricsCard
            title="Mensagens Recebidas"
            value={statsLoading ? '...' : stats?.totalMessages || 0}
            icon={Users}
            trend={{ value: 20, isPositive: true }}
            subtitle="últimos 30 dias"
          />
          
          <MetricsCard
            title="Taxa de Conversão"
            value={`${conversionRate}%`}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            subtitle="cliques/visualizações"
          />
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EngagementChart />
          <TrafficSourceChart />
        </div>

        {/* Insights and Actions */}
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
