
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export function useFavorites() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('favorites')
        .select('ad_id')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map(fav => fav.ad_id);
    },
    enabled: !!user,
  });

  const toggleFavorite = useMutation({
    mutationFn: async (adId: string) => {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const isFavorited = favorites.includes(adId);

      if (isFavorited) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('ad_id', adId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            ad_id: adId
          });
        
        if (error) throw error;
      }

      return !isFavorited;
    },
    onSuccess: (isFavorited, adId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
      toast({
        title: isFavorited ? "Adicionado aos favoritos!" : "Removido dos favoritos",
        description: isFavorited ? "Você pode encontrar este anúncio na sua lista de favoritos." : "",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao favoritar",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const isFavorited = (adId: string) => favorites.includes(adId);

  return {
    favorites,
    isLoading,
    toggleFavorite: toggleFavorite.mutate,
    isFavorited,
    isToggling: toggleFavorite.isPending,
  };
}
