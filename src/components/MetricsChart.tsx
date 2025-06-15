
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface MetricsChartProps {
  period?: string;
}

export function MetricsChart({ period = '7' }: MetricsChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  const { data: chartData, isLoading } = useQuery({
    queryKey: ['metrics-chart', selectedPeriod],
    queryFn: async () => {
      const days = parseInt(selectedPeriod);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Buscar visualizações por dia
      const { data: viewsData, error: viewsError } = await supabase
        .from('ad_views')
        .select('viewed_at')
        .gte('viewed_at', startDate.toISOString());

      if (viewsError) throw viewsError;

      // Buscar cliques por dia
      const { data: clicksData, error: clicksError } = await supabase
        .from('ad_clicks')
        .select('clicked_at')
        .gte('clicked_at', startDate.toISOString());

      if (clicksError) throw clicksError;

      // Agrupar dados por dia
      const dateMap = new Map();
      
      // Inicializar todos os dias com zero
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        dateMap.set(dateKey, { views: 0, clicks: 0, day: date });
      }

      // Contar visualizações
      viewsData?.forEach(view => {
        const dateKey = view.viewed_at.split('T')[0];
        if (dateMap.has(dateKey)) {
          dateMap.get(dateKey).views++;
        }
      });

      // Contar cliques
      clicksData?.forEach(click => {
        const dateKey = click.clicked_at.split('T')[0];
        if (dateMap.has(dateKey)) {
          dateMap.get(dateKey).clicks++;
        }
      });

      // Converter para array e formatar
      const chartData = Array.from(dateMap.values())
        .sort((a, b) => a.day.getTime() - b.day.getTime())
        .map(item => ({
          day: item.day.toLocaleDateString('pt-BR', { 
            weekday: 'short',
            day: '2-digit',
            month: '2-digit'
          }),
          views: item.views,
          clicks: item.clicks
        }));

      return chartData;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4 px-2 sm:px-0">
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32 sm:w-40" />
        </div>
        <Skeleton className="h-[250px] sm:h-[300px] w-full" />
      </div>
    );
  }

  const hasData = chartData && chartData.some(item => item.views > 0 || item.clicks > 0);

  return (
    <div className="space-y-4 px-2 sm:px-0">
      <div className="flex justify-end">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32 sm:w-40">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="15">Últimos 15 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 3 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasData ? (
        <div className="h-[250px] sm:h-[300px] w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={{ 
                top: 5, 
                right: 10, 
                left: 10, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 10 }}
                interval={chartData.length > 7 ? 'preserveStartEnd' : 0}
              />
              <YAxis tick={{ fontSize: 10 }} width={30} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Visualizações"
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Cliques"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[250px] sm:h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-center px-4">
            <Calendar className="h-8 sm:h-12 w-8 sm:w-12 text-gray-400 mx-auto mb-4" />
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
  );
}
