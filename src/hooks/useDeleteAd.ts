
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useDeleteAd() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (adId: string) => {
      const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', adId);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-ads'] });
      toast({
        title: "Anúncio excluído!",
        description: "Seu anúncio foi excluído com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir anúncio",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
