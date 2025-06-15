
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const trafficData = [
  { name: 'Instagram', value: 45, color: '#E1306C' },
  { name: 'Google', value: 30, color: '#4285F4' },
  { name: 'Direto', value: 15, color: '#4de9d8' },
  { name: 'WhatsApp', value: 10, color: '#25D366' },
];

const chartConfig = {
  instagram: { label: "Instagram", color: "#E1306C" },
  google: { label: "Google", color: "#4285F4" },
  direct: { label: "Direto", color: "#4de9d8" },
  whatsapp: { label: "WhatsApp", color: "#25D366" },
};

export function TrafficSourceChart() {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Origem do Tráfego
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {trafficData.map((entry, index) => (
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
                formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
