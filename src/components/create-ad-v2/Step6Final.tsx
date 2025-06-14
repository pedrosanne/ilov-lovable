
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Check, Star } from 'lucide-react';

interface Step6Props {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function Step6Final({ formData, updateFormData }: Step6Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <Star className="h-5 w-5 text-yellow-500" />
        <span>Finalizando seu anúncio</span>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          🎉 <strong>Quase lá!</strong> Só faltam alguns detalhes finais para publicar seu anúncio.
        </p>
      </div>

      {/* Extras opcionais */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Informações extras (opcionais)</Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="favorite_fragrance">Perfume favorito</Label>
            <Input
              id="favorite_fragrance"
              value={formData.favorite_fragrance || ''}
              onChange={(e) => updateFormData({ favorite_fragrance: e.target.value })}
              placeholder="Ex: Chanel Nº 5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="favorite_drink">Bebida favorita</Label>
            <Input
              id="favorite_drink"
              value={formData.favorite_drink || ''}
              onChange={(e) => updateFormData({ favorite_drink: e.target.value })}
              placeholder="Ex: Vinho tinto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_gifts">Presentes preferidos</Label>
            <Input
              id="preferred_gifts"
              value={formData.preferred_gifts || ''}
              onChange={(e) => updateFormData({ preferred_gifts: e.target.value })}
              placeholder="Ex: Flores, chocolates"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="favorite_music">Estilo musical favorito</Label>
            <Input
              id="favorite_music"
              value={formData.favorite_music || ''}
              onChange={(e) => updateFormData({ favorite_music: e.target.value })}
              placeholder="Ex: Jazz, MPB"
            />
          </div>
        </div>
      </div>

      {/* Termos e condições */}
      <Card className="border-2 border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-red-500" />
            <Label className="text-base font-medium text-red-900">
              Termos obrigatórios
            </Label>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="age_confirmed"
                checked={formData.age_confirmed || false}
                onCheckedChange={(checked) => updateFormData({ age_confirmed: checked })}
                className="mt-1"
              />
              <Label htmlFor="age_confirmed" className="text-sm leading-relaxed">
                Confirmo que tenho mais de 18 anos de idade e estou legalmente autorizado(a) 
                a oferecer os serviços descritos neste anúncio.
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="image_consent"
                checked={formData.image_consent || false}
                onCheckedChange={(checked) => updateFormData({ image_consent: checked })}
                className="mt-1"
              />
              <Label htmlFor="image_consent" className="text-sm leading-relaxed">
                Declaro que possuo todos os direitos sobre as imagens e vídeos enviados 
                e autorizo sua utilização na plataforma.
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms_accepted"
                checked={formData.terms_accepted || false}
                onCheckedChange={(checked) => updateFormData({ terms_accepted: checked })}
                className="mt-1"
              />
              <Label htmlFor="terms_accepted" className="text-sm leading-relaxed">
                Li e aceito os <span className="text-blue-600 underline cursor-pointer">
                Termos de Uso</span> e a <span className="text-blue-600 underline cursor-pointer">
                Política de Privacidade</span> da plataforma.
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2 mb-2">
          <Check className="h-5 w-5 text-green-600" />
          <span className="font-medium text-green-900">Próximos passos:</span>
        </div>
        <ul className="text-sm text-green-800 space-y-1 ml-7">
          <li>• Seu anúncio será analisado pela nossa equipe</li>
          <li>• A aprovação acontece em até 24 horas</li>
          <li>• Você receberá uma notificação quando for aprovado</li>
          <li>• Após aprovado, seu anúncio ficará ativo na plataforma</li>
        </ul>
      </div>
    </div>
  );
}
