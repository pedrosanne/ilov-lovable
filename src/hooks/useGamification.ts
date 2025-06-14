
import { useState } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  unlocked: boolean;
}

interface GamificationState {
  xp: number;
  level: number;
  achievements: Achievement[];
  completedFields: string[];
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_photo',
    title: 'Primeira Impressão',
    description: 'Adicionou sua primeira foto',
    icon: '🌟',
    xp: 20,
    unlocked: false
  },
  {
    id: 'storyteller',
    title: 'Contador de Histórias',
    description: 'Escreveu uma descrição completa',
    icon: '📝',
    xp: 30,
    unlocked: false
  },
  {
    id: 'premium_member',
    title: 'Membro Premium',
    description: 'Escolheu um pacote premium',
    icon: '💎',
    xp: 50,
    unlocked: false
  },
  {
    id: 'profile_complete',
    title: 'Perfil Completo',
    description: 'Preencheu 100% do perfil',
    icon: '🔥',
    xp: 100,
    unlocked: false
  },
  {
    id: 'media_master',
    title: 'Mestre da Mídia',
    description: 'Adicionou pelo menos 3 fotos',
    icon: '📸',
    xp: 40,
    unlocked: false
  }
];

export function useGamification() {
  const [state, setState] = useState<GamificationState>({
    xp: 0,
    level: 1,
    achievements: ACHIEVEMENTS,
    completedFields: []
  });

  const addXP = (amount: number, reason?: string) => {
    setState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });

    if (reason) {
      console.log(`+${amount} XP: ${reason}`);
    }
  };

  const completeField = (fieldId: string) => {
    setState(prev => {
      if (prev.completedFields.includes(fieldId)) return prev;
      
      const newCompletedFields = [...prev.completedFields, fieldId];
      addXP(10, `Campo preenchido: ${fieldId}`);
      
      return {
        ...prev,
        completedFields: newCompletedFields
      };
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setState(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          addXP(achievement.xp, `Conquista desbloqueada: ${achievement.title}`);
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });

      return {
        ...prev,
        achievements: updatedAchievements
      };
    });
  };

  const getProgressPercentage = () => {
    const totalFields = 20; // Estimativa de campos importantes
    return Math.min((state.completedFields.length / totalFields) * 100, 100);
  };

  const getCurrentLevelProgress = () => {
    const currentLevelXP = state.xp % 100;
    return (currentLevelXP / 100) * 100;
  };

  return {
    ...state,
    addXP,
    completeField,
    unlockAchievement,
    getProgressPercentage,
    getCurrentLevelProgress
  };
}
