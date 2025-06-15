
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export function useFollow(targetUserId: string) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: isFollowing, isLoading } = useQuery({
    queryKey: ['following', user?.id, targetUserId],
    queryFn: async () => {
      if (!user) return false;
      
      const { data } = await supabase
        .from('user_follows')
        .select('id')
        .eq('follower_id', user.id)
        .eq('following_id', targetUserId)
        .single();
      
      return !!data;
    },
    enabled: !!user && !!targetUserId && user.id !== targetUserId,
  });

  const followMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');

      if (isFollowing) {
        await supabase
          .from('user_follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', targetUserId);
      } else {
        await supabase
          .from('user_follows')
          .insert({
            follower_id: user.id,
            following_id: targetUserId,
          });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: isFollowing ? "Deixou de seguir" : "Seguindo",
        description: isFollowing ? "Você não segue mais este usuário" : "Você agora segue este usuário",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status de seguir",
        variant: "destructive",
      });
    },
  });

  return {
    isFollowing,
    isLoading,
    toggleFollow: followMutation.mutate,
    isToggling: followMutation.isPending,
  };
}
