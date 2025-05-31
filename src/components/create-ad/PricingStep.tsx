
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DollarSign, Package, CreditCard } from 'lucide-react';

interface PricingStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function PricingStep({ formData, updateFormData }: PricingStepProps) {
  const paymentMethods = [
    { value: 'dinheiro', label: 'Dinheiro', icon: '💵' },
    { value: 'pix', label: 'PIX', icon: '📱' },
    { value: 'cartao', label: 'Cartão de Crédito/Débito', icon: '💳' },
    { value: 'transferencia', label: 'Transferência Bancária', icon: '🏦' },
    { value: 'crypto', label: 'Criptomoedas', icon: '₿' },
  ];

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    const currentMethods = formData.payment_methods || [];
    if (checked) {
      updateFormData({ payment_methods: [...currentMethods, method] });
    } else {
      updateFormData({ payment_methods: currentMethods.filter((m: string) => m !== method) });
    }
  };

  const handlePackageChange = (field: string, value: any) => {
    const currentPackages = formData.packages || {};
    updateFormData({
      packages: {
        ...currentPackages,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <DollarSign className="h-5 w-5 text-green-500" />
        <span>Valores e Pagamento</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price">Valor mínimo por encontro (R$) *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price || ''}
            onChange={(e) => updateFormData({ price: parseFloat(e.target.value) || 0 })}
            placeholder="100.00"
          />
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
            placeholder="200.00"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-blue-500" />
          <span>Pacotes e Promoções</span>
        </Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="package_2h">Pacote 2 horas (R$)</Label>
            <Input
              id="package_2h"
              type="number"
              min="0"
              step="0.01"
              value={formData.packages?.package_2h || ''}
              onChange={(e) => handlePackageChange('package_2h', parseFloat(e.target.value) || null)}
              placeholder="350.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="package_night">Pacote pernoite (R$)</Label>
            <Input
              id="package_night"
              type="number"
              min="0"
              step="0.01"
              value={formData.packages?.package_night || ''}
              onChange={(e) => handlePackageChange('package_night', parseFloat(e.target.value) || null)}
              placeholder="800.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="package_custom">Outros pacotes ou promoções</Label>
          <Textarea
            id="package_custom"
            value={formData.packages?.custom || ''}
            onChange={(e) => handlePackageChange('custom', e.target.value)}
            placeholder="Ex: Pacote fim de semana, desconto para clientes frequentes..."
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4 text-purple-500" />
          <span>Formas de pagamento aceitas</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {paymentMethods.map(method => (
            <div key={method.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
              <Checkbox
                id={method.value}
                checked={formData.payment_methods?.includes(method.value) || false}
                onCheckedChange={(checked) => handlePaymentMethodChange(method.value, checked as boolean)}
              />
              <span className="text-lg">{method.icon}</span>
              <Label htmlFor={method.value} className="text-sm font-normal flex-1 cursor-pointer">
                {method.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-medium text-green-900 mb-2">Dicas de preços:</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Pesquise preços na sua região para se posicionar competitivamente</li>
          <li>• Seja clara sobre o que está incluso em cada valor</li>
          <li>• Ofereça pacotes para incentivar encontros mais longos</li>
          <li>• Mantenha flexibilidade para negociação quando apropriado</li>
        </ul>
      </div>
    </div>
  );
}
