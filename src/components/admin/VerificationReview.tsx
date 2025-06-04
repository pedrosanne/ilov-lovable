
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Shield, Check, X, Eye, User, Calendar, FileText } from 'lucide-react';
import { useAdminVerifications } from '@/hooks/useIdentityVerification';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function VerificationReview() {
  const { pendingVerifications, isLoading, reviewVerification } = useAdminVerifications();
  const [selectedVerification, setSelectedVerification] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  if (isLoading) {
    return <div>Carregando verificações...</div>;
  }

  const handleApprove = (verificationId: string) => {
    reviewVerification.mutate({
      verificationId,
      status: 'approved'
    });
  };

  const handleReject = (verificationId: string, reason: string) => {
    reviewVerification.mutate({
      verificationId,
      status: 'rejected',
      rejectionReason: reason
    });
    setRejectionReason('');
  };

  const getDocumentTypeLabel = (type: string) => {
    const types = {
      'rg': 'RG',
      'cnh': 'CNH',
      'passport': 'Passaporte'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Verificações Pendentes ({pendingVerifications?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!pendingVerifications || pendingVerifications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma verificação pendente no momento.
            </p>
          ) : (
            <div className="space-y-4">
              {pendingVerifications.map((verification: any) => (
                <Card key={verification.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={verification.profiles?.avatar_url} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{verification.profiles?.full_name}</h3>
                          <p className="text-sm text-gray-600">{verification.profiles?.email}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="outline">
                              {getDocumentTypeLabel(verification.document_type)}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {format(new Date(verification.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedVerification(verification)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Revisar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Revisão de Verificação - {verification.profiles?.full_name}</DialogTitle>
                            </DialogHeader>
                            {selectedVerification && (
                              <VerificationDetails 
                                verification={selectedVerification} 
                                onApprove={handleApprove}
                                onReject={handleReject}
                                rejectionReason={rejectionReason}
                                setRejectionReason={setRejectionReason}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface VerificationDetailsProps {
  verification: any;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
}

function VerificationDetails({ 
  verification, 
  onApprove, 
  onReject, 
  rejectionReason, 
  setRejectionReason 
}: VerificationDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Informações do usuário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Informações do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome Completo</Label>
              <p className="text-sm">{verification.profiles?.full_name}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-sm">{verification.profiles?.email}</p>
            </div>
            <div>
              <Label>Tipo de Documento</Label>
              <Badge variant="outline">
                {verification.document_type === 'rg' && 'RG'}
                {verification.document_type === 'cnh' && 'CNH'}
                {verification.document_type === 'passport' && 'Passaporte'}
              </Badge>
            </div>
            <div>
              <Label>Data de Envio</Label>
              <p className="text-sm">
                {format(new Date(verification.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Documentos Enviados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Frente do Documento</Label>
              <img 
                src={verification.document_front_url} 
                alt="Frente do documento"
                className="w-full h-48 object-cover border rounded"
              />
            </div>
            
            {verification.document_back_url && (
              <div>
                <Label>Verso do Documento</Label>
                <img 
                  src={verification.document_back_url} 
                  alt="Verso do documento"
                  className="w-full h-48 object-cover border rounded"
                />
              </div>
            )}
            
            <div>
              <Label>Selfie com Documento</Label>
              <img 
                src={verification.selfie_with_document_url} 
                alt="Selfie com documento"
                className="w-full h-48 object-cover border rounded"
              />
            </div>
            
            <div>
              <Label>Vídeo de Verificação</Label>
              <video 
                src={verification.verification_video_url} 
                controls
                className="w-full h-48 border rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <Card>
        <CardHeader>
          <CardTitle>Ação de Revisão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button 
              onClick={() => onApprove(verification.id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Aprovar Verificação
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Rejeitar Verificação
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Rejeitar Verificação</AlertDialogTitle>
                  <AlertDialogDescription>
                    Por favor, informe o motivo da rejeição para que o usuário possa corrigir:
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
                    onClick={() => onReject(verification.id, rejectionReason)}
                    disabled={!rejectionReason.trim()}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Rejeitar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
