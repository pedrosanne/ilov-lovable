
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UploadOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  bucket?: string;
}

export function useMediaUpload() {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadMedia = async (
    file: File, 
    userId: string, 
    options: UploadOptions = {}
  ): Promise<string | null> => {
    const { 
      maxSizeInMB = 10, 
      allowedTypes = ['image/*', 'video/*'],
      bucket = 'media-uploads'
    } = options;
    
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
          const baseType = type.replace('/*', '/');
          return file.type.startsWith(baseType);
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
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2);
      const fileName = `${userId}/${timestamp}-${randomId}.${fileExt}`;
      
      // Upload para o Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Obter URL pública
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      toast({
        title: "Upload realizado com sucesso!",
        description: "Sua mídia foi enviada com sucesso.",
      });

      return urlData.publicUrl;
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

  const deleteMedia = async (url: string, bucket: string = 'media-uploads'): Promise<boolean> => {
    try {
      // Extrair o caminho do arquivo da URL
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const userFolder = urlParts[urlParts.length - 2];
      const filePath = `${userFolder}/${fileName}`;

      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      toast({
        title: "Arquivo removido",
        description: "O arquivo foi removido com sucesso.",
      });

      return true;
    } catch (error) {
      console.error('Erro ao deletar mídia:', error);
      toast({
        title: "Erro ao remover arquivo",
        description: "Não foi possível remover o arquivo.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    uploadMedia,
    deleteMedia,
    uploading
  };
}
