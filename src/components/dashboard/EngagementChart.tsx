
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';

const chartConfig = {
  views: {
    label: "Visualizações",
    color: "#4de9d8",
  },
  clicks: {
    label: "Cliques",
    color: "#3b302a",
  },
  messages: {
    label: "Mensagens",
    color: "#8b5cf6",
  },
};

export function EngagementChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['engagement-chart'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
      });

      // Get user's ads first
      const { data: userAds } = await supabase
        .from('ads')
        .select('id')
        .eq('user_id', user.id);

      const userAdIds = userAds?.map(ad => ad.id) || [];

      const dailyData = await Promise.all(
        last7Days.map(async (date, index) => {
          const nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);
          
          let viewsCount = 0;
          let clicksCount = 0;
          let messagesCount = 0;

          // Get views for this day (only for user's ads)
          if (userAdIds.length > 0) {
            const { data: viewsData } = await supabase
              .from('ad_views')
              .select('id')
              .in('ad_id', userAdIds)
              .gte('viewed_at', `${date}T00:00:00`)
              .lt('viewed_at', `${nextDate.toISOString().split('T')[0]}T00:00:00`);

            viewsCount = viewsData?.length || 0;

            // Get clicks for this day (only for user's ads)
            const { data: clicksData } = await supabase
              .from('ad_clicks')
              .select('id')
              .in('ad_id', userAdIds)
              .gte('clicked_at', `${date}T00:00:00`)
              .lt('clicked_at', `${nextDate.toISOString().split('T')[0]}T00:00:00`);

            clicksCount = clicksData?.length || 0;
          }

          // Get messages for this day (from conversations where user participates)
          const { data: messagesData } = await supabase
            .from('messages')
            .select('id, conversation_id, conversations!inner(participant_1, participant_2)')
            .or(`conversations.participant_1.eq.${user.id},conversations.participant_2.eq.${user.id}`)
            .gte('created_at', `${date}T00:00:00`)
            .lt('created_at', `${nextDate.toISOString().split('T')[0]}T00:00:00`);

          messagesCount = messagesData?.length || 0;

          const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
          const dayName = dayNames[new Date(date).getDay()];

          return {
            day: dayName,
            views: viewsCount,
            clicks: clicksCount,
            messages: messagesCount,
          };
        })
      );

      return dailyData;
    },
  });

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="pb-2 px-3 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
            Engajamento dos Últimos 7 Dias
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <Skeleton className="h-[250px] sm:h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  const hasData = chartData && chartData.some(item => item.views > 0 || item.clicks > 0 || item.messages > 0);

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
          Engajamento dos Últimos 7 Dias
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 pb-4">
        <div className="w-full overflow-hidden">
          {hasData ? (
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={chartData} 
                  margin={{ 
                    top: 5, 
                    right: 10, 
                    left: 0, 
                    bottom: 5 
                  }}
                >
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    interval={0}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    width={30}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#4de9d8" 
                    strokeWidth={2}
                    dot={{ fill: '#4de9d8', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, stroke: '#4de9d8', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#3b302a" 
                    strokeWidth={2}
                    dot={{ fill: '#3b302a', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, stroke: '#3b302a', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, stroke: '#8b5cf6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[250px] sm:h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-center px-4">
                <Calendar className="h-8 sm:h-12 w-8 sm:w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm sm:text-lg font-medium">
                  Nenhum dado encontrado
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">
                  Dados aparecerão conforme seus anúncios receberem engajamento
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
