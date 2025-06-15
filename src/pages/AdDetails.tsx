import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Star, MessageCircle, MapPin, ArrowLeft, Heart, Share2, Eye, Shield, Clock, Phone, User, CheckCircle } from 'lucide-react';
import { useAd } from '@/hooks/useAds';
import { useRecordView, useRecordClick } from '@/hooks/useAdActions';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { ImageGallery } from '@/components/ad-details/ImageGallery';
import { ShareMenu } from '@/components/ad-details/ShareMenu';
import { AudioPlayer } from '@/components/ad-details/AudioPlayer';
import { RelatedAds } from '@/components/ad-details/RelatedAds';
import { cn } from '@/lib/utils';

const AdDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ad, isLoading, error } = useAd(id!);
  const recordView = useRecordView();
  const recordClick = useRecordClick();
  const { isFavorited, toggleFavorite, isToggling } = useFavorites();

  useEffect(() => {
    if (id) {
      recordView.mutate(id);
    }
  }, [id]);

  const handleWhatsAppClick = () => {
    if (ad) {
      recordClick.mutate(ad.id);
      const numbersOnly = ad.whatsapp.replace(/\D/g, '');
      const fullNumber = numbersOnly.startsWith('55') ? numbersOnly : `55${numbersOnly}`;
      const whatsappUrl = `whatsapp://send?phone=${fullNumber}&text=Ol%C3%A1%2C%20te%20encontrei%20no%20iLove%21`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleFavoriteClick = () => {
    if (ad) {
      toggleFavorite(ad.id);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Anúncio não encontrado
            </h1>
            <Button asChild>
              <Link to="/">Voltar ao início</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Preparar array de imagens (principal + adicionais se houver)
  const images = ad.image_url ? [ad.image_url] : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos resultados
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Image Gallery */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <ImageGallery images={images} title={ad.title} />
              </CardContent>
            </Card>

            {/* Audio Player */}
            {ad.profiles?.voice_audio_url && (
              <AudioPlayer 
                audioUrl={ad.profiles.voice_audio_url}
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

          {/* Enhanced Sidebar */}
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
                  className="w-full" 
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white"
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
        </div>

        {/* Related Ads Section */}
        <div className="mt-12">
          <RelatedAds 
            currentAdId={ad.id}
            category={ad.category}
            location={ad.location}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdDetails;
