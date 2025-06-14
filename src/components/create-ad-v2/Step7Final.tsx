import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdFormDataV2 } from '@/types/adFormV2';

interface Step7FinalProps {
  formData: AdFormDataV2;
  updateFormData: (data: Partial<AdFormDataV2>) => void;
  completionPercentage: number;
}

export function Step7Final({ formData, updateFormData, completionPercentage }: Step7FinalProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ✨ Finalizando seu Anúncio
        </h2>
        <p className="text-lg text-gray-600">
          Últimos detalhes e confirmações para publicar seu anúncio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Progresso do Anúncio</span>
            <Badge variant="secondary">{completionPercentage}% completo</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais (Opcional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="restrictions">Restrições ou Observações</Label>
            <Textarea
              id="restrictions"
              placeholder="Ex: Não atendo fins de semana, apenas hotéis..."
              value={formData.restrictions}
              onChange={(e) => updateFormData({ restrictions: e.target.value })}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="favorite_fragrance">Perfume Favorito</Label>
              <Input
                id="favorite_fragrance"
                placeholder="Ex: Chanel Nº 5"
                value={formData.favorite_fragrance}
                onChange={(e) => updateFormData({ favorite_fragrance: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="favorite_drink">Bebida Favorita</Label>
              <Input
                id="favorite_drink"
                placeholder="Ex: Champagne, Whisky..."
                value={formData.favorite_drink}
                onChange={(e) => updateFormData({ favorite_drink: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-red-600">⚠️ Confirmações Obrigatórias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms_accepted"
              checked={formData.terms_accepted}
              onCheckedChange={(checked) => updateFormData({ terms_accepted: !!checked })}
            />
            <Label htmlFor="terms_accepted" className="text-sm">
              Aceito os <strong>termos de uso</strong> e <strong>política de privacidade</strong> da plataforma
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="age_confirmed"
              checked={formData.age_confirmed}
              onCheckedChange={(checked) => updateFormData({ age_confirmed: !!checked })}
            />
            <Label htmlFor="age_confirmed" className="text-sm">
              Confirmo que tenho <strong>18 anos ou mais</strong> e sou responsável pelas informações fornecidas
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="image_consent"
              checked={formData.image_consent}
              onCheckedChange={(checked) => updateFormData({ image_consent: !!checked })}
            />
            <Label htmlFor="image_consent" className="text-sm">
              Autorizo o uso das <strong>imagens e áudios</strong> fornecidos para divulgação do meu anúncio
            </Label>
          </div>
        </CardContent>
      </Card>

      {(formData.terms_accepted && formData.age_confirmed && formData.image_consent) && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Tudo pronto para publicar!
            </h3>
            <p className="text-green-600">
              Seu anúncio será revisado e aprovado em até 24 horas.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
