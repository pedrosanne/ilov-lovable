
-- Alterar a coluna price para permitir valores nulos
ALTER TABLE public.ads ALTER COLUMN price DROP NOT NULL;
