
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Heart, Users, UserPlus } from 'lucide-react';
import { ContractorSignupForm } from '@/components/auth/ContractorSignupForm';
import { AdvertiserSignupForm } from '@/components/auth/AdvertiserSignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-6 shadow-lg">
              <Heart className="h-10 w-10 text-white" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Cadastrar no iLove
            </h1>
            <p className="text-gray-600 text-lg">
              Crie sua conta e comece uma nova jornada
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-scale-in">
            <CardHeader className="pb-4">
              <Tabs defaultValue="contractor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/80 p-1 rounded-lg">
                  <TabsTrigger 
                    value="contractor" 
                    className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-200"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Contratante
                  </TabsTrigger>
                  <TabsTrigger 
                    value="advertiser" 
                    className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-200"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Anunciante
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="contractor" className="mt-0">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    Cadastro de Contratante
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    Crie sua conta para encontrar e contratar serviços
                  </CardDescription>
                </TabsContent>
                
                <TabsContent value="advertiser" className="mt-0">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    Cadastro de Anunciante
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    Crie sua conta para anunciar seus serviços
                  </CardDescription>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardContent className="pt-0">
              <Tabs defaultValue="contractor" className="w-full">
                <TabsContent value="contractor" className="mt-0">
                  <ContractorSignupForm />
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Como Contratante você pode:
                    </h4>
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
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Como Anunciante você pode:
                    </h4>
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
                  <Link 
                    to="/login" 
                    className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                  >
                    Faça login aqui
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center animate-fade-in">
            <p className="text-sm text-gray-500">
              Ao criar uma conta, você concorda com nossos{' '}
              <Link to="/terms" className="text-purple-500 hover:text-purple-600 transition-colors">
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link to="/privacy" className="text-purple-500 hover:text-purple-600 transition-colors">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
