
import { Eye, Heart, MessageCircle, TrendingUp, Users } from 'lucide-react';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { Skeleton } from '@/components/ui/skeleton';

interface MetricsSectionProps {
  stats: {
    totalViews: number;
    totalClicks: number;
    totalAds: number;
    totalMessages: number;
  } | undefined;
  statsLoading: boolean;
  favoritesCount: number | undefined;
  messagesCount: number | undefined;
  conversionRate: string;
}

export function MetricsSection({ 
  stats, 
  statsLoading, 
  favoritesCount, 
  messagesCount, 
  conversionRate 
}: MetricsSectionProps) {
  return (
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
  );
}
