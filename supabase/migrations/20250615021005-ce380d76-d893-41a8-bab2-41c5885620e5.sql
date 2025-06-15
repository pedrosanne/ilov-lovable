
-- Criar tabela para seguir usuários
CREATE TABLE public.user_follows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

-- Adicionar RLS
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

-- Política para visualizar relacionamentos de seguir
CREATE POLICY "Users can view follow relationships" 
  ON public.user_follows 
  FOR SELECT 
  USING (true);

-- Política para criar relacionamentos de seguir
CREATE POLICY "Users can create follow relationships" 
  ON public.user_follows 
  FOR INSERT 
  WITH CHECK (auth.uid() = follower_id);

-- Política para deletar relacionamentos de seguir
CREATE POLICY "Users can delete their own follow relationships" 
  ON public.user_follows 
  FOR DELETE 
  USING (auth.uid() = follower_id);

-- Trigger para atualizar contadores de seguidores
CREATE OR REPLACE FUNCTION update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Incrementar contadores
    UPDATE public.profiles 
    SET following_count = following_count + 1 
    WHERE id = NEW.follower_id;
    
    UPDATE public.profiles 
    SET followers_count = followers_count + 1 
    WHERE id = NEW.following_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrementar contadores
    UPDATE public.profiles 
    SET following_count = following_count - 1 
    WHERE id = OLD.follower_id;
    
    UPDATE public.profiles 
    SET followers_count = followers_count - 1 
    WHERE id = OLD.following_id;
    
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger
CREATE TRIGGER trigger_update_follow_counts
  AFTER INSERT OR DELETE ON public.user_follows
  FOR EACH ROW EXECUTE FUNCTION update_follow_counts();
