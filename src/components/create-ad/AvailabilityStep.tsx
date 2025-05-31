
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Calendar, Clock } from 'lucide-react';

interface AvailabilityStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function AvailabilityStep({ formData, updateFormData }: AvailabilityStepProps) {
  const daysOfWeek = [
    { value: 'segunda', label: 'Segunda-feira' },
    { value: 'terca', label: 'Terça-feira' },
    { value: 'quarta', label: 'Quarta-feira' },
    { value: 'quinta', label: 'Quinta-feira' },
    { value: 'sexta', label: 'Sexta-feira' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' },
  ];

  const handleDayChange = (day: string, checked: boolean) => {
    const currentDays = formData.availability_days || [];
    if (checked) {
      updateFormData({ availability_days: [...currentDays, day] });
    } else {
      updateFormData({ availability_days: currentDays.filter((d: string) => d !== day) });
    }
  };

  const handleHourChange = (day: string, field: 'start' | 'end', value: string) => {
    const currentHours = formData.availability_hours || {};
    updateFormData({
      availability_hours: {
        ...currentHours,
        [day]: {
          ...currentHours[day],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <Calendar className="h-5 w-5 text-blue-500" />
        <span>Disponibilidade</span>
      </div>

      <div className="space-y-4">
        <Label>Dias da semana disponíveis</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {daysOfWeek.map(day => (
            <div key={day.value} className="flex items-center space-x-2">
              <Checkbox
                id={day.value}
                checked={formData.availability_days?.includes(day.value) || false}
                onCheckedChange={(checked) => handleDayChange(day.value, checked as boolean)}
              />
              <Label htmlFor={day.value} className="text-sm font-normal">
                {day.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span>Horários de atendimento</span>
        </Label>
        
        {formData.availability_days?.map((day: string) => (
          <div key={day} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
            <div className="flex items-center">
              <Label className="text-sm font-medium capitalize">{day.replace('_', '-')}</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${day}-start`} className="text-xs text-gray-500">Início</Label>
              <Input
                id={`${day}-start`}
                type="time"
                value={formData.availability_hours?.[day]?.start || ''}
                onChange={(e) => handleHourChange(day, 'start', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${day}-end`} className="text-xs text-gray-500">Fim</Label>
              <Input
                id={`${day}-end`}
                type="time"
                value={formData.availability_hours?.[day]?.end || ''}
                onChange={(e) => handleHourChange(day, 'end', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-3 p-4 border rounded-lg">
        <Switch
          id="appointment_only"
          checked={formData.appointment_only || false}
          onCheckedChange={(checked) => updateFormData({ appointment_only: checked })}
        />
        <div className="flex-1">
          <Label htmlFor="appointment_only" className="text-sm font-medium">
            Atendimento apenas com agendamento prévio
          </Label>
          <p className="text-sm text-gray-500">
            Se ativado, clientes precisarão agendar antes de entrar em contato
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Dicas de disponibilidade:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Seja clara sobre seus horários para evitar mal-entendidos</li>
          <li>• Mantenha sua agenda sempre atualizada</li>
          <li>• Considere oferecer alguns horários flexíveis</li>
          <li>• Responda rapidamente para confirmar disponibilidade</li>
        </ul>
      </div>
    </div>
  );
}
