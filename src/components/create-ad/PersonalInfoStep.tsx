
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface PersonalInfoStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function PersonalInfoStep({ formData, updateFormData }: PersonalInfoStepProps) {
  const genderOptions = [
    { value: 'feminino', label: 'Feminino' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'trans', label: 'Trans' },
    { value: 'nao-binario', label: 'Não-binário' },
  ];

  const ethnicityOptions = [
    { value: 'branca', label: 'Branca' },
    { value: 'preta', label: 'Preta' },
    { value: 'parda', label: 'Parda' },
    { value: 'amarela', label: 'Amarela' },
    { value: 'indigena', label: 'Indígena' },
    { value: 'outra', label: 'Outra' },
  ];

  const bodyTypeOptions = [
    { value: 'magra', label: 'Magra' },
    { value: 'atletica', label: 'Atlética' },
    { value: 'normal', label: 'Normal' },
    { value: 'curvilinea', label: 'Curvilínea' },
    { value: 'plus-size', label: 'Plus Size' },
  ];

  const languageOptions = [
    { value: 'portugues', label: 'Português' },
    { value: 'ingles', label: 'Inglês' },
    { value: 'espanhol', label: 'Espanhol' },
    { value: 'frances', label: 'Francês' },
    { value: 'italiano', label: 'Italiano' },
    { value: 'alemao', label: 'Alemão' },
  ];

  const handleLanguageChange = (language: string, checked: boolean) => {
    const currentLanguages = formData.languages || [];
    if (checked) {
      updateFormData({ languages: [...currentLanguages, language] });
    } else {
      updateFormData({ languages: currentLanguages.filter((l: string) => l !== language) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="presentation_name">Nome de apresentação ou apelido *</Label>
          <Input
            id="presentation_name"
            value={formData.presentation_name || ''}
            onChange={(e) => updateFormData({ presentation_name: e.target.value })}
            placeholder="Como você gostaria de ser chamada(o)?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Idade *</Label>
          <Input
            id="age"
            type="number"
            min="18"
            max="99"
            value={formData.age || ''}
            onChange={(e) => updateFormData({ age: parseInt(e.target.value) || null })}
            placeholder="Sua idade"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Gênero *</Label>
          <Select value={formData.gender || ''} onValueChange={(value) => updateFormData({ gender: value })}>
            <SelectTrigger>
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
          <Label>Etnia</Label>
          <Select value={formData.ethnicity || ''} onValueChange={(value) => updateFormData({ ethnicity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione sua etnia" />
            </SelectTrigger>
            <SelectContent>
              {ethnicityOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            id="height"
            type="number"
            min="140"
            max="220"
            value={formData.height || ''}
            onChange={(e) => updateFormData({ height: parseInt(e.target.value) || null })}
            placeholder="Ex: 165"
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
            placeholder="Ex: 60"
          />
        </div>

        <div className="space-y-2">
          <Label>Tipo físico</Label>
          <Select value={formData.body_type || ''} onValueChange={(value) => updateFormData({ body_type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {bodyTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Idiomas falados</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {languageOptions.map(language => (
            <div key={language.value} className="flex items-center space-x-2">
              <Checkbox
                id={language.value}
                checked={formData.languages?.includes(language.value) || false}
                onCheckedChange={(checked) => handleLanguageChange(language.value, checked as boolean)}
              />
              <Label htmlFor={language.value} className="text-sm font-normal">
                {language.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
