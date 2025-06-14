
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Briefcase, MapPin, Clock } from 'lucide-react';

interface Step2Props {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step2Services({ formData, updateFormData }: Step2Props) {
  const categories = [
    { value: 'acompanhante', label: 'Acompanhante' },
    { value: 'beleza', label: 'Beleza e Estética' },
    { value: 'saude', label: 'Saúde e Bem-estar' },
    { value: 'casa', label: 'Casa e Jardim' },
    { value: 'tecnologia', label: 'Tecnologia' },
    { value: 'educacao', label: 'Educação' },
    { value: 'servicos_gerais', label: 'Serviços Gerais' },
    { value: 'consultoria', label: 'Consultoria' },
    { value: 'eventos', label: 'Eventos' }
  ];

  const services = [
    'Jantar romântico', 'Eventos sociais', 'Viagens', 'Massagem relaxante',
    'Companhia para cinema', 'Conversação', 'Dança', 'Acompanhamento médico',
    'Shopping', 'Reuniões de negócios', 'Festas', 'Teatro/Shows'
  ];

  const audiences = [
    'Executivos', 'Empresários', 'Profissionais liberais', 'Turistas',
    'Pessoas maduras', 'Jovens', 'Casais', 'Grupos'
  ];

  const locations = [
    'Hotel/Motel', 'Residência', 'Escritório', 'Restaurante',
    'Eventos', 'Viagens', 'Domicílio', 'Local público'
  ];

  const weekDays = [
    'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <Briefcase className="h-5 w-5 text-purple-500" />
        <span>Seus serviços</span>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          💼 <strong>Defina bem seus serviços</strong> para atrair o público certo!
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria principal *</Label>
        <Select value={formData.category || ''} onValueChange={(value) => updateFormData({ category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Serviços oferecidos</Label>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <Badge
              key={service}
              variant={formData.services_offered?.includes(service) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => {
                const current = formData.services_offered || [];
                const updated = current.includes(service)
                  ? current.filter((s: string) => s !== service)
                  : [...current, service];
                updateFormData({ services_offered: updated });
              }}
            >
              {service}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Público-alvo</Label>
        <div className="flex flex-wrap gap-2">
          {audiences.map((audience) => (
            <Badge
              key={audience}
              variant={formData.target_audience?.includes(audience) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => {
                const current = formData.target_audience || [];
                const updated = current.includes(audience)
                  ? current.filter((a: string) => a !== audience)
                  : [...current, audience];
                updateFormData({ target_audience: updated });
              }}
            >
              {audience}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Locais de atendimento</Label>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <Badge
              key={location}
              variant={formData.service_locations?.includes(location) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => {
                const current = formData.service_locations || [];
                const updated = current.includes(location)
                  ? current.filter((l: string) => l !== location)
                  : [...current, location];
                updateFormData({ service_locations: updated });
              }}
            >
              {location}
            </Badge>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-4 w-4 text-purple-500" />
          <Label className="text-base font-medium">Disponibilidade</Label>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Dias da semana</Label>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <Badge
                  key={day}
                  variant={formData.availability_days?.includes(day) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => {
                    const current = formData.availability_days || [];
                    const updated = current.includes(day)
                      ? current.filter((d: string) => d !== day)
                      : [...current, day];
                    updateFormData({ availability_days: updated });
                  }}
                >
                  {day}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="appointment_only"
              checked={formData.appointment_only || false}
              onCheckedChange={(checked) => updateFormData({ appointment_only: checked })}
            />
            <Label htmlFor="appointment_only" className="text-sm">
              Apenas com agendamento prévio
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="h-4 w-4 text-purple-500" />
          <Label className="text-base font-medium">Localização</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Cidade *</Label>
            <Input
              id="location"
              value={formData.location || ''}
              onChange={(e) => updateFormData({ location: e.target.value })}
              placeholder="Ex: São Paulo, SP"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              id="neighborhood"
              value={formData.neighborhood || ''}
              onChange={(e) => updateFormData({ neighborhood: e.target.value })}
              placeholder="Ex: Vila Madalena"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postal_code">CEP</Label>
            <Input
              id="postal_code"
              value={formData.postal_code || ''}
              onChange={(e) => updateFormData({ postal_code: e.target.value })}
              placeholder="00000-000"
            />
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <Checkbox
              id="accepts_travel"
              checked={formData.accepts_travel || false}
              onCheckedChange={(checked) => updateFormData({ accepts_travel: checked })}
            />
            <Label htmlFor="accepts_travel" className="text-sm">
              Aceito deslocamento/viagens
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
