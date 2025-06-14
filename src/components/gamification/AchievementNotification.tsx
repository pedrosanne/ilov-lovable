
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
}

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{achievement.icon}</div>
          <div>
            <h3 className="font-bold">Conquista Desbloqueada!</h3>
            <p className="text-sm">{achievement.title}</p>
            <p className="text-xs opacity-90">+{achievement.xp} XP</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
