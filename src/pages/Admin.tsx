
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Eye,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { 
  useAdminStats, 
  usePendingAds,
  usePendingDocuments,
  useApproveAd,
  useRejectAd,
  useApproveDocument,
  useRejectDocument
} from '@/hooks/useAdminData';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Admin = () => {
  const { user, profile } = useAuth();
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: pendingAds, isLoading: adsLoading } = usePendingAds();
  const { data: pendingDocuments, isLoading: docsLoading } = usePendingDocuments();

  const approveAd = useApproveAd();
  const rejectAd = useRejectAd();
  const approveDocument = useApproveDocument();
  const rejectDocument = useRejectDocument();

  // Verificar se o usuário é admin
  if (!user || !profile?.is_admin) {
    return <Navigate to="/" replace />;
  }

  const handleApproveAd = async (adId: string) => {
    await approveAd.mutateAsync({ adId, adminNotes });
    setAdminNotes('');
    setSelectedAd(null);
  };

  const handleRejectAd = async (adId: string) => {
    await rejectAd.mutateAsync({ adId, reason: rejectReason });
    setRejectReason('');
    setSelectedAd(null);
  };

  const handleApproveDocument = async (documentId: string) => {
    await approveDocument.mutateAsync({ documentId, adminNotes });
    setAdminNotes('');
    setSelectedDocument(null);
  };

  const handleRejectDocument = async (documentId: string) => {
    await rejectDocument.mutateAsync({ documentId, reason: rejectReason });
    setRejectReason('');
    setSelectedDocument(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie usuários, anúncios e documentos da plataforma</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : stats?.totalUsers}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anúncios Pendentes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {statsLoading ? '...' : stats?.pendingAds}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos Pendentes</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {statsLoading ? '...' : stats?.pendingDocuments}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anúncios Ativos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {statsLoading ? '...' : stats?.activeAds}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="ads">Anúncios Pendentes</TabsTrigger>
            <TabsTrigger value="documents">Documentos Pendentes</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="ads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Anúncios Aguardando Aprovação</CardTitle>
                <CardDescription>
                  Revise e aprove ou rejeite os anúncios enviados pelos usuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                {adsLoading ? (
                  <p>Carregando...</p>
                ) : pendingAds?.length === 0 ? (
                  <p className="text-gray-500">Nenhum anúncio pendente</p>
                ) : (
                  <div className="space-y-4">
                    {pendingAds?.map((ad) => (
                      <div key={ad.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{ad.title}</h3>
                            <p className="text-gray-600">{ad.description.substring(0, 150)}...</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>Por: {ad.profiles?.full_name || ad.profiles?.email}</span>
                              <span>Categoria: {ad.category}</span>
                              <span>Preço: R$ {ad.price}</span>
                            </div>
                          </div>
                          <Badge variant="secondary">Pendente</Badge>
                        </div>

                        {ad.identity_verification_video_url && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Vídeo de Verificação
                            </h4>
                            <video controls className="w-full max-w-md h-32 object-cover rounded">
                              <source src={ad.identity_verification_video_url} type="video/mp4" />
                            </video>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline"
                                onClick={() => setSelectedAd(ad)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalhes
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Detalhes do Anúncio</DialogTitle>
                              </DialogHeader>
                              {selectedAd && (
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="font-semibold">{selectedAd.title}</h3>
                                    <p className="text-gray-600">{selectedAd.description}</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><strong>Categoria:</strong> {selectedAd.category}</div>
                                    <div><strong>Preço:</strong> R$ {selectedAd.price}</div>
                                    <div><strong>Localização:</strong> {selectedAd.location}</div>
                                    <div><strong>WhatsApp:</strong> {selectedAd.whatsapp}</div>
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-2">
                                        Notas do Administrador
                                      </label>
                                      <Textarea
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Adicione notas sobre este anúncio..."
                                      />
                                    </div>

                                    <div className="flex gap-2">
                                      <Button 
                                        onClick={() => handleApproveAd(selectedAd.id)}
                                        disabled={approveAd.isPending}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Aprovar
                                      </Button>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="destructive">
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Rejeitar
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Rejeitar Anúncio</DialogTitle>
                                          </DialogHeader>
                                          <div className="space-y-4">
                                            <Textarea
                                              value={rejectReason}
                                              onChange={(e) => setRejectReason(e.target.value)}
                                              placeholder="Motivo da rejeição..."
                                            />
                                            <Button 
                                              onClick={() => handleRejectAd(selectedAd.id)}
                                              disabled={rejectAd.isPending}
                                              variant="destructive"
                                              className="w-full"
                                            >
                                              Confirmar Rejeição
                                            </Button>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentos de Verificação</CardTitle>
                <CardDescription>
                  Revise os documentos enviados pelos usuários para verificação de identidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Esta funcionalidade será implementada após a criação da tabela verification_documents.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>
                  Em breve: Lista de usuários, banimentos, etc.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios e Analytics</CardTitle>
                <CardDescription>
                  Em breve: Estatísticas detalhadas, gráficos, etc.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Plataforma</CardTitle>
                <CardDescription>
                  Em breve: Configurações gerais, categorias, preços, etc.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
