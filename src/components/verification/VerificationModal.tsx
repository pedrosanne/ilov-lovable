
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield, ShieldCheck, Clock, ShieldX } from 'lucide-react';
import { useVerificationStatus } from '@/hooks/useVerificationStatus';
import { useNavigate } from 'react-router-dom';

interface VerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType?: string;
}

export function VerificationModal({ open, onOpenChange, actionType = "esta funcionalidade" }: VerificationModalProps) {
  const { hasVerification, verificationStatus } = useVerificationStatus();
  const navigate = useNavigate();

  const getStatusInfo = () => {
    if (!hasVerification) {
      return {
        icon: <Shield className="h-8 w-8 text-blue-500 mx-auto mb-4" />,
        title: "Verificação de Identidade Necessária",
        message: `Para usar ${actionType}, você precisa verificar sua identidade primeiro.`,
        buttonText: "Verificar Agora",
        canVerify: true
      };
    }

    switch (verificationStatus) {
      case 'pending':
        return {
          icon: <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-4" />,
          title: "Verificação em Análise",
          message: `Sua verificação está sendo analisada. Após aprovada, você poderá usar ${actionType}.`,
          buttonText: "Entendido",
          canVerify: false
        };
      case 'rejected':
        return {
          icon: <ShieldX className="h-8 w-8 text-red-500 mx-auto mb-4" />,
          title: "Verificação Rejeitada",
          message: `Sua verificação foi rejeitada. Envie novos documentos para usar ${actionType}.`,
          buttonText: "Enviar Novamente",
          canVerify: true
        };
      default:
        return {
          icon: <Shield className="h-8 w-8 text-blue-500 mx-auto mb-4" />,
          title: "Verificação de Identidade Necessária",
          message: `Para usar ${actionType}, você precisa verificar sua identidade primeiro.`,
          buttonText: "Verificar Agora",
          canVerify: true
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleVerify = () => {
    onOpenChange(false);
    if (statusInfo.canVerify) {
      navigate('/profile?tab=settings');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {statusInfo.icon}
            {statusInfo.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            {statusInfo.message}
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg text-left">
            <h4 className="font-semibold text-blue-900 mb-2">Por que verificar?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Maior segurança para todos os usuários</li>
              <li>• Redução de perfis falsos</li>
              <li>• Ambiente mais confiável</li>
              <li>• Cumprimento de regulamentações</li>
            </ul>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleVerify}
              className="flex-1"
            >
              {statusInfo.buttonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
