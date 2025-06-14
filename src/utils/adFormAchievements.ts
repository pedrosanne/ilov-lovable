
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
  
  // Social butterfly achievement
  const contactMethods = [data.whatsapp, data.contact_telegram, data.contact_instagram, data.contact_email]
    .filter(contact => contact && contact.trim() !== '').length;
  if (contactMethods >= 3) {
    unlockAchievement('social_butterfly');
  }
};
