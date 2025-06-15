
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VerificationAlertProps {
  isVerified: boolean;
  hasVerification: boolean;
  verificationStatus?: string;
}

export function VerificationAlert({ isVerified, hasVerification, verificationStatus }: VerificationAlertProps) {
  if (isVerified) return null;

  if (!hasVerification) {
    return (
      <Alert className="border-red-200 bg-red-50 rounded-2xl">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <div className="flex items-center justify-between">
            <div>
              <strong>Verificação de identidade necessária!</strong>
              <p className="mt-1">Você precisa verificar sua identidade para usar todas as funcionalidades da plataforma.</p>
            </div>
            <Button asChild className="ml-4 bg-red-600 hover:bg-red-700 rounded-xl">
              <Link to="/profile?tab=settings">
                Verificar Agora
              </Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  switch (verificationStatus) {
    case 'pending':
      return (
        <Alert className="border-yellow-200 bg-yellow-50 rounded-2xl">
          <Shield className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Verificação em análise</strong>
            <p className="mt-1">Sua verificação está sendo analisada. Você será notificado quando for aprovada.</p>
          </AlertDescription>
        </Alert>
      );
    case 'rejected':
      return (
        <Alert className="border-red-200 bg-red-50 rounded-2xl">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex items-center justify-between">
              <div>
                <strong>Verificação rejeitada</strong>
                <p className="mt-1">Sua verificação foi rejeitada. Envie novos documentos para continuar usando a plataforma.</p>
              </div>
              <Button asChild className="ml-4 bg-red-600 hover:bg-red-700 rounded-xl">
                <Link to="/profile?tab=settings">
                  Nova Verificação
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      );
    default:
      return null;
  }
}
