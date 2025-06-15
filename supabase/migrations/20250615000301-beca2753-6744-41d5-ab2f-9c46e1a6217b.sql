
-- Adicionar colunas para áudio de voz na tabela ads
ALTER TABLE public.ads 
ADD COLUMN voice_audio_url TEXT,
ADD COLUMN voice_audio BYTEA;
