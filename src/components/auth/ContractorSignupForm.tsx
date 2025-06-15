
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, User, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { contractorSignupSchema, type ContractorSignupFormData } from '@/lib/validations/auth';
import { HeartPreloader } from '@/components/ui/heart-preloader';

export function ContractorSignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContractorSignupFormData>({
    resolver: zodResolver(contractorSignupSchema),
    defaultValues: {
      userType: 'contractor',
    },
  });

  const onSubmit = async (data: ContractorSignupFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await signUp(data.email, data.password, data.fullName);
      setSuccess(true);
      reset();
    } catch (error: any) {
      console.error('Error signing up:', error);
      setError(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <AlertDescription className="text-green-800 font-medium">
          Conta criada com sucesso! Verifique seu email para confirmar a conta.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-gray-700 font-medium">Nome Completo</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Seu nome completo"
          {...register('fullName')}
          className={`transition-all duration-200 ${
            errors.fullName 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'
          }`}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500 animate-fade-in">{errors.fullName.message}</p>
        )}
      </div>
      
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
              : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'
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
            placeholder="Escolha uma senha (mín. 6 caracteres)"
            {...register('password')}
            className={`pr-12 transition-all duration-200 ${
              errors.password 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmar Senha</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            {...register('confirmPassword')}
            className={`pr-12 transition-all duration-200 ${
              errors.confirmPassword 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 animate-fade-in">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <HeartPreloader size={24} className="mr-2" />
            Criando conta...
          </div>
        ) : (
          'Criar Conta de Contratante'
        )}
      </Button>
    </form>
  );
}
