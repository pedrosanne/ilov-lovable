
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

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

      // Get engagement data for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
      });

      const dailyData = await Promise.all(
        last7Days.map(async (date, index) => {
          const nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);
          
          // Get views for this day
          const { data: viewsData } = await supabase
            .from('ad_views')
            .select('id')
            .gte('viewed_at', `${date}T00:00:00`)
            .lt('viewed_at', `${nextDate.toISOString().split('T')[0]}T00:00:00`)
            .eq('ads.user_id', user.id);

          // Get clicks for this day
          const { data: clicksData } = await supabase
            .from('ad_clicks')
            .select('id')
            .gte('clicked_at', `${date}T00:00:00`)
            .lt('clicked_at', `${nextDate.toISOString().split('T')[0]}T00:00:00`)
            .eq('ads.user_id', user.id);

          // Get messages for this day (assuming we have a messages table)
          const { data: messagesData } = await supabase
            .from('messages')
            .select('id')
            .gte('created_at', `${date}T00:00:00`)
            .lt('created_at', `${nextDate.toISOString().split('T')[0]}T00:00:00`);

          const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
          const dayName = dayNames[new Date(date).getDay()];

          return {
            day: dayName,
            views: viewsData?.length || 0,
            clicks: clicksData?.length || 0,
            messages: messagesData?.length || 0,
          };
        })
      );

      return dailyData;
    },
  });

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Engajamento dos Últimos 7 Dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Engajamento dos Últimos 7 Dias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#4de9d8" 
                strokeWidth={3}
                dot={{ fill: '#4de9d8', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#4de9d8', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#3b302a" 
                strokeWidth={3}
                dot={{ fill: '#3b302a', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b302a', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="messages" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
