
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export function useVerificationStatus() {
  const { user } = useAuth();

  const { data: verificationStatus, isLoading } = useQuery({
    queryKey: ['verification-status', user?.id],
    queryFn: async () => {
      if (!user) return { isVerified: false, hasVerification: false };
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_verified')
        .eq('id', user.id)
        .single();

      const { data: verification } = await supabase
        .from('identity_verifications')
        .select('status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      return {
        isVerified: profile?.is_verified || false,
        hasVerification: !!verification,
        verificationStatus: verification?.status
      };
    },
    enabled: !!user,
  });

  return {
    isVerified: verificationStatus?.isVerified || false,
    hasVerification: verificationStatus?.hasVerification || false,
    verificationStatus: verificationStatus?.verificationStatus,
    isLoading
  };
}
