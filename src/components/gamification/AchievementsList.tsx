
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Achievement } from '@/hooks/useGamification';

interface AchievementsListProps {
  achievements: Achievement[];
  unlockedCount: number;
}

export function AchievementsList({ achievements, unlockedCount }: AchievementsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Conquistas</span>
          <Badge variant="secondary">
            {unlockedCount}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-3 rounded-lg border text-center transition-all ${
                achievement.unlocked 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className="text-xs font-medium">{achievement.title}</div>
              <div className="text-xs opacity-75">{achievement.description}</div>
              {achievement.unlocked && (
                <Badge className="mt-1 text-xs">+{achievement.xpReward} XP</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
