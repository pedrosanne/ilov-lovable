
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UpdateAdData {
  id: string;
  data: {
    title: string;
    description: string;
    price: number | null;
    location: string;
    whatsapp: string;
    category: string;
  };
}

export function useUpdateAd() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateAdData) => {
      const { data: updatedAd, error } = await supabase
        .from('ads')
        .update({
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          whatsapp: data.whatsapp,
          category: data.category,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return updatedAd;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-ads'] });
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast({
        title: "Anúncio atualizado!",
        description: "Suas alterações foram salvas com sucesso.",
      });
      navigate('/my-ads');
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar anúncio",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
