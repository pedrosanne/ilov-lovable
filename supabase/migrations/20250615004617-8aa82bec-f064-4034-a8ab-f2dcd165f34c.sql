
-- Adicionar coluna para áudio de voz na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN voice_audio_url TEXT;
