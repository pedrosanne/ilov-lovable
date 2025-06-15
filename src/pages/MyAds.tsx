
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMyAds } from '@/hooks/useAds';
import { useAuth } from '@/hooks/useAuth';
import { useVerificationStatus } from '@/hooks/useVerificationStatus';
import { Navigate, Link } from 'react-router-dom';
import { PlusCircle, Shield, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AdCard } from '@/components/my-ads/AdCard';

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

  const getVerificationAlert = () => {
    if (isVerified) return null;

    if (!hasVerification) {
      return (
        <Alert className="border-red-200 bg-red-50 mb-6">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <strong>Verificação necessária para criar anúncios</strong>
                <p className="mt-1">Você precisa verificar sua identidade antes de publicar anúncios.</p>
              </div>
              <Button asChild className="w-full sm:w-auto sm:ml-4">
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <strong>Verificação rejeitada</strong>
                  <p className="mt-1">Envie novos documentos para poder criar anúncios.</p>
                </div>
                <Button asChild className="w-full sm:w-auto sm:ml-4">
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
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Meus Anúncios
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Gerencie todos os seus anúncios publicados
            </p>
          </div>
          <Button asChild disabled={!isVerified} className="w-full sm:w-auto">
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
              <AdCard key={ad.id} ad={ad} isLoading={adsLoading} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 sm:p-16 text-center shadow-sm">
            <PlusCircle className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {isVerified ? 'Nenhum anúncio criado ainda' : 'Verifique sua identidade para criar anúncios'}
            </h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
              {isVerified 
                ? 'Comece criando seu primeiro anúncio para atrair clientes'
                : 'Para publicar anúncios em nossa plataforma, você precisa verificar sua identidade primeiro'
              }
            </p>
            <Button asChild disabled={!isVerified} className="w-full sm:w-auto">
              <Link to={isVerified ? "/create-ad" : "/profile?tab=settings"}>
                {isVerified ? 'Criar Primeiro Anúncio' : 'Verificar Identidade'}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAds;
