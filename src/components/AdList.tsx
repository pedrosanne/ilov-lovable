
import { AdCard } from './AdCard';

// Mock data - will be replaced with Supabase data
const mockAds = [
  {
    id: '1',
    title: 'Manicure e Pedicure Profissional',
    description: 'Serviço de manicure e pedicure com mais de 10 anos de experiência. Atendimento domiciliar disponível.',
    price: 45.00,
    category: 'beleza',
    location: 'São Paulo, SP',
    image: '/placeholder.svg',
    whatsapp: '11999999999',
    rating: 4.8,
    provider: 'Maria Silva'
  },
  {
    id: '2',
    title: 'Aulas de Violão Online',
    description: 'Professor de música com 15 anos de experiência oferece aulas online de violão para todos os níveis.',
    price: 60.00,
    category: 'educacao',
    location: 'Rio de Janeiro, RJ',
    image: '/placeholder.svg',
    whatsapp: '21888888888',
    rating: 4.9,
    provider: 'João Santos'
  },
  {
    id: '3',
    title: 'Limpeza Residencial',
    description: 'Serviço completo de limpeza residencial. Equipe treinada e produtos de qualidade.',
    price: 120.00,
    category: 'casa',
    location: 'Belo Horizonte, MG',
    image: '/placeholder.svg',
    whatsapp: '31777777777',
    rating: 4.7,
    provider: 'Ana Costa'
  }
];

interface AdListProps {
  searchTerm: string;
  category: string;
  location: string;
}

export function AdList({ searchTerm, category, location }: AdListProps) {
  // Filter logic - will be enhanced with Supabase
  const filteredAds = mockAds.filter(ad => {
    const matchesSearch = !searchTerm || 
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !category || ad.category === category;
    const matchesLocation = !location || ad.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredAds.length} serviços encontrados
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAds.map(ad => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
      
      {filteredAds.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum serviço encontrado com os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
}
