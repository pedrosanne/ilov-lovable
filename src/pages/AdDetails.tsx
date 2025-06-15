
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Star, MessageCircle, MapPin, ArrowLeft, Heart, Share2, Eye } from 'lucide-react';
import { useAd } from '@/hooks/useAds';
import { useRecordView, useRecordClick } from '@/hooks/useAdActions';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

const AdDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ad, isLoading, error } = useAd(id!);
  const recordView = useRecordView();
  const recordClick = useRecordClick();

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
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
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Anúncio não encontrado
            </h1>
            <Button asChild>
              <Link to="/">Voltar ao início</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
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
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <img 
                  src={ad.image_url || '/placeholder.svg'} 
                  alt={ad.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {getCategoryLabel(ad.category)}
                    </Badge>
                    <CardTitle className="text-2xl mb-2">{ad.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{ad.views_count} visualizações</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {ad.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{ad.description}</p>
                
                <div className="space-y-2 text-gray-600">
                  <p>👤 Por {ad.profiles?.full_name || 'Anunciante'}</p>
                  {ad.profiles?.phone && (
                    <p>📞 {ad.profiles.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-3xl font-bold text-green-600">
                    R$ {Number(ad.price).toFixed(2)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Entrar em Contato
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  Entre em contato via WhatsApp para mais informações
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sobre o Prestador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    {ad.profiles?.avatar_url ? (
                      <img 
                        src={ad.profiles.avatar_url} 
                        alt={ad.profiles.full_name || 'Avatar'}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold">
                        {ad.profiles?.full_name?.charAt(0) || 'A'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{ad.profiles?.full_name || 'Anunciante'}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      Novo prestador
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Ver Perfil Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
