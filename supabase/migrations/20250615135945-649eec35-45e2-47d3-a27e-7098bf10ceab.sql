
-- Adiciona a coluna 'admin_notes' na tabela 'ads' para registrar notas administrativas na aprovação/rejeição de anúncios
ALTER TABLE public.ads ADD COLUMN admin_notes text;
