
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, XCircle, Clock } from 'lucide-react';

interface IdentityVerificationVideoProps {
  videoUrl?: string;
  status?: string;
  showTitle?: boolean;
}

export function IdentityVerificationVideo({ 
  videoUrl, 
  status = 'pending',
  showTitle = true 
}: IdentityVerificationVideoProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'approved':
        return 'Identidade Verificada';
      case 'rejected':
        return 'Verificação Rejeitada';
      default:
        return 'Verificação Pendente';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (!videoUrl) {
    return (
      <Card className="w-full">
        {showTitle && (
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Verificação de Identidade
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Vídeo de verificação não disponível</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      {showTitle && (
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" />
            Verificação de Identidade
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor()}>
              {getStatusIcon()}
              <span className="ml-1">{getStatusText()}</span>
            </Badge>
          </div>
          
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <video
              controls
              className="w-full h-64 object-cover"
              poster="/placeholder.svg"
            >
              <source src={videoUrl} type="video/mp4" />
              Seu navegador não suporta reprodução de vídeos.
            </video>
          </div>
          
          <div className="text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Este vídeo comprova a identidade do anunciante
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
