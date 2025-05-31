
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Instagram, Mail, Phone } from 'lucide-react';

interface ContactStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function ContactStep({ formData, updateFormData }: ContactStepProps) {
  const formatWhatsApp = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a formatação (XX) XXXXX-XXXX
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
        />
        <p className="text-sm text-gray-500">
          Este será o número principal para clientes entrarem em contato
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact_telegram" className="flex items-center space-x-2">
            <Send className="h-4 w-4 text-blue-500" />
            <span>Telegram (opcional)</span>
          </Label>
          <Input
            id="contact_telegram"
            value={formData.contact_telegram || ''}
            onChange={(e) => updateFormData({ contact_telegram: e.target.value })}
            placeholder="@seuusuario"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_instagram" className="flex items-center space-x-2">
            <Instagram className="h-4 w-4 text-pink-500" />
            <span>Instagram (opcional)</span>
          </Label>
          <Input
            id="contact_instagram"
            value={formData.contact_instagram || ''}
            onChange={(e) => updateFormData({ contact_instagram: e.target.value })}
            placeholder="@seuusuario"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_email" className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>E-mail (opcional)</span>
        </Label>
        <Input
          id="contact_email"
          type="email"
          value={formData.contact_email || ''}
          onChange={(e) => updateFormData({ contact_email: e.target.value })}
          placeholder="seu@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_other" className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-gray-500" />
          <span>Outro meio de contato (opcional)</span>
        </Label>
        <Input
          id="contact_other"
          value={formData.contact_other || ''}
          onChange={(e) => updateFormData({ contact_other: e.target.value })}
          placeholder="Ex: Telefone fixo, Skype, etc."
        />
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-medium text-green-900 mb-2">Dicas de contato:</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• O WhatsApp é obrigatório pois é o meio preferido pelos clientes</li>
          <li>• Adicione outros meios de contato para dar mais opções</li>
          <li>• Mantenha seus contatos sempre atualizados</li>
          <li>• Responda rapidamente para ter mais chances de fechar negócios</li>
        </ul>
      </div>
    </div>
  );
}
