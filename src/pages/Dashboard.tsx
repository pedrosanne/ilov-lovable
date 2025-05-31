
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Eye, MessageCircle, TrendingUp } from 'lucide-react';
import { MetricsChart } from '@/components/MetricsChart';
import { useAuth } from '@/hooks/useAuth';
import { useAdStats } from '@/hooks/useAds';
import { Navigate, Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAdStats();

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
                      Publique seu primeiro anúncio para ver as estatísticas
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
              <Button className="w-full justify-start" asChild>
                <Link to="/create-ad">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Criar Novo Anúncio
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/my-ads">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Meus Anúncios
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/messages">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Mensagens Recebidas
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
