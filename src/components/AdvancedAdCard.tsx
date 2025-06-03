
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Eye, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useRecordView, useRecordClick } from '@/hooks/useAds';
import { IdentityVerificationVideo } from './IdentityVerificationVideo';

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  city?: string;
  state?: string;
  image_url: string;
  whatsapp: string;
  user_id: string;
  views_count: number;
  distance_km?: number;
  created_at: string;
  identity_verification_video_url?: string;
  identity_verification_status?: string;
}

interface AdvancedAdCardProps {
  ad: Ad;
}

export function AdvancedAdCard({ ad }: AdvancedAdCardProps) {
  const recordView = useRecordView();
  const recordClick = useRecordClick();

  const handleCardClick = () => {
    recordView.mutate(ad.id);
    window.location.href = `/ad/${ad.id}`;
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordClick.mutate(ad.id);
    window.open(`https://wa.me/${ad.whatsapp}`, '_blank');
  };

  const getVerificationIcon = () => {
    switch (ad.identity_verification_status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getVerificationBadge = () => {
    switch (ad.identity_verification_status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Verificado
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Não Verificado
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Verificação Pendente
          </Badge>
        );
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleCardClick}>
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={ad.image_url || '/placeholder.svg'}
            alt={ad.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{ad.category}</Badge>
          </div>
          <div className="absolute top-2 right-2">
            {getVerificationBadge()}
          </div>
          {ad.distance_km && ad.distance_km > 0 && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-black/70 text-white">
                {ad.distance_km} km
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-2">{ad.title}</CardTitle>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {ad.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-green-600">
            R$ {ad.price.toLocaleString('pt-BR')}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Eye className="h-4 w-4 mr-1" />
            {ad.views_count}
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {ad.city && ad.state ? `${ad.city}, ${ad.state}` : ad.location}
        </div>

        {/* Seção de verificação de identidade */}
        {ad.identity_verification_video_url && (
          <div className="mb-4">
            <IdentityVerificationVideo
              videoUrl={ad.identity_verification_video_url}
              status={ad.identity_verification_status}
              showTitle={false}
            />
          </div>
        )}
        
        <Button 
          className="w-full"
          onClick={handleWhatsAppClick}
        >
          <Phone className="h-4 w-4 mr-2" />
          Entrar em Contato
        </Button>
      </CardContent>
    </Card>
  );
}
