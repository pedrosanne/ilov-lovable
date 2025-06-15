
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Lightbulb, Target, Users } from 'lucide-react';

const insights = [
  {
    icon: TrendingUp,
    title: "Aumento de 25% nas visualizações",
    description: "Seus anúncios tiveram um ótimo desempenho nos últimos 7 dias.",
    type: "positive" as const,
  },
  {
    icon: Target,
    title: "Taxa de conversão acima da média",
    description: "12% dos visitantes clicaram no seu WhatsApp - continue assim!",
    type: "positive" as const,
  },
  {
    icon: Users,
    title: "Horário de pico: 19h-22h",
    description: "A maioria dos seus clientes acessa entre 19h e 22h.",
    type: "info" as const,
  },
];

export function InsightsSection() {
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
        {insights.map((insight, index) => (
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
