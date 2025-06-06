import { useState } from 'react';
import { Search, MapPin, Filter, Heart } from 'lucide-react';
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

      <div className="bg-gradient-to-br from-red-50 to-pink-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Encontre o amor da sua vida
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A plataforma mais segura e confiável para encontros autênticos no Brasil
          </p>
          
          {/* Search Section */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="O que você procura?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
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
                  className="flex items-center"
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

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
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

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o iLove?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma oferece a experiência mais segura e autêntica para encontros online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verificação Real</h3>
              <p className="text-gray-600">
                Todos os perfis são verificados para garantir autenticidade
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Busca por Localização</h3>
              <p className="text-gray-600">
                Encontre pessoas próximas a você com precisão
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Filtros Avançados</h3>
              <p className="text-gray-600">
                Personalize sua busca com filtros detalhados
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
