
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Gift, Heart } from 'lucide-react';

interface Step6FinalProps {
  formData: any;
  updateFormData: (updates: any) => void;
  completionPercentage: number;
}

export function Step6Final({ formData, updateFormData, completionPercentage }: Step6FinalProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">✨ Finalizando</h2>
        <p className="text-gray-600">Últimos detalhes e confirmações importantes</p>
      </div>

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Progresso do seu anúncio</span>
            <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
              {completionPercentage}% completo
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          {completionPercentage === 100 && (
            <p className="text-green-600 text-sm mt-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Perfeito! Seu anúncio está completo
            </p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2 text-lg">
          <Shield className="h-5 w-5 text-blue-500" />
          <span>Confirmações obrigatórias</span>
        </Label>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 border rounded-lg">
            <Checkbox
              id="age_confirmed"
              checked={formData.age_confirmed || false}
              onCheckedChange={(checked) => updateFormData({ age_confirmed: checked })}
            />
            <div className="flex-1">
              <Label htmlFor="age_confirmed" className="font-medium">
                Confirmo que tenho 18 anos ou mais *
              </Label>
              <p className="text-sm text-gray-500">
                É obrigatório ser maior de idade para publicar anúncios
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-lg">
            <Checkbox
              id="image_consent"
              checked={formData.image_consent || false}
              onCheckedChange={(checked) => updateFormData({ image_consent: checked })}
            />
            <div className="flex-1">
              <Label htmlFor="image_consent" className="font-medium">
                Tenho direitos sobre todas as imagens *
              </Label>
              <p className="text-sm text-gray-500">
                Confirmo que posso usar todas as fotos e vídeos enviados
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-lg">
            <Checkbox
              id="terms_accepted"
              checked={formData.terms_accepted || false}
              onCheckedChange={(checked) => updateFormData({ terms_accepted: checked })}
            />
            <div className="flex-1">
              <Label htmlFor="terms_accepted" className="font-medium">
                Aceito os termos de uso da plataforma *
              </Label>
              <p className="text-sm text-gray-500">
                Li e concordo com as regras e políticas da plataforma
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center space-x-2 text-lg">
          <Gift className="h-5 w-5 text-pink-500" />
          <span>Toque pessoal (opcional)</span>
        </Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="favorite_fragrance" className="flex items-center space-x-2">
              <span>🌸</span>
              <span>Fragrância favorita</span>
            </Label>
            <Input
              id="favorite_fragrance"
              value={formData.favorite_fragrance || ''}
              onChange={(e) => updateFormData({ favorite_fragrance: e.target.value })}
              placeholder="Ex: Chanel No. 5, perfumes florais..."
              className="border-purple-200 focus:border-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="favorite_drink" className="flex items-center space-x-2">
              <span>🥂</span>
              <span>Bebida favorita</span>
            </Label>
            <Input
              id="favorite_drink"
              value={formData.favorite_drink || ''}
              onChange={(e) => updateFormData({ favorite_drink: e.target.value })}
              placeholder="Ex: Champagne, vinho tinto..."
              className="border-purple-200 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-center space-x-2 mb-3">
          <Heart className="h-5 w-5 text-purple-500" />
          <h3 className="font-medium text-purple-900">Parabéns! Você está quase lá</h3>
        </div>
        <p className="text-purple-800 text-sm mb-4">
          Seu anúncio será revisado pela nossa equipe antes de ser publicado. 
          Isso garante a qualidade e segurança da nossa plataforma.
        </p>
        <div className="text-xs text-purple-700">
          <p>• Revisão geralmente leva até 24 horas</p>
          <p>• Você receberá uma notificação quando for aprovado</p>
          <p>• Pode editar seu anúncio a qualquer momento</p>
        </div>
      </div>
    </div>
  );
}
