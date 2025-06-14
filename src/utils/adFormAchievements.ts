
import { AdFormDataV2 } from '@/types/adFormV2';

export const checkAchievements = (data: AdFormDataV2, unlockAchievement: (id: string) => void) => {
  // First photo achievement
  if (data.photos.length > 0) {
    unlockAchievement('first_impression');
  }
  
  // Complete description achievement
  if (data.description.length >= 100) {
    unlockAchievement('storyteller');
  }
  
  // Premium package achievement
  if (data.highlight_package !== 'basic') {
    unlockAchievement('premium_member');
  }
  
  // Media master achievement
  if (data.photos.length >= 5) {
    unlockAchievement('media_master');
  }
  
  // Contact ready achievement - since WhatsApp is the only contact method and it's required
  if (data.whatsapp && data.whatsapp.trim() !== '') {
    unlockAchievement('social_butterfly');
  }
};
