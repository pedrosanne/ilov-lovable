
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Seg', views: 120, clicks: 45, messages: 8 },
  { day: 'Ter', views: 190, clicks: 62, messages: 12 },
  { day: 'Qua', views: 150, clicks: 38, messages: 6 },
  { day: 'Qui', views: 220, clicks: 71, messages: 15 },
  { day: 'Sex', views: 280, clicks: 89, messages: 18 },
  { day: 'Sáb', views: 340, clicks: 112, messages: 22 },
  { day: 'Dom', views: 260, clicks: 95, messages: 19 },
];

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
