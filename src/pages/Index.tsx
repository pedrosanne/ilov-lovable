
import { useState } from 'react';
import { Search, Filter, MapPin, Sliders } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Header } from '@/components/Header';
import { LocationSelector } from '@/components/LocationSelector';
import { AdvancedAdList } from '@/components/AdvancedAdList';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
  }>({});
  const [radiusKm, setRadiusKm] = useState(50);

  const handleSearch = () => {
    // Busca será executada automaticamente pelos hooks
    console.log('Searching with:', {
      searchTerm,
      selectedCategory,
      selectedLocation,
      radiusKm
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            iLove Marketplace
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Encontre os melhores prestadores de serviços da sua região
          </p>
          
          {/* Search Bar */}
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="text-gray-900">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beleza">Beleza</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="casa">Casa e Jardim</SelectItem>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="servicos_gerais">Serviços Gerais</SelectItem>
                  <SelectItem value="consultoria">Consultoria</SelectItem>
                  <SelectItem value="eventos">Eventos</SelectItem>
                  <SelectItem value="acompanhante">Acompanhante</SelectItem>
                </SelectContent>
              </Select>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="text-gray-900">
                    <MapPin className="h-4 w-4 mr-2" />
                    {selectedLocation.city ? `${selectedLocation.city}` : 'Localização'}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Escolher Localização</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <LocationSelector
                      selectedLocation={selectedLocation}
                      onLocationChange={setSelectedLocation}
                    />
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-2">
                        Raio de busca: {radiusKm}km
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        step="5"
                        value={radiusKm}
                        onChange={(e) => setRadiusKm(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>5km</span>
                        <span>100km</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSearch}>
                Buscar
              </Button>
            </div>
            
            {/* Quick filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory('beleza')}
                className="text-gray-600 hover:text-blue-600"
              >
                💄 Beleza
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory('saude')}
                className="text-gray-600 hover:text-blue-600"
              >
                🏥 Saúde
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory('tecnologia')}
                className="text-gray-600 hover:text-blue-600"
              >
                💻 Tecnologia
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory('casa')}
                className="text-gray-600 hover:text-blue-600"
              >
                🏠 Casa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AdvancedAdList 
            searchTerm={searchTerm}
            category={selectedCategory}
            location={selectedLocation}
            radiusKm={radiusKm}
          />
        </div>
      </section>
    </div>
  );
};

export default Index;
