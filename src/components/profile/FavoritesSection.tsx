
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Eye, MessageCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';

export function FavoritesSection() {
  const { user } = useAuth();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          ads (
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
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center shadow-sm">
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhum favorito ainda
        </h3>
        <p className="text-gray-600">
          Comece a favoritar anúncios que você gosta para vê-los aqui!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {favorites.map((favorite) => (
        <Card key={favorite.id} className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex space-x-4">
              {favorite.ads.image_url && (
                <img
                  src={favorite.ads.image_url}
                  alt={favorite.ads.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {favorite.ads.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {favorite.ads.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {favorite.ads.location}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {favorite.ads.views_count}
                      </div>
                      <span className="text-green-600 font-semibold">
                        R$ {favorite.ads.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Contatar
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Anúncio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
