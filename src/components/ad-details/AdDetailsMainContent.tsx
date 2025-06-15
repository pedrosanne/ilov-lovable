
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MapPin, Clock, Heart, User, Phone, CheckCircle } from 'lucide-react';
import { ImageGallery } from './ImageGallery';
import { ShareMenu } from './ShareMenu';
import { AudioPlayer } from './AudioPlayer';
import { cn } from '@/lib/utils';
import type { Ad } from '@/types/database';

interface AdDetailsMainContentProps {
  ad: Ad;
  isFavorited: (adId: string) => boolean;
  handleFavoriteClick: () => void;
  isToggling: boolean;
  getCategoryLabel: (category: string) => string;
}

export function AdDetailsMainContent({ 
  ad, 
  isFavorited, 
  handleFavoriteClick, 
  isToggling,
  getCategoryLabel 
}: AdDetailsMainContentProps) {
  // Preparar array de imagens (principal + adicionais se houver)
  const images = ad.image_url ? [ad.image_url] : [];

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Enhanced Image Gallery */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <ImageGallery images={images} title={ad.title} />
        </CardContent>
      </Card>

      {/* Audio Player - using voice_audio_url from ads table, not profiles */}
      {ad.voice_audio_url && (
        <AudioPlayer 
          audioUrl={ad.voice_audio_url}
          title={ad.title}
          providerName={ad.profiles?.presentation_name || ad.profiles?.full_name || 'Prestador'}
        />
      )}

      {/* Enhanced Service Details */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="secondary" className="text-sm">
                  {getCategoryLabel(ad.category)}
                </Badge>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verificado
                </Badge>
              </div>
              
              <CardTitle className="text-3xl mb-3 text-gray-900">{ad.title}</CardTitle>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{ad.views_count} visualizações</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {ad.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-green-600">Disponível agora</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFavoriteClick}
                disabled={isToggling}
                className={cn(
                  "transition-colors",
                  isFavorited(ad.id) && "text-red-500 border-red-300 bg-red-50"
                )}
              >
                <Heart className={`h-4 w-4 ${isFavorited(ad.id) ? 'fill-current' : ''}`} />
              </Button>
              <ShareMenu 
                title={ad.title}
                description={ad.description}
                imageUrl={ad.image_url}
                adId={ad.id}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 text-lg leading-relaxed">{ad.description}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">Informações do Prestador</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>{ad.profiles?.presentation_name || ad.profiles?.full_name || 'Prestador'}</span>
              </div>
              {ad.profiles?.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{ad.profiles.phone}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
