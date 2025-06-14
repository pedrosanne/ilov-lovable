
import { useState, useCallback } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  xpReward: number;
}

export interface GamificationState {
  xp: number;
  level: number;
  achievements: Achievement[];
  newAchievements: Achievement[];
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_impression',
    title: 'Primeira Impressão',
    description: 'Adicionou sua primeira foto',
    icon: '🌟',
    unlocked: false,
    xpReward: 30
  },
  {
    id: 'storyteller',
    title: 'Contador de Histórias',
    description: 'Escreveu uma descrição completa',
    icon: '📝',
    unlocked: false,
    xpReward: 25
  },
  {
    id: 'premium_member',
    title: 'Membro Premium',
    description: 'Escolheu um pacote de destaque',
    icon: '💎',
    unlocked: false,
    xpReward: 40
  },
  {
    id: 'complete_profile',
    title: 'Perfil Completo',
    description: 'Preencheu 100% do anúncio',
    icon: '🔥',
    unlocked: false,
    xpReward: 50
  },
  {
    id: 'media_master',
    title: 'Mestre da Mídia',
    description: 'Adicionou 5 ou mais fotos',
    icon: '📸',
    unlocked: false,
    xpReward: 35
  },
  {
    id: 'social_butterfly',
    title: 'Borboleta Social',
    description: 'Adicionou 3 ou mais formas de contato',
    icon: '🦋',
    unlocked: false,
    xpReward: 20
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
