
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { subDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function useAdminChartData() {
  return useQuery({
    queryKey: ['admin-chart-data'],
    queryFn: async () => {
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), 6 - i);
        return {
          date,
          dateStr: format(date, 'yyyy-MM-dd'),
          label: format(date, 'dd/MM', { locale: ptBR })
        };
      });

      // Buscar anúncios criados nos últimos 7 dias
      const { data: adsData } = await supabase
        .from('ads')
        .select('created_at, status')
        .gte('created_at', last7Days[0].dateStr);

      // Buscar verificações dos últimos 7 dias
      const { data: verificationsData } = await supabase
        .from('identity_verifications')
        .select('created_at, status')
        .gte('created_at', last7Days[0].dateStr);

      // Buscar usuários registrados nos últimos 7 dias
      const { data: usersData } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', last7Days[0].dateStr);

      // Processar dados dos anúncios
      const adsChartData = last7Days.map(day => {
        const dayAds = adsData?.filter(ad => 
          ad.created_at.startsWith(day.dateStr)
        ) || [];
        
        return {
          date: day.label,
          total: dayAds.length,
          approved: dayAds.filter(ad => ad.status === 'active').length,
          pending: dayAds.filter(ad => ad.status === 'pending_approval').length,
          rejected: dayAds.filter(ad => ad.status === 'rejected').length,
        };
      });

      // Processar dados das verificações
      const verificationsChartData = last7Days.map(day => {
        const dayVerifications = verificationsData?.filter(verification => 
          verification.created_at.startsWith(day.dateStr)
        ) || [];
        
        return {
          date: day.label,
          total: dayVerifications.length,
          approved: dayVerifications.filter(v => v.status === 'approved').length,
          pending: dayVerifications.filter(v => v.status === 'pending').length,
          rejected: dayVerifications.filter(v => v.status === 'rejected').length,
        };
      });

      // Processar dados dos usuários
      const usersChartData = last7Days.map(day => {
        const dayUsers = usersData?.filter(user => 
          user.created_at?.startsWith(day.dateStr)
        ) || [];
        
        return {
          date: day.label,
          newUsers: dayUsers.length,
        };
      });

      return {
        adsData: adsChartData,
        verificationsData: verificationsChartData,
        usersData: usersChartData,
      };
    },
  });
}

export function useAdminDetailedStats() {
  return useQuery({
    queryKey: ['admin-detailed-stats'],
    queryFn: async () => {
      // Estatísticas de anúncios
      const { data: adsStats } = await supabase
        .from('ads')
        .select('status, created_at');

      // Estatísticas de verificações
      const { data: verificationsStats } = await supabase
        .from('identity_verifications')
        .select('status, created_at, reviewed_at');

      // Estatísticas de usuários
      const { data: usersStats } = await supabase
        .from('profiles')
        .select('created_at, is_provider, is_verified');

      // Calcular métricas de anúncios
      const totalAds = adsStats?.length || 0;
      const activeAds = adsStats?.filter(ad => ad.status === 'active').length || 0;
      const pendingAds = adsStats?.filter(ad => ad.status === 'pending_approval').length || 0;
      const rejectedAds = adsStats?.filter(ad => ad.status === 'rejected').length || 0;
      const approvalRate = totalAds > 0 ? ((activeAds / totalAds) * 100).toFixed(1) : '0';

      // Calcular métricas de verificações
      const totalVerifications = verificationsStats?.length || 0;
      const approvedVerifications = verificationsStats?.filter(v => v.status === 'approved').length || 0;
      const pendingVerifications = verificationsStats?.filter(v => v.status === 'pending').length || 0;
      const verificationApprovalRate = totalVerifications > 0 ? 
        ((approvedVerifications / totalVerifications) * 100).toFixed(1) : '0';

      // Calcular tempo médio de análise (verificações revisadas)
      const reviewedVerifications = verificationsStats?.filter(v => 
        v.status !== 'pending' && v.reviewed_at
      ) || [];
      
      let avgReviewTime = 0;
      if (reviewedVerifications.length > 0) {
        const totalTime = reviewedVerifications.reduce((acc, v) => {
          const created = new Date(v.created_at);
          const reviewed = new Date(v.reviewed_at!);
          return acc + (reviewed.getTime() - created.getTime());
        }, 0);
        avgReviewTime = Math.round(totalTime / reviewedVerifications.length / (1000 * 60 * 60)); // em horas
      }

      // Métricas de usuários
      const totalUsers = usersStats?.length || 0;
      const providersCount = usersStats?.filter(u => u.is_provider).length || 0;
      const verifiedUsers = usersStats?.filter(u => u.is_verified).length || 0;

      return {
        ads: {
          total: totalAds,
          active: activeAds,
          pending: pendingAds,
          rejected: rejectedAds,
          approvalRate: `${approvalRate}%`,
        },
        verifications: {
          total: totalVerifications,
          approved: approvedVerifications,
          pending: pendingVerifications,
          approvalRate: `${verificationApprovalRate}%`,
          avgReviewTimeHours: avgReviewTime,
        },
        users: {
          total: totalUsers,
          providers: providersCount,
          verified: verifiedUsers,
          providerRate: totalUsers > 0 ? `${((providersCount / totalUsers) * 100).toFixed(1)}%` : '0%',
        },
      };
    },
  });
}
