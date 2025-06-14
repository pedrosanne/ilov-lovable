
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Crown, Star, Zap, Clock, Moon } from 'lucide-react';

interface Step3PricingProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step3Pricing({ formData, updateFormData }: Step3PricingProps) {
  const packages = [
    {
      id: 'basic',
      name: 'Básico',
      price: 0,
      icon: <Star className="h-5 w-5" />,
      color: 'border-gray-300',
      bgColor: 'bg-white',
      features: ['Anúncio padrão', 'Listagem normal', 'Grátis']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29.90,
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      color: 'border-yellow-400',
      bgColor: 'bg-yellow-50',
      features: ['Destaque na busca', '3x mais views', 'Badge Premium']
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 59.90,
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      color: 'border-purple-400',
      bgColor: 'bg-purple-50',
      features: ['Topo da listagem', '5x mais views', 'Suporte prioritário']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">💰 Seus valores</h2>
        <p className="text-gray-600">Defina seus preços e escolha como destacar seu anúncio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="hourly_rate" className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>Valor por hora * (principal)</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
            <Input
              id="hourly_rate"
              type="number"
              min="0"
              value={formData.hourly_rate || ''}
              onChange={(e) => updateFormData({ hourly_rate: parseFloat(e.target.value) || 0 })}
              placeholder="150"
              className="pl-10 border-green-200 focus:border-green-500"
            />
          </div>
          <p className="text-sm text-gray-500">
            Valor cobrado por hora de atendimento
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="overnight_rate" className="flex items-center space-x-2">
            <Moon className="h-4 w-4 text-purple-500" />
            <span>Valor da pernoite (opcional)</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
            <Input
              id="overnight_rate"
              type="number"
              min="0"
              value={formData.price || ''}
              onChange={(e) => updateFormData({ price: parseFloat(e.target.value) || 0 })}
              placeholder="800"
              className="pl-10 border-green-200 focus:border-green-500"
            />
          </div>
          <p className="text-sm text-gray-500">
            Valor para pernoite completo (opcional)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Pacote de destaque</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`cursor-pointer transition-all duration-200 ${pkg.color} ${pkg.bgColor} ${
                formData.highlight_package === pkg.id 
                  ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
                  : 'hover:shadow-md hover:scale-102'
              }`}
              onClick={() => updateFormData({ highlight_package: pkg.id })}
            >
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  {pkg.icon}
                </div>
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                <div className="text-xl font-bold text-gray-900">
                  {pkg.price === 0 ? 'Grátis' : `R$ ${pkg.price.toFixed(2)}`}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {formData.highlight_package === pkg.id && (
                  <div className="mt-3 p-2 bg-blue-50 rounded text-center">
                    <span className="text-sm text-blue-800 font-medium">✓ Selecionado</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-900 mb-2">💡 Dicas de precificação:</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Pesquise os preços da concorrência na sua região</li>
          <li>• Valor por hora é obrigatório - seja competitiva</li>
          <li>• Pernoite é opcional mas pode atrair mais clientes</li>
          <li>• Pacotes de destaque aumentam significativamente a visibilidade</li>
        </ul>
      </div>
    </div>
  );
}
