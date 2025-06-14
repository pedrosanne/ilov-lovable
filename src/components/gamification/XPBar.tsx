
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface XPBarProps {
  xp: number;
  level: number;
  currentLevelProgress: number;
}

export function XPBar({ xp, level, currentLevelProgress }: XPBarProps) {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-purple-500 text-white">
            Nível {level}
          </Badge>
          <span className="text-sm font-medium text-gray-700">
            {xp} XP total
          </span>
        </div>
        <div className="text-sm text-gray-600">
          {Math.floor(currentLevelProgress)}% para próximo nível
        </div>
      </div>
      <Progress value={currentLevelProgress} className="h-3" />
    </div>
  );
}
