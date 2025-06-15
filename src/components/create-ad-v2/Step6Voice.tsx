
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdFormDataV2 } from '@/types/adFormV2';
import { CheckCircle, Info } from 'lucide-react';

interface Step6VoiceProps {
  formData: AdFormDataV2;
  updateFormData: (data: Partial<AdFormDataV2>) => void;
}

export function Step6Voice({ formData, updateFormData }: Step6VoiceProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎤 Apresentação em Áudio
        </h2>
        <p className="text-lg text-gray-600">
          Seu áudio de apresentação será usado em todos os seus anúncios
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            Áudio de Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-2">
                  Áudio de apresentação configurado no perfil
                </h4>
                <p className="text-sm text-blue-700 mb-3">
                  O áudio que você gravou no seu perfil será automaticamente incluído em todos os seus anúncios. 
                  Isso permite que os clientes ouçam sua voz e conheçam melhor sua personalidade.
                </p>
                <p className="text-sm text-blue-600">
                  Para gravar ou alterar seu áudio de apresentação, acesse as configurações do seu perfil.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">✅ Benefícios do áudio no perfil:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Usado automaticamente em todos os seus anúncios</li>
              <li>• Clientes podem conhecer sua voz antes do contato</li>
              <li>• Aumenta a confiança e conexão com clientes</li>
              <li>• Você só precisa gravar uma vez</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
