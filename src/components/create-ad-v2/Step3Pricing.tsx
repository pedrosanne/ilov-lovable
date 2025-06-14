
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Crown, Zap } from 'lucide-react';

interface Step3Props {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step3Pricing({ formData, updateFormData }: Step3Props) {
  const paymentMethods = [
    'Dinheiro', 'PIX', 'Cartão de débito', 'Cartão de crédito',
    'Transferência bancária', 'PayPal', 'PicPay'
  ];

  const highlightPackages = [
    {
      id: 'basic',
      name: 'Básico',
      price: 0,
      icon: '📝',
      features: ['Anúncio padrão', 'Aparece na busca normal']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29.90,
      icon: '⭐',
      features: ['Destaque dourado', 'Aparece no topo', '3x mais visualizações']
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 59.90,
      icon: '👑',
      features: ['Destaque vermelho', 'Primeiro na lista', '5x mais visualizações', 'Badge VIP']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <DollarSign className="h-5 w-5 text-green-500" />
        <span>Seus valores</span>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          💰 <strong>Defina valores justos</strong> e seja transparente com seus clientes!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Valor principal (R$) *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price || ''}
            onChange={(e) => updateFormData({ price: parseFloat(e.target.value) || 0 })}
            placeholder="Ex: 300.00"
          />
          <p className="text-xs text-gray-500">
            Valor base do seu serviço
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hourly_rate">Valor por hora (R$)</Label>
          <Input
            id="hourly_rate"
            type="number"
            min="0"
            step="0.01"
            value={formData.hourly_rate || ''}
            onChange={(e) => updateFormData({ hourly_rate: parseFloat(e.target.value) || null })}
            placeholder="Ex: 150.00"
          />
          <p className="text-xs text-gray-500">
            Opcional - para serviços por hora
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Formas de pagamento aceitas</Label>
        <div className="flex flex-wrap gap-2">
          {paymentMethods.map((method) => (
            <Badge
              key={method}
              variant={formData.payment_methods?.includes(method) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => {
                const current = formData.payment_methods || [];
                const updated = current.includes(method)
                  ? current.filter((m: string) => m !== method)
                  : [...current, method];
                updateFormData({ payment_methods: updated });
              }}
            >
              {method}
            </Badge>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Crown className="h-4 w-4 text-yellow-500" />
          <Label className="text-base font-medium">Pacote de destaque</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlightPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.highlight_package === pkg.id
                  ? 'ring-2 ring-purple-500 bg-purple-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => updateFormData({ highlight_package: pkg.id })}
            >
              <CardHeader className="text-center pb-2">
                <div className="text-2xl mb-2">{pkg.icon}</div>
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                <div className="text-2xl font-bold text-green-600">
                  {pkg.price === 0 ? 'Grátis' : `R$ ${pkg.price.toFixed(2)}`}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {formData.highlight_package !== 'basic' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Pacote {highlightPackages.find(p => p.id === formData.highlight_package)?.name} selecionado!
              </span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Seu anúncio terá muito mais visibilidade e atrairá mais clientes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
