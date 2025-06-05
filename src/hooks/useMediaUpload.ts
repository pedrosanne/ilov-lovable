
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UploadOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
}

export function useMediaUpload() {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadMedia = async (
    file: File, 
    userId: string, 
    options: UploadOptions = {}
  ): Promise<string | null> => {
    const { maxSizeInMB = 10, allowedTypes = ['image/*', 'video/*'] } = options;
    
    try {
      setUploading(true);

      // Validar tamanho do arquivo
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast({
          title: "Arquivo muito grande",
          description: `O arquivo deve ter no máximo ${maxSizeInMB}MB.`,
          variant: "destructive",
        });
        return null;
      }

      // Validar tipo do arquivo
      const isValidType = allowedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.replace('/*', '/'));
        }
        return file.type === type;
      });

      if (!isValidType) {
        toast({
          title: "Tipo de arquivo não suportado",
          description: "Por favor, selecione uma imagem ou vídeo válido.",
          variant: "destructive",
        });
        return null;
      }

      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload para o Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('media-uploads')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data } = supabase.storage
        .from('media-uploads')
        .getPublicUrl(fileName);

      toast({
        title: "Upload realizado com sucesso!",
        description: "Sua mídia foi enviada com sucesso.",
      });

      return data.publicUrl;
    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar o arquivo. Tente novamente.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (url: string): Promise<boolean> => {
    try {
      // Extrair o caminho do arquivo da URL
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const userFolder = urlParts[urlParts.length - 2];
      const filePath = `${userFolder}/${fileName}`;

      const { error } = await supabase.storage
        .from('media-uploads')
        .remove([filePath]);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Erro ao deletar mídia:', error);
      return false;
    }
  };

  return {
    uploadMedia,
    deleteMedia,
    uploading
  };
}
