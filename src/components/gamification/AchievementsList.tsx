
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Achievement } from '@/hooks/useGamification';
import { CheckCircle, Circle } from 'lucide-react';

interface AchievementsListProps {
  achievements: Achievement[];
  unlockedCount: number;
  currentStep?: number;
}

export function AchievementsList({ achievements, unlockedCount, currentStep }: AchievementsListProps) {
  const sortedAchievements = achievements.sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Progresso das Etapas</span>
          <Badge variant="secondary" className="text-xs">
            {unlockedCount}/7
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {sortedAchievements.map((achievement) => {
            const isCurrentStep = currentStep === achievement.stepNumber;
            const isCompleted = achievement.unlocked;
            const isPending = !isCompleted && currentStep && achievement.stepNumber > currentStep;
            
            return (
              <div 
                key={achievement.id}
                className={`p-3 rounded-lg border transition-all ${
                  isCompleted
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : isCurrentStep
                      ? 'bg-blue-50 border-blue-200 text-blue-800 ring-2 ring-blue-300'
                      : isPending
                        ? 'bg-gray-50 border-gray-200 text-gray-400'
                        : 'bg-yellow-50 border-yellow-200 text-yellow-800'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : isCurrentStep ? (
                      <div className="h-5 w-5 rounded-full bg-blue-500 animate-pulse" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-lg">{achievement.icon}</span>
                    <Badge 
                      variant={isCompleted ? "default" : isCurrentStep ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {achievement.stepNumber}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {achievement.title}
                    </div>
                    <div className="text-xs opacity-75 line-clamp-2 leading-tight mt-1">
                      {achievement.description}
                    </div>
                    {isCompleted && (
                      <Badge className="mt-2 text-xs px-2 py-0.5 bg-green-600">
                        +{achievement.xpReward} XP ✓
                      </Badge>
                    )}
                    {isCurrentStep && !isCompleted && (
                      <Badge className="mt-2 text-xs px-2 py-0.5 bg-blue-600">
                        Em andamento...
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
