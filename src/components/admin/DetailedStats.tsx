
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdminDetailedStats } from '@/hooks/useAdminCharts';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle, Users, Shield } from 'lucide-react';

export function DetailedStats() {
  const { data: stats, isLoading } = useAdminDetailedStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getApprovalRateColor = (rate: string) => {
    const numRate = parseFloat(rate);
    if (numRate >= 80) return 'text-green-600';
    if (numRate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getApprovalRateIcon = (rate: string) => {
    const numRate = parseFloat(rate);
    if (numRate >= 70) return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Estatísticas Detalhadas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Taxa de Aprovação de Anúncios */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`text-2xl font-bold ${getApprovalRateColor(stats?.ads.approvalRate || '0%')}`}>
                {stats?.ads.approvalRate}
              </div>
              {getApprovalRateIcon(stats?.ads.approvalRate || '0%')}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.ads.active} de {stats?.ads.total} anúncios
            </p>
          </CardContent>
        </Card>

        {/* Anúncios Pendentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anúncios Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats?.ads.pending}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando análise
            </p>
          </CardContent>
        </Card>

        {/* Taxa de Verificação */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Verificação</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getApprovalRateColor(stats?.verifications.approvalRate || '0%')}`}>
              {stats?.verifications.approvalRate}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.verifications.approved} verificações aprovadas
            </p>
          </CardContent>
        </Card>

        {/* Tempo Médio de Análise */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.verifications.avgReviewTimeHours}h
            </div>
            <p className="text-xs text-muted-foreground">
              Para análise de verificações
            </p>
          </CardContent>
        </Card>

        {/* Total de Usuários */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.users.total}
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <Badge variant="outline" className="text-xs">
                {stats?.users.verified} verificados
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Anunciantes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anunciantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats?.users.providers}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.users.providerRate} do total
            </p>
          </CardContent>
        </Card>

        {/* Verificações Pendentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verificações Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats?.verifications.pending}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando análise
            </p>
          </CardContent>
        </Card>

        {/* Anúncios Rejeitados */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anúncios Rejeitados</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats?.ads.rejected}
            </div>
            <p className="text-xs text-muted-foreground">
              Total rejeitado
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
