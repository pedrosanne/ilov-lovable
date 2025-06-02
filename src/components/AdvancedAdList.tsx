
import { AdvancedAdCard } from './AdvancedAdCard';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';

interface AdvancedAdListProps {
  searchTerm: string;
  category: string;
  location: {
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
  };
  radiusKm: number;
}

export function AdvancedAdList({ searchTerm, category, location, radiusKm }: AdvancedAdListProps) {
  const { data: ads, isLoading, error } = useAdvancedSearch({
    searchTerm: searchTerm || undefined,
    category: category || undefined,
    city: location.city,
    state: location.state,
    latitude: location.latitude,
    longitude: location.longitude,
    radiusKm,
  });

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          Erro ao carregar anúncios. Tente novamente.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {ads?.length || 0} serviços encontrados
        </h2>
        
        {location.city && (
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>em {location.city}, {location.state}</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads?.map(ad => (
          <AdvancedAdCard key={ad.id} ad={ad} />
        ))}
      </div>
      
      {ads?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            Nenhum serviço encontrado com os filtros aplicados.
          </p>
          <div className="text-sm text-gray-400">
            <p>Dicas:</p>
            <p>• Tente expandir o raio de busca</p>
            <p>• Remova alguns filtros</p>
            <p>• Verifique a ortografia dos termos de busca</p>
          </div>
        </div>
      )}
    </div>
  );
}
