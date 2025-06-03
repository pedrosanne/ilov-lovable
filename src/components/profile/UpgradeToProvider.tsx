
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, Star, TrendingUp, Shield, UserPlus, Clock, AlertCircle } from 'lucide-react';
import { useProviderUpgradeRequest } from '@/hooks/useProviderUpgrade';

export function UpgradeToProvider() {
  const [reason, setReason] = useState('');
  const { currentRequest, createRequest, hasRequestPending } = useProviderUpgradeRequest();

  const handleSubmitRequest = () => {
    if (reason.trim()) {
      createRequest.mutate({ reason: reason.trim() });
      setReason('');
    }
  };

  const benefits = [
    "Criar anúncios ilimitados",
    "Acesso a métricas detalhadas",
    "Perfil destacado nos resultados",
    "Sistema de mensagens diretas",
    "Suporte prioritário",
    "Ferramenta de agendamento",
    "Histórico de clientes",
    "Relatórios de desempenho"
  ];

  // Se já tem uma solicitação pendente
  if (hasRequestPending) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <Clock className="h-6 w-6 mr-3" />
              Solicitação em Análise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900">Aguardando Aprovação</h4>
                <p className="text-orange-700 mt-1">
                  Sua solicitação para se tornar anunciante foi enviada em{' '}
                  {new Date(currentRequest?.created_at || '').toLocaleDateString('pt-BR')} e está 
                  sendo analisada pela nossa equipe.
                </p>
                <p className="text-sm text-orange-600 mt-2">
                  <strong>Sua justificativa:</strong> "{currentRequest?.reason}"
                </p>
              </div>
            </div>
            
            <div className="bg-white/50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">O que acontece agora?</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Nossa equipe irá analisar sua solicitação</li>
                <li>• Verificaremos se seu perfil atende aos requisitos</li>
                <li>• Você receberá uma notificação sobre o resultado</li>
                <li>• O processo pode levar até 72 horas</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
            <UserPlus className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Solicitar Perfil de Anunciante
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Envie uma solicitação para nossa equipe e, após aprovação, poderá criar anúncios 
          profissionais e alcançar milhares de clientes potenciais.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <Star className="h-5 w-5 mr-2" />
              Benefícios Exclusivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <TrendingUp className="h-5 w-5 mr-2" />
                Potencial de Crescimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Clientes mensais</span>
                  <Badge variant="secondary">+500%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Visibilidade</span>
                  <Badge variant="secondary">+300%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Conversões</span>
                  <Badge variant="secondary">+250%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-600">
                <Shield className="h-5 w-5 mr-2" />
                Segurança e Confiança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Verificação de identidade</li>
                <li>• Sistema de avaliações</li>
                <li>• Proteção de dados</li>
                <li>• Suporte 24/7</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Solicitação */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-900">
            Solicitar Aprovação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="reason" className="text-base font-medium">
              Por que você quer se tornar um anunciante?
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Conte-nos sobre sua experiência, serviços que pretende oferecer, e por que deseja anunciar na nossa plataforma..."
              className="mt-2 min-h-[120px]"
              maxLength={500}
            />
            <p className="text-sm text-gray-500 mt-1">
              {reason.length}/500 caracteres
            </p>
          </div>

          <div className="bg-white/70 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Processo de Aprovação</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Análise do perfil e justificativa</li>
              <li>• Verificação de documentos (se necessário)</li>
              <li>• Resposta em até 72 horas</li>
              <li>• Notificação por email sobre o resultado</li>
            </ul>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            onClick={handleSubmitRequest}
            disabled={!reason.trim() || createRequest.isPending}
          >
            {createRequest.isPending ? (
              "Enviando Solicitação..."
            ) : (
              "Enviar Solicitação para Análise"
            )}
          </Button>
          
          <p className="text-sm text-gray-500 text-center">
            Ao enviar, você concorda com nossos termos para anunciantes
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
