
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Heart } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full mb-6 shadow-lg">
              <Heart className="h-10 w-10 text-white" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Entrar no iLove
            </h1>
            <p className="text-gray-600 text-lg">
              Acesse sua conta e encontre conexões especiais
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-scale-in">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                Fazer Login
              </CardTitle>
              <CardDescription className="text-gray-600">
                Digite suas credenciais para acessar sua conta
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <LoginForm />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link 
                    to="/signup" 
                    className="text-transparent bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text font-medium hover:from-teal-600 hover:to-cyan-600 transition-all duration-200"
                  >
                    Cadastre-se aqui
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center animate-fade-in">
            <p className="text-sm text-gray-500">
              Ao fazer login, você concorda com nossos{' '}
              <Link to="/terms" className="text-teal-500 hover:text-teal-600 transition-colors">
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link to="/privacy" className="text-teal-500 hover:text-teal-600 transition-colors">
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

export default Login;
