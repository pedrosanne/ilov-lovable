
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { DocumentType, useUserVerification } from '@/hooks/useIdentityVerification';
import { Info } from 'lucide-react';

interface VerificationFormProps {
  onCancel: () => void;
}

export function VerificationForm({ onCancel }: VerificationFormProps) {
  const [documentType, setDocumentType] = useState<DocumentType>('rg');
  const [documentFront, setDocumentFront] = useState<File | null>(null);
  const [documentBack, setDocumentBack] = useState<File | null>(null);
  const [selfieWithDocument, setSelfieWithDocument] = useState<File | null>(null);
  const [verificationVideo, setVerificationVideo] = useState<File | null>(null);
  
  const { submitVerification, isSubmitting } = useUserVerification();

  const handleSubmit = async () => {
    if (!documentFront || !selfieWithDocument || !verificationVideo) {
      return;
    }

    if (documentType !== 'passport' && !documentBack) {
      return;
    }

    await submitVerification.mutateAsync({
      documentType,
      documentFront,
      documentBack: documentType === 'passport' ? undefined : documentBack!,
      selfieWithDocument,
      verificationVideo,
    });

    onCancel();
  };

  const isFormValid = () => {
    const basicRequirements = documentFront && selfieWithDocument && verificationVideo;
    const backRequirement = documentType === 'passport' || documentBack;
    return basicRequirements && backRequirement;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verificação de Identidade</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Para verificar sua identidade, você precisa enviar documentos oficiais e um vídeo.
            Todos os arquivos são tratados com segurança e privacidade.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="documentType">Tipo de Documento</Label>
          <Select value={documentType} onValueChange={(value: DocumentType) => setDocumentType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rg">RG (Registro Geral)</SelectItem>
              <SelectItem value="cnh">CNH (Carteira Nacional de Habilitação)</SelectItem>
              <SelectItem value="passport">Passaporte</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Foto da Frente do Documento *</Label>
            <FileUpload
              accept="image/*,.pdf"
              maxSizeMB={10}
              onFileSelect={setDocumentFront}
              currentFile={documentFront}
              placeholder="Selecione a foto da frente do documento"
            />
          </div>

          {documentType !== 'passport' && (
            <div>
              <Label>Foto do Verso do Documento *</Label>
              <FileUpload
                accept="image/*,.pdf"
                maxSizeMB={10}
                onFileSelect={setDocumentBack}
                currentFile={documentBack}
                placeholder="Selecione a foto do verso do documento"
              />
            </div>
          )}

          <div>
            <Label>Foto Segurando o Documento *</Label>
            <p className="text-sm text-gray-600 mb-2">
              Tire uma foto sua segurando o documento próximo ao rosto
            </p>
            <FileUpload
              accept="image/*"
              maxSizeMB={10}
              onFileSelect={setSelfieWithDocument}
              currentFile={selfieWithDocument}
              placeholder="Selecione a foto com o documento"
            />
          </div>

          <div>
            <Label>Vídeo de Verificação *</Label>
            <p className="text-sm text-gray-600 mb-2">
              Grave um vídeo de corpo inteiro realizando um giro de 360° (máximo 30 segundos)
            </p>
            <FileUpload
              accept="video/*"
              maxSizeMB={50}
              onFileSelect={setVerificationVideo}
              currentFile={verificationVideo}
              placeholder="Selecione o vídeo de verificação"
            />
          </div>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Dicas importantes:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Certifique-se de que as fotos estão bem iluminadas e legíveis</li>
              <li>No vídeo, mostre-se claramente fazendo o giro completo</li>
              <li>Formatos aceitos: JPEG, PNG, PDF para fotos e MP4, MOV para vídeos</li>
              <li>Seus dados são tratados com total segurança e privacidade</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Verificação'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
