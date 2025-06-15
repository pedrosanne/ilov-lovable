
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Lightbulb, Target, Users, Clock, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

export function InsightsSection() {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['dashboard-insights'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get user's ads stats
      const { data: stats } = await supabase
        .from('ads')
        .select('id, views_count, clicks_count, created_at')
        .eq('user_id', user.id);

      if (!stats || stats.length === 0) {
        return [
          {
            icon: AlertCircle,
            title: "Nenhum anúncio encontrado",
            description: "Crie seu primeiro anúncio para começar a receber insights.",
            type: "info" as const,
          }
        ];
      }

      const totalViews = stats.reduce((sum, ad) => sum + (ad.views_count || 0), 0);
      const totalClicks = stats.reduce((sum, ad) => sum + (ad.clicks_count || 0), 0);
      const conversionRate = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

      // Get recent views to analyze peak hours
      const { data: recentViews } = await supabase
        .from('ad_views')
        .select('viewed_at, ads(user_id)')
        .eq('ads.user_id', user.id)
        .gte('viewed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      // Analyze peak hours
      const hourCounts = new Array(24).fill(0);
      recentViews?.forEach(view => {
        if (view.viewed_at) {
          const hour = new Date(view.viewed_at).getHours();
          hourCounts[hour]++;
        }
      });

      const peakHour = hourCounts.indexOf(Math.max(...hourCounts));
      const peakHourEnd = peakHour === 23 ? 0 : peakHour + 1;

      const generatedInsights = [];

      // Performance insights
      if (conversionRate > 10) {
        generatedInsights.push({
          icon: TrendingUp,
          title: `Taxa de conversão de ${conversionRate.toFixed(1)}%`,
          description: "Sua taxa de conversão está acima da média! Continue assim.",
          type: "positive" as const,
        });
      } else if (conversionRate > 0) {
        generatedInsights.push({
          icon: Target,
          title: `Taxa de conversão de ${conversionRate.toFixed(1)}%`,
          description: "Considere otimizar suas fotos e descrição para melhorar a conversão.",
          type: "info" as const,
        });
      }

      // Views trend
      const last7DaysViews = recentViews?.length || 0;
      if (last7DaysViews > 50) {
        generatedInsights.push({
          icon: TrendingUp,
          title: `${last7DaysViews} visualizações nos últimos 7 dias`,
          description: "Seu anúncio está tendo um ótimo alcance recentemente!",
          type: "positive" as const,
        });
      }

      // Peak hours insight
      if (recentViews && recentViews.length > 10) {
        generatedInsights.push({
          icon: Clock,
          title: `Horário de pico: ${peakHour}h-${peakHourEnd === 0 ? 24 : peakHourEnd}h`,
          description: "A maioria dos seus visitantes acessa neste horário.",
          type: "info" as const,
        });
      }

      // Default insight if no data
      if (generatedInsights.length === 0) {
        generatedInsights.push({
          icon: Users,
          title: "Dados insuficientes",
          description: "Continue promovendo seu anúncio para receber insights mais detalhados.",
          type: "info" as const,
        });
      }

      return generatedInsights;
    },
  });

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[#4de9d8]" />
            <CardTitle className="text-lg font-semibold text-gray-900">
              Insights Inteligentes
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-[#4de9d8]" />
          <CardTitle className="text-lg font-semibold text-gray-900">
            Insights Inteligentes
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights?.map((insight, index) => (
          <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              insight.type === 'positive' 
                ? 'bg-green-100' 
                : 'bg-blue-100'
            }`}>
              <insight.icon className={`h-5 w-5 ${
                insight.type === 'positive' 
                  ? 'text-green-600' 
                  : 'text-blue-600'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <Badge variant={insight.type === 'positive' ? 'default' : 'secondary'} className="text-xs">
                  {insight.type === 'positive' ? 'Positivo' : 'Dica'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
