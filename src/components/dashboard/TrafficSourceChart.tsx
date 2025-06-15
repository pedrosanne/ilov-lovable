
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

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

      // Get traffic data from ad_views with user_agent analysis
      const { data: viewsData } = await supabase
        .from('ad_views')
        .select('user_agent, ads(user_id)')
        .eq('ads.user_id', user.id);

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
      
      return [
        { name: 'Instagram', value: Math.round((sources.instagram / total) * 100), color: '#E1306C' },
        { name: 'Google', value: Math.round((sources.google / total) * 100), color: '#4285F4' },
        { name: 'Direto', value: Math.round((sources.direct / total) * 100), color: '#4de9d8' },
        { name: 'WhatsApp', value: Math.round((sources.whatsapp / total) * 100), color: '#25D366' },
        { name: 'Outros', value: Math.round((sources.other / total) * 100), color: '#6b7280' },
      ].filter(source => source.value > 0);
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

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
          Origem do Tráfego
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 pb-4">
        <div className="w-full overflow-hidden">
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
        </div>
      </CardContent>
    </Card>
  );
}
