
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MessagesSystem } from '@/components/messages/MessagesSystem';
import { VerificationRequired } from '@/components/verification/VerificationRequired';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const Messages = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <VerificationRequired
          feature="o sistema de mensagens"
          description="Para trocar mensagens com outros usuários, é necessário verificar sua identidade. Isso garante um ambiente seguro e confiável para todos."
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mensagens
            </h1>
            <p className="text-gray-600">
              Gerencie suas conversas e mantenha contato com outros usuários
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <MessagesSystem />
          </div>
        </VerificationRequired>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;
