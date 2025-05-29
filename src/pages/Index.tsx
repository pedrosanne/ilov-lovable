
import { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdList } from '@/components/AdList';
import { Header } from '@/components/Header';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

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
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="text-gray-900">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Localização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sp">São Paulo</SelectItem>
                  <SelectItem value="rj">Rio de Janeiro</SelectItem>
                  <SelectItem value="mg">Minas Gerais</SelectItem>
                  <SelectItem value="pr">Paraná</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-blue-600 hover:bg-blue-700">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AdList 
            searchTerm={searchTerm}
            category={selectedCategory}
            location={selectedLocation}
          />
        </div>
      </section>
    </div>
  );
};

export default Index;
