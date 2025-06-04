
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMyAds } from '@/hooks/useAds';
import { useAuth } from '@/hooks/useAuth';
import { useVerificationStatus } from '@/hooks/useVerificationStatus';
import { Navigate, Link } from 'react-router-dom';
import { PlusCircle, Eye, MessageCircle, Edit3, Trash2, Shield, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const MyAds = () => {
  const { user, loading } = useAuth();
  const { data: ads, isLoading: adsLoading } = useMyAds();
  const { isVerified, hasVerification, verificationStatus } = useVerificationStatus();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending_approval':
        return 'Aguardando Aprovação';
      case 'rejected':
        return 'Rejeitado';
      case 'paused':
        return 'Pausado';
      default:
        return status;
    }
  };

  const getVerificationAlert = () => {
    if (isVerified) return null;

    if (!hasVerification) {
      return (
        <Alert className="border-red-200 bg-red-50 mb-6">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex items-center justify-between">
              <div>
                <strong>Verificação necessária para criar anúncios</strong>
                <p className="mt-1">Você precisa verificar sua identidade antes de publicar anúncios.</p>
              </div>
              <Button asChild className="ml-4">
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
          <Alert className="border-yellow-200 bg-yellow-50 mb-6">
            <Shield className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Verificação em análise</strong>
              <p className="mt-1">Sua verificação está sendo analisada. Após aprovada, você poderá criar anúncios.</p>
            </AlertDescription>
          </Alert>
        );
      case 'rejected':
        return (
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Verificação rejeitada</strong>
                  <p className="mt-1">Envie novos documentos para poder criar anúncios.</p>
                </div>
                <Button asChild className="ml-4">
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Meus Anúncios
            </h1>
            <p className="text-gray-600">
              Gerencie todos os seus anúncios publicados
            </p>
          </div>
          <Button asChild disabled={!isVerified}>
            <Link to="/create-ad">
              <PlusCircle className="h-4 w-4 mr-2" />
              {isVerified ? 'Novo Anúncio' : 'Novo Anúncio 🔒'}
            </Link>
          </Button>
        </div>

        {getVerificationAlert()}

        {adsLoading ? (
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        ) : ads && ads.length > 0 ? (
          <div className="grid gap-6">
            {ads.map((ad) => (
              <Card key={ad.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{ad.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>{ad.location}</span>
                        <span>•</span>
                        <span>R$ {ad.price}</span>
                        <span>•</span>
                        <Badge className={getStatusColor(ad.status)}>
                          {getStatusText(ad.status)}
                        </Badge>
                      </div>
                    </div>
                    {ad.image_url && (
                      <img 
                        src={ad.image_url} 
                        alt={ad.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {ad.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{ad.views_count || 0} visualizações</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{ad.clicks_count || 0} cliques</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/ad/${ad.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <PlusCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isVerified ? 'Nenhum anúncio criado ainda' : 'Verifique sua identidade para criar anúncios'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isVerified 
                  ? 'Comece criando seu primeiro anúncio para atrair clientes'
                  : 'Para publicar anúncios em nossa plataforma, você precisa verificar sua identidade primeiro'
                }
              </p>
              <Button asChild disabled={!isVerified}>
                <Link to={isVerified ? "/create-ad" : "/profile?tab=settings"}>
                  {isVerified ? 'Criar Primeiro Anúncio' : 'Verificar Identidade'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyAds;
