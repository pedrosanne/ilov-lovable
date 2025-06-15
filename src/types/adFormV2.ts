
export interface AdFormDataV2 {
  // Dados pessoais
  presentation_name: string;
  age: number | null;
  gender: string;
  ethnicity: string;
  height: number | null;
  weight: number | null;
  body_type: string;
  languages: string[];

  // Frase de destaque
  highlight_phrase: string;

  // Serviços
  services_offered: string[];
  target_audience: string[];
  service_locations: string[];

  // Disponibilidade
  availability_days: string[];
  availability_hours: {
    [key: string]: { start: string; end: string };
  };
  appointment_only: boolean;

  // Localização
  neighborhood: string;
  postal_code: string;
  accepts_travel: boolean;

  // Preços
  price: number | null; // Adicionado de volta
  hourly_rate: number | null;
  packages: {
    name: string;
    duration: string;
    price: number;
    description: string;
  }[];

  // Métodos de pagamento
  payment_methods: string[];

  // Mídia
  photos: File[];
  videos: File[];

  // Contatos
  whatsapp: string;
  contact_telegram: string;
  contact_instagram: string;
  contact_email: string;
  contact_other: string;

  // Preferências e extras
  accepts_last_minute: boolean;
  restrictions: string;
  personal_rules: string;
  favorite_fragrance: string;
  favorite_drink: string;
  preferred_gifts: string;
  favorite_music: string;

  // Pacote de destaque
  highlight_package: string;

  // Termos
  terms_accepted: boolean;
  age_confirmed: boolean;
  image_consent: boolean;

  // Categorias e outros
  category: 'acompanhante';
  title: string;
  description: string;
  location: string;
}

export const initialFormData: AdFormDataV2 = {
  // Dados pessoais
  presentation_name: '',
  age: null,
  gender: '',
  ethnicity: '',
  height: null,
  weight: null,
  body_type: '',
  languages: [],

  // Frase de destaque
  highlight_phrase: '',

  // Serviços
  services_offered: [],
  target_audience: [],
  service_locations: [],

  // Disponibilidade
  availability_days: [],
  availability_hours: {},
  appointment_only: false,

  // Localização
  neighborhood: '',
  postal_code: '',
  accepts_travel: false,

  // Preços
  price: null,
  hourly_rate: null,
  packages: [],

  // Métodos de pagamento
  payment_methods: [],

  // Mídia
  photos: [],
  videos: [],

  // Contatos
  whatsapp: '',
  contact_telegram: '',
  contact_instagram: '',
  contact_email: '',
  contact_other: '',

  // Preferências e extras
  accepts_last_minute: false,
  restrictions: '',
  personal_rules: '',
  favorite_fragrance: '',
  favorite_drink: '',
  preferred_gifts: '',
  favorite_music: '',

  // Pacote de destaque
  highlight_package: 'basic',

  // Termos
  terms_accepted: false,
  age_confirmed: false,
  image_consent: false,

  // Categorias e outros
  category: 'acompanhante',
  title: '',
  description: '',
  location: '',
};
