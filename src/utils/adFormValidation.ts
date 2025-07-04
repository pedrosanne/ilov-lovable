
import { AdFormDataV2 } from '@/types/adFormV2';

export const isStepValid = (step: number, formData: AdFormDataV2): boolean => {
  switch (step) {
    case 1:
      return !!(formData.presentation_name && formData.age && formData.gender && formData.title);
    case 2:
      return !!(formData.services_offered.length > 0 && formData.location);
    case 3:
      return !!(formData.hourly_rate && formData.hourly_rate > 0);
    case 4:
      return true; // Optional step
    case 5:
      return !!formData.whatsapp;
    case 6:
      return true; // Audio step is optional
    case 7:
      return formData.terms_accepted && formData.age_confirmed && formData.image_consent;
    default:
      return false;
  }
};
