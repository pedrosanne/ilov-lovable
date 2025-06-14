
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Achievement } from '@/hooks/useGamification';

interface AchievementNotificationProps {
  achievements: Achievement[];
  onClear: () => void;
}

export function AchievementNotification({ achievements, onClear }: AchievementNotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (achievements.length > 0) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClear, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [achievements, onClear]);

  if (achievements.length === 0) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      {achievements.map((achievement) => (
        <Card key={achievement.id} className="p-4 mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <h3 className="font-bold">Conquista Desbloqueada!</h3>
              <p className="text-sm">{achievement.title}</p>
              <p className="text-xs opacity-90">+{achievement.xpReward} XP</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
