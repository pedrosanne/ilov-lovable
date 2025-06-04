
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
  AlertTriangle,
  UserPlus
} from 'lucide-react';
import { 
  useAdminStats, 
  usePendingAds,
  usePendingUpgradeRequests,
  useApproveAd,
  useRejectAd,
  useApproveUpgradeRequest,
  useRejectUpgradeRequest
} from '@/hooks/useAdminData';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Admin = () => {
  const { user, profile } = useAuth();
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: pendingAds, isLoading: adsLoading } = usePendingAds();
  const { data: pendingUpgradeRequests, isLoading: upgradeRequestsLoading } = usePendingUpgradeRequests();

  const approveAd = useApproveAd();
  const rejectAd = useRejectAd();
  const approveUpgradeRequest = useApproveUpgradeRequest();
  const rejectUpgradeRequest = useRejectUpgradeRequest();

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

  const handleApproveUpgrade = async (requestId: string) => {
    await approveUpgradeRequest.mutateAsync({ requestId, adminNotes });
    setAdminNotes('');
    setSelectedRequest(null);
  };

  const handleRejectUpgrade = async (requestId: string) => {
    await rejectUpgradeRequest.mutateAsync({ requestId, adminNotes: rejectReason });
    setRejectReason('');
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie usuários, anúncios e solicitações da plataforma</p>
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
              <CardTitle className="text-sm font-medium">Upgrades Pendentes</CardTitle>
              <UserPlus className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {statsLoading ? '...' : stats?.pendingUpgrades}
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
            <TabsTrigger value="upgrades">Upgrades Pendentes</TabsTrigger>
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

          <TabsContent value="upgrades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Solicitações de Upgrade para Anunciante</CardTitle>
                <CardDescription>
                  Revise e aprove ou rejeite as solicitações de usuários para se tornarem anunciantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upgradeRequestsLoading ? (
                  <p>Carregando...</p>
                ) : pendingUpgradeRequests?.length === 0 ? (
                  <p className="text-gray-500">Nenhuma solicitação pendente</p>
                ) : (
                  <div className="space-y-4">
                    {pendingUpgradeRequests?.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {request.profiles?.avatar_url && (
                                <img 
                                  src={request.profiles.avatar_url} 
                                  alt="Avatar" 
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              )}
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {request.profiles?.presentation_name || request.profiles?.full_name}
                                </h3>
                                <p className="text-sm text-gray-600">{request.profiles?.email}</p>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded mb-3">
                              <h4 className="font-medium text-sm text-gray-700 mb-1">Justificativa:</h4>
                              <p className="text-gray-800">{request.reason}</p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Solicitado em: {new Date(request.created_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <Badge variant="secondary">Pendente</Badge>
                        </div>

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline"
                                onClick={() => setSelectedRequest(request)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Analisar
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Analisar Solicitação de Upgrade</DialogTitle>
                              </DialogHeader>
                              {selectedRequest && (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3">
                                    {selectedRequest.profiles?.avatar_url && (
                                      <img 
                                        src={selectedRequest.profiles.avatar_url} 
                                        alt="Avatar" 
                                        className="w-16 h-16 rounded-full object-cover"
                                      />
                                    )}
                                    <div>
                                      <h3 className="font-semibold text-lg">
                                        {selectedRequest.profiles?.presentation_name || selectedRequest.profiles?.full_name}
                                      </h3>
                                      <p className="text-gray-600">{selectedRequest.profiles?.email}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-4 rounded">
                                    <h4 className="font-medium mb-2">Justificativa do usuário:</h4>
                                    <p className="text-gray-800">{selectedRequest.reason}</p>
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-2">
                                        Notas do Administrador
                                      </label>
                                      <Textarea
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Adicione observações sobre esta solicitação..."
                                      />
                                    </div>

                                    <div className="flex gap-2">
                                      <Button 
                                        onClick={() => handleApproveUpgrade(selectedRequest.id)}
                                        disabled={approveUpgradeRequest.isPending}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Aprovar Upgrade
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
                                            <DialogTitle>Rejeitar Solicitação</DialogTitle>
                                          </DialogHeader>
                                          <div className="space-y-4">
                                            <Textarea
                                              value={rejectReason}
                                              onChange={(e) => setRejectReason(e.target.value)}
                                              placeholder="Motivo da rejeição..."
                                            />
                                            <Button 
                                              onClick={() => handleRejectUpgrade(selectedRequest.id)}
                                              disabled={rejectUpgradeRequest.isPending}
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
