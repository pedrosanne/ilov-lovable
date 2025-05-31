
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Coffee, Gift, Music } from 'lucide-react';

interface ExtrasStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function ExtrasStep({ formData, updateFormData }: ExtrasStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <Sparkles className="h-5 w-5 text-pink-500" />
        <span>Informações Extras (Opcional)</span>
      </div>

      <p className="text-gray-600">
        Essas informações pessoais ajudam clientes a conhecer melhor sua personalidade 
        e criar conexões mais genuínas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="favorite_fragrance" className="flex items-center space-x-2">
            <div className="text-lg">🌸</div>
            <span>Fragrância favorita</span>
          </Label>
          <Input
            id="favorite_fragrance"
            value={formData.favorite_fragrance || ''}
            onChange={(e) => updateFormData({ favorite_fragrance: e.target.value })}
            placeholder="Ex: Chanel No. 5, perfumes florais..."
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="favorite_drink" className="flex items-center space-x-2">
            <Coffee className="h-4 w-4 text-brown-500" />
            <span>Bebida favorita</span>
          </Label>
          <Input
            id="favorite_drink"
            value={formData.favorite_drink || ''}
            onChange={(e) => updateFormData({ favorite_drink: e.target.value })}
            placeholder="Ex: Champagne, vinho tinto, café expresso..."
            maxLength={100}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferred_gifts" className="flex items-center space-x-2">
          <Gift className="h-4 w-4 text-red-500" />
          <span>Presentes preferidos</span>
        </Label>
        <Textarea
          id="preferred_gifts"
          value={formData.preferred_gifts || ''}
          onChange={(e) => updateFormData({ preferred_gifts: e.target.value })}
          placeholder="Ex: Flores, chocolates, livros, joias, experiências..."
          rows={3}
          maxLength={500}
        />
        <p className="text-sm text-gray-500">
          {formData.preferred_gifts?.length || 0}/500 caracteres
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="favorite_music" className="flex items-center space-x-2">
          <Music className="h-4 w-4 text-purple-500" />
          <span>Estilo musical favorito</span>
        </Label>
        <Input
          id="favorite_music"
          value={formData.favorite_music || ''}
          onChange={(e) => updateFormData({ favorite_music: e.target.value })}
          placeholder="Ex: Jazz, Bossa Nova, MPB, música clássica..."
          maxLength={200}
        />
      </div>

      <div className="bg-pink-50 p-4 rounded-lg">
        <h3 className="font-medium text-pink-900 mb-2">Por que compartilhar essas informações?</h3>
        <ul className="text-sm text-pink-800 space-y-1">
          <li>• Ajuda clientes a escolher presentes ou preparar encontros especiais</li>
          <li>• Cria conexões mais pessoais e memoráveis</li>
          <li>• Mostra sua personalidade além dos serviços oferecidos</li>
          <li>• Pode resultar em experiências mais prazerosas para ambos</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Lembre-se:</strong> Todas essas informações são opcionais. 
          Compartilhe apenas o que se sentir confortável em divulgar.
        </p>
      </div>
    </div>
  );
}
