
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedAdsProps {
  currentAdId: string;
  category: string;
  location: string;
}

export function RelatedAds({ currentAdId, category, location }: RelatedAdsProps) {
  const { data: relatedAds, isLoading } = useQuery({
    queryKey: ['related-ads', currentAdId, category, location],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select(`
          id,
          title,
          description,
          price,
          location,
          image_url,
          views_count,
          category,
          profiles (
            full_name,
            presentation_name,
            avatar_url
          )
        `)
        .neq('id', currentAdId)
        .eq('status', 'active')
        .or(`category.eq.${category},location.ilike.%${location}%`)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;
      return data;
    },
  });

  const getCategoryLabel = (category: string) => {
    const categories = {
      acompanhante: 'Acompanhante',
      beleza: 'Beleza',
      saude: 'Saúde',
      casa: 'Casa e Jardim',
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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Você também pode gostar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!relatedAds || relatedAds.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Você também pode gostar</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedAds.map((ad) => (
          <Card key={ad.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex space-x-3">
                {ad.image_url && (
                  <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryLabel(ad.category)}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      Novo
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">
                    {ad.title}
                  </h4>
                  
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {ad.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {ad.location}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600 text-sm">
                      R$ {Number(ad.price || 0).toFixed(2)}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye className="h-3 w-3 mr-1" />
                      {ad.views_count}
                    </div>
                  </div>
                  
                  <Button asChild size="sm" className="w-full mt-2">
                    <Link to={`/ad/${ad.id}`}>
                      Ver Detalhes
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
