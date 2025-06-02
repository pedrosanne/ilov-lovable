
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const contractorSignupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  userType: z.literal('contractor'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export const advertiserSignupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Nome completo obrigatório'),
  phone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos').max(14, 'CPF inválido'),
  gender: z.enum(['masculino', 'feminino', 'outro']),
  userType: z.literal('advertiser'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ContractorSignupFormData = z.infer<typeof contractorSignupSchema>;
export type AdvertiserSignupFormData = z.infer<typeof advertiserSignupSchema>;
