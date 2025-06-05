
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { AdList } from '@/components/AdList';
import { LocationSelector } from '@/components/LocationSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, MapPin, Users, Shield, Star, Zap, Camera, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; city: string; state: string } | null>(null);

  const categories = [
    { value: 'woman_seeking_man', label: '👩 Mulher procura Homem' },
    { value: 'man_seeking_woman', label: '👨 Homem procura Mulher' },
    { value: 'woman_seeking_woman', label: '👩‍❤️‍👩 Mulher procura Mulher' },
    { value: 'man_seeking_man', label: '👨‍❤️‍👨 Homem procura Homem' },
    { value: 'other', label: '🌈 Outros' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verificação de Identidade',
      description: 'Todos os perfis passam por verificação rigorosa para garantir autenticidade e segurança.',
      color: 'text-green-500'
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: 'Milhares de pessoas conectadas diariamente em busca de relacionamentos verdadeiros.',
      color: 'text-blue-500'
    },
    {
      icon: Star,
      title: 'Avaliações Reais',
      description: 'Sistema de avaliações verificadas para maior transparência entre os usuários.',
      color: 'text-yellow-500'
    },
    {
      icon: Zap,
      title: 'Conexões Instantâneas',
      description: 'Chat em tempo real, stories e sistema de matching inteligente.',
      color: 'text-purple-500'
    }
  ];

  const steps = [
    {
      number: '01',
      icon: Camera,
      title: 'Crie seu Perfil',
      description: 'Adicione fotos, informações pessoais e verifique sua identidade.'
    },
    {
      number: '02',
      icon: Search,
      title: 'Encontre Pessoas',
      description: 'Use nossos filtros avançados para encontrar pessoas compatíveis.'
    },
    {
      number: '03',
      icon: MessageCircle,
      title: 'Converse e Conecte',
      description: 'Inicie conversas, troque mensagens e marque encontros.'
    },
    {
      number: '04',
      icon: Heart,
      title: 'Encontre o Amor',
      description: 'Construa relacionamentos duradouros e significativos.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-red-500 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Encontre o <span className="text-red-500">Amor Verdadeiro</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A plataforma mais segura do Brasil para relacionamentos autênticos. 
              Conecte-se com pessoas reais, verificadas e compatíveis com você.
            </p>
            
            {/* Search Section */}
            <Card className="max-w-4xl mx-auto mb-8 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-1">
                    <LocationSelector
                      onLocationSelect={setSelectedLocation}
                      placeholder="Localização"
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <Input
                      placeholder="O que você procura?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <Button className="w-full bg-red-500 hover:bg-red-600">
                      <Search className="h-4 w-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8">
                <Link to="/signup">
                  <Heart className="h-5 w-5 mr-2" />
                  Começar Agora
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/login">
                  Já tenho conta
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o iLove?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desenvolvemos a plataforma mais segura e eficiente para relacionamentos no Brasil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50">
                <CardContent className="p-6">
                  <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Em apenas 4 passos simples você pode encontrar sua alma gêmea
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.number}
                  </div>
                  <step.icon className="h-8 w-8 text-red-500 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-red-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-red-100">Usuários Ativos</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-red-100">Matches Realizados</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">15K+</div>
              <div className="text-red-100">Relacionamentos Formados</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-red-100">Satisfação dos Usuários</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Ads Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pessoas Procurando Agora
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Veja quem está online e procurando por alguém especial como você
            </p>
          </div>
          
          <AdList 
            searchTerm={searchTerm}
            category={selectedCategory}
            location={selectedLocation}
            limit={8}
          />
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/ads">
                Ver Todos os Anúncios
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Encontrar o Amor?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já encontraram a felicidade no iLove
          </p>
          <Button asChild size="lg" className="bg-white text-red-500 hover:bg-gray-100 text-lg px-8">
            <Link to="/signup">
              <Heart className="h-5 w-5 mr-2" />
              Cadastre-se Gratuitamente
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
