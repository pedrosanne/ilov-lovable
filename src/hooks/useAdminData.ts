
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

      // Solicitações de upgrade pendentes
      const { count: pendingUpgrades } = await supabase
        .from('provider_upgrade_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      return {
        totalUsers: totalUsers || 0,
        pendingAds: pendingAds || 0,
        pendingDocuments: pendingUpgrades || 0,
        activeAds: activeAds || 0,
        pendingUpgrades: pendingUpgrades || 0,
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
          profiles!ads_user_id_fkey (
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
      // Retornar solicitações de upgrade como "documentos" por enquanto
      const { data, error } = await supabase
        .from('provider_upgrade_requests')
        .select(`
          *,
          profiles!provider_upgrade_requests_user_id_fkey (
            id,
            full_name,
            email,
            avatar_url
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
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

// Usar os hooks específicos para upgrade requests
export function usePendingUpgradeRequests() {
  return useQuery({
    queryKey: ['pending-upgrade-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_upgrade_requests')
        .select(`
          *,
          profiles!provider_upgrade_requests_user_id_fkey (
            id,
            full_name,
            email,
            avatar_url,
            presentation_name
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
}

export function useApproveUpgradeRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ requestId, adminNotes }: { requestId: string; adminNotes?: string }) => {
      // Buscar o request para pegar o user_id
      const { data: request, error: fetchError } = await supabase
        .from('provider_upgrade_requests')
        .select('user_id')
        .eq('id', requestId)
        .single();

      if (fetchError) throw fetchError;

      // Atualizar o perfil do usuário
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_provider: true })
        .eq('id', request.user_id);

      if (profileError) throw profileError;

      // Atualizar o request
      const { error: requestError } = await supabase
        .from('provider_upgrade_requests')
        .update({
          status: 'approved',
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (requestError) throw requestError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-upgrade-requests'] });
      queryClient.invalidateQueries({ queryKey: ['pending-documents'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast({
        title: "Solicitação aprovada!",
        description: "O usuário agora é um anunciante.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível aprovar a solicitação.",
        variant: "destructive",
      });
    },
  });
}

export function useRejectUpgradeRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ requestId, adminNotes }: { requestId: string; adminNotes?: string }) => {
      const { error } = await supabase
        .from('provider_upgrade_requests')
        .update({
          status: 'rejected',
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-upgrade-requests'] });
      queryClient.invalidateQueries({ queryKey: ['pending-documents'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast({
        title: "Solicitação rejeitada",
        description: "O usuário foi notificado da rejeição.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível rejeitar a solicitação.",
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
