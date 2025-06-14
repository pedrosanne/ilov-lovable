
import { useState } from 'react';
import { useCreateAd } from '@/hooks/useAds';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useGamification } from '@/hooks/useGamification';
import { Database } from '@/types/database';

type AdFormData = {
  // Informações Pessoais
  presentation_name: string;
  age: number | null;
  gender: string;
  ethnicity: string;
  height: number | null;
  weight: number | null;
  body_type: string;
  languages: string[];

  // Descrição
  title: string;
  description: string;
  highlight_phrase: string;

  // Serviços
  category: Database['public']['Tables']['ads']['Row']['category'];
  services_offered: string[];
  target_audience: string[];
  service_locations: string[];

  // Disponibilidade
  availability_days: string[];
  availability_hours: any;
  appointment_only: boolean;

  // Localização
  location: string;
  neighborhood: string;
  postal_code: string;
  accepts_travel: boolean;

  // Valores
  price: number;
  hourly_rate: number | null;
  packages: any;
  payment_methods: string[];

  // Mídias
  uploaded_photos: string[];
  uploaded_videos: string[];

  // Contato
  whatsapp: string;
  contact_telegram: string;
  contact_instagram: string;
  contact_email: string;
  contact_other: string;

  // Segurança
  terms_accepted: boolean;
  age_confirmed: boolean;
  image_consent: boolean;

  // Preferências
  accepts_last_minute: boolean;
  restrictions: string;
  personal_rules: string;

  // Extras
  favorite_fragrance: string;
  favorite_drink: string;
  preferred_gifts: string;
  favorite_music: string;

  // Destaque
  highlight_package: string;
};

const initialFormData: AdFormData = {
  presentation_name: '',
  age: null,
  gender: '',
  ethnicity: '',
  height: null,
  weight: null,
  body_type: '',
  languages: [],
  title: '',
  description: '',
  highlight_phrase: '',
  category: 'acompanhante',
  services_offered: [],
  target_audience: [],
  service_locations: [],
  availability_days: [],
  availability_hours: {},
  appointment_only: false,
  location: '',
  neighborhood: '',
  postal_code: '',
  accepts_travel: false,
  price: 0,
  hourly_rate: null,
  packages: {},
  payment_methods: [],
  uploaded_photos: [],
  uploaded_videos: [],
  whatsapp: '',
  contact_telegram: '',
  contact_instagram: '',
  contact_email: '',
  contact_other: '',
  terms_accepted: false,
  age_confirmed: false,
  image_consent: false,
  accepts_last_minute: false,
  restrictions: '',
  personal_rules: '',
  favorite_fragrance: '',
  favorite_drink: '',
  preferred_gifts: '',
  favorite_music: '',
  highlight_package: 'basic',
};

export function useCreateAdFormV2() {
  const [formData, setFormData] = useState<AdFormData>(initialFormData);
  const { user } = useAuth();
  const createAd = useCreateAd();
  const navigate = useNavigate();
  const gamification = useGamification();

  const updateFormData = (updates: Partial<AdFormData>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      
      // Verificar conquistas
      checkAchievements(newData);
      
      // Marcar campos como completos
      Object.keys(updates).forEach(field => {
        if (updates[field as keyof AdFormData] && updates[field as keyof AdFormData] !== '') {
          gamification.completeField(field);
        }
      });

      return newData;
    });
  };

  const checkAchievements = (data: AdFormData) => {
    // Primeira foto
    if (data.uploaded_photos.length > 0) {
      gamification.unlockAchievement('first_photo');
    }

    // Descrição completa
    if (data.description && data.description.length > 50) {
      gamification.unlockAchievement('storyteller');
    }

    // Pacote premium
    if (data.highlight_package !== 'basic') {
      gamification.unlockAchievement('premium_member');
    }

    // 3 ou mais fotos
    if (data.uploaded_photos.length >= 3) {
      gamification.unlockAchievement('media_master');
    }

    // Perfil completo
    const completionRate = getCompletionRate(data);
    if (completionRate >= 90) {
      gamification.unlockAchievement('profile_complete');
    }
  };

  const getCompletionRate = (data: AdFormData) => {
    const requiredFields = [
      'title', 'description', 'whatsapp', 'location', 'price',
      'category', 'presentation_name', 'age'
    ];
    
    const filledFields = requiredFields.filter(field => {
      const value = data[field as keyof AdFormData];
      return value !== null && value !== '' && value !== 0;
    });

    return (filledFields.length / requiredFields.length) * 100;
  };

  const isValid = formData.title && 
                 formData.description && 
                 formData.whatsapp && 
                 formData.location && 
                 formData.price > 0 &&
                 formData.terms_accepted &&
                 formData.age_confirmed &&
                 formData.image_consent;

  const submitAd = async () => {
    if (!user || !isValid) return;

    const adData = {
      user_id: user.id,
      ...formData,
      image_url: formData.uploaded_photos[0] || null,
      video_url: formData.uploaded_videos[0] || null,
      photos: { uploaded: formData.uploaded_photos },
      videos: { uploaded: formData.uploaded_videos },
      status: 'pending_approval' as const,
    };

    await createAd.mutateAsync(adData);
    gamification.addXP(200, 'Anúncio publicado com sucesso!');
    navigate('/dashboard');
  };

  return {
    formData,
    updateFormData,
    isValid,
    submitAd,
    isSubmitting: createAd.isPending,
    gamification,
    completionRate: getCompletionRate(formData)
  };
}
