
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Star, MessageCircle, MapPin, ArrowLeft, Heart, Share2 } from 'lucide-react';

// Mock data - will be replaced with Supabase
const mockAd = {
  id: '1',
  title: 'Manicure e Pedicure Profissional',
  description: 'Serviço de manicure e pedicure com mais de 10 anos de experiência. Atendimento domiciliar disponível. Trabalho com produtos de alta qualidade e sempre seguindo todas as normas de higiene e segurança.',
  price: 45.00,
  category: 'beleza',
  location: 'São Paulo, SP',
  images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  whatsapp: '11999999999',
  rating: 4.8,
  provider: 'Maria Silva',
  reviews: 127,
  availability: 'Segunda a Sábado, 8h às 18h',
  experience: '10 anos de experiência',
  services: ['Manicure', 'Pedicure', 'Esmaltação em gel', 'Nail art']
};

const AdDetails = () => {
  const { id } = useParams();

  const handleWhatsAppClick = () => {
    const message = `Olá! Tenho interesse no serviço: ${mockAd.title}`;
    const whatsappUrl = `https://wa.me/55${mockAd.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <img 
                    src={mockAd.images[0]} 
                    alt={mockAd.title}
                    className="w-full h-64 md:h-80 object-cover rounded-l-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {mockAd.images.slice(1).map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`${mockAd.title} ${index + 2}`}
                        className="w-full h-[calc(50%-4px)] object-cover rounded-tr-lg"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      Beleza
                    </Badge>
                    <CardTitle className="text-2xl mb-2">{mockAd.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{mockAd.rating} ({mockAd.reviews} avaliações)</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {mockAd.location}
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
                <p className="text-gray-700 mb-6">{mockAd.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Serviços Oferecidos</h4>
                    <ul className="space-y-1">
                      {mockAd.services.map((service, index) => (
                        <li key={index} className="text-gray-600">• {service}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Informações</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>📅 {mockAd.availability}</p>
                      <p>⭐ {mockAd.experience}</p>
                      <p>👤 Por {mockAd.provider}</p>
                    </div>
                  </div>
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
                    R$ {mockAd.price.toFixed(2)}
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
                  Entre em contato via WhatsApp para agendar
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
                    <span className="text-lg font-semibold">MS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{mockAd.provider}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {mockAd.rating} • {mockAd.reviews} avaliações
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
