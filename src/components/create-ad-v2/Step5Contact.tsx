
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Instagram, Mail, Send, Phone } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">📞 Como te encontrar</h2>
        <p className="text-gray-600">Seus contatos e preferências de atendimento</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp" className="flex items-center space-x-2">
          <MessageCircle className="h-4 w-4 text-green-500" />
          <span>WhatsApp * (principal meio de contato)</span>
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
          Este será o número principal para clientes entrarem em contato
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact_instagram" className="flex items-center space-x-2">
            <Instagram className="h-4 w-4 text-pink-500" />
            <span>Instagram</span>
          </Label>
          <Input
            id="contact_instagram"
            value={formData.contact_instagram || ''}
            onChange={(e) => updateFormData({ contact_instagram: e.target.value })}
            placeholder="@seuusuario"
            className="border-green-200 focus:border-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_telegram" className="flex items-center space-x-2">
            <Send className="h-4 w-4 text-blue-500" />
            <span>Telegram</span>
          </Label>
          <Input
            id="contact_telegram"
            value={formData.contact_telegram || ''}
            onChange={(e) => updateFormData({ contact_telegram: e.target.value })}
            placeholder="@seuusuario"
            className="border-green-200 focus:border-green-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_email" className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>E-mail</span>
        </Label>
        <Input
          id="contact_email"
          type="email"
          value={formData.contact_email || ''}
          onChange={(e) => updateFormData({ contact_email: e.target.value })}
          placeholder="seu@email.com"
          className="border-green-200 focus:border-green-500"
        />
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
          <li>• WhatsApp é essencial - é o meio preferido pelos clientes</li>
          <li>• Mais formas de contato = mais oportunidades</li>
          <li>• Responda rapidamente para não perder clientes</li>
          <li>• Seja clara sobre suas regras desde o primeiro contato</li>
        </ul>
      </div>
    </div>
  );
}
