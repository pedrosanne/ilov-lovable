
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Star, Zap, Check } from 'lucide-react';

interface HighlightStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function HighlightStep({ formData, updateFormData }: HighlightStepProps) {
  const packages = [
    {
      id: 'basic',
      name: 'Básico',
      price: 0,
      icon: <Star className="h-6 w-6" />,
      color: 'border-gray-300',
      bgColor: 'bg-white',
      features: [
        'Anúncio publicado normalmente',
        'Aparece na listagem padrão',
        'Sem custos adicionais',
        'Válido por 30 dias'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29.90,
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      color: 'border-yellow-400',
      bgColor: 'bg-yellow-50',
      features: [
        'Destaque na listagem',
        'Bordas douradas',
        'Badge "Premium"',
        'Aparece no topo da busca',
        '3x mais visualizações',
        'Válido por 30 dias'
      ]
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 59.90,
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      color: 'border-purple-400',
      bgColor: 'bg-purple-50',
      features: [
        'Máximo destaque',
        'Seção especial VIP',
        'Badge "VIP" exclusivo',
        'Sempre no topo',
        'Bordas roxas brilhantes',
        '5x mais visualizações',
        'Suporte prioritário',
        'Válido por 30 dias'
      ]
    }
  ];

  const selectedPackage = packages.find(pkg => pkg.id === formData.highlight_package) || packages[0];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Quer destacar seu anúncio?</h2>
        <p className="text-gray-600">
          Escolha um pacote de destaque para aumentar sua visibilidade e atrair mais clientes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`cursor-pointer transition-all duration-200 ${pkg.color} ${pkg.bgColor} ${
              formData.highlight_package === pkg.id 
                ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                : 'hover:shadow-md hover:scale-102'
            }`}
            onClick={() => updateFormData({ highlight_package: pkg.id })}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                {pkg.icon}
              </div>
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <div className="text-2xl font-bold text-gray-900">
                {pkg.price === 0 ? 'Grátis' : `R$ ${pkg.price.toFixed(2)}`}
              </div>
              {pkg.price > 0 && (
                <p className="text-sm text-gray-500">por 30 dias</p>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {formData.highlight_package === pkg.id && (
                <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium text-center">
                    ✓ Pacote selecionado
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-3">Por que investir em destaque?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Benefícios comprovados:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Até 5x mais visualizações</li>
              <li>• Mais contatos qualificados</li>
              <li>• Credibilidade aumentada</li>
              <li>• ROI positivo desde o primeiro cliente</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Como funciona:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ativação imediata após o pagamento</li>
              <li>• Renovação automática opcional</li>
              <li>• Pode ser alterado a qualquer momento</li>
              <li>• Garantia de satisfação</li>
            </ul>
          </div>
        </div>
      </div>

      {selectedPackage.price > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-medium text-green-900 mb-2">Investimento selecionado:</h4>
          <div className="flex justify-between items-center">
            <span className="text-green-800">
              Pacote {selectedPackage.name} - 30 dias
            </span>
            <span className="text-xl font-bold text-green-900">
              R$ {selectedPackage.price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-green-700 mt-2">
            O pagamento será processado após a publicação do anúncio
          </p>
        </div>
      )}
    </div>
  );
}
