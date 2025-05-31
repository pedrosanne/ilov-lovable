
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface DescriptionStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function DescriptionStep({ formData, updateFormData }: DescriptionStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título do anúncio *</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => updateFormData({ title: e.target.value })}
          placeholder="Ex: Acompanhante discreta e elegante"
          maxLength={100}
        />
        <p className="text-sm text-gray-500">
          {formData.title?.length || 0}/100 caracteres
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição detalhada *</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Descreva seus serviços, personalidade e diferenciais..."
          rows={6}
          maxLength={2000}
        />
        <p className="text-sm text-gray-500">
          {formData.description?.length || 0}/2000 caracteres
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="highlight_phrase">Frase de destaque ou slogan</Label>
        <Input
          id="highlight_phrase"
          value={formData.highlight_phrase || ''}
          onChange={(e) => updateFormData({ highlight_phrase: e.target.value })}
          placeholder="Ex: Sua melhor escolha para momentos especiais"
          maxLength={80}
        />
        <p className="text-sm text-gray-500">
          {formData.highlight_phrase?.length || 0}/80 caracteres
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Dicas para uma boa descrição:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Seja clara e objetiva sobre seus serviços</li>
          <li>• Destaque seus diferenciais e qualidades</li>
          <li>• Mantenha um tom profissional e respeitoso</li>
          <li>• Evite informações muito pessoais ou íntimas</li>
        </ul>
      </div>
    </div>
  );
}
