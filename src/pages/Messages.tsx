
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { MessageCircle, Phone, ExternalLink, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Messages = () => {
  const { user, loading } = useAuth();

  // Mock data - será substituído por dados reais do banco
  const messages = [
    {
      id: '1',
      adTitle: 'Serviços de Acompanhante Premium',
      clientName: 'Cliente Anônimo',
      message: 'Olá, gostaria de saber mais sobre seus serviços',
      whatsapp: '11999999999',
      createdAt: new Date(),
      status: 'new'
    }
  ];

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const openWhatsApp = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(`Olá! Vi sua mensagem sobre o anúncio: ${message}`);
    window.open(`https://wa.me/55${phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mensagens Recebidas
          </h1>
          <p className="text-gray-600">
            Acompanhe as mensagens e contatos dos interessados em seus anúncios
          </p>
        </div>

        {messages.length > 0 ? (
          <div className="grid gap-6">
            {messages.map((message) => (
              <Card key={message.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {message.adTitle}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{message.clientName}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(message.createdAt)}</span>
                        </div>
                        <Badge variant={message.status === 'new' ? 'default' : 'secondary'}>
                          {message.status === 'new' ? 'Nova' : 'Lida'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700">
                      "{message.message}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>WhatsApp: {message.whatsapp}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => openWhatsApp(message.whatsapp, message.message)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Responder no WhatsApp
                        <ExternalLink className="h-4 w-4 ml-1" />
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
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma mensagem ainda
              </h3>
              <p className="text-gray-600 mb-6">
                Quando alguém entrar em contato através dos seus anúncios, as mensagens aparecerão aqui
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Messages;
