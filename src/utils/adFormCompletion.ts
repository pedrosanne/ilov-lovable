
import { AdFormDataV2 } from '@/types/adFormV2';

export const calculateCompletionPercentage = (formData: AdFormDataV2): number => {
  const requiredFields = [
    'presentation_name', 'age', 'gender', 'title', 'description',
    'services_offered', 'location', 'price', 'whatsapp',
    'terms_accepted', 'age_confirmed', 'image_consent'
  ];
  
  let completed = 0;
  requiredFields.forEach(field => {
    const value = formData[field as keyof AdFormDataV2];
    if (value !== null && value !== undefined && value !== '' && value !== 0 && 
        (!Array.isArray(value) || value.length > 0) && value !== false) {
      completed++;
    }
  });
  
  return Math.round((completed / requiredFields.length) * 100);
};
