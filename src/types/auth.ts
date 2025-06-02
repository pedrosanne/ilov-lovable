
export interface ContractorSignupData {
  email: string;
  password: string;
  fullName: string;
  userType: 'contractor';
}

export interface AdvertiserSignupData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  cpf: string;
  gender: 'masculino' | 'feminino' | 'outro';
  userType: 'advertiser';
}

export type SignupData = ContractorSignupData | AdvertiserSignupData;

export interface LoginData {
  email: string;
  password: string;
}
