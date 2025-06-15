import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, FileText, CheckCircle, AlertCircle, Shield, Eye, Calendar, User } from 'lucide-react';
import { useAdminStats, usePendingAds, usePendingDocuments, useApproveAd, useRejectAd, usePendingUpgradeRequests, useApproveUpgradeRequest, useRejectUpgradeRequest } from '@/hooks/useAdminData';
import { VerificationReview } from '@/components/admin/VerificationReview';
import { AdminCharts } from '@/components/admin/AdminCharts';
import { DetailedStats } from '@/components/admin/DetailedStats';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [rejectionReason, setRejectionReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const { data: stats } = useAdminStats();
  const { data: pendingAds } = usePendingAds();
  const { data: pendingDocuments } = usePendingDocuments();
  const { data: pendingUpgradeRequests } = usePendingUpgradeRequests();
  const approveAd = useApproveAd();
  const rejectAd = useRejectAd();
  const approveUpgradeRequest = useApproveUpgradeRequest();
  const rejectUpgradeRequest = useRejectUpgradeRequest();

  const handleApproveAd = (adId: string) => {
    approveAd.mutate({ adId, adminNotes });
    setAdminNotes('');
  };

  const handleRejectAd = (adId: string) => {
    rejectAd.mutate({ adId, reason: rejectionReason });
    setRejectionReason('');
  };

  const handleApproveUpgrade = (requestId: string) => {
    approveUpgradeRequest.mutate({ requestId, adminNotes });
    setAdminNotes('');
  };

  const handleRejectUpgrade = (requestId: string) => {
    rejectUpgradeRequest.mutate({ requestId, adminNotes: rejectionReason });
    setRejectionReason('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600 mt-2">Gerencie usuários, anúncios e solicitações com insights detalhados</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <TabsList className="w-full flex min-w-max">
              <TabsTrigger value="overview" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-3">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="ads" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-3">
                Anúncios
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-3">
                Documentos
              </TabsTrigger>
              <TabsTrigger value="upgrades" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-3">
                Upgrades
              </TabsTrigger>
              <TabsTrigger value="verifications" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-3">
                Verificações
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Estatísticas Básicas - Layout mais compacto */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-muted-foreground">Total de Usuários</span>
                  <Users className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="text-xl font-bold">{stats?.totalUsers || 0}</div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-muted-foreground">Anúncios Pendentes</span>
                  <AlertCircle className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="text-xl font-bold text-orange-600">{stats?.pendingAds || 0}</div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-muted-foreground">Anúncios Ativos</span>
                  <CheckCircle className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="text-xl font-bold text-green-600">{stats?.activeAds || 0}</div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-muted-foreground">Upgrades Pendentes</span>
                  <Shield className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="text-xl font-bold text-blue-600">{stats?.pendingUpgrades || 0}</div>
              </Card>
            </div>

            {/* Estatísticas Detalhadas */}
            <DetailedStats />

            {/* Gráficos */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Análise de Tendências</h2>
              <AdminCharts />
            </div>
          </TabsContent>

          <TabsContent value="ads">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Anúncios Pendentes ({pendingAds?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!pendingAds || pendingAds.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum anúncio pendente no momento.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingAds.map((ad: any) => (
                      <Card key={ad.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={ad.profiles?.avatar_url} />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{ad.title}</h3>
                                <p className="text-sm text-gray-600">{ad.profiles?.full_name}</p>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {format(new Date(ad.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleApproveAd(ad.id)}>
                                Aprovar
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    Rejeitar
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Rejeitar Anúncio</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Informe o motivo da rejeição para que o usuário possa corrigir:
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="my-4">
                                    <Textarea
                                      placeholder="Motivo da rejeição..."
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleRejectAd(ad.id)}
                                      disabled={!rejectionReason.trim()}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Rejeitar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Solicitações de Upgrade Pendentes ({pendingDocuments?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!pendingDocuments || pendingDocuments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nenhuma solicitação pendente no momento.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingDocuments.map((request: any) => (
                      <Card key={request.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={request.profiles?.avatar_url} />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{request.profiles?.full_name}</h3>
                                <p className="text-sm text-gray-600">{request.profiles?.email}</p>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {format(new Date(request.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveUpgrade(request.id)}
                              >
                                Aprovar
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    Rejeitar
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Rejeitar Solicitação</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Informe o motivo da rejeição:
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="my-4">
                                    <Textarea
                                      placeholder="Motivo da rejeição..."
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleRejectUpgrade(request.id)}
                                      disabled={!rejectionReason.trim()}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Rejeitar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upgrades">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Solicitações de Upgrade Pendentes ({pendingUpgradeRequests?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!pendingUpgradeRequests || pendingUpgradeRequests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nenhuma solicitação de upgrade pendente no momento.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingUpgradeRequests.map((request: any) => (
                      <Card key={request.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={request.profiles?.avatar_url} />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{request.profiles?.full_name}</h3>
                                <p className="text-sm text-gray-600">{request.profiles?.email}</p>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {format(new Date(request.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveUpgrade(request.id)}
                              >
                                Aprovar
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    Rejeitar
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Rejeitar Solicitação</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Informe o motivo da rejeição:
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="my-4">
                                    <Textarea
                                      placeholder="Motivo da rejeição..."
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleRejectUpgrade(request.id)}
                                      disabled={!rejectionReason.trim()}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Rejeitar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verifications">
            <VerificationReview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
