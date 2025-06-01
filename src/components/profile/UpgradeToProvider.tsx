
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, TrendingUp, Shield, UserPlus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function UpgradeToProvider() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const upgradeToProviderMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Usuário não encontrado');
      
      const { error } = await supabase
        .from('profiles')
        .update({ is_provider: true })
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Parabéns! 🎉",
        description: "Agora você é um anunciante! Crie seu primeiro anúncio.",
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate('/create-ad');
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Não foi possível fazer o upgrade. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleUpgrade = () => {
    setIsUpgrading(true);
    upgradeToProviderMutation.mutate();
  };

  const benefits = [
    "Criar anúncios ilimitados",
    "Acesso a métricas detalhadas",
    "Perfil destacado nos resultados",
    "Sistema de mensagens diretas",
    "Suporte prioritário",
    "Ferramenta de agendamento",
    "Histórico de clientes",
    "Relatórios de desempenho"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
            <UserPlus className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Torne-se um Anunciante
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Expanda seus negócios e alcance milhares de clientes potenciais. 
          Crie anúncios profissionais e gerencie seu perfil como prestador de serviços.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <Star className="h-5 w-5 mr-2" />
              Benefícios Exclusivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <TrendingUp className="h-5 w-5 mr-2" />
                Potencial de Crescimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Clientes mensais</span>
                  <Badge variant="secondary">+500%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Visibilidade</span>
                  <Badge variant="secondary">+300%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Conversões</span>
                  <Badge variant="secondary">+250%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-600">
                <Shield className="h-5 w-5 mr-2" />
                Segurança e Confiança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Verificação de identidade</li>
                <li>• Sistema de avaliações</li>
                <li>• Proteção de dados</li>
                <li>• Suporte 24/7</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Comece hoje mesmo e transforme seu perfil em uma ferramenta poderosa 
            para atrair novos clientes.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            onClick={handleUpgrade}
            disabled={isUpgrading || upgradeToProviderMutation.isPending}
          >
            {isUpgrading || upgradeToProviderMutation.isPending ? (
              "Processando..."
            ) : (
              "Tornar-se Anunciante Agora"
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Gratuito para começar • Sem taxas ocultas
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
