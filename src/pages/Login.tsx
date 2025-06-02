
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { Heart, Users, UserPlus } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';
import { ContractorSignupForm } from '@/components/auth/ContractorSignupForm';
import { AdvertiserSignupForm } from '@/components/auth/AdvertiserSignupForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Bem-vindo ao iLove!</h1>
            <p className="text-gray-600 text-lg">
              Sua plataforma de encontros profissional
            </p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="pb-4">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="signin" className="text-sm">
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger value="contractor" className="text-sm">
                    Contratante
                  </TabsTrigger>
                  <TabsTrigger value="advertiser" className="text-sm">
                    Anunciante
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="mt-0">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Entrar na sua conta
                  </CardTitle>
                  <CardDescription>
                    Digite suas credenciais para acessar sua conta
                  </CardDescription>
                </TabsContent>
                
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
              <Tabs defaultValue="signin" className="w-full">
                <TabsContent value="signin" className="mt-0">
                  <LoginForm />
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Não tem uma conta?{' '}
                      <span className="text-red-500 font-medium">
                        Use as abas acima para se cadastrar
                      </span>
                    </p>
                  </div>
                </TabsContent>
                
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

export default Login;
