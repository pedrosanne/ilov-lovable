
import { Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CreateAdHeaderProps {
  xp: number;
  level: number;
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
}

export function CreateAdHeader({ xp, level, progress }: CreateAdHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className="mb-6 md:mb-8">
      <div className="text-center mb-4 md:mb-6">
        <div className={`flex items-center justify-center space-x-2 mb-3 md:mb-4 ${isMobile ? 'flex-col space-y-2 space-x-0' : ''}`}>
          <Sparkles className={`text-purple-500 ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
          <h1 className={`font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${
            isMobile ? 'text-2xl' : 'text-4xl'
          }`}>
            Criar Novo Anúncio
          </h1>
          <Sparkles className={`text-purple-500 ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
        </div>
        <p className={`text-gray-600 ${isMobile ? 'text-base px-4' : 'text-lg'}`}>
          Transforme seu perfil em um anúncio incrível! 🚀
        </p>
      </div>
    </div>
  );
}
