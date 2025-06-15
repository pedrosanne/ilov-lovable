
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Globe } from 'lucide-react';

const chartConfig = {
  instagram: { label: "Instagram", color: "#E1306C" },
  google: { label: "Google", color: "#4285F4" },
  direct: { label: "Direto", color: "#4de9d8" },
  whatsapp: { label: "WhatsApp", color: "#25D366" },
  other: { label: "Outros", color: "#6b7280" },
};

export function TrafficSourceChart() {
  const { data: trafficData, isLoading } = useQuery({
    queryKey: ['traffic-sources'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get user's ads first
      const { data: userAds } = await supabase
        .from('ads')
        .select('id')
        .eq('user_id', user.id);

      if (!userAds || userAds.length === 0) {
        return [
          { name: 'Sem dados', value: 100, color: '#6b7280' }
        ];
      }

      const userAdIds = userAds.map(ad => ad.id);

      // Get traffic data from ad_views for user's ads
      const { data: viewsData } = await supabase
        .from('ad_views')
        .select('user_agent')
        .in('ad_id', userAdIds);

      if (!viewsData || viewsData.length === 0) {
        return [
          { name: 'Sem dados', value: 100, color: '#6b7280' }
        ];
      }

      // Analyze user agents to determine traffic sources
      const sources = {
        instagram: 0,
        google: 0,
        direct: 0,
        whatsapp: 0,
        other: 0,
      };

      viewsData.forEach((view) => {
        const userAgent = view.user_agent?.toLowerCase() || '';
        
        if (userAgent.includes('instagram')) {
          sources.instagram++;
        } else if (userAgent.includes('google') || userAgent.includes('chrome')) {
          sources.google++;
        } else if (userAgent.includes('whatsapp')) {
          sources.whatsapp++;
        } else if (userAgent === '' || userAgent.includes('direct')) {
          sources.direct++;
        } else {
          sources.other++;
        }
      });

      const total = viewsData.length;
      
      const result = [
        { name: 'Instagram', value: Math.round((sources.instagram / total) * 100), color: '#E1306C' },
        { name: 'Google', value: Math.round((sources.google / total) * 100), color: '#4285F4' },
        { name: 'Direto', value: Math.round((sources.direct / total) * 100), color: '#4de9d8' },
        { name: 'WhatsApp', value: Math.round((sources.whatsapp / total) * 100), color: '#25D366' },
        { name: 'Outros', value: Math.round((sources.other / total) * 100), color: '#6b7280' },
      ].filter(source => source.value > 0);

      return result.length > 0 ? result : [{ name: 'Sem dados', value: 100, color: '#6b7280' }];
    },
  });

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="pb-2 px-3 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
            Origem do Tráfego
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <Skeleton className="h-[250px] sm:h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  const hasRealData = trafficData && trafficData.length > 0 && trafficData[0].name !== 'Sem dados';

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
          Origem do Tráfego
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 pb-4">
        <div className="w-full overflow-hidden">
          {hasRealData ? (
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="45%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {trafficData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`${value}%`, 'Porcentagem']}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
                    wrapperStyle={{ 
                      fontSize: '12px',
                      paddingTop: '10px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[250px] sm:h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-center px-4">
                <Globe className="h-8 sm:h-12 w-8 sm:w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm sm:text-lg font-medium">
                  Nenhum dado encontrado
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">
                  Dados aparecerão conforme seus anúncios receberem visualizações
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
