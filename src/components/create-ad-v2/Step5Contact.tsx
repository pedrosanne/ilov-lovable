
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface Step5ContactProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step5Contact({ formData, updateFormData }: Step5ContactProps) {
  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    updateFormData({ whatsapp: formatted });
  };

  const getWhatsAppLink = () => {
    if (!formData.whatsapp) return '';
    const numbersOnly = formData.whatsapp.replace(/\D/g, '');
    const fullNumber = numbersOnly.startsWith('55') ? numbersOnly : `55${numbersOnly}`;
    return `whatsapp://send?phone=${fullNumber}&text=Ol%C3%A1%2C%20te%20encontrei%20no%20iLove%21`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">📞 Como te encontrar</h2>
        <p className="text-gray-600">Seu contato direto via WhatsApp</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4 text-green-500" />
            <span>WhatsApp *</span>
          </Label>
          <Input
            id="whatsapp"
            value={formData.whatsapp || ''}
            onChange={handleWhatsAppChange}
            placeholder="(11) 99999-9999"
            maxLength={15}
            className="border-green-200 focus:border-green-500"
          />
          <p className="text-sm text-gray-500">
            Este será o número para clientes entrarem em contato
          </p>
        </div>

        {formData.whatsapp && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <Label className="flex items-center space-x-2 mb-2">
              <ExternalLink className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-900">Preview do link:</span>
            </Label>
            <div className="bg-white p-3 rounded border text-sm text-gray-700 break-all">
              {getWhatsAppLink()}
            </div>
            <p className="text-xs text-green-700 mt-2">
              Este link será usado pelos clientes para te contactar diretamente
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="restrictions">Suas regras e restrições (opcional)</Label>
        <Textarea
          id="restrictions"
          value={formData.restrictions || ''}
          onChange={(e) => updateFormData({ restrictions: e.target.value })}
          placeholder="Ex: Não atendo menores de idade, higiene é fundamental, pontualidade..."
          rows={4}
          maxLength={500}
          className="border-green-200 focus:border-green-500"
        />
        <p className="text-sm text-gray-500">
          {formData.restrictions?.length || 0}/500 caracteres
        </p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-900 mb-2">💬 Dicas de contato:</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• WhatsApp é o único meio de contato - mantenha-o sempre atualizado</li>
          <li>• Responda rapidamente para não perder clientes</li>
          <li>• Seja clara sobre suas regras desde o primeiro contato</li>
          <li>• O link direto facilita o contato dos interessados</li>
        </ul>
      </div>
    </div>
  );
}
