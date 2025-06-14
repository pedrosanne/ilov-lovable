
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageCircle, Instagram, Send, Mail, Phone } from 'lucide-react';

interface Step5Props {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step5Contact({ formData, updateFormData }: Step5Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <Phone className="h-5 w-5 text-green-500" />
        <span>Como te encontrar</span>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          📞 <strong>Facilite o contato</strong> - quanto mais opções, melhor!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4 text-green-500" />
            <span>WhatsApp *</span>
          </Label>
          <Input
            id="whatsapp"
            value={formData.whatsapp || ''}
            onChange={(e) => updateFormData({ whatsapp: e.target.value })}
            placeholder="(11) 99999-9999"
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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_instagram" className="flex items-center space-x-2">
            <Instagram className="h-4 w-4 text-pink-500" />
            <span>Instagram</span>
          </Label>
          <Input
            id="contact_instagram"
            value={formData.contact_instagram || ''}
            onChange={(e) => updateFormData({ contact_instagram: e.target.value })}
            placeholder="@seuinstagram"
          />
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
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_other">Outros contatos</Label>
        <Input
          id="contact_other"
          value={formData.contact_other || ''}
          onChange={(e) => updateFormData({ contact_other: e.target.value })}
          placeholder="Outros meios de contato"
        />
      </div>

      <div className="border-t pt-6">
        <Label className="text-base font-medium mb-4 block">Preferências de atendimento</Label>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="accepts_last_minute"
              checked={formData.accepts_last_minute || false}
              onCheckedChange={(checked) => updateFormData({ accepts_last_minute: checked })}
            />
            <Label htmlFor="accepts_last_minute" className="text-sm">
              Aceito atendimentos de última hora
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="restrictions">Restrições ou limitações</Label>
            <Textarea
              id="restrictions"
              value={formData.restrictions || ''}
              onChange={(e) => updateFormData({ restrictions: e.target.value })}
              placeholder="Descreva qualquer restrição ou limitação importante..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personal_rules">Suas regras pessoais</Label>
            <Textarea
              id="personal_rules"
              value={formData.personal_rules || ''}
              onChange={(e) => updateFormData({ personal_rules: e.target.value })}
              placeholder="Suas regras e condições para o atendimento..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
