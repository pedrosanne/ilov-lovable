
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ServicesStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function ServicesStep({ formData, updateFormData }: ServicesStepProps) {
  const categories = [
    { value: 'acompanhante', label: 'Acompanhante' },
    { value: 'beleza', label: 'Beleza' },
    { value: 'saude', label: 'Saúde' },
    { value: 'casa', label: 'Casa e Jardim' },
    { value: 'tecnologia', label: 'Tecnologia' },
    { value: 'educacao', label: 'Educação' },
    { value: 'servicos_gerais', label: 'Serviços Gerais' },
    { value: 'consultoria', label: 'Consultoria' },
    { value: 'eventos', label: 'Eventos' },
  ];

  const servicesOptions = [
    { value: 'acompanhamento-social', label: 'Acompanhamento social' },
    { value: 'acompanhamento-eventos', label: 'Acompanhamento para eventos' },
    { value: 'acompanhamento-viagens', label: 'Acompanhamento para viagens' },
    { value: 'acompanhamento-jantares', label: 'Acompanhamento para jantares' },
    { value: 'conversacao', label: 'Conversação e companhia' },
    { value: 'massagem-relaxante', label: 'Massagem relaxante' },
    { value: 'massagem-tantrica', label: 'Massagem tântrica' },
    { value: 'terapia-conversa', label: 'Terapia de conversa' },
  ];

  const audienceOptions = [
    { value: 'homens', label: 'Homens' },
    { value: 'mulheres', label: 'Mulheres' },
    { value: 'casais', label: 'Casais' },
  ];

  const locationOptions = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'domicilio', label: 'Domicílio' },
    { value: 'proprio-local', label: 'Próprio local' },
    { value: 'virtual', label: 'Virtual/Online' },
  ];

  const handleArrayUpdate = (field: string, value: string, checked: boolean) => {
    const currentArray = formData[field] || [];
    if (checked) {
      updateFormData({ [field]: [...currentArray, value] });
    } else {
      updateFormData({ [field]: currentArray.filter((item: string) => item !== value) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Categoria principal *</Label>
        <Select value={formData.category || ''} onValueChange={(value) => updateFormData({ category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Serviços oferecidos</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {servicesOptions.map(service => (
            <div key={service.value} className="flex items-center space-x-2">
              <Checkbox
                id={service.value}
                checked={formData.services_offered?.includes(service.value) || false}
                onCheckedChange={(checked) => handleArrayUpdate('services_offered', service.value, checked as boolean)}
              />
              <Label htmlFor={service.value} className="text-sm font-normal">
                {service.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Atendo</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {audienceOptions.map(audience => (
            <div key={audience.value} className="flex items-center space-x-2">
              <Checkbox
                id={audience.value}
                checked={formData.target_audience?.includes(audience.value) || false}
                onCheckedChange={(checked) => handleArrayUpdate('target_audience', audience.value, checked as boolean)}
              />
              <Label htmlFor={audience.value} className="text-sm font-normal">
                {audience.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Locais de atendimento</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {locationOptions.map(location => (
            <div key={location.value} className="flex items-center space-x-2">
              <Checkbox
                id={location.value}
                checked={formData.service_locations?.includes(location.value) || false}
                onCheckedChange={(checked) => handleArrayUpdate('service_locations', location.value, checked as boolean)}
              />
              <Label htmlFor={location.value} className="text-sm font-normal">
                {location.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
