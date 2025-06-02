
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { Heart, Users, UserPlus } from 'lucide-react';
import { ContractorSignupForm } from '@/components/auth/ContractorSignupForm';
import { AdvertiserSignupForm } from '@/components/auth/AdvertiserSignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Cadastrar no iLove</h1>
            <p className="text-gray-600 text-lg">
              Crie sua conta e comece agora
            </p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="pb-4">
              <Tabs defaultValue="contractor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="contractor" className="text-sm">
                    Contratante
                  </TabsTrigger>
                  <TabsTrigger value="advertiser" className="text-sm">
                    Anunciante
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="contractor" className="mt-0">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Cadastro de Contratante
                  </CardTitle>
                  <CardDescription>
                    Crie sua conta para encontrar e contratar serviços
                  </CardDescription>
                </TabsContent>
                
                <TabsContent value="advertiser" className="mt-0">
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-purple-500" />
                    Cadastro de Anunciante
                  </CardTitle>
                  <CardDescription>
                    Crie sua conta para anunciar seus serviços
                  </CardDescription>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardContent className="pt-0">
              <Tabs defaultValue="contractor" className="w-full">
                <TabsContent value="contractor" className="mt-0">
                  <ContractorSignupForm />
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Como Contratante você pode:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Navegar e visualizar anúncios</li>
                      <li>• Entrar em contato com anunciantes</li>
                      <li>• Avaliar serviços contratados</li>
                      <li>• Gerenciar suas conversas</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="advertiser" className="mt-0">
                  <AdvertiserSignupForm />
                  
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Como Anunciante você pode:</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Criar e gerenciar seus anúncios</li>
                      <li>• Receber mensagens de clientes</li>
                      <li>• Configurar preços e disponibilidade</li>
                      <li>• Acompanhar estatísticas</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-red-500 font-medium hover:underline">
                    Faça login aqui
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Ao criar uma conta, você concorda com nossos{' '}
              <Link to="/terms" className="text-red-500 hover:underline">
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link to="/privacy" className="text-red-500 hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
