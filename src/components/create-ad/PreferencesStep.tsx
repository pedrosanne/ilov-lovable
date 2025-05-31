
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Clock, Shield } from 'lucide-react';

interface PreferencesStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function PreferencesStep({ formData, updateFormData }: PreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <Settings className="h-5 w-5 text-gray-500" />
        <span>Preferências e Restrições</span>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <Switch
            id="accepts_last_minute"
            checked={formData.accepts_last_minute || false}
            onCheckedChange={(checked) => updateFormData({ accepts_last_minute: checked })}
          />
          <div className="flex-1">
            <Label htmlFor="accepts_last_minute" className="text-sm font-medium flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>Aceito encontros de última hora</span>
            </Label>
            <p className="text-sm text-gray-500">
              Se ativado, clientes poderão solicitar encontros no mesmo dia
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="restrictions" className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-red-500" />
            <span>Restrições e limites</span>
          </Label>
          <Textarea
            id="restrictions"
            value={formData.restrictions || ''}
            onChange={(e) => updateFormData({ restrictions: e.target.value })}
            placeholder="Descreva qualquer restrição ou limite que você tenha (ex: não atendo menores de idade, não aceito clientes sob efeito de álcool, etc.)"
            rows={4}
            maxLength={1000}
          />
          <p className="text-sm text-gray-500">
            {formData.restrictions?.length || 0}/1000 caracteres
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="personal_rules">Regras pessoais</Label>
          <Textarea
            id="personal_rules"
            value={formData.personal_rules || ''}
            onChange={(e) => updateFormData({ personal_rules: e.target.value })}
            placeholder="Suas regras pessoais e expectativas para os encontros (ex: higiene, pontualidade, respeito, etc.)"
            rows={4}
            maxLength={1000}
          />
          <p className="text-sm text-gray-500">
            {formData.personal_rules?.length || 0}/1000 caracteres
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Dicas para preferências:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Seja clara sobre seus limites desde o início</li>
          <li>• Defina regras que garantam sua segurança e conforto</li>
          <li>• Comunique suas expectativas de forma respeitosa</li>
          <li>• Mantenha sempre o direito de recusar qualquer solicitação</li>
        </ul>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-medium text-yellow-900 mb-2">Lembre-se:</h3>
        <p className="text-sm text-yellow-800">
          Suas preferências e restrições são importantes para estabelecer expectativas claras 
          e garantir que tanto você quanto seus clientes tenham uma experiência positiva e respeitosa.
        </p>
      </div>
    </div>
  );
}
