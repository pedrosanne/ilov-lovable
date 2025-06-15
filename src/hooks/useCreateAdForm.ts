
import { useState } from 'react';
import { useCreateAd } from '@/hooks/useAdActions';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
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
  image_url: string | null;
  video_url: string | null;
  photos: any;
  videos: any;

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
  image_url: null,
  video_url: null,
  photos: {},
  videos: {},
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

export function useCreateAdForm() {
  const [formData, setFormData] = useState<AdFormData>(initialFormData);
  const { user } = useAuth();
  const createAd = useCreateAd();
  const navigate = useNavigate();

  const updateFormData = (updates: Partial<AdFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
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
      status: 'pending_approval' as const,
    };

    await createAd.mutateAsync(adData);
    navigate('/dashboard');
  };

  return {
    formData,
    updateFormData,
    isValid,
    submitAd,
    isSubmitting: createAd.isPending,
  };
}
