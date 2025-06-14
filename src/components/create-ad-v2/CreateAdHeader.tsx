
import { Sparkles } from 'lucide-react';
import { XPBar } from '@/components/gamification/XPBar';

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
  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-8 w-8 text-purple-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Criar Novo Anúncio
          </h1>
          <Sparkles className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-gray-600 text-lg">
          Transforme seu perfil em um anúncio incrível! 🚀
        </p>
      </div>

      <XPBar 
        xp={xp}
        level={level}
        progress={progress}
      />
    </div>
  );
}
