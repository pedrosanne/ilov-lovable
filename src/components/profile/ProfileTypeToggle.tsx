
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Briefcase, Info } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileTypeToggleProps {
  profile: any;
  currentViewType: 'client' | 'provider';
  onViewTypeChange: (type: 'client' | 'provider') => void;
}

export function ProfileTypeToggle({ profile, currentViewType, onViewTypeChange }: ProfileTypeToggleProps) {
  const [showUpgradeInfo, setShowUpgradeInfo] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const toggleProviderMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('profiles')
        .update({ is_provider: !profile.is_provider })
        .eq('id', profile.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile.id] });
      toast({
        title: profile.is_provider ? "Perfil de anunciante desativado" : "Perfil de anunciante ativado",
        description: profile.is_provider 
          ? "Você agora está apenas como contratante." 
          : "Agora você pode criar anúncios e ser encontrado por clientes!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível alterar o tipo de perfil.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="mb-6 space-y-4">
      {/* Toggle entre visualizações */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Tipo de Perfil
          </CardTitle>
          <CardDescription>
            Escolha como você quer usar a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant={currentViewType === 'client' ? 'default' : 'outline'}
              onClick={() => onViewTypeChange('client')}
              className="flex-1"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Perfil de Contratante
            </Button>
            
            <Button
              variant={currentViewType === 'provider' ? 'default' : 'outline'}
              onClick={() => onViewTypeChange('provider')}
              disabled={!profile.is_provider}
              className="flex-1"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Perfil de Anunciante
              {!profile.is_provider && <Badge variant="secondary" className="ml-2">Inativo</Badge>}
            </Button>
          </div>

          {/* Controle para ativar/desativar perfil de anunciante */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium">Perfil de Anunciante</h4>
              <p className="text-sm text-gray-600">
                Ative para criar anúncios e ser encontrado por clientes
              </p>
            </div>
            <Switch
              checked={profile.is_provider}
              onCheckedChange={() => toggleProviderMutation.mutate()}
              disabled={toggleProviderMutation.isPending}
            />
          </div>

          {!profile.is_provider && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Torne-se um Anunciante</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Ative o perfil de anunciante para criar anúncios, gerenciar seus serviços e ser encontrado por clientes na plataforma.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
