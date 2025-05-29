
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

type AdInsert = Database['public']['Tables']['ads']['Insert'];

export function useCreateAd() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (ad: AdInsert) => {
      const { data, error } = await supabase
        .from('ads')
        .insert(ad)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast({
        title: "Anúncio criado!",
        description: "Seu anúncio foi enviado para aprovação.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar anúncio",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useMyAds() {
  return useQuery({
    queryKey: ['my-ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
