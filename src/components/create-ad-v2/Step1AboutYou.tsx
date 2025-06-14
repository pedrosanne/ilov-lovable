
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Heart } from 'lucide-react';

interface Step1Props {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step1AboutYou({ formData, updateFormData }: Step1Props) {
  const languages = ['Português', 'Inglês', 'Espanhol', 'Francês', 'Italiano', 'Alemão'];
  const bodyTypes = ['Magro', 'Atlético', 'Normal', 'Curvilíneo', 'Plus Size'];
  const ethnicities = ['Branco', 'Pardo', 'Negro', 'Asiático', 'Indígena', 'Outro'];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <User className="h-5 w-5 text-purple-500" />
        <span>Quem é você?</span>
        <Heart className="h-4 w-4 text-pink-500" />
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700 mb-2">
          ✨ <strong>Dica do sucesso:</strong> Seja autêntico e mostre sua personalidade única!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="presentation_name">Nome de apresentação *</Label>
          <Input
            id="presentation_name"
            value={formData.presentation_name || ''}
            onChange={(e) => updateFormData({ presentation_name: e.target.value })}
            placeholder="Como gostaria de ser chamado(a)?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Idade *</Label>
          <Input
            id="age"
            type="number"
            min="18"
            max="80"
            value={formData.age || ''}
            onChange={(e) => updateFormData({ age: parseInt(e.target.value) || null })}
            placeholder="Sua idade"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gênero</Label>
          <Select value={formData.gender || ''} onValueChange={(value) => updateFormData({ gender: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu gênero" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feminino">Feminino</SelectItem>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="transgenero">Transgênero</SelectItem>
              <SelectItem value="nao-binario">Não-binário</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ethnicity">Etnia</Label>
          <Select value={formData.ethnicity || ''} onValueChange={(value) => updateFormData({ ethnicity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione sua etnia" />
            </SelectTrigger>
            <SelectContent>
              {ethnicities.map((ethnicity) => (
                <SelectItem key={ethnicity} value={ethnicity.toLowerCase()}>
                  {ethnicity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            id="height"
            type="number"
            min="140"
            max="220"
            value={formData.height || ''}
            onChange={(e) => updateFormData({ height: parseInt(e.target.value) || null })}
            placeholder="Ex: 170"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input
            id="weight"
            type="number"
            min="40"
            max="200"
            value={formData.weight || ''}
            onChange={(e) => updateFormData({ weight: parseInt(e.target.value) || null })}
            placeholder="Ex: 65"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="body_type">Tipo físico</Label>
        <Select value={formData.body_type || ''} onValueChange={(value) => updateFormData({ body_type: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu tipo físico" />
          </SelectTrigger>
          <SelectContent>
            {bodyTypes.map((type) => (
              <SelectItem key={type} value={type.toLowerCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Idiomas que fala</Label>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <Badge
              key={language}
              variant={formData.languages?.includes(language) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => {
                const currentLangs = formData.languages || [];
                const newLangs = currentLangs.includes(language)
                  ? currentLangs.filter((l: string) => l !== language)
                  : [...currentLangs, language];
                updateFormData({ languages: newLangs });
              }}
            >
              {language}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título do seu anúncio *</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => updateFormData({ title: e.target.value })}
          placeholder="Ex: Acompanhante sofisticada e carinhosa"
          maxLength={100}
        />
        <p className="text-xs text-gray-500">
          {formData.title?.length || 0}/100 caracteres
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Conte sua história *</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Conte sobre você, sua personalidade, o que você oferece de especial..."
          className="min-h-[120px]"
          maxLength={1000}
        />
        <p className="text-xs text-gray-500">
          {formData.description?.length || 0}/1000 caracteres
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="highlight_phrase">Frase de destaque</Label>
        <Input
          id="highlight_phrase"
          value={formData.highlight_phrase || ''}
          onChange={(e) => updateFormData({ highlight_phrase: e.target.value })}
          placeholder="Uma frase que chame atenção"
          maxLength={50}
        />
      </div>
    </div>
  );
}
