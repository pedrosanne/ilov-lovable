
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Step2ServicesProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step2Services({ formData, updateFormData }: Step2ServicesProps) {
  const isMobile = useIsMobile();
  
  const serviceOptions = [
    'Acompanhamento para eventos',
    'Jantar romântico',
    'Companhia para viagens',
    'Massagem relaxante',
    'Acompanhamento executivo',
    'Conversa e companhia',
    'Shows e teatros',
    'Festas e eventos sociais'
  ];

  const daysOfWeek = [
    { value: 'segunda', label: 'Segunda' },
    { value: 'terca', label: 'Terça' },
    { value: 'quarta', label: 'Quarta' },
    { value: 'quinta', label: 'Quinta' },
    { value: 'sexta', label: 'Sexta' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' },
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    const currentServices = formData.services_offered || [];
    if (checked) {
      updateFormData({ services_offered: [...currentServices, service] });
    } else {
      updateFormData({ services_offered: currentServices.filter((s: string) => s !== service) });
    }
  };

  const handleDayChange = (day: string, checked: boolean) => {
    const currentDays = formData.availability_days || [];
    if (checked) {
      updateFormData({ availability_days: [...currentDays, day] });
    } else {
      updateFormData({ availability_days: currentDays.filter((d: string) => d !== day) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
            <Briefcase className={`text-white ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
          </div>
        </div>
        <h2 className={`font-bold text-gray-900 ${isMobile ? 'text-xl' : 'text-2xl'}`}>💼 Seus serviços</h2>
        <p className={`text-gray-600 ${isMobile ? 'text-sm px-4' : ''}`}>O que você oferece e quando está disponível</p>
      </div>

      <div className="space-y-2">
        <Label>Categoria do anúncio</Label>
        <Select value={formData.category || 'acompanhante'} onValueChange={(value) => updateFormData({ category: value })}>
          <SelectTrigger className="border-blue-200 focus:border-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="acompanhante">Acompanhante</SelectItem>
            <SelectItem value="massagista">Massagista</SelectItem>
            <SelectItem value="modelo">Modelo</SelectItem>
            <SelectItem value="dançarina">Dançarina</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4 text-blue-500" />
          <span>Serviços oferecidos *</span>
        </Label>
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {serviceOptions.map(service => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service}
                checked={formData.services_offered?.includes(service) || false}
                onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
              />
              <Label htmlFor={service} className={`font-normal ${isMobile ? 'text-sm' : 'text-sm'}`}>
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span>Dias disponíveis</span>
        </Label>
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
          {daysOfWeek.map(day => (
            <div key={day.value} className="flex items-center space-x-2">
              <Checkbox
                id={day.value}
                checked={formData.availability_days?.includes(day.value) || false}
                onCheckedChange={(checked) => handleDayChange(day.value, checked as boolean)}
              />
              <Label htmlFor={day.value} className={`font-normal ${isMobile ? 'text-sm' : 'text-sm'}`}>
                {day.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span>Cidade *</span>
          </Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="Ex: São Paulo"
            className="border-blue-200 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro/Região</Label>
          <Input
            id="neighborhood"
            value={formData.neighborhood || ''}
            onChange={(e) => updateFormData({ neighborhood: e.target.value })}
            placeholder="Ex: Jardins, Centro..."
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">🎯 Dicas para atrair mais clientes:</h3>
        <ul className={`text-blue-800 space-y-1 ${isMobile ? 'text-sm' : 'text-sm'}`}>
          <li>• Selecione todos os serviços que você oferece</li>
          <li>• Seja flexível com os dias disponíveis</li>
          <li>• Uma localização central atrai mais clientes</li>
          <li>• Considere ser específica sobre sua região</li>
        </ul>
      </div>
    </div>
  );
}
