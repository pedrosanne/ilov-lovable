
import { Header } from '@/components/Header';
import { MessagesSystem } from '@/components/messages/MessagesSystem';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const Messages = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
      </div>
    </div>
  );
};

export default Messages;
