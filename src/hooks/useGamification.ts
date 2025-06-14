
import { useState, useCallback } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  xpReward: number;
  stepNumber: number;
}

export interface GamificationState {
  xp: number;
  level: number;
  achievements: Achievement[];
  newAchievements: Achievement[];
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'step_1',
    title: 'Etapa 1 - Quem é você?',
    description: 'Complete suas informações pessoais',
    icon: '🎭',
    unlocked: false,
    xpReward: 50,
    stepNumber: 1
  },
  {
    id: 'step_2',
    title: 'Etapa 2 - Seus serviços',
    description: 'Defina os serviços que oferece',
    icon: '💼',
    unlocked: false,
    xpReward: 50,
    stepNumber: 2
  },
  {
    id: 'step_3',
    title: 'Etapa 3 - Seus valores',
    description: 'Configure seus preços',
    icon: '💰',
    unlocked: false,
    xpReward: 50,
    stepNumber: 3
  },
  {
    id: 'step_4',
    title: 'Etapa 4 - Sua vitrine',
    description: 'Adicione fotos e vídeos',
    icon: '📸',
    unlocked: false,
    xpReward: 50,
    stepNumber: 4
  },
  {
    id: 'step_5',
    title: 'Etapa 5 - Como te encontrar',
    description: 'Configure suas formas de contato',
    icon: '📞',
    unlocked: false,
    xpReward: 50,
    stepNumber: 5
  },
  {
    id: 'step_6',
    title: 'Etapa 6 - Sua voz',
    description: 'Grave um áudio de apresentação',
    icon: '🎤',
    unlocked: false,
    xpReward: 50,
    stepNumber: 6
  },
  {
    id: 'step_7',
    title: 'Etapa 7 - Finalizando',
    description: 'Confirme os termos e publique',
    icon: '✨',
    unlocked: false,
    xpReward: 100,
    stepNumber: 7
  }
];

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

const getXpForNextLevel = (level: number): number => {
  return level * 100;
};

export function useGamification() {
  const [state, setState] = useState<GamificationState>({
    xp: 0,
    level: 1,
    achievements: ACHIEVEMENTS,
    newAchievements: []
  });

  const addXP = useCallback((amount: number, reason?: string) => {
    setState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      
      console.log(`+${amount} XP${reason ? ` - ${reason}` : ''}`);
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setState(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId);
      if (!achievement || achievement.unlocked) return prev;

      const updatedAchievements = prev.achievements.map(a => 
        a.id === achievementId ? { ...a, unlocked: true } : a
      );

      const newXP = prev.xp + achievement.xpReward;
      const newLevel = calculateLevel(newXP);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        achievements: updatedAchievements,
        newAchievements: [achievement, ...prev.newAchievements]
      };
    });
  }, []);

  const clearNewAchievements = useCallback(() => {
    setState(prev => ({ ...prev, newAchievements: [] }));
  }, []);

  const getProgress = useCallback(() => {
    const currentLevelXP = (state.level - 1) * 100;
    const nextLevelXP = state.level * 100;
    const progressXP = state.xp - currentLevelXP;
    const neededXP = nextLevelXP - currentLevelXP;
    
    return {
      current: progressXP,
      total: neededXP,
      percentage: (progressXP / neededXP) * 100
    };
  }, [state.xp, state.level]);

  return {
    ...state,
    addXP,
    unlockAchievement,
    clearNewAchievements,
    getProgress,
    xpForNextLevel: getXpForNextLevel(state.level),
    unlockedCount: state.achievements.filter(a => a.unlocked).length
  };
}
