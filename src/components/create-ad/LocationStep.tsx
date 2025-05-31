
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { MapPin, Navigation } from 'lucide-react';

interface LocationStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function LocationStep({ formData, updateFormData }: LocationStepProps) {
  const formatPostalCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    } else {
      return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    }
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPostalCode(e.target.value);
    updateFormData({ postal_code: formatted });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <MapPin className="h-5 w-5 text-blue-500" />
        <span>Localização</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location">Cidade *</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="Ex: São Paulo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            value={formData.neighborhood || ''}
            onChange={(e) => updateFormData({ neighborhood: e.target.value })}
            placeholder="Ex: Jardins"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postal_code">CEP (opcional)</Label>
        <Input
          id="postal_code"
          value={formData.postal_code || ''}
          onChange={handlePostalCodeChange}
          placeholder="00000-000"
          maxLength={9}
        />
        <p className="text-sm text-gray-500">
          O CEP ajuda clientes a encontrar você mais facilmente
        </p>
      </div>

      <div className="flex items-center space-x-3 p-4 border rounded-lg">
        <Switch
          id="accepts_travel"
          checked={formData.accepts_travel || false}
          onCheckedChange={(checked) => updateFormData({ accepts_travel: checked })}
        />
        <div className="flex-1">
          <Label htmlFor="accepts_travel" className="text-sm font-medium flex items-center space-x-2">
            <Navigation className="h-4 w-4" />
            <span>Aceito me deslocar para atender</span>
          </Label>
          <p className="text-sm text-gray-500">
            Se ativado, você poderá atender clientes em outras localidades
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-medium text-yellow-900 mb-2">Importante sobre localização:</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Nunca divulgue seu endereço completo publicamente</li>
          <li>• Forneça localização específica apenas após o contato inicial</li>
          <li>• Considere usar pontos de referência conhecidos</li>
          <li>• Mantenha sempre sua segurança em primeiro lugar</li>
        </ul>
      </div>
    </div>
  );
}
