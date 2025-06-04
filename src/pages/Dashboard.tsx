
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PlusCircle, Eye, MessageCircle, TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import { MetricsChart } from '@/components/MetricsChart';
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
      <div className="min-h-screen bg-gray-50">
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

  const hasData = stats && (stats.totalAds > 0 || stats.totalViews > 0 || stats.totalClicks > 0);

  const getVerificationAlert = () => {
    if (isVerified) return null;

    if (!hasVerification) {
      return (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex items-center justify-between">
              <div>
                <strong>Verificação de identidade necessária!</strong>
                <p className="mt-1">Você precisa verificar sua identidade para usar todas as funcionalidades da plataforma.</p>
              </div>
              <Button asChild className="ml-4">
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
          <Alert className="border-yellow-200 bg-yellow-50">
            <Shield className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Verificação em análise</strong>
              <p className="mt-1">Sua verificação está sendo analisada. Você será notificado quando for aprovada.</p>
            </AlertDescription>
          </Alert>
        );
      case 'rejected':
        return (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Verificação rejeitada</strong>
                  <p className="mt-1">Sua verificação foi rejeitada. Envie novos documentos para continuar usando a plataforma.</p>
                </div>
                <Button asChild className="ml-4">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard do Anunciante
          </h1>
          <p className="text-gray-600">
            Gerencie seus anúncios e acompanhe o desempenho
          </p>
        </div>

        {/* Alerta de verificação */}
        {getVerificationAlert() && (
          <div className="mb-8">
            {getVerificationAlert()}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Anúncios Ativos
              </CardTitle>
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? <Skeleton className="h-8 w-8" /> : stats?.totalAds || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Total de anúncios
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Visualizações
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? <Skeleton className="h-8 w-12" /> : stats?.totalViews || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Total de visualizações
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cliques
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? <Skeleton className="h-8 w-12" /> : stats?.totalClicks || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Total de cliques
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mensagens
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? <Skeleton className="h-8 w-12" /> : stats?.totalMessages || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Via WhatsApp
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analytics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Visualizações por Período</CardTitle>
              <CardDescription>
                Acompanhe o desempenho dos seus anúncios
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasData ? (
                <MetricsChart />
              ) : (
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      Ainda não há métricas para mostrar
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {isVerified ? 'Publique seu primeiro anúncio para ver as estatísticas' : 'Verifique sua identidade para publicar anúncios'}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Gerencie seus anúncios facilmente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full justify-start" 
                asChild
                disabled={!isVerified}
              >
                <Link to="/create-ad">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {isVerified ? 'Criar Novo Anúncio' : 'Criar Novo Anúncio 🔒'}
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/my-ads">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Meus Anúncios
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                asChild
                disabled={!isVerified}
              >
                <Link to="/messages">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {isVerified ? 'Mensagens Recebidas' : 'Mensagens Recebidas 🔒'}
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/reports">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Relatório Completo
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
