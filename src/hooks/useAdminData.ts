import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Total de usuários
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Anúncios pendentes
      const { count: pendingAds } = await supabase
        .from('ads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending_approval');

      // Anúncios ativos
      const { count: activeAds } = await supabase
        .from('ads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      return {
        totalUsers: totalUsers || 0,
        pendingAds: pendingAds || 0,
        pendingDocuments: 0, // Placeholder até a tabela ser criada
        activeAds: activeAds || 0,
      };
    },
  });
}

export function usePendingAds() {
  return useQuery({
    queryKey: ['pending-ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select(`
          *,
          profiles (
            id,
            full_name,
            email,
            avatar_url
          )
        `)
        .eq('status', 'pending_approval')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
}

export function usePendingDocuments() {
  return useQuery({
    queryKey: ['pending-documents'],
    queryFn: async () => {
      // Por enquanto retorna array vazio até a tabela verification_documents ser criada
      return [];
    },
  });
}

export function useApproveAd() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ adId, adminNotes }: { adId: string; adminNotes?: string }) => {
      const { data, error } = await supabase
        .from('ads')
        .update({
          status: 'active',
          admin_notes: adminNotes,
        })
        .eq('id', adId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-ads'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast({
        title: "Anúncio aprovado!",
        description: "O anúncio foi aprovado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao aprovar anúncio",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useRejectAd() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ adId, reason }: { adId: string; reason: string }) => {
      const { data, error } = await supabase
        .from('ads')
        .update({
          status: 'rejected',
          rejected_reason: reason,
        })
        .eq('id', adId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-ads'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast({
        title: "Anúncio rejeitado",
        description: "O anúncio foi rejeitado.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao rejeitar anúncio",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Placeholder functions para documentos até a tabela ser criada
export function useApproveDocument() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ documentId, adminNotes }: { documentId: string; adminNotes?: string }) => {
      // Placeholder - será implementado quando a tabela verification_documents for criada
      console.log('Approve document:', documentId, adminNotes);
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Documento aprovado!",
        description: "O documento foi aprovado com sucesso.",
      });
    },
  });
}

export function useRejectDocument() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ documentId, reason }: { documentId: string; reason: string }) => {
      // Placeholder - será implementado quando a tabela verification_documents for criada
      console.log('Reject document:', documentId, reason);
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Documento rejeitado",
        description: "O documento foi rejeitado.",
      });
    },
  });
}
