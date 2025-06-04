
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, MapPin, Heart, Eye } from 'lucide-react';
import { Ad } from '@/types/database';
import { useRecordClick } from '@/hooks/useAds';
import { useVerificationModal } from '@/hooks/useVerificationModal';
import { VerificationModal } from '@/components/verification/VerificationModal';

interface AdCardProps {
  ad: Ad;
}

export function AdCard({ ad }: AdCardProps) {
  const recordClick = useRecordClick();
  const { showModal, closeModal, checkVerificationAndExecute, isVerified } = useVerificationModal();

  const handleWhatsAppClick = () => {
    checkVerificationAndExecute(() => {
      recordClick.mutate(ad.id);
      const message = `Olá! Tenho interesse no serviço: ${ad.title}`;
      const whatsappUrl = `https://wa.me/55${ad.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      beleza: 'Beleza',
      saude: 'Saúde',
      casa: 'Casa',
      tecnologia: 'Tecnologia',
      educacao: 'Educação',
      servicos_gerais: 'Serviços Gerais',
      consultoria: 'Consultoria',
      eventos: 'Eventos'
    };
    return categories[category as keyof typeof categories] || category;
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={ad.image_url || '/placeholder.svg'} 
            alt={ad.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <Badge className="absolute top-2 left-2" variant="secondary">
            {getCategoryLabel(ad.category)}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {ad.title}
            </h3>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{ad.views_count}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {ad.description}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            {ad.location}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                R$ {Number(ad.price).toFixed(2)}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              por {ad.profiles?.full_name || 'Anunciante'}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 space-y-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleWhatsAppClick}
              className="flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {isVerified ? 'WhatsApp' : 'WhatsApp 🔒'}
            </Button>
            <Button size="sm" asChild>
              <Link to={`/ad/${ad.id}`}>
                Ver Detalhes
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <VerificationModal
        open={showModal}
        onOpenChange={closeModal}
        actionType="contato via WhatsApp"
      />
    </>
  );
}
