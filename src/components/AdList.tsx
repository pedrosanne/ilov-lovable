
import { AdCard } from './AdCard';
import { useAds } from '@/hooks/useAds';
import { Skeleton } from '@/components/ui/skeleton';

interface AdListProps {
  searchTerm: string;
  category: string;
  location: string;
}

export function AdList({ searchTerm, category, location }: AdListProps) {
  const { data: ads, isLoading, error } = useAds(searchTerm, category, location);

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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads?.map(ad => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
      
      {ads?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum serviço encontrado com os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
}
