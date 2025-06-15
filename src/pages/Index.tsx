
import { useState } from 'react';
import { Search, MapPin, Filter, Heart, Shield, BarChart3, Calculator, Video, Globe, Star, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/Layout';
import { AdList } from '@/components/AdList';
import { AdvancedAdList } from '@/components/AdvancedAdList';
import { LocationSelector } from '@/components/LocationSelector';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { AgeConfirmationModal } from '@/components/AgeConfirmationModal';
import { useAgeConfirmation } from '@/hooks/useAgeConfirmation';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState<{
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
  }>({});
  const [radiusKm, setRadiusKm] = useState([50]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const { user } = useAuth();
  const { showAgeConfirmation, confirmAge } = useAgeConfirmation();

  const handleLocationChange = (newLocation: typeof location) => {
    setLocation(newLocation);
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const categories = [
    { value: 'acompanhante', label: 'Acompanhantes' },
    { value: 'beleza', label: 'Beleza' },
    { value: 'saude', label: 'Saúde' },
    { value: 'casa', label: 'Casa' },
    { value: 'tecnologia', label: 'Tecnologia' },
    { value: 'educacao', label: 'Educação' },
    { value: 'servicos_gerais', label: 'Serviços Gerais' },
    { value: 'consultoria', label: 'Consultoria' },
    { value: 'eventos', label: 'Eventos' }
  ];

  return (
    <Layout>
      {/* Modal de confirmação de idade - só aparece para usuários não logados */}
      {!user && (
        <AgeConfirmationModal
          open={showAgeConfirmation}
          onConfirm={confirmAge}
        />
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            iLov
            <span className="block text-2xl font-normal mt-2 text-gray-300">
              O novo padrão do prazer com respeito
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Cadastre-se gratuitamente</h3>
                <p className="text-gray-300">Você é o centro da experiência</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">100% Seguro</h3>
                <p className="text-gray-300">Acordos que começam com respeito</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Diversidade</h3>
                <p className="text-gray-300">Para todo o Brasil</p>
              </div>
            </div>
          </div>
          
          {/* Search Section */}
          <Card className="max-w-4xl mx-auto bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="O que você procura?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-gray-900"
                  />
                </div>
                
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  onClick={toggleAdvancedSearch}
                  className="flex items-center text-gray-900"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showAdvancedSearch ? 'Busca Simples' : 'Busca Avançada'}
                </Button>
              </div>

              {showAdvancedSearch && (
                <div className="space-y-4 pt-4 border-t">
                  <LocationSelector
                    onLocationChange={handleLocationChange}
                    selectedLocation={location}
                  />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Raio de busca: {radiusKm[0]} km
                    </label>
                    <Slider
                      value={radiusKm}
                      onValueChange={setRadiusKm}
                      max={200}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trabalhe no seu ritmo, do seu jeito
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Na iLov, você anuncia com liberdade, autonomia e controle total. Seu perfil, suas regras.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Search className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Filtros Inteligentes</h3>
              <p className="text-gray-600">Encontre o perfil ideal com busca precisa</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Shield className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Segurança Total</h3>
              <p className="text-gray-600">100% dos perfis verificados</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <BarChart3 className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">iLov Insights</h3>
              <p className="text-gray-600">Dados reais sobre sua performance</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Calculator className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Calculadora de Ganhos</h3>
              <p className="text-gray-600">Simule seu potencial de faturamento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Profissionais em Destaque
            </h2>
            <p className="text-gray-600">
              Perfis verificados e avaliados pela comunidade
            </p>
          </div>
          
          {showAdvancedSearch ? (
            <AdvancedAdList
              searchTerm={searchTerm}
              category={category}
              location={location}
              radiusKm={radiusKm[0]}
            />
          ) : (
            <AdList
              searchTerm={searchTerm}
              category={category}
              location={location.city || location.state || ''}
            />
          )}
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Segurança em primeiro lugar
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Com tecnologia de ponta e equipe especializada, garantimos seu bem-estar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Documentos Verificados</h3>
              <p className="text-gray-300">100% dos perfis autenticados</p>
            </div>
            
            <div className="text-center">
              <Video className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reconhecimento Facial</h3>
              <p className="text-gray-300">Tecnologia anti-fraude contínua</p>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Análise Manual</h3>
              <p className="text-gray-300">Todas as fotos e vídeos verificados</p>
            </div>
            
            <div className="text-center">
              <Heart className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Privacidade Total</h3>
              <p className="text-gray-300">Proteção em todos os acessos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diversity Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Acompanhantes de todo o Brasil
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mulheres, homens, trans e não-binários com perfis únicos e experiências diversas.
              Porque desejo tem todas as formas, cores, vozes e estilos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <Globe className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Diversidade Total</h3>
              <p className="text-gray-600">Perfis únicos para todos os gostos e preferências</p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <Star className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Avaliações Reais</h3>
              <p className="text-gray-600">Mais de 100 mil avaliações de clientes verificados</p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <Users className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Comunidade Ativa</h3>
              <p className="text-gray-600">Milhares de profissionais conectados</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Profissional, segura, humana
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            O novo padrão em plataformas adultas no Brasil.
            Cadastre-se hoje. Trabalhe com autonomia. Viva sua liberdade com respeito.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
              <Link to="/signup">
                Cadastrar Gratuitamente
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              <Link to="/login">
                Fazer Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
