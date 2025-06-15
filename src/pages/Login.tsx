
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Heart } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Entrar no iLove</h1>
            <p className="text-gray-600 text-lg">
              Acesse sua conta
            </p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Fazer Login
              </CardTitle>
              <CardDescription>
                Digite suas credenciais para acessar sua conta
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <LoginForm />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link to="/signup" className="text-red-500 font-medium hover:underline">
                    Cadastre-se aqui
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Ao fazer login, você concorda com nossos{' '}
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
      </main>

      <Footer />
    </div>
  );
};

export default Login;
