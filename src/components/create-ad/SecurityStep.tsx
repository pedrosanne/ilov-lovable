
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, AlertTriangle, Check } from 'lucide-react';

interface SecurityStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function SecurityStep({ formData, updateFormData }: SecurityStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <Shield className="h-5 w-5 text-blue-500" />
        <span>Termos e Confirmações Obrigatórias</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-4 border rounded-lg">
          <Checkbox
            id="terms_accepted"
            checked={formData.terms_accepted || false}
            onCheckedChange={(checked) => updateFormData({ terms_accepted: checked })}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="terms_accepted" className="text-sm font-medium cursor-pointer">
              Aceito os termos de uso da plataforma *
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Li e concordo com todas as condições de uso, políticas de privacidade e 
              diretrizes da plataforma. Entendo minhas responsabilidades como anunciante.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 border rounded-lg bg-yellow-50">
          <Checkbox
            id="age_confirmed"
            checked={formData.age_confirmed || false}
            onCheckedChange={(checked) => updateFormData({ age_confirmed: checked })}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="age_confirmed" className="text-sm font-medium cursor-pointer flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span>Confirmação de maioridade *</span>
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Confirmo que sou maior de 18 anos e tenho capacidade legal para anunciar 
              meus serviços. Assumo total responsabilidade pelas informações fornecidas.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 border rounded-lg">
          <Checkbox
            id="image_consent"
            checked={formData.image_consent || false}
            onCheckedChange={(checked) => updateFormData({ image_consent: checked })}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="image_consent" className="text-sm font-medium cursor-pointer">
              Autorização de uso de imagem *
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Autorizo o uso das imagens e informações fornecidas para divulgação 
              na plataforma. Confirmo que possuo os direitos sobre todo o conteúdo enviado.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Check className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium text-blue-900">Compromisso com a Segurança</h3>
        </div>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Seus dados pessoais são protegidos e não serão compartilhados</li>
          <li>• A plataforma monitora anúncios para garantir a qualidade</li>
          <li>• Você pode editar ou remover seu anúncio a qualquer momento</li>
          <li>• Oferecemos suporte para resolver qualquer problema</li>
        </ul>
      </div>

      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h3 className="font-medium text-red-900">Importante</h3>
        </div>
        <p className="text-sm text-red-800">
          Todos os campos marcados com * são obrigatórios para publicar seu anúncio. 
          Informações falsas podem resultar na remoção do anúncio e suspensão da conta.
        </p>
      </div>
    </div>
  );
}
