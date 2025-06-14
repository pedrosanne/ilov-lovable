
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

interface XPBarProps {
  xp: number;
  level: number;
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
}

export function XPBar({ xp, level, progress }: XPBarProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-lg text-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-300" />
          <span className="font-bold">Level {level}</span>
        </div>
        <Badge variant="secondary" className="bg-white/20 text-white">
          {xp} XP
        </Badge>
      </div>
      
      <div className="space-y-2">
        <Progress 
          value={progress.percentage} 
          className="bg-white/20" 
        />
        <div className="flex justify-between text-sm">
          <span>{progress.current} XP</span>
          <span>{progress.total} XP para Level {level + 1}</span>
        </div>
      </div>
    </div>
  );
}
