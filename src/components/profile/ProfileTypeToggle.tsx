
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Briefcase, Info, Clock, Shield } from 'lucide-react';
import { useProviderUpgradeRequest } from '@/hooks/useProviderUpgrade';
import { useVerificationStatus } from '@/hooks/useVerificationStatus';
import { useVerificationModal } from '@/hooks/useVerificationModal';
import { VerificationModal } from '@/components/verification/VerificationModal';

interface ProfileTypeToggleProps {
  profile: any;
  currentViewType: 'client' | 'provider';
  onViewTypeChange: (type: 'client' | 'provider') => void;
}

export function ProfileTypeToggle({ profile, currentViewType, onViewTypeChange }: ProfileTypeToggleProps) {
  const { hasRequestPending } = useProviderUpgradeRequest();
  const { isVerified } = useVerificationStatus();
  const { showModal, closeModal, checkVerificationAndExecute } = useVerificationModal();

  const handleRequestUpgrade = () => {
    checkVerificationAndExecute(() => {
      // Navegar para a aba de upgrade
      onViewTypeChange('client');
      // Simular um clique na aba upgrade ou navegar para ela
      setTimeout(() => {
        const upgradeTab = document.querySelector('[data-tab="upgrade"]') as HTMLElement;
        if (upgradeTab) {
          upgradeTab.click();
        }
      }, 100);
    });
  };

  return (
    <>
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

            {/* Status do perfil de anunciante */}
            {!profile.is_provider && (
              <div className="space-y-3">
                {/* Verificação de identidade necessária */}
                {!isVerified && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-900">Verificação de Identidade Necessária</h4>
                        <p className="text-sm text-red-700 mt-1">
                          Para se tornar um anunciante, você deve primeiro verificar sua identidade. 
                          Isso garante a segurança de todos os usuários da plataforma.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {hasRequestPending ? (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-900">Solicitação Pendente</h4>
                        <p className="text-sm text-orange-700 mt-1">
                          Sua solicitação para se tornar anunciante está sendo analisada. 
                          Você receberá uma notificação sobre o resultado.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-900">Torne-se um Anunciante</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Solicite aprovação para criar anúncios e ser encontrado por clientes na plataforma.
                        </p>
                        <Button
                          size="sm"
                          className="mt-3"
                          onClick={handleRequestUpgrade}
                          disabled={!isVerified}
                        >
                          {isVerified ? 'Solicitar Aprovação' : 'Verificar Identidade Primeiro'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de verificação */}
      <VerificationModal
        open={showModal}
        onOpenChange={closeModal}
        actionType="solicitar aprovação como anunciante"
      />
    </>
  );
}
