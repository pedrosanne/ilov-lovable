
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Achievement } from '@/hooks/useGamification';

interface AchievementsListProps {
  achievements: Achievement[];
  unlockedCount: number;
}

export function AchievementsList({ achievements, unlockedCount }: AchievementsListProps) {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Conquistas</span>
          <Badge variant="secondary" className="text-xs">
            {unlockedCount}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-2 rounded-lg border transition-all ${
                achievement.unlocked 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <div className="flex items-start space-x-2">
                <div className="text-lg flex-shrink-0">{achievement.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{achievement.title}</div>
                  <div className="text-xs opacity-75 line-clamp-2 leading-tight">{achievement.description}</div>
                  {achievement.unlocked && (
                    <Badge className="mt-1 text-xs px-1 py-0">+{achievement.xpReward} XP</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
