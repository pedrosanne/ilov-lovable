
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdminDetailedStats } from '@/hooks/useAdminCharts';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle, Users, Shield } from 'lucide-react';

export function DetailedStats() {
  const { data: stats, isLoading } = useAdminDetailedStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="p-3">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-6 w-12 mb-1" />
            <Skeleton className="h-3 w-16" />
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
    if (numRate >= 70) return <TrendingUp className="h-3 w-3 text-green-600" />;
    return <TrendingDown className="h-3 w-3 text-red-600" />;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Estatísticas Detalhadas</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* Taxa de Aprovação de Anúncios */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Taxa de Aprovação</span>
            <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="flex items-center space-x-1">
            <div className={`text-lg font-bold ${getApprovalRateColor(stats?.ads.approvalRate || '0%')}`}>
              {stats?.ads.approvalRate}
            </div>
            {getApprovalRateIcon(stats?.ads.approvalRate || '0%')}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats?.ads.active} de {stats?.ads.total}
          </p>
        </Card>

        {/* Anúncios Pendentes */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Anúncios Pendentes</span>
            <AlertCircle className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold text-orange-600">
            {stats?.ads.pending}
          </div>
          <p className="text-xs text-muted-foreground">
            Aguardando análise
          </p>
        </Card>

        {/* Taxa de Verificação */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Taxa de Verificação</span>
            <Shield className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className={`text-lg font-bold ${getApprovalRateColor(stats?.verifications.approvalRate || '0%')}`}>
            {stats?.verifications.approvalRate}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats?.verifications.approved} aprovadas
          </p>
        </Card>

        {/* Tempo Médio de Análise */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Tempo Médio</span>
            <Clock className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold">
            {stats?.verifications.avgReviewTimeHours}h
          </div>
          <p className="text-xs text-muted-foreground">
            Para análise
          </p>
        </Card>

        {/* Total de Usuários */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Total Usuários</span>
            <Users className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold">
            {stats?.users.total}
          </div>
          <Badge variant="outline" className="text-xs px-1 py-0">
            {stats?.users.verified} verificados
          </Badge>
        </Card>

        {/* Anunciantes */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Anunciantes</span>
            <Users className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold text-blue-600">
            {stats?.users.providers}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats?.users.providerRate}
          </p>
        </Card>

        {/* Verificações Pendentes */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Verif. Pendentes</span>
            <AlertCircle className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold text-orange-600">
            {stats?.verifications.pending}
          </div>
          <p className="text-xs text-muted-foreground">
            Aguardando
          </p>
        </Card>

        {/* Anúncios Rejeitados */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Rejeitados</span>
            <AlertCircle className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold text-red-600">
            {stats?.ads.rejected}
          </div>
          <p className="text-xs text-muted-foreground">
            Total rejeitado
          </p>
        </Card>
      </div>
    </div>
  );
}
