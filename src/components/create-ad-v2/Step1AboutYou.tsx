
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Step1AboutYouProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step1AboutYou({ formData, updateFormData }: Step1AboutYouProps) {
  const isMobile = useIsMobile();
  
  const genderOptions = [
    { value: 'feminino', label: 'Feminino' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'trans', label: 'Trans' },
    { value: 'nao-binario', label: 'Não-binário' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
            <User className={`text-white ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
          </div>
        </div>
        <h2 className={`font-bold text-gray-900 ${isMobile ? 'text-xl' : 'text-2xl'}`}>🎭 Quem é você?</h2>
        <p className={`text-gray-600 ${isMobile ? 'text-sm px-4' : ''}`}>Vamos começar com suas informações básicas e como você quer se apresentar</p>
      </div>

      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        <div className="space-y-2">
          <Label htmlFor="presentation_name" className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>Como você quer ser chamada(o)? *</span>
          </Label>
          <Input
            id="presentation_name"
            value={formData.presentation_name || ''}
            onChange={(e) => updateFormData({ presentation_name: e.target.value })}
            placeholder="Seu nome de apresentação ou apelido"
            className="border-purple-200 focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Sua idade *</Label>
          <Input
            id="age"
            type="number"
            min="18"
            max="99"
            value={formData.age || ''}
            onChange={(e) => updateFormData({ age: parseInt(e.target.value) || null })}
            placeholder="Ex: 25"
            className="border-purple-200 focus:border-purple-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Gênero *</Label>
        <Select value={formData.gender || ''} onValueChange={(value) => updateFormData({ gender: value })}>
          <SelectTrigger className="border-purple-200 focus:border-purple-500">
            <SelectValue placeholder="Selecione seu gênero" />
          </SelectTrigger>
          <SelectContent>
            {genderOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título do seu anúncio *</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => updateFormData({ title: e.target.value })}
          placeholder="Ex: Acompanhante elegante e discreta"
          maxLength={100}
          className="border-purple-200 focus:border-purple-500"
        />
        <p className="text-sm text-gray-500">
          {formData.title?.length || 0}/100 caracteres
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Conte sua história e se apresente *</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Fale sobre você, sua personalidade, seus hobbies e o que te faz especial..."
          rows={isMobile ? 4 : 6}
          maxLength={2000}
          className="border-purple-200 focus:border-purple-500"
        />
        <p className="text-sm text-gray-500">
          {formData.description?.length || 0}/2000 caracteres
        </p>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-medium text-purple-900 mb-2">💡 Dicas para se destacar:</h3>
        <ul className={`text-purple-800 space-y-1 ${isMobile ? 'text-sm' : 'text-sm'}`}>
          <li>• Seja autêntica(o) e mostre sua personalidade única</li>
          <li>• Mencione seus hobbies e interesses</li>
          <li>• Use um tom amigável e convidativo</li>
          <li>• Destaque o que te diferencia das outras pessoas</li>
        </ul>
      </div>
    </div>
  );
}
