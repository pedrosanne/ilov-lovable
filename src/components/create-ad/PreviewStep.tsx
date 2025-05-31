
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  User, 
  Heart,
  Star,
  Shield
} from 'lucide-react';

interface PreviewStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function PreviewStep({ formData }: PreviewStepProps) {
  const getCategoryLabel = (category: string) => {
    const categories = {
      acompanhante: 'Acompanhante',
      beleza: 'Beleza',
      saude: 'Saúde',
      casa: 'Casa e Jardim',
      tecnologia: 'Tecnologia',
      educacao: 'Educação',
      servicos_gerais: 'Serviços Gerais',
      consultoria: 'Consultoria',
      eventos: 'Eventos'
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getHighlightStyle = () => {
    switch (formData.highlight_package) {
      case 'premium':
        return 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100';
      case 'vip':
        return 'border-red-400 bg-gradient-to-r from-red-50 to-pink-100';
      default:
        return 'border-gray-200';
    }
  };

  const getHighlightBadge = () => {
    switch (formData.highlight_package) {
      case 'premium':
        return <Badge className="bg-yellow-500 text-white">PREMIUM</Badge>;
      case 'vip':
        return <Badge className="bg-red-500 text-white">VIP</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pré-visualização do seu anúncio
        </h2>
        <p className="text-gray-600">
          Veja como seu anúncio aparecerá para os clientes
        </p>
      </div>

      {/* Preview Card */}
      <Card className={`hover:shadow-lg transition-shadow duration-300 ${getHighlightStyle()}`}>
        <div className="relative">
          <img 
            src={formData.image_url || '/placeholder.svg'} 
            alt={formData.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <div className="absolute top-2 left-2 flex space-x-2">
            <Badge variant="secondary">
              {getCategoryLabel(formData.category)}
            </Badge>
            {getHighlightBadge()}
          </div>
          {formData.highlight_phrase && (
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                {formData.highlight_phrase}
              </div>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {formData.title}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">Novo</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {formData.description}
          </p>

          {formData.presentation_name && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <User className="h-4 w-4 mr-1" />
              {formData.presentation_name}
              {formData.age && `, ${formData.age} anos`}
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            {formData.neighborhood ? `${formData.neighborhood}, ${formData.location}` : formData.location}
          </div>

          {formData.availability_days && formData.availability_days.length > 0 && (
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Clock className="h-4 w-4 mr-1" />
              Disponível: {formData.availability_days.join(', ')}
            </div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                R$ {Number(formData.price || 0).toFixed(2)}
              </span>
              {formData.hourly_rate && (
                <span className="text-sm text-gray-600 ml-2">
                  (R$ {Number(formData.hourly_rate).toFixed(2)}/hora)
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Verificado</span>
            </div>
          </div>

          {/* Services and Target Audience */}
          {formData.services_offered && formData.services_offered.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {formData.services_offered.slice(0, 3).map((service: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service.replace('-', ' ')}
                  </Badge>
                ))}
                {formData.services_offered.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{formData.services_offered.length - 3} mais
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
        
        <div className="p-4 pt-0 space-y-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              WhatsApp
            </Button>
            <Button size="sm">
              Ver Detalhes
            </Button>
          </div>
        </div>
      </Card>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-medium text-green-900 mb-2">Seu anúncio está pronto!</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Após a publicação, seu anúncio será enviado para análise</li>
          <li>• A aprovação geralmente leva até 24 horas</li>
          <li>• Você receberá uma notificação quando for aprovado</li>
          <li>• Você pode editar seu anúncio a qualquer momento no dashboard</li>
        </ul>
      </div>
    </div>
  );
}
