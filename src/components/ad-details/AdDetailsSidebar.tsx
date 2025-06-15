
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Shield, User, Star, CheckCircle } from 'lucide-react';
import type { Ad } from '@/types/database';

interface AdDetailsSidebarProps {
  ad: Ad;
  handleWhatsAppClick: () => void;
}

export function AdDetailsSidebar({ ad, handleWhatsAppClick }: AdDetailsSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Pricing and Contact Card */}
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="space-y-2">
            <span className="text-4xl font-bold text-primary">
              R$ {Number(ad.price).toFixed(2)}
            </span>
            <div className="text-sm text-gray-600">por serviço</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            size="lg"
            onClick={handleWhatsAppClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Entrar em Contato via WhatsApp
          </Button>
          
          <div className="text-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
            <Shield className="h-4 w-4 mx-auto mb-1 text-green-600" />
            Contato 100% seguro e discreto
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Provider Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <User className="h-5 w-5 mr-2" />
            Sobre o Prestador
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                {ad.profiles?.avatar_url ? (
                  <img 
                    src={ad.profiles.avatar_url} 
                    alt={ad.profiles.full_name || 'Avatar'}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-white">
                    {ad.profiles?.full_name?.charAt(0) || 'A'}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg">{ad.profiles?.presentation_name || ad.profiles?.full_name || 'Prestador'}</h4>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span>Prestador Verificado</span>
              </div>
              <div className="text-xs text-green-600 mt-1">● Online agora</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tempo de resposta:</span>
              <span className="font-medium">≈ 2 minutos</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxa de resposta:</span>
              <span className="font-medium">100%</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            Ver Perfil Completo
          </Button>
        </CardContent>
      </Card>

      {/* Safety and Trust Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-blue-900">Segurança e Confiança</h4>
          </div>
          <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Identidade verificada</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Fotos reais confirmadas</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Perfil moderado</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
