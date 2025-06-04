
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ShieldX, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVerificationStatus } from '@/hooks/useVerificationStatus';

interface VerificationRequiredProps {
  feature: string;
  description: string;
  children: React.ReactNode;
}

export function VerificationRequired({ feature, description, children }: VerificationRequiredProps) {
  const { isVerified, hasVerification, verificationStatus, isLoading } = useVerificationStatus();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (isVerified) {
    return <>{children}</>;
  }

  const getStatusMessage = () => {
    if (!hasVerification) {
      return {
        icon: <Shield className="h-6 w-6 text-blue-500" />,
        title: "Verificação de Identidade Necessária",
        message: `Para acessar ${feature}, você precisa verificar sua identidade.`,
        action: "Iniciar Verificação"
      };
    }

    switch (verificationStatus) {
      case 'pending':
        return {
          icon: <Clock className="h-6 w-6 text-yellow-500" />,
          title: "Verificação em Análise",
          message: `Sua verificação está sendo analisada. Após aprovada, você poderá acessar ${feature}.`,
          action: null
        };
      case 'rejected':
        return {
          icon: <ShieldX className="h-6 w-6 text-red-500" />,
          title: "Verificação Rejeitada",
          message: `Sua verificação foi rejeitada. Envie novos documentos para acessar ${feature}.`,
          action: "Nova Verificação"
        };
      default:
        return {
          icon: <Shield className="h-6 w-6 text-blue-500" />,
          title: "Verificação de Identidade Necessária",
          message: `Para acessar ${feature}, você precisa verificar sua identidade.`,
          action: "Iniciar Verificação"
        };
    }
  };

  const status = getStatusMessage();

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {status.icon}
        </div>
        <CardTitle className="text-xl">{status.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {status.message}
          </AlertDescription>
        </Alert>

        <p className="text-gray-600">
          {description}
        </p>

        {status.action && (
          <Button asChild className="w-full">
            <Link to="/profile?tab=settings">
              {status.action}
            </Link>
          </Button>
        )}

        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
          <h4 className="font-semibold mb-2">Por que verificar minha identidade?</h4>
          <ul className="text-left space-y-1">
            <li>• Maior segurança para todos os usuários</li>
            <li>• Redução de perfis falsos</li>
            <li>• Ambiente mais confiável</li>
            <li>• Cumprimento de regulamentações</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
