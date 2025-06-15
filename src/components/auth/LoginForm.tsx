
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { useNavigate } from 'react-router-dom';
import { HeartPreloader } from '@/components/ui/heart-preloader';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error signing in:', error);
      setError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          {...register('email')}
          className={`transition-all duration-200 ${
            errors.email 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-200 focus:border-teal-400 focus:ring-teal-100'
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500 animate-fade-in">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Sua senha"
            {...register('password')}
            className={`pr-12 transition-all duration-200 ${
              errors.password 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-200 focus:border-teal-400 focus:ring-teal-100'
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 animate-fade-in">{errors.password.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <HeartPreloader size={24} className="mr-2" />
            Entrando...
          </div>
        ) : (
          'Entrar'
        )}
      </Button>
    </form>
  );
}
