
import { useState, useCallback, useEffect } from 'react';
import { useCreateAd } from '@/hooks/useAds';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useGamification } from './useGamification';
import { AdFormDataV2, initialFormData } from '@/types/adFormV2';
import { isStepValid } from '@/utils/adFormValidation';
import { calculateCompletionPercentage } from '@/utils/adFormCompletion';

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
      
      return newData;
    });
  }, [gamification]);

  // Calculate completion percentage
  useEffect(() => {
    const percentage = calculateCompletionPercentage(formData);
    setCompletionPercentage(percentage);
  }, [formData]);

  const validateStep = useCallback((step: number): boolean => {
    return isStepValid(step, formData);
  }, [formData]);

  const submitAd = async () => {
    if (!user || !validateStep(7)) return;

    // Award final XP
    gamification.addXP(200, 'Anúncio publicado com sucesso!');

    const adData = {
      user_id: user.id,
      ...formData,
      // Garantir que price seja null se não foi preenchido
      price: formData.price && formData.price > 0 ? formData.price : null,
      status: 'pending_approval' as const,
    };

    await createAd.mutateAsync(adData);
    navigate('/dashboard');
  };

  return {
    formData,
    updateFormData,
    isStepValid: validateStep,
    submitAd,
    isSubmitting: createAd.isPending,
    completionPercentage,
    gamification
  };
}
