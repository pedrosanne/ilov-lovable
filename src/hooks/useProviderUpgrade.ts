
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export function useProviderUpgradeRequest() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: currentRequest, isLoading } = useQuery({
    queryKey: ['provider-upgrade-request'],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('provider_upgrade_requests')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createRequest = useMutation({
    mutationFn: async ({ reason }: { reason: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('provider_upgrade_requests')
        .insert({
          user_id: user.id,
          reason,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-upgrade-request'] });
      toast({
        title: "Solicitação enviada!",
        description: "Seu pedido para se tornar anunciante foi enviado para análise.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Não foi possível enviar a solicitação. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  return {
    currentRequest,
    isLoading,
    createRequest,
    hasRequestPending: !!currentRequest
  };
}

export function useAdminUpgradeRequests() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pendingRequests, isLoading } = useQuery({
    queryKey: ['admin-upgrade-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_upgrade_requests')
        .select(`
          *,
          profiles (
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
      return data;
    },
  });

  const approveRequest = useMutation({
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
      queryClient.invalidateQueries({ queryKey: ['admin-upgrade-requests'] });
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

  const rejectRequest = useMutation({
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
      queryClient.invalidateQueries({ queryKey: ['admin-upgrade-requests'] });
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

  return {
    pendingRequests,
    isLoading,
    approveRequest,
    rejectRequest
  };
}
