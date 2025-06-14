
import { Database } from '@/types/database';

export type AdFormDataV2 = {
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

export const initialFormData: AdFormDataV2 = {
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
