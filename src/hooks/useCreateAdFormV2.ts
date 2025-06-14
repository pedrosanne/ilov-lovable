
import { useState, useCallback, useEffect } from 'react';
import { useCreateAd } from '@/hooks/useAds';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useGamification } from './useGamification';
import { Database } from '@/types/database';

type AdFormDataV2 = {
  // Step 1: Quem é você?
  presentation_name: string;
  age: number | null;
  gender: string;
  title: string;
  description: string;
  
  // Step 2: Seus serviços
  category: Database['public']['Tables']['ads']['Row']['category'];
  services_offered: string[];
  availability_days: string[];
  location: string;
  neighborhood: string;
  
  // Step 3: Seus valores
  price: number;
  hourly_rate: number | null;
  highlight_package: string;
  
  // Step 4: Sua vitrine
  photos: File[];
  videos: File[];
  image_url: string | null;
  video_url: string | null;
  
  // Step 5: Como te encontrar
  whatsapp: string;
  contact_telegram: string;
  contact_instagram: string;
  contact_email: string;
  
  // Step 6: Finalizando
  terms_accepted: boolean;
  age_confirmed: boolean;
  image_consent: boolean;
  restrictions: string;
  favorite_fragrance: string;
  favorite_drink: string;
};

const initialFormData: AdFormDataV2 = {
  presentation_name: '',
  age: null,
  gender: '',
  title: '',
  description: '',
  category: 'acompanhante',
  services_offered: [],
  availability_days: [],
  location: '',
  neighborhood: '',
  price: 0,
  hourly_rate: null,
  highlight_package: 'basic',
  photos: [],
  videos: [],
  image_url: null,
  video_url: null,
  whatsapp: '',
  contact_telegram: '',
  contact_instagram: '',
  contact_email: '',
  terms_accepted: false,
  age_confirmed: false,
  image_consent: false,
  restrictions: '',
  favorite_fragrance: '',
  favorite_drink: ''
};

export function useCreateAdFormV2() {
  const [formData, setFormData] = useState<AdFormDataV2>(initialFormData);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const { user } = useAuth();
  const createAd = useCreateAd();
  const navigate = useNavigate();
  const gamification = useGamification();

  const updateFormData = useCallback((updates: Partial<AdFormDataV2>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      
      // Award XP for field completion
      Object.keys(updates).forEach(key => {
        const oldValue = prev[key as keyof AdFormDataV2];
        const newValue = newData[key as keyof AdFormDataV2];
        
        // Check if field was completed
        if ((!oldValue || oldValue === '' || oldValue === 0 || (Array.isArray(oldValue) && oldValue.length === 0)) && 
            (newValue && newValue !== '' && newValue !== 0 && (!Array.isArray(newValue) || newValue.length > 0))) {
          gamification.addXP(10, `Campo ${key} preenchido`);
        }
      });
      
      // Check for achievements
      checkAchievements(newData);
      
      return newData;
    });
  }, [gamification]);

  const checkAchievements = useCallback((data: AdFormDataV2) => {
    // First photo achievement
    if (data.photos.length > 0) {
      gamification.unlockAchievement('first_impression');
    }
    
    // Complete description achievement
    if (data.description.length >= 100) {
      gamification.unlockAchievement('storyteller');
    }
    
    // Premium package achievement
    if (data.highlight_package !== 'basic') {
      gamification.unlockAchievement('premium_member');
    }
    
    // Media master achievement
    if (data.photos.length >= 5) {
      gamification.unlockAchievement('media_master');
    }
    
    // Social butterfly achievement
    const contactMethods = [data.whatsapp, data.contact_telegram, data.contact_instagram, data.contact_email]
      .filter(contact => contact && contact.trim() !== '').length;
    if (contactMethods >= 3) {
      gamification.unlockAchievement('social_butterfly');
    }
  }, [gamification]);

  // Calculate completion percentage
  useEffect(() => {
    const requiredFields = [
      'presentation_name', 'age', 'gender', 'title', 'description',
      'services_offered', 'location', 'price', 'whatsapp',
      'terms_accepted', 'age_confirmed', 'image_consent'
    ];
    
    let completed = 0;
    requiredFields.forEach(field => {
      const value = formData[field as keyof AdFormDataV2];
      if (value && value !== '' && value !== 0 && value !== false && 
          (!Array.isArray(value) || value.length > 0)) {
        completed++;
      }
    });
    
    const percentage = Math.round((completed / requiredFields.length) * 100);
    setCompletionPercentage(percentage);
    
    // Complete profile achievement
    if (percentage === 100) {
      gamification.unlockAchievement('complete_profile');
    }
  }, [formData, gamification]);

  const isStepValid = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.presentation_name && formData.age && formData.gender && formData.title);
      case 2:
        return !!(formData.services_offered.length > 0 && formData.location);
      case 3:
        return formData.price > 0;
      case 4:
        return true; // Optional step
      case 5:
        return !!formData.whatsapp;
      case 6:
        return formData.terms_accepted && formData.age_confirmed && formData.image_consent;
      default:
        return false;
    }
  }, [formData]);

  const submitAd = async () => {
    if (!user || !isStepValid(6)) return;

    // Award final XP
    gamification.addXP(200, 'Anúncio publicado com sucesso!');

    const adData = {
      user_id: user.id,
      ...formData,
      status: 'pending_approval' as const,
    };

    await createAd.mutateAsync(adData);
    navigate('/dashboard');
  };

  return {
    formData,
    updateFormData,
    isStepValid,
    submitAd,
    isSubmitting: createAd.isPending,
    completionPercentage,
    gamification
  };
}
