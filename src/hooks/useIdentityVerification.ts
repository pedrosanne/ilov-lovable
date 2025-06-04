
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export type DocumentType = 'rg' | 'cnh' | 'passport';
export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface IdentityVerification {
  id: string;
  user_id: string;
  document_type: DocumentType;
  document_front_url: string;
  document_back_url?: string;
  selfie_with_document_url: string;
  verification_video_url: string;
  status: VerificationStatus;
  rejection_reason?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface VerificationFormData {
  documentType: DocumentType;
  documentFront: File;
  documentBack?: File;
  selfieWithDocument: File;
  verificationVideo: File;
}

export function useUserVerification() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: verification, isLoading } = useQuery({
    queryKey: ['user-verification', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('identity_verifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as IdentityVerification | null;
    },
    enabled: !!user,
  });

  const uploadVerificationFile = async (file: File, fileType: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${fileType}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('identity-verifications')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('identity-verifications')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const submitVerification = useMutation({
    mutationFn: async (formData: VerificationFormData) => {
      if (!user) throw new Error('User not authenticated');

      // Upload dos arquivos
      const documentFrontUrl = await uploadVerificationFile(formData.documentFront, 'document-front');
      let documentBackUrl: string | undefined;
      
      if (formData.documentBack) {
        documentBackUrl = await uploadVerificationFile(formData.documentBack, 'document-back');
      }

      const selfieUrl = await uploadVerificationFile(formData.selfieWithDocument, 'selfie');
      const videoUrl = await uploadVerificationFile(formData.verificationVideo, 'video');

      // Inserir no banco
      const { data, error } = await supabase
        .from('identity_verifications')
        .insert({
          user_id: user.id,
          document_type: formData.documentType,
          document_front_url: documentFrontUrl,
          document_back_url: documentBackUrl,
          selfie_with_document_url: selfieUrl,
          verification_video_url: videoUrl,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-verification'] });
      toast({
        title: "Verificação enviada!",
        description: "Seus documentos foram enviados para análise. Você será notificado quando a verificação for concluída.",
      });
    },
    onError: (error) => {
      console.error('Erro ao enviar verificação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a verificação. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  return {
    verification,
    isLoading,
    submitVerification,
    isSubmitting: submitVerification.isPending
  };
}

// Hook para administradores
export function useAdminVerifications() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pendingVerifications, isLoading } = useQuery({
    queryKey: ['admin-verifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('identity_verifications')
        .select(`
          *,
          profiles!identity_verifications_user_id_fkey (
            id,
            full_name,
            email,
            avatar_url
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const reviewVerification = useMutation({
    mutationFn: async ({ 
      verificationId, 
      status, 
      rejectionReason 
    }: { 
      verificationId: string; 
      status: 'approved' | 'rejected'; 
      rejectionReason?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('identity_verifications')
        .update({
          status,
          rejection_reason: rejectionReason,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', verificationId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-verifications'] });
      toast({
        title: variables.status === 'approved' ? "Verificação aprovada!" : "Verificação rejeitada",
        description: variables.status === 'approved' 
          ? "O usuário foi verificado com sucesso." 
          : "A verificação foi rejeitada.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível processar a verificação.",
        variant: "destructive",
      });
    },
  });

  return {
    pendingVerifications,
    isLoading,
    reviewVerification
  };
}
