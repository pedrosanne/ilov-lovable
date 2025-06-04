
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ShieldCheck, ShieldX, Clock, Upload } from 'lucide-react';
import { useUserVerification } from '@/hooks/useIdentityVerification';
import { VerificationForm } from './VerificationForm';
import { Skeleton } from '@/components/ui/skeleton';

export function IdentityVerification() {
  const { verification, isLoading } = useUserVerification();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Verificação de Identidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  const getStatusDisplay = () => {
    if (!verification) {
      return {
        icon: <Shield className="h-5 w-5" />,
        badge: <Badge variant="outline">Não verificado</Badge>,
        color: "text-gray-600"
      };
    }

    switch (verification.status) {
      case 'approved':
        return {
          icon: <ShieldCheck className="h-5 w-5" />,
          badge: <Badge className="bg-green-600">Verificado</Badge>,
          color: "text-green-600"
        };
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5" />,
          badge: <Badge variant="secondary">Em análise</Badge>,
          color: "text-yellow-600"
        };
      case 'rejected':
        return {
          icon: <ShieldX className="h-5 w-5" />,
          badge: <Badge variant="destructive">Rejeitado</Badge>,
          color: "text-red-600"
        };
      default:
        return {
          icon: <Shield className="h-5 w-5" />,
          badge: <Badge variant="outline">Não verificado</Badge>,
          color: "text-gray-600"
        };
    }
  };

  const status = getStatusDisplay();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Verificação de Identidade
          </div>
          {status.badge}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`flex items-center ${status.color}`}>
          {status.icon}
          <span className="ml-2 font-medium">
            {!verification && "Identidade não verificada"}
            {verification?.status === 'approved' && "Identidade verificada"}
            {verification?.status === 'pending' && "Verificação em análise"}
            {verification?.status === 'rejected' && "Verificação rejeitada"}
          </span>
        </div>

        {!verification && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Verifique sua identidade para aumentar a confiança em seu perfil. 
              Você precisará enviar documentos e um vídeo de verificação.
            </AlertDescription>
          </Alert>
        )}

        {verification?.status === 'pending' && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Sua verificação está sendo analisada. Você será notificado quando a análise for concluída.
            </AlertDescription>
          </Alert>
        )}

        {verification?.status === 'rejected' && (
          <Alert variant="destructive">
            <ShieldX className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p>Sua verificação foi rejeitada.</p>
                {verification.rejection_reason && (
                  <p className="text-sm">
                    <strong>Motivo:</strong> {verification.rejection_reason}
                  </p>
                )}
                <p className="text-sm">Você pode enviar novos documentos.</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {verification?.status === 'approved' && (
          <Alert className="border-green-200 bg-green-50">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Sua identidade foi verificada com sucesso! Seu perfil agora possui o selo de verificação.
            </AlertDescription>
          </Alert>
        )}

        {(!verification || verification.status === 'rejected') && (
          <div className="space-y-4">
            {!showForm ? (
              <Button onClick={() => setShowForm(true)} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                {verification?.status === 'rejected' ? 'Enviar Nova Verificação' : 'Iniciar Verificação'}
              </Button>
            ) : (
              <VerificationForm onCancel={() => setShowForm(false)} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
