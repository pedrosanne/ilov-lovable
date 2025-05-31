
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdStats, useMyAds } from '@/hooks/useAds';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { TrendingUp, Eye, MessageCircle, PlusCircle, Download, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { MetricsChart } from '@/components/MetricsChart';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Reports = () => {
  const { user, loading } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAdStats();
  const { data: ads, isLoading: adsLoading } = useMyAds();
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64" />
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

  const calculateCTR = () => {
    if (!stats || stats.totalViews === 0) return 0;
    return ((stats.totalClicks / stats.totalViews) * 100).toFixed(2);
  };

  const calculateAvgViewsPerAd = () => {
    if (!stats || stats.totalAds === 0) return 0;
    return (stats.totalViews / stats.totalAds).toFixed(1);
  };

  const exportReport = () => {
    // Funcionalidade de exportação - implementar posteriormente
    console.log('Exportando relatório...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Relatório Completo
            </h1>
            <p className="text-gray-600">
              Análise detalhada do desempenho dos seus anúncios
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 3 meses</SelectItem>
                <SelectItem value="365">Último ano</SelectItem>
                <SelectItem value="all">Todo o período</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Anúncios</CardTitle>
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? <Skeleton className="h-8 w-8" /> : stats?.totalAds || 0}
              </div>
              <p className="text-xs text-muted-foreground">Anúncios publicados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? <Skeleton className="h-8 w-12" /> : stats?.totalViews || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Média: {calculateAvgViewsPerAd()} por anúncio
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Cliques (CTR)</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateCTR()}%</div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalClicks || 0} cliques totais
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contatos Recebidos</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? <Skeleton className="h-8 w-12" /> : stats?.totalMessages || 0}
              </div>
              <p className="text-xs text-muted-foreground">Via WhatsApp</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Desempenho por Período</CardTitle>
            <CardDescription>
              Visualizações e cliques nos últimos {selectedPeriod === 'all' ? 'todo período' : `${selectedPeriod} dias`}
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
                    Publique anúncios para ver o desempenho aqui
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabela de Anúncios */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Anúncio</CardTitle>
            <CardDescription>
              Métricas detalhadas de cada anúncio publicado
            </CardDescription>
          </CardHeader>
          <CardContent>
            {adsLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : ads && ads.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Visualizações</TableHead>
                    <TableHead className="text-right">Cliques</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead className="text-right">Mensagens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ads.map((ad) => {
                    const ctr = ad.views_count && ad.views_count > 0 
                      ? ((ad.clicks_count || 0) / ad.views_count * 100).toFixed(2)
                      : '0.00';
                    
                    return (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium max-w-xs truncate">
                          {ad.title}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            ad.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {ad.status === 'active' ? 'Ativo' : 'Pendente'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{ad.views_count || 0}</TableCell>
                        <TableCell className="text-right">{ad.clicks_count || 0}</TableCell>
                        <TableCell className="text-right">{ctr}%</TableCell>
                        <TableCell className="text-right">0</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <PlusCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum anúncio encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
